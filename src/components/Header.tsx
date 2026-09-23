import { Link } from "react-router";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Patory
        </Link>
      </div>
    </header>
  );
}
