import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  Wrench,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { products } from "@/data/mocks";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductDetailActions } from "@/components/product/product-detail-actions";
import { PriceBlock } from "@/components/product/price-block";
import { InventoryStatusBadge } from "@/components/product/status-badges";
import { ProductCard } from "@/components/product/product-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: "Tool not found" };
  return {
    title: product.name,
    description: product.shortSpec,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category.id === product.category.id ||
          p.brand.id === product.brand.id)
    )
    .slice(0, 4);

  const specs: { label: string; value: string }[] = [
    { label: "Brand", value: product.brand.name },
    { label: "Category", value: product.category.name },
    { label: "SKU", value: product.id.toUpperCase() },
    { label: "Reservable", value: product.reservable ? "Yes — 24h hold" : "No" },
    { label: "Warranty", value: "12 months manufacturer + 30 days returns" },
    { label: "Shipping", value: "1–2 business days, tracked" },
  ];

  return (
    <article className="py-8 lg:py-12">
      {/* Breadcrumbs */}
      <div className="container mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3" />
            </li>
            <li>
              <Link href="/shop" className="hover:text-foreground">
                Shop
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3" />
            </li>
            <li>
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-foreground"
              >
                {product.category.name}
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3" />
            </li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>
      </div>

      <div className="container grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery iconKey={product.iconKey} productName={product.name} />

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-eyebrow uppercase text-muted-foreground">
              {product.brand.name}
            </span>
            <InventoryStatusBadge
              state={product.stock}
              reservable={product.reservable}
            />
          </div>

          <h1 className="font-display text-display-sm md:text-display-md">
            {product.name}
          </h1>

          <p className="text-sm text-muted-foreground md:text-base">
            {product.shortSpec}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < Math.round(product.rating.average)
                      ? "size-4 fill-warning text-warning"
                      : "size-4 text-muted-foreground/40"
                  }
                />
              ))}
            </div>
            <span className="font-medium tabular-nums">
              {product.rating.average.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              · {product.rating.count} reviews
            </span>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <PriceBlock
              price={product.price}
              compareAt={product.compareAt}
              size="lg"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Tax calculated at checkout.{" "}
              {product.stock === "in_stock"
                ? "In stock — ships in 1–2 days."
                : product.stock === "low_stock"
                ? `Only ${product.stockCount} left — ships in 1–2 days.`
                : product.stock === "reservable"
                ? "Reservation only — 24h hold."
                : "Currently out of stock."}
            </p>

            <div className="mt-5">
              <ProductDetailActions product={product} />
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 text-xs text-muted-foreground sm:grid-cols-4">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand-orange-500" /> Secure payment
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-brand-orange-500" /> Real warranty
              </li>
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-brand-orange-500" /> Fast delivery
              </li>
              <li className="flex items-center gap-2">
                <Wrench className="size-4 text-brand-orange-500" /> Easy returns
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mt-14">
        <Tabs defaultValue="description">
          <TabsList className="border-b">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
            <TabsTrigger value="warranty">Warranty &amp; returns</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="prose-sm max-w-none py-6">
            <p className="text-sm leading-relaxed text-foreground/80">
              {product.name} is built for daily workshop use. {product.shortSpec}.
              Engineered with serviceability in mind, every unit is bench-tested
              before it leaves the warehouse and ships with full manufacturer
              documentation.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              We carry only genuine stock from authorized distributors, so the
              warranty you read on the box is the warranty we honor. If a
              defect appears within the warranty window, we replace or refund
              without sending you to a third party.
            </p>
          </TabsContent>

          <TabsContent value="specs" className="py-6">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm md:grid-cols-2">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between border-b py-2"
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-medium tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
          </TabsContent>

          <TabsContent value="compatibility" className="py-6">
            <div className="rounded-xl border border-dashed bg-muted/30 p-6">
              <p className="text-eyebrow uppercase text-muted-foreground">
                Vehicle compatibility
              </p>
              <p className="mt-2 max-w-2xl text-sm text-foreground/80">
                Tell us your vehicle and we'll confirm fit before shipping.
                Make/model/year selection arrives in the next phase. For
                tool-specific compatibility, see Specifications.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="warranty" className="py-6 text-sm leading-relaxed">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-5">
                <p className="text-eyebrow uppercase text-muted-foreground">
                  Warranty
                </p>
                <p className="mt-2 text-foreground/80">
                  12-month manufacturer warranty honored directly by us. Defects
                  in materials or workmanship are repaired or replaced.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-5">
                <p className="text-eyebrow uppercase text-muted-foreground">
                  Returns
                </p>
                <p className="mt-2 text-foreground/80">
                  30-day return window for unused items in original packaging.
                  We pay the return label on warranty cases.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            <div className="grid gap-4 md:grid-cols-[200px,1fr]">
              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold tabular-nums">
                    {product.rating.average.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 5</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Based on {product.rating.count} reviews
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 text-sm text-muted-foreground">
                Reviews UI is built on the same primitives but content lives
                behind verified-purchase rules. We render an empty placeholder
                here for the prototype.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container mt-16">
          <h2 className="mb-6 font-display text-display-sm">
            Customers also looked at
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
