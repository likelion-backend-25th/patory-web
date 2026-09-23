import { useEffect, useState } from "react";
import { getPost } from "@/api/posts";
import type { PostDetail } from "@/types/post";

interface PostDetailState {
  post: PostDetail | null;
  status: "loading" | "error" | "success";
  errorMessage: string | null;
}

const initialState: PostDetailState = {
  post: null,
  status: "loading",
  errorMessage: null,
};

function parsePostId(value: string | undefined): number | null {
  if (value === undefined || !/^\d+$/.test(value)) {
    return null;
  }
  return Number(value);
}

export function usePostDetail(postIdParam: string | undefined) {
  const postId = parsePostId(postIdParam);
  const [state, setState] = useState<PostDetailState>(initialState);

  useEffect(() => {
    if (postId === null) {
      setState({
        post: null,
        status: "error",
        errorMessage: "올바르지 않은 게시글입니다.",
      });
      return;
    }

    const controller = new AbortController();
    setState(initialState);

    const load = async (): Promise<void> => {
      try {
        const post = await getPost(postId, controller.signal);
        if (controller.signal.aborted) {
          return;
        }
        setState({ post, status: "success", errorMessage: null });
      } catch (error: unknown) {
        if (controller.signal.aborted) {
          return;
        }
        const message = error instanceof Error ? error.message : "알 수 없는 오류";
        setState({ post: null, status: "error", errorMessage: message });
      }
    };

    void load();
    return () => controller.abort();
  }, [postId]);

  return state;
}
