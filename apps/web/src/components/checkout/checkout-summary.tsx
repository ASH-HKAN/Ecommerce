"use client";

import { Wrench, ShieldCheck } from "lucide-react";
import {
  useCartStore,
  selectCartCount,
  selectCartSubtotal,
} from "@/features/cart/use-cart-store";
import { formatPrice } from "@/lib/fmt";
import { Separator } from "@/components/ui/separator";

const SHIPPING = {
  standard: { id: "standard", label: "Standard delivery", eta: "1–2 business days", price: 1500 },
  express:  { id: "express",  label: "Express delivery",  eta: "Next business day", price: 3500 },
  pickup:   { id: "pickup",   label: "Pickup at warehouse", eta: "Same day, 8–17", price: 0 },
} as const;

export type ShippingId = keyof typeof SHIPPING;

export function shippingPrice(id: ShippingId) {
  return SHIPPING[id].price;
}

export function shippingLabel(id: ShippingId) {
  return SHIPPING[id].label;
}

export const SHIPPING_OPTIONS = Object.values(SHIPPING);

export function CheckoutSummary({ shipping }: { shipping: ShippingId }) {
  const lines = useCartStore((s) => s.lines);
  const count = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectCartSubtotal);

  const shipCost = shippingPrice(shipping);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipCost + tax;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-display text-base font-semibold">Order summary</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {count} {count === 1 ? "item" : "items"}
        </p>
        <Separator className="my-4" />
        <ul className="max-h-[260px] space-y-3 overflow-y-auto pr-1">
          {lines.map((l) => (
            <li key={l.productId} className="flex gap-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-md border bg-muted">
                <Wrench className="size-5 text-muted-foreground" />
              </div>
              <div className="flex flex-1 flex-col text-xs">
                <span className="text-muted-foreground">{l.brand}</span>
                <span className="line-clamp-1 font-medium text-foreground">
                  {l.name}
                </span>
                <span className="text-muted-foreground">Qty {l.qty}</span>
              </div>
              <span className="text-sm font-medium tabular-nums">
                {formatPrice(l.unitPrice * l.qty)}
              </span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">
              {shippingLabel(shipping)}
            </dt>
            <dd className="tabular-nums">
              {shipCost === 0 ? "Free" : formatPrice(shipCost)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Estimated tax</dt>
            <dd className="tabular-nums">{formatPrice(tax)}</dd>
          </div>
        </dl>
        <Separator className="my-4" />
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="font-display text-2xl font-bold tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-success" />
          Payments are processed by Stripe. We never see your card.
        </div>
      </div>
    </aside>
  );
}

export function totalForCheckout(subtotal: number, shipping: ShippingId) {
  const ship = shippingPrice(shipping);
  const tax = Math.round(subtotal * 0.08);
  return subtotal + ship + tax;
}
