"use client";

import * as React from "react";
import { en, type Dictionary, type TKey } from "./dictionaries/en";
import { fa } from "./dictionaries/fa";
import { ar } from "./dictionaries/ar";

export const LOCALES = ["en", "fa", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const STORAGE_KEY = "auto-tools.locale";

const DICTS: Record<Locale, Dictionary> = { en, fa, ar };
const RTL_LOCALES = new Set<Locale>(["fa", "ar"]);

export function isRtlLocale(l: Locale): boolean {
  return RTL_LOCALES.has(l);
}

export function intlLocaleFor(l: Locale): string {
  switch (l) {
    case "fa":
      return "fa-IR";
    case "ar":
      return "ar";
    default:
      return "en-US";
  }
}

type Params = Record<string, string | number>;

function interpolate(value: string, params?: Params) {
  if (!params) return value;
  return value.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] !== undefined ? String(params[k]) : `{${k}}`
  );
}

type I18n = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (l: Locale) => void;
  t: (key: TKey, params?: Params) => string;
  formatPrice: (cents: number) => string;
  formatNumber: (n: number) => string;
  formatDate: (d: Date | string | number) => string;
  formatDateTime: (d: Date | string | number) => string;
};

const I18nContext = React.createContext<I18n | null>(null);

/**
 * Initial locale picked at module evaluation. We default to "en" so SSR is
 * deterministic. The provider then promotes the user's preference from
 * localStorage on mount.
 */
function readPersistedLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v && (LOCALES as readonly string[]).includes(v)) return v as Locale;
  } catch {
    /* private mode etc. */
  }
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");

  // Promote user preference on mount. We do not rerender server output —
  // a tiny inline script in the document head sets <html lang/dir> already
  // so direction is correct before hydration. Text content swaps to the
  // chosen locale here.
  React.useEffect(() => {
    const persisted = readPersistedLocale();
    if (persisted !== "en") setLocaleState(persisted);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
      document.documentElement.dir = isRtlLocale(next) ? "rtl" : "ltr";
    }
  }, []);

  const value = React.useMemo<I18n>(() => {
    const dict = DICTS[locale];
    const tag = intlLocaleFor(locale);
    const numFmt = new Intl.NumberFormat(tag);
    const priceFmt = new Intl.NumberFormat(tag, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const dateFmt = new Intl.DateTimeFormat(tag, { dateStyle: "medium" });
    const dateTimeFmt = new Intl.DateTimeFormat(tag, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    return {
      locale,
      dir: isRtlLocale(locale) ? "rtl" : "ltr",
      setLocale,
      t: (key, params) => {
        const raw = (dict as Record<string, string>)[key] ?? (en as Record<string, string>)[key] ?? key;
        return interpolate(raw, params);
      },
      formatPrice: (cents) => priceFmt.format(cents / 100),
      formatNumber: (n) => numFmt.format(n),
      formatDate: (d) => dateFmt.format(new Date(d)),
      formatDateTime: (d) => dateTimeFmt.format(new Date(d)),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

/**
 * No-flash inline script. Run in <head> before hydration so the document
 * reflects the user's saved locale (lang + dir) before any paint.
 */
export function I18nNoFlashScript() {
  const code = `(function(){try{
    var l = localStorage.getItem(${JSON.stringify(STORAGE_KEY)}) || 'en';
    if(l!=='en'&&l!=='fa'&&l!=='ar') l='en';
    var rtl = l==='fa'||l==='ar';
    var d = document.documentElement;
    d.lang = l; d.dir = rtl ? 'rtl' : 'ltr';
  } catch(e){} })();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
