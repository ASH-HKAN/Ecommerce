"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore, selectCartCount } from "@/features/cart/use-cart-store";
import { cn } from "@/lib/utils";

export function CartTrigger() {
  const setOpen = useCartStore((s) => s.setOpen);
  const count = useCartStore(selectCartCount);

  return (
    <button
      type="button"
      aria-label={`Open basket. ${count} item${count === 1 ? "" : "s"}.`}
      onClick={() => setOpen(true)}
      className="relative grid size-9 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
    >
      <ShoppingBag className="size-5" />
      <span
        className={cn(
          "absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold tabular-nums text-primary-foreground transition-all",
          count === 0 && "scale-0 opacity-0"
        )}
      >
        {count}
      </span>
    </button>
  );
}
