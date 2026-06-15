"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { ResultCard } from "@/components/ResultCard";
import { copyToClipboard } from "@/lib/clipboard";
import { exampleResult } from "@/lib/idea";
import { IdeaResult } from "@/types/idea";

function appIdeaText(result: IdeaResult) {
  return [
    `Main Pain: ${result.mainPain}`,
    `App Idea: ${result.appIdea}`,
    `Target User: ${result.targetUser}`,
    `First Feature: ${result.firstFeature}`,
    `Opportunity Score: ${result.opportunityScore}/10 - ${result.scoreExplanation}`,
    `Next Test: ${result.nextTest}`
  ].join("\n");
}

export default function ResultPage() {
  const [copied, setCopied] = useState(false);
  const [result] = useState<IdeaResult>(() => {
    if (typeof window === "undefined") return exampleResult;
    const stored = sessionStorage.getItem("painminer-result");
    return stored ? JSON.parse(stored) : exampleResult;
  });

  async function handleCopy() {
    await copyToClipboard(appIdeaText(result));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Result
            </p>
            <h1 className="mt-2 text-3xl font-bold text-neutral-950">
              One app idea worth testing
            </h1>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-500"
            onClick={handleCopy}
            type="button"
          >
            {copied ? "Copied" : "Copy App Idea"}
          </button>
        </div>

        <ResultCard result={result} />

        <div className="mt-6">
          <Button href="/analyze" variant="secondary">Test another thread</Button>
        </div>
      </section>
    </div>
  );
}
