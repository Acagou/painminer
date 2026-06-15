import { CopyButton } from "@/components/CopyButton";
import { FounderSnapshot } from "@/components/FounderSnapshot";
import { IdeaCard } from "@/components/IdeaCard";
import { ReportSection } from "@/components/ReportSection";
import { ScoreCard } from "@/components/ScoreCard";
import { sampleReport } from "@/lib/report";

export default function SampleReportPage() {
  const report = sampleReport;

  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Detailed sample report
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink">QuickQuote Builder</h1>
          <p className="mt-2 text-sm text-muted">
            Niche: {report.niche} / Source: {report.sourceType}
          </p>
        </div>

        <div className="grid gap-5">
          <FounderSnapshot report={report} />

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
          <ReportSection title="Exact User Language examples">
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
          <ReportSection title="Best App Idea: QuickQuote Builder">
            <p>{report.bestIdeaRecommendation}</p>
          </ReportSection>
          <ReportSection action={<CopyButton label="Copy wedge" text={report.landingPageWedge} />} title="Wedge">
            <p>{report.landingPageWedge}</p>
          </ReportSection>
          <ReportSection title="Target user">
            <p>{report.targetUser}</p>
          </ReportSection>
          <ReportSection title="Opportunity score: 31/35">
            <p className="mb-4 font-semibold text-accent">{report.scoreLabel}</p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {report.scores.map((score) => (
                <ScoreCard key={score.label} score={score} />
              ))}
            </div>
          </ReportSection>
          <ReportSection title="Why this might fail">
            <ul className="space-y-2">
              {report.whyThisMightFail.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </ReportSection>
          <ReportSection title="MVP feature list">
            <ul className="space-y-2">
              {report.mvpFeatureList.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </ReportSection>
          <ReportSection title="Pricing model">
            <p>{report.pricingModel}</p>
          </ReportSection>
          <ReportSection action={<CopyButton label="Copy post" text={report.redditValidationPost} />} title="Reddit validation post">
            <p>{report.redditValidationPost}</p>
          </ReportSection>
          <ReportSection action={<CopyButton label="Copy prompt" text={report.codexBuildPrompt} />} title="Codex build prompt">
            <p>{report.codexBuildPrompt}</p>
          </ReportSection>
        </div>
      </section>
    </div>
  );
}
