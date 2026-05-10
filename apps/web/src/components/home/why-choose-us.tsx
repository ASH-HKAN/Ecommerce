"use client";

import { ShieldCheck, CreditCard, Bookmark, Wrench } from "lucide-react";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

const tiles: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  titleKey: TKey;
  bodyKey: TKey;
}[] = [
  { icon: ShieldCheck, titleKey: "home.why.genuine.title",     bodyKey: "home.why.genuine.body" },
  { icon: CreditCard,  titleKey: "home.why.secure.title",      bodyKey: "home.why.secure.body" },
  { icon: Bookmark,    titleKey: "home.why.reservation.title", bodyKey: "home.why.reservation.body" },
  { icon: Wrench,      titleKey: "home.why.warranty.title",    bodyKey: "home.why.warranty.body" },
];

export function WhyChooseUs() {
  const { t } = useI18n();
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p
            className="text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {t("home.why.eyebrow")}
          </p>
          <h2
            className="mt-2 font-display text-display-sm md:text-display-md"
            suppressHydrationWarning
          >
            {t("home.why.title")}
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li
              key={tile.titleKey}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-elev-2"
            >
              <span className="grid size-10 place-items-center rounded-md bg-brand-orange-500/10 text-brand-orange-500">
                <tile.icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3
                className="mt-4 font-display text-base font-semibold"
                suppressHydrationWarning
              >
                {t(tile.titleKey)}
              </h3>
              <p
                className="mt-1 text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                {t(tile.bodyKey)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
