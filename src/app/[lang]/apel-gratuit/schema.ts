// Field rules for the call-request form. Kept outside actions.ts: a 'use server' file may only export
// async functions. Error messages follow the page locale; stored option values stay Romanian so the
// lead e-mail and the database read the same whatever language the visitor used.
import { z } from 'zod'
import type { Locale } from '@/i18n/config'

export const SERVICE_OPTIONS = ['Social media', 'Ședințe foto/video', 'Editare Reels', 'Website', 'Campanii Ads', 'Nu știu încă, vreau un sfat'] as const

const LINK_RE = /^(@[\w.]{1,30}|(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?)$/i

const messages = {
  ro: {
    nameMin: 'Spune-ne cum te numești.',
    nameMax: 'Numele e prea lung.',
    phoneMin: 'Avem nevoie de numărul tău ca să te sunăm.',
    phoneBad: 'Numărul pare incomplet. Verifică-l, te rog (ex. 0712 345 678).',
    link: 'Linkul nu pare corect. Îl poți lăsa și gol.',
    service: 'Alege o opțiune, chiar și „Nu știu încă”.',
    consent: 'Bifează acordul ca să te putem contacta.',
    check: 'Te rugăm să verifici câmpurile marcate.',
    failure: (phone: string) => `Nu am putut trimite cererea. Încearcă din nou sau sună-ne direct la ${phone}.`,
    unavailable: (phone: string) => `Momentan nu putem primi cereri prin formular. Sună-ne la ${phone}.`,
    tooMany: 'Ai trimis prea multe cereri într-un timp scurt. Încearcă din nou peste câteva minute.',
  },
  en: {
    nameMin: 'Tell us your name.',
    nameMax: 'That name is too long.',
    phoneMin: 'We need your number so we can call you.',
    phoneBad: 'The number looks incomplete. Please check it (e.g. +40 712 345 678).',
    link: 'That link doesn’t look right. You can also leave it empty.',
    service: 'Choose an option, even “Not sure yet”.',
    consent: 'Tick the box so we’re allowed to contact you.',
    check: 'Please check the highlighted fields.',
    failure: (phone: string) => `We couldn’t send your request. Try again or call us directly on ${phone}.`,
    unavailable: (phone: string) => `We can’t take requests through the form right now. Call us on ${phone}.`,
    tooMany: 'You’ve sent too many requests in a short time. Please try again in a few minutes.',
  },
} satisfies Record<Locale, Record<string, unknown>>

export const formMessages = (lang: Locale) => messages[lang]

export const callSchema = (lang: Locale) => {
  const m = messages[lang]
  return z.object({
    name: z.string().trim().min(2, m.nameMin).max(100, m.nameMax),
    phone: z
      .string()
      .trim()
      .min(1, m.phoneMin)
      .refine((v) => /^[+()\d\s.-]+$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 9 && (v.match(/\d/g)?.length ?? 0) <= 15, m.phoneBad),
    link: z.union([z.literal(''), z.string().trim().max(200).regex(LINK_RE, m.link)]),
    service: z.enum(SERVICE_OPTIONS, { error: m.service }),
    consent: z.literal('da', { error: m.consent }),
    location: z.string().trim().max(60).default('apel-gratuit'),
    website: z.string().max(0).optional(), // honeypot — filled only by bots
  })
}

/** Romanian schema, kept for existing callers and tests. */
export const CallSchema = callSchema('ro')

export type CallField = 'name' | 'phone' | 'link' | 'service' | 'consent'

export type CallState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<CallField, string[]>>
  values?: Partial<Record<'name' | 'phone' | 'link' | 'service' | 'consent', string>>
}
