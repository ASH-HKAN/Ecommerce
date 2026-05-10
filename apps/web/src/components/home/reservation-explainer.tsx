import Link from "next/link";
import { ArrowRight, Bookmark, Clock, Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    icon: Bookmark,
    title: "Reserve",
    body: "Pick a reservable tool and lock the stock instantly.",
  },
  {
    n: "02",
    icon: Clock,
    title: "Pay before the timer ends",
    body: "Stock is held for 24 hours. A clear timer counts down for you.",
  },
  {
    n: "03",
    icon: Truck,
    title: "Pickup or ship",
    body: "Choose pickup at the warehouse or fast home delivery.",
  },
];

export function ReservationExplainer() {
  return (
    <section
      id="reservation"
      className="relative overflow-hidden border-b py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,theme(colors.brand-orange.500/5),transparent_60%)]" />

      <div className="container relative">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <p className="text-eyebrow uppercase text-muted-foreground">
              How reservation works
            </p>
            <h2 className="mt-2 font-display text-display-sm md:text-display-md">
              Lock the tool. Pay when you're ready.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
              For tools that move fast, we'll hold stock for you while you
              confirm with the team. No commitments, no fees.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link
              href="/shop?reservable=1"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 gap-2 px-5"
              )}
            >
              View reservable tools
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-xl border bg-card p-6 shadow-elev-1"
            >
              <span className="absolute -top-3 left-6 rounded-md border bg-background px-2 py-0.5 font-mono text-xs tabular-nums tracking-wider">
                {s.n}
              </span>
              <span className="grid size-10 place-items-center rounded-md bg-brand-orange-500/10 text-brand-orange-500">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
