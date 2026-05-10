import Link from "next/link";
import { AlertTriangle, RefreshCcw, MessageSquare } from "lucide-react";

export const metadata = { title: "Payment didn't complete" };

export default function CheckoutFailurePage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-2xl text-center">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-warning/10 text-warning">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="font-display text-display-md">
          We couldn't complete your payment.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Your card may have been declined or the connection failed. Your
          basket is saved — nothing was charged.
        </p>

        <div className="mt-8 rounded-2xl border bg-card p-6 text-left">
          <p className="text-eyebrow uppercase text-muted-foreground">
            What you can do
          </p>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted">
                1
              </span>
              <span>
                Try the same card again — most decline events are temporary.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted">
                2
              </span>
              <span>
                Use a different payment method like Apple Pay or Google Pay.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted">
                3
              </span>
              <span>
                Contact support — we'll help you finish the order.
              </span>
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <RefreshCcw className="size-4" />
              Try again
            </Link>
            <Link
              href="/cart"
              className="inline-flex h-11 items-center rounded-md border bg-background px-5 text-sm font-medium hover:bg-muted"
            >
              Back to basket
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <MessageSquare className="size-4" />
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
