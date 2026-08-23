# Stage 1 — Storefront Catalog

## Problem
Storefront has no content or pages. Need: category nav, quick-buy product grid,
product detail page, search + filters, packages page, portfolio page.

## Proposed change
1. Prisma client singleton (server/utils/prisma.ts) using the pg driver adapter.
2. Seed data: categories, products (+variants), packages, portfolio works
   (demo catalog — real catalog comes via the admin panel in Stage 4).
3. API: GET /api/categories, /api/products (query: category, q, inStock),
   /api/products/[slug], /api/packages, /api/portfolio.
4. Pages: index (quick-buy grid + search/filter), products/[slug] (detail),
   packages (package section), portfolio (past works).
5. Components: ProductCard; shared types in app/types/catalog.ts.

## Files affected
- server/utils/prisma.ts (new)
- server/api/{categories,products,products/[slug],packages,portfolio}/* (new)
- app/pages/{index,products/[slug],packages,portfolio}.vue (new)
- app/layouts/default.vue, app/components/ProductCard.vue (new)
- app/types/catalog.ts (new)
- prisma/seed.ts (new), prisma.config.ts (seed cmd), package.json (seed script)

## Acceptance criteria
- Homepage renders category nav + product grid with Persian Toman prices.
- Product detail renders name, price, description, material, weight, image.
- Search + category/stock filters work client-side.
- Packages page + portfolio page render from the DB.

## Risks
- Generated Prisma client import path under Nitro (verify with build).
- Seed data is demo only.
