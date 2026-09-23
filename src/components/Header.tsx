import { Link } from "react-router";
import { Bell, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Patory
        </Link>
        <div className="flex items-center gap-3 text-neutral-700">
          <button type="button" aria-label="알림" className="rounded-md p-1 hover:bg-neutral-100">
            <Bell className="size-5" />
          </button>
          <button type="button" aria-label="메뉴" className="rounded-md p-1 hover:bg-neutral-100">
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
