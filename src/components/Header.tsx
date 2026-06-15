import Link from "next/link";
import { Button } from "@/components/Button";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-neutral-950">
          PainMiner
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-neutral-600 sm:flex">
          <Link className="hover:text-neutral-950" href="/example">
            Example
          </Link>
        </nav>
        <Button href="/analyze">Find an app idea</Button>
      </div>
    </header>
  );
}
