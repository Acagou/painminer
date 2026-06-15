import { Score } from "@/types/report";

export function ScoreCard({ score }: { score: Score }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-ink">{score.label}</h3>
        <span className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
          {score.value}/5
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{score.note}</p>
    </div>
  );
}
