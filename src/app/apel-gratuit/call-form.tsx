'use client'
import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { submitCall } from './actions'
import { SERVICE_OPTIONS, type CallField, type CallState } from './schema'
import { trackEvent } from '@/lib/analytics'

const initial: CallState = { status: 'idle' }

export function CallForm({ location = 'apel-gratuit', defaultService }: { location?: string; defaultService?: string }) {
  const [state, action, pending] = useActionState(submitCall, initial)
  const [offline, setOffline] = useState(false)
  const router = useRouter()
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const uid = useId()
  const id = (f: string) => `${uid}-${f}`

  useEffect(() => {
    if (state.status === 'success') {
      trackEvent('generate_lead', { form_location: location })
      router.push('/multumim')
    }
    if (state.status === 'error' && state.fieldErrors) {
      const first = (['name', 'phone', 'link', 'service', 'consent'] as CallField[]).find((f) => state.fieldErrors?.[f]?.length)
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    }
  }, [state, location, router])

  const err = (f: CallField) => state.fieldErrors?.[f]?.[0]
  const v = state.values ?? {}

  const field = 'mt-2 block w-full border-2 border-grey-500 bg-white px-4 py-3.5 text-base text-ink placeholder:text-grey-500 focus:border-violet-700 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-magenta-600 aria-[invalid=true]:border-magenta-600'
  const label = 'block font-bold'
  const errCls = 'mt-2 flex gap-1.5 text-[0.9375rem] font-semibold text-magenta-600'

  if (state.status === 'success') {
    // Shown without JS (progressive enhancement); with JS the router moves to /multumim.
    return (
      <div role="status" className="border-2 border-violet-700 bg-white p-8">
        <p className="text-2xl font-extrabold">Gata, am primit cererea ta.</p>
        <p className="mt-2 text-grey-700">Te sunăm de pe 0799 521 159.</p>
      </div>
    )
  }

  return (
    <form
      key={JSON.stringify(state.values ?? {})}
      ref={formRef}
      id="lead-form"
      action={action}
      noValidate
      className="grid gap-6"
      aria-describedby={state.status === 'error' && state.message ? id('summary') : undefined}
      onFocus={() => {
        if (!started.current) {
          started.current = true
          trackEvent('form_start', { form_location: location })
        }
      }}
      onSubmit={(e) => {
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
          e.preventDefault()
          setOffline(true)
        } else setOffline(false)
      }}
    >
      <div aria-live="polite" id={id('summary')}>
        {offline && <p className="border-l-4 border-magenta-600 bg-grey-100 p-4 font-semibold">Se pare că nu ai conexiune. Datele rămân completate; încearcă din nou când revii online.</p>}
        {!offline && state.status === 'error' && state.message && <p className="border-l-4 border-magenta-600 bg-grey-100 p-4 font-semibold">{state.message}</p>}
      </div>

      <input type="hidden" name="location" value={location} />
      <div className="sr-only-honeypot" aria-hidden="true">
        <label htmlFor={id('website')}>Nu completa acest câmp</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor={id('name')} className={label}>
          Cum te numești? <span className="text-magenta-600" aria-hidden="true">*</span>
        </label>
        <input id={id('name')} name="name" type="text" autoComplete="name" required defaultValue={v.name} placeholder="ex. Andrei Popescu" className={field} aria-invalid={!!err('name')} aria-describedby={err('name') ? id('name-e') : undefined} />
        {err('name') && <p id={id('name-e')} className={errCls}>{err('name')}</p>}
      </div>

      <div>
        <label htmlFor={id('phone')} className={label}>
          Numărul de telefon <span className="text-magenta-600" aria-hidden="true">*</span>
        </label>
        <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={v.phone} placeholder="ex. 07xx xxx xxx" className={field} aria-invalid={!!err('phone')} aria-describedby={err('phone') ? id('phone-e') : undefined} />
        {err('phone') && <p id={id('phone-e')} className={errCls}>{err('phone')}</p>}
      </div>

      <div>
        <label htmlFor={id('link')} className={label}>
          Instagramul sau site-ul afacerii <span className="font-normal text-grey-700">(opțional)</span>
        </label>
        <input id={id('link')} name="link" type="text" inputMode="url" autoComplete="url" defaultValue={v.link} placeholder="ex. instagram.com/afacereata" className={field} aria-invalid={!!err('link')} aria-describedby={err('link') ? id('link-e') : undefined} />
        {err('link') && <p id={id('link-e')} className={errCls}>{err('link')}</p>}
      </div>

      <div>
        <label htmlFor={id('service')} className={label}>
          Cu ce te putem ajuta? <span className="text-magenta-600" aria-hidden="true">*</span>
        </label>
        <select id={id('service')} name="service" required defaultValue={v.service ?? defaultService ?? ''} className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22><path d=%22M1 3l4 4 4-4%22 fill=%22none%22 stroke=%22%23B3166E%22 stroke-width=%221.6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`} aria-invalid={!!err('service')} aria-describedby={err('service') ? id('service-e') : undefined}>
          <option value="" disabled>
            Alege o opțiune
          </option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {err('service') && <p id={id('service-e')} className={errCls}>{err('service')}</p>}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id={id('consent')} name="consent" value="da" type="checkbox" required defaultChecked={v.consent === 'da'} className="mt-0.5 size-6 shrink-0 accent-violet-700" aria-invalid={!!err('consent')} aria-describedby={err('consent') ? id('consent-e') : undefined} />
          <label htmlFor={id('consent')} className="text-[0.9375rem]">
            Sunt de acord ca Heart Social să mă contacteze și să-mi prelucreze datele conform{' '}
            <Link href="/politica-de-confidentialitate" className="font-bold text-violet-700 underline underline-offset-2">
              Politicii de confidențialitate
            </Link>
            . <span className="text-magenta-600" aria-hidden="true">*</span>
          </label>
        </div>
        {err('consent') && <p id={id('consent-e')} className={errCls}>{err('consent')}</p>}
      </div>

      <div>
        <button type="submit" className="btn w-full sm:w-auto" disabled={pending}>
          {pending ? 'Se trimite…' : 'Rezervă apelul gratuit'} {!pending && <span className="chev" aria-hidden="true">›</span>}
        </button>
        <p className="mt-3 text-[0.9375rem] text-grey-700">Nu trimitem spam și nu dăm datele tale nimănui. Câmpurile marcate cu * sunt obligatorii.</p>
      </div>
    </form>
  )
}
