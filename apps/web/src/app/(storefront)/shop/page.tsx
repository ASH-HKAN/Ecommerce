import { Search } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/mocks";
import { ProductCard } from "@/components/product/product-card";
import { FilterSidebar, ActiveFilterChips } from "@/components/shop/filter-sidebar";
import { SortSelect } from "@/components/shop/sort-select";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { filterAndSortProducts } from "@/lib/filter-products";

export const metadata = { title: "Shop tools" };

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ShopPage({ searchParams }: Props) {
  const list = filterAndSortProducts(products, searchParams);
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;

  return (
    <section className="py-10 lg:py-14">
      <div className="container">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-eyebrow uppercase text-muted-foreground">
              Shop
            </p>
            <h1 className="mt-1 font-display text-display-sm md:text-display-md">
              {q ? `Results for "${q}"` : "All tools"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {list.length} {list.length === 1 ? "tool" : "tools"} matching your filters.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MobileFilters count={list.length} />
            <SortSelect />
          </div>
        </div>

        {/* Active chips */}
        <div className="mb-6">
          <ActiveFilterChips />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px,1fr]">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Grid */}
          <div>
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
                <div className="mb-5 grid size-16 place-items-center rounded-full bg-muted">
                  <Search className="size-7 text-muted-foreground" />
                </div>
                <h2 className="font-display text-xl">
                  No tools match those filters.
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Try removing a filter or starting fresh.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Clear filters
                  </Link>
                  <Link
                    href="/shop"
                    className="inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
                  >
                    View all tools
                  </Link>
                </div>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {list.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
