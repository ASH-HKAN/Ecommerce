"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wrench,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getReservationByNumber,
  type Reservation,
} from "@/data/account-mocks";
import type { ReservationStatus } from "@/components/product/status-badges";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { ReservationTimer } from "@/components/reservation/reservation-timer";
import { formatPrice } from "@/lib/fmt";

export default function ReservationDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = decodeURIComponent(params?.id ?? "");
  const r = getReservationByNumber(id);

  if (!r) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <h2 className="font-display text-lg">We couldn't find that reservation.</h2>
        <Link
          href="/account/reservations"
          className="mt-6 inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
        >
          Back to reservations
        </Link>
      </div>
    );
  }

  return <ReservationDetail reservation={r} router={router} />;
}

function ReservationDetail({
  reservation,
  router,
}: {
  reservation: Reservation;
  router: ReturnType<typeof useRouter>;
}) {
  // Local state so cancel/pay actions reactively update the UI.
  const [status, setStatus] = React.useState<ReservationStatus>(
    reservation.status
  );
  const [expiryOffsetMs, setExpiryOffsetMs] = React.useState(
    reservation.expiryOffsetMs
  );
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const isActive = status === "active" || status === "expiring_soon";
  const isExpired = status === "expired";
  const isCancelled = status === "cancelled";

  function payNow() {
    toast.success(`Redirecting to checkout for ${reservation.number}…`);
    setTimeout(() => router.push("/checkout"), 600);
  }

  async function confirmCancel() {
    setPending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Update local state so this view reflects the change immediately.
    setStatus("cancelled");
    setExpiryOffsetMs(-1);

    // Persist to the mock so going back to the list shows the change too.
    reservation.status = "cancelled";
    reservation.expiryOffsetMs = -1;

    setPending(false);
    setConfirmOpen(false);
    toast.success(`Reservation ${reservation.number} cancelled.`, {
      description: "Reserved stock is now available to other customers.",
      action: {
        label: "Reserve again",
        onClick: () => router.push(`/products/${reservation.items[0].slug}`),
      },
    });
  }

  return (
    <div className="space-y-6">
      <Link
        href="/account/reservations"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to reservations
      </Link>

      <AccountPageHeader
        eyebrow={`Reservation ${reservation.number}`}
        title={
          isExpired
            ? "Reservation expired"
            : status === "converted"
            ? "Paid — order created"
            : isCancelled
            ? "Reservation cancelled"
            : "Reserved for you"
        }
        description={
          isActive
            ? "Stock is locked for you. Pay before the timer ends to keep this reservation."
            : isExpired
            ? "This item is now available to other customers. You can reserve it again if stock is available."
            : status === "converted"
            ? `This reservation became order ${reservation.convertedOrderNumber}.`
            : "Reserved stock has been returned to inventory."
        }
      />

      <ReservationTimer
        status={status}
        expiryOffsetMs={expiryOffsetMs}
        variant="prominent"
      />

      {isActive && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={payNow}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Pay {formatPrice(reservation.subtotal)}
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex h-12 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            Cancel reservation
          </button>
        </div>
      )}

      {(isExpired || isCancelled) && (
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/products/${reservation.items[0].slug}`}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Bookmark className="size-4" />
            Reserve again
          </Link>
          <Link
            href="/shop?reservable=1"
            className="inline-flex h-12 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted"
          >
            Browse alternatives
          </Link>
        </div>
      )}

      {status === "converted" && reservation.convertedOrderNumber && (
        <Link
          href={`/account/orders/${reservation.convertedOrderNumber}`}
          className="inline-flex items-center gap-2 rounded-md border bg-card px-4 py-3 text-sm font-medium hover:bg-muted"
        >
          View order {reservation.convertedOrderNumber}
          <ChevronRight className="size-4" />
        </Link>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
        <section className="rounded-2xl border bg-card">
          <header className="border-b p-5">
            <h2 className="font-display text-base font-semibold">Items reserved</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Prices are locked at the moment of reservation.
            </p>
          </header>
          <ul className="divide-y">
            {reservation.items.map((it) => (
              <li
                key={it.productId}
                className="flex items-center gap-4 p-5"
              >
                <div className="grid size-14 place-items-center rounded-md border bg-muted">
                  <Wrench className="size-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-eyebrow uppercase text-muted-foreground">
                    {it.brand}
                  </p>
                  <Link
                    href={`/products/${it.slug}`}
                    className="line-clamp-1 font-medium hover:underline"
                  >
                    {it.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Qty {it.qty} · {formatPrice(it.unitPrice)} each
                  </p>
                </div>
                <p className="font-display text-base font-bold tabular-nums">
                  {formatPrice(it.unitPrice * it.qty)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border bg-card p-5">
            <p className="text-eyebrow uppercase text-muted-foreground">
              Reservation total
            </p>
            <p className="mt-1 font-display text-3xl font-bold tabular-nums">
              {formatPrice(reservation.subtotal)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tax and shipping calculated at checkout.
            </p>
          </section>

          <section className="rounded-2xl border bg-card p-5">
            <p className="text-eyebrow uppercase text-muted-foreground">
              How reservation works
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">1</span>
                Stock is locked for 24 hours.
              </li>
              <li className="flex gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">2</span>
                Pay before the timer ends to keep it.
              </li>
              <li className="flex gap-2">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">3</span>
                If unpaid, stock returns to inventory automatically.
              </li>
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" />
              No fees, no commitment. Cancel anytime.
            </p>
          </section>
        </aside>
      </div>

      <Dialog open={confirmOpen} onOpenChange={(o) => !pending && setConfirmOpen(o)}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-warning/10 text-warning">
                <AlertTriangle className="size-5" />
              </span>
              <DialogTitle className="font-display">Cancel reservation?</DialogTitle>
            </div>
            <DialogDescription>
              {reservation.number} will be released and the {reservation.items.length === 1 ? "item" : "items"}{" "}
              will be available to other customers immediately. This can't be undone — you'll
              need to reserve again if you change your mind.
            </DialogDescription>
          </DialogHeader>

          <ul className="my-2 divide-y rounded-md border bg-muted/40">
            {reservation.items.map((it) => (
              <li
                key={it.productId}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
              >
                <span className="line-clamp-1">
                  <span className="font-medium">{it.qty} ×</span> {it.name}
                </span>
                <span className="font-medium tabular-nums">
                  {formatPrice(it.unitPrice * it.qty)}
                </span>
              </li>
            ))}
          </ul>

          <DialogFooter>
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              disabled={pending}
              className="inline-flex h-10 items-center rounded-md border bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Keep reservation
            </button>
            <button
              type="button"
              onClick={confirmCancel}
              disabled={pending}
              className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            >
              {pending ? "Cancelling…" : "Yes, cancel"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
