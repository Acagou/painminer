import { CTAButton } from "@/components/CTAButton";
import { IdeaCard } from "@/components/IdeaCard";
import { PricingCard } from "@/components/PricingCard";
import { ReportSection } from "@/components/ReportSection";
import { sampleReport } from "@/lib/report";

const howItWorks = [
  "Paste a complaint thread, review dump, support conversation, or customer notes.",
  "Choose the source type, niche, and what you want to find.",
  "Get a structured opportunity report with scores, app ideas, copy, and a Codex prompt."
];

const outputs = [
  "Pain summary and repeated pain signals",
  "Exact user language you can reuse",
  "Top 3 app ideas with a best recommendation",
  "Opportunity score out of 35",
  "MVP feature list, pricing model, validation post, and Codex build prompt"
];

const audiences = [
  "Solo founders validating a narrow SaaS idea",
  "Indie hackers mining app reviews and forums",
  "Codex and Lovable users looking for build prompts",
  "Creators turning audience complaints into useful tools"
];

export default function Home() {
  return (
    <div className="bg-paper">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-accent">
            r/PainMiner
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-normal text-ink sm:text-5xl">
            Paste complaints. Get buildable app ideas.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            PainMiner turns messy Reddit threads, app reviews, customer complaints, and
            forum posts into clear opportunity reports, MVP specs, validation posts,
            and Codex build prompts.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/analyze">Analyze Text</CTAButton>
            <CTAButton href="/sample-report" variant="secondary">
              See Sample Report
            </CTAButton>
          </div>
        </div>
        <aside className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            Popular opportunity
          </p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-muted">
            <p>
              <span className="font-semibold text-ink">Pain:</span>{" "}
              {sampleReport.painSummary}
            </p>
            <p>
              <span className="font-semibold text-ink">Best idea:</span>{" "}
              QuickQuote Builder
            </p>
            <p>
              <span className="font-semibold text-ink">Score:</span>{" "}
              {sampleReport.totalScore}/35, {sampleReport.scoreLabel}
            </p>
          </div>
        </aside>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <div key={item} className="rounded-2xl border border-line bg-paper p-5">
              <p className="text-sm font-semibold text-accent">r/step_{index + 1}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-2">
        <ReportSection title="What PainMiner gives you">
          <ul className="space-y-2">
            {outputs.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </ReportSection>
        <ReportSection title="Who it is for">
          <ul className="space-y-2">
            {audiences.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </ReportSection>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <h2 className="text-2xl font-bold text-ink">Sample output preview</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {sampleReport.appIdeas.map((idea, index) => (
            <IdeaCard idea={idea} index={index} key={idea.name} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink">Pricing preview</h2>
              <p className="mt-2 text-sm text-muted">
                Payments are coming soon. V1 is focused on proving the report format.
              </p>
            </div>
            <CTAButton href="/pricing" variant="secondary">
              View Pricing
            </CTAButton>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PricingCard
              description="For trying the report format."
              features={["3 reports per month", "Manual paste input", "Markdown export"]}
              name="Free"
              price="$0"
            />
            <PricingCard
              description="For builders actively researching ideas."
              features={["25 reports", "Copy-ready outputs", "Future saved history"]}
              highlighted
              name="Starter"
              price="$9/mo"
            />
            <PricingCard
              description="For people turning ideas into builds."
              features={["Unlimited reports", "Build Packs", "Future AI generation"]}
              name="Builder"
              price="$19/mo"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-2xl font-bold text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[
            ["Does V1 use Reddit API?", "No. Paste text manually. That keeps the MVP simple and fast."],
            ["Does it use OpenAI yet?", "No. This version uses mock generation so the report format can be tested first."],
            ["What should I paste?", "Threads, reviews, comments, support tickets, sales notes, or customer interviews."],
            ["What is the goal?", "Find real pains that can become narrow app ideas, validation posts, and build prompts."]
          ].map(([question, answer]) => (
            <div key={question} className="rounded-2xl border border-line bg-card p-5">
              <h3 className="font-semibold text-ink">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
