"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { DEAL_OF_THE_WEEK_PRODUCT, DEAL_DURATION_MS } from "@/data/mocks";
import { ProductIconArt } from "@/components/product/product-icon";
import { PriceBlock } from "@/components/product/price-block";
import { formatCountdown } from "@/lib/fmt";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Tracks a countdown that only starts once the client has mounted.
 * Returns null until then, so SSR and the first client render produce the
 * same HTML and we avoid hydration mismatches.
 */
function useClientCountdown(durationMs: number) {
  const [endsAt, setEndsAt] = React.useState<number | null>(null);
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    const target = Date.now() + durationMs;
    setEndsAt(target);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  if (endsAt === null || now === null) return null;
  return formatCountdown(endsAt, now);
}

function CountdownCell({
  value,
  label,
}: {
  value: number | null;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white/10 px-3 py-2 text-white">
      <span
        className="font-display text-2xl font-bold tabular-nums leading-none"
        suppressHydrationWarning
      >
        {value === null ? "—" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-white/60">
        {label}
      </span>
    </div>
  );
}

export function DealOfTheWeek() {
  const product = DEAL_OF_THE_WEEK_PRODUCT;
  const cd = useClientCountdown(DEAL_DURATION_MS);

  const cells = [
    { v: cd?.days ?? null, l: "Days" },
    { v: cd?.hours ?? null, l: "Hours" },
    { v: cd?.minutes ?? null, l: "Min" },
    { v: cd?.seconds ?? null, l: "Sec" },
  ];

  return (
    <section className="border-b bg-background py-16 lg:py-24">
      <div className="container">
        <div className="overflow-hidden rounded-2xl bg-brand-steel-950 text-white shadow-elev-4">
          <div className="grid items-center gap-10 p-8 lg:grid-cols-2 lg:p-12">
            {/* Left: copy */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange-500/30 bg-brand-orange-500/10 px-3 py-1 text-xs font-medium text-brand-orange-500">
                <Flame className="size-3.5" />
                Limited · Deal of the week
              </span>
              <h2 className="font-display text-display-sm text-balance md:text-display-md">
                {product.name}
              </h2>
              <p className="max-w-md text-pretty text-sm text-white/70 md:text-base">
                {product.shortSpec}. Save while supplies last — this deal
                resets every Monday at 09:00.
              </p>
              <div className="flex items-center gap-2">
                {cells.map((c) => (
                  <CountdownCell key={c.l} value={c.v} label={c.l} />
                ))}
              </div>
              <PriceBlock
                price={product.price}
                compareAt={product.compareAt}
                size="lg"
                className="text-white [&_*]:tabular-nums"
              />
              <div className="pt-2">
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-12 gap-2 px-6 text-sm"
                  )}
                >
                  Shop the deal
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Right: art */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                <ProductIconArt iconKey={product.iconKey} />
              </div>
              <div className="absolute -bottom-3 -right-3 hidden rounded-xl border border-white/10 bg-brand-steel-900/80 px-4 py-3 text-sm shadow-elev-4 backdrop-blur sm:block">
                <p className="text-eyebrow uppercase text-white/60">Save</p>
                <p className="font-display text-xl font-bold text-brand-orange-500">
                  {Math.round(
                    (((product.compareAt ?? product.price) - product.price) /
                      (product.compareAt ?? product.price)) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
