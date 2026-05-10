"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n, type Locale } from "@/i18n/i18n-provider";
import { cn } from "@/lib/utils";

const OPTIONS: {
  value: Locale;
  nativeKey: "i18n.english" | "i18n.farsi" | "i18n.arabic";
  flag: string;
}[] = [
  { value: "en", nativeKey: "i18n.english", flag: "EN" },
  { value: "fa", nativeKey: "i18n.farsi",   flag: "FA" },
  { value: "ar", nativeKey: "i18n.arabic",  flag: "AR" },
];

type Props = {
  /** Visual style: solid icon button (chrome) or compact text+chevron. */
  variant?: "icon" | "compact";
  className?: string;
};

export function LanguageSwitcher({ variant = "icon", className }: Props) {
  const { locale, setLocale, t } = useI18n();
  const current = OPTIONS.find((o) => o.value === locale) ?? OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("i18n.changeLanguage")}
        className={cn(
          variant === "icon"
            ? "grid size-9 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            : "inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted",
          className
        )}
      >
        <Globe className="size-4" />
        {variant === "compact" && (
          <>
            <span suppressHydrationWarning>{current.flag}</span>
            <span className="sr-only">{t("i18n.changeLanguage")}</span>
          </>
        )}
        {variant === "icon" && (
          <span className="sr-only">{t("i18n.changeLanguage")}</span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel suppressHydrationWarning>
            {t("i18n.language")}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {OPTIONS.map((o) => {
            const active = o.value === locale;
            return (
              <DropdownMenuItem
                key={o.value}
                onClick={() => setLocale(o.value)}
                className="flex items-center justify-between gap-2"
              >
                <span suppressHydrationWarning>{t(o.nativeKey)}</span>
                {active && <Check className="size-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
