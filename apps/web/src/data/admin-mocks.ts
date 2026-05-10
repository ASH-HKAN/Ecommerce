import { products, brands, categories } from "./mocks";
import { orders, reservations, currentCustomer } from "./account-mocks";
import type { OrderRow } from "./account-mocks";

/* ---------------- Admin customers (CRM) ---------------- */

export type AdminCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinedAt: string;
  ordersCount: number;
  reservationsCount: number;
  lifetimeSpend: number;
  lastActivity: string;
  status: "active" | "blocked";
  tags: string[];
  workshop?: string;
};

export const adminCustomers: AdminCustomer[] = [
  {
    id: "u-001",
    firstName: "Marco",
    lastName: "Reyes",
    email: "marco.reyes@example.com",
    phone: "+1 (415) 555-0188",
    joinedAt: "2024-09-12T10:30:00Z",
    ordersCount: 6,
    reservationsCount: 5,
    lifetimeSpend: 184_500,
    lastActivity: "2 hours ago",
    status: "active",
    tags: ["VIP", "Workshop"],
    workshop: "Pista Auto Garage",
  },
  {
    id: "u-002",
    firstName: "Sara",
    lastName: "Mensah",
    email: "sara@mensahperformance.com",
    phone: "+1 (510) 555-0102",
    joinedAt: "2024-11-04T08:15:00Z",
    ordersCount: 12,
    reservationsCount: 3,
    lifetimeSpend: 412_900,
    lastActivity: "1 day ago",
    status: "active",
    tags: ["VIP", "Workshop", "Net-30"],
    workshop: "Mensah Performance",
  },
  {
    id: "u-003",
    firstName: "Daniyal",
    lastName: "Khan",
    email: "daniyal@khanev.com",
    phone: "+1 (212) 555-0411",
    joinedAt: "2025-01-20T13:45:00Z",
    ordersCount: 8,
    reservationsCount: 1,
    lifetimeSpend: 268_400,
    lastActivity: "3 days ago",
    status: "active",
    tags: ["EV specialist"],
    workshop: "Khan EV Service",
  },
  {
    id: "u-004",
    firstName: "Jordan",
    lastName: "Liu",
    email: "j.liu@example.com",
    phone: "+1 (415) 555-9023",
    joinedAt: "2025-02-18T14:32:00Z",
    ordersCount: 3,
    reservationsCount: 0,
    lifetimeSpend: 49_800,
    lastActivity: "12 days ago",
    status: "active",
    tags: ["DIY"],
  },
  {
    id: "u-005",
    firstName: "Aisha",
    lastName: "Bello",
    email: "aisha.bello@example.com",
    phone: "+1 (212) 555-7711",
    joinedAt: "2025-03-09T09:00:00Z",
    ordersCount: 1,
    reservationsCount: 2,
    lifetimeSpend: 17_900,
    lastActivity: "21 days ago",
    status: "active",
    tags: ["At-risk"],
  },
  {
    id: "u-006",
    firstName: "Ben",
    lastName: "Russo",
    email: "ben.russo@example.com",
    phone: "+1 (510) 555-2009",
    joinedAt: "2024-07-02T11:11:00Z",
    ordersCount: 0,
    reservationsCount: 0,
    lifetimeSpend: 0,
    lastActivity: "Never",
    status: "blocked",
    tags: ["Fraud risk"],
  },
];

/* ---------------- Audit log ---------------- */

export type AuditEntry = {
  id: string;
  ts: string; // ISO
  actor: string;
  action: string;
  entityType: string;
  entity: string;
  ip: string;
};

