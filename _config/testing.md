# Testing

## Commands
- unit: `npm test` (Vitest)
- typecheck: `npm run typecheck`
- e2e: `npm run test:e2e` (Playwright — added in test stage)

## What must be tested
- Unit: Toman price formatting, OTP validation, cart total calc, Persian slug generation.
- E2E (happy + failure): quick-buy → checkout → OTP → order → payment (sandbox);
  invalid OTP; empty cart; payment failure.

## Rules
- Happy path AND failure path, always.
- Test against Zarinpal/Kavenegar sandbox only, never live.
- "It works on my machine" is not tested — describe input and expected output.
