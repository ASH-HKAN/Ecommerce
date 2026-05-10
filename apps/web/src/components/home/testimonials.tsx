"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/mocks";
import { useI18n } from "@/i18n/i18n-provider";

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p
            className="text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {t("home.testimonials.eyebrow")}
          </p>
          <h2
            className="mt-2 font-display text-display-sm md:text-display-md"
            suppressHydrationWarning
          >
            {t("home.testimonials.title")}
          </h2>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((tm) => (
            <li
              key={tm.id}
              className="rounded-2xl border bg-card p-6 shadow-elev-1"
            >
              <Quote className="size-6 text-brand-orange-500" />
              <p className="mt-4 text-pretty text-sm leading-relaxed" dir="auto">
                “{tm.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t pt-4">
                <div className="grid size-9 place-items-center rounded-full bg-muted text-sm font-semibold">
                  {tm.author
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="text-sm">
                  <p className="font-medium">{tm.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {tm.role} · {tm.workshop}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
