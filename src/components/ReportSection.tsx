import { ReactNode } from "react";

export function ReportSection({
  title,
  children,
  action
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-card p-5 shadow-sm">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        {action}
      </div>
      <div className="text-sm leading-6 text-muted">{children}</div>
    </section>
  );
}
