# Architecture

## Boundaries (non-negotiable)
- Storefront (`app/pages`) must not import admin-only server code or leak admin routes.
- Prices come from the DB at order time; the client cart is display-only.
- All external integrations live in `server/utils/` (`zarinpal.ts`, `kavenegar.ts`, `otp.ts`).
  Nothing else calls them directly.
- Order flow is one-way: cart (client) → checkout → OTP verify → order (PENDING)
  → Zarinpal → callback → PAID.

## Modules (by domain)
- catalog: products, categories, variants, packages, portfolio
- orders: cart, checkout, payment, OTP
- admin: auth, product/package/portfolio CRUD, orders, earnings, SEO fields
- seo: Persian slugs, meta, JSON-LD, sitemap/robots, blog

## Data model (Postgres, Prisma)
Categories → Products (+ variants) → Packages (+ package_items)
PortfolioWorks (display-only) · Orders → OrderItems (snapshots) · OtpCodes · Admins · Settings

## Key decisions (rationale in decisions.md)
- Guest checkout, no customer accounts.
- Packages sold as a single unit (fixed price, own stock).
- Single product image for now.
- Dates stored UTC, displayed Shamsi.
