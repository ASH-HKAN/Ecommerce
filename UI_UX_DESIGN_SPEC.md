# Auto Tools E-Commerce Platform — UI/UX Design Specification

This document is the complete UI/UX design specification for the auto-tools e-commerce platform. It implements the design brief defined in `CLAUDE_OPUS_UI_UX_PROMPT.md`, anchored to the architecture in `ARCHITECTURE.md`, the user stories in `USER_STORIES.md`, the tasks in `TASK_STORIES.md`, and the phased plan in `PROJECT_PIPELINE.md`.

It is intended to be implementable directly with **Next.js + React + TypeScript + Tailwind CSS + shadcn/ui-style components + Framer Motion + Lucide React**. No production code is included; this is a design contract.

---

# 1. Executive UI/UX Summary

## 1.1 Vision

A **professional automotive industrial** storefront that feels like a serious tool brand, paired with a **SaaS-grade admin dashboard** for the operator. Customers should feel confident the tools are real, the stock is real, and payment is safe. Admins should feel like the system runs the business with them, not against them.

## 1.2 Design pillars

- **Trust first.** Every page communicates legitimacy: clear stock, clear price, secure payment, warranty, returns, real product specs, real photography.
- **Speed of decision.** Customers find a tool, understand it, and act in as few steps as possible.
- **Reservation as a first-class action.** Reserving is treated with the same visual weight as buying, because it is a load-bearing business behavior.
- **Operational clarity.** Admin views surface the right number, the right list, and the right next action without hunting.
- **Restraint.** Animations and ornamentation never block the task. The brand is industrial, not theatrical.

## 1.3 Audience priorities

```text
Customer:    discover -> verify fit -> reserve or buy -> pay -> track
Admin:       monitor -> manage stock -> manage orders/reservations -> understand customer
Staff:       process orders -> answer support -> log activity
```

## 1.4 Success criteria for the design

- Customer can move from homepage to "added to basket" in **3 actions** on desktop, **3 taps** on mobile.
- Customer can tell at a glance whether a product is **in stock, low stock, reservable, or sold out**.
- Reservation timer and reservation state are **never ambiguous**.
- Admin dashboard surfaces revenue, orders, reservations, and low stock **above the fold**.
- All status changes (order, payment, reservation, stock) are **color, icon, and label** consistent across the entire system.
- No critical action lacks a **loading**, **success**, **error**, and **empty** state.
- All flows are **WCAG 2.1 AA** at minimum.

## 1.5 Out of scope for Phase 1

- Vehicle compatibility selector UI beyond a placeholder section
- Loyalty/tier UI
- Multi-warehouse UI
- Marketing automation UI
- Native mobile app screens

These appear in `PROJECT_PIPELINE.md` Phase 8 and are intentionally deferred.

---

# 2. Brand Identity

## 2.1 Brand personality

```text
Reliable | Industrial | Precise | Confident | Modern | Quietly Premium
```

## 2.2 Voice and tone

- **Voice:** the voice of a senior shop foreman who respects your time. Direct, technical when it matters, never patronizing.
- **Tone:** confident in product pages, calm in checkout, urgent but not stressful in reservation timers, neutral and factual in admin.

Examples:

```text
Hero headline:         Tools built for the work, priced for the shop.
Hero subhead:          Diagnostic, hand, power, and garage equipment from brands mechanics already trust.
Primary CTA:           Shop tools
Secondary CTA:         How reservation works
Trust strip:           Genuine stock. Secure payment. Real warranty.
```

## 2.3 Brand values reflected in UI

- **Honesty:** never hide stock state, shipping cost, or payment status.
- **Precision:** specifications are first-class, not buried.
- **Stewardship:** reservations are honored, expirations are explained, refunds are respected.
- **Craft:** layout, type, and spacing show the same care as the tools sold.

## 2.4 Visual mood

```text
Workshop floor under good light.
Clean steel, matte black, controlled orange.
No glitter, no neon, no playful bounces.
```

## 2.5 Logo and lockup direction

This spec assumes a wordmark + emblem.

- **Wordmark** in a strong geometric sans, all caps or small caps, generous letter spacing.
- **Emblem** is a simple monogram or hex/shield mark; works at 16px and on dark.
- Always reserve **clearspace** equal to the cap height around the lockup.
- Provide **mono-light** and **mono-dark** variants for footers, invoices, and admin.

## 2.6 Photography and imagery

- **Product:** isolated on near-white or near-black with consistent shadow, 1:1 primary, 4:5 secondary, neutral color cast.
- **Lifestyle:** real workshops, real hands, no stock-photo smiles, controlled color grading toward cool neutrals with warm accent.
- **Iconography:** monoline, 1.5px stroke, rounded ends, consistent 24px grid (Lucide is the chosen system).
- **Illustration:** technical line illustrations only when needed for empty states; never decorative cartoons.

## 2.7 Brand do / don't

Do:

- Use orange sparingly as a directional accent.
- Use dark surfaces for hero, premium, and admin.
- Lead with product photography, not graphics.
- Pair short, declarative copy with precise specs.

Don't:

- Use gradients as primary surfaces.
- Use more than two accent colors at once.
- Mix icon styles (no filled + outline together).
- Use exclamation marks in product or checkout copy.

---

# 3. Color Palette

## 3.1 Palette principles

- **Two backgrounds, one accent.** Neutral surfaces carry the work; orange is reserved for action.
- **Status colors are not brand colors.** Green/amber/red are only used for state, never decoration.
- **Tokens, not hex.** Designers reference tokens (e.g., `surface.canvas`); engineers map them to CSS variables.

## 3.2 Brand colors

```text
brand.orange.50    #FFF4ED
brand.orange.100   #FFE3CC
brand.orange.300   #FFB266
brand.orange.500   #F97316   <- primary accent
brand.orange.600   #EA670C
brand.orange.700   #C2570A

brand.steel.50     #F8FAFC
brand.steel.100    #F1F5F9
brand.steel.200    #E2E8F0
brand.steel.300    #CBD5E1
brand.steel.400    #94A3B8
brand.steel.500    #64748B
brand.steel.600    #475569
brand.steel.700    #334155
brand.steel.800    #1E293B
brand.steel.900    #0F172A
brand.steel.950    #0B0F19   <- dark canvas

brand.blue.500     #2563EB   <- secondary accent (links, info)
brand.blue.600     #1D4ED8
```

## 3.3 Semantic tokens — light mode

```text
surface.canvas         brand.steel.50
surface.raised         #FFFFFF
surface.sunken         brand.steel.100
surface.inverse        brand.steel.950

text.primary           brand.steel.900
text.secondary         brand.steel.600
text.muted             brand.steel.500
text.inverse           #FFFFFF
text.link              brand.blue.600

border.subtle          brand.steel.200
border.default         brand.steel.300
border.strong          brand.steel.500
border.focus           brand.orange.500

action.primary.bg      brand.orange.500
action.primary.bgHover brand.orange.600
action.primary.fg      #FFFFFF

action.secondary.bg    brand.steel.900
action.secondary.bgHover brand.steel.700
action.secondary.fg    #FFFFFF

action.ghost.fg        brand.steel.900
action.ghost.bgHover   brand.steel.100
```

## 3.4 Semantic tokens — dark mode

```text
surface.canvas         brand.steel.950
surface.raised         brand.steel.900
surface.sunken         #0A0E17
surface.inverse        #FFFFFF

text.primary           #F8FAFC
text.secondary         brand.steel.300
text.muted             brand.steel.400
text.inverse           brand.steel.900
text.link              #60A5FA

border.subtle          brand.steel.800
border.default         brand.steel.700
border.strong          brand.steel.500
border.focus           brand.orange.500

action.primary.bg      brand.orange.500
action.primary.bgHover brand.orange.600
action.primary.fg      #0B0F19

action.secondary.bg    #FFFFFF
action.secondary.bgHover brand.steel.200
action.secondary.fg    brand.steel.900

action.ghost.fg        #F8FAFC
action.ghost.bgHover   brand.steel.800
```

## 3.5 Status palette

```text
status.success.bg      #ECFDF5
status.success.fg      #047857
status.success.border  #6EE7B7
status.success.solid   #10B981

status.warning.bg      #FFFBEB
status.warning.fg      #B45309
status.warning.border  #FCD34D
status.warning.solid   #F59E0B

status.danger.bg       #FEF2F2
status.danger.fg       #B91C1C
status.danger.border   #FCA5A5
status.danger.solid    #EF4444

status.info.bg         #EFF6FF
status.info.fg         #1D4ED8
status.info.border     #93C5FD
status.info.solid      #2563EB

status.neutral.bg      brand.steel.100
status.neutral.fg      brand.steel.700
status.neutral.border  brand.steel.300
status.neutral.solid   brand.steel.500
```

In dark mode, status `bg` shifts to a low-alpha tint of the solid color (8–14% opacity) over `surface.raised`; `fg` and `border` use the lighter step of the same hue.

## 3.6 Contrast rules

- All body text against its background ≥ **4.5:1**.
- Large text (≥ 18.66px or 14px bold) ≥ **3:1**.
- UI components and graphical objects ≥ **3:1**.
- The orange accent on white is for **buttons and icons sized ≥ 16px bold**, not body text. Body links use `brand.blue.600` (light) or `#60A5FA` (dark) for AA contrast.

## 3.7 Color usage rules

- **Orange** appears once per viewport as the primary action. Multiple orange CTAs on screen is a bug.
- **Status colors** never decorate; if a thing is red, it is broken or dangerous.
- **Backgrounds** never sit directly on white photos; product images get a 1px subtle border or `surface.sunken` plate.
- **Hover** never relies on color alone; pair with elevation or border change.

---

# 4. Typography System

## 4.1 Type families

```text
Display / Headings:   Inter Tight  (alt: Space Grotesk)
Body / UI:            Inter        (alt: Geist Sans)
Mono / Specs / SKUs:  JetBrains Mono (alt: Geist Mono)
Numerals:             tabular-nums enabled in tables, prices, timers
```

Rationale: Inter and Inter Tight share metrics, so headings and body align on baseline; mono is used for SKUs, order numbers, timers, and any value the user might compare digit-by-digit.

## 4.2 Type scale

A modular scale, base 16px, ratio 1.2 on mobile and 1.25 on desktop.

```text
display.xl    56 / 60   weight 700   tracking -0.02em
display.lg    44 / 50   weight 700   tracking -0.02em
display.md    36 / 42   weight 700   tracking -0.01em
display.sm    28 / 34   weight 700   tracking -0.01em

heading.xl    24 / 32   weight 600   tracking -0.005em
heading.lg    20 / 28   weight 600
heading.md    18 / 26   weight 600
heading.sm    16 / 24   weight 600

body.lg       18 / 28   weight 400
body.md       16 / 24   weight 400   <- default
body.sm       14 / 20   weight 400
body.xs       12 / 16   weight 500   tracking 0.02em (uppercase eyebrows)

mono.md       14 / 20   weight 500   tabular-nums
mono.sm       12 / 16   weight 500   tabular-nums
```

## 4.3 Usage rules

