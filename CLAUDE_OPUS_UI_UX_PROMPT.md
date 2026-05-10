# Claude Opus UI/UX Design Prompt

Copy the prompt below and give it to Claude Opus for UI/UX design work.

---

# Prompt to Claude Opus

## Reading Order (Required)

Before doing anything, read the project documents in this exact order:

1. `README.md`
2. `PROJECT_PIPELINE.md`
3. `ARCHITECTURE.md`
4. `USER_STORIES.md`
5. `TASK_STORIES.md`
6. This file last: `CLAUDE_OPUS_UI_UX_PROMPT.md`

After reading all documents above, follow the instructions in this file to produce the full UI/UX design specification.

---

You are a senior product designer, UX architect, conversion optimization expert, and design-system lead.

I am building a professional enterprise-ready e-commerce platform for selling **auto tools**. I need you to create a complete UI/UX design specification based on the architecture, product vision, and delivery phases below.

Do **not** write production code. Focus on design direction, user experience, layout, design system, wireframes, interaction behavior, accessibility, and conversion quality. The output should be detailed enough that a frontend engineer can implement it using **Next.js + React + TypeScript + Tailwind CSS + shadcn/ui-style components + Framer Motion**.

---

## 1. Project Summary

The website is an e-commerce platform for auto tools and professional garage/mechanic equipment.

The platform must include:

- Customer storefront.
- Product catalog.
- Product details.
- Search and filters.
- Basket/cart.
- Product reservation.
- Checkout and payment.
- User account panel.
- Orders and reservations tracking.
- Admin panel.
- Product management.
- Inventory management.
- Order management.
- Reservation management.
- Customer CRM profile.
- Professional UI/UX with smooth animations.
- Responsive mobile-first design.
- Enterprise-quality interface.

The business goal is to make customers feel comfortable, confident, and safe when buying or reserving auto tools.

---

## 2. Target Users

Design for these users:

### Customers

- Car owners.
- Mechanics.
- Garage owners.
- Workshop buyers.
- Professional automotive technicians.
- People searching for reliable auto tools.

Customer goals:

- Find the right tool quickly.
- Understand product quality and compatibility.
- Add tools to basket easily.
- Reserve tools if they are not ready to buy immediately.
- Pay securely.
- Track orders and reservations.

### Admins

- Store owner.
- Product manager.
- Inventory manager.
- Sales/operations manager.

Admin goals:

- Add and edit products.
- Manage stock.
- Monitor orders.
- Monitor reservations.
- Understand customers.
- View business metrics.

### Staff

- Order processing staff.
- Customer support staff.

Staff goals:

- Process orders.
- Help customers.
- View customer history and notes.

---

## 3. Brand Direction

The visual direction should be:

```text
Premium Automotive Industrial E-Commerce
```

The site should feel:

- Professional.
- Reliable.
- Powerful.
- Clean.
- Modern.
- Trustworthy.
- Comfortable for non-technical buyers.
- Strong enough for professional mechanics and garages.

Avoid making it look like a generic dropshipping store. It should look like a serious brand for auto tools and garage equipment.

---

## 4. Preferred Visual Style

Use a premium industrial style.

Suggested palette:

```text
Primary dark: charcoal / near black
Primary light: white / soft gray
Accent: orange or amber
Secondary accent: electric blue optional
Success: green
Warning: amber
Danger: red
Muted text: cool gray
```

Example color direction:

```text
Dark background: #0B0F19
Dark card: #111827
Primary accent: #F97316
Secondary accent: #2563EB
Text light: #F9FAFB
Muted text: #9CA3AF
Light background: #F8FAFC
Light card: #FFFFFF
```

Design should support:

- Light mode.
- Dark mode.
- Professional admin dashboard.
- Premium customer storefront.

---

## 5. Technical Context for Design

The design will be implemented with:

```text
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui-style components
Framer Motion
Lucide React icons
```

Backend later:

```text
NestJS
PostgreSQL
Prisma
Redis
Stripe
Nginx
Docker
```

Please design reusable components that fit component-based frontend development.

---

## 6. Architecture Context

The platform architecture includes these modules:

- Auth.
- Users.
- Products.
- Categories.
- Brands.
- Inventory.
- Cart/basket.
- Reservations.
- Orders.
- Payments.
- Admin.
- CRM.
- Notifications.
- Uploads/media.

Important business concepts:

### Basket

Customer can add selected tools to basket before checkout.

### Reservation

Customer can reserve tools temporarily. Reservation locks stock for a limited time. User should see a clear reservation timer and status.

Reservation states:

