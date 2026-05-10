import type { OrderStatus } from "@/components/product/status-badges";
import type { ReservationStatus } from "@/components/product/status-badges";
import { products } from "./mocks";
import type { Product } from "./types";

/* ---------------- Customer profile ---------------- */

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  locale: string;
  marketingOptIn: boolean;
  joinedAt: string; // ISO
  workshop?: string;
};

export const currentCustomer: Customer = {
  id: "u-001",
  firstName: "Marco",
  lastName: "Reyes",
  email: "marco.reyes@example.com",
  emailVerified: true,
  phone: "+1 (415) 555-0188",
  locale: "en-US",
  marketingOptIn: true,
  joinedAt: "2024-09-12T10:30:00Z",
  workshop: "Pista Auto Garage",
};

/* ---------------- Addresses ---------------- */

export type Address = {
  id: string;
  label: string;
  recipient: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export const addresses: Address[] = [
  {
    id: "addr-1",
    label: "Workshop",
    recipient: "Marco Reyes — Pista Auto Garage",
    line1: "1480 Industrial Way",
    line2: "Bay 4",
    city: "Oakland",
    region: "CA",
    postal: "94606",
    country: "United States",
    phone: "+1 (415) 555-0188",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Home",
    recipient: "Marco Reyes",
    line1: "27 Elm Street",
    city: "San Leandro",
    region: "CA",
    postal: "94577",
    country: "United States",
    phone: "+1 (415) 555-0188",
    isDefault: false,
  },
  {
    id: "addr-3",
    label: "Pickup partner",
    recipient: "Sara — Mensah Performance",
    line1: "302 Mission Ave",
    city: "Hayward",
    region: "CA",
    postal: "94544",
    country: "United States",
    phone: "+1 (510) 555-0102",
    isDefault: false,
  },
];

/* ---------------- Orders ---------------- */

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  iconKey: string;
  qty: number;
  unitPrice: number;
};

export type OrderTimelineEvent = {
  ts: string; // ISO
  label: string;
};

export type OrderRow = {
  id: string;
  number: string;
  placedAt: string; // ISO
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "cancelled";
  items: OrderItem[];
  shippingAddressId: string;
  shippingMethod: "standard" | "express" | "pickup";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  trackingCarrier?: string;
  timeline: OrderTimelineEvent[];
};

const itemFor = (slug: string, qty: number): OrderItem => {
  const p = products.find((x) => x.slug === slug);
  if (!p) throw new Error(`mock product not found: ${slug}`);
  return {
    productId: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand.name,
    iconKey: p.iconKey,
    qty,
    unitPrice: p.price,
  };
};

export const orders: OrderRow[] = [
  {
    id: "o-1",
    number: "ATX-48217",
    placedAt: "2026-05-08T14:32:00Z",
    status: "shipped",
    paymentStatus: "paid",
    items: [itemFor("obd2-bluetooth-scanner-pro", 1), itemFor("true-rms-multimeter-87v", 1)],
    shippingAddressId: "addr-1",
    shippingMethod: "express",
    subtotal: 68800,
    shipping: 3500,
    tax: 5504,
    total: 77804,
    trackingNumber: "1Z999AA10123456784",
    trackingCarrier: "UPS",
    timeline: [
      { ts: "2026-05-08T14:32:00Z", label: "Order placed" },
      { ts: "2026-05-08T14:32:18Z", label: "Payment received" },
      { ts: "2026-05-09T08:14:00Z", label: "Picked from warehouse" },
      { ts: "2026-05-09T11:02:00Z", label: "Handed to UPS" },
    ],
  },
  {
    id: "o-2",
    number: "ATX-48156",
    placedAt: "2026-05-04T09:11:00Z",
    status: "delivered",
    paymentStatus: "paid",
    items: [itemFor("metric-socket-set-127-piece", 1)],
    shippingAddressId: "addr-1",
    shippingMethod: "standard",
    subtotal: 49900,
    shipping: 0,
    tax: 3992,
    total: 53892,
    trackingNumber: "1Z999AA10112233445",
    trackingCarrier: "UPS",
    timeline: [
      { ts: "2026-05-04T09:11:00Z", label: "Order placed" },
      { ts: "2026-05-04T09:11:22Z", label: "Payment received" },
      { ts: "2026-05-05T07:40:00Z", label: "Shipped" },
      { ts: "2026-05-06T16:08:00Z", label: "Delivered" },
    ],
  },
  {
    id: "o-3",
    number: "ATX-48092",
    placedAt: "2026-05-01T16:48:00Z",
    status: "processing",
    paymentStatus: "paid",
    items: [
      itemFor("1-2-cordless-impact-wrench", 1),
      itemFor("battery-charger-12v-24v", 1),
    ],
    shippingAddressId: "addr-1",
    shippingMethod: "standard",
    subtotal: 49800,
    shipping: 0,
    tax: 3984,
    total: 53784,
    timeline: [
      { ts: "2026-05-01T16:48:00Z", label: "Order placed" },
      { ts: "2026-05-01T16:48:11Z", label: "Payment received" },
      { ts: "2026-05-02T09:00:00Z", label: "In picking" },
    ],
  },
  {
    id: "o-4",
    number: "ATX-47998",
    placedAt: "2026-04-26T11:25:00Z",
    status: "pending_payment",
    paymentStatus: "pending",
    items: [itemFor("torque-wrench-3-8-drive", 1)],
    shippingAddressId: "addr-2",
    shippingMethod: "standard",
    subtotal: 16900,
    shipping: 1500,
    tax: 1472,
    total: 19872,
    timeline: [{ ts: "2026-04-26T11:25:00Z", label: "Order created — awaiting payment" }],
  },
  {
    id: "o-5",
    number: "ATX-47812",
    placedAt: "2026-04-12T18:02:00Z",
    status: "refunded",
    paymentStatus: "refunded",
    items: [itemFor("angle-grinder-4-5-inch", 1)],
    shippingAddressId: "addr-1",
    shippingMethod: "standard",
    subtotal: 12900,
    shipping: 1500,
    tax: 1152,
    total: 15552,
    timeline: [
      { ts: "2026-04-12T18:02:00Z", label: "Order placed" },
      { ts: "2026-04-12T18:02:09Z", label: "Payment received" },
      { ts: "2026-04-13T10:14:00Z", label: "Customer requested refund" },
      { ts: "2026-04-13T15:30:00Z", label: "Refunded" },
    ],
  },
  {
    id: "o-6",
    number: "ATX-47604",
    placedAt: "2026-03-28T14:50:00Z",
    status: "cancelled",
    paymentStatus: "cancelled",
    items: [itemFor("professional-screwdriver-set-22", 2)],
    shippingAddressId: "addr-1",
    shippingMethod: "standard",
    subtotal: 17800,
    shipping: 1500,
    tax: 1544,
    total: 20844,
    timeline: [
      { ts: "2026-03-28T14:50:00Z", label: "Order created" },
      { ts: "2026-03-28T15:12:00Z", label: "Cancelled by customer" },
    ],
  },
];

