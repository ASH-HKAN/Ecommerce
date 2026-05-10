import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CartPageList } from "@/components/cart/cart-page-list";
import { CartSummary } from "@/components/cart/cart-summary";

export const metadata = { title: "Your basket" };

export default function CartPage() {
  return (
    <section className="py-10 lg:py-14">
      <div className="container">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3" />
            </li>
            <li className="text-foreground">Basket</li>
          </ol>
        </nav>

        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-display-sm md:text-display-md">
              Your basket
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Review your tools, then proceed to a secure checkout.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,360px]">
          <CartPageList />
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
