---
name: implement
description: Implement an approved plan one section at a time, committing after each working change. Use after stages/01_plan/output/plan.md exists.
---

## Goal
Implement the plan one section at a time, committing after each working change.

## Inputs
- `stages/01_plan/output/plan.md`
- `_config/stack.md`, `_config/coding-conventions.md`, `_config/security.md`

## Process
1. Confirm clean git state; create `feature/<short-desc>` branch from `main`.
2. Implement one plan section at a time; commit after each working change.
3. Follow conventions: <50-line functions, <300-line files, descriptive names,
   file headers, no `any`/hardcode/dead code; loading + error states on async.

## Outputs
- Code + commits; check off completed sections in `plan.md`.

## Verify
- `npm run typecheck` and `npm test` pass; sizes within limits; headers present.

## Stop
No unrequested features; stop and ask if intent is unclear.
