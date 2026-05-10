import {
  CheckCircle2,
  AlertTriangle,
  Ban,
  Bookmark,
  Clock,
  Hourglass,
  CreditCard,
  Package as PackageIcon,
  Truck,
  PackageCheck,
  Undo2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { StockState } from "@/data/types";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "brand";

const TONE_CLASSES: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-destructive/10 text-destructive border-destructive/30",
  info: "bg-info/10 text-info border-info/30",
  neutral: "bg-muted text-muted-foreground border-border",
  brand:
    "bg-brand-orange-500/10 text-brand-orange-500 border-brand-orange-500/30",
};

function StatusBadge({
  tone,
  Icon,
  label,
  className,
}: {
  tone: Tone;
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        TONE_CLASSES[tone],
        className
      )}
    >
      <Icon className="size-3" />
      {label}
    </span>
  );
}

export function InventoryStatusBadge({
  state,
  reservable,
  className,
}: {
  state: StockState;
  reservable?: boolean;
  className?: string;
}) {
  if (state === "in_stock")
    return (
      <StatusBadge
        tone="success"
        Icon={CheckCircle2}
        label="In stock"
        className={className}
      />
    );
  if (state === "low_stock")
    return (
      <StatusBadge
        tone="warning"
        Icon={AlertTriangle}
        label="Low stock"
        className={className}
      />
    );
  if (state === "out_of_stock")
    return (
      <StatusBadge
        tone="danger"
        Icon={Ban}
        label="Out of stock"
        className={className}
      />
    );
  // reservable-only state
  return (
    <StatusBadge
      tone="info"
      Icon={Clock}
      label={reservable ? "Reservable" : "Out of stock"}
      className={className}
    />
  );
}

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  const map: Record<
    OrderStatus,
    { tone: Tone; Icon: React.ComponentType<{ className?: string }>; label: string }
  > = {
    pending_payment: { tone: "warning", Icon: Hourglass, label: "Pending payment" },
    paid:            { tone: "success", Icon: CreditCard, label: "Paid" },
    processing:      { tone: "info",    Icon: PackageIcon, label: "Processing" },
    shipped:         { tone: "info",    Icon: Truck, label: "Shipped" },
    delivered:       { tone: "success", Icon: PackageCheck, label: "Delivered" },
    cancelled:       { tone: "neutral", Icon: Ban, label: "Cancelled" },
    refunded:        { tone: "neutral", Icon: Undo2, label: "Refunded" },
  };
  const { tone, Icon, label } = map[status];
  return (
    <StatusBadge tone={tone} Icon={Icon} label={label} className={className} />
  );
}

export type ReservationStatus =
  | "pending"
  | "active"
  | "expiring_soon"
  | "expired"
  | "cancelled"
  | "converted";

export function ReservationStatusBadge({
  status,
  className,
}: {
  status: ReservationStatus;
  className?: string;
}) {
  const map: Record<
    ReservationStatus,
    { tone: Tone; Icon: React.ComponentType<{ className?: string }>; label: string }
  > = {
    pending:       { tone: "neutral", Icon: Clock, label: "Locking stock" },
    active:        { tone: "success", Icon: Bookmark, label: "Reserved" },
    expiring_soon: { tone: "warning", Icon: AlertTriangle, label: "Expiring soon" },
    expired:       { tone: "danger",  Icon: AlertCircle, label: "Expired" },
    cancelled:     { tone: "neutral", Icon: Ban, label: "Cancelled" },
    converted:     { tone: "success", Icon: CheckCircle2, label: "Paid" },
  };
  const { tone, Icon, label } = map[status];
  return (
    <StatusBadge tone={tone} Icon={Icon} label={label} className={className} />
  );
}