- **Display** is reserved for hero, empty-state hero, and admin dashboard top metrics.
- **Heading.xl** is the page title.
- **Heading.lg** is a section title.
- **Heading.md** is a card title or block title.
- **Heading.sm** is a subgroup label.
- **Body.md** is the default reading size.
- **Body.xs** uppercase is reserved for eyebrows like `CATEGORY` or `STATUS`.
- **Mono** is for SKUs, order numbers, timers, prices in admin tables, and any side-by-side numeric.
- Prices on storefront are body or heading sized but always **tabular-nums**.

## 4.4 Hierarchy rules

- Never skip more than one level (no `display.xl` directly above `body.md`).
- Eyebrow + heading + lead is the standard block opener.
- Never center body copy longer than one line.

---

# 5. Layout and Grid System

## 5.1 Breakpoints

```text
xs  360
sm  480
md  768
lg  1024
xl  1280
2xl 1536
```

## 5.2 Container widths

```text
container.narrow  640   <- forms, focused content
container.reading 720   <- legal, policy
container.content 1120  <- product detail, account
container.wide    1280  <- shop, listing pages
container.app     1440  <- admin
container.full    100%  <- hero backgrounds
```

Containers center horizontally and pad with the gutter scale.

## 5.3 Grid

- **Mobile (≤ md):** single column, 16px gutters, 16px outer padding.
- **Tablet (md):** 8-column grid, 16px gutters, 24px outer padding.
- **Desktop (≥ lg):** 12-column grid, 24px gutters, 32px outer padding.
- **Admin (≥ xl):** 12-column grid with optional sidebar (240px) plus content area.

## 5.4 Spacing scale

Tailwind-aligned 4px base.

```text
space.0   0
space.1   4
space.2   8
space.3   12
space.4   16
space.5   20
space.6   24
space.8   32
space.10  40
space.12  48
space.16  64
space.20  80
space.24  96
```

Section vertical rhythm:

- Mobile section padding: `space.10` top/bottom.
- Desktop section padding: `space.16` top/bottom.
- Hero: `space.20` top, `space.16` bottom desktop; `space.12 / space.10` mobile.

## 5.5 Radius and elevation

```text
radius.xs  4
radius.sm  6
radius.md  8     <- default (inputs, buttons, badges)
radius.lg  12    <- cards
radius.xl  16    <- modals, drawers, hero panels
radius.2xl 24    <- showcase cards
radius.full 9999 <- pills, avatars
```

Elevation tokens (shadows are cool gray, not black, to feel industrial not gummy):

```text
elev.0   none
elev.1   0 1px 2px rgba(15,23,42,0.06)
elev.2   0 1px 2px rgba(15,23,42,0.06), 0 2px 6px rgba(15,23,42,0.06)
elev.3   0 4px 14px rgba(15,23,42,0.08)
elev.4   0 12px 32px rgba(15,23,42,0.12)
elev.focus  0 0 0 3px rgba(249,115,22,0.35)
```

In dark mode, shadows are reduced to ~40% opacity and a 1px `border.subtle` is added on raised surfaces to keep edges legible.

## 5.6 Z-index scale

```text
z.base       0
z.raised     10
z.dropdown   1000
z.sticky     1100
z.overlay    1200
z.drawer     1300
z.modal      1400
z.toast      1500
z.tooltip    1600
```

---

# 6. Design System Components

This section specifies every component required by the prompt, with purpose, variants, states, anatomy, and usage rules. All components are typed and named in a way that maps cleanly to Next.js + shadcn/ui-style implementation.

## 6.1 Button

- **Purpose:** trigger an action.
- **Variants:** `primary`, `secondary`, `ghost`, `outline`, `destructive`, `link`.
- **Sizes:** `sm` (32 high), `md` (40), `lg` (48), `xl` (56 — hero only).
- **Icon support:** leading, trailing, icon-only (icon-only must have aria-label).
- **States:** default, hover, active, focus-visible, disabled, loading.
- **Loading:** shows a 16px spinner, label is replaced by spinner + visually-hidden status, button is `aria-busy="true"`.
- **Rules:**
  - Only one `primary` button per viewport region.
  - Destructive uses `status.danger.solid` background only after confirmation; in tables use ghost-destructive for row actions.
  - Buttons always have a focus ring using `elev.focus`.

## 6.2 IconButton

- **Purpose:** action without label.
- **Sizes:** 32, 40, 48 minimum touch target on mobile is 44.
- **Always** has `aria-label` and tooltip on hover.

## 6.3 Input

- **Variants:** `text`, `email`, `password`, `search`, `number`.
- **Anatomy:** label (top), optional helper (under label), input, hint or error (bottom).
- **States:** default, hover, focus, filled, disabled, error, success.
- **Rules:**
  - Labels always visible. Placeholder is example data, not the label.
  - Error messages are short, second-person, and prescriptive: "Enter a valid email." not "Invalid email."
  - Password fields include a show/hide IconButton.

## 6.4 Select

- **Type:** combobox-style select with keyboard navigation.
- **Variants:** single, multi (multi shows chips below).
- **States:** default, focus, open, disabled, error.
- **Rules:** for >7 options, support type-to-filter.

## 6.5 Textarea

- **Auto-grow** to a max of 8 rows.
- **Counter** appears at 80% of max length.

## 6.6 Checkbox / Radio / Switch

- **Checkbox:** square, `radius.xs`, 18px box, check uses `action.primary.bg` background and white check.
- **Radio:** circle, 18px.
- **Switch:** 36×20, brand orange when on; off uses `border.default`.
- **All** support `indeterminate` (checkbox), `disabled`, focus ring, and have a 44px touch target including the label.

## 6.7 Card

- **Variants:** `flat` (no shadow, 1px border), `raised` (elev.2), `interactive` (elev.2 → elev.3 on hover, with translateY(-2px)).
- **Anatomy:** optional media, header, body, footer.
- **Rules:** cards never nest inside cards more than one level.

## 6.8 Badge

- **Variants:** `solid`, `subtle`, `outline`, `dot` (status dot before label).
- **Tones:** `neutral`, `success`, `warning`, `danger`, `info`, `brand`.
- **Sizes:** `sm` 20 high, `md` 24 high.
- **Rules:** badges always pair with an icon for status semantics (see Section 12).

## 6.9 Tag / Chip

- **Filter chip** with optional remove icon.
- Used for active filters and selected attributes.
- Removing has 200ms collapse animation.

## 6.10 Tabs

- **Variants:** `line` (underline, default for content), `segmented` (pill, default for compact filters).
- **Keyboard:** left/right arrows move, home/end jump.
- **Rules:** never more than 5 tabs visible; scroll horizontally on mobile.

## 6.11 Dialog (Modal)

- **Sizes:** `sm` 400, `md` 560, `lg` 720, `full` mobile.
- **Anatomy:** header (title + close), body, footer (actions right-aligned, primary on the right).
- **Behavior:** focus trap, ESC closes, click-outside closes unless destructive (then requires explicit cancel).
- **Animation:** scale 0.98 → 1 + fade 120ms.

## 6.12 Drawer

- **Anchors:** right (cart, filters), left (admin nav on mobile), bottom (mobile filters, mobile cart summary).
- **Widths:** 360 default, 480 cart, 100% on small mobile.
- **Behavior:** focus trap, ESC closes, swipe-down closes bottom drawers on touch.

## 6.13 Toast

- **Tones:** success, info, warning, danger.
- **Position:** bottom-right desktop, bottom-center mobile.
- **Auto-dismiss:** 4s default, 7s for warning, never auto-dismiss danger.
- **Action support:** one inline action button (e.g., "Undo").

## 6.14 Tooltip

- **Trigger:** hover after 250ms, focus immediately.
- **Mobile:** suppressed, since hover is unreliable; use a small inline help icon if information is essential.

## 6.15 Table

- **Density:** `comfortable` (56 row), `default` (48), `compact` (40 — admin lists).
- **Features:** column sort, column resize on admin only, sticky header, sticky first column on wide tables, row hover, selectable rows, row actions menu (kebab).
- **Empty state** lives inside the table body area, not the page level, when filters cause emptiness.
- **Mobile:** transform to stacked card list at < md.

## 6.16 Pagination

- **Variants:** numbered (storefront), simple prev/next (mobile), load-more (homepage featured grids).
- **Rules:** show first, last, current ±2; ellipsis between gaps.

## 6.17 Breadcrumbs

- **Pattern:** `Home / Category / Subcategory / Product`.
- Truncate the middle on mobile to first + ellipsis + last.

## 6.18 Avatar

- **Sizes:** 24, 32, 40, 56.
- **Fallback:** initials over `surface.sunken`.

## 6.19 Skeleton

- **Shapes:** rectangle, circle, line, image-aspect.
- **Animation:** subtle shimmer 1.4s, respects `prefers-reduced-motion` (then static gray).

## 6.20 ProductCard

- **Anatomy:** image (square 1:1), brand eyebrow, title (2 lines max), spec row (key spec + rating), price row (price + compare-at), stock badge, action row (Add to basket primary, Reserve secondary).
- **States:** default, hover (elev.3, subtle image zoom 1.02, action row revealed), out-of-stock (image desaturated, primary becomes "Notify me"), reserved-by-others (badge shown).
- **Rules:** card is fully clickable; inner buttons stop propagation. Always show one decisive price; strike-through compare-at uses `text.muted`.

## 6.21 CartDrawer

- **Anatomy:** header ("Your basket" + item count), scrollable list of CartLineItem, sticky footer (subtotal, "Proceed to checkout" primary, "View basket" ghost).
- **CartLineItem:** thumbnail, title, variant, quantity stepper, line price, remove icon.
- **Behavior:** opens from cart icon, keeps focus, traps it, ESC closes.
- **Empty state:** illustration, "Your basket is empty", "Browse tools" primary.

## 6.22 ReservationTimer

- **Anatomy:** label ("Reserved for you"), countdown `mm:ss` in `mono.md`, progress bar (filled portion = elapsed), state badge.
- **Variants:** `inline` (in card), `prominent` (top of reservation page), `mini` (in header for active reservation).
- **States:** active (orange progress), expiring-soon (amber pulse 2s loop, last 5 minutes), expired (red, timer becomes 00:00, action is "Reserve again"), converted (green check + "Paid").
- **Rules:** never blink faster than 1Hz; never make countdown red until ≤ 60s; respect reduced-motion (no pulse).

## 6.23 CheckoutStepper

- **Steps:** Address → Delivery → Payment → Review.
- **Variants:** horizontal (desktop), vertical (mobile sticky top).
- **States per step:** complete (check icon, green), current (orange ring), upcoming (muted), error (red dot).
- **Rules:** clicking a previous step returns; future steps are disabled.

## 6.24 AdminSidebar

- **Anatomy:** brand mark, primary nav (Dashboard, Catalog, Inventory, Orders, Reservations, Customers, Payments, Settings), secondary nav (Audit Logs, Help), user menu at bottom.
- **States:** expanded (240), collapsed (72, icons only with tooltips), mobile (drawer).
- **Active item** uses left 3px orange bar + `surface.raised` background.

## 6.25 DashboardMetricCard

- **Anatomy:** label (eyebrow), value (display.sm, tabular-nums), delta chip (vs prior period, green/red), sparkline (40 high), context line.
- **Variants:** `revenue`, `orders`, `reservations`, `low-stock`.
- **States:** loading (skeleton), error (inline), empty (em-dash value).

## 6.26 ProductImageGallery

