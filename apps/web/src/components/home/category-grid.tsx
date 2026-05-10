import Link from "next/link";
import { ArrowUpRight, Activity, Wrench, Drill, Cog, Package, Plug } from "lucide-react";
import { categories } from "@/data/mocks";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Activity, Wrench, Drill, Cog, Package, Plug,
};

export function CategoryGrid() {
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow uppercase text-muted-foreground">
              Browse by category
            </p>
            <h2 className="mt-2 font-display text-display-sm md:text-display-md">
              Everything for the bay.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all categories
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const Icon = ICONS[c.iconKey] ?? Wrench;
            return (
              <li key={c.id}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-elev-2"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-brand-orange-500/10 group-hover:text-brand-orange-500">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-medium leading-tight">{c.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
