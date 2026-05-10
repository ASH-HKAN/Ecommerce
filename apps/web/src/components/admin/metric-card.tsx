import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  /** Decimal change vs prior period, e.g. 0.082 = +8.2%. */
  delta?: number;
  hint?: string;
  /** Sparkline data (small numbers, units don't matter). */
  sparkline?: number[];
  className?: string;
};

export function MetricCard({
  label,
  value,
  delta,
  hint,
  sparkline,
  className,
}: Props) {
  const isUp = (delta ?? 0) >= 0;
  return (
    <article
      className={cn(
        "rounded-2xl border bg-card p-5 transition-shadow hover:shadow-elev-2",
        className
      )}
    >
      <p className="text-eyebrow uppercase text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <p className="font-display text-2xl font-bold tabular-nums leading-none">
          {value}
        </p>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
              isUp
                ? "border-success/30 bg-success/10 text-success"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            )}
          >
            {isUp ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {`${isUp ? "+" : ""}${(delta * 100).toFixed(1)}%`}
          </span>
        )}
      </div>
      {sparkline && sparkline.length > 1 && <Sparkline data={sparkline} />}
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </article>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 120;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  const last = data[data.length - 1];
  const lastY = h - ((last - min) / range) * h;
  const lastX = (data.length - 1) * step;
  return (
    <svg
      role="img"
      aria-label="Trend"
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 h-9 w-full text-brand-orange-500"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        points={points}
      />
      <circle cx={lastX} cy={lastY} r="2" fill="currentColor" />
    </svg>
  );
}
