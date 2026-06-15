import { CTAButton } from "@/components/CTAButton";

export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border p-5 ${
        highlighted ? "border-accent bg-accent-soft" : "border-line bg-card"
      }`}
    >
      <h2 className="text-lg font-semibold text-ink">{name}</h2>
      <p className="mt-3 text-3xl font-bold text-ink">{price}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <ul className="mt-5 space-y-2 text-sm text-muted">
        {features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>
      <CTAButton className="mt-6 w-full" href="/analyze" variant={highlighted ? "primary" : "secondary"}>
        Try V1
      </CTAButton>
    </article>
  );
}
