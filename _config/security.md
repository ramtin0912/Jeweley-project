# Security

## Secrets
- All secrets in `.env` (gitignored). Commit `.env.example` only.
- `DATABASE_URL`, `ZARINPAL_MERCHANT_ID`, `KAVENEGAR_API_KEY`, `ADMIN_SESSION_SECRET`.

## OTP (Kavenegar)
- Rate-limit send: max 3 per 10 minutes per phone.
- 5-digit code, 5-minute expiry, max 5 verify attempts.
- Store only a hash of the code (bcrypt/argon), never plaintext.

## Admin
- Single admin, bcrypt password hash, httpOnly + SameSite session cookie.
- CSRF protection on all admin mutations.
- Admin routes return 404/redirect for anonymous users (no route-existence leak).

## Orders & payment
- Never trust client cart prices — server re-prices every item from the DB.
- On Zarinpal callback: verify the transaction amount matches the order total and the
  status is valid before marking PAID.
- HTTPS only for all external calls.

## Data
- Validate all input server-side (zod).
- Never log sensitive data (phones, OTP codes, addresses) at info level.
