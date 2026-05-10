# User Stories

## 1. Customer Stories

## US-CUS-001: Register Account

As a customer, I want to create an account, so that I can save my basket, reservations, orders, and profile.

Acceptance criteria:

- Customer can register with name, email, password, and phone.
- Email is unique.
- Password follows security rules.
- Customer profile is created after registration.

Priority: High

## US-CUS-002: Login

As a customer, I want to log in securely, so that I can access my account and checkout faster.

Acceptance criteria:

- Customer can log in with email and password.
- Invalid credentials show a safe generic error.
- Successful login creates a secure session.

Priority: High

## US-CUS-003: Browse Products

As a customer, I want to browse auto tools by category, brand, and type, so that I can find products quickly.

Acceptance criteria:

- Product grid is visible.
- Filters include category, brand, price, rating, and availability.
- Sorting includes newest, popular, low price, and high price.

Priority: High

## US-CUS-004: Search Products

As a customer, I want to search for tools, so that I can find a specific item faster.

Acceptance criteria:

- Search works by product name, brand, category, and specification.
- Empty results show helpful suggestions.

Priority: High

## US-CUS-005: View Product Details

As a customer, I want to view product details, so that I can decide whether the tool fits my needs.

Acceptance criteria:

- Page shows images, price, description, specs, compatibility, stock, and reviews.
- Customer can add to basket.
- Customer can reserve item if available.

Priority: High

## US-CUS-006: Add to Basket

As a customer, I want to add selected tools to my basket, so that I can buy them later.

Acceptance criteria:

- Basket updates immediately.
- Quantity cannot exceed available stock.
- Basket persists for logged-in users.

Priority: High

## US-CUS-007: Manage Basket

As a customer, I want to update my basket, so that I control what I buy.

Acceptance criteria:

- Customer can update quantity.
- Customer can remove item.
- Customer can see subtotal, shipping estimate, and total.

Priority: High

## US-CUS-008: Reserve Product

As a customer, I want to reserve selected tools, so that stock is held temporarily for me.

Acceptance criteria:

- Reservation locks stock.
- Reservation has visible expiry time.
- Expired or cancelled reservation releases stock.

Priority: High

## US-CUS-009: Pay for Basket

As a customer, I want to pay securely, so that I can complete my purchase.

Acceptance criteria:

- Customer can review order before payment.
- Payment is processed through Stripe.
- Backend confirms payment through webhook.
- Order is created after valid payment confirmation.

Priority: High

## US-CUS-010: Pay for Reservation

As a customer, I want to pay for reserved items, so that my reservation becomes a confirmed order.

Acceptance criteria:

- Customer can pay from reservation page.
- Reservation changes to converted after payment.
- Reserved stock becomes sold stock.

Priority: High

## US-CUS-011: View Orders

As a customer, I want to view my orders, so that I can track purchases.

Acceptance criteria:

- Customer can view order list and detail.
- Status and payment state are visible.
- Invoice can be downloaded later.

Priority: High

## US-CUS-012: Manage Profile

As a customer, I want to manage my profile and addresses, so that checkout is faster.

Acceptance criteria:

- Customer can update profile.
- Customer can add, edit, delete, and set default address.
- Customer cannot access another user's profile.

Priority: Medium

---

## 2. Admin Stories

## US-ADM-001: View Dashboard

As an admin, I want to view a dashboard, so that I can monitor store performance.

Acceptance criteria:

- Dashboard shows revenue, orders, reservations, low stock, and recent payments.
- Only authorized admins can access it.

Priority: High

## US-ADM-002: Manage Products

As an admin, I want to create and edit products, so that I can sell auto tools online.

Acceptance criteria:

- Admin can create, edit, activate, and deactivate products.
- Product fields are validated.
- Product changes are audit logged.

Priority: High

## US-ADM-003: Manage Inventory

As an admin, I want to manage stock, so that customers only buy or reserve available items.

Acceptance criteria:

- Admin can view total, reserved, sold, and available stock.
- Admin can adjust stock with reason.
- Stock movement is recorded.

Priority: High

## US-ADM-004: Manage Orders

As an admin, I want to manage orders, so that purchases are processed correctly.

Acceptance criteria:

- Admin can view and filter orders.
- Admin can update order status.
- Changes are audit logged.

Priority: High

## US-ADM-005: Manage Reservations

As an admin, I want to manage reservations, so that reserved stock is controlled correctly.

Acceptance criteria:

- Admin can view active, expired, cancelled, and converted reservations.
- Admin can cancel reservations when allowed.
- Cancellation releases stock.

Priority: High

## US-ADM-006: Manage Customers and CRM

As an admin, I want to view customer profiles, so that I can support customers effectively.

Acceptance criteria:

- Admin can search customers.
- Admin can view order history, reservation history, notes, and timeline.
- Sensitive data is permission-protected.

Priority: Medium

## US-ADM-007: Manage Refunds

As an admin, I want to process refunds, so that financial operations are controlled.

Acceptance criteria:

- Authorized admin can trigger refund.
- Refund updates payment and order status.
- Refund action is audit logged.

Priority: Medium

---

## 3. Staff Stories

## US-STF-001: Process Orders

As staff, I want to process assigned orders, so that customers receive products on time.

Acceptance criteria:

- Staff can view orders requiring processing.
- Staff can update allowed statuses.
- Staff cannot access unauthorized settings.

Priority: Medium

## US-STF-002: Support Customers

As support staff, I want to respond to customer issues, so that support history is recorded.

Acceptance criteria:

- Staff can view assigned support tickets.
- Staff can add notes.
- Ticket activity appears in CRM timeline.

Priority: Medium

---

## 4. System Stories

## US-SYS-001: Expire Reservations Automatically

As the system, I want to expire old reservations, so that locked stock becomes available again.

Acceptance criteria:

- Worker finds expired active reservations.
- Reservation status becomes expired.
- Reserved stock is released once.
- Event is emitted for CRM and notifications.

Priority: High

## US-SYS-002: Verify Payment Webhooks

As the system, I want to verify payment webhooks, so that only real payment events update orders.

Acceptance criteria:

- Webhook signature is verified.
- Duplicate webhook events are ignored safely.
- Successful payment updates order, payment, inventory, and reservation state.

Priority: High

## US-SYS-003: Send Notifications

As the system, I want to send transactional notifications, so that customers and admins are informed.

Acceptance criteria:

- Order confirmation is sent.
- Reservation reminder can be sent.
- Payment failure can be sent.
- Low-stock admin alert can be sent.

Priority: Medium
