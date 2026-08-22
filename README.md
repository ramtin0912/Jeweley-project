# Persian Handmade Jewelry Store

A single-vendor Persian handmade jewelry storefront: classic silver pieces, one-of-a-kind
exclusive works, a portfolio of past works, and a multi-product package section.

## Stack

Nuxt 4 (Vue 3 + TypeScript) · Tailwind CSS (RTL, Vazirmatn) · Pinia · PostgreSQL (Prisma) ·
Zarinpal (payment) · Kavenegar (SMS OTP).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `ZARINPAL_MERCHANT_ID`,
   `KAVENEGAR_API_KEY`, `ADMIN_SESSION_SECRET`.
3. Create the database and run `npx prisma migrate dev`.

## Run

- Dev: `npm run dev`
- Typecheck: `npm run typecheck`
- Test: `npm test`

## Deploy

- Build: `npm run build` → output in `.output/`
- Run: `node .output/server/index.mjs`
- Manual deploy to the Iran host; set `ZARINPAL_SANDBOX=false` in production.

## Agent context (pi)

Read `AGENTS.md` first. Stage procedures live in `.agents/skills/`, reference rules in
`_config/`, and the current stage checklist in `tasks/TODO.md`.
