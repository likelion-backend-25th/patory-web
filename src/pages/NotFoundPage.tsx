import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">페이지를 찾을 수 없습니다</h1>
      <p className="text-neutral-600">요청한 주소가 없거나 이동되었습니다.</p>
      <Link to="/" className="inline-block text-sm font-medium text-neutral-900 underline">
        홈으로 돌아가기
      </Link>
    </section>
  );
}