```text
PENDING
ACTIVE
EXPIRED
CANCELLED
CONVERTED_TO_ORDER
```

### Order

Order states:

```text
PENDING_PAYMENT
PAID
PROCESSING
SHIPPED
DELIVERED
CANCELLED
REFUNDED
```

### Payment

Payment will be handled with Stripe. UI should feel secure and trustworthy.

### CRM

Admin can view customer profile, order history, reservation history, internal notes, support activity, and timeline.

---

## 7. Software Engineering Design Principles to Respect

Please design with these principles in mind:

### High cohesion

Each page and component should have one clear purpose.

### Low coupling

Shared UI components should be reusable and not tied to one page only.

### Maintainability

Use a consistent design system and repeatable patterns.

### Testability

Important UI states should be clear and predictable.

### Usability

The customer should always understand:

- Where they are.
- What product they are viewing.
- Whether it is in stock.
- What action to take next.
- Whether reservation or payment succeeded.

### Accessibility

Design must support keyboard navigation, readable contrast, screen reader labels, reduced motion, and responsive layouts.

---

## 8. Delivery Phases

We are starting UI/UX first.

Design according to this phase plan:

```text
Phase 1: UI/UX Design and Product Experience
Phase 2: Frontend UI Prototype with Mock Data
Phase 3: Backend Foundation and Database
Phase 4: Product, Inventory, Basket, and Reservation
Phase 5: Checkout, Payment, Orders, and User Panel
Phase 6: Admin Panel and CRM
Phase 7: Testing, Security, Deployment, and Production Readiness
Phase 8: Enterprise Enhancements
```

Your output should mainly cover **Phase 1** and prepare clear implementation guidance for **Phase 2**.

---

# 9. Phase 1 Design Tasks

Create complete UI/UX design guidance for the following days.

## Day 1: Brand and Design Direction

Provide:

- Brand personality.
- Visual mood.
- Color palette.
- Typography recommendation.
- Icon style.
- Product image style.
- Copywriting tone.
- Design dos and don'ts.

## Day 2: Design System Planning

Provide a complete design system plan for:

- Colors.
- Typography.
- Spacing.
- Grid.
- Border radius.
- Shadows.
- Buttons.
- Inputs.
- Cards.
- Badges.
- Tables.
- Dialogs.
- Drawers.
- Tabs.
- Toasts.
- Forms.
- Empty states.
- Loading states.
- Error states.
- Status states.

Required components:

```text
Button
Input
Select
Textarea
Card
Badge
Dialog
Drawer
Table
Tabs
Toast
ProductCard
CartDrawer
ReservationTimer
CheckoutStepper
AdminSidebar
DashboardMetricCard
ProductImageGallery
ProductFilterSidebar
OrderStatusBadge
PaymentStatusBadge
InventoryStatusBadge
CustomerTimeline
```

## Day 3: Customer Journey and Wireframes

Provide UX flow and wireframe descriptions for:

- Homepage.
- Shop/product listing.
- Product detail.
- Basket/cart.
- Reservation flow.
- Checkout.
- Payment success.
- Payment failure.
- Order confirmation.

Customer journey:

```text
Homepage -> Shop/Search -> Product Detail -> Basket/Reservation -> Checkout -> Payment -> Confirmation -> Account Orders
```

## Day 4: User Panel Wireframes

Provide UX and wireframe descriptions for:

- Account dashboard.
- Orders page.
- Order detail page.
- Reservations page.
- Reservation detail page.
- Profile page.
- Addresses page.
- Wishlist page.

## Day 5: Admin Panel and CRM Wireframes

Provide UX and wireframe descriptions for:

- Admin dashboard.
- Product management table.
- Add/edit product form.
- Inventory management page.
- Orders management page.
- Reservations management page.
- Customers list.
- Customer CRM profile.
- Customer timeline.
- Internal notes.
- Audit log view.

## Day 6: Interaction, Animation, and Responsive UX

Provide:

- Micro-interactions.
- Framer Motion animation ideas.
- Hover states.
- Focus states.
- Cart drawer behavior.
- Reservation timer behavior.
- Checkout step transitions.
- Admin table interactions.
- Mobile navigation behavior.
- Reduced-motion accessibility rules.

## Day 7: UI/UX Review and Final Design Specification

Provide:

- Final MVP page list.
- Component priority list.
- Design QA checklist.
- UX acceptance criteria.
- Frontend implementation notes.

---

# 10. Required Pages

Please design all of these pages.

## Public Storefront

```text
/
/shop
/categories/[slug]
/products/[slug]
/cart
/checkout
/checkout/success
/checkout/failure
/search
```

