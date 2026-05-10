import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { editorsPicks } from "@/data/mocks";
import { ProductIconArt } from "@/components/product/product-icon";
import { PriceBlock } from "@/components/product/price-block";
import { InventoryStatusBadge } from "@/components/product/status-badges";

const editorial = [
  {
    eyebrow: "Editor's pick",
    title: "The diagnostic kit we recommend first.",
    body: "Live data, bi-directional control, and a Bluetooth dongle that just works on iOS and Android. A solid starting point for any general-service shop.",
  },
  {
    eyebrow: "Editor's pick",
    title: "The multimeter that pays for itself.",
    body: "True-RMS, 1000 V CAT IV. Built to outlive everything else on the bench, including arguments about who borrowed it last.",
  },
];

export function EditorsPicks() {
  return (
    <section className="border-b py-16 lg:py-24">
      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="text-eyebrow uppercase text-muted-foreground">
            Editor's picks
          </p>
          <h2 className="mt-2 font-display text-display-sm md:text-display-md">
            Tools we'd pull off the truck first.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {editorsPicks.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group flex flex-col gap-6 overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-elev-3 sm:flex-row"
            >
              <div className="aspect-square w-full shrink-0 overflow-hidden rounded-xl border sm:w-56">
                <ProductIconArt
                  iconKey={p.iconKey}
                  className="transition-transform duration-300 ease-standard group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-foreground px-2 py-0.5 text-background">
                    {editorial[i]?.eyebrow ?? "Editor's pick"}
                  </span>
                  <span className="text-muted-foreground">{p.brand.name}</span>
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug">
                  {editorial[i]?.title ?? p.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {editorial[i]?.body ?? p.shortSpec}
                </p>
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="size-3.5 fill-warning text-warning" />
                  <span className="font-medium tabular-nums">
                    {p.rating.average.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">
                    ({p.rating.count})
                  </span>
                  <InventoryStatusBadge
                    state={p.stock}
                    reservable={p.reservable}
                    className="ml-2"
                  />
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <PriceBlock
                    price={p.price}
                    compareAt={p.compareAt}
                    size="lg"
                  />
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    See product
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