export const auditLog: AuditEntry[] = [
  { id: "al-1",  ts: "2026-05-10T16:01:00Z", actor: "admin@autotools.io", action: "order.refund",            entityType: "Order",       entity: "ATX-47812",            ip: "192.0.2.10" },
  { id: "al-2",  ts: "2026-05-10T15:42:00Z", actor: "manager@autotools.io", action: "product.update.price", entityType: "Product",     entity: "Metric Socket Set, 127", ip: "192.0.2.10" },
  { id: "al-3",  ts: "2026-05-10T14:30:00Z", actor: "staff@autotools.io",   action: "inventory.adjust",     entityType: "InventoryItem", entity: "OBD2 Bluetooth Scanner Pro", ip: "192.0.2.11" },
  { id: "al-4",  ts: "2026-05-10T11:08:00Z", actor: "admin@autotools.io",   action: "user.role.update",     entityType: "User",        entity: "ben.russo@example.com",  ip: "192.0.2.10" },
  { id: "al-5",  ts: "2026-05-09T18:55:00Z", actor: "manager@autotools.io", action: "order.status.shipped", entityType: "Order",       entity: "ATX-48217",            ip: "192.0.2.10" },
  { id: "al-6",  ts: "2026-05-09T11:02:00Z", actor: "staff@autotools.io",   action: "product.create",       entityType: "Product",     entity: "Cordless Drill/Driver 18V", ip: "192.0.2.11" },
  { id: "al-7",  ts: "2026-05-08T17:24:00Z", actor: "admin@autotools.io",   action: "settings.update",      entityType: "Settings",    entity: "Reservation duration",   ip: "192.0.2.10" },
  { id: "al-8",  ts: "2026-05-08T09:45:00Z", actor: "manager@autotools.io", action: "reservation.cancel",   entityType: "Reservation", entity: "RSV-89994",             ip: "192.0.2.10" },
  { id: "al-9",  ts: "2026-05-07T13:11:00Z", actor: "staff@autotools.io",   action: "category.create",      entityType: "Category",    entity: "Tool Kits",            ip: "192.0.2.11" },
  { id: "al-10", ts: "2026-05-06T08:00:00Z", actor: "admin@autotools.io",   action: "auth.signin",          entityType: "Session",     entity: "MacBook Pro 14",       ip: "192.0.2.10" },
  { id: "al-11", ts: "2026-05-05T19:33:00Z", actor: "manager@autotools.io", action: "product.deactivate",   entityType: "Product",     entity: "Shop Floor Jack, 3-ton", ip: "192.0.2.10" },
  { id: "al-12", ts: "2026-05-05T10:21:00Z", actor: "staff@autotools.io",   action: "inventory.movement",   entityType: "InventoryItem", entity: "Mechanic Tool Kit, 200-piece", ip: "192.0.2.11" },
];

/* ---------------- Payments ---------------- */

export type AdminPayment = {
  id: string;
  chargeId: string;
  ts: string;
  customer: string;
  amount: number;
  method: string; // "Card 4242", "Apple Pay", etc.
  status: "paid" | "failed" | "refunded" | "pending";
  orderNumber?: string;
};

export const adminPayments: AdminPayment[] = [
  { id: "pay-1", chargeId: "ch_3PrA9G2eZvKYlo2C0Hg7c8aB", ts: "2026-05-08T14:32:18Z", customer: "Marco Reyes",   amount: 77804, method: "Card 4242", status: "paid",     orderNumber: "ATX-48217" },
  { id: "pay-2", chargeId: "ch_3PrA8s2eZvKYlo2C13a9Ki1k", ts: "2026-05-04T09:11:22Z", customer: "Marco Reyes",   amount: 53892, method: "Apple Pay", status: "paid",     orderNumber: "ATX-48156" },
  { id: "pay-3", chargeId: "ch_3PrA7w2eZvKYlo2C0R8b8x4n", ts: "2026-05-01T16:48:11Z", customer: "Marco Reyes",   amount: 53784, method: "Card 0007", status: "paid",     orderNumber: "ATX-48092" },
  { id: "pay-4", chargeId: "ch_3PrA6q2eZvKYlo2C2Z9xQQ12", ts: "2026-04-26T11:25:07Z", customer: "Marco Reyes",   amount: 19872, method: "Card 0007", status: "failed",   orderNumber: "ATX-47998" },
  { id: "pay-5", chargeId: "ch_3PrA5l2eZvKYlo2C0F2gW0VH", ts: "2026-04-13T15:30:00Z", customer: "Marco Reyes",   amount: 15552, method: "Card 4242", status: "refunded", orderNumber: "ATX-47812" },
  { id: "pay-6", chargeId: "ch_3PrA4j2eZvKYlo2C2N1zYx99", ts: "2026-05-09T20:18:12Z", customer: "Sara Mensah",   amount: 124000, method: "Card 1234", status: "paid",     orderNumber: "ATX-48230" },
  { id: "pay-7", chargeId: "ch_3PrA3i2eZvKYlo2C1Y6mTt77", ts: "2026-05-09T16:01:55Z", customer: "Daniyal Khan",  amount: 49900, method: "Google Pay", status: "paid",    orderNumber: "ATX-48224" },
  { id: "pay-8", chargeId: "ch_3PrA2h2eZvKYlo2C0J3pNb22", ts: "2026-05-10T07:40:30Z", customer: "Aisha Bello",   amount: 8900,  method: "Card 7711", status: "pending" },
];