## Auth

```text
/login
/register
/forgot-password
/reset-password
```

## User Panel

```text
/account
/account/orders
/account/orders/[id]
/account/reservations
/account/reservations/[id]
/account/profile
/account/addresses
/account/wishlist
/account/security
```

## Admin Panel

```text
/admin
/admin/products
/admin/products/new
/admin/products/[id]/edit
/admin/categories
/admin/brands
/admin/inventory
/admin/orders
/admin/orders/[id]
/admin/reservations
/admin/reservations/[id]
/admin/customers
/admin/customers/[id]
/admin/payments
/admin/audit-logs
/admin/settings
```

---

# 11. Storefront UX Requirements

## Homepage

Must include:

- Announcement bar.
- Main navbar.
- Search bar.
- Category navigation or mega menu.
- Hero section.
- Primary CTA: Shop Tools.
- Secondary CTA: View Deals or Reserve Tools.
- Featured categories.
- Featured products.
- Deals/promotions section.
- Trust badges.
- Why choose us section.
- Testimonials/reviews.
- Newsletter or contact CTA.
- Footer.

The homepage should immediately communicate:

- Professional auto tools.
- Secure payment.
- Fast delivery.
- Warranty/returns.
- Reservation available.

## Shop/Product Listing

Must include:

- Product grid.
- Filter sidebar.
- Search input.
- Sort dropdown.
- Active filter chips.
- Pagination or infinite load recommendation.
- Mobile filter drawer.
- Empty state.
- Loading skeleton.

Filters:

- Category.
- Brand.
- Price range.
- Availability.
- Rating.
- Tool type.
- Vehicle compatibility later.

## Product Detail

Must include:

- Image gallery.
- Product title.
- Brand.
- Price.
- Discount if applicable.
- Stock status.
- Reservation availability.
- Quantity selector.
- Add to basket button.
- Reserve button.
- Buy now button optional.
- Secure payment/trust block.
- Description.
- Specifications.
- Vehicle compatibility.
- Warranty and returns.
- Reviews.
- Related products.

## Basket/Cart

Must include:

- Cart item list.
- Quantity controls.
- Remove action.
- Item subtotal.
- Order summary.
- Discount code field.
- Estimated delivery/shipping.
- Proceed to checkout.
- Reserve selected items.
- Empty basket state.

## Checkout

Must include:

- Checkout stepper.
- Contact/shipping details.
- Delivery method.
- Payment step.
- Order review.
- Terms/returns notice.
- Secure payment reassurance.
- Success/failure states.

---

# 12. Reservation UX Requirements

Reservation is a major feature. Please design it very clearly.

The UI must show:

- What reservation means.
- How long stock is held.
- Reservation expiry timer.
- Reserved quantity.
- Pay now button.
- Cancel reservation button.
- Expired state.
- Converted-to-order state.

Reservation timer should feel urgent but not stressful.

Suggested copy examples:

```text
Reserved for you
Your tools are held until 14:35
Complete payment before the timer ends to keep this reservation.
```

Expired copy:

```text
Reservation expired
This item is now available for other customers. You can reserve it again if stock is available.
```

---

# 13. User Panel UX Requirements

User dashboard should be simple and comfortable.

Include:

- Welcome section.
- Active orders summary.
- Active reservations summary.
- Wishlist summary.
- Recent purchases.
- Quick actions.

Orders page:

- Order cards or table.
- Status badges.
- Payment status.
- Order date.
- Total.
- View detail action.

Reservations page:

- Active reservation cards.
- Expiry timer.
- Pay now action.
- Cancel action.
- Expired reservation history.

Profile/address pages:

- Clean forms.
- Clear save states.
- Default address badge.

---

# 14. Admin Panel UX Requirements

Admin panel should feel like a modern SaaS dashboard.

## Admin Dashboard

Include:

- Revenue card.
- Orders card.
- Reservations card.
- Low-stock card.
- Recent orders table.
- Recent payments table.
- Top products chart.
- Reservation status chart.
- Low-stock alert panel.

## Product Management

Include:

- Product table.
- Search.
- Filters.
- Status badges.
- Stock summary.
- Quick actions.
- Add product button.
- Edit action.
- Deactivate action.

Add/edit product form:

- Basic info.
- Pricing.
- Category/brand.
- Images.
- Specifications.
- Compatibility.
- Inventory.
- SEO fields.
- Save draft/publish actions.

## Inventory

Include:

- Total stock.
- Reserved stock.
- Sold stock.
- Available stock.
- Low-stock indicator.
- Stock adjustment action.
- Stock movement history.

## Orders

