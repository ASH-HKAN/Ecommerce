"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Bookmark,
  Heart,
  User,
  MapPin,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentCustomer } from "@/data/account-mocks";
import { useI18n } from "@/i18n/i18n-provider";
import type { TKey } from "@/i18n/dictionaries/en";

const NAV: { href: string; key: TKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: "/account",              key: "account.nav.overview",     icon: LayoutDashboard },
  { href: "/account/orders",       key: "account.nav.orders",       icon: Package },
  { href: "/account/reservations", key: "account.nav.reservations", icon: Bookmark },
  { href: "/account/wishlist",     key: "account.nav.wishlist",     icon: Heart },
  { href: "/account/addresses",    key: "account.nav.addresses",    icon: MapPin },
  { href: "/account/profile",      key: "account.nav.profile",      icon: User },
  { href: "/account/security",     key: "account.nav.security",     icon: ShieldCheck },
];

function isActive(pathname: string, href: string) {
  if (href === "/account") return pathname === "/account";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AccountSidebar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const initials =
    `${currentCustomer.firstName[0] ?? ""}${currentCustomer.lastName[0] ?? ""}`.toUpperCase();

  return (
    <aside className="hidden lg:block">
      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-foreground text-background">
              <span className="text-sm font-semibold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium">
                {currentCustomer.firstName} {currentCustomer.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {currentCustomer.email}
              </p>
            </div>
          </div>
          {currentCustomer.workshop && (
            <p className="mt-3 rounded-md border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground">
              {currentCustomer.workshop}
            </p>
          )}
        </div>

        <nav className="mt-4">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-foreground text-background"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="size-4" />
                    <span suppressHydrationWarning>{t(item.key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t pt-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span suppressHydrationWarning>{t("common.signOut")}</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export function AccountSegmentedNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  return (
    <div className="lg:hidden">
      <div className="-mx-4 overflow-x-auto px-4">
        <ul className="flex gap-2 pb-2">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground/80"
                  )}
                >
                  <item.icon className="size-3.5" />
                  <span suppressHydrationWarning>{t(item.key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