- **Anatomy:** main viewer (1:1, zoomable), thumbnails (vertical desktop, horizontal mobile), 360°/video markers if present.
- **Behavior:** keyboard arrows switch images, click to zoom (mobile pinch), gallery is announced as "Image 2 of 6".

## 6.27 ProductFilterSidebar

- **Anatomy:** scrollable left rail with grouped filters (Category, Brand, Price, Availability, Rating, Tool Type, Compatibility placeholder).
- **Each group:** header (collapsible), top 8 options, "Show more" link.
- **Footer:** "Reset filters" ghost.
- **Mobile:** opens as bottom drawer; sticky footer with "Apply (count) results".

## 6.28 OrderStatusBadge / PaymentStatusBadge / InventoryStatusBadge

- All three are `Badge` instances with prescribed icon + tone, defined in Section 12.

## 6.29 CustomerTimeline

- **Anatomy:** vertical timeline grouped by day, event rows with icon, title, meta, optional payload (order link, refund amount).
- **Filters:** event types (orders, reservations, payments, support, notes).
- **Empty state:** "No activity yet."

## 6.30 SearchBar

- **Variants:** `inline` (navbar), `prominent` (homepage hero), `command` (admin Cmd/Ctrl-K palette).
- **Features:** debounced suggestions (250ms), recent searches, category scoping (e.g., "in Diagnostic Tools").
- **Mobile:** opens as full-screen sheet.

## 6.31 PriceBlock

- **Anatomy:** main price (heading.md, tabular-nums), compare-at (struck through, `text.muted`), savings chip ("Save 12%"), tax/shipping note ("Incl. VAT" or "Tax at checkout").
- Used everywhere a price is shown to keep behavior identical.

## 6.32 QuantityStepper

- **Anatomy:** `-` / number / `+` controls, 40 high, decrement disabled at 1, increment disabled at stock cap with tooltip "Only 3 in stock".
- Always **synchronously validates** against stock.

## 6.33 EmptyState

- **Anatomy:** icon (40px), title, body, primary action, optional secondary.
- Used in cart, orders, reservations, search, admin tables.

## 6.34 NotificationBanner

- **Tones:** info, warning, danger.
- Used for site-wide messages (e.g., "Stripe is offline, payments paused").
- Dismissible per session.

## 6.35 Component status checklist

```text
Button .................. spec'd
IconButton .............. spec'd
Input ................... spec'd
Select .................. spec'd
Textarea ................ spec'd
Checkbox/Radio/Switch ... spec'd
Card .................... spec'd
Badge ................... spec'd
Tag/Chip ................ spec'd
Tabs .................... spec'd
Dialog .................. spec'd
Drawer .................. spec'd
Toast ................... spec'd
Tooltip ................. spec'd
Table ................... spec'd
Pagination .............. spec'd
Breadcrumbs ............. spec'd
Avatar .................. spec'd
Skeleton ................ spec'd
ProductCard ............. spec'd
CartDrawer .............. spec'd
ReservationTimer ........ spec'd
CheckoutStepper ......... spec'd
AdminSidebar ............ spec'd
DashboardMetricCard ..... spec'd
ProductImageGallery ..... spec'd
ProductFilterSidebar .... spec'd
OrderStatusBadge ........ spec'd (sec 12)
PaymentStatusBadge ...... spec'd (sec 12)
InventoryStatusBadge .... spec'd (sec 12)
CustomerTimeline ........ spec'd
SearchBar ............... spec'd
PriceBlock .............. spec'd
QuantityStepper ......... spec'd
EmptyState .............. spec'd
NotificationBanner ...... spec'd
```

---

# 7. Storefront Page-by-Page Specification

Each page below uses the structure required by the prompt: page goal, user intent, layout sections, key components, primary CTA, secondary actions, important states, mobile behavior, animation ideas.

## 7.1 Global storefront shell

Applies to every public page.

- **Announcement bar (40 high)** — single line, dismissible per session, used for shipping or warranty messages.
- **Top navbar (72 high)** — left: brand mark + mega-menu trigger. Center: SearchBar (inline). Right: user account, wishlist, CartDrawer trigger with item count badge.
- **Mega menu** — opens on hover (desktop) and on click (mobile), columns: Categories, Featured Brands, Deals, Help. Closes on ESC or outside click.
- **Breadcrumbs** below navbar on category and product pages.
- **Footer** — three column on desktop, single accordion on mobile: Shop (categories), Support (contact, returns, warranty, shipping), About + legal. Below: payment method icons, locale switcher, copyright. The footer never repeats the primary CTA.

Behavior rules:

- Navbar becomes sticky after 80px scroll, height shrinks to 56.
- Search opens as a full-screen sheet on mobile.
- Cart icon shows a 200ms scale bounce when an item is added.

## 7.2 Homepage `/`

- **Goal:** establish trust and route the user to the shop or a category in <10s.
- **User intent:** browsing, comparing brands, returning to a known section, checking deals.

Sections, top to bottom:

1. **Hero** — full-width dark plate, left side display.lg headline + lead body + primary CTA `Shop tools` + secondary `How reservation works`. Right side a high-fidelity tool product photograph with subtle vignette. Below the CTA row: trust strip (Genuine stock · Secure payment · Real warranty).
2. **Category grid** — 6–8 category cards (Diagnostic, Hand Tools, Power Tools, Garage Equipment, Tool Kits, Accessories). Each card: icon, title, brief, link. Hover: image color shift, subtle lift.
3. **Featured products** — horizontal scroll on mobile, 4-up grid on desktop. ProductCard components.
4. **Deal of the week** — wide banner card with countdown, big product image, eyebrow `LIMITED`, headline, save chip, primary CTA `Shop the deal`.
5. **Why choose us** — 4 tiles: Genuine stock, Secure payment, Reservation available, Real warranty. Icons + 2-line body.
6. **How reservation works** — 3-step explainer: 1) Reserve. 2) Pay before timer ends. 3) Pickup or ship. Includes a CTA `View reservable tools`.
7. **Top brands** — logo strip, monochrome.
8. **Editor’s picks** — 2-up large product cards with editorial copy.
9. **Testimonials** — 3 short quotes from verified buyers, role + workshop name.
10. **Newsletter / contact CTA** — single email field + submit; copy explains what they’ll receive (new arrivals, restock, deals). One sentence privacy note.

States:

- **Loading:** skeletons for hero text after 200ms, category grid, featured products.
- **Error:** if featured fetch fails, replace with 8 best-selling fallbacks; never show an empty homepage.

Mobile behavior:

- Hero stacks: image first (16:9), text below.
- Category grid 2 columns.
- Featured products horizontal scroll with snap.
- Deal banner stacks; countdown lives directly under image.

Animation ideas:

- Hero text staggered fade-up 80ms each line.
- Category cards reveal on scroll, opacity 0→1, y+8→0, 200ms.
- Deal countdown digit flip on second roll.

Primary CTA: **Shop tools** (orange).
Secondary actions: View deals, How reservation works, Browse categories, Subscribe.

## 7.3 Shop / Listing `/shop` and `/categories/[slug]`

- **Goal:** narrow the catalog to candidates the user wants to compare.
- **User intent:** filter by brand, price, availability, rating, tool type.

Layout:

- **Toolbar (sticky on desktop)** — left: result count (`123 tools`), middle: active filter chips (each removable), right: SortSelect (Newest, Popular, Price low→high, Price high→low, Rating).
- **Sidebar (desktop, 280 wide)** — ProductFilterSidebar.
- **Grid** — 4 columns ≥ xl, 3 at lg, 2 at md, 1 at sm. Card uses ProductCard.
- **Pagination** — bottom: numbered with ellipsis. Mobile: load-more.

Filters always include:

- Category, Brand, Price range, Availability (In stock, Reservable, Out of stock toggle off by default), Rating (4★+, 3★+), Tool type, Vehicle compatibility (placeholder UI: a single make/model select that shows a "Coming soon" hint chip, so the layout is final but the logic ships later).

Active states:

- Active filter chips show in toolbar with `X`. Clicking the chip removes that filter; clicking `Reset` removes all filters.

Empty state:

- "No tools match those filters." Buttons: `Clear filters` primary, `View all tools` ghost. Suggest 4 popular alternatives below.

Loading:

- Skeleton grid with the same column count, 8 placeholders.

Mobile:

- Filters become a bottom drawer triggered by a sticky `Filters (n)` button at the bottom of the screen. Sort is a separate IconButton on top of the page.
- Grid is one column; ProductCard image takes full width; action buttons compress to icons + label `Add` and `Reserve`.

Animation ideas:

- Filter changes fade out grid 100ms, swap, fade in 150ms.
- Removing a chip animates collapse (200ms).

Primary CTA: per-card `Add to basket`.
Secondary: per-card `Reserve`, per-card click → product detail.

## 7.4 Product detail `/products/[slug]`

- **Goal:** convert a candidate to add-to-basket or reserve with full confidence.
- **User intent:** verify fit, compare specs, check stock, see warranty.

Layout (desktop):

- **Left column (60%):** ProductImageGallery (sticky on scroll until specs).
- **Right column (40%, sticky):** brand eyebrow + title (heading.xl), short summary, rating row (stars + count), PriceBlock, InventoryStatusBadge, optional reservation availability hint, QuantityStepper, action stack:
  - Primary `Add to basket`
  - Secondary `Reserve`
  - Tertiary text link `Buy now` (optional)
- Trust strip directly under actions: Secure payment · Warranty included · Easy returns · Fast delivery.
- **Below the fold (full width):** Tabs `Description / Specifications / Compatibility / Warranty & Returns / Reviews`.
- **Related products** rail at the bottom.

Specifications tab:

- Two-column key-value table; mono numerals; group by Mechanical, Electrical, Dimensions, Materials. Allow copy of values.

Compatibility tab:

- Vehicle make/model selector placeholder. Until live, show a static list of supported makes plus a note: "Tell us your vehicle and we’ll confirm fit before shipping."

Reviews tab:

- Aggregate row (avg rating, count, distribution bars). Filters: rating, verified buyer. List with avatar, name, date, body, helpful vote.

Stock states:

- **In stock:** primary action enabled, `In stock — ships in 1–2 days`.
- **Low stock:** amber badge `Only 3 left`, primary still enabled.
- **Reservable only:** primary becomes `Reserve` (orange), `Add to basket` disabled with tooltip.
- **Out of stock:** primary becomes `Notify me when back`; show next-restock hint if known.

Mobile:

- Image gallery 1:1, swipeable; thumbnails as dots.
- Sticky bottom action bar contains price + `Add to basket` + `Reserve` icon button. Tabs become accordion sections.

Animation ideas:

- Add-to-basket microinteraction: button compresses 96%, an outline of the product image scales from button to cart icon over 350ms (cubic-bezier(.2,.8,.2,1)), cart icon bounces, toast confirms "Added to basket".
- Image zoom on hover with `transform: scale(1.04)` over 250ms.

Primary CTA: **Add to basket** (or **Reserve** if reservable-only).
Secondary: Reserve, Buy now, Add to wishlist, Share.

## 7.5 Search `/search`

- Mirrors `/shop` but with a top headline `Results for "term"` and quick suggestions like "Did you mean…".
- If 0 results: show empty state plus 8 best sellers and 6 popular searches as chips.

## 7.6 Cart `/cart`

- **Goal:** confirm items and totals, then proceed to checkout, or reserve.
- **User intent:** review what they’ll pay, edit quantities, apply discount.

