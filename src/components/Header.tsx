import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-normal text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent bg-accent-soft text-sm font-black text-accent">
            PM
          </span>
          <span className="hidden sm:inline">PainMiner</span>
        </Link>
        <div className="hidden h-11 min-w-0 flex-1 items-center rounded-full border border-line bg-card px-5 text-sm text-muted md:flex">
          Find pain signals, app ideas, and buyer language
        </div>
        <nav className="hidden items-center gap-5 text-sm font-medium text-muted lg:flex">
          <Link className="hover:text-ink" href="/sample-report">
            Sample Report
          </Link>
          <Link className="hover:text-ink" href="/pricing">
            Pricing
          </Link>
        </nav>
        <CTAButton href="/analyze" className="px-4">
          Analyze Text
        </CTAButton>
      </div>
    </header>
  );
}
