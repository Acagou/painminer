import { PricingCard } from "@/components/PricingCard";

export default function PricingPage() {
  return (
    <div className="bg-paper">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Pricing preview
          </p>
          <h1 className="mt-3 text-3xl font-bold text-ink">Simple planned pricing</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Payments are coming soon. The current V1 is for testing the report
            format with manual paste input and local mock generation.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <PricingCard
            description="For trying PainMiner without setup."
            features={["3 reports per month", "Manual paste input", "Markdown download"]}
            name="Free"
            price="$0"
          />
          <PricingCard
            description="For active idea research."
            features={["25 reports per month", "Copy-ready outputs", "Better report templates later"]}
            highlighted
            name="Starter"
            price="$9/mo"
          />
          <PricingCard
            description="For builders who want more complete build assets."
            features={["Unlimited reports", "Build Packs", "Future saved report history"]}
            name="Builder"
            price="$19/mo"
          />
          <PricingCard
            description="For a one-off research run."
            features={["One generated report", "Markdown export", "Copy-ready validation assets"]}
            name="One-time report"
            price="$5"
          />
        </div>
      </section>
    </div>
  );
}