Include:

- Order table.
- Status filters.
- Payment status filters.
- Customer info.
- Order detail page.
- Timeline of order status.
- Update status action.

## Reservations

Include:

- Reservation table.
- Active/expired/cancelled/converted filters.
- Expiry time.
- Reserved stock.
- Customer.
- Reservation detail.

## CRM Customer Profile

Include:

- Customer identity summary.
- Contact info.
- Total spend.
- Order count.
- Reservation count.
- Recent orders.
- Active reservations.
- Internal notes.
- Support tickets.
- Customer timeline.
- Tags/segments.

---

# 15. Status Badge Requirements

Design consistent status badges.

Product stock:

```text
In Stock
Low Stock
Out of Stock
Reserved
```

Reservation:

```text
Active
Expiring Soon
Expired
Cancelled
Converted to Order
```

Order:

```text
Pending Payment
Paid
Processing
Shipped
Delivered
Cancelled
Refunded
```

Payment:

```text
Pending
Paid
Failed
Refunded
Cancelled
```

Each status should include:

- Color.
- Icon suggestion.
- Label.
- Tooltip text if needed.

---

# 16. Animation Guidelines

Use animations professionally, not excessively.

Please define animations for:

- Homepage hero entrance.
- Category cards.
- Product card hover.
- Add-to-basket microinteraction.
- Cart drawer slide-in.
- Reservation timer pulse or progress.
- Checkout step transition.
- Admin dashboard cards entrance.
- Table row hover.
- Loading skeletons.

Requirements:

- Animations should be subtle and premium.
- Must not hurt mobile performance.
- Must respect `prefers-reduced-motion`.
- Avoid childish or distracting effects.

---

# 17. Accessibility Requirements

Please include accessibility guidance for:

- Color contrast.
- Keyboard navigation.
- Focus rings.
- ARIA labels.
- Dialog/drawer focus trap.
- Error messages.
- Form labels.
- Screen-reader friendly status changes.
- Reduced motion.
- Mobile touch target sizes.

---

# 18. Responsive Requirements

Design for:

```text
Mobile: 360px+
Tablet: 768px+
Laptop: 1024px+
Desktop: 1280px+
Large desktop: 1536px+
```

Please explain how layouts change by screen size.

Examples:

- Product filters become drawer on mobile.
- Cart summary becomes sticky bottom on mobile.
- Admin tables become card/list layout or horizontally scrollable on mobile.
- Navbar becomes mobile sheet/drawer.

---

# 19. Empty, Loading, and Error States

Please define states for:

- No products found.
- Empty basket.
- Empty orders.
- Empty reservations.
- Payment failed.
- Reservation expired.
- Product out of stock.
- Admin table empty.
- CRM customer with no activity.
- Network error.
- Loading product grid.
- Loading admin dashboard.

Each state should include:

- Title.
- Short message.
- Icon suggestion.
- Primary action.
- Secondary action if useful.

---

# 20. Output Format Required

Please structure your response exactly like this:

```text
1. Executive UI/UX Summary
2. Brand Identity
3. Color Palette
4. Typography System
5. Layout and Grid System
6. Design System Components
7. Storefront Page-by-Page Specification
8. Basket, Reservation, and Checkout UX
9. User Panel Specification
10. Admin Panel Specification
11. CRM UX Specification
12. Status Badge System
13. Animation and Microinteraction Guide
14. Responsive Design Rules
15. Accessibility Rules
16. Empty/Loading/Error States
17. UX Copywriting Suggestions
18. MVP UI Scope
19. Frontend Implementation Notes
20. Design QA Checklist
```

Do not skip any section.

---

# 21. Extra Requirements

Please be specific and practical.

For each important page, include:

- Page goal.
- User intent.
- Layout sections.
- Key components.
- Primary CTA.
- Secondary actions.
- Important states.
- Mobile behavior.
- Animation ideas.

For each component, include:

- Purpose.
- Variants.
- States.
- Usage rules.

For forms, include:

- Field grouping.
- Validation behavior.
- Error message style.
- Success state.

For admin pages, include:

- Table columns.
- Filters.
- Row actions.
- Bulk actions if useful.
- Detail page layout.

---

# 22. Final Goal

The final design should help us build a professional UI prototype first, using mock data, before backend implementation.

The design must support this implementation order:

```text
1. Design system and layout
2. Homepage
3. Shop/product listing
4. Product detail
5. Basket and reservation UI
6. Checkout
7. User panel
8. Admin panel
9. CRM screens
10. Polish, accessibility, responsive QA
```

Please produce a complete enterprise-quality UI/UX specification now.
