import { Button } from "@/components/Button";
import { ResultCard } from "@/components/ResultCard";
import { exampleResult } from "@/lib/idea";

export default function ExamplePage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Example
          </p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-950">RateProof</h1>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            Neutral fictional Reddit-style discussion: freelancers are unsure
            what to charge and feel anxious when clients push back on price.
          </p>
        </div>

        <ResultCard result={exampleResult} />

        <div className="mt-6">
          <Button href="/analyze">Find an app idea</Button>
        </div>
      </section>
    </div>
  );
}
