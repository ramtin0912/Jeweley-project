# TODO — Build Stages

Track current stage here. One stage at a time.

## Stage 0 — Foundation
- [x] Nuxt 4 scaffold
- [x] Tailwind + RTL + Vazirmatn
- [x] Prisma schema + client
- [x] pi context layer (AGENTS.md, _config, skills)
- [x] git init + first commits
- [x] dev server / build smoke test

## Stage 1 — Storefront catalog
- [x] categories, products, quick-buy grid
- [x] product detail page
- [x] search + filters (client-side)
- [x] packages page + portfolio page

## Stage 2 — Cart + guest checkout + OTP
- [x] cart store (localStorage)
- [x] checkout form (name, phone, address)
- [x] Kavenegar OTP send/verify (dev fallback: logs code)
- [x] order creation (PENDING) with DB re-pricing

## Stage 3 — Zarinpal payment
- [x] payment request + callback + verify (sandbox)
- [x] stock reservation on payment success
- [x] verify-failure → order CANCELED

## Stage 4 — Admin panel
- [x] password auth (bcrypt + session cookie)
- [x] products / packages / portfolio CRUD
- [x] orders + earnings (Shamsi)
- [x] SEO fields (slug, seoTitle, seoDescription)

## Stage 5 — SEO
- [x] Persian slugs + meta + JSON-LD
- [x] sitemap.xml + robots.txt
- [x] blog (DB-backed + markdown-it)

## Stage 6 — Deploy
- [ ] private GitHub repo
- [ ] manual deploy + domain + SSL

## Open branding items
- [ ] Replace working store name/title with the real brand name
