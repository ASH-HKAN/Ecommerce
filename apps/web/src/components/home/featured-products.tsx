"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProducts } from "@/data/mocks";
import { ProductCard } from "@/components/product/product-card";
import { useI18n } from "@/i18n/i18n-provider";

export function FeaturedProducts() {
  const { t } = useI18n();
  return (
    <section className="border-b bg-muted/30 py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="text-eyebrow uppercase text-muted-foreground"
              suppressHydrationWarning
            >
              {t("home.featured.eyebrow")}
            </p>
            <h2
              className="mt-2 font-display text-display-sm md:text-display-md"
              suppressHydrationWarning
            >
              {t("home.featured.title")}
            </h2>
          </div>
          <Link
            href="/shop?sort=popular"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            suppressHydrationWarning
          >
            {t("common.viewAll")}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              className="w-[78%] shrink-0 snap-start sm:w-[58%] md:w-[40%] lg:w-auto"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
