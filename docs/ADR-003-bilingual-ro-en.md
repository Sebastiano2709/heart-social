# ADR-003 — Bilingual site (Romanian + English)

Status: accepted · 2026-11-25 · Owner sections: 03 §8.7 (i18n), 07 §2.14 (hreflang), 09 §5.13.3 (preference cookie)

## Decision
- Every page lives under a locale prefix: `/ro/...` and `/en/...`. Romanian is the reference language.
- Only the bare `/` is negotiated (`src/proxy.ts`): `locale` cookie (set by the language switcher) → `Accept-Language` → `ro`. 307, `Vary: Accept-Language, Cookie`, `no-store`.
- Localized URLs are never redirected by language. Legacy unprefixed URLs (`/servicii`, `/apel-gratuit`…) get a permanent 308 to `/ro/...`; `/contact` → `/ro/apel-gratuit`.
- Every page: self-canonical, `hreflang` ro + en + `x-default` (`/`). Sitemap lists both locales with alternates. `robots` disallows `/ro/multumim` and `/en/multumim`.
- The switcher links to the same page in the other language and stores `locale` (strictly necessary preference, listed in the cookie policy).
- Copy: page copy in Server Components (`src/i18n/pages/*`, per-page `copy` objects, `src/content/services*.ts`); client components get only an interface slice through `I18nProvider`. Unit test `src/i18n/i18n.test.ts` fails if the English copy's shape drifts from the Romanian.
- Form: option values stay Romanian (database and email unchanged); labels are per locale. Each lead stores `locale`; the email subject gets `[EN]`.
- 404: `[lang]/[...missing]` → `notFound()` → `[lang]/not-found.tsx` renders `NotFoundView` (client, reads the locale from the provider).

## Deviations (from 03 §8.7 defaults)
1. **TypeScript dictionaries instead of JSON** — type-checked keys (`en: Ui` must match `ro`), no loader code.
2. **Small Accept-Language parser instead of `negotiator` + `@formatjs/intl-localematcher`** — two locales only; 15 lines, unit-tested; avoids two dependencies.
3. **Romanian slugs in both languages** (`/en/servicii/editare-reels`) — one route tree, no slug-translation map; English slugs can be added later with redirects if SEO data shows a need.

## Known limits
- The 404 page keeps the home `<title>` (not-found files get no params). The status code is 404 and it is noindex.
- The English legal pages are translations of a structure counsel must still complete ([LEGAL]).
- JS: `/ro` and `/en` both 193.7 KB gzip initial (was 192 KiB before i18n, ADR-001). The 08 §13.2 budget is still a Fail, for the same framework reason.
