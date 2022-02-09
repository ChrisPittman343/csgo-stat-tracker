import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center border-b-[1px] border-zinc-700 p-2">
      <div className="flex w-full max-w-6xl items-center justify-between">
        <Link href="/">
          <a className="text-lg font-bold transition-all hover:brightness-[80%]">
            CSGO<span className="text-white">StatTracker</span>
          </a>
        </Link>
        <button>Sign in with Google</button>
      </div>
    </nav>
  );
}
