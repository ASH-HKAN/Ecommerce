"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = "address" | "delivery" | "payment" | "review";

const STEPS: { key: Step; label: string }[] = [
  { key: "address",  label: "Address" },
  { key: "delivery", label: "Delivery" },
  { key: "payment",  label: "Payment" },
  { key: "review",   label: "Review" },
];

export function CheckoutStepper({
  current,
  onJump,
}: {
  current: Step;
  onJump: (s: Step) => void;
}) {
  const idx = STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="flex items-center gap-2 overflow-x-auto py-2">
      {STEPS.map((s, i) => {
        const state = i < idx ? "complete" : i === idx ? "current" : "upcoming";
        return (
          <li key={s.key} className="flex flex-1 items-center gap-3">
            <button
              type="button"
              disabled={state === "upcoming"}
              onClick={() => onJump(s.key)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
                state === "current" && "bg-primary/10 text-foreground",
                state === "complete" && "text-foreground",
                state === "upcoming" && "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full border text-xs font-semibold",
                  state === "complete" && "border-success bg-success text-success-foreground",
                  state === "current" && "border-primary bg-primary text-primary-foreground",
                  state === "upcoming" && "border-border bg-background"
                )}
              >
                {state === "complete" ? <Check className="size-4" /> : i + 1}
              </span>
              <span className="hidden text-sm font-medium sm:inline">
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  i < idx ? "bg-success" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
