"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CTAButton } from "@/components/CTAButton";
import { SelectInput } from "@/components/SelectInput";
import { TextAreaInput } from "@/components/TextAreaInput";
import { generateMockReport } from "@/lib/report";

const sourceTypes = [
  "Reddit thread",
  "App reviews",
  "YouTube comments",
  "Facebook group discussion",
  "Customer interview notes",
  "Support tickets",
  "Forum discussion",
  "Other"
];

const goals = [
  "Find app ideas",
  "Find content ideas",
  "Find product complaints",
  "Find service business opportunities",
  "Find buyer language"
];

export default function AnalyzePage() {
  const router = useRouter();
  const [sourceType, setSourceType] = useState(sourceTypes[0]);
  const [goal, setGoal] = useState(goals[0]);
  const [niche, setNiche] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pastedText.trim().length < 300) {
      setError("Paste at least 300 characters so PainMiner has enough signal to analyze.");
      return;
    }

    const report = generateMockReport({ sourceType, niche, goal, pastedText });
    sessionStorage.setItem("painminer-report", JSON.stringify(report));
    router.push("/report");
  }

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Analyze pasted complaints</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Paste real customer pain. V1 uses local mock generation, so nothing is
            sent to an API yet.
          </p>
        </div>

        <form className="rounded-2xl border border-line bg-card p-5 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <SelectInput
              label="Source Type"
              onChange={setSourceType}
              options={sourceTypes}
              value={sourceType}
            />
            <SelectInput label="Goal" onChange={setGoal} options={goals} value={goal} />
          </div>
          <label className="mt-5 block">
            <span className="text-sm font-semibold text-ink">Niche/topic</span>
            <input
              className="mt-2 h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-ink outline-none transition placeholder:text-gray-500 focus:border-accent focus:ring-2 focus:ring-orange-950"
              onChange={(event) => setNiche(event.target.value)}
              placeholder="Example: small business service owners"
              value={niche}
            />
          </label>
          <div className="mt-5">
            <TextAreaInput
              error={error}
              label="Pasted text"
              onChange={(value) => {
                setPastedText(value);
                if (error && value.trim().length >= 300) setError("");
              }}
              placeholder="Paste a messy Reddit thread, review dump, customer conversation, support tickets, or notes here."
              value={pastedText}
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted">
              No database, login, payments, Reddit API, or OpenAI API in this V1.
            </p>
            <CTAButton type="submit">Generate Opportunity Report</CTAButton>
          </div>
        </form>
      </section>
    </div>
  );
}
