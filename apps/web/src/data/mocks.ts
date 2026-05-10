import type { Brand, Category, Product, Testimonial } from "./types";

export const brands: Brand[] = [
  { id: "b-bosch",     name: "BOSCH",     slug: "bosch" },
  { id: "b-makita",    name: "MAKITA",    slug: "makita" },
  { id: "b-milwaukee", name: "MILWAUKEE", slug: "milwaukee" },
  { id: "b-snapon",    name: "SNAP-ON",   slug: "snap-on" },
  { id: "b-dewalt",    name: "DEWALT",    slug: "dewalt" },
  { id: "b-stanley",   name: "STANLEY",   slug: "stanley" },
  { id: "b-ridgid",    name: "RIDGID",    slug: "ridgid" },
  { id: "b-fluke",     name: "FLUKE",     slug: "fluke" },
];

export const categories: Category[] = [
  {
    id: "c-diagnostic",
    name: "Diagnostic Tools",
    slug: "diagnostic-tools",
    description: "Scan tools, multimeters, and OBD2 readers.",
    iconKey: "Activity",
  },
  {
    id: "c-hand",
    name: "Hand Tools",
    slug: "hand-tools",
    description: "Wrenches, sockets, screwdrivers, and pliers.",
    iconKey: "Wrench",
  },
  {
    id: "c-power",
    name: "Power Tools",
    slug: "power-tools",
    description: "Cordless and corded impact, drill, and grinder.",
    iconKey: "Drill",
  },
  {
    id: "c-garage",
    name: "Garage Equipment",
    slug: "garage-equipment",
    description: "Jacks, lifts, compressors, and tire service.",
    iconKey: "Cog",
  },
  {
    id: "c-kits",
    name: "Tool Kits",
    slug: "tool-kits",
    description: "Curated kits for shops and roadside.",
    iconKey: "Package",
  },
  {
    id: "c-accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Bits, blades, batteries, and chargers.",
    iconKey: "Plug",
  },
];

const c = (slug: string) => categories.find((x) => x.slug === slug)!;
const b = (slug: string) => brands.find((x) => x.slug === slug)!;

