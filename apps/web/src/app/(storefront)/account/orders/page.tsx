"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search, Wrench } from "lucide-react";
import { orders } from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { OrderStatusBadge } from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

const STATUS_FILTERS: {
  key: string;
  labelKey: TKey;
  match?: (s: string) => boolean;
}[] = [
  { key: "all",       labelKey: "account.orders.filter.all" },
  { key: "open",      labelKey: "account.orders.filter.open",      match: (s) => ["pending_payment", "paid", "processing", "shipped"].includes(s) },
  { key: "delivered", labelKey: "account.orders.filter.delivered", match: (s) => s === "delivered" },
  { key: "cancelled", labelKey: "account.orders.filter.cancelled", match: (s) => s === "cancelled" },
  { key: "refunded",  labelKey: "account.orders.filter.refunded",  match: (s) => s === "refunded" },
];

export default function OrdersListPage() {
  const { t } = useI18n();
  const searchParamsHook = useSearchParams();
  const statusKey = searchParamsHook.get("status") ?? "all";
  const q = (searchParamsHook.get("q") ?? "").trim().toLowerCase();
  const matcher = STATUS_FILTERS.find((s) => s.key === statusKey)?.match;

  const list = orders
    .filter((o) => (matcher ? matcher(o.status) : true))
    .filter((o) =>
      q
        ? o.number.toLowerCase().includes(q) ||
          o.items.some((i) => i.name.toLowerCase().includes(q))
        : true
    )
    .sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt));

  return (
    <div>
      <AccountPageHeader
        titleKey="account.orders.title"
        descriptionKey="account.orders.description"
      />

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => {
            const href =
              s.key === "all"
                ? "/account/orders"
                : `/account/orders?status=${s.key}`;
            const active = statusKey === s.key;
            return (
              <li key={s.key}>
                <Link
                  href={href}
                  className={
                    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors " +
                    (active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground/80 hover:bg-muted")
                  }
                  suppressHydrationWarning
                >
                  {t(s.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
        <form action="/account/orders" className="relative md:w-80">
          {statusKey !== "all" && (
            <input type="hidden" name="status" value={statusKey} />
          )}
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder={t("account.orders.search")}
            suppressHydrationWarning
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </form>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
          <h2 className="font-display text-lg" suppressHydrationWarning>
            {t("account.orders.empty.title")}
          </h2>
          <p
            className="mt-2 max-w-md text-sm text-muted-foreground"
            suppressHydrationWarning
          >
            {t("account.orders.empty.description")}
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            suppressHydrationWarning
          >
            {t("account.orders.shopTools")}
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {list.map((o) => (
            <li
              key={o.id}
              className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-elev-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="hidden size-12 place-items-center rounded-md border bg-muted sm:grid">
                    <Wrench className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <Link
                      href={`/account/orders/${o.number}`}
                      className="font-mono text-sm hover:underline"
                    >
                      {o.number}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      <span suppressHydrationWarning>
                        {t("account.orders.placedOn", {
                          date: new Date(o.placedAt).toLocaleDateString(),
                        })}
                      </span>
                      {" · "}
                      <span suppressHydrationWarning>
                        {t(
                          o.items.length === 1
                            ? "account.orders.itemCount"
                            : "account.orders.itemsCount",
                          { n: o.items.length }
                        )}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <OrderStatusBadge status={o.status} />
                  <span className="font-display text-base font-bold tabular-nums">
                    {formatPrice(o.total)}
                  </span>
                  <Link
                    href={`/account/orders/${o.number}`}
                    className="inline-flex h-9 items-center gap-1 rounded-md border bg-background px-3 text-xs font-medium hover:bg-muted"
                  >
                    <span suppressHydrationWarning>
                      {t("common.viewDetail")}
                    </span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
                {o.items.slice(0, 3).map((it) => (
                  <li key={it.productId}>
                    <span className="font-medium text-foreground">
                      {it.qty} × {it.name}
                    </span>
                  </li>
                ))}
                {o.items.length > 3 && <li>+ {o.items.length - 3}</li>}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
