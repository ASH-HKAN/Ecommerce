# Auto Tools E-Commerce Platform Architecture

## 1. Purpose

This document defines the enterprise architecture for a professional auto-tools e-commerce platform with storefront, user panel, admin panel, basket, reservation, payment, inventory, CRM, and Nginx deployment.

The architecture focuses on:

- **High cohesion:** each module owns one clear business capability.
- **Low coupling:** modules communicate through stable APIs, DTOs, services, and events.
- **CRM readiness:** customer timeline, notes, support, segmentation, and marketing signals can grow cleanly.
- **MTU qualities:** maintainability, testability, and usability are first-class goals.
- **Security:** role-based access, safe payments, validation, audit logs.
- **Scalability:** stateless services, Redis jobs, database indexing, object storage.

---

## 2. Recommended Stack

```text
Frontend: Next.js + React + TypeScript + Tailwind CSS + shadcn/ui-style components + Framer Motion
Backend: NestJS + TypeScript
Database: PostgreSQL + Prisma
Cache/Queue: Redis + BullMQ
Payment: Stripe
Storage: S3-compatible storage or Cloudinary
Proxy: Nginx
Deployment: Docker Compose first, Kubernetes optional later
```

---

## 3. High-Level Architecture

```text
Browser
  |
  v
Nginx Reverse Proxy + SSL
  |
  |-- Next.js Web App
  |     |-- Storefront
  |     |-- User Panel
  |     |-- Admin Panel
  |
  |-- NestJS API
  |     |-- Auth
  |     |-- Products
  |     |-- Inventory
  |     |-- Cart
  |     |-- Reservations
  |     |-- Orders
  |     |-- Payments
  |     |-- CRM
  |     |-- Admin
  |
  |-- Worker Service
        |-- Reservation expiry
        |-- Notifications
        |-- Payment reconciliation
        |-- Low-stock alerts

Supporting services:

PostgreSQL -> source of truth
Redis      -> cache, queues, locks
Stripe     -> payments and webhooks
S3/Cloudinary -> media storage
```

---

## 4. Repository Structure

```text
Ecommerce/
├── apps/
│   ├── web/
│   ├── api/
│   └── worker/
├── packages/
│   ├── database/
│   ├── shared/
│   ├── ui/
│   └── config/
├── docker/
│   └── nginx/
├── PROJECT_PIPELINE.md
├── ARCHITECTURE.md
├── USER_STORIES.md
├── TASK_STORIES.md
└── README.md
```

---

## 5. Domain Modules

## Auth Module

Responsibilities:

- Register and login users.
- Password hashing.
- Refresh token/session management.
- Role and permission checks.
- Password reset and email verification later.

Roles:

```text
CUSTOMER
STAFF
MANAGER
ADMIN
SUPER_ADMIN
```

## Product Catalog Module

Responsibilities:

- Products.
- Categories.
- Brands.
- Product images.
- Specifications.
- Vehicle compatibility.
- Public search/filter/sort data.

Auto-tools entities:

```text
VehicleMake
VehicleModel
VehicleYear
ToolCompatibility
ToolSpecification
```

## Inventory Module

Responsibilities:

- Total stock.
- Reserved stock.
- Sold stock.
- Available stock.
- Low-stock alerts.
- Stock movement history.

Rule:

```text
availableStock = totalStock - reservedStock - soldStock
```

All stock mutation must go through InventoryModule.

## Cart Module

Responsibilities:

- Add item to basket.
- Update quantity.
- Remove item.
- Calculate cart totals.
- Validate availability before checkout.

Cart does not permanently reduce stock.

## Reservation Module

Responsibilities:

- Create reservation.
- Lock stock temporarily.
- Cancel reservation.
- Expire reservation automatically.
- Convert reservation to order after payment.

States:

```text
PENDING
ACTIVE
EXPIRED
CANCELLED
CONVERTED_TO_ORDER
```

## Order Module

Responsibilities:

- Create order from basket or reservation.
- Store order items.
- Manage order status.
- Provide user order history.
- Provide admin order management.

States:

```text
PENDING_PAYMENT
PAID
PROCESSING
SHIPPED
DELIVERED
CANCELLED
REFUNDED
```

