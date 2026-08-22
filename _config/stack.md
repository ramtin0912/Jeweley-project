# Stack & Structure

## Chosen stack
- Frontend: Nuxt 4 (Vue 3 + TypeScript), SSR + SSG (route-level)
- Styling: Tailwind CSS v3, RTL, Vazirmatn variable font
- State: Pinia (`@pinia/nuxt`)
- API: Nitro server routes (same app, `server/api/`)
- DB: PostgreSQL via Prisma 7 (`prisma-client` generator → `app/generated/prisma`)
- Auth: customer SMS OTP (Kavenegar); admin password (bcrypt + httpOnly session)
- Payment: Zarinpal v4 (Toman, `currency: IRT`)
- Testing: Vitest (unit); Playwright (e2e, added in test stage)
- Typecheck: `nuxt typecheck` (vue-tsc + TypeScript 5.x)

## Why (summary; full rationale in decisions.md)
- SEO-first Persian storefront → Nuxt SSR/SSG.
- Single TS codebase = storefront + API + admin, no separate backend to host.
- Toman integers everywhere; no floats for money.

## Directory layout
```
app/            Nuxt 4 source (app.vue, pages/, components/, composables/, stores/, assets/, utils/)
server/         Nitro (api/, utils/)
content/        blog (Nuxt Content, added in SEO stage)
public/         static (favicon, robots.txt)
prisma/         schema.prisma + migrations + prisma.config.ts
tests/          Vitest / Playwright specs
_config/        pi reference rules (this file + siblings)
.agents/skills/ pi stage procedures (plan/implement/verify/review)
stages/         checkpoint artifacts (plan/test/review outputs)
tasks/          TODO.md
docs/api/       local API docs (Zarinpal, Kavenegar)
```

## Naming & file placement
- Vue components: PascalCase (`ProductCard.vue`)
- composables/stores/utils: camelCase (`useCart.ts`, `cartStore.ts`, `formatToman.ts`)
- server routes: kebab-case filenames → REST paths
- DB tables/columns: snake_case (`orders`, `customer_phone`)
- CSS classes: kebab-case

## Run & test commands
- install: `npm install`
- dev: `npm run dev`
- build: `npm run build`
- typecheck: `npm run typecheck`
- test: `npm test`
- prisma migrate: `npx prisma migrate dev`
- prisma studio: `npx prisma studio`
