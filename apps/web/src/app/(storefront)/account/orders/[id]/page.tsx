"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  Wrench,
  Truck,
  Download,
  RotateCcw,
  Package,
} from "lucide-react";
import {
  getOrderByNumber,
  addresses,
} from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { OrderStatusBadge } from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

export default function OrderDetailPage() {
  const { t, formatDateTime, formatDate } = useI18n();
  const params = useParams<{ id: string }>();
  const id = decodeURIComponent(params?.id ?? "");
  const o = getOrderByNumber(id);

  if (!o) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <h2 className="font-display text-lg">404</h2>
        <Link
          href="/account/orders"
          className="mt-6 inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
          suppressHydrationWarning
        >
          {t("common.back")}
        </Link>
      </div>
    );
  }

  const address = addresses.find((a) => a.id === o.shippingAddressId);

  const stages: { key: string; labelKey: TKey }[] = [
    { key: "pending_payment", labelKey: "status.order.pending_payment" },
    { key: "paid",            labelKey: "status.order.paid" },
    { key: "processing",      labelKey: "status.order.processing" },
    { key: "shipped",         labelKey: "status.order.shipped" },
    { key: "delivered",       labelKey: "status.order.delivered" },
  ];
  const isCancelled = o.status === "cancelled";
  const isRefunded = o.status === "refunded";
  const stageIdx = stages.findIndex((s) => s.key === o.status);

  return (
    <div className="space-y-6">
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        suppressHydrationWarning
      >
        <ArrowLeft className="size-4" />
        {t("common.back")}
      </Link>

      <AccountPageHeader
        eyebrow={`${t("account.orders.title")} ${o.number}`}
        title={t("account.orders.placedOn", {
          date: formatDateTime(o.placedAt),
        })}
        actions={
          <>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
              suppressHydrationWarning
            >
              <Download className="size-4" />
              {t("account.orders.invoice")}
            </button>
            <Link
              href="/cart"
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
              suppressHydrationWarning
            >
              <RotateCcw className="size-4" />
              {t("account.orders.reorder")}
            </Link>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <OrderStatusBadge status={o.status} />
        <span className="text-sm text-muted-foreground" suppressHydrationWarning>
          {t(
            o.items.length === 1
              ? "account.orders.itemCount"
              : "account.orders.itemsCount",
            { n: o.items.length }
          )}
        </span>
        <span className="text-sm font-medium tabular-nums">
          {formatPrice(o.total)}
        </span>
        {o.trackingNumber && (
          <a
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            href={`https://www.${o.trackingCarrier?.toLowerCase()}.com/track?tracknum=${o.trackingNumber}`}
            target="_blank"
            rel="noreferrer"
            suppressHydrationWarning
          >
            <Truck className="size-4" />
            {t("account.orders.trackWith", { carrier: o.trackingCarrier ?? "" })}
            <ChevronRight className="size-3" />
          </a>
        )}
      </div>

      {!isCancelled && !isRefunded && (
        <section className="rounded-2xl border bg-card p-6">
          <p
            className="mb-5 text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {t("account.orders.progress")}
          </p>
          <ol className="grid gap-5 md:grid-cols-5">
            {stages.map((s, i) => {
              const state =
                i < stageIdx
                  ? "complete"
                  : i === stageIdx
                  ? "current"
                  : "upcoming";
              return (
                <li
                  key={s.key}
                  className="flex items-start gap-3 md:flex-col md:gap-2"
                >
                  <span
                    className={
                      "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold " +
                      (state === "complete"
                        ? "border-success bg-success text-success-foreground"
                        : state === "current"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground")
                    }
                  >
                    {i + 1}
                  </span>
                  <div className="text-sm">
                    <p
                      className={
                        state === "upcoming"
                          ? "text-muted-foreground"
                          : "font-medium"
                      }
                      suppressHydrationWarning
                    >
                      {t(s.labelKey)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {(isCancelled || isRefunded) && (
        <section className="rounded-2xl border bg-card p-6">
          <p
            className="text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {t("account.nav.orders")}
          </p>
          <p className="mt-1 font-medium" suppressHydrationWarning>
            {isCancelled
              ? t("account.orders.cancelled.message")
              : t("account.orders.refunded.message")}
          </p>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
        <section className="rounded-2xl border bg-card">
          <header className="flex items-center justify-between border-b p-5">
            <h2
              className="font-display text-base font-semibold"
              suppressHydrationWarning
            >
              {t("account.orders.items")}
            </h2>
            <span className="text-xs text-muted-foreground">
              <Package className="mr-1 inline size-3.5" />
              {o.items.length}
            </span>
          </header>
          <ul className="divide-y">
            {o.items.map((it) => (
              <li
                key={it.productId}
                className="flex items-center gap-4 p-5"
              >
                <div className="grid size-14 place-items-center rounded-md border bg-muted">
                  <Wrench className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-eyebrow uppercase text-muted-foreground">
                    {it.brand}
                  </p>
                  <Link
                    href={`/products/${it.slug}`}
                    className="line-clamp-1 font-medium hover:underline"
                  >
                    {it.name}
                  </Link>
                  <p
                    className="mt-0.5 text-xs text-muted-foreground"
                    suppressHydrationWarning
                  >
                    {t("product.qty")} {it.qty} · {formatPrice(it.unitPrice)}
                  </p>
                </div>
                <p className="font-display text-base font-bold tabular-nums">
                  {formatPrice(it.unitPrice * it.qty)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-4">
          {address && (
            <section className="rounded-2xl border bg-card p-5">
              <p
                className="text-eyebrow uppercase text-muted-foreground"
                suppressHydrationWarning
              >
                {t("account.orders.shippingAddress")}
              </p>
              <div className="mt-2 space-y-0.5 text-sm">
                <p className="font-medium">{address.recipient}</p>
                <p>
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}
                </p>
                <p>
                  {address.city}, {address.region} {address.postal}
                </p>
                <p>{address.country}</p>
                <p className="text-xs text-muted-foreground">{address.phone}</p>
              </div>
            </section>
          )}

          <section className="rounded-2xl border bg-card p-5">
            <p
              className="text-eyebrow uppercase text-muted-foreground"
              suppressHydrationWarning
            >
              {t("account.orders.totals")}
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <Row
                label={t("cart.subtotal")}
                value={formatPrice(o.subtotal)}
              />
              <Row
                label={`${t("cart.shipping")} (${o.shippingMethod})`}
                value={
                  o.shipping === 0 ? t("cart.freeShippingFree").replace(/\.$/, "") : formatPrice(o.shipping)
                }
              />
              <Row label={t("cart.tax")} value={formatPrice(o.tax)} />
              <Row label={t("cart.total")} value={formatPrice(o.total)} bold />
            </dl>
          </section>

          <section className="rounded-2xl border bg-card p-5">
            <p
              className="text-eyebrow uppercase text-muted-foreground"
              suppressHydrationWarning
            >
              {t("account.orders.timeline")}
            </p>
            <ol className="mt-3 space-y-3 text-sm">
              {o.timeline.map((tline, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                  <div>
                    <p className="font-medium">{tline.label}</p>
                    <p
                      className="text-xs text-muted-foreground"
                      suppressHydrationWarning
                    >
                      {formatDate(tline.ts)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground" suppressHydrationWarning>
        {label}
      </dt>
      <dd
        className={
          "tabular-nums " +
          (bold ? "font-display text-base font-bold" : "")
        }
      >
        {value}
      </dd>
    </div>
  );
}
