import Link from "next/link";
import { Heart } from "lucide-react";
import { wishlist } from "@/data/account-mocks";
import { ProductCard } from "@/components/product/product-card";
import { AccountPageHeader } from "@/components/account/account-page-header";

export const metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <div>
      <AccountPageHeader
        title="Wishlist"
        description="Tools you saved for later. Add to basket or reserve when you're ready."
      />

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-12 text-center">
          <div className="mb-5 grid size-16 place-items-center rounded-full bg-muted">
            <Heart className="size-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-lg">No saved tools yet.</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Tap the heart on any tool to save it for later.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse tools
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
