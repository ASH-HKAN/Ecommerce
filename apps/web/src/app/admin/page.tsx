import Link from "next/link";
import { ArrowRight, AlertTriangle, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { MetricCard } from "@/components/admin/metric-card";
import {
  dashboardMetrics,
  adminPayments,
  orders,
  reservations,
  products,
} from "@/data/admin-mocks";
import {
  OrderStatusBadge,
  ReservationStatusBadge,
} from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";

export const metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  const m = dashboardMetrics;
  const recentOrders = [...orders]
    .sort((a, b) => +new Date(b.placedAt) - +new Date(a.placedAt))
    .slice(0, 5);
  const lowStock = products.filter(
    (p) => p.stock === "low_stock" || p.stock === "out_of_stock"
  );
  const recentPayments = [...adminPayments]
    .sort((a, b) => +new Date(b.ts) - +new Date(a.ts))
    .slice(0, 5);
  const expiringReservations = reservations
    .filter((r) => r.status === "active" || r.status === "expiring_soon")
    .sort((a, b) => a.expiryOffsetMs - b.expiryOffsetMs);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.dashboard.title"
        descriptionKey="admin.dashboard.description"
      />

      {/* Metric row */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li>
          <MetricCard
            label="Revenue today"
            value={formatPrice(m.revenueToday)}
            delta={m.revenueDeltaPct}
            sparkline={m.revenue14d}
            hint="vs same period last week"
          />
        </li>
        <li>
          <MetricCard
            label="Orders today"
            value={String(m.ordersToday)}
            delta={m.ordersDeltaPct}
            hint="all channels"
          />
        </li>
        <li>
          <MetricCard
            label="Active reservations"
            value={String(m.activeReservations)}
            hint={`${m.expiringSoon} expiring soon`}
          />
        </li>
        <li>
          <MetricCard
            label="Stock alerts"
            value={String(m.lowStockCount + m.outOfStockCount)}
            hint={`${m.lowStockCount} low · ${m.outOfStockCount} out of stock`}
          />
        </li>
      </ul>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border bg-card p-6 lg:col-span-2">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-eyebrow uppercase text-muted-foreground">
                Revenue trend
              </p>
              <h2 className="font-display text-base font-semibold">
                Last 14 days
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatPrice(m.revenue14d.reduce((a, b) => a + b, 0))} total
            </span>
          </header>
          <div className="mt-4">
            <RevenueBars data={m.revenue14d} />
          </div>
        </section>
        <section className="rounded-2xl border bg-card p-6">
          <p className="text-eyebrow uppercase text-muted-foreground">
            Reservation funnel · last 14d
          </p>
          <h2 className="font-display text-base font-semibold">
            {m.reservationFunnel.reserved} reserved
          </h2>
          <ul className="mt-4 space-y-3">
            <FunnelRow
              label="Paid"
              value={m.reservationFunnel.paid}
              total={m.reservationFunnel.reserved}
              tone="success"
            />
            <FunnelRow
              label="Expired"
              value={m.reservationFunnel.expired}
              total={m.reservationFunnel.reserved}
              tone="danger"
            />
            <FunnelRow
              label="Cancelled"
              value={m.reservationFunnel.cancelled}
              total={m.reservationFunnel.reserved}
              tone="neutral"
            />
          </ul>
        </section>
      </div>

      {/* Tables row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card">
          <header className="flex items-center justify-between border-b p-5">
            <div>
              <p className="text-eyebrow uppercase text-muted-foreground">
                Recent orders
              </p>
              <h2 className="font-display text-base font-semibold">
                Last 5
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </header>
          <ul className="divide-y">
            {recentOrders.map((o) => (
              <li
                key={o.id}
                className="flex items-center gap-3 p-4 hover:bg-muted/50"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-md border bg-muted">
                  <Wrench className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm">{o.number}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {o.items.length} items · {new Date(o.placedAt).toLocaleString()}
                  </p>
                </div>
                <OrderStatusBadge status={o.status} />
                <span className="text-sm font-medium tabular-nums">
                  {formatPrice(o.total)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border bg-card">
          <header className="flex items-center justify-between border-b p-5">
            <div>
              <p className="text-eyebrow uppercase text-muted-foreground">
                Recent payments
              </p>
              <h2 className="font-display text-base font-semibold">
                Last 5
              </h2>
            </div>
            <Link
              href="/admin/payments"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </header>
          <ul className="divide-y">
            {recentPayments.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 p-4 hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    {p.chargeId.slice(0, 18)}…
                  </p>
                  <p className="text-sm font-medium">{p.customer}</p>
                  <p className="text-xs text-muted-foreground">{p.method}</p>
                </div>
                <span
                  className={
                    "rounded-md border px-2 py-0.5 text-xs font-medium " +
                    (p.status === "paid"
                      ? "border-success/30 bg-success/10 text-success"
                      : p.status === "failed"
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : p.status === "refunded"
                      ? "border-border bg-muted text-muted-foreground"
                      : "border-warning/30 bg-warning/10 text-warning")
                  }
                >
                  {p.status}
                </span>
                <span className="text-sm font-medium tabular-nums">
                  {formatPrice(p.amount)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Alerts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card">
          <header className="flex items-center justify-between border-b p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-warning" />
              <h2 className="font-display text-base font-semibold">
                Low / out of stock
              </h2>
            </div>
            <Link
              href="/admin/inventory"
              className="text-sm font-medium text-primary hover:underline"
            >
              Manage inventory
            </Link>
          </header>
          {lowStock.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">
              All stock is healthy.
            </p>
          ) : (
            <ul className="divide-y">
              {lowStock.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-md border bg-muted">
                    <Wrench className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.brand.name} · {p.category.name}
                    </p>
                  </div>
                  <span
                    className={
                      "rounded-md border px-2 py-0.5 text-xs font-medium " +
                      (p.stock === "out_of_stock"
                        ? "border-destructive/30 bg-destructive/10 text-destructive"
                        : "border-warning/30 bg-warning/10 text-warning")
                    }
                  >
                    {p.stock === "out_of_stock"
                      ? "Out of stock"
                      : `Only ${p.stockCount}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border bg-card">
          <header className="flex items-center justify-between border-b p-5">
            <div>
              <p className="text-eyebrow uppercase text-muted-foreground">
                Reservations
              </p>
              <h2 className="font-display text-base font-semibold">
                Expiring soonest
              </h2>
            </div>
            <Link
              href="/admin/reservations"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </header>
          {expiringReservations.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">
              No active reservations right now.
            </p>
          ) : (
            <ul className="divide-y">
              {expiringReservations.slice(0, 5).map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-sm">{r.number}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.items[0].name}
                      {r.items.length > 1 && ` + ${r.items.length - 1}`}
                    </p>
                  </div>
                  <ReservationStatusBadge status={r.status} />
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function RevenueBars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="grid grid-cols-14 items-end gap-1.5" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
      {data.map((v, i) => {
        const h = Math.round((v / max) * 100);
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-full rounded bg-brand-orange-500/80 transition-all"
              style={{ height: `${Math.max(8, h)}%`, minHeight: 6 }}
              title={`Day ${i + 1}: ${(v / 100).toFixed(2)}`}
            />
          </div>
        );
      })}
    </div>
  );
}

function FunnelRow({
  label,
  value,
  total,
  tone,
}: {
  label: string;
  value: number;
  total: number;
  tone: "success" | "danger" | "neutral";
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  const barClass =
    tone === "success"
      ? "bg-success"
      : tone === "danger"
      ? "bg-destructive"
      : "bg-muted-foreground";
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium tabular-nums">
          {value} <span className="text-muted-foreground">({pct}%)</span>
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={"h-full " + barClass}
          style={{ width: `${pct}%` }}
        />
      </div>
    </li>
  );
}
