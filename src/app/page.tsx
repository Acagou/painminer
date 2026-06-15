import { Button } from "@/components/Button";
import { ExampleCard } from "@/components/ExampleCard";

const howItWorks = [
  "Paste one messy thread, review set, or forum discussion.",
  "PainMiner looks for the real complaint inside the text.",
  "You get one app idea, one first feature, one validation test."
];

export default function Home() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-normal text-neutral-950 sm:text-5xl">
            Paste a thread. Get one app idea worth testing.
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            PainMiner finds the real complaint inside a Reddit thread, app review,
            or forum discussion and turns it into one focused app idea with a clear
            first feature.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/analyze">Find an app idea</Button>
            <Button href="/example" variant="secondary">See example</Button>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-950">What it does</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">
            It turns one messy discussion into one clear product direction:
            the pain, the user, the first feature, the risk, and the next test.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-bold text-neutral-950">How it works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {howItWorks.map((item, index) => (
            <div key={item} className="rounded-lg border border-neutral-200 bg-white p-5">
              <p className="text-sm font-semibold text-neutral-950">Step {index + 1}</p>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold text-neutral-950">Example output</h2>
          <div className="mt-5">
            <ExampleCard />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-neutral-950">
            Why one idea is better than ten
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            Ten ideas create more decisions. One focused idea gives you a next
            action: test the pain, build the first feature, or move on.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-950">FAQ</h2>
          <div className="mt-3 space-y-4 text-sm leading-6 text-neutral-700">
            <p><strong className="text-neutral-950">Does it use Reddit API?</strong><br />No. Paste text manually in V1.</p>
            <p><strong className="text-neutral-950">Does it use OpenAI?</strong><br />No. The app uses mock logic now, with a clear replacement point for OpenAI later.</p>
            <p><strong className="text-neutral-950">What should I paste?</strong><br />One Reddit-style thread, app review set, or forum discussion with real complaints.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