Layout:

- **Left (66%):** list of CartLineItem cards (image, title, brand, variant, QuantityStepper, line price, remove).
- **Right (34%, sticky):** Order summary card — subtotal, est. shipping, est. tax, discount field, total. Below: primary `Proceed to checkout`, secondary `Reserve selected items`, link `Continue shopping`. Plus a trust strip: Secure payment · Free returns within 30 days.

Behaviors:

- Quantity change triggers a 600ms inline updating state on the line and totals (skeleton text, not full reload).
- Remove triggers an inline `Removed — Undo` ghost row that auto-collapses after 6s.
- Stock revalidation runs on page load; if any item is out of stock, that line shows a red border and a `Replace or remove` chip; checkout button is disabled until resolved.

Empty state:

- Title `Your basket is empty`, body `Browse our tools to get started.`, primary `Shop tools`, secondary `Browse categories`. Below: "Recently viewed" rail if any.

Mobile:

- Summary collapses to a sticky bottom sheet: subtotal + `Checkout` primary; tap chevron to expand.

Animation ideas:

- Line item removal: collapse height + opacity 200ms.
- Coupon apply: success chip slides in below field with 200ms.

Primary CTA: **Proceed to checkout**.
Secondary: Reserve selected items, Apply discount, Continue shopping.

## 7.7 Checkout `/checkout`

Treated in depth in Section 8.

## 7.8 Checkout success `/checkout/success`

- **Goal:** confirm payment was received and explain what happens next.
- **Layout:** large success icon, headline `Order confirmed`, mono order number, summary card (items, totals), shipping ETA, link to track, primary `View order`, secondary `Continue shopping`.
- **Important rule:** the page **calls the API to confirm payment** before showing success; if the webhook hasn’t arrived yet, show a polite pending state — "We’re confirming your payment. This usually takes a few seconds." with a refresh.
- **Animation:** check icon draws in over 400ms; card fades up.

## 7.9 Checkout failure `/checkout/failure`

- **Goal:** recover the customer.
- **Layout:** warning icon (not red unless fraud/declined), headline `We couldn’t complete your payment`, body explains common reasons, primary `Try again`, secondary `Use a different method`, tertiary `Contact support`. Order is preserved as `PENDING_PAYMENT` and can be retried from `/account/orders`.

## 7.10 Auth pages (`/login`, `/register`, `/forgot-password`, `/reset-password`)

- **Layout:** split-pane on desktop — left brand/illustration with one trust line, right form. Mobile: form-only with brand mark above.
- **Login:** email, password, "remember me", primary `Sign in`, secondary `Continue as guest` if guest checkout is enabled later, link `Forgot password`.
- **Register:** name, email, password (with strength meter), phone (optional), checkbox `Marketing opt-in (optional)`, terms, primary `Create account`.
- **Forgot password:** email + primary `Send reset link`; success state explains email may take a minute.
- **Reset password:** new password + confirm, primary `Update password`.
- **Errors:** never reveal which field is wrong on login. Use a single banner: `Email or password is incorrect.`
- **Animation:** form slides up 12px, fades in 180ms.


---

# 8. Basket, Reservation, and Checkout UX

This section is the core conversion surface. It is specified as flows plus per-screen detail.

## 8.1 The three commerce paths

```text
Path A: Buy now            Cart  -> Checkout -> Payment -> Order
Path B: Reserve then pay   Cart  -> Reserve  -> ReservationDetail -> Payment -> Order
Path C: Express buy now    ProductDetail -> Checkout (skips cart) -> Payment -> Order
```

Path B is the differentiator. The UI must make Path A and Path B feel equally legitimate.

## 8.2 Add to basket microflow

1. User clicks `Add to basket` on ProductCard or ProductDetail.
2. Button enters loading state (200ms minimum to avoid flicker).
3. On success: cart icon scale-bounces; toast `Added to basket — View basket` with action button.
4. The CartDrawer can be opened by the toast action or the cart icon; it is **not** auto-opened (auto-open is intrusive and hurts mobile).
5. On failure (out of stock, network): inline error replaces the toast tone with `warning` and message `Only 2 left — quantity adjusted` or `Couldn’t add this item. Try again`.

## 8.3 Reserve microflow

1. User clicks `Reserve` on ProductCard or ProductDetail.
2. Confirmation dialog explains:
   - "We’ll hold these tools for you for 24 hours."
   - "Pay before the timer ends to keep the reservation."
   - Quantity selector and stock check.
3. On confirm: stock is locked server-side; UI redirects to `/account/reservations/[id]` with timer running.
4. ReservationTimer is prominent at the top.
5. Two persistent actions: `Pay now` primary, `Cancel reservation` secondary.

## 8.4 Reservation states UX

- **PENDING (just submitted)** — spinner card "Locking stock for you…"; shouldn’t last more than ~2s; on timeout, fail closed and tell the user.
- **ACTIVE** — green dot + `Reserved`. Timer counts down. CTA `Pay now`.
- **EXPIRING_SOON (≤ 5 min)** — amber pulse on timer (1 cycle / 2s, reduced motion: static amber). Banner appears: "Less than 5 minutes left." CTA prominent.
- **EXPIRED** — red dot, timer 00:00, banner "Reservation expired. This item is now available to others." CTA `Reserve again` if stock available, else `Browse alternatives`.
- **CANCELLED** — neutral state, no timer, copy "Reservation cancelled. Reserved stock returned."
- **CONVERTED_TO_ORDER** — green check, copy "Reservation paid — order #ATX-23981 created", CTA `View order`.

## 8.5 Checkout flow

CheckoutStepper steps:

1. **Address** — shipping & billing.
2. **Delivery** — shipping method (Standard, Express, Pickup).
3. **Payment** — Stripe-hosted or Stripe Elements form.
4. **Review** — final confirmation; submit triggers Stripe.

Layout:

- **Two columns desktop:** left form, right sticky `OrderSummary` (items collapsed by default with image stack + count, expand to see full list, totals always visible).
- **One column mobile:** stepper at top sticky, form, summary collapses to bottom sticky bar.

Address step:

- Saved addresses chips for logged-in users.
- New address form: name, country (select), address line 1, line 2, city, region, postal code, phone. Live validation by country; postal code mask when known.
- "Use the same for billing" toggle on by default.

Delivery step:

- Radio cards per method: title, ETA, price, fine print (e.g., "Pickup at our warehouse. Hours 8–17."). Show price changes in the order summary instantly.

Payment step:

- Card (Stripe Elements), Apple Pay, Google Pay where applicable, Klarna optional later. Each option has a logo + label. Selected option expands to show its form.
- Trust line under the form: "Payments are processed by Stripe. We never see your card."

Review step:

- Address, delivery, items, totals.
- Edit links per section open the relevant step.
- Submit `Pay $123.45` (label always shows the amount). Disabled until terms checkbox is ticked if required.

Inline errors:

- Field-level only. Step-level only when a server check fails (e.g., stock revalidation says one item is now unavailable; the page sends the user back to cart with the offending line marked).

Submission states:

- Submitting: button is `aria-busy`, disabled, label `Processing…` with spinner.
- Stripe redirect (if hosted): full-screen overlay with brand mark and `Redirecting to secure payment…`.
- After return: see `/checkout/success` or `/checkout/failure` rules.

Animation ideas:

- Step transitions: 240ms x-slide of the form column, summary unchanged.
- Summary update: numerical roll on totals (200ms), respects reduced-motion (instant change).

## 8.6 Critical UX rules for payment

- Frontend never declares success on its own; `/checkout/success` re-checks server status.
- All sensitive values (PAN, CVC) live inside Stripe Elements iframes; we never collect them.
- Webhook lag handling: pending state is a normal, expected state, not an error.
- Failure copy never blames the customer; never says "Card declined" without offering a retry path.

## 8.7 Express buy-now from PDP

If enabled later:

- "Buy now" opens a slim, single-page checkout modal preloaded with default address and last-used payment method.
- Same review and submit semantics as the full checkout.
- This is **out of MVP** but the design accommodates it.

---

# 9. User Panel Specification

## 9.1 Account layout

Routes:

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

Layout:

- **Desktop:** left rail `AccountSidebar` (240 wide) with avatar, name, email, nav (Overview, Orders, Reservations, Wishlist, Addresses, Profile, Security, Sign out). Right: content area in `container.content`.
- **Mobile:** sidebar collapses into a horizontal segmented control across the top of the page; sign out is at the bottom of each page.

## 9.2 `/account` Overview

- **Goal:** answer "what should I do next" in 5 seconds.
- **Sections:**
  1. Welcome row: "Welcome back, Ali" + last login meta.
  2. Active reservations card: count + soonest expiry + CTA `View reservations`. If any are expiring in <30 min, the card shows amber.
  3. Active orders card: count + nearest delivery + CTA `Track orders`.
  4. Recent activity timeline (compact): last 5 events.
  5. Wishlist preview: 4 items + `View all`.
  6. Quick actions: Reorder last items, Update default address, Add payment method (linked to security).
- **Empty state for new users:** illustration + "Looks empty in here. Browse our tools to get started." primary CTA `Shop tools`.

## 9.3 `/account/orders`

- **Goal:** find and inspect an order.
- **Layout:** filter row (status, date range, search by order number). Table (desktop) or stacked cards (mobile).
- **Columns:** Order # (mono), Date, Items (image stack), Total, Status (OrderStatusBadge), Payment (PaymentStatusBadge), Action (`View`).
- **Empty state:** "No orders yet."
- **Performance:** virtualized list if > 50 rows.

## 9.4 `/account/orders/[id]` Order detail

- **Goal:** confirm what was bought, where it’s going, and how to act if needed.
- **Sections:**
  1. Header: order number, placed date, OrderStatusBadge, PaymentStatusBadge.
  2. Status timeline: Pending → Paid → Processing → Shipped → Delivered. Current step is highlighted; each step has timestamp.
  3. Items list: image, title, brand, qty, line price.
  4. Shipping & billing addresses, delivery method, tracking link.
  5. Totals (subtotal, discount, shipping, tax, total).
  6. Actions: `Download invoice`, `Reorder`, `Request return` (if eligible), `Contact support`.
- **States:**
  - PENDING_PAYMENT: shows `Pay now` if user abandoned checkout.
  - CANCELLED: muted style, reason note.
  - REFUNDED: amount, date, method, reference.

## 9.5 `/account/reservations`

- **Goal:** show urgency at a glance and act fast.
- **Layout:** segmented control (Active, Expired, Cancelled, Converted). Active uses card grid sorted by soonest expiry.
- **Reservation card:** product image, title, qty, ReservationTimer (mini), CTA `Pay now` primary, `Cancel` ghost.
- **Empty state:** "No active reservations." with link `How reservation works`.

## 9.6 `/account/reservations/[id]` Reservation detail

- **Goal:** make payment effortless before the timer ends.
- **Hero block:** ReservationTimer (prominent), state badge, `Pay now` primary, `Cancel reservation` ghost.
- **Items list** identical structure to order items.
- **Totals.**
- **What is a reservation?** collapsible help block.
- **Important rule:** if state is EXPIRED, primary CTA changes to `Reserve again` (if stock available) or `Browse alternatives`; payment is disabled.

## 9.7 `/account/wishlist`

