'use client'
// Cookie consent + consent-gated analytics. Nothing is requested from Google or Meta before opt-in
// (07 §12.11 default "basic" approach). Choice is stored per browser; "Setări cookie" in the footer reopens it.
// [LEGAL] Banner wording and the cookie list must be reviewed by the client's counsel (09 §5.13).

import Script from 'next/script'
import Link from 'next/link'
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

type Consent = { analytics: boolean; marketing: boolean; v: 1 }
const KEY = 'hs-consent'
const EVT = 'hs-consent-change'

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Consent) : null
  } catch {
    return null
  }
}
function write(c: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c))
  } catch {
    /* storage blocked: consent lasts for this page view only */
  }
  window.dispatchEvent(new CustomEvent(EVT))
}

let snapshot: string | null | undefined
function subscribe(cb: () => void) {
  const h = () => {
    snapshot = undefined
    cb()
  }
  window.addEventListener(EVT, h)
  window.addEventListener('storage', h)
  return () => {
    window.removeEventListener(EVT, h)
    window.removeEventListener('storage', h)
  }
}
function getSnap() {
  if (snapshot === undefined) {
    try {
      snapshot = localStorage.getItem(KEY)
    } catch {
      snapshot = null
    }
  }
  return snapshot
}

export function useConsent(): { decided: boolean; analytics: boolean; marketing: boolean; ready: boolean } {
  const raw = useSyncExternalStore(subscribe, getSnap, () => 'ssr')
  if (raw === 'ssr') return { decided: true, analytics: false, marketing: false, ready: false }
  const c = raw ? read() : null
  return { decided: !!c, analytics: !!c?.analytics, marketing: !!c?.marketing, ready: true }
}

export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent('hs-consent-open'))
}

export function ConsentBanner() {
  const { decided, analytics, marketing, ready } = useConsent()
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [a, setA] = useState(false)
  const [m, setM] = useState(false)

  useEffect(() => {
    const h = () => {
      setA(analytics)
      setM(marketing)
      setDetails(true)
      setOpen(true)
    }
    window.addEventListener('hs-consent-open', h)
    return () => window.removeEventListener('hs-consent-open', h)
  }, [analytics, marketing])

  const save = useCallback((c: Omit<Consent, 'v'>) => {
    write({ ...c, v: 1 })
    setOpen(false)
  }, [])

  // Server render shows the banner (paints with the first HTML, no late LCP); an inline head script
  // hides it for visitors who already chose (html.hs-consented). After hydration, state decides.
  if (ready && decided && !open) return null

  return (
    <div role="region" aria-label="Preferințe cookie" data-open={open || undefined} className="consent-banner fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5">
      <div className="mx-auto max-w-3xl border border-line bg-white p-5 shadow-[0_12px_40px_rgba(22,20,26,.18)] sm:p-6">
        <p className="font-extrabold">Folosim cookie-uri doar cu acordul tău.</p>
        <p className="mt-1.5 text-[0.9375rem] text-grey-700">
          Cookie-urile necesare fac site-ul să funcționeze. Cu acordul tău, folosim și cookie-uri de analiză (Google Analytics) și de marketing (Meta Pixel), ca să vedem ce funcționează. Detalii în{' '}
          <Link href="/politica-cookies" className="font-bold text-violet-700 underline underline-offset-2">
            Politica de cookies
          </Link>
          .
        </p>
        {details && (
          <fieldset className="mt-4 grid gap-3 border-t border-line pt-4">
            <legend className="sr-only">Alege categoriile de cookie-uri</legend>
            <label className="flex items-start gap-3 text-[0.9375rem]">
              <input type="checkbox" checked disabled className="mt-1 size-5 accent-violet-700" />
              <span><b>Necesare</b> — mereu active.</span>
            </label>
            <label className="flex items-start gap-3 text-[0.9375rem]">
              <input type="checkbox" checked={a} onChange={(e) => setA(e.target.checked)} className="mt-1 size-5 accent-violet-700" />
              <span><b>Analiză</b> — Google Analytics: câți vizitatori avem și ce pagini citesc.</span>
            </label>
            <label className="flex items-start gap-3 text-[0.9375rem]">
              <input type="checkbox" checked={m} onChange={(e) => setM(e.target.checked)} className="mt-1 size-5 accent-violet-700" />
              <span><b>Marketing</b> — Meta Pixel: măsurăm rezultatul reclamelor.</span>
            </label>
          </fieldset>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="btn btn-sm" onClick={() => save({ analytics: true, marketing: true })}>
            Accept toate
          </button>
          <button type="button" className="btn btn-sm btn-dark" onClick={() => save({ analytics: false, marketing: false })}>
            Doar necesare
          </button>
          {details ? (
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => save({ analytics: a, marketing: m })}>
              Salvează alegerea
            </button>
          ) : (
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setDetails(true)}>
              Setări
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const GA_RE = /^G-[A-Z0-9]+$/
const PIXEL_RE = /^\d{6,20}$/

export function Analytics({ gaId, pixelId }: { gaId?: string; pixelId?: string }) {
  const { analytics, marketing } = useConsent()
  return (
    <>
      {analytics && gaId && GA_RE.test(gaId) && (
        <>
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent','default',{analytics_storage:'granted',ad_storage:'${marketing ? 'granted' : 'denied'}',ad_user_data:'${marketing ? 'granted' : 'denied'}',ad_personalization:'${marketing ? 'granted' : 'denied'}'});
            gtag('js', new Date());
            gtag('config','${gaId}');
          `}</Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        </>
      )}
      {marketing && pixelId && PIXEL_RE.test(pixelId) && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${pixelId}');fbq('track','PageView');
        `}</Script>
      )}
    </>
  )
}

export function ConsentSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentSettings}>
      Setări cookie
    </button>
  )
}
