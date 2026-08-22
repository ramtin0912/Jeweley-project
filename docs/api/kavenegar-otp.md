# Kavenegar — SMS OTP

Local reference. Source: kavenegar.com/rest.html. Verify before integration changes.

## Endpoints
- OTP (lookup template): `GET https://api.kavenegar.com/v1/{API_KEY}/verify/lookup.json`
- Simple send: `GET https://api.kavenegar.com/v1/{API_KEY}/sms/send.json`

## verify/lookup.json — params
| Param | Type | Notes |
|---|---|---|
| receptor | string | recipient phone, e.g. `09123456789` |
| token | string | the OTP code (or token parts) |
| template | string | named template, e.g. `orderverify` |

## Rules (project)
- OTP: 5-digit code, 5-minute expiry, max 5 verify attempts, max 3 sends/10 min per phone.
- Store only a hash of the code (`otp_codes.code_hash`), never plaintext.
- `KAVENEGAR_API_KEY` and `KAVENEGAR_OTP_TEMPLATE` live in `.env`.
