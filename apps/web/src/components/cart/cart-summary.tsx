"use client";

import * as React from "react";
import Link from "next/link";
import { Tag, ShieldCheck, Bookmark } from "lucide-react";
import {
  useCartStore,
  selectCartCount,
  selectCartSubtotal,
} from "@/features/cart/use-cart-store";
import { formatPrice } from "@/lib/fmt";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useI18n } from "@/i18n/i18n-provider";

const SHIPPING_FREE_THRESHOLD = 25000;
const SHIPPING_COST = 1500;
const TAX_RATE = 0.08;

export function CartSummary() {
  const { t } = useI18n();
  const count = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectCartSubtotal);
  const [hydrated, setHydrated] = React.useState(false);
  const [coupon, setCoupon] = React.useState("");

  React.useEffect(() => setHydrated(true), []);

  const shipping =
    !hydrated || count === 0
      ? 0
      : subtotal >= SHIPPING_FREE_THRESHOLD
      ? 0
      : SHIPPING_COST;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  const empty = hydrated && count === 0;

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-display text-base font-semibold" suppressHydrationWarning>
          {t("cart.summary")}
        </h2>
        <Separator className="my-4" />
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground" suppressHydrationWarning>
              {t("cart.subtotal")}
              {hydrated && count > 0 && (
                <>
                  {" "}
                  ({t(count === 1 ? "account.orders.itemCount" : "account.orders.itemsCount", { n: count })})
                </>
              )}
            </dt>
            <dd className="tabular-nums">{formatPrice(hydrated ? subtotal : 0)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground" suppressHydrationWarning>
              {t("cart.shipping")}
            </dt>
            <dd className="tabular-nums" suppressHydrationWarning>
              {hydrated && shipping === 0 && count > 0
                ? t("cart.freeShippingFree").replace(/\.$/, "")
                : formatPrice(shipping)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground" suppressHydrationWarning>
              {t("cart.tax")}
            </dt>
            <dd className="tabular-nums">{formatPrice(tax)}</dd>
          </div>
        </dl>
        <Separator className="my-4" />
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium" suppressHydrationWarning>
            {t("cart.total")}
          </span>
          <span className="font-display text-2xl font-bold tabular-nums">
            {formatPrice(total)}
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!coupon.trim()) return;
            toast.error("That code isn't valid right now.");
            setCoupon("");
          }}
          className="mt-4 flex gap-2"
        >
          <div className="relative flex-1">
            <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder={t("cart.discountCode.placeholder")}
              suppressHydrationWarning
              className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-md border px-3 text-sm font-medium hover:bg-muted"
            suppressHydrationWarning
          >
            {t("cart.discountCode.apply")}
          </button>
        </form>

        <div className="mt-5 grid gap-2">
          <Link
            href="/checkout"
            aria-disabled={empty}
            className={
              "inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 " +
              (empty ? "pointer-events-none opacity-50" : "")
            }
            suppressHydrationWarning
          >
            {t("cart.checkout")}
          </Link>
          <Link
            href="/account/reservations"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
            suppressHydrationWarning
          >
            <Bookmark className="size-4" />
            {t("cart.reserveSelected")}
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-10 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
            suppressHydrationWarning
          >
            {t("cart.continueShopping")}
          </Link>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-success" />
          Secure payment via Stripe. Free returns within 30 days.
        </div>
      </div>
    </aside>
  );
}
