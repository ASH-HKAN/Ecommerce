"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Heart, Star, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { InventoryStatusBadge } from "./status-badges";
import { PriceBlock } from "./price-block";
import { ProductIconArt } from "./product-icon";
import { useCartStore } from "@/features/cart/use-cart-store";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const isAvailable = product.stock !== "out_of_stock";

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable && product.stock !== "reservable") {
      toast.error("Currently out of stock");
      return;
    }
    if (product.stock === "reservable") {
      toast.info("This tool is reservation-only.", {
        description: "Open the product page to start a reservation.",
      });
      return;
    }
    addItem(product, 1);
    toast.success("Added to basket.");
  }

  function handleReserve(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Reserve ${product.name}?`, {
      description: "We'll hold this for 24 hours. Pay before the timer ends.",
    });
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 ease-standard",
        "hover:-translate-y-0.5 hover:shadow-elev-3",
        className
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden border-b"
      >
        <ProductIconArt
          iconKey={product.iconKey}
          className={cn(
            "transition-transform duration-300 ease-standard group-hover:scale-[1.03]",
            !isAvailable && "opacity-60 grayscale"
          )}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <InventoryStatusBadge
            state={product.stock}
            reservable={product.reservable}
          />
          {product.badges?.map((b) => (
            <span
              key={b}
              className="rounded-md border border-foreground/10 bg-background/90 px-2 py-0.5 text-xs font-medium backdrop-blur"
            >
              {b}
            </span>
          ))}
        </div>
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.success("Saved to wishlist.");
          }}
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:text-destructive"
        >
          <Heart className="size-4" />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-eyebrow uppercase text-muted-foreground">
          {product.brand.name}
        </p>
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="line-clamp-2 font-medium leading-snug hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.shortSpec}
        </p>

        <div className="flex items-center gap-1.5 text-xs">
          <Star className="size-3.5 fill-warning text-warning" />
          <span className="font-medium tabular-nums">
            {product.rating.average.toFixed(1)}
          </span>
          <span className="text-muted-foreground">
            ({product.rating.count})
          </span>
        </div>

        <div className="mt-auto pt-2">
          <PriceBlock
            price={product.price}
            compareAt={product.compareAt}
            size="md"
          />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!isAvailable}
            className={cn(
              "inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <ShoppingBag className="size-3.5" />
            Add to basket
          </button>
          <button
            type="button"
            onClick={handleReserve}
            disabled={!product.reservable}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50"
          >
            <Bookmark className="size-3.5" />
            Reserve
          </button>
        </div>
      </div>
    </article>
  );
}
