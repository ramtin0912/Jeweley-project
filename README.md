# Persian Handmade Jewelry Store

A single-vendor Persian handmade jewelry storefront: classic silver pieces, one-of-a-kind
exclusive works, a portfolio of past works, and a multi-product package section.

## Stack

Nuxt 4 (Vue 3 + TypeScript) · Tailwind CSS (RTL, Vazirmatn) · Pinia · PostgreSQL (Prisma) ·
Zarinpal (payment) · Kavenegar (SMS OTP).

## Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
#    Fill in DATABASE_URL (see step 3), and optionally ADMIN_PASSWORD.

# 3. Start a local PostgreSQL (easiest: Prisma's bundled dev server)
npx prisma dev
#    It prints a URL like: postgres://postgres:postgres@localhost:PORT/template1
#    Put that URL in .env as DATABASE_URL (change the db name to jewelry_store).

# 4. Create the schema and seed demo content (products, packages, admin, blog)
npx prisma migrate dev

# 5. Run the dev server
npm run dev
#    → http://localhost:3000
```

**Admin panel:** http://localhost:3000/admin — login `admin` / `admin1234`
(set `ADMIN_PASSWORD` in `.env` **before** seeding to use your own password).

**Note:** with no `KAVENEGAR_API_KEY` set, the OTP code is printed to the server console
instead of SMS'd (dev mode). Payment uses Zarinpal sandbox when `ZARINPAL_SANDBOX=true`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build (SSR) → `.output/` |
| `npm run preview` | preview the production build |
| `npm run typecheck` | type-check (`nuxt typecheck`) |
| `npm test` | unit tests (Vitest) |
| `npm run seed` | re-seed the demo catalog |

## Production

```bash
npm run build
node .output/server/index.mjs
```

Before going live set: `ZARINPAL_SANDBOX=false`, a real `ZARINPAL_MERCHANT_ID`,
`KAVENEGAR_API_KEY`, a strong `ADMIN_SESSION_SECRET`, and a production `DATABASE_URL`.
