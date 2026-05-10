"use client";

import * as React from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, Wrench, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/features/cart/use-cart-store";
import { formatPrice } from "@/lib/fmt";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CartPageList() {
  const lines = useCartStore((s) => s.lines);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return (
      <ul className="space-y-3">
        {[0, 1].map((i) => (
          <li
            key={i}
            className="flex animate-pulse gap-4 rounded-xl border bg-card p-4"
          >
            <div className="size-20 shrink-0 rounded-md bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/3 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
        <div className="mb-5 grid size-16 place-items-center rounded-full bg-muted">
          <ShoppingBag className="size-7 text-muted-foreground" />
        </div>
        <h2 className="font-display text-xl">Your basket is empty.</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Browse our tools to get started.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Shop tools
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            Browse categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {lines.map((line) => (
        <li
          key={line.productId}
          className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row"
        >
          <Link
            href={`/products/${line.slug}`}
            className="grid size-24 shrink-0 place-items-center rounded-md border bg-muted"
          >
            <Wrench className="size-8 text-muted-foreground" />
          </Link>
          <div className="flex-1 space-y-1">
            <p className="text-eyebrow uppercase text-muted-foreground">
              {line.brand}
            </p>
            <Link
              href={`/products/${line.slug}`}
              className="line-clamp-2 font-medium hover:underline"
            >
              {line.name}
            </Link>
            <p className="text-xs text-muted-foreground">
              Unit price {formatPrice(line.unitPrice)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-md border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => updateQty(line.productId, line.qty - 1)}
                  className="grid size-9 place-items-center text-muted-foreground hover:text-foreground"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">
                  {line.qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => updateQty(line.productId, line.qty + 1)}
                  className="grid size-9 place-items-center text-muted-foreground hover:text-foreground"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  removeItem(line.productId);
                  toast.success(`Removed ${line.name} from basket.`);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive"
                )}
              >
                <Trash2 className="size-3.5" />
                Remove
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold tabular-nums">
              {formatPrice(line.unitPrice * line.qty)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
