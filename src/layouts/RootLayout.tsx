import { Outlet } from "react-router";
import { Header } from "@/components/Header";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
