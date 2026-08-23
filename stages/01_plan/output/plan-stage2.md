# Stage 2 — Cart + Guest Checkout + OTP

## Problem
No way to buy: no cart, no checkout, no order capture.

## Proposed change
1. Pinia cart store persisted to localStorage (guest cart, no accounts).
2. Add-to-cart from product cards, detail page, and packages page.
3. Cart drawer (slide-over) + header badge.
4. Checkout page: name/phone/address + OTP.
5. OTP: POST /api/auth/otp/send (Kavenegar; dev console fallback when no API key).
6. POST /api/orders: verify OTP, re-price items from DB, create PENDING order.

## Notes
- Stock is validated but NOT decremented yet (reserve at payment, Stage 3).
- Server re-prices every item from DB; client cart is display-only.

## Acceptance criteria
- Add/remove/quantity works; cart persists across reload.
- Checkout sends OTP, verifies it, creates a PENDING order with a number.
- Wrong/expired OTP is rejected; rate-limit enforced.
