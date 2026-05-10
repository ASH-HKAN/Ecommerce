"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "navbar" | "hero" | "mobile";
  className?: string;
};

export function SearchBar({ variant = "navbar", className }: Props) {
  const sizeClasses =
    variant === "navbar"
      ? "h-10 text-sm"
      : variant === "mobile"
      ? "h-11 text-base"
      : "h-12 text-base";

  return (
    <form
      role="search"
      action="/search"
      className={cn(
        "group relative flex w-full items-center rounded-md border border-input bg-background pl-10 pr-3 transition-shadow focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        sizeClasses,
        className
      )}
    >
      <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
      <input
        type="search"
        name="q"
        autoComplete="off"
        placeholder="Search tools, brands, SKUs…"
        className="h-full w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
      <kbd className="hidden items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
        ⌘K
      </kbd>
    </form>
  );
}