/* ---------------- Reservations ---------------- */

export type ReservationItem = OrderItem;

export type Reservation = {
  id: string;
  number: string;
  status: ReservationStatus;
  createdAt: string; // ISO
  /**
   * Offset in milliseconds from "now" used by the UI to compute an absolute
   * expiry timestamp on the client (avoids SSR/CSR mismatches). Negative for
   * already-expired reservations.
   */
  expiryOffsetMs: number;
  items: ReservationItem[];
  subtotal: number;
  convertedOrderNumber?: string;
};

const ONE_HOUR = 1000 * 60 * 60;

export const reservations: Reservation[] = [
  {
    id: "r-1",
    number: "RSV-90213",
    status: "expiring_soon",
    createdAt: "2026-05-10T15:50:00Z",
    expiryOffsetMs: 4 * 60 * 1000, // 4 min from now
    items: [itemFor("metric-socket-set-127-piece", 1)],
    subtotal: 49900,
  },
  {
    id: "r-2",
    number: "RSV-90188",
    status: "active",
    createdAt: "2026-05-10T11:18:00Z",
    expiryOffsetMs: 18 * ONE_HOUR,
    items: [
      itemFor("obd2-bluetooth-scanner-pro", 1),
      itemFor("torque-wrench-3-8-drive", 1),
    ],
    subtotal: 35800,
  },
  {
    id: "r-3",
    number: "RSV-90051",
    status: "expired",
    createdAt: "2026-05-08T09:12:00Z",
    expiryOffsetMs: -36 * ONE_HOUR,
    items: [itemFor("cordless-drill-driver-18v", 1)],
    subtotal: 17900,
  },
  {
    id: "r-4",
    number: "RSV-89994",
    status: "cancelled",
    createdAt: "2026-05-06T13:00:00Z",
    expiryOffsetMs: -2 * 24 * ONE_HOUR,
    items: [itemFor("angle-grinder-4-5-inch", 1)],
    subtotal: 12900,
  },
  {
    id: "r-5",
    number: "RSV-89812",
    status: "converted",
    createdAt: "2026-05-04T08:55:00Z",
    expiryOffsetMs: -6 * 24 * ONE_HOUR,
    items: [itemFor("metric-socket-set-127-piece", 1)],
    subtotal: 49900,
    convertedOrderNumber: "ATX-48156",
  },
];

/* ---------------- Wishlist ---------------- */

export const wishlist: Product[] = [
  products.find((p) => p.slug === "true-rms-multimeter-87v")!,
  products.find((p) => p.slug === "shop-floor-jack-3-ton")!,
  products.find((p) => p.slug === "1-2-cordless-impact-wrench")!,
  products.find((p) => p.slug === "tire-pressure-gauge-digital")!,
];

/* ---------------- Security: sessions ---------------- */

export type Session = {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string; // relative phrase for display
  current: boolean;
};

export const sessions: Session[] = [
  {
    id: "s-1",
    device: "MacBook Pro 14",
    browser: "Chrome 124 · macOS",
    location: "Oakland, CA",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s-2",
    device: "iPhone 15",
    browser: "Safari · iOS",
    location: "Oakland, CA",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "s-3",
    device: "Windows desktop",
    browser: "Edge · Windows 11",
    location: "San Leandro, CA",
    lastActive: "3 days ago",
    current: false,
  },
];

/* ---------------- Helpers ---------------- */

export function getOrderByNumber(num: string) {
  return orders.find(
    (o) => o.number.toLowerCase() === num.toLowerCase() || o.id === num
  );
}

export function getReservationByNumber(num: string) {
  return reservations.find(
    (r) => r.number.toLowerCase() === num.toLowerCase() || r.id === num
  );
}
