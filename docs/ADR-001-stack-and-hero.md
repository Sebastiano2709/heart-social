# ADR-001 — Stack, hero engine and JS budget

Status: accepted (Stage 4, 2026-11-06)

## Decision
- Default stack from 00 §A1 (Next.js 16.4.5, React 19.3.1, Tailwind 4.3.4, TS 7.0.2, Zod 4.6.7).
- The hero showreel is a **CSS + timer engine** (`src/components/showreel.tsx`), not GSAP. The brief allowed "GSAP or equivalent"; every effect (echo, typing, video-in-text, zoom, wipe, count, logo assembly) uses transform/opacity/clip-path only. Saves the GSAP payload and keeps one animation system.
- Video-in-text uses `background-clip: text` with the founder photo until stock clips exist. A `<video>` cannot be clipped by `background-clip`; when real clips arrive, scene 4/5 needs an SVG `clipPath` text mask (planned, not built).

## Consequences — budget (U1, still open per 13 §3.2)
Measured on the production build (gzip -9 of the JS files the HTML references, 2026-11-06):

| Route | JS gzip | 08 §13.2 budget (premium marketing ≤120 KB) |
|---|---|---|
| `/` | 192 KiB | **Fail** |
| `/apel-gratuit` | 216 KiB | **Fail** |
| `/servicii/social-media-marketing` | 183 KiB | **Fail** |

~160 KiB of that is the framework (React DOM + Next runtime); first-party code is ~30 KiB (showreel 9 KiB, header/consent ~10 KiB). Meeting the budget means a lighter framework (e.g. Astro + islands) — a re-platform the client should decide on. Lighthouse mobile lab on `/`: performance 91–98, LCP 2.1–3.0 s (varies run to run; threshold 2.5 s), CLS ≤ 0.003, TBT 80–200 ms.

## Update 2026-11-06 — stock clips added
9 Pexels clips, trimmed to 5–6 s, one grade (contrast +6 %, saturation −10 %, cooler shadows), H.264 CRF 27, no audio: 1280×720 desktop, 720×900 mobile, 720×810 for the desktop-only split scene. 5.9 MB on disk in total; a visitor downloads only the current chapter (≈1.1–1.5 MB desktop), starting 1.5 s after `load`. Data-saver / 2G → posters only.
The first frame is now a 33 KB poster still (fetchpriority=high) so later full-frame video does not become a later LCP. Lighthouse mobile lab on `/` after the change: performance 90–95, LCP 2.7–3.2 s (over the 2.5 s threshold in simulation; observed render ≈0.25 s unthrottled), CLS 0.001, TBT 100–190 ms, page weight ≈2.0 MB including video.
