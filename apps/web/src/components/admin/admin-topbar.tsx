"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AdminSidebar } from "./admin-sidebar";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/i18n/i18n-provider";

export function AdminTopbar({ pageTitle }: { pageTitle?: string }) {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur lg:px-6">
      <button
        type="button"
        aria-label={t("common.menu")}
        onClick={() => setMobileOpen(true)}
        className="grid size-9 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden items-center gap-2 text-xs lg:flex">
        <Link
          href="/admin"
          className="font-medium text-foreground/80 hover:text-foreground"
          suppressHydrationWarning
        >
          {t("admin.crumb")}
        </Link>
        {pageTitle && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{pageTitle}</span>
          </>
        )}
      </div>

      <div className="hidden flex-1 max-w-md md:flex">
        <div className="group relative flex h-9 w-full items-center rounded-md border bg-background pl-9 pr-3 transition-shadow focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30">
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={t("admin.searchPlaceholder")}
            suppressHydrationWarning
            className="h-full w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="ml-2 rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span
          className="hidden items-center gap-1 rounded-md border border-warning/40 bg-warning/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-warning sm:inline-flex"
          suppressHydrationWarning
        >
          {t("admin.staging")}
        </span>
        <LanguageSwitcher />
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-9 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-2.5 text-sm font-medium hover:bg-muted"
        >
          <span className="grid size-6 place-items-center rounded-full bg-foreground text-background text-[10px] font-semibold">
            AS
          </span>
          <span className="hidden sm:inline" suppressHydrationWarning>
            {t("admin.crumb")}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 bg-brand-steel-950 p-0 text-white">
          <SheetHeader className="sr-only">
            <SheetTitle>{t("admin.console")}</SheetTitle>
          </SheetHeader>
          <AdminSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
