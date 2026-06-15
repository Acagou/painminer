import { ResultCard } from "@/components/ResultCard";
import { exampleResult } from "@/lib/idea";

export function ExampleCard() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm font-semibold text-neutral-950">Example: RateProof</p>
      <p className="mt-2 text-sm leading-6 text-neutral-700">
        Wedge: Paste a job request. Get a fair price range and a confident
        reply to the client.
      </p>
      <div className="mt-4">
        <ResultCard result={exampleResult} />
      </div>
    </div>
  );
}
