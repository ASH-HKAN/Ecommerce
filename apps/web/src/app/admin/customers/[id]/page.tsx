import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Tag,
  StickyNote,
  Wrench,
  CreditCard,
  Bookmark,
  ShoppingCart,
} from "lucide-react";
import {
  adminCustomers,
  orders,
  reservations,
  adminPayments,
} from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import {
  OrderStatusBadge,
  ReservationStatusBadge,
} from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return adminCustomers.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: Props) {
  const c = adminCustomers.find((x) => x.id === params.id);
  return { title: c ? `${c.firstName} ${c.lastName}` : "Customer" };
}

export default function AdminCustomerDetailPage({ params }: Props) {
  const c = adminCustomers.find((x) => x.id === params.id);
  if (!c) notFound();

  const initials = `${c.firstName[0]}${c.lastName[0]}`.toUpperCase();
  const customerOrders = orders.slice(0, c.ordersCount > 0 ? Math.min(c.ordersCount, 4) : 0);
  const customerReservations = reservations.slice(0, Math.min(c.reservationsCount, 3));

  // Build a simple timeline from orders + payments + reservations
  type Ev = { ts: string; kind: string; title: string; payload?: string };
  const events: Ev[] = [];
  customerOrders.forEach((o) =>
    events.push({
      ts: o.placedAt,
      kind: "order",
      title: `Order ${o.number} placed`,
      payload: formatPrice(o.total),
    })
  );
  reservations.slice(0, 2).forEach((r) =>
    events.push({
      ts: r.createdAt,
      kind: "reservation",
      title: `Reservation ${r.number}`,
      payload: r.status,
    })
  );
  adminPayments.slice(0, 3).forEach((p) =>
    events.push({
      ts: p.ts,
      kind: "payment",
      title:
        p.status === "failed"
          ? `Payment failed (${p.method})`
          : `Payment ${p.status}`,
      payload: formatPrice(p.amount),
    })
  );
  events.sort((a, b) => +new Date(b.ts) - +new Date(a.ts));

  return (
    <div className="space-y-6">
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to customers
      </Link>

      {/* Header card */}
      <section className="rounded-2xl border bg-card p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-full bg-foreground text-background">
              <span className="font-semibold">{initials}</span>
            </div>
            <div>
              <h1 className="font-display text-display-sm">
                {c.firstName} {c.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {c.workshop ? `${c.workshop} · ` : ""}joined{" "}
                {new Date(c.joinedAt).toLocaleDateString()}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full border bg-muted px-2 py-0.5 text-[11px] font-medium"
                  >
                    <Tag className="size-3" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${c.email}`}
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted"
            >
              <Mail className="size-4" /> Email
            </a>
            <a
              href={`tel:${c.phone}`}
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted"
            >
              <Phone className="size-4" /> Call
            </a>
            <button className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium hover:bg-muted">
              <StickyNote className="size-4" /> Add note
            </button>
            {c.status === "blocked" ? (
              <button className="inline-flex h-10 items-center rounded-md bg-success px-3 text-sm font-medium text-success-foreground">
                Unblock
              </button>
            ) : (
              <button className="inline-flex h-10 items-center rounded-md border border-destructive/40 bg-destructive/10 px-3 text-sm font-medium text-destructive hover:bg-destructive/20">
                Block
              </button>
            )}
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Lifetime spend" value={formatPrice(c.lifetimeSpend)} icon={CreditCard} />
          <Stat label="Orders" value={String(c.ordersCount)} icon={ShoppingCart} />
          <Stat label="Reservations" value={String(c.reservationsCount)} icon={Bookmark} />
          <Stat label="Last active" value={c.lastActivity} />
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
        {/* Timeline */}
        <section className="rounded-2xl border bg-card">
          <header className="border-b p-5">
            <h2 className="font-display text-base font-semibold">Activity timeline</h2>
            <p className="text-xs text-muted-foreground">
              Orders, reservations, payments, and notes.
            </p>
          </header>
          <ol className="divide-y">
            {events.length === 0 && (
              <li className="p-6 text-sm text-muted-foreground">
                No activity yet.
              </li>
            )}
            {events.map((e, i) => (
              <li key={i} className="flex items-start gap-3 p-5">
                <span
                  className={
                    "mt-1 grid size-8 shrink-0 place-items-center rounded-md " +
                    (e.kind === "order"
                      ? "bg-info/10 text-info"
                      : e.kind === "reservation"
                      ? "bg-brand-orange-500/10 text-brand-orange-500"
                      : "bg-success/10 text-success")
                  }
                >
                  {e.kind === "order" ? (
                    <ShoppingCart className="size-4" />
                  ) : e.kind === "reservation" ? (
                    <Bookmark className="size-4" />
                  ) : (
                    <CreditCard className="size-4" />
                  )}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(e.ts).toLocaleString()}
                    {e.payload && ` · ${e.payload}`}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Side panels */}
        <aside className="space-y-4">
          <Panel title="Profile">
            <Row label="Email" value={c.email} />
            <Row label="Phone" value={c.phone} />
            {c.workshop && <Row label="Workshop" value={c.workshop} />}
            <Row label="Joined" value={new Date(c.joinedAt).toLocaleDateString()} />
          </Panel>

          <Panel title="Recent orders">
            {customerOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <ul className="space-y-2">
                {customerOrders.map((o) => (
                  <li
                    key={o.id}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <Link
                      href={`/account/orders/${o.number}`}
                      className="font-mono text-xs hover:underline"
                    >
                      {o.number}
                    </Link>
                    <OrderStatusBadge status={o.status} />
                    <span className="font-medium tabular-nums">
                      {formatPrice(o.total)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Active reservations">
            {customerReservations.length === 0 ? (
              <p className="text-sm text-muted-foreground">None right now.</p>
            ) : (
              <ul className="space-y-2">
                {customerReservations.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-mono text-xs">{r.number}</span>
                    <ReservationStatusBadge status={r.status} />
                    <span className="font-medium tabular-nums">
                      {formatPrice(r.subtotal)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Internal notes">
            <p className="text-sm text-muted-foreground">
              No internal notes. Add context here that customers won't see.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-xs font-medium hover:bg-muted"
            >
              <StickyNote className="size-3.5" />
              Add note
            </button>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <li className="rounded-xl border bg-background p-4">
      {Icon && (
        <span className="grid size-8 place-items-center rounded-md bg-muted text-foreground">
          <Icon className="size-4" />
        </span>
      )}
      <p className="mt-2 text-eyebrow uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold tabular-nums">{value}</p>
    </li>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-card p-5">
      <p className="mb-3 text-eyebrow uppercase text-muted-foreground">{title}</p>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
