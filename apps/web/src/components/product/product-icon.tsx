import {
  Activity,
  Wrench,
  Drill,
  Cog,
  Package,
  Plug,
  Gauge,
  Disc3,
  BatteryCharging,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Activity,
  Wrench,
  Drill,
  Cog,
  Package,
  Plug,
  Gauge,
  Disc3,
  BatteryCharging,
};

export function getProductIcon(key: string): LucideIcon {
  return ICONS[key] ?? Wrench;
}

export function ProductIconArt({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const Icon = getProductIcon(iconKey);
  return (
    <div
      className={
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-muted to-muted/40 " +
        (className ?? "")
      }
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,theme(colors.brand-orange.500/10),transparent_60%)]" />
      <Icon className="size-1/2 text-foreground/30" strokeWidth={1.25} />
    </div>
  );
}
