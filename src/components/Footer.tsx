import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>(c) 2026 PainMiner. Paste complaints. Get buildable app ideas.</p>
        <div className="flex gap-4">
          <Link className="hover:text-ink" href="/analyze">
            Analyze
          </Link>
          <Link className="hover:text-ink" href="/sample-report">
            Sample
          </Link>
          <Link className="hover:text-ink" href="/pricing">
            Pricing
          </Link>
        </div>
      </div>
    </footer>
  );
}
