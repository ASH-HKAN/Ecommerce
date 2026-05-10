/** Domain types for the storefront prototype (mock data layer). */

export type StockState = "in_stock" | "low_stock" | "out_of_stock" | "reservable";

export type ProductRating = {
  average: number; // 0–5
  count: number;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconKey: string; // maps to Lucide icon by string in components
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: Category;
  /** Price in minor units, e.g. cents. */
  price: number;
  /** Optional compare-at price (struck-through original). */
  compareAt?: number;
  rating: ProductRating;
  stock: StockState;
  stockCount?: number;
  reservable: boolean;
  shortSpec: string;
  iconKey: string;
  badges?: string[]; // e.g. "Editor's pick"
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  workshop: string;
};