- Grid of ProductCard with `Add to basket` and `Reserve` actions.
- Bulk actions: Move all to basket; Remove selected.
- Empty state: "No saved tools yet."

## 9.8 `/account/addresses`

- List of address cards, each with `Default` badge, `Edit`, `Delete`.
- Add new address opens a Dialog with the same form used in checkout.
- One default address required if any exist.

## 9.9 `/account/profile`

- Form: name, email (with "verified" check or `Verify` action), phone, locale, marketing opt-in switch.
- Save uses optimistic UI with toast confirmation; revert on error.

## 9.10 `/account/security`

- Change password form (current password required).
- Sessions: list of active sessions with device, location, last seen, `Sign out` per row.
- 2FA placeholder section ("Coming soon") to keep layout final.
- Saved payment methods (Stripe customer portal link).

## 9.11 Cross-cutting account rules

- All forms autosave drafts to localStorage and offer to restore on return.
- Every change confirms with a toast.
- No destructive action proceeds without an explicit confirm dialog.


---

# 10. Admin Panel Specification

## 10.1 Admin shell

- **Sidebar** (AdminSidebar): primary nav — Dashboard, Catalog (Products, Categories, Brands), Inventory, Orders, Reservations, Customers, Payments, Settings. Secondary — Audit Logs, Help.
- **Topbar** (56 high): breadcrumbs, global SearchBar (command-palette `⌘K`), environment chip (e.g., `Staging`), notifications bell, user menu.
- **Content area**: `container.app` width with section padding `space.10` desktop.

Behaviors:

- Sidebar collapses to icons-only at < lg or via a toggle.
- Command palette supports actions: "Add product", "Find order #…", "Find customer", "Adjust stock for SKU…".
- Breadcrumbs reflect deep navigation; last item is unlinked.

## 10.2 `/admin` Dashboard

- **Goal:** answer "how is the business doing today?" in 5 seconds.
- **Top metrics row (4 cards):**
  - Revenue (today, vs yesterday delta)
  - Orders (today, by status mini-bar)
  - Active reservations (count + soonest expiry)
  - Low stock (count + click to filter)
- **Charts row:**
  - Revenue trend (14 days, line chart)
  - Reservation funnel (Reserved → Paid → Expired) for last 14 days
- **Tables row:**
  - Recent orders (last 10)
  - Recent payments (last 10)
- **Alerts panel:** low-stock alerts, payment failures last 24h, webhook anomalies.

Important rules:

- Time zone is shown in the header. All timestamps use it consistently.
- Currency is shown explicitly on every money value.
- Skeletons load metrics first (≤ 200ms), charts second.

## 10.3 `/admin/products` Product list

- **Toolbar:** search by name/SKU, filters (status, category, brand, stock state, has-images), bulk actions (activate, deactivate, export), primary `Add product`.
- **Columns:**
  - Image (40 thumbnail)
  - Name + SKU (mono, secondary line)
  - Category
  - Brand
  - Price (tabular-nums)
  - Stock (with InventoryStatusBadge)
  - Status (Active, Draft, Archived)
  - Updated
  - Actions (kebab: Edit, Duplicate, Archive, View on storefront)
- **Row click** opens product detail edit.
- **Bulk** action confirms when affecting > 20 rows.

## 10.4 `/admin/products/new` and `/admin/products/[id]/edit` Product form

- **Layout:** two columns desktop. Left main form, right sticky `PublishCard`.
- **PublishCard:** status select (Draft, Active, Archived), visibility (Public, Hidden), publish date, primary `Save` (label is `Save changes` or `Publish`), secondary `Save as draft`, link `Discard`.
- **Form sections (collapsible):**
  1. **Basics** — Name, slug (auto-generated, editable), short description, long description (rich text).
  2. **Pricing** — price, compare-at price, currency, tax class.
  3. **Inventory** — SKU, barcode, total stock, low-stock threshold. Live computed display: reserved + sold + available.
  4. **Categorization** — category (single), brand (single), tags (multi).
  5. **Media** — image dropzone, drag-to-reorder, alt text per image. First image is the primary.
  6. **Specifications** — key/value table; add row, drag to reorder.
  7. **Vehicle compatibility** (placeholder UI ready for Phase 8) — make/model/year matrix.
  8. **SEO** — meta title (preview), meta description (preview), canonical URL, OG image.
- **Validation:** inline per field; submit gathers errors into a top banner with anchor links.
- **Unsaved changes guard:** dialog when navigating away.

## 10.5 `/admin/categories` and `/admin/brands`

- Simple tables with Add/Edit/Archive.
- Categories support parent/child via tree view (nested table).
- Editing opens a Dialog (no separate page) since fields are few.

## 10.6 `/admin/inventory`

- **Goal:** see stock health and adjust quickly.
- **Toolbar:** search, filters (low stock, out of stock, has reservations), primary `Adjust stock`.
- **Columns:** Image, Name + SKU, Total, Reserved, Sold, Available (with InventoryStatusBadge), Last movement, Actions.
- **Adjust stock dialog:** product readonly, change type (Increase, Decrease, Set), quantity, reason (select: Restock, Damage, Correction, Theft, Other), note. Audit log captures actor + reason.
- **Stock movement detail:** drawer per row showing chronological movements.

## 10.7 `/admin/orders` Order list

