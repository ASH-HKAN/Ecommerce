/**
 * Currency, time, and string formatting helpers.
 * Money is stored as integer minor units (e.g. cents).
 */

export function formatPrice(
  minorUnits: number,
  currency: string = "USD",
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(minorUnits / 100);
}

export function formatPercent(n: number, locale: string = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Returns "12 hours from now", etc.
 */
export function formatRelativeFromNow(
  date: Date | string | number,
  locale: string = "en-US"
) {
  const target = typeof date === "object" ? date.getTime() : new Date(date).getTime();
  const diffMs = target - Date.now();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const minutes = Math.round(diffMs / 60_000);
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 48) return rtf.format(hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(days, "day");
}

/**
 * Returns a "12d 04h" style countdown string.
 */
export function formatCountdown(targetMs: number, nowMs: number = Date.now()) {
  const diff = Math.max(0, targetMs - nowMs);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, totalMs: diff };
}

export function pluralize(n: number, one: string, many: string) {
  return n === 1 ? `${n} ${one}` : `${n} ${many}`;
}
