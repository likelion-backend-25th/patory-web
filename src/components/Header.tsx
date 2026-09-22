import { Link, NavLink } from "react-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "@/components/ui/Button";

const navClassName = ({ isActive }: { isActive: boolean }): string =>
  `rounded-md px-3 py-1.5 text-sm ${
    isActive ? "bg-neutral-100 font-medium text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
  }`;

export function Header() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Patory
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" className={navClassName} end>
            홈
          </NavLink>
          <NavLink to="/feed" className={navClassName}>
            피드
          </NavLink>
        </nav>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">{user.nickname}</span>
            <Button variant="ghost" size="sm" onClick={clearSession}>
              로그아웃
            </Button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
