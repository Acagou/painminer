import { AppIdea } from "@/types/report";

export function IdeaCard({ idea, index }: { idea: AppIdea; index: number }) {
  return (
    <article className="rounded-2xl border border-line bg-paper p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        r/idea_signal_{index + 1}
      </p>
      <h3 className="mt-2 text-base font-semibold text-ink">{idea.name}</h3>
      <p className="mt-2 text-sm text-muted">
        <span className="font-semibold text-ink">Audience:</span> {idea.audience}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">{idea.promise}</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        <span className="font-semibold text-ink">V1:</span> {idea.firstVersion}
      </p>
    </article>
  );
}
