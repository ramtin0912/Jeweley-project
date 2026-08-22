---
name: plan
description: Turn a user request into a small, implementation-ready plan. Use when starting a new feature, change, or bug fix and no plan.md exists yet.
---

## Goal
Turn the request into the smallest implementation-ready plan.

## Inputs
- User request
- `_config/stack.md`, `_config/coding-conventions.md`
- `_config/architecture.md` (boundaries to respect)
- Current repo inspection (read before proposing)

## Process
1. Inspect existing code before proposing changes.
2. Identify the smallest viable change; confirm scope with the user if unsure.
3. List files to change; define acceptance criteria.

## Outputs
Write `stages/01_plan/output/plan.md`:
- Problem
- Proposed change
- Files affected
- Acceptance criteria
- Risks / unknowns

## Verify
- Every change maps to the request; acceptance criteria are testable; no scope creep.

## Stop
No implementation in this stage.
