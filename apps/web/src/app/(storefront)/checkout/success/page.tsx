"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Truck, Mail, ArrowRight } from "lucide-react";
import { useCartStore } from "@/features/cart/use-cart-store";

export default function CheckoutSuccessPage() {
  const clear = useCartStore((s) => s.clear);
  const [orderNumber, setOrderNumber] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Generate a stable-looking order number on the client only.
    const n = `ATX-${Math.floor(10_000 + Math.random() * 90_000)}-${
      new Date().getFullYear() % 100
    }`;
    setOrderNumber(n);
    clear();
  }, [clear]);

  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-2xl text-center">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="font-display text-display-md">Order confirmed.</h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Thanks — we got your payment and your order is moving.
        </p>

        <div className="mt-8 rounded-2xl border bg-card p-6 text-left">
          <p className="text-eyebrow uppercase text-muted-foreground">
            Order number
          </p>
          <p
            className="mt-1 font-mono text-2xl font-bold tabular-nums"
            suppressHydrationWarning
          >
            {orderNumber ?? "ATX-—-—"}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card icon={Truck} title="Shipping">
              We'll email tracking once your order is dispatched. Standard
              delivery typically arrives in 1–2 business days.
            </Card>
            <Card icon={Mail} title="Receipt">
              A receipt is on the way to your inbox. You can also download it
              from your account at any time.
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/account/orders"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View order
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-11 items-center rounded-md border bg-background px-5 text-sm font-medium hover:bg-muted"
            >
              Continue shopping
            </Link>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Need help? Reply to your receipt or visit our{" "}
          <Link href="/help" className="text-primary hover:underline">
            help center
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-md bg-brand-orange-500/10 text-brand-orange-500">
          <Icon className="size-4" />
        </span>
        <p className="font-medium">{title}</p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{children}</p>
    </div>
  );
}
