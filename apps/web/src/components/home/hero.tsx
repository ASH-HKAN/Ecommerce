import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Wrench, BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trust = [
  { icon: ShieldCheck, label: "Genuine stock" },
  { icon: Truck, label: "Fast delivery" },
  { icon: Wrench, label: "Real warranty" },
  { icon: BadgeCheck, label: "Secure payment" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-steel-950 text-white">
      {/* Subtle radial accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,theme(colors.brand-orange.500/15),transparent_55%)]" />

      <div className="container relative grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange-500/30 bg-brand-orange-500/10 px-3 py-1 text-xs font-medium text-brand-orange-500">
            <span className="grid size-1.5 place-items-center rounded-full bg-brand-orange-500" />
            New season • Power tools
          </span>
          <h1 className="font-display text-display-lg text-balance md:text-display-xl">
            Tools built for the work,{" "}
            <span className="text-brand-orange-500">priced for the shop.</span>
          </h1>
          <p className="max-w-xl text-pretty text-base/relaxed text-white/70 md:text-lg/relaxed">
            Diagnostic, hand, power, and garage equipment from brands mechanics
            already trust. Genuine stock. Secure payment. Real warranty.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 gap-2 px-6 text-sm"
              )}
            >
              Shop tools <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#reservation"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/20 bg-transparent px-6 text-sm text-white hover:bg-white/10 hover:text-white"
              )}
            >
              How reservation works
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 text-sm text-white/70">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <t.icon className="size-4 text-brand-orange-500" />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] shadow-elev-4">
            {/* Inner glow */}
            <div className="absolute -inset-px rounded-2xl bg-[radial-gradient(ellipse_at_center,theme(colors.brand-orange.500/15),transparent_60%)]" />
            <div className="relative flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-5 grid size-24 place-items-center rounded-full border border-white/10 bg-brand-orange-500/15">
                  <Wrench
                    className="size-12 text-brand-orange-500"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-eyebrow uppercase tracking-[0.25em] text-white/50">
                  Hero photography
                </p>
                <p className="mt-1 font-display text-base text-white/80">
                  Premium tool image
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-brand-orange-500/60 to-transparent" />
          </div>

          {/* Floating spec chip */}
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-white/10 bg-brand-steel-900/80 p-4 shadow-elev-4 backdrop-blur sm:block">
            <p className="text-eyebrow uppercase text-white/50">Stock today</p>
            <p className="font-display text-2xl font-bold tabular-nums">
              4,287 SKUs
            </p>
            <p className="text-xs text-white/60">Across 80+ brands</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-orange-500/40 to-transparent" />
    </section>
  );
}
