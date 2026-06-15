import { OpportunityReport } from "@/types/report";

function sentenceCase(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function conciseScore(totalScore: number) {
  if (totalScore >= 30) return "8/10";
  if (totalScore >= 24) return "7/10";
  if (totalScore >= 18) return "5/10";
  return "3/10";
}

export function FounderSnapshot({ report }: { report: OpportunityReport }) {
  const bestIdea = report.appIdeas[0];

  const rows = [
    {
      label: "Main Pain",
      value: `People are struggling with ${sentenceCase(report.painSummary)}`
    },
    {
      label: "App Idea",
      value: `Build ${bestIdea.name}.`
    },
    {
      label: "Target User",
      value: `This is for ${report.targetUser}.`
    },
    {
      label: "First Feature",
      value: `The first feature should be ${sentenceCase(bestIdea.firstVersion)}`
    },
    {
      label: "Why It Could Work",
      value: `Because ${sentenceCase(report.bestIdeaRecommendation)}`
    },
    {
      label: "Why It Might Fail",
      value: `Because ${sentenceCase(report.whyThisMightFail[0])}`
    },
    {
      label: "Opportunity Score",
      value: conciseScore(report.totalScore)
    }
  ];

  return (
    <section className="rounded-2xl border border-accent bg-accent-soft p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            r/founder_snapshot
          </p>
          <h2 className="mt-1 text-lg font-semibold text-ink">Quick Opportunity Read</h2>
        </div>
        <span className="rounded-full border border-accent bg-paper px-3 py-1 text-sm font-bold text-accent">
          {conciseScore(report.totalScore)}
        </span>
      </div>
      <div className="grid gap-3">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl border border-line bg-paper p-4">
            <p className="text-sm font-semibold text-ink">{row.label}:</p>
            <p className="mt-1 text-sm leading-6 text-muted">{row.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
