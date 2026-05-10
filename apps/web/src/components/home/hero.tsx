"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Wrench, BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

const trust: { icon: React.ComponentType<{ className?: string }>; key: TKey }[] = [
  { icon: ShieldCheck, key: "home.hero.trust.genuine" },
  { icon: Truck,       key: "home.hero.trust.fast" },
  { icon: Wrench,      key: "home.hero.trust.warranty" },
  { icon: BadgeCheck,  key: "home.hero.trust.secure" },
];

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-brand-steel-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,theme(colors.brand-orange.500/15),transparent_55%)]" />

      <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="space-y-6">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-brand-orange-500/30 bg-brand-orange-500/10 px-3 py-1 text-xs font-medium text-brand-orange-500"
            suppressHydrationWarning
          >
            <span className="grid size-1.5 place-items-center rounded-full bg-brand-orange-500" />
            {t("home.hero.badge")}
          </span>
          <h1
            className="font-display text-display-lg text-balance md:text-display-xl"
            suppressHydrationWarning
          >
            {t("home.hero.title")}
          </h1>
          <p
            className="max-w-xl text-pretty text-base/relaxed text-white/70 md:text-lg/relaxed"
            suppressHydrationWarning
          >
            {t("home.hero.description")}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 gap-2 px-6 text-sm"
              )}
              suppressHydrationWarning
            >
              {t("home.hero.shopCta")}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#reservation"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/20 bg-transparent px-6 text-sm text-white hover:bg-white/10 hover:text-white"
              )}
              suppressHydrationWarning
            >
              {t("home.hero.reservationCta")}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 text-sm text-white/70">
            {trust.map((tr) => (
              <div key={tr.key} className="flex items-center gap-2">
                <tr.icon className="size-4 text-brand-orange-500" />
                <span suppressHydrationWarning>{t(tr.key)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-elev-4">
            <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(ellipse_at_center,theme(colors.brand-orange.500/15),transparent_60%)]" />
            <div className="relative flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-5 grid size-24 place-items-center rounded-full border border-white/10 bg-brand-orange-500/15">
                  <Wrench
                    className="size-12 text-brand-orange-500"
                    strokeWidth={1.5}
                  />
                </div>
                <p
                  className="text-eyebrow uppercase tracking-[0.25em] text-white/50"
                  suppressHydrationWarning
                >
                  {t("home.hero.heroPhoto")}
                </p>
                <p
                  className="mt-1 font-display text-base text-white/80"
                  suppressHydrationWarning
                >
                  {t("home.hero.heroPhotoSub")}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-orange-500/60 to-transparent" />
          </div>

          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-brand-steel-900/80 p-4 shadow-elev-4 backdrop-blur sm:block">
            <p
              className="text-eyebrow uppercase text-white/50"
              suppressHydrationWarning
            >
              {t("home.hero.stockToday")}
            </p>
            <p
              className="font-display text-2xl font-bold tabular-nums"
              suppressHydrationWarning
            >
              {t("home.hero.skus")}
            </p>
            <p className="text-xs text-white/60" suppressHydrationWarning>
              {t("home.hero.brandsCount")}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-orange-500/40 to-transparent" />
    </section>
  );
}
