import { IdeaResult } from "@/types/idea";
import { ScoreBadge } from "@/components/ScoreBadge";

export function ResultCard({ result }: { result: IdeaResult }) {
  const rows = [
    ["Main Pain", result.mainPain],
    ["App Idea", result.appIdea],
    ["Target User", result.targetUser],
    ["First Feature", result.firstFeature],
    ["Why It Could Work", result.whyItCouldWork],
    ["Why It Might Fail", result.whyItMightFail],
    [
      "Opportunity Score",
      `${result.opportunityScore}/10 - ${result.scoreExplanation}`
    ],
    ["Next Test", result.nextTest]
  ];

  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            One idea worth testing
          </p>
          <h1 className="mt-2 text-2xl font-bold text-neutral-950">
            {result.appIdea.replace(/^Build\s/, "").replace(/\.$/, "")}
          </h1>
        </div>
        <ScoreBadge score={result.opportunityScore} />
      </div>
      <div className="grid gap-4">
        {rows.map(([label, value]) => (
          <section key={label} className="border-t border-neutral-200 pt-4">
            <h2 className="text-sm font-semibold text-neutral-950">{label}:</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-700">{value}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
