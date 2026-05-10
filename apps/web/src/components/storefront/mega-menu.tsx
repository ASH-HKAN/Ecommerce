"use client";

import Link from "next/link";
import * as React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { brands, categories } from "@/data/mocks";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "text-foreground/80 hover:bg-muted hover:text-foreground",
          open && "bg-muted text-foreground"
        )}
      >
        Shop
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        role="menu"
        aria-hidden={!open}
        className={cn(
          "absolute left-0 top-full z-40 mt-2 w-[min(96vw,920px)] origin-top-left",
          "rounded-xl border bg-popover p-6 shadow-elev-3",
          "transition duration-150 ease-standard",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-eyebrow uppercase text-muted-foreground">
              Categories
            </p>
            <ul className="space-y-1">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/categories/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                  >
                    <span className="font-medium">{c.name}</span>
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-eyebrow uppercase text-muted-foreground">
              Featured brands
            </p>
            <ul className="grid grid-cols-2 gap-1">
              {brands.slice(0, 8).map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/shop?brand=${b.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 rounded-lg bg-muted/40 p-5">
            <p className="text-eyebrow uppercase text-muted-foreground">
              Reservation
            </p>
            <p className="font-display text-base">
              Hold a tool for up to 24 hours while you decide.
            </p>
            <p className="text-sm text-muted-foreground">
              Reserve, get a timer, pay before it ends. Stock is locked just
              for you.
            </p>
            <Link
              href="/shop?reservable=1"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View reservable tools <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
