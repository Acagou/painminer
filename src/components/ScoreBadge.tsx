export function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-sm font-bold text-neutral-950">
      {score}/10
    </span>
  );
}
