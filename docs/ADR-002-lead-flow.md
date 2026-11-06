# ADR-002 — Call-request lead flow

Status: accepted (Stage 4, 2026-11-06)

Follows 05 §10.9: trusted client IP (09 §4.6) → rate limit 5 / 10 min (Upstash REST; **fails closed** in production without it) → Zod validation (honeypot `website` → fake success) → **persist** (PostgreSQL `call_requests`) → notify.

**Deviation:** notification runs in `after()` (next/server) with a Resend `Idempotency-Key` instead of a job queue. A failed e-mail is logged and the row keeps `notified_at = null`; re-send rows with `notified_at is null` older than 10 minutes (index provided). Reason: one form, low volume, no queue infrastructure in the client's accounts. Revisit if a queue is added.

Booking: callback request (Emilian calls back). A calendar (Cal.com/Calendly) can replace the form later; it needs a client account.
