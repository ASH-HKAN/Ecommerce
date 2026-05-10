import { formatPrice } from "@/lib/fmt";
import { cn } from "@/lib/utils";

type Props = {
  price: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
};

export function PriceBlock({
  price,
  compareAt,
  size = "md",
  showSavings = true,
  className,
}: Props) {
  const hasDiscount = compareAt && compareAt > price;
  const savings = hasDiscount
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

  const priceClass =
    size === "sm"
      ? "text-base"
      : size === "lg"
      ? "text-2xl"
      : "text-lg";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-display font-bold tabular-nums", priceClass)}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-sm text-muted-foreground line-through tabular-nums">
            {formatPrice(compareAt)}
          </span>
          {showSavings && (
            <span className="rounded bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">
              Save {savings}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
