"use client";

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
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

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
      suppressHydrationWarning
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
  const { t } = useI18n();
  if (state === "in_stock")
    return (
      <StatusBadge
        tone="success"
        Icon={CheckCircle2}
        label={t("status.inventory.in_stock")}
        className={className}
      />
    );
  if (state === "low_stock")
    return (
      <StatusBadge
        tone="warning"
        Icon={AlertTriangle}
        label={t("status.inventory.low_stock")}
        className={className}
      />
    );
  if (state === "out_of_stock")
    return (
      <StatusBadge
        tone="danger"
        Icon={Ban}
        label={t("status.inventory.out_of_stock")}
        className={className}
      />
    );
  return (
    <StatusBadge
      tone="info"
      Icon={Clock}
      label={t(reservable ? "status.inventory.reservable" : "status.inventory.out_of_stock")}
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
  const { t } = useI18n();
  const map: Record<
    OrderStatus,
    { tone: Tone; Icon: React.ComponentType<{ className?: string }>; key: TKey }
  > = {
    pending_payment: { tone: "warning", Icon: Hourglass,    key: "status.order.pending_payment" },
    paid:            { tone: "success", Icon: CreditCard,   key: "status.order.paid" },
    processing:      { tone: "info",    Icon: PackageIcon,  key: "status.order.processing" },
    shipped:         { tone: "info",    Icon: Truck,        key: "status.order.shipped" },
    delivered:       { tone: "success", Icon: PackageCheck, key: "status.order.delivered" },
    cancelled:       { tone: "neutral", Icon: Ban,          key: "status.order.cancelled" },
    refunded:        { tone: "neutral", Icon: Undo2,        key: "status.order.refunded" },
  };
  const { tone, Icon, key } = map[status];
  return (
    <StatusBadge tone={tone} Icon={Icon} label={t(key)} className={className} />
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
  const { t } = useI18n();
  const map: Record<
    ReservationStatus,
    { tone: Tone; Icon: React.ComponentType<{ className?: string }>; key: TKey }
  > = {
    pending:       { tone: "neutral", Icon: Clock,         key: "status.reservation.pending" },
    active:        { tone: "success", Icon: Bookmark,      key: "status.reservation.active" },
    expiring_soon: { tone: "warning", Icon: AlertTriangle, key: "status.reservation.expiring_soon" },
    expired:       { tone: "danger",  Icon: AlertCircle,   key: "status.reservation.expired" },
    cancelled:     { tone: "neutral", Icon: Ban,           key: "status.reservation.cancelled" },
    converted:     { tone: "success", Icon: CheckCircle2,  key: "status.reservation.converted" },
  };
  const { tone, Icon, key } = map[status];
  return (
    <StatusBadge tone={tone} Icon={Icon} label={t(key)} className={className} />
  );
}