- **Toolbar:** search (order #, customer email), filters (order status, payment status, date range, channel), bulk actions (export, mark as shipped where allowed), saved views.
- **Columns:** Order #, Date, Customer (name + email), Items (image stack + count), Total, Order status, Payment status, Action.
- **Saved views:** "Pending payment", "Paid awaiting fulfillment", "Shipped this week", "Refund queue".

## 10.8 `/admin/orders/[id]` Order detail

- **Header:** order #, date, OrderStatusBadge, PaymentStatusBadge, customer link, actions (Refund, Cancel, Resend confirmation).
- **Layout:**
  - Left: items, shipping & billing, fulfillment timeline (events with actor + timestamp).
  - Right: customer summary, payment summary (Stripe charge ID, method, last4), totals, internal notes (CRM-linked).
- **Action: Update status** — modal walks through allowed transitions only (state machine enforced server-side; UI mirrors).
- **Action: Refund** — modal: amount (full/partial), reason, restock toggle, confirm. After success, Refund row added to payment summary.
- **Audit log preview** at bottom.

## 10.9 `/admin/reservations` Reservation list

- **Toolbar:** segmented (Active, Expiring, Expired, Cancelled, Converted), search, filters (customer, product, date), bulk cancel (active only).
- **Columns:** Reservation #, Customer, Product (image + title + qty), Reserved at, Expires at (relative + absolute), Status badge, Action.
- **Sort default:** soonest expiry first.
- **Row hover** shows mini timer.

## 10.10 `/admin/reservations/[id]` Reservation detail

- Header: reservation #, status badge, ReservationTimer (prominent), customer link.
- Sections:
  1. Items reserved (image, qty, price snapshot at reservation time).
  2. Stock impact (shows reserved-stock effect).
  3. Lifecycle timeline (Created → Active → ... ).
  4. Linked order (if converted).
  5. Internal notes.
- **Action: Cancel reservation** with reason; confirms before releasing stock.

## 10.11 `/admin/customers` Customer list

- **Toolbar:** search, filters (segment, lifetime spend bucket, last order, has open reservations).
- **Columns:** Avatar + name, Email, Phone, Orders count, Lifetime spend, Last activity, Tags, Action.
- **Saved views:** "VIP", "At-risk (no order in 90 days)", "Reservation abandoners".

## 10.12 `/admin/customers/[id]` CRM Customer profile

See full spec in Section 11.

## 10.13 `/admin/payments`

- **Toolbar:** filters (status, method, gateway event types), search by charge or order.
- **Columns:** Charge ID (mono), Date, Customer, Amount, Method (Card 4242), Status, Order, Action.
- **Detail drawer** per row: gateway event payload (collapsed JSON), refund/void actions where available, audit links.

## 10.14 `/admin/audit-logs`

- **Filter:** actor, action, entity type, date range, IP.
- **Table:** Time, Actor, Action (e.g., `product.update`), Entity (link), IP, Diff (drawer with JSON before/after).
- Read-only, never deletable in UI.

## 10.15 `/admin/settings`

Tabs:

1. **General** — store name, currency, timezone, locale, contact email.
2. **Shipping** — methods, zones, rates.
3. **Tax** — class, rates per region.
4. **Payments** — Stripe keys (masked), webhook URL, supported methods.
5. **Email** — provider keys, transactional templates with previews.
6. **Inventory** — low-stock threshold default, reservation duration default, auto-cancel rules.
7. **Roles & permissions** — manage roles and per-permission toggles.
8. **Integrations** — analytics, search, error tracking.

Rules:

- Sensitive keys are write-only; UI shows last 4 characters.
- All saves require admin re-auth if sensitive.

## 10.16 Admin form rules (cross-cutting)

- Inline validation; full-form review banner on submit if multiple errors.
- "Save changes" button is disabled until the form is dirty; reverts to disabled after save.
- Destructive actions: confirm dialog with typed confirmation phrase for high-impact actions ("Type ARCHIVE to confirm").
- Date pickers respect timezone selected in `Settings → General`.

## 10.17 Admin tables — universal rules

- Sortable columns: visual chevron indicator + aria-sort.
- Resizable columns (admin only) with min/max widths.
- Sticky header within scroll container.
- Bulk select with sticky bulk-action bar.
- Row keyboard navigation: arrow keys move focus, Enter opens detail.
- Mobile: tables collapse into stacked cards keyed by the most informative columns.


---

# 11. CRM UX Specification

The CRM views live inside the admin panel under `/admin/customers/[id]`. They are the single most important screen for the support and operations team.

## 11.1 Goals

- Show **who** the customer is.
- Show **what** they did and when.
- Allow the team to **act** without leaving the page.
- Respect privacy and permission boundaries.

## 11.2 Layout

- **Header bar:** avatar + name + email + phone + tags chips + status indicator (Active, Blocked, Marketing-opt-out). Right-aligned actions: `Email`, `Add note`, `Add tag`, `Block / Unblock` (gated by role).
- **Top metrics row (4 cards):**
  - Total spend (lifetime)
  - Orders count
  - Active reservations
  - Last activity (relative + absolute)
- **Main grid (desktop two columns):**
  - **Left (66%):** CustomerTimeline (scrollable, infinite).
  - **Right (34%):** Side panels — Profile summary, Addresses, Payment methods (read-only Stripe portal preview), Internal notes, Support tickets, Tags & segments, Marketing preferences.
- **Mobile:** vertical stack — header, metrics, tabs (Timeline, Profile, Notes, Tickets).

## 11.3 CustomerTimeline

- **Event types:** Order, Reservation (state changes), Payment (success, failure, refund), Support ticket, Note added, Login, Address change, Marketing event.
- **Each event:** icon, title, body (one line), meta (when, by whom), optional payload (e.g., link to order, refund amount).
- **Filters** (segmented control above): All, Orders, Reservations, Payments, Support, Notes, Logins.
- **Grouping:** day separators with absolute date.
- **Empty state:** "No activity yet."
- **Permissions:** logins are visible only to roles with `crm.view-sensitive`.

## 11.4 Internal notes

- **Card with composer at top.** Markdown allowed.
- **Each note:** author avatar + name, timestamp, body, edit (within 5 min), delete (admin only). Notes are **never** visible to the customer.
- **@mentions** of staff create a notification for them.

## 11.5 Support tickets

- **Mini list inside the customer profile.** Each row: subject, status, last update, assignee.
- **Open ticket** opens a drawer with thread view (customer messages + staff replies) and a reply composer with internal/public toggle.
- For MVP this is layout-ready; backend integration may be Phase 8.

## 11.6 Tags and segments

- **Tag chips** with color and remove. New tag dialog allows description and color choice.
- **Segments** are saved filters at `/admin/customers`; the profile shows which segments include this customer.

## 11.7 Marketing preferences

- Channels: Email, SMS, WhatsApp.
- Each channel toggles with last consent timestamp and source (signup, manual).
- Editing requires confirmation and creates an audit entry.

## 11.8 Data privacy controls

- **Export data** (admin-only): generates a JSON of customer data per regional rules.
- **Delete account** (super-admin-only): two-step confirmation; removes PII and anonymizes orders.
- All actions are audit logged.

## 11.9 Permissions matrix (UI affordances)

```text
View profile basics     STAFF, MANAGER, ADMIN, SUPER_ADMIN
View payment last4      MANAGER, ADMIN, SUPER_ADMIN
View login activity     ADMIN, SUPER_ADMIN
Edit notes              STAFF (own), MANAGER, ADMIN
Edit tags               MANAGER, ADMIN
Block / Unblock         ADMIN, SUPER_ADMIN
Refund (deep link)      MANAGER, ADMIN
Export / Delete data    SUPER_ADMIN
```

UI hides actions the role cannot perform; never shows disabled placeholders that reveal capability.

---

# 12. Status Badge System

A single source of truth for every status visible across the app. Each badge has color, icon, label, tooltip, and use rule.

## 12.1 InventoryStatusBadge

```text
In stock         tone: success   icon: check-circle    label: "In stock"
Low stock        tone: warning   icon: alert-triangle  label: "Low stock"   tooltip: "Fewer than {threshold} left"
Out of stock     tone: danger    icon: x-octagon       label: "Out of stock"
Reservable       tone: info      icon: clock           label: "Reservable"  tooltip: "Reserve to hold this for {hours}h"
Reserved (yours) tone: brand     icon: bookmark        label: "Reserved for you"
```

Rules:

- "Reserved (yours)" appears only on user-facing pages where the user has a reservation.
- "Reservable" can co-exist with "Low stock"; in that case, render two badges with a 4px gap.

## 12.2 ReservationStatusBadge

```text
Pending             tone: neutral   icon: loader            label: "Locking stock"
Active              tone: success   icon: bookmark-check    label: "Reserved"
Expiring soon       tone: warning   icon: alarm-clock       label: "Expiring soon"
Expired             tone: danger    icon: clock-fading      label: "Expired"
Cancelled           tone: neutral   icon: x-circle          label: "Cancelled"
Converted to order  tone: success   icon: badge-check       label: "Paid — order created"
```

Rules:

- "Expiring soon" replaces "Active" automatically at ≤ 5 minutes.
- "Pending" should be visible for ≤ ~2 seconds; if longer, switch to a recovery state ("Still locking stock — try again").

## 12.3 OrderStatusBadge

```text
Pending payment   tone: warning   icon: hourglass        label: "Pending payment"
Paid              tone: success   icon: credit-card      label: "Paid"
Processing        tone: info      icon: package          label: "Processing"
Shipped           tone: info      icon: truck            label: "Shipped"
Delivered         tone: success   icon: package-check    label: "Delivered"
Cancelled         tone: neutral   icon: ban              label: "Cancelled"
Refunded          tone: neutral   icon: undo-2           label: "Refunded"
```

## 12.4 PaymentStatusBadge

```text
Pending      tone: warning   icon: hourglass     label: "Pending"
Paid         tone: success   icon: check-circle  label: "Paid"
Failed       tone: danger    icon: alert-circle  label: "Failed"
Refunded     tone: neutral   icon: undo-2        label: "Refunded"
Cancelled    tone: neutral   icon: ban           label: "Cancelled"
```

## 12.5 Cross-rules

- **One source.** All status badges import from the same enum. Designers and engineers never invent ad hoc statuses.
- **Pair color with icon and label.** Color alone is never the only signal (accessibility).
- **No emoji.** Brand is industrial; emoji harms tone and is unreliable across platforms.
- **Tooltips are short.** Less than 80 characters.
- **Localizable.** Each label is a translation key, not a hardcoded string.

## 12.6 Badge sizing

- **Default `md` (24 high)** for headers and detail pages.
- **`sm` (20 high)** for tables and dense lists.
- Use `solid` only when the badge is the single most important element on the row (e.g., reservation timer header). Otherwise use `subtle`.


---

# 13. Animation and Microinteraction Guide

## 13.1 Principles

- **Function over flourish.** Animation explains state, never decorates idle screens.
- **Fast and short.** Most transitions 120–240ms; nothing UI-critical exceeds 400ms.
- **Curves over springs for UI.** Springs only on physical-feeling drag (swipe-to-dismiss).
- **Reduced motion respected.** When `prefers-reduced-motion: reduce`, animations either snap or use opacity-only fades; never block content.
- **No animation on critical content.** Loading skeletons and toasts must not animate text.

## 13.2 Easing tokens

```text
ease.standard   cubic-bezier(0.2, 0.8, 0.2, 1)   <- default
ease.enter      cubic-bezier(0.16, 1, 0.3, 1)
ease.exit       cubic-bezier(0.4, 0, 1, 1)
ease.emphasis   cubic-bezier(0.2, 0, 0, 1)
spring.soft     stiffness 220, damping 26
spring.snappy   stiffness 320, damping 22
```

## 13.3 Duration tokens

```text
dur.instant   0
dur.xs        80
dur.sm        120
dur.md        180   <- default
dur.lg        240
dur.xl        320
dur.xxl       420   <- max for celebratory moments
```

## 13.4 Page and route transitions

- **Storefront route changes:** opacity 0→1 with 8px y rise on the main content; navbar and footer don’t move.
- **Admin route changes:** opacity-only crossfade. Layout stays put.
- Prefetch intent on hover for primary nav.

## 13.5 Microinteraction catalog

- **Button press:** scale 0.98 over `dur.xs`, return on release.
- **Button loading:** label fades to spinner over `dur.sm`; on success, brief 100ms green check before reverting (only on Save buttons in admin).
- **Add-to-basket:** label fades to a check icon, button background flashes to a slightly darker shade for 220ms, then a "ghost" of the product image scales from the button to the cart icon (320ms, `ease.emphasis`), cart icon scale 1.0→1.12→1.0 over 220ms, toast appears.
- **Remove from cart:** line item collapses height + opacity; "Removed — Undo" row appears; on Undo, line re-expands.
- **Cart drawer:** slide-in from right, 300ms `ease.enter`. Backdrop fades from 0 to 0.4.
- **Bottom sheets (mobile):** slide from bottom with `spring.soft`. Drag handle responds to touch.
- **Dialogs:** scale 0.98→1, opacity 0→1, `dur.sm`. Backdrop fade 0→0.5.
- **Toasts:** slide from edge, fade in, auto-dismiss with 1px progress bar that drains over the timeout.
- **Tooltip:** opacity 0→1, y -2→0, `dur.xs`.
- **Tabs:** underline slides between tabs over `dur.sm`.
- **Accordion:** height transition `dur.md`, content opacity slightly delayed for clarity.
- **Skeleton:** shimmer 1.4s loop, paused under reduced motion.
- **Quantity stepper:** number value cross-fades; never use a vertical roll on numbers in stock-sensitive contexts (it implies more inventory than there is).
- **Status change badge:** old badge fades out 120ms, new badge fades in 120ms; tones don't morph in-place.

## 13.6 Reservation timer animations

- **Active:** progress bar fills smoothly via CSS transitions on the value attribute every second.
- **Expiring soon (≤ 5 min):** subtle 1Hz pulse on the timer text and progress bar's leading edge. Reduced motion: static amber color, no pulse.
- **Last 60s:** color shifts to red over 600ms.
- **Expiry moment:** shake animation (3px horizontal, 200ms total). Reduced motion: skip shake; color change only.

## 13.7 Hero and homepage motion

- **Hero text:** lines fade-up 80ms apart, staggered, total ≤ 320ms.
- **Hero product image:** subtle parallax on scroll (8% movement), disabled at < md.
- **Section reveal on scroll:** opacity 0→1 with 8px y-rise; once-only per session per element.

## 13.8 Admin animations

- **Dashboard cards:** fade-up stagger 60ms apart on initial load.
- **Tables:** row hover `dur.xs` background change; sort arrow rotates 180°.
- **Toasts:** identical to storefront.

## 13.9 Performance budgets

- Animations must not exceed **16ms per frame** budget (60fps).
- Avoid `box-shadow` transitions on large surfaces; promote with `will-change: transform, opacity` only when needed and remove after.
- Never animate `width`/`height` on long lists; animate `transform: scaleY` or use FLIP techniques.

## 13.10 Reduced-motion playbook

- Replace large motion with crossfades.
- Disable parallax.
- Disable pulsing and shaking.
- Maintain transitions ≤ 80ms purely for user-feedback (e.g., focus rings).
- Never disable functional changes (e.g., a skeleton becomes a static gray box).

---

# 14. Responsive Design Rules

## 14.1 Breakpoint behavior summary

```text
xs  360   single column, sticky bottom action where applicable
sm  480   minor spacing increases
md  768   2-column grids appear, navbar consolidates
lg 1024   primary multi-column layouts
xl 1280   sidebar layouts (admin, account, shop sidebar)
2xl 1536  wider containers, denser admin tables
```

## 14.2 Mobile-first commitments

- The primary action is always reachable from a sticky bottom region on mobile.
- All interactive targets are ≥ 44×44 CSS pixels.
- Tap regions never overlap.
- Forms are single-column with one field per visual row.

## 14.3 Per-page responsive notes

- **Homepage:** hero stacks; image first. Category grid 2 cols (xs)/3 (sm)/6 (lg). Featured rail horizontal scroll on xs–md, grid on lg+.
- **Shop:** filters become bottom drawer on xs–md. Grid 1 col (xs)/2 (sm)/3 (md)/4 (lg+). Sort moves to icon button on xs.
- **Product detail:** image gallery full-width with dots on xs–md. Sticky bottom action bar on xs–md (Price, Add to basket, Reserve icon).
- **Cart:** order summary becomes sticky bottom sheet on xs–md.
- **Checkout:** stepper sticky-top on xs–md; summary collapsible.
- **Account:** sidebar collapses to top segmented control on xs–md.
- **Admin:** sidebar becomes drawer on xs–lg; topbar shrinks to 48 high; tables become stacked cards on xs–md with the most informative columns first.

## 14.4 Density rules

- **Storefront:** comfortable density (more white space) — buying decisions deserve breathing room.
- **Account:** default density.
- **Admin:** compact density on tables and lists; comfortable density on detail pages.

## 14.5 Touch versus pointer

- Hover-only affordances always have a touch-equivalent (e.g., long-press menus or visible kebab menus on touch).
- Drag interactions on touch are limited to bottom sheets and image galleries; admin drag-to-reorder in product images supports both touch and pointer.

## 14.6 Scroll and sticky rules

- One sticky region per viewport edge maximum (e.g., bottom action bar OR mobile cart sheet, not both at once).
- Sticky elements never cover focused fields; on focus, scroll the field into view above sticky regions.

## 14.7 Image and media responsive rules

- Always serve `srcset` with `sizes` matching the breakpoints.
- Prefer AVIF/WebP with JPEG fallback.
- Hero images use `priority` loading; other media use lazy load and `aspect-ratio` to prevent layout shift.


---

# 15. Accessibility Rules

## 15.1 Conformance target

- **WCAG 2.1 AA** as the floor across customer and admin surfaces.
- Strive for AAA on body text contrast where it does not harm aesthetics.

## 15.2 Color and contrast

- See Section 3.6.
- Status is never communicated by color alone (always paired with icon + label).
- Focus states are visible on every interactive element with a 3px ring (`elev.focus`) and 2px offset on dark surfaces.

## 15.3 Keyboard

- All interactive elements reachable via Tab in DOM order.
- Tab order matches visual order; never use positive `tabindex` values.
- ESC closes dialogs, drawers, popovers.
- Enter and Space activate buttons; Arrow keys navigate menus, tabs, sliders, and image galleries.
- Skip link "Skip to main content" appears on Tab from the document start.
- Command palette `⌘K`/`Ctrl+K` works only in admin and is announced.

## 15.4 Focus management

- Dialogs and drawers trap focus and restore it to the trigger on close.
- Pages set focus to the H1 or main heading on route change.
- Toasts announce via `role="status"` (info/success) or `role="alert"` (warning/danger), not focus stealing.

## 15.5 ARIA and semantics

- Use semantic HTML first; ARIA second.
- `nav`, `main`, `aside`, `header`, `footer` landmarks present on every page.
- Custom controls expose proper roles, states, and properties:
  - Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.
  - Combobox: `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`.
  - Tables: `<table>`, `<thead>`, `<tbody>`, `scope` attributes; sortable headers expose `aria-sort`.
  - Disclosure: `aria-expanded` on the trigger, region with `id` referenced by `aria-controls`.

## 15.6 Forms

- Every input has a programmatic `<label for>`; placeholder is never a label.
- Error messages are linked to the input via `aria-describedby`; invalid inputs have `aria-invalid="true"`.
- Required fields are marked both visually (`*`) and via `aria-required`.
- Inline validation announces changes to assistive tech via `aria-live="polite"`.
- Group related fields with `<fieldset>` and `<legend>`.

## 15.7 Images and media

- Every meaningful image has descriptive alt text; decorative images use empty `alt=""`.
- Product gallery announces "Image n of m of {product name}".
- Videos have captions and transcripts. Auto-play is disabled by default.

## 15.8 Motion and time

- Respect `prefers-reduced-motion` everywhere (Section 13.10).
- Anything that auto-updates faster than once every 5 seconds (e.g., live timers) is `aria-live="polite"` and pause-able where relevant.
- Reservation timer announces minute changes politely; second-by-second updates are not announced.

## 15.9 Touch and input

- Touch targets ≥ 44×44 CSS px.
- Drag interactions provide a non-drag alternative (e.g., reorder via menu).
- Hover-only affordances always have a click/touch alternative.

## 15.10 Internationalization and localization

- All strings are translation keys.
- Layouts handle 30% length expansion for translated copy.
- RTL support: layouts mirror; icons that imply direction (arrows) flip; numerals stay LTR.
- Currency formatting uses locale-aware intl APIs.

## 15.11 Privacy and consent

- Cookie banner is keyboard accessible and dismissible; no dark patterns.
- Marketing toggles default off; consent timestamps are recorded.
- Account deletion paths are clearly labeled and reachable from `/account/security`.

---

# 16. Empty / Loading / Error States

A complete catalog. Every state has title, message, icon, primary action, optional secondary action.

## 16.1 Storefront empty states

- **No products found**
  - Title: "No tools match those filters."
  - Message: "Try removing a filter or starting fresh."
  - Icon: `search-x`
  - Primary: `Clear filters`
  - Secondary: `View all tools`
- **Empty basket**
  - Title: "Your basket is empty."
  - Message: "Browse our tools to get started."
  - Icon: `shopping-cart`
  - Primary: `Shop tools`
  - Secondary: `Browse categories`
- **Empty wishlist**
  - Title: "No saved tools yet."
  - Message: "Tap the heart on any tool to save it for later."
  - Icon: `heart`
  - Primary: `Browse tools`
- **Empty orders**
  - Title: "No orders yet."
  - Message: "When you buy, your orders will live here."
  - Icon: `package`
  - Primary: `Shop tools`
- **Empty active reservations**
  - Title: "No active reservations."
  - Message: "Reserve a tool to hold it for up to 24 hours."
  - Icon: `bookmark`
  - Primary: `Shop tools`
  - Secondary: `How reservation works`
- **Empty search**
  - Title: 'We couldn’t find anything for "[term]".'
  - Message: "Try a different brand, category, or check spelling."
  - Icon: `search-x`
  - Primary: `Browse categories`
  - Secondary: chip suggestions of popular searches
- **Empty CRM activity**
  - Title: "No activity yet."
  - Message: "When this customer engages with the store, you’ll see it here."
  - Icon: `activity`

## 16.2 Storefront error states

- **Product out of stock at add time**
  - Inline: "This tool just went out of stock. We removed it from your basket."
  - Action: `Browse alternatives`
- **Quantity exceeds stock**
  - Inline: "Only {n} in stock — we adjusted your quantity."
- **Reservation expired**
  - Banner: "Reservation expired. This item is now available to others."
  - Primary: `Reserve again` (if stock available)
  - Secondary: `Browse alternatives`
- **Payment failed**
  - Page: "We couldn’t complete your payment."
  - Body: "Your card may have been declined or the connection failed. Your basket is saved."
  - Primary: `Try again`
  - Secondary: `Use a different method`
  - Tertiary: `Contact support`
- **Network error**
  - Inline banner: "We’re having trouble loading this. Please try again."
  - Primary: `Retry`
- **Server error (500)**
  - Page: "Something broke on our side."
  - Body: "We’ve been notified and are looking into it."
  - Primary: `Try again`
  - Secondary: `Go home`
- **Not found (404)**
  - Page: "We couldn’t find that page."
  - Body: "The link may be broken or the tool may have been moved."
  - Primary: `Go to homepage`
  - Secondary: `Browse tools`
- **Auth required**
  - Inline modal: "Sign in to continue."
  - Primary: `Sign in`
  - Secondary: `Create account`
- **Permission denied**
  - Page: "You don’t have access to this page."
  - Primary: `Back to dashboard`
- **Forced logout (token expired)**
  - Toast: "You’ve been signed out for security."
  - Action: `Sign in again`

## 16.3 Loading states

- **Homepage:** hero text skeleton 200ms-deferred; category and product grids show skeletons matching the final layout.
- **Shop grid:** 8 ProductCard skeletons; filter sidebar shows 6 group skeletons.
- **Product detail:** gallery skeleton, title skeleton, price skeleton, button group disabled.
- **Cart:** line item skeletons in order, summary skeletons.
- **Checkout step transition:** mini progress bar at top, current section dimmed for 150ms maximum to avoid flicker.
- **Account dashboard:** metric cards skeleton; activity timeline 5 row skeleton.
- **Admin dashboard:** metric cards skeleton (≤ 200ms target), then charts skeleton, then tables skeleton.
- **Admin tables:** 10 skeleton rows; pagination disabled; filters allowed.
- **Form submission:** button busy state; rest of the form remains interactive only if cancellation is allowed; otherwise disabled.

## 16.4 Skeleton rules

- Skeletons mirror final layout dimensions to prevent CLS.
- Shimmer is subtle (8% to 14% gray sweep), 1.4s loop.
- Reduced motion: solid gray, no shimmer.

## 16.5 Toast taxonomy

- **Success:** completed action confirmation (added to basket, saved profile).
- **Info:** non-critical info (your session will expire soon).
- **Warning:** action allowed but with caveat (item now low stock).
- **Danger:** action failed (couldn’t process payment); never auto-dismiss.

## 16.6 Validation rules

- Inline validation runs on blur, not on every keystroke.
- Submit-time validation collects all errors and scrolls to the first.
- Error tone is corrective, not punitive: "Enter your postal code." not "Postal code is required."


---

# 17. UX Copywriting Suggestions

A short, opinionated copy library. Use exact strings unless the engineer needs to localize.

## 17.1 Voice rules

- Second person, active voice.
- One idea per sentence. Avoid stacking clauses.
- Numbers and units are always concrete ("ships in 1–2 days", not "ships soon").
- No exclamation marks in product, checkout, account, or admin surfaces.
- Avoid jargon ("call center", "ticket", "SKU") on customer-facing pages; reserve those for admin.

## 17.2 Hero and homepage

- Headline: `Tools built for the work, priced for the shop.`
- Subhead: `Diagnostic, hand, power, and garage equipment from brands mechanics already trust.`
- Primary CTA: `Shop tools`
- Secondary CTA: `How reservation works`
- Trust strip: `Genuine stock · Secure payment · Real warranty`
- Why-choose tiles:
  - `Genuine stock` — `Sourced from manufacturers and authorized distributors.`
  - `Secure payment` — `Card, Apple Pay, and Google Pay through Stripe.`
  - `Reservation available` — `Hold a tool for up to 24 hours while you decide.`
  - `Real warranty` — `Warranty honored by us, not redirected to third parties.`

## 17.3 Product detail

- In-stock line: `In stock — ships in 1–2 days.`
- Low-stock chip: `Only {n} left.`
- Reservable line: `Reserve to hold this for {hours} hours.`
- Out of stock: `Currently out of stock.` Action: `Notify me when back.`

## 17.4 Add to basket and reservation

- Add success toast: `Added to basket.` Action: `View basket`.
- Reserve confirm dialog title: `Reserve this tool?`
- Reserve confirm body: `We’ll hold {qty} × {product name} for you for {hours} hours. Pay before the timer ends to keep it.`
- Reserve confirm primary: `Reserve now`
- Reserve confirm secondary: `Cancel`
- Reservation success: `Reserved. Pay before {time} to keep it.`
- Reservation expiring banner: `Less than {n} minutes left. Pay now to keep this reservation.`
- Reservation expired banner: `Reservation expired. This item is now available to others.`
- Reservation converted: `Paid — order #{number} created.`

## 17.5 Cart

- Empty: `Your basket is empty. Browse our tools to get started.`
- Out-of-stock line: `This tool just went out of stock.` Action: `Replace or remove`.
- Discount applied: `Discount applied: {code} (−{amount}).`
- Discount invalid: `That code isn’t valid right now.`

## 17.6 Checkout

- Step labels: `Address`, `Delivery`, `Payment`, `Review`.
- Address helper: `We’ll only use this to deliver your order.`
- Pay button: `Pay {amount}`
- Submitting: `Processing…`
- Confirming success: `We’re confirming your payment. This usually takes a few seconds.`
- Failure title: `We couldn’t complete your payment.`
- Failure body: `Your card may have been declined or the connection failed. Your basket is saved.`

## 17.7 Auth

- Sign in title: `Sign in to your account`
- Sign in error (generic): `Email or password is incorrect.`
- Register subtitle: `Create an account to save your basket, reservations, and orders.`
- Forgot password success: `If that email is on file, we sent a reset link. It can take a minute to arrive.`

## 17.8 Account

- Welcome: `Welcome back, {firstName}.`
- Last login: `Last signed in {relativeTime}.`
- Empty orders: `No orders yet.`
- Empty reservations: `No active reservations.`

## 17.9 Admin

- Dashboard greeting: `Today` (avoid emojis or smiley copy).
- Save success toast: `Changes saved.`
- Save failure toast: `Couldn’t save changes. Try again.`
- Bulk action confirm: `Apply "{action}" to {n} items?`
- Destructive confirm: `This can’t be undone. Type {keyword} to confirm.`
- Audit log row title pattern: `{actor} {verb} {entity}.`

## 17.10 Status descriptions (for tooltips and ARIA)

- `In stock` — `Available to order.`
- `Low stock` — `Fewer than {threshold} units remaining.`
- `Out of stock` — `Not currently available.`
- `Reservable` — `Can be reserved before purchase.`
- `Reserved` — `Held for a customer until reservation expires.`
- `Pending payment` — `Waiting for the customer to complete payment.`
- `Paid` — `Payment confirmed by the gateway.`
- `Processing` — `Order is being prepared.`
- `Shipped` — `Order is on its way.`
- `Delivered` — `Order delivered to customer.`
- `Cancelled` — `Order or reservation was cancelled.`
- `Refunded` — `Funds returned to the customer.`

---

# 18. MVP UI Scope

## 18.1 In scope (MVP)

Storefront:

- Homepage
- Shop / category listing
- Product detail
- Search
- Cart
- Checkout (Address, Delivery, Payment, Review)
- Checkout success / failure
- Auth (login, register, forgot/reset password)

User panel:

- Account overview
- Orders list and detail
- Reservations list and detail
- Profile, addresses, security
- Wishlist (basic)

Admin panel:

- Dashboard
- Products list + add/edit
- Categories
- Brands
- Inventory list + adjust
- Orders list + detail
- Reservations list + detail
- Customers list
- CRM customer profile (timeline + notes)
- Payments list + detail
- Audit logs (read-only)
- Settings (general, payments, inventory, roles)

System UX:

- Status badges across all surfaces
- Empty/loading/error states across all surfaces
- Light + dark mode
- Mobile-first responsive
- Accessibility AA

## 18.2 Deferred (Phase 8)

- Vehicle compatibility selector logic
- Reviews and ratings UI
- Coupons UI beyond basic discount field
- Loyalty / customer tiers
- Marketing automation
- Multi-warehouse
- Advanced analytics
- Native mobile app
- Multi-language and RTL polish

## 18.3 Component implementation priority (for engineering)

Tier 1 (build first):

- Theme tokens, layout containers
- Button, IconButton, Input, Select, Textarea, Checkbox, Radio, Switch
- Card, Badge, Tag, Skeleton, EmptyState
- Toast, Dialog, Drawer, Tabs, Breadcrumbs, Pagination
- Storefront shell (navbar, footer, mega menu, search bar)
- ProductCard, PriceBlock, QuantityStepper

Tier 2:

- CartDrawer, ProductImageGallery, ProductFilterSidebar
- CheckoutStepper, ReservationTimer
- Status badges (Inventory, Reservation, Order, Payment)

Tier 3:

- AdminSidebar, DashboardMetricCard, Table (compact)
- CustomerTimeline
- Command palette

---

# 19. Frontend Implementation Notes

## 19.1 Tailwind theme mapping

Map the tokens above to Tailwind theme extensions:

- Colors: brand.steel.* and brand.orange.* as palettes; expose semantic tokens via CSS variables in `:root` and `[data-theme="dark"]`.
- Typography: `font-sans`, `font-display`, `font-mono`. Provide a `font-feature-settings: "ss01", "cv11", "tnum"` for tabular numerals where needed.
- Spacing: 4px base, retain Tailwind defaults.
- Radius: extend with `radius.xs/sm/md/lg/xl/2xl`.
- Shadows: `elev.1..4` and `elev.focus`.
- Z-index: per Section 5.6.

## 19.2 Folder layout (web app)

```text
apps/web/
  app/
    (storefront)/
      page.tsx                  # /
      shop/page.tsx
      categories/[slug]/page.tsx
      products/[slug]/page.tsx
      cart/page.tsx
      checkout/page.tsx
      checkout/success/page.tsx
      checkout/failure/page.tsx
      search/page.tsx
    account/
      layout.tsx
      page.tsx
      orders/page.tsx
      orders/[id]/page.tsx
      reservations/page.tsx
      reservations/[id]/page.tsx
      profile/page.tsx
      addresses/page.tsx
      wishlist/page.tsx
      security/page.tsx
    admin/
      layout.tsx
      page.tsx
      products/page.tsx
      products/new/page.tsx
      products/[id]/edit/page.tsx
      categories/page.tsx
      brands/page.tsx
      inventory/page.tsx
      orders/page.tsx
      orders/[id]/page.tsx
      reservations/page.tsx
      reservations/[id]/page.tsx
      customers/page.tsx
      customers/[id]/page.tsx
      payments/page.tsx
      audit-logs/page.tsx
      settings/page.tsx
    (auth)/
      login/page.tsx
      register/page.tsx
      forgot-password/page.tsx
      reset-password/page.tsx
  components/
    ui/                          # primitives (Button, Input, ...)
    layout/                      # Navbar, Footer, AdminSidebar
    product/                     # ProductCard, ProductImageGallery, ProductFilterSidebar
    cart/                        # CartDrawer, CartLineItem
    reservation/                 # ReservationTimer
    checkout/                    # CheckoutStepper, OrderSummary
    admin/                       # DashboardMetricCard, AdminTable
    crm/                         # CustomerTimeline, CustomerNoteComposer
    feedback/                    # Toast, EmptyState, Skeleton
    status/                      # StatusBadge variants
  features/                      # feature modules with hooks, selectors
  lib/
    fmt/                         # currency, date, relativeTime
    a11y/                        # focus utilities, reduced-motion hook
    motion/                      # framer-motion variants
    theme/                       # tokens, Tailwind plugin
  styles/
    globals.css
    tokens.css
  public/                        # static assets, fonts
  tests/                         # component + page tests
```

## 19.3 Mock data (Phase 2)

Provide mock fixtures consistent with the Prisma schema:

- 24 products across 6 categories, 8 brands.
- Stock variation: in-stock, low-stock, out-of-stock, reservable.
- 6 mock reservations across all states.
- 10 mock orders across statuses.
- 30 mock customers, 6 with rich CRM histories.

Keep mocks in `apps/web/lib/mocks/` and gate behind a `NEXT_PUBLIC_USE_MOCKS=1` env variable so they can be swapped for real APIs in Phase 3.

## 19.4 State and data fetching

- Server Components for catalog, account, and admin reads where possible.
- Client Components for the interactive shell (CartDrawer, search, animations).
- Use TanStack Query for client-side server data with stable cache keys.
- Mutations follow optimistic-then-confirm with rollback on error.

## 19.5 Forms

- React Hook Form + Zod schemas. Schemas are colocated with the feature.
- Server actions or REST endpoints validate the same schemas.

## 19.6 Animation library mapping

- Framer Motion variants centralized in `lib/motion/variants.ts`:
  - `fadeUp`, `fadeIn`, `staggerChildren`, `drawerRight`, `dialogScale`, `toast`, `pulseAmber`, `shake`.
- Each variant accepts a `reducedMotion` boolean to short-circuit to identity transitions.

## 19.7 Theming

- `data-theme="light|dark"` on `<html>`.
- Persist preference in localStorage; default to `prefers-color-scheme`.
- Provide a Theme switcher in the footer (storefront) and in the user menu (admin).

## 19.8 Error boundaries and not-found

- Route-level `error.tsx` and `not-found.tsx` per segment.
- Errors send to error tracking with redacted payloads.

## 19.9 Performance budgets

- LCP < 2.5s on 4G mobile.
- JS first-load < 200kb gzipped on storefront landing routes.
- Images served as AVIF/WebP with responsive `sizes`.
- Fonts loaded with `display: swap`; preconnect to font CDN.

## 19.10 Telemetry-friendly markup

- Each major interactive element has a stable `data-test-id`.
- Each business event has a documented analytics name (e.g., `cart.item.added`, `reservation.created`).

---

# 20. Design QA Checklist

Run this checklist before shipping any page or component.

## 20.1 Brand and visual

- [ ] Page uses tokens only, no ad hoc colors or shadows.
- [ ] One primary action per viewport region.
- [ ] Headings follow the type scale; no skipping levels.
- [ ] Images have correct aspect ratios; no CLS.
- [ ] Light and dark mode both audited.

## 20.2 Layout and responsive

- [ ] Page renders correctly at 360, 480, 768, 1024, 1280, 1536.
- [ ] Sticky regions don’t block focused fields.
- [ ] Tables collapse to cards on small screens where specified.
- [ ] Navbar consolidates as designed at < md.

## 20.3 Components

- [ ] All used components have specified states and variants.
- [ ] Status badges follow the canonical taxonomy.
- [ ] Forms have labels, helper text, error states, and success states.
- [ ] Buttons have loading and disabled states.

## 20.4 Reservation correctness

- [ ] Reservation timer pulses correctly at ≤ 5 minutes.
- [ ] Expired state disables payment and offers `Reserve again`.
- [ ] Converted state shows linked order.
- [ ] Reduced motion disables pulse.

## 20.5 Checkout correctness

- [ ] Server-validated totals are shown, not client-cached.
- [ ] Pay button shows the exact amount.
- [ ] Success page re-confirms with backend.
- [ ] Failure page recovers without losing the basket.

## 20.6 Admin correctness

- [ ] Permission gating hides actions instead of disabling them.
- [ ] Bulk actions confirm on > 20 rows.
- [ ] Sensitive saves require admin re-auth.
- [ ] Audit log entries are produced for admin sensitive actions.

## 20.7 Accessibility

- [ ] All interactive elements have visible focus.
- [ ] Tab order matches visual order; no positive tabindex.
- [ ] Dialogs and drawers trap focus and restore on close.
- [ ] Color contrast meets AA across light and dark.
- [ ] Status uses color + icon + label.
- [ ] Forms use labels and `aria-describedby` for errors.
- [ ] Reduced motion respected.

## 20.8 Empty / loading / error

- [ ] Each page has loading skeletons that match final layout.
- [ ] Each page has empty state copy from Section 16.1.
- [ ] Each page has error states from Section 16.2.
- [ ] Toasts use the right tone; danger never auto-dismisses.

## 20.9 Performance

- [ ] LCP image is `priority`.
- [ ] Animations use transform/opacity only.
- [ ] No layout-thrashing animations.
- [ ] First-load JS within budget.

## 20.10 Copy

- [ ] Voice and tone match Section 17.1.
- [ ] No exclamation marks in checkout, account, or admin.
- [ ] Error messages are corrective, not punitive.
- [ ] All strings are translation keys.

## 20.11 Acceptance gate (Phase 1 → Phase 2)

The design is complete when:

- All MVP pages have a section in this document or a referenced sub-doc.
- All required components are specified with variants and states.
- All status badges live in a single canonical list.
- All flows have empty, loading, and error states.
- Accessibility, animation, and responsive rules are documented and ready to be coded.

When this checklist is complete, Phase 2 (frontend prototype with mock data) can begin.

