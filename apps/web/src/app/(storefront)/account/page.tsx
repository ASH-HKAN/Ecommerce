"use client";

import Link from "next/link";
import {
  ArrowRight,
  Package,
  Bookmark,
  Heart,
  MapPin,
  Bell,
  Wrench,
} from "lucide-react";
import {
  currentCustomer,
  orders,
  reservations,
  wishlist,
} from "@/data/account-mocks";
import { AccountPageHeader } from "@/components/account/account-page-header";
import {
  OrderStatusBadge,
  ReservationStatusBadge,
} from "@/components/product/status-badges";
import { ReservationTimer } from "@/components/reservation/reservation-timer";
import { formatPrice } from "@/lib/fmt";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

export default function AccountOverviewPage() {
  const { t } = useI18n();
  const activeReservations = reservations.filter(
    (r) => r.status === "active" || r.status === "expiring_soon"
  );
  const activeOrders = orders.filter((o) =>
    ["pending_payment", "paid", "processing", "shipped"].includes(o.status)
  );
  const recent = [...orders]
    .sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <AccountPageHeader
        eyebrowKey="account.helloName"
        params={{ name: currentCustomer.firstName }}
        titleKey="account.welcome"
        descriptionKey="account.welcome.description"
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile
          label={t("account.tile.activeOrders")}
          value={String(activeOrders.length)}
          hint={
            activeOrders.length > 0
              ? `${activeOrders[0].number} · ${t(
                  ("status.order." + activeOrders[0].status) as TKey
                )}`
              : t("account.tile.noActiveOrders")
          }
          href="/account/orders"
          icon={Package}
        />
        <Tile
          label={t("account.tile.activeReservations")}
          value={String(activeReservations.length)}
          hint={
            activeReservations.length > 0
              ? `${activeReservations[0].number}`
              : t("account.tile.noActiveReservations")
          }
          href="/account/reservations"
          icon={Bookmark}
          tone={
            reservations.some((r) => r.status === "expiring_soon")
              ? "warning"
              : "default"
          }
        />
        <Tile
          label={t("account.tile.wishlist")}
          value={String(wishlist.length)}
          hint={t("account.tile.savedTools")}
          href="/account/wishlist"
          icon={Heart}
        />
        <Tile
          label={t("account.tile.defaultAddress")}
          value="Workshop"
          hint="1480 Industrial Way · Bay 4"
          href="/account/addresses"
          icon={MapPin}
        />
      </ul>

      {activeReservations.length > 0 && (
        <section className="rounded-2xl border bg-card p-6">
          <header className="mb-5 flex items-center justify-between">
            <div>
              <p
                className="text-eyebrow uppercase text-muted-foreground"
                suppressHydrationWarning
              >
                {t("account.nav.reservations")}
              </p>
              <h2
                className="font-display text-lg font-semibold"
                suppressHydrationWarning
              >
                {t("account.activeReservations.title")}
              </h2>
            </div>
            <Link
              href="/account/reservations"
              className="text-sm font-medium text-primary hover:underline"
              suppressHydrationWarning
            >
              {t("common.viewAll")}
            </Link>
          </header>
          <ul className="grid gap-4 md:grid-cols-2">
            {activeReservations.slice(0, 2).map((r) => (
              <li
                key={r.id}
                className="rounded-xl border bg-background p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-muted-foreground">
                    {r.number}
                  </p>
                  <ReservationStatusBadge status={r.status} />
                </div>
                <p className="mt-3 font-medium">
                  {r.items[0].name}
                  {r.items.length > 1 && ` + ${r.items.length - 1} more`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatPrice(r.subtotal)}
                </p>
                <div className="mt-4">
                  <ReservationTimer
                    status={r.status}
                    expiryOffsetMs={r.expiryOffsetMs}
                    variant="inline"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/account/reservations/${r.number}`}
                    className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                    suppressHydrationWarning
                  >
                    {t("account.payNow")}
                  </Link>
                  <Link
                    href={`/account/reservations/${r.number}`}
                    className="inline-flex h-9 items-center rounded-md text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <span suppressHydrationWarning>
                      {t("common.viewDetail")}
                    </span>
                    <ArrowRight className="ml-1 size-3" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border bg-card">
        <header className="flex items-center justify-between border-b p-6">
          <div>
            <p
              className="text-eyebrow uppercase text-muted-foreground"
              suppressHydrationWarning
            >
              {t("account.recentActivity")}
            </p>
            <h2
              className="font-display text-lg font-semibold"
              suppressHydrationWarning
            >
              {t("account.latestOrders")}
            </h2>
          </div>
          <Link
            href="/account/orders"
            className="text-sm font-medium text-primary hover:underline"
            suppressHydrationWarning
          >
            {t("account.viewAllOrders")}
          </Link>
        </header>
        <ul className="divide-y">
          {recent.map((o) => (
            <li
              key={o.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-md border bg-muted">
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
                    {new Date(o.placedAt).toLocaleDateString()} ·{" "}
                    {t(
                      o.items.length === 1
                        ? "account.orders.itemCount"
                        : "account.orders.itemsCount",
                      { n: o.items.length }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={o.status} />
                <span className="text-sm font-medium tabular-nums">
                  {formatPrice(o.total)}
                </span>
                <Link
                  href={`/account/orders/${o.number}`}
                  className="grid size-8 place-items-center rounded-md border hover:bg-muted"
                  aria-label={t("common.viewDetail")}
                >
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-md bg-info/10 text-info">
            <Bell className="size-5" />
          </span>
          <div>
            <p className="font-display font-semibold" suppressHydrationWarning>
              {t("account.notifications.empty.title")}
            </p>
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {t("account.notifications.empty.description")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Tile({
  label,
  value,
  hint,
  href,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  hint: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "warning";
}) {
  const ringClass =
    tone === "warning"
      ? "border-warning/40 bg-warning/5"
      : "border-border bg-background";
  return (
    <li>
      <Link
        href={href}
        className={`group flex h-full flex-col gap-3 rounded-2xl border p-5 transition-shadow hover:shadow-elev-2 ${ringClass}`}
      >
        <div className="flex items-center justify-between">
          <span className="grid size-10 place-items-center rounded-md bg-muted text-foreground">
            <Icon className="size-5" />
          </span>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
        <div>
          <p
            className="text-eyebrow uppercase text-muted-foreground"
            suppressHydrationWarning
          >
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums">
            {value}
          </p>
          <p
            className="mt-0.5 text-xs text-muted-foreground"
            suppressHydrationWarning
          >
            {hint}
          </p>
        </div>
      </Link>
    </li>
  );
}
