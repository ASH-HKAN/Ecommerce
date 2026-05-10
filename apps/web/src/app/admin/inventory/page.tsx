import { Boxes, ArrowDownToLine, History, Wrench } from "lucide-react";
import { products, inventoryMovements } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { InventoryStatusBadge } from "@/components/product/status-badges";

export const metadata = { title: "Inventory" };

export default function AdminInventoryPage() {
  const totalUnits = products.reduce((s, p) => s + (p.stockCount ?? 0), 0);
  const reserved = 14; // demo
  const lowOrOut = products.filter(
    (p) => p.stock === "low_stock" || p.stock === "out_of_stock"
  ).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.inventory.title"
        descriptionKey="admin.inventory.description"
        actions={
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <ArrowDownToLine className="size-4" />
            Adjust stock
          </button>
        }
      />

      <ul className="grid gap-4 sm:grid-cols-3">
        <SummaryTile label="On hand" value={totalUnits} icon={Boxes} />
        <SummaryTile label="Reserved" value={reserved} icon={Boxes} />
        <SummaryTile label="Low / out of stock" value={lowOrOut} icon={Boxes} tone="warning" />
      </ul>

      <section className="rounded-2xl border bg-card">
        <header className="flex items-center justify-between border-b p-5">
          <h2 className="font-display text-base font-semibold">Stock by SKU</h2>
          <p className="text-xs text-muted-foreground">
            available = total − reserved − sold
          </p>
        </header>
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-2 text-right">Reserved</div>
          <div className="col-span-2 text-right">Available</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        <ul className="divide-y">
          {products.map((p) => {
            const total = p.stockCount ?? 0;
            const res = p.reservable && total > 0 ? Math.min(2, total) : 0;
            const avail = Math.max(0, total - res);
            return (
              <li
                key={p.id}
                className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-md border bg-muted">
                    <Wrench className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {p.id.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 text-right text-sm tabular-nums">
                  {total}
                </div>
                <div className="col-span-2 text-right text-sm tabular-nums">
                  {res}
                </div>
                <div className="col-span-2 text-right text-sm font-medium tabular-nums">
                  {avail}
                </div>
                <div className="col-span-1 flex justify-end">
                  <InventoryStatusBadge state={p.stock} reservable={p.reservable} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border bg-card">
        <header className="flex items-center gap-2 border-b p-5">
          <History className="size-4 text-muted-foreground" />
          <h2 className="font-display text-base font-semibold">Recent movements</h2>
        </header>
        <ul className="divide-y">
          {inventoryMovements.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between gap-4 p-4 hover:bg-muted/40"
            >
              <div>
                <p className="text-sm font-medium">
                  {products.find((p) => p.slug === m.productSlug)?.name ?? m.productSlug}
                </p>
                <p className="text-xs text-muted-foreground">
                  {m.reason} · by {m.actor} · {new Date(m.ts).toLocaleString()}
                </p>
              </div>
              <span
                className={
                  "font-mono text-sm font-medium tabular-nums " +
                  (m.delta > 0 ? "text-success" : "text-destructive")
                }
              >
                {m.delta > 0 ? "+" : ""}
                {m.delta}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "warning";
}) {
  const ring =
    tone === "warning" ? "border-warning/40 bg-warning/5" : "border-border bg-background";
  return (
    <li
      className={`flex items-center gap-4 rounded-2xl border p-5 ${ring}`}
    >
      <span className="grid size-10 place-items-center rounded-md bg-muted text-foreground">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-eyebrow uppercase text-muted-foreground">{label}</p>
        <p className="font-display text-2xl font-bold tabular-nums">{value}</p>
      </div>
    </li>
  );
}
