"use client";

import { brands } from "@/data/mocks";
import { useI18n } from "@/i18n/i18n-provider";

export function TopBrands() {
  const { t } = useI18n();
  return (
    <section className="border-b bg-muted/40 py-12 lg:py-16">
      <div className="container">
        <p
          className="mb-6 text-center text-eyebrow uppercase text-muted-foreground"
          suppressHydrationWarning
        >
          {t("home.brands.title")}
        </p>
        <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-4 md:grid-cols-8">
          {brands.map((b) => (
            <li
              key={b.id}
              className="text-center font-display text-sm font-bold tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {b.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
