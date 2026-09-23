import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function PostCommentPanel() {
  const [text, setText] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium">댓글</h2>
      <p className="rounded-lg border border-dashed border-neutral-200 px-3 py-6 text-center text-sm text-neutral-400">
        아직 댓글 API가 없습니다.
      </p>
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setNotice("댓글 API 연동 전입니다.");
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="댓글을 입력해주세요"
          className="h-10 min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-200"
        />
        <Button type="submit" size="sm" className="h-10 px-4">
          등록
        </Button>
      </form>
      {notice ? <p className="text-xs text-neutral-500">{notice}</p> : null}
    </section>
  );
}
