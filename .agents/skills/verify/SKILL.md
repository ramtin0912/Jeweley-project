---
name: verify
description: Prove a change works end-to-end including failure paths. Use after implementation is committed.
---

## Goal
Prove the change works end-to-end (happy + failure paths).

## Inputs
- `plan.md` acceptance criteria
- `_config/testing.md`

## Process
1. Run `npm run typecheck` and `npm test`; fix failures (follow the debugging protocol).
2. Exercise the happy path AND failure path (error, empty input, offline).
3. For payment/OTP, test against sandbox only.

## Outputs
- `stages/03_test/output/test-notes.md` (what ran, what passed/failed, what's untested).

## Verify
- Acceptance criteria met; failure path exercised; no unrelated files changed.

## Stop
If 3+ fix attempts fail, `git reset --hard` to the last good commit and re-plan.
