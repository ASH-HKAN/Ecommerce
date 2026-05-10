"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

const OPTIONS = [
  { value: "popular",   label: "Most popular" },
  { value: "newest",    label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc",label: "Price: high to low" },
  { value: "rating",    label: "Top rated" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const value = params.get("sort") ?? "popular";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const sp = new URLSearchParams(params.toString());
    if (e.target.value === "popular") sp.delete("sort");
    else sp.set("sort", e.target.value);
    router.replace(`${pathname}?${sp.toString()}`);
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <ArrowUpDown className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Sort</span>
      <select
        value={value}
        onChange={onChange}
        className="rounded-md border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
