"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { CTAButton } from "@/components/CTAButton";
import { IdeaCard } from "@/components/IdeaCard";
import { ReportSection } from "@/components/ReportSection";
import { ScoreCard } from "@/components/ScoreCard";
import { downloadMarkdown } from "@/lib/clipboard";
import { reportToMarkdown, sampleReport } from "@/lib/report";
import { OpportunityReport } from "@/types/report";

export default function ReportPage() {
  const [report] = useState<OpportunityReport>(() => {
    if (typeof window === "undefined") return sampleReport;
    const stored = sessionStorage.getItem("painminer-report");
    return stored ? JSON.parse(stored) : sampleReport;
  });

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Opportunity Report
            </p>
            <h1 className="mt-2 text-3xl font-bold text-ink">{report.niche}</h1>
            <p className="mt-2 text-sm text-muted">
              {report.sourceType} / {report.goal}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <CopyButton label="Copy landing page wedge" text={report.landingPageWedge} />
            <CopyButton label="Copy validation post" text={report.redditValidationPost} />
            <CopyButton label="Copy Codex prompt" text={report.codexBuildPrompt} />
            <button
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-accent bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              onClick={() => downloadMarkdown("painminer-report.md", reportToMarkdown(report))}
              type="button"
            >
              Download report as markdown
            </button>
          </div>
        </div>

        <div className="grid gap-5">
          <ReportSection title="Pain Summary">
            <p>{report.painSummary}</p>
          </ReportSection>

          <ReportSection title="Repeated Pain Signals">
            <ul className="space-y-2">
              {report.repeatedPainSignals.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection title="Exact User Language">
            <ul className="space-y-2">
              {report.exactUserLanguage.map((item) => (
                <li key={item}>&quot;{item}&quot;</li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection title="Top 3 App Ideas">
            <div className="grid gap-4 md:grid-cols-3">
              {report.appIdeas.map((idea, index) => (
                <IdeaCard idea={idea} index={index} key={idea.name} />
              ))}
            </div>
          </ReportSection>

          <ReportSection title="Best Idea Recommendation">
            <p>{report.bestIdeaRecommendation}</p>
          </ReportSection>

          <ReportSection
            action={<CopyButton label="Copy wedge" text={report.landingPageWedge} />}
            title="Landing Page Wedge"
          >
            <p>{report.landingPageWedge}</p>
          </ReportSection>

          <ReportSection title="Target User">
            <p>{report.targetUser}</p>
          </ReportSection>

          <ReportSection title="Opportunity Score">
            <div className="mb-4 rounded-2xl border border-line bg-paper p-4">
              <p className="text-2xl font-bold text-ink">
                {report.totalScore}/35
              </p>
              <p className="mt-1 text-sm font-semibold text-accent">{report.scoreLabel}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {report.scores.map((score) => (
                <ScoreCard key={score.label} score={score} />
              ))}
            </div>
          </ReportSection>

          <ReportSection title="Why This Might Fail">
            <ul className="space-y-2">
              {report.whyThisMightFail.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection title="MVP Feature List">
            <ul className="space-y-2">
              {report.mvpFeatureList.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection title="Pricing Model">
            <p>{report.pricingModel}</p>
          </ReportSection>

          <ReportSection
            action={<CopyButton label="Copy post" text={report.redditValidationPost} />}
            title="Reddit Validation Post"
          >
            <p>{report.redditValidationPost}</p>
          </ReportSection>

          <ReportSection
            action={<CopyButton label="Copy prompt" text={report.codexBuildPrompt} />}
            title="Codex Build Prompt"
          >
            <p>{report.codexBuildPrompt}</p>
          </ReportSection>
        </div>

        <div className="mt-8">
          <CTAButton href="/analyze" variant="secondary">
            Analyze another text
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
