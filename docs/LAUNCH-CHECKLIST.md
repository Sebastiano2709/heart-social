# Launch checklist

Status vocabulary (11 §10.3): ✅ Executed-pass · ❌ Executed-fail · 👁 Reviewed (static) · ⏳ Not verified.

## Content
- [ ] All `[…]` placeholders replaced or the block hidden (docs/PLACEHOLDERS.md)
- [ ] Emilian approved the 4 draft service pages and the "Despre noi" story
- [ ] Original logo file in place (favicon, header, footer, OG image)

## Legal / GDPR [LEGAL]
- [ ] Counsel completed privacy, cookie and terms pages; company data (Law 365/2002) in footer
- [ ] Consent text on the form approved; cookie list with names/durations
- [ ] ANPC SAL/SOL requirement confirmed for a B2B/B2C agency

## Infrastructure
- [ ] Host chosen (recommended: Vercel) · `CLIENT_IP_SOURCE` set for it
- [ ] PostgreSQL provisioned, `db/001_call_requests.sql` applied, `DATABASE_URL` set
- [ ] Upstash Redis set (otherwise the form refuses submissions — by design)
- [ ] Resend domain verified; `LEAD_NOTIFY_TO/FROM`, `RESEND_API_KEY` set; test lead received
- [ ] `NEXT_PUBLIC_SITE_URL` = final domain; `NEXT_PUBLIC_ALLOW_INDEXING=true` only on production
- [ ] Security headers verified on the host; CSP decided (inline consent/analytics scripts need hashes or nonces, 09 §6.1)

## Tracking
- [ ] GA4 ID + Meta Pixel ID set; `generate_lead` marked as conversion in GA4
- [ ] Test in GA4 DebugView: cta_click, form_start, generate_lead, click_call, click_whatsapp, click_instagram (only after consent)

## SEO
- [ ] Google Search Console + sitemap submitted · Google Business Profile linked
- [ ] Rich results test on a service page (Service, FAQPage, BreadcrumbList) and home (Organization)

## Quality (re-run after every change, 13 N9)
- [ ] `npm run typecheck && npm run lint && npm test && npm run build && npm run e2e` — two clean runs
- [ ] Real-device check: iPhone Safari + Android Chrome (showreel, form, call bar)
- [ ] Lighthouse mobile on production URL; CrUX after 28 days
