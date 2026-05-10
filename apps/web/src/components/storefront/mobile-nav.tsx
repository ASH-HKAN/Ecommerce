"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { categories } from "@/data/mocks";
import { SearchBar } from "./search-bar";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/i18n/i18n-provider";

export function MobileNav() {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={t("common.menu")}
        onClick={() => setOpen(true)}
        className="grid size-9 place-items-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-full max-w-sm p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="font-display text-lg" suppressHydrationWarning>
              {t("common.menu")}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-6 px-6 py-5">
            <SearchBar variant="mobile" />
            <nav>
              <p
                className="mb-2 text-eyebrow uppercase text-muted-foreground"
                suppressHydrationWarning
              >
                {t("nav.categories")}
              </p>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/categories/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      {c.name}
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <p
                className="mb-2 text-eyebrow uppercase text-muted-foreground"
                suppressHydrationWarning
              >
                {t("nav.account")}
              </p>
              <ul className="space-y-1">
                {[
                  { href: "/account",              key: "account.nav.overview" },
                  { href: "/account/orders",       key: "account.nav.orders" },
                  { href: "/account/reservations", key: "account.nav.reservations" },
                  { href: "/account/wishlist",     key: "account.nav.wishlist" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      <span suppressHydrationWarning>
                        {t(l.key as Parameters<typeof t>[0])}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <p
                className="mb-2 text-eyebrow uppercase text-muted-foreground"
                suppressHydrationWarning
              >
                {t("nav.support")}
              </p>
              <ul className="space-y-1">
                {[
                  { href: "/shipping", label: "Shipping" },
                  { href: "/returns", label: "Returns" },
                  { href: "/warranty", label: "Warranty" },
                  { href: "/contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t pt-4">
              <p
                className="mb-2 text-eyebrow uppercase text-muted-foreground"
                suppressHydrationWarning
              >
                {t("i18n.language")}
              </p>
              <LanguageSwitcher variant="compact" className="w-full justify-between" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
