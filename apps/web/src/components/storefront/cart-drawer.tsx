"use client";

import * as React from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, Wrench } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore, selectCartSubtotal } from "@/features/cart/use-cart-store";
import { formatPrice } from "@/lib/fmt";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);
  const lines = useCartStore((s) => s.lines);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore(selectCartSubtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="font-display text-lg">Your basket</SheetTitle>
          <SheetDescription className="text-sm">
            {lines.length === 0
              ? "Your basket is empty."
              : `${lines.length} item${lines.length === 1 ? "" : "s"} ready for checkout.`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-5 grid size-16 place-items-center rounded-full bg-muted">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="font-display text-lg">Your basket is empty.</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Browse our tools to get started.
            </p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-6 h-11 px-6"
              )}
            >
              Shop tools
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <ul className="divide-y">
                {lines.map((line) => (
                  <li key={line.productId} className="flex gap-4 px-6 py-4">
                    <div className="grid size-16 shrink-0 place-items-center rounded-md border bg-muted">
                      <Wrench className="size-6 text-muted-foreground" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {line.brand}
                      </span>
                      <Link
                        href={`/products/${line.slug}`}
                        onClick={() => setOpen(false)}
                        className="line-clamp-2 text-sm font-medium hover:underline"
                      >
                        {line.name}
                      </Link>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-md border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQty(line.productId, line.qty - 1)}
                            className="grid size-8 place-items-center text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQty(line.productId, line.qty + 1)}
                            className="grid size-8 place-items-center text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          {formatPrice(line.unitPrice * line.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${line.name} from basket`}
                      onClick={() => removeItem(line.productId)}
                      className="grid size-8 shrink-0 place-items-center self-start text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <SheetFooter className="border-t bg-card px-6 py-4">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-base font-semibold tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Separator />
                <p className="text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout.
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-11 w-full justify-center text-sm"
                  )}
                >
                  Proceed to checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-10 w-full justify-center text-sm"
                  )}
                >
                  View basket
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
