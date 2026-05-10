"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Bookmark,
  Users,
  Boxes,
  CreditCard,
  ScrollText,
  Settings as SettingsIcon,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

type NavItem = {
  href: string;
  key: TKey;
  icon: React.ComponentType<{ className?: string }>;
};

const PRIMARY: NavItem[] = [
  { href: "/admin",              key: "admin.nav.dashboard",    icon: LayoutDashboard },
  { href: "/admin/products",     key: "admin.nav.products",     icon: Package },
  { href: "/admin/inventory",    key: "admin.nav.inventory",    icon: Boxes },
  { href: "/admin/orders",       key: "admin.nav.orders",       icon: ShoppingCart },
  { href: "/admin/reservations", key: "admin.nav.reservations", icon: Bookmark },
  { href: "/admin/customers",    key: "admin.nav.customers",    icon: Users },
  { href: "/admin/payments",     key: "admin.nav.payments",     icon: CreditCard },
];

const SECONDARY: NavItem[] = [
  { href: "/admin/audit-logs", key: "admin.nav.auditLogs", icon: ScrollText },
  { href: "/admin/settings",   key: "admin.nav.settings",  icon: SettingsIcon },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <span className="grid size-8 place-items-center rounded-md bg-brand-orange-500 text-primary-foreground">
          <Wrench className="size-4" />
        </span>
        <div className="leading-tight">
          <span className="block font-display text-sm font-bold tracking-tight">
            AUTO<span className="text-brand-orange-500">TOOLS</span>
          </span>
          <span
            className="block text-[10px] uppercase tracking-wider text-white/50"
            suppressHydrationWarning
          >
            {t("admin.console")}
          </span>
        </div>
      </div>

      <ul className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {PRIMARY.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-brand-orange-500"
                    data-rtl-flip-rail
                  />
                )}
                <item.icon className="size-4 shrink-0" />
                <span className="truncate" suppressHydrationWarning>
                  {t(item.key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-white/10 px-3 py-3">
        <ul className="space-y-1">
          {SECONDARY.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="size-4 shrink-0" />
                  <span className="truncate" suppressHydrationWarning>
                    {t(item.key)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          className="mt-3 flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-[11px] text-white/60"
          suppressHydrationWarning
        >
          <HelpCircle className="size-3.5" />
          {t("admin.helpHint")}
        </div>
      </div>
    </nav>
  );
}
