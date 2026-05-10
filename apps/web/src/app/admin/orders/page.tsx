import Link from "next/link";
import { Search, Wrench } from "lucide-react";
import { orders } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusBadge } from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";

export const metadata = { title: "Orders" };

const FILTERS = [
  { key: "all",      label: "All" },
  { key: "open",     label: "Open" },
  { key: "shipped",  label: "Shipped" },
  { key: "delivered",label: "Delivered" },
  { key: "refunded", label: "Refunds" },
];

type Props = { searchParams: { status?: string } };

export default function AdminOrdersPage({ searchParams }: Props) {
  const key = searchParams.status ?? "all";
  const list = orders.filter((o) => {
    if (key === "all") return true;
    if (key === "open") return ["pending_payment", "paid", "processing"].includes(o.status);
    if (key === "refunded") return o.status === "refunded";
    return o.status === key;
  });

  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.orders.title"
        descriptionKey="admin.orders.description"
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = key === f.key;
            return (
              <li key={f.key}>
                <Link
                  href={`/admin/orders?status=${f.key}`}
                  className={
                    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium " +
                    (active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground/80 hover:bg-muted")
                  }
                >
                  {f.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="relative w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Order # or customer"
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-3">Order</div>
          <div className="col-span-2">Customer</div>
          <div className="col-span-2">Items</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-1 text-right">Date</div>
        </div>
        <ul className="divide-y">
          {list.map((o) => (
            <li
              key={o.id}
              className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
            >
              <div className="col-span-3 flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-md border bg-muted">
                  <Wrench className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <Link
                    href={`/account/orders/${o.number}`}
                    className="font-mono text-sm hover:underline"
                  >
                    {o.number}
                  </Link>
                  <p className="text-[11px] text-muted-foreground">
                    {o.shippingMethod}
                  </p>
                </div>
              </div>
              <div className="col-span-2 text-sm">Marco Reyes</div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {o.items.length} {o.items.length === 1 ? "item" : "items"}
              </div>
              <div className="col-span-2">
                <OrderStatusBadge status={o.status} />
              </div>
              <div className="col-span-2 text-right font-medium tabular-nums">
                {formatPrice(o.total)}
              </div>
              <div className="col-span-1 text-right text-xs text-muted-foreground">
                {new Date(o.placedAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
