import type { Product } from "@/data/types";

export type ShopSearchParams = Record<string, string | string[] | undefined>;

const PRICE_BUCKETS: Record<string, [number, number]> = {
  "lt-50":   [0, 5000],
  "50-150":  [5000, 15000],
  "150-300": [15000, 30000],
  "gt-300":  [30000, Number.MAX_SAFE_INTEGER],
};

export function filterAndSortProducts(
  source: Product[],
  sp: ShopSearchParams
): Product[] {
  const arr = (key: string): string[] => {
    const v = sp[key];
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };
  const single = (key: string): string | undefined => {
    const v = sp[key];
    if (!v) return undefined;
    return Array.isArray(v) ? v[0] : v;
  };

  const cats = arr("category");
  const brands = arr("brand");
  const price = single("price");
  const rating = single("rating");
  const onlyInStock = single("inStock") === "1";
  const onlyReservable = single("reservable") === "1";
  const q = (single("q") ?? "").trim().toLowerCase();
  const sort = single("sort") ?? "popular";

  let out = source.filter((p) => {
    if (cats.length && !cats.includes(p.category.slug)) return false;
    if (brands.length && !brands.includes(p.brand.slug)) return false;
    if (price) {
      const [min, max] = PRICE_BUCKETS[price] ?? [0, Number.MAX_SAFE_INTEGER];
      if (p.price < min || p.price > max) return false;
    }
    if (rating) {
      const r = Number(rating);
      if (Number.isFinite(r) && p.rating.average < r) return false;
    }
    if (onlyInStock && p.stock === "out_of_stock") return false;
    if (onlyReservable && !p.reservable) return false;
    if (q) {
      const hay = [
        p.name,
        p.brand.name,
        p.category.name,
        p.shortSpec,
      ].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (sort) {
    case "newest":
      out = [...out].reverse();
      break;
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      out = [...out].sort((a, b) => b.rating.average - a.rating.average);
      break;
    default:
      out = [...out].sort((a, b) => b.rating.count - a.rating.count);
  }

  return out;
}
