import Link from "next/link";
import { Pencil, Plus, Search, Wrench } from "lucide-react";
import { products } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { InventoryStatusBadge } from "@/components/product/status-badges";
import { formatPrice } from "@/lib/fmt";

export const metadata = { title: "Products" };

export default function AdminProductsPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.products.eyebrow"
        titleKey="admin.products.title"
        descriptionKey="admin.products.description"
        actions={
          <>
            <Link
              href="#"
              className="inline-flex h-10 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
            >
              Export CSV
            </Link>
            <Link
              href="/admin/products/new"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="size-4" />
              New product
            </Link>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by name or SKU"
            className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option>All statuses</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
        <select className="h-10 rounded-md border bg-background px-3 text-sm">
          <option>All categories</option>
          <option>Diagnostic Tools</option>
          <option>Hand Tools</option>
          <option>Power Tools</option>
        </select>
      </div>

      <div className="rounded-2xl border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-5">Product</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1 text-right">Price</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        <ul className="divide-y">
          {products.map((p) => (
            <li
              key={p.id}
              className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
            >
              <div className="col-span-5 flex items-center gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-md border bg-muted">
                  <Wrench className="size-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {p.id.toUpperCase()} · {p.brand.name}
                  </p>
                </div>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">
                {p.category.name}
              </div>
              <div className="col-span-1 text-right text-sm font-medium tabular-nums">
                {formatPrice(p.price)}
              </div>
              <div className="col-span-2">
                <InventoryStatusBadge state={p.stock} reservable={p.reservable} />
                {p.stockCount !== undefined && (
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {p.stockCount} on hand
                  </p>
                )}
              </div>
              <div className="col-span-1">
                <span className="rounded-md border bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  Active
                </span>
              </div>
              <div className="col-span-1 flex justify-end gap-1">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className="grid size-9 place-items-center rounded-md border hover:bg-muted"
                  aria-label={`Edit ${p.name}`}
                >
                  <Pencil className="size-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