## Payment Module

Responsibilities:

- Create Stripe sessions.
- Verify Stripe webhooks.
- Store payment status.
- Handle failed payments.
- Handle refunds.
- Ensure idempotency.

Critical rule:

```text
Frontend success redirect is not proof of payment.
Only verified Stripe webhook is proof of payment.
```

## CRM Module

Responsibilities:

- Customer profile summary.
- Customer notes.
- Customer timeline.
- Support tickets.
- Segmentation.
- Marketing opt-in state.
- Loyalty later.

CRM listens to domain events instead of directly controlling order/payment state.

## Admin Module

Responsibilities:

- Dashboard.
- Product management.
- Inventory management.
- Order management.
- Reservation management.
- Customer management.
- CRM views.
- Audit logs.

---

## 6. Data Architecture

Core entities:

```text
User
Role
Permission
Address
Product
Category
Brand
ProductImage
ProductSpecification
VehicleMake
VehicleModel
VehicleYear
ToolCompatibility
InventoryItem
StockMovement
Cart
CartItem
Reservation
ReservationItem
Order
OrderItem
Payment
Refund
Coupon
Review
Wishlist
SupportTicket
CustomerNote
CustomerTimelineEvent
Notification
AdminAuditLog
```

Database rules:

- Use transactions for stock, reservation, checkout, and payment finalization.
- Use indexes for product search, user orders, active reservations, and expiry jobs.
- Store money as integer minor units, for example cents.
- Use unique constraints for user email and product slug.
- Use audit logs for sensitive admin actions.

---

## 7. Key Flows

## Reservation Flow

```text
User selects product
  -> create reservation request
  -> InventoryModule locks stock in transaction
  -> Reservation is ACTIVE with expiry time
  -> Worker expires reservation if unpaid
  -> InventoryModule releases reserved stock
```

## Payment Flow

```text
Checkout request
  -> backend validates items, stock, totals, address
  -> Stripe session created
  -> user pays
  -> Stripe webhook verified
  -> payment/order state updated
  -> inventory finalized
  -> notification sent
```

## Admin Product Flow

```text
Admin creates/edits product
  -> backend validates permissions
  -> product saved
  -> inventory record updated if needed
  -> audit log created
  -> storefront reflects product state
```

---

## 8. Cohesion and Coupling Rules

Allowed:

```text
Controller -> Service -> Repository/Prisma
Module -> another module through exported service/interface
Worker -> domain service through queue processor
Frontend -> backend API contracts
```

Forbidden:

```text
Frontend directly accesses database
Cart directly mutates stock
CRM directly mutates orders/payments
Payment trusts frontend success redirect
Admin UI bypasses backend authorization
Product module owns inventory calculations
```

---

## 9. API Boundaries

Public:

```text
GET /products
GET /products/:slug
GET /categories
GET /brands
GET /search
```

Auth:

```text
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET /auth/me
```

Customer:

```text
GET /cart
POST /cart/items
PATCH /cart/items/:id
DELETE /cart/items/:id
POST /reservations
GET /reservations/my
POST /reservations/:id/cancel
POST /checkout
GET /orders/my
```

Admin:

```text
GET /admin/dashboard
POST /admin/products
PATCH /admin/products/:id
GET /admin/orders
PATCH /admin/orders/:id/status
GET /admin/reservations
GET /admin/customers
GET /admin/audit-logs
```

Payments:

```text
POST /payments/create-session
POST /payments/webhook
POST /admin/payments/:id/refund
```

---

## 10. Deployment Architecture

Docker services:

```text
nginx
web
api
worker
postgres
redis
```

Nginx routes:

```text
https://domain.com     -> web
https://domain.com/api -> api
```

Nginx responsibilities:

- SSL termination.
- Reverse proxy.
- Compression.
- Security headers.
- Static caching.
- Request size limits.
- Basic rate limiting.

---

## 11. MVP Scope

MVP includes:

- Customer auth.
- Product catalog.
- Product detail page.
- Admin product management.
- Inventory management.
- Basket/cart.
- Reservation flow.
- Stripe checkout.
- Order history.
- Admin order management.
- Basic CRM customer profile.
- Docker and Nginx base.
