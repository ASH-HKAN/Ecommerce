import { ShieldCheck, CreditCard, Bookmark, Wrench } from "lucide-react";

const tiles = [
  {
    icon: ShieldCheck,
    title: "Genuine stock",
    body: "Sourced from manufacturers and authorized distributors.",
  },
  {
    icon: CreditCard,
    title: "Secure payment",
    body: "Card, Apple Pay, and Google Pay through Stripe.",
  },
  {
    icon: Bookmark,
    title: "Reservation available",
    body: "Hold a tool for up to 24 hours while you decide.",
  },
  {
    icon: Wrench,
    title: "Real warranty",
    body: "Warranty honored by us, not redirected to third parties.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="text-eyebrow uppercase text-muted-foreground">
            Why workshops buy here
          </p>
          <h2 className="mt-2 font-display text-display-sm md:text-display-md">
            Built around stock you can rely on.
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <li
              key={t.title}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-elev-2"
            >
              <span className="grid size-10 place-items-center rounded-md bg-brand-orange-500/10 text-brand-orange-500">
                <t.icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">
                {t.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
