import Link from "next/link";
import { PackageX } from "lucide-react";

export default function NotFoundProduct() {
  return (
    <section className="container py-24 text-center">
      <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-muted">
        <PackageX className="size-7 text-muted-foreground" />
      </div>
      <h1 className="font-display text-display-sm">We couldn't find that tool.</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The link may be broken or the tool may have been moved.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Browse all tools
        </Link>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
