"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Star, X } from "lucide-react";
import { categories, brands } from "@/data/mocks";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PRICE_BUCKETS = [
  { id: "lt-50",    label: "Under $50",      min: 0,    max: 5000 },
  { id: "50-150",   label: "$50 – $150",     min: 5000, max: 15000 },
  { id: "150-300",  label: "$150 – $300",    min: 15000, max: 30000 },
  { id: "gt-300",   label: "Over $300",      min: 30000, max: Number.MAX_SAFE_INTEGER },
];

const RATINGS = [4, 3, 2];

export function FilterSidebar({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setMulti = React.useCallback(
    (key: string, value: string, on: boolean) => {
      const sp = new URLSearchParams(params.toString());
      const existing = sp.getAll(key);
      sp.delete(key);
      const next = on
        ? Array.from(new Set([...existing, value]))
        : existing.filter((v) => v !== value);
      next.forEach((v) => sp.append(key, v));
      router.replace(`${pathname}?${sp.toString()}`);
    },
    [params, pathname, router]
  );

  const setSingle = React.useCallback(
    (key: string, value: string | null) => {
      const sp = new URLSearchParams(params.toString());
      if (value === null) sp.delete(key);
      else sp.set(key, value);
      router.replace(`${pathname}?${sp.toString()}`);
    },
    [params, pathname, router]
  );

  const reset = () => router.replace(pathname);

  const selectedCategories = params.getAll("category");
  const selectedBrands = params.getAll("brand");
  const selectedPrice = params.get("price");
  const selectedRating = params.get("rating");
  const showInStock = params.get("inStock") === "1";
  const showReservable = params.get("reservable") === "1";

  return (
    <aside className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Filters</h3>
        <button
          type="button"
          onClick={reset}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>

      <Group title="Availability">
        <Toggle
          id="f-instock"
          label="In stock"
          checked={showInStock}
          onChange={(v) => setSingle("inStock", v ? "1" : null)}
        />
        <Toggle
          id="f-reservable"
          label="Reservable"
          checked={showReservable}
          onChange={(v) => setSingle("reservable", v ? "1" : null)}
        />
      </Group>

      <Group title="Category">
        {categories.map((c) => (
          <Toggle
            key={c.id}
            id={`f-cat-${c.slug}`}
            label={c.name}
            checked={selectedCategories.includes(c.slug)}
            onChange={(v) => setMulti("category", c.slug, v)}
          />
        ))}
      </Group>

      <Group title="Brand">
        {brands.map((b) => (
          <Toggle
            key={b.id}
            id={`f-brand-${b.slug}`}
            label={b.name}
            checked={selectedBrands.includes(b.slug)}
            onChange={(v) => setMulti("brand", b.slug, v)}
          />
        ))}
      </Group>

      <Group title="Price">
        {PRICE_BUCKETS.map((p) => (
          <RadioRow
            key={p.id}
            id={`f-price-${p.id}`}
            label={p.label}
            checked={selectedPrice === p.id}
            onSelect={() =>
              setSingle("price", selectedPrice === p.id ? null : p.id)
            }
          />
        ))}
      </Group>

      <Group title="Rating">
        {RATINGS.map((r) => (
          <RadioRow
            key={r}
            id={`f-rating-${r}`}
            label={
              <span className="inline-flex items-center gap-1">
                {Array.from({ length: r }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-warning text-warning"
                  />
                ))}
                <span className="ml-1 text-xs text-muted-foreground">
                  &amp; up
                </span>
              </span>
            }
            checked={selectedRating === String(r)}
            onSelect={() =>
              setSingle("rating", selectedRating === String(r) ? null : String(r))
            }
          />
        ))}
      </Group>

      <Group title="Vehicle compatibility">
        <p className="text-xs text-muted-foreground">
          Tell us your vehicle and we'll confirm fit before shipping.
        </p>
        <div className="rounded-md border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          Coming soon — make / model / year selector
        </div>
      </Group>
    </aside>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2 border-t pt-4 first:border-t-0 first:pt-0">
      <p className="text-eyebrow uppercase text-muted-foreground">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v: boolean | "indeterminate") =>
          onChange(v === true)
        }
      />
      <Label
        htmlFor={id}
        className="cursor-pointer text-sm font-normal text-foreground/80"
      >
        {label}
      </Label>
    </div>
  );
}

function RadioRow({
  id,
  label,
  checked,
  onSelect,
}: {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
        checked
          ? "bg-primary/10 text-foreground"
          : "text-foreground/80 hover:bg-muted"
      )}
    >
      <span
        className={cn(
          "grid size-4 place-items-center rounded-full border",
          checked ? "border-primary" : "border-border"
        )}
      >
        {checked && <span className="size-2 rounded-full bg-primary" />}
      </span>
      {label}
    </button>
  );
}

export function ActiveFilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const chips: { key: string; value: string; label: string }[] = [];
  for (const slug of params.getAll("category")) {
    const c = categories.find((x) => x.slug === slug);
    if (c) chips.push({ key: "category", value: slug, label: c.name });
  }
  for (const slug of params.getAll("brand")) {
    const b = brands.find((x) => x.slug === slug);
    if (b) chips.push({ key: "brand", value: slug, label: b.name });
  }
  const price = params.get("price");
  if (price) {
    const p = PRICE_BUCKETS.find((x) => x.id === price);
    if (p) chips.push({ key: "price", value: price, label: p.label });
  }
  const rating = params.get("rating");
  if (rating) chips.push({ key: "rating", value: rating, label: `${rating}★ & up` });
  if (params.get("inStock") === "1")
    chips.push({ key: "inStock", value: "1", label: "In stock" });
  if (params.get("reservable") === "1")
    chips.push({ key: "reservable", value: "1", label: "Reservable" });

  if (chips.length === 0) return null;

  function remove(c: { key: string; value: string }) {
    const sp = new URLSearchParams(params.toString());
    const remaining = sp.getAll(c.key).filter((v) => v !== c.value);
    sp.delete(c.key);
    remaining.forEach((v) => sp.append(c.key, v));
    router.replace(`${pathname}?${sp.toString()}`);
  }

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <li key={`${c.key}-${c.value}`}>
          <button
            type="button"
            onClick={() => remove(c)}
            className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium hover:bg-muted"
          >
            {c.label}
            <X className="size-3" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => router.replace(pathname)}
          className="text-xs font-medium text-primary underline-offset-2 hover:underline"
        >
          Clear all
        </button>
      </li>
    </ul>
  );
}
