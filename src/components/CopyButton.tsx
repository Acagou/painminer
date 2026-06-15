"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      className="inline-flex min-h-10 items-center justify-center rounded-full border border-line bg-chip px-3 py-2 text-sm font-semibold text-ink transition hover:border-accent"
      onClick={handleCopy}
      type="button"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
