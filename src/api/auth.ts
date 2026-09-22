import { apiClient } from "@/lib/apiClient";
import type { User } from "@/types/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export function login(payload: LoginRequest): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });
}
