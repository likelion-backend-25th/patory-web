import { useEffect, useState } from "react";
import { getPosts } from "@/api/posts";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/Button";
import type { PostListItem } from "@/types/post";

interface FeedState {
  posts: PostListItem[];
  hasNext: boolean;
  lastPostId: number | null;
  status: "loading" | "error" | "success";
  errorMessage: string | null;
  isLoadingMore: boolean;
}

const initialState: FeedState = {
  posts: [],
  hasNext: false,
  lastPostId: null,
  status: "loading",
  errorMessage: null,
  isLoadingMore: false,
};

export function FeedPage() {
  const [state, setState] = useState<FeedState>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    const loadFirstPage = async (): Promise<void> => {
      try {
        const page = await getPosts({}, controller.signal);
        if (controller.signal.aborted) {
          return;
        }
        setState({
          posts: page.content,
          hasNext: page.hasNext,
          lastPostId: page.lastPostId,
          status: "success",
          errorMessage: null,
          isLoadingMore: false,
        });
      } catch (error: unknown) {
        if (controller.signal.aborted) {
          return;
        }
        const message = error instanceof Error ? error.message : "알 수 없는 오류";
        setState({
          ...initialState,
          status: "error",
          errorMessage: message,
        });
      }
    };

    void loadFirstPage();
    return () => controller.abort();
  }, []);

  const loadMore = async (): Promise<void> => {
    if (!state.hasNext || state.lastPostId === null || state.isLoadingMore) {
      return;
    }

    setState((current) => ({ ...current, isLoadingMore: true }));

    try {
      const page = await getPosts({ lastPostId: state.lastPostId });
      setState((current) => ({
        ...current,
        posts: [...current.posts, ...page.content],
        hasNext: page.hasNext,
        lastPostId: page.lastPostId,
        isLoadingMore: false,
      }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류";
      setState((current) => ({
        ...current,
        isLoadingMore: false,
        errorMessage: message,
      }));
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">피드</h1>
        <p className="text-sm text-neutral-500">최신 게시글을 커서 기반으로 불러옵니다.</p>
      </div>

      {state.status === "loading" ? <p className="text-neutral-500">피드를 불러오는 중...</p> : null}

      {state.status === "error" ? (
        <p className="text-sm text-red-600">{state.errorMessage}</p>
      ) : null}

      {state.status === "success" && state.posts.length === 0 ? (
        <p className="text-neutral-500">아직 게시글이 없습니다.</p>
      ) : null}

      {state.posts.length > 0 ? (
        <ul className="space-y-4">
          {state.posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : null}

      {state.status === "success" && state.hasNext ? (
        <Button
          variant="outline"
          className="w-full"
          disabled={state.isLoadingMore}
          onClick={() => {
            void loadMore();
          }}
        >
          {state.isLoadingMore ? "불러오는 중..." : "더 보기"}
        </Button>
      ) : null}
    </section>
  );
}
