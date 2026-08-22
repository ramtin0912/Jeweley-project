# Zarinpal — Payment Gateway (v4)

Local reference. Source: zarinpal.com/docs. Verify against live docs before integration changes.

## Endpoints
- Request: `POST https://api.zarinpal.com/pg/v4/payment/request.json`
- Verify:  `POST https://api.zarinpal.com/pg/v4/payment/verify.json`
- Redirect: `https://www.zarinpal.com/pg/StartPay/{authority}`
- Sandbox: replace `api.zarinpal.com` with `sandbox.zarinpal.com` (merchant = any 36 chars)

## request.json — request body
| Field | Type | Notes |
|---|---|---|
| merchant_id | string | 36-char merchant code |
| amount | integer | transaction amount |
| currency | string | `IRR` = Rial, `IRT` = Toman. **We send `IRT`.** |
| description | string | order number / product name |
| callback_url | string | return URL after payment |

Response: `{ data: { authority, fee_type, fee }, errors }`. Use `authority` to redirect.

## verify.json — request body
| Field | Type | Notes |
|---|---|---|
| merchant_id | string | 36-char merchant code |
| amount | integer | same amount as request |
| authority | string | from request response |

Success: `{ data: { code: 100, ref_id, card_pan, fee }, errors }`. `code === 100` = paid.

## Rules (project)
- Amount is in **Toman** and always matches the order total (verified server-side).
- Never trust the callback alone; always call `verify` server-side.
- Use sandbox in dev; flip `ZARINPAL_SANDBOX=false` for production.