/* ---------------- Inventory movements ---------------- */

export type InventoryMovement = {
  id: string;
  ts: string;
  productSlug: string;
  reason: "Restock" | "Damage" | "Correction" | "Sale" | "Reservation" | "Return";
  delta: number; // can be negative
  actor: string;
};

export const inventoryMovements: InventoryMovement[] = [
  { id: "mv-1",  ts: "2026-05-10T15:30:00Z", productSlug: "obd2-bluetooth-scanner-pro", reason: "Restock",     delta: 12, actor: "staff@autotools.io" },
  { id: "mv-2",  ts: "2026-05-10T14:45:00Z", productSlug: "metric-socket-set-127-piece", reason: "Reservation", delta: -1, actor: "system" },
  { id: "mv-3",  ts: "2026-05-10T11:18:00Z", productSlug: "torque-wrench-3-8-drive",     reason: "Reservation", delta: -1, actor: "system" },
  { id: "mv-4",  ts: "2026-05-09T18:55:00Z", productSlug: "obd2-bluetooth-scanner-pro",  reason: "Sale",        delta: -1, actor: "system" },
  { id: "mv-5",  ts: "2026-05-09T13:20:00Z", productSlug: "1-2-cordless-impact-wrench",  reason: "Restock",     delta: 6,  actor: "staff@autotools.io" },
  { id: "mv-6",  ts: "2026-05-08T09:12:00Z", productSlug: "shop-floor-jack-3-ton",       reason: "Damage",      delta: -1, actor: "manager@autotools.io" },
  { id: "mv-7",  ts: "2026-05-07T17:00:00Z", productSlug: "battery-charger-12v-24v",     reason: "Restock",     delta: 8,  actor: "staff@autotools.io" },
  { id: "mv-8",  ts: "2026-05-06T10:00:00Z", productSlug: "professional-screwdriver-set-22", reason: "Correction", delta: 4, actor: "manager@autotools.io" },
];

/* ---------------- Dashboard metrics ---------------- */

export const dashboardMetrics = {
  revenueToday: 412_300,
  revenueDeltaPct: 0.082,
  ordersToday: 14,
  ordersDeltaPct: -0.021,
  activeReservations: 7,
  expiringSoon: 2,
  lowStockCount: 3,
  outOfStockCount: 1,
  /** 14-day revenue trend, in cents. */
  revenue14d: [
    280_400, 312_500, 268_900, 341_200, 388_600, 411_800, 392_300,
    357_900, 410_300, 368_500, 421_700, 398_200, 444_100, 412_300,
  ],
  /** Reservation funnel last 14d: reserved -> paid -> expired. */
  reservationFunnel: { reserved: 38, paid: 27, expired: 9, cancelled: 2 },
  topProducts: [
    { slug: "obd2-bluetooth-scanner-pro", units: 28 },
    { slug: "1-2-cordless-impact-wrench", units: 19 },
    { slug: "metric-socket-set-127-piece", units: 16 },
    { slug: "true-rms-multimeter-87v",     units: 14 },
    { slug: "battery-charger-12v-24v",     units: 11 },
  ],
};

/* ---------------- Re-exports for convenience ---------------- */
export {
  products,
  brands,
  categories,
  orders,
  reservations,
  currentCustomer,
};
export type { OrderRow };
