import { ApiError, readApiErrorMessage } from "@/types/api";
import { useAuthStore } from "@/stores/useAuthStore";

const API_PREFIX = "/api/v1";

interface ApiClientOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options;
  const accessToken = useAuthStore.getState().accessToken;

  try {
    const response = await fetch(`${API_PREFIX}${path}`, {
      ...rest,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      // 로그인 실패(401)와 만료된 세션을 구분하기 위해 인증 요청은 세션을 유지한다.
      if (response.status === 401 && !path.startsWith("/auth/")) {
        useAuthStore.getState().clearSession();
      }

      const errorBody: unknown = await response.json().catch(() => null);
      throw new ApiError(readApiErrorMessage(errorBody, response.status), response.status);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : "알 수 없는 오류";
    throw new Error(message, { cause: error });
  }
}
