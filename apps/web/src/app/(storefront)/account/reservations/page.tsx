"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Bookmark, Wrench } from "lucide-react";
import { reservations } from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { ReservationTimer } from "@/components/reservation/reservation-timer";
import { ReservationStatusBadge } from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";
import type { ReservationStatus } from "@/components/product/status-badges";

const FILTERS: {
  key: string;
  labelKey: TKey;
  match: (s: ReservationStatus) => boolean;
}[] = [
  { key: "active",    labelKey: "account.reservations.filter.active",    match: (s) => s === "active" || s === "expiring_soon" },
  { key: "expired",   labelKey: "account.reservations.filter.expired",   match: (s) => s === "expired" },
  { key: "cancelled", labelKey: "account.reservations.filter.cancelled", match: (s) => s === "cancelled" },
  { key: "converted", labelKey: "account.reservations.filter.converted", match: (s) => s === "converted" },
];

export default function ReservationsListPage() {
  const { t } = useI18n();
  const searchParamsHook = useSearchParams();
  const key = searchParamsHook.get("status") ?? "active";
  const matcher =
    FILTERS.find((f) => f.key === key)?.match ?? FILTERS[0].match;
  const list = reservations
    .filter((r) => matcher(r.status))
    .sort((a, b) => a.expiryOffsetMs - b.expiryOffsetMs);

  return (
    <div>
      <AccountPageHeader
        titleKey="account.reservations.title"
        descriptionKey="account.reservations.description"
        actions={
          <Link
            href="/shop?reservable=1"
            className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
            suppressHydrationWarning
          >
            <Bookmark className="size-4" />
            {t("account.reservations.reserveMore")}
          </Link>
        }
      />

      <ul className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = key === f.key;
          return (
            <li key={f.key}>
              <Link
                href={`/account/reservations?status=${f.key}`}
                className={
                  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium " +
                  (active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground/80 hover:bg-muted")
                }
                suppressHydrationWarning
              >
                {t(f.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
          <div className="mb-5 grid size-16 place-items-center rounded-full bg-muted">
            <Bookmark className="size-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-lg" suppressHydrationWarning>
            {t("account.reservations.empty.title")}
          </h2>
          <p
            className="mt-2 max-w-md text-sm text-muted-foreground"
            suppressHydrationWarning
          >
            {t("account.reservations.empty.description")}
          </p>
          <Link
            href="/shop?reservable=1"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            suppressHydrationWarning
          >
            {t("account.reservations.viewReservable")}
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {list.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-elev-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground">
                  {r.number}
                </p>
                <ReservationStatusBadge status={r.status} />
              </div>

              <ul className="mt-4 space-y-2">
                {r.items.map((it) => (
                  <li key={it.productId} className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-md border bg-muted">
                      <Wrench className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-eyebrow uppercase text-muted-foreground">
                        {it.brand}
                      </p>
                      <Link
                        href={`/products/${it.slug}`}
                        className="line-clamp-1 text-sm font-medium hover:underline"
                      >
                        {it.name}
                      </Link>
                      <p
                        className="text-xs text-muted-foreground"
                        suppressHydrationWarning
                      >
                        {t("product.qty")} {it.qty}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <ReservationTimer
                  status={r.status}
                  expiryOffsetMs={r.expiryOffsetMs}
                  variant="inline"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t pt-4">
                <span className="text-sm font-medium tabular-nums">
                  {formatPrice(r.subtotal)}
                </span>
                <Link
                  href={`/account/reservations/${r.number}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  <span suppressHydrationWarning>
                    {t("account.reservations.openDetail")}
                  </span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
