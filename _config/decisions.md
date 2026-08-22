# Decisions

## 2026-08-22 — Stack: Nuxt 4 + Postgres (Prisma)
- What: Nuxt 4 SSR/SSG, Nitro API, PostgreSQL via Prisma 7.
- Why: SEO-first Persian storefront needs SSR/SSG; single TS codebase = storefront +
  API + admin. Owner: host won't restrict the stack.
- Rejected: Next.js (conventions are Vue-based); PHP/MySQL (only if forced onto shared cPanel).

## 2026-08-22 — Tailwind over Quasar
- Why: lighter bundle, bespoke Persian/RTL design; Quasar is overkill for a lean storefront.

## 2026-08-22 — Toman integers + Zarinpal currency=IRT
- Why: store/display Toman; avoid Rial↔Toman conversion bugs. No floats for money.

## 2026-08-22 — Packages sold as a single unit
- Why: admin-curated fixed price; package has its own stock_count. `package_items` is display-only.

## 2026-08-22 — Guest checkout, no customer accounts
- Why: "get in quick, get out quick"; OTP confirms the phone at order time.

## 2026-08-22 — Single product image for now
- Why: MVP scope; upgrade to a gallery later via an `images[]` migration.
