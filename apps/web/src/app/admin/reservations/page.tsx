import Link from "next/link";
import { Wrench } from "lucide-react";
import { reservations } from "@/data/admin-mocks";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ReservationStatusBadge } from "@/components/product/status-badges";
import { ReservationTimer } from "@/components/reservation/reservation-timer";
import { formatPrice } from "@/lib/fmt";
import type { ReservationStatus } from "@/components/product/status-badges";

export const metadata = { title: "Reservations" };

const FILTERS: { key: string; label: string; match: (s: ReservationStatus) => boolean }[] = [
  { key: "active",    label: "Active",    match: (s) => s === "active" || s === "expiring_soon" },
  { key: "expired",   label: "Expired",   match: (s) => s === "expired" },
  { key: "cancelled", label: "Cancelled", match: (s) => s === "cancelled" },
  { key: "converted", label: "Converted", match: (s) => s === "converted" },
];

type Props = { searchParams: { status?: string } };

export default function AdminReservationsPage({ searchParams }: Props) {
  const key = searchParams.status ?? "active";
  const matcher =
    FILTERS.find((f) => f.key === key)?.match ?? FILTERS[0].match;
  const list = reservations
    .filter((r) => matcher(r.status))
    .sort((a, b) => a.expiryOffsetMs - b.expiryOffsetMs);

  return (
    <div>
      <AdminPageHeader
        eyebrowKey="admin.dashboard.eyebrow"
        titleKey="admin.reservations.title"
        descriptionKey="admin.reservations.description"
      />

      <ul className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <li key={f.key}>
            <Link
              href={`/admin/reservations?status=${f.key}`}
              className={
                "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium " +
                (key === f.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground/80 hover:bg-muted")
              }
            >
              {f.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b bg-muted/40 px-5 py-3 text-eyebrow uppercase text-muted-foreground md:grid">
          <div className="col-span-3">Reservation</div>
          <div className="col-span-3">Items</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Time left</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>
        <ul className="divide-y">
          {list.map((r) => (
            <li
              key={r.id}
              className="grid grid-cols-1 gap-3 px-5 py-4 hover:bg-muted/40 md:grid-cols-12 md:items-center"
            >
              <div className="col-span-3">
                <p className="font-mono text-sm">{r.number}</p>
                <p className="text-[11px] text-muted-foreground">
                  Created {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-3 flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-md border bg-muted">
                  <Wrench className="size-4 text-muted-foreground" />
                </div>
                <p className="line-clamp-2 text-sm">
                  {r.items[0].name}
                  {r.items.length > 1 && (
                    <span className="text-muted-foreground">
                      {" "}+ {r.items.length - 1} more
                    </span>
                  )}
                </p>
              </div>
              <div className="col-span-2">
                <ReservationStatusBadge status={r.status} />
              </div>
              <div className="col-span-2">
                <ReservationTimer
                  status={r.status}
                  expiryOffsetMs={r.expiryOffsetMs}
                  variant="mini"
                />
              </div>
              <div className="col-span-2 text-right font-medium tabular-nums">
                {formatPrice(r.subtotal)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