export const products: Product[] = [
  {
    id: "p-001",
    slug: "obd2-bluetooth-scanner-pro",
    name: "OBD2 Bluetooth Scanner Pro",
    brand: b("bosch"),
    category: c("diagnostic-tools"),
    price: 18900,
    compareAt: 22900,
    rating: { average: 4.7, count: 312 },
    stock: "in_stock",
    stockCount: 24,
    reservable: true,
    shortSpec: "Bi-directional · Live data · iOS + Android",
    iconKey: "Activity",
    badges: ["Editor's pick"],
  },
  {
    id: "p-002",
    slug: "1-2-cordless-impact-wrench",
    name: '1/2" Cordless Impact Wrench',
    brand: b("milwaukee"),
    category: c("power-tools"),
    price: 34900,
    rating: { average: 4.9, count: 528 },
    stock: "in_stock",
    stockCount: 8,
    reservable: true,
    shortSpec: "1100 ft-lb · Brushless · Battery sold separately",
    iconKey: "Drill",
  },
  {
    id: "p-003",
    slug: "metric-socket-set-127-piece",
    name: "Metric Socket Set, 127-piece",
    brand: b("snap-on"),
    category: c("hand-tools"),
    price: 49900,
    compareAt: 54900,
    rating: { average: 4.8, count: 144 },
    stock: "low_stock",
    stockCount: 3,
    reservable: true,
    shortSpec: "Chrome vanadium · 1/4, 3/8, 1/2 drive · Lifetime warranty",
    iconKey: "Wrench",
    badges: ["Bestseller"],
  },
  {
    id: "p-004",
    slug: "true-rms-multimeter-87v",
    name: "True-RMS Multimeter 87V",
    brand: b("fluke"),
    category: c("diagnostic-tools"),
    price: 49900,
    rating: { average: 4.9, count: 412 },
    stock: "in_stock",
    stockCount: 12,
    reservable: false,
    shortSpec: "True-RMS · 1000 V · CAT IV · Backlit",
    iconKey: "Gauge",
  },
  {
    id: "p-005",
    slug: "shop-floor-jack-3-ton",
    name: "Shop Floor Jack, 3-ton",
    brand: b("dewalt"),
    category: c("garage-equipment"),
    price: 27900,
    rating: { average: 4.6, count: 98 },
    stock: "out_of_stock",
    stockCount: 0,
    reservable: false,
    shortSpec: "Quick-lift · Steel chassis · 19.7\" max height",
    iconKey: "Cog",
  },
  {
    id: "p-006",
    slug: "mechanic-tool-kit-200pc",
    name: "Mechanic Tool Kit, 200-piece",
    brand: b("stanley"),
    category: c("tool-kits"),
    price: 19900,
    compareAt: 24900,
    rating: { average: 4.5, count: 220 },
    stock: "in_stock",
    stockCount: 30,
    reservable: true,
    shortSpec: "Blow-mold case · Sockets, ratchets, hex keys",
    iconKey: "Package",
    badges: ["New"],
  },
  {
    id: "p-007",
    slug: "angle-grinder-4-5-inch",
    name: '4-1/2" Angle Grinder',
    brand: b("makita"),
    category: c("power-tools"),
    price: 12900,
    rating: { average: 4.7, count: 186 },
    stock: "in_stock",
    stockCount: 14,
    reservable: false,
    shortSpec: "11 amp · Slide switch · Anti-restart",
    iconKey: "Disc3",
  },
  {
    id: "p-008",
    slug: "torque-wrench-3-8-drive",
    name: '3/8" Drive Torque Wrench',
    brand: b("snap-on"),
    category: c("hand-tools"),
    price: 16900,
    rating: { average: 4.8, count: 75 },
    stock: "low_stock",
    stockCount: 2,
    reservable: true,
    shortSpec: "5–80 ft-lb · ±4% · Click-type",
    iconKey: "Wrench",
  },
  {
    id: "p-009",
    slug: "battery-charger-12v-24v",
    name: "Battery Charger 12V/24V",
    brand: b("bosch"),
    category: c("garage-equipment"),
    price: 14900,
    rating: { average: 4.4, count: 64 },
    stock: "in_stock",
    stockCount: 18,
    reservable: false,
    shortSpec: "Smart charge · AGM/GEL · Boost mode",
    iconKey: "BatteryCharging",
  },
  {
    id: "p-010",
    slug: "cordless-drill-driver-18v",
    name: "Cordless Drill/Driver 18V",
    brand: b("dewalt"),
    category: c("power-tools"),
    price: 17900,
    compareAt: 19900,
    rating: { average: 4.7, count: 343 },
    stock: "reservable",
    stockCount: 0,
    reservable: true,
    shortSpec: "2-speed · LED · 1.5 Ah battery × 2",
    iconKey: "Drill",
  },
  {
    id: "p-011",
    slug: "professional-screwdriver-set-22",
    name: "Pro Screwdriver Set, 22-piece",
    brand: b("stanley"),
    category: c("hand-tools"),
    price: 8900,
    rating: { average: 4.6, count: 127 },
    stock: "in_stock",
    stockCount: 40,
    reservable: false,
    shortSpec: "Phillips, slotted, Torx · Cushion grip",
    iconKey: "Wrench",
  },
  {
    id: "p-012",
    slug: "tire-pressure-gauge-digital",
    name: "Digital Tire Pressure Gauge",
    brand: b("ridgid"),
    category: c("accessories"),
    price: 3900,
    rating: { average: 4.5, count: 91 },
    stock: "in_stock",
    stockCount: 60,
    reservable: false,
    shortSpec: "0–150 psi · Backlit · Auto-off",
    iconKey: "Gauge",
  },
];

export const featuredProducts: Product[] = [
  products[0], products[1], products[2], products[5],
];

export const editorsPicks: Product[] = [products[0], products[3]];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote:
      "Stock matches the listing every time. The reservation feature saved my Saturday job twice this month.",
    author: "Marco Reyes",
    role: "Lead technician",
    workshop: "Pista Auto Garage",
  },
  {
    id: "t-2",
    quote:
      "Genuine Snap-on, real warranty, fast delivery. Other suppliers told me 6 weeks; here it shipped next day.",
    author: "Sara Mensah",
    role: "Workshop owner",
    workshop: "Mensah Performance",
  },
  {
    id: "t-3",
    quote:
      "Honest pricing, clear specs. The product pages tell me what fits before I buy, not after.",
    author: "Daniyal Khan",
    role: "Diagnostic specialist",
    workshop: "Khan EV Service",
  },
];

/** Time used by the deal-of-the-week countdown. */
export const DEAL_OF_THE_WEEK_PRODUCT = products[2]; // socket set
/**
 * Duration the deal countdown should run for once the client mounts.
 * Computing the absolute end time on the client (in useEffect) keeps the
 * server-rendered HTML and hydrated client tree consistent.
 */
export const DEAL_DURATION_MS = 1000 * 60 * 60 * 36; // 36 hours

export const ANNOUNCEMENT = {
  text: "Free shipping on orders over $250 — Reservations now hold stock for 24 hours.",
  href: "/shop",
} as const;
