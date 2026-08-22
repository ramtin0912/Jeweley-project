# Persian Handmade Jewelry Store

## Identity
A single-vendor Persian handmade jewelry storefront: classic silver pieces, one-of-a-kind
exclusive works, a portfolio of past works, and a multi-product package section.
Stack: Nuxt 4 (Vue 3 + TypeScript), PostgreSQL (Prisma), Tailwind, Vazirmatn (RTL).
Team: solo developer + pi.

## Non-negotiables
- Prefer the smallest change that solves the task; no unrequested features.
- Work on a feature branch; commit after each working change.
- No secrets, no `any` types, no hardcoded values, no commented-out code.
- Loading and error states on every async operation.
- Prices are Toman integers. Never trust client cart prices — re-price from DB at order time.

## Routes
| Task | Do this |
|---|---|
| New feature / change / bug | Load skill `plan` → write plan to stages/01_plan/output/plan.md |
| Implement a planned change | Load skill `implement` |
| Prove it works | Load skill `verify` |
| Review, refactor, merge | Load skill `review` |

## Reference (read before acting)
- Stack & structure: _config/stack.md
- Coding rules: _config/coding-conventions.md
- Architecture boundaries: _config/architecture.md
- Security: _config/security.md
- Testing: _config/testing.md
- Decisions: _config/decisions.md

## Start here
Read tasks/TODO.md for the current stage checklist.

## Validate
Run `npm run typecheck` and `npm test` before reporting done.
