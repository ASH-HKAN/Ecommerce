"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, User, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./mega-menu";
import { SearchBar } from "./search-bar";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { CartTrigger } from "./cart-trigger";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur transition-all duration-200 ease-standard",
        scrolled ? "h-14 shadow-elev-1" : "h-[72px]"
      )}
    >
      <div
        className={cn(
          "container flex h-full items-center gap-3 transition-all",
          scrolled ? "gap-2" : "gap-4"
        )}
      >
        <MobileNav />

        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Auto Tools — home"
        >
          <span className="grid size-8 place-items-center rounded-md bg-foreground text-background">
            <Wrench className="size-4" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            AUTO<span className="text-primary">TOOLS</span>
          </span>
        </Link>

        <div className="hidden lg:flex">
          <MegaMenu />
          <Link
            href="/shop"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            All tools
          </Link>
          <Link
            href="/shop?deal=1"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            Deals
          </Link>
          <Link
            href="/shop?reservable=1"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            Reservable
          </Link>
        </div>

        <div className="ml-auto flex max-w-xl flex-1 items-center justify-end gap-1 sm:gap-2 lg:ml-4 lg:max-w-md xl:max-w-xl">
          <div className="hidden flex-1 md:block">
            <SearchBar variant="navbar" />
          </div>
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="hidden size-9 place-items-center rounded-md text-foreground/70 hover:bg-muted hover:text-foreground sm:grid"
          >
            <Heart className="size-5" />
          </Link>
          <Link
            href="/account"
            aria-label="My account"
            className="grid size-9 place-items-center rounded-md text-foreground/70 hover:bg-muted hover:text-foreground"
          >
            <User className="size-5" />
          </Link>
          <ThemeToggle />
          <CartTrigger />
        </div>
      </div>
    </header>
  );
}
