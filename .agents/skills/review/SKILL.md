---
name: review
description: Refactor working code, update docs, and merge to main. Use when the feature is verified.
---

## Goal
Refactor working code, update docs, and merge to main.

## Inputs
- Changed files
- `_config/coding-conventions.md`, `README.md`

## Process
1. Scan for duplication, oversized files, dead code; clean file headers.
2. Update `README.md` / `_config/*.md` / `decisions.md` if architecture changed.
3. Merge the feature branch to `main` (no force push).

## Outputs
- Merge commit + updated docs.

## Verify
- "Done" = works end-to-end + error/loading states + committed + docs current.
