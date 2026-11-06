// Event helpers. Every call is a no-op until the visitor grants consent and the
// matching script has loaded (see components/consent.tsx).

export type EventName = 'generate_lead' | 'cta_click' | 'form_start' | 'click_call' | 'click_whatsapp' | 'click_instagram'

type Params = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    fbq?: (...args: unknown[]) => void
  }
}

const META_EVENT: Partial<Record<EventName, string>> = {
  generate_lead: 'Lead',
  click_call: 'Contact',
  click_whatsapp: 'Contact',
}

export function trackEvent(name: EventName, params: Params = {}): void {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
  const meta = META_EVENT[name]
  if (meta) window.fbq?.('track', meta, params)
}
