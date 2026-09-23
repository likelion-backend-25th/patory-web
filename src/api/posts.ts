import { apiClient } from "@/lib/apiClient";
import type { PostListSlice } from "@/types/post";

export interface GetPostsParams {
  lastPostId?: number;
  size?: number;
}

export function getPosts(
  params: GetPostsParams = {},
  signal?: AbortSignal,
): Promise<PostListSlice> {
  return apiClient<PostListSlice>("/posts", {
    signal,
    query: {
      lastPostId: params.lastPostId,
      // 안내문의 limit은 서버에서 무시된다. OpenAPI 기준은 size.
      size: params.size ?? 10,
    },
  });
}
