export function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-neutral-500">SNS 프론트엔드</p>
        <h1 className="text-3xl font-semibold tracking-tight">Patory</h1>
        <p className="max-w-xl text-neutral-600">
          React 19, Vite, Tailwind, Zustand 기반 기초 틀입니다. 화면 요청은
          <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm">/api/v1</code>
          으로 나가고, 로컬에서는 Vite가 Spring Boot(8080)로 프록시합니다.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        <li className="rounded-xl border border-neutral-200 bg-white p-4">
          <h2 className="font-medium">로컬 개발</h2>
          <p className="mt-1 text-sm text-neutral-600">
            <code>npm run dev</code> 후 백엔드를 8080에서 실행하면 상대경로 API가 연결됩니다.
          </p>
        </li>
        <li className="rounded-xl border border-neutral-200 bg-white p-4">
          <h2 className="font-medium">Netlify 배포</h2>
          <p className="mt-1 text-sm text-neutral-600">
            SPA 라우팅은 <code>netlify.toml</code>에서 처리합니다. 백엔드 URL이 정해지면 API 프록시
            리다이렉트를 활성화하면 됩니다.
          </p>
        </li>
      </ul>
    </section>
  );
}
