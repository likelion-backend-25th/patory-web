import { useEffect, useRef } from "react";
import { PostCard } from "@/components/PostCard";
import { usePostFeed } from "@/hooks/usePostFeed";

export function FeedPage() {
  const { posts, hasNext, status, errorMessage, isLoadingMore, loadMore } = usePostFeed();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || status !== "success" || !hasNext || errorMessage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [errorMessage, hasNext, loadMore, status]);

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">피드</h1>
        <p className="text-sm text-neutral-500">스크롤하면 다음 게시글을 이어서 불러옵니다.</p>
      </div>

      {status === "loading" ? <p className="text-neutral-500">피드를 불러오는 중...</p> : null}

      {status === "error" && posts.length === 0 ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      {status === "success" && posts.length === 0 ? (
        <p className="text-neutral-500">아직 게시글이 없습니다.</p>
      ) : null}

      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : null}

      <div ref={sentinelRef} className="h-8" />

      {isLoadingMore ? <p className="text-center text-sm text-neutral-500">더 불러오는 중...</p> : null}

      {status === "success" && !hasNext && posts.length > 0 ? (
        <p className="text-center text-sm text-neutral-400">마지막 게시글입니다.</p>
      ) : null}

      {errorMessage && posts.length > 0 ? (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </section>
  );
}
