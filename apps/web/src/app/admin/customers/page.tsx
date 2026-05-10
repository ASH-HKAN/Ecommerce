import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { adminCustomers } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatPrice } from "@/lib/fmt";

export const metadata = { title: "Customers" };

export default function AdminCustomersPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.customers.title"
        descriptionKey="admin.customers.description"
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted">
            Export segment
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Name, email, or workshop"
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option>All segments</option>
          <option>VIP</option>
          <option>Workshop</option>
          <option>At-risk</option>
          <option>Blocked</option>
        </select>
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-4">Customer</div>
          <div className="col-span-2">Tags</div>
          <div className="col-span-1 text-right">Orders</div>
          <div className="col-span-1 text-right">Reservations</div>
          <div className="col-span-2 text-right">Lifetime</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Last active</div>
        </div>
        <ul className="divide-y">
          {adminCustomers.map((c) => {
            const initials =
              `${c.firstName[0] ?? ""}${c.lastName[0] ?? ""}`.toUpperCase();
            return (
              <li
                key={c.id}
                className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
              >
                <Link
                  href={`/admin/customers/${c.id}`}
                  className="col-span-4 flex items-center gap-3"
                >
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background text-xs font-semibold">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {c.firstName} {c.lastName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.email}
                      {c.workshop && ` · ${c.workshop}`}
                    </p>
                  </div>
                </Link>
                <div className="col-span-2">
                  <ul className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border bg-muted px-2 py-0.5 text-[11px] font-medium"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-1 text-right text-sm font-medium tabular-nums">
                  {c.ordersCount}
                </div>
                <div className="col-span-1 text-right text-sm font-medium tabular-nums">
                  {c.reservationsCount}
                </div>
                <div className="col-span-2 text-right text-sm font-medium tabular-nums">
                  {formatPrice(c.lifetimeSpend)}
                </div>
                <div className="col-span-1">
                  {c.status === "blocked" ? (
                    <span className="rounded-md border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      Blocked
                    </span>
                  ) : (
                    <span className="rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                      Active
                    </span>
                  )}
                </div>
                <div className="col-span-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  {c.lastActivity}
                  <ChevronRight className="size-3.5" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
