import { Search } from "lucide-react";
import { adminPayments } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { formatPrice } from "@/lib/fmt";

export const metadata = { title: "Payments" };

const STATUS_TONE: Record<string, string> = {
  paid: "border-success/30 bg-success/10 text-success",
  failed: "border-destructive/30 bg-destructive/10 text-destructive",
  refunded: "border-border bg-muted text-muted-foreground",
  pending: "border-warning/30 bg-warning/10 text-warning",
};

export default function AdminPaymentsPage() {
  const total = adminPayments.reduce((s, p) => s + (p.status === "paid" ? p.amount : 0), 0);
  const failedCount = adminPayments.filter((p) => p.status === "failed").length;
  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.payments.title"
        descriptionKey="admin.payments.description"
      />

      <ul className="mb-4 grid gap-3 sm:grid-cols-3">
        <Tile label="Captured (filtered)" value={formatPrice(total)} />
        <Tile label="Failed (24h)" value={String(failedCount)} tone="warning" />
        <Tile label="Refunds (filtered)" value={String(adminPayments.filter((p) => p.status === "refunded").length)} />
      </ul>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Charge, customer, or order"
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option>All statuses</option>
          <option>Paid</option>
          <option>Failed</option>
          <option>Refunded</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-4">Charge</div>
          <div className="col-span-2">Customer</div>
          <div className="col-span-2">Method</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-1 text-right">Order</div>
        </div>
        <ul className="divide-y">
          {adminPayments.map((p) => (
            <li
              key={p.id}
              className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
            >
              <div className="col-span-4">
                <p className="font-mono text-xs">{p.chargeId}</p>
                <p className="text-[11px] text-muted-foreground">
                  {new Date(p.ts).toLocaleString()}
                </p>
              </div>
              <div className="col-span-2 text-sm">{p.customer}</div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {p.method}
              </div>
              <div className="col-span-1">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-medium ${STATUS_TONE[p.status]}`}
                >
                  {p.status}
                </span>
              </div>
              <div className="col-span-2 text-right font-medium tabular-nums">
                {formatPrice(p.amount)}
              </div>
              <div className="col-span-1 text-right text-xs">
                {p.orderNumber ?? "—"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Tile({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "warning";
}) {
  const ring =
    tone === "warning" ? "border-warning/40 bg-warning/5" : "border-border bg-card";
  return (
    <li className={`rounded-2xl border p-5 ${ring}`}>
      <p className="text-eyebrow uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tabular-nums">{value}</p>
    </li>
  );
}
