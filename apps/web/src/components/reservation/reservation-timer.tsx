"use client";

import * as React from "react";
import { Bookmark, AlertTriangle, AlertCircle, CheckCircle2, Clock, Ban } from "lucide-react";
import type { ReservationStatus } from "@/components/product/status-badges";
import { ReservationStatusBadge } from "@/components/product/status-badges";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

type Props = {
  status: ReservationStatus;
  /**
   * Offset (ms) from "now" when this reservation expires.
   * Negative values mean it has already expired.
   */
  expiryOffsetMs: number;
  variant?: "inline" | "prominent" | "mini";
  className?: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Resolves the absolute expiry timestamp once on the client to avoid
 * server/client time drift, then ticks every second.
 */
function useTick(expiryOffsetMs: number) {
  const [endsAt, setEndsAt] = React.useState<number | null>(null);
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setEndsAt(Date.now() + expiryOffsetMs);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [expiryOffsetMs]);

  if (endsAt === null || now === null) return null;
  return Math.max(0, endsAt - now);
}

export function ReservationTimer({
  status,
  expiryOffsetMs,
  variant = "inline",
  className,
}: Props) {
  const { t } = useI18n();
  const remaining = useTick(expiryOffsetMs);
  const isTerminal =
    status === "expired" ||
    status === "cancelled" ||
    status === "converted";

  let h = 0,
    m = 0,
    s = 0,
    pct = 0;
  if (remaining !== null) {
    h = Math.floor(remaining / 3_600_000);
    m = Math.floor((remaining % 3_600_000) / 60_000);
    s = Math.floor((remaining % 60_000) / 1000);
    const totalWindow = 24 * 3_600_000;
    pct = Math.min(100, Math.max(0, (remaining / totalWindow) * 100));
  }

  // Keep status visually accurate at low remaining time
  const visualStatus: ReservationStatus =
    isTerminal
      ? status
      : remaining !== null && remaining <= 0
      ? "expired"
      : remaining !== null && remaining <= 5 * 60_000
      ? "expiring_soon"
      : status;

  const tone =
    visualStatus === "expired"
      ? "danger"
      : visualStatus === "expiring_soon"
      ? "warning"
      : visualStatus === "converted"
      ? "success"
      : visualStatus === "cancelled"
      ? "neutral"
      : "brand";

  const TONE_CLASSES = {
    brand:   "border-brand-orange-500/30 bg-brand-orange-500/10",
    warning: "border-warning/30 bg-warning/10",
    danger:  "border-destructive/30 bg-destructive/10",
    success: "border-success/30 bg-success/10",
    neutral: "border-border bg-muted/40",
  } as const;

  const ICON =
    visualStatus === "expired"
      ? AlertCircle
      : visualStatus === "expiring_soon"
      ? AlertTriangle
      : visualStatus === "converted"
      ? CheckCircle2
      : visualStatus === "cancelled"
      ? Ban
      : Bookmark;

  const headlineKey: TKey =
    visualStatus === "active"
      ? "reservation.headline.active"
      : visualStatus === "expiring_soon"
      ? "reservation.headline.expiring_soon"
      : visualStatus === "expired"
      ? "reservation.headline.expired"
      : visualStatus === "cancelled"
      ? "reservation.headline.cancelled"
      : visualStatus === "converted"
      ? "reservation.headline.converted"
      : "reservation.headline.pending";
  const headline = t(headlineKey);

  const timerText =
    remaining === null
      ? "—:—:—"
      : isTerminal && status === "converted"
      ? t("status.reservation.converted")
      : isTerminal && status === "cancelled"
      ? t("status.reservation.cancelled")
      : `${pad(h)}:${pad(m)}:${pad(s)}`;

  if (variant === "mini") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium",
          TONE_CLASSES[tone],
          className
        )}
      >
        <Clock className="size-3" />
        <span className="font-mono tabular-nums" suppressHydrationWarning>
          {timerText}
        </span>
      </span>
    );
  }

  if (variant === "prominent") {
    return (
      <div
        className={cn(
          "rounded-2xl border p-6",
          TONE_CLASSES[tone],
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-10 place-items-center rounded-md",
                tone === "warning" && "bg-warning text-warning-foreground",
                tone === "danger" && "bg-destructive text-destructive-foreground",
                tone === "success" && "bg-success text-success-foreground",
                tone === "neutral" && "bg-muted text-muted-foreground",
                tone === "brand" && "bg-brand-orange-500 text-primary-foreground"
              )}
            >
              <ICON className="size-5" />
            </span>
            <div>
              <p
                className="font-display text-base font-semibold"
                suppressHydrationWarning
              >
                {headline}
              </p>
              <ReservationStatusBadge status={visualStatus} className="mt-1" />
            </div>
          </div>

          <div className="text-right">
            <p
              className="text-eyebrow uppercase text-muted-foreground"
              suppressHydrationWarning
            >
              {t("reservation.timeLeft")}
            </p>
            <p
              className={cn(
                "font-mono text-3xl font-bold tabular-nums leading-none",
                visualStatus === "expiring_soon" &&
                  "motion-safe:animate-pulse-amber"
              )}
              suppressHydrationWarning
            >
              {timerText}
            </p>
          </div>
        </div>

        {!isTerminal && (
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-foreground/5">
            <div
              className={cn(
                "h-full transition-[width]",
                visualStatus === "expiring_soon"
                  ? "bg-warning"
                  : visualStatus === "expired"
                  ? "bg-destructive"
                  : "bg-brand-orange-500"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>
    );
  }

  // inline
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-md border px-3 py-2",
        TONE_CLASSES[tone],
        className
      )}
    >
      <div className="flex items-center gap-2 text-sm">
        <ICON className="size-4" />
        <span className="font-medium" suppressHydrationWarning>
          {headline}
        </span>
      </div>
      <span
        className="font-mono text-sm tabular-nums"
        suppressHydrationWarning
      >
        {timerText}
      </span>
    </div>
  );
}
