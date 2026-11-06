# Heart Social — website

Next.js 16.4.5 (App Router) · React 19.3.1 · Tailwind CSS 4.3.4 · TypeScript 7.0.2 (`tsc` via `@typescript/native`; TS 6 API for tooling, per 00 §A1) · Zod 4.6.7 · Node ≥ 22.12 (26 LTS recommended).

## Run

```bash
npm ci
cp .env.example .env.local   # fill what you have; dev works without any of it
npm run dev                  # http://localhost:3000
```

Without `DATABASE_URL` in development, leads are written to `.data/leads.jsonl`. In production the form **refuses** to accept a lead it cannot store (no database) or rate-limit (no Upstash) and shows the phone number instead.

## Checks

| Command | What |
|---|---|
| `npm run typecheck` | TypeScript 7, strict |
| `npm run lint` | ESLint (next/core-web-vitals + typescript), 0 warnings |
| `npm test` | Vitest — lead action: validation, honeypot, persist-before-notify, fail-closed limiter, storage and e-mail failures |
| `npm run build && CHROME_PATH=/path/to/chrome npm run e2e` | Playwright, mobile + desktop: axe (WCAG 2.2 AA tags) on 9 pages, one H1, no overflow, no console errors, form errors/success/stored row, rate limit, keyboard, mobile menu, showreel pause + reduced motion, no analytics before consent, redirects/robots |

## Where things live

- `src/lib/site.ts` — business facts, phone, services, nav. **Edit facts here.**
- `src/content/showreel.ts` — hero scenes, text, stock-clip slots (S1–S9) and soundtrack. Drop clips into `public/video/` and set `src`.
- `src/content/services.ts` — copy for the 5 service pages (SMM approved; others draft).
- `src/app/apel-gratuit/` — form, schema, server action. `src/server/` — client IP, rate limit, lead storage + e-mail.
- `db/001_call_requests.sql` — table for leads.
- `docs/` — ADRs, placeholder register, launch checklist.

## Conventions

- Mobile navigation: disclosure pattern (≤7 links), 13 §3.1.
- Reveal animation: 09 §15.1 pattern (`Reveal`) — content visible without JS / under reduced motion.
- Analytics: nothing loads before consent (07 §12.11 basic approach).
- Placeholders are rendered visibly as `[LIKE THIS]` (yellow) — search the repo for `[` before launch.
