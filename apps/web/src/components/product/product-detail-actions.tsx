"use client";

import * as React from "react";
import { Bookmark, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { useCartStore } from "@/features/cart/use-cart-store";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n-provider";

export function ProductDetailActions({ product }: { product: Product }) {
  const { t } = useI18n();
  const addItem = useCartStore((s) => s.addItem);
  const max = product.stockCount ?? 99;
  const [qty, setQty] = React.useState(1);
  const isAvailable =
    product.stock === "in_stock" || product.stock === "low_stock";

  function dec() {
    setQty((q) => Math.max(1, q - 1));
  }
  function inc() {
    setQty((q) => Math.min(max, q + 1));
  }

  function handleAdd() {
    if (!isAvailable) {
      toast.error(t("product.outOfStock"));
      return;
    }
    addItem(product, qty);
    toast.success(`${qty} × ${product.name} → ${t("product.addToBasket")}`);
  }

  function handleReserve() {
    if (!product.reservable) {
      toast.error(t("product.outOfStock"));
      return;
    }
    toast.info(`${t("product.reserve")} ${qty} × ${product.name}?`, {
      description: t("reservation.howItWorks.step2"),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground" suppressHydrationWarning>
          {t("product.qty")}
        </span>
        <div className="inline-flex items-center rounded-md border">
          <button
            type="button"
            onClick={dec}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
            className="grid size-10 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={inc}
            disabled={qty >= max}
            aria-label="Increase quantity"
            className="grid size-10 place-items-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>
        {product.stockCount !== undefined && product.stockCount > 0 && (
          <span className="text-xs text-muted-foreground">
            {product.stockCount}
          </span>
        )}
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr,1fr,auto]">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!isAvailable}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          <ShoppingBag className="size-4" />
          <span suppressHydrationWarning>
            {isAvailable ? t("product.addToBasket") : t("product.outOfStock")}
          </span>
        </button>
        <button
          type="button"
          onClick={handleReserve}
          disabled={!product.reservable}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border bg-background px-5 text-sm font-medium hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          suppressHydrationWarning
        >
          <Bookmark className="size-4" />
          {t("product.reserve")}
        </button>
        <button
          type="button"
          aria-label={t("product.wishlist")}
          onClick={() => toast.success(t("product.wishlist"))}
          className="grid size-12 place-items-center rounded-md border bg-background text-muted-foreground hover:text-destructive sm:size-12"
        >
          <Heart className="size-4" />
        </button>
      </div>
    </div>
  );
}
