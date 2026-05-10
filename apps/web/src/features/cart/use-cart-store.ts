"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/data/types";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  iconKey: string;
  unitPrice: number;
  qty: number;
};

type CartState = {
  open: boolean;
  lines: CartLine[];
  setOpen: (open: boolean) => void;
  addItem: (product: Product, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      open: false,
      lines: [],
      setOpen: (open) => set({ open }),
      addItem: (product, qty = 1) => {
        const lines = [...get().lines];
        const i = lines.findIndex((l) => l.productId === product.id);
        if (i >= 0) {
          lines[i] = { ...lines[i], qty: lines[i].qty + qty };
        } else {
          lines.push({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            brand: product.brand.name,
            iconKey: product.iconKey,
            unitPrice: product.price,
            qty,
          });
        }
        set({ lines, open: true });
      },
      updateQty: (productId, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.productId !== productId)
              : s.lines.map((l) =>
                  l.productId === productId ? { ...l, qty } : l
                ),
        })),
      removeItem: (productId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "auto-tools.cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
    }
  )
);

export function selectCartCount(s: CartState) {
  return s.lines.reduce((sum, l) => sum + l.qty, 0);
}

export function selectCartSubtotal(s: CartState) {
  return s.lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0);
}
