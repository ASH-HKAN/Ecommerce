"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductIconArt } from "./product-icon";
import { cn } from "@/lib/utils";

type Props = {
  iconKey: string;
  productName: string;
};

export function ProductGallery({ iconKey, productName }: Props) {
  // For the prototype we render the same placeholder art with subtle tints
  // to simulate multiple angles. Real images replace this in a later phase.
  const slides = [
    { id: 0, hint: "Front view" },
    { id: 1, hint: "Detail" },
    { id: 2, hint: "In hand" },
    { id: 3, hint: "Box contents" },
  ];
  const [active, setActive] = React.useState(0);

  return (
    <div className="lg:sticky lg:top-24">
      <div
        role="img"
        aria-label={`${productName} — image ${active + 1} of ${slides.length}`}
        className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-card"
      >
        <ProductIconArt iconKey={iconKey} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.brand-orange.500/8),transparent_60%)]" />
        <div className="absolute bottom-4 left-4 rounded-md bg-background/85 px-2.5 py-1 text-xs font-medium backdrop-blur">
          {slides[active].hint}
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border bg-background/85 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => setActive((a) => (a + 1) % slides.length)}
          className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border bg-background/85 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <ul className="mt-4 grid grid-cols-4 gap-3">
        {slides.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setActive(s.id)}
              aria-label={`Show ${s.hint}`}
              aria-current={s.id === active}
              className={cn(
                "relative aspect-square w-full overflow-hidden rounded-lg border transition-colors",
                s.id === active
                  ? "border-foreground/40"
                  : "border-border hover:border-foreground/20"
              )}
            >
              <ProductIconArt iconKey={iconKey} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
