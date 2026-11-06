// Field rules for the call-request form (Stage 3 copy). Kept outside actions.ts: a 'use server'
// file may only export async functions.
import { z } from 'zod'

export const SERVICE_OPTIONS = ['Social media', 'Ședințe foto/video', 'Editare Reels', 'Website', 'Campanii Ads', 'Nu știu încă, vreau un sfat'] as const

const LINK_RE = /^(@[\w.]{1,30}|(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?)$/i

export const CallSchema = z.object({
  name: z.string().trim().min(2, 'Spune-ne cum te numești.').max(100, 'Numele e prea lung.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Avem nevoie de numărul tău ca să te sunăm.')
    .refine((v) => /^[+()\d\s.-]+$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 9 && (v.match(/\d/g)?.length ?? 0) <= 15, 'Numărul pare incomplet. Verifică-l, te rog (ex. 0712 345 678).'),
  link: z.union([z.literal(''), z.string().trim().max(200).regex(LINK_RE, 'Linkul nu pare corect. Îl poți lăsa și gol.')]),
  service: z.enum(SERVICE_OPTIONS, { error: 'Alege o opțiune, chiar și „Nu știu încă”.' }),
  consent: z.literal('da', { error: 'Bifează acordul ca să te putem contacta.' }),
  location: z.string().trim().max(60).default('apel-gratuit'),
  website: z.string().max(0).optional(), // honeypot — filled only by bots
})

export type CallField = 'name' | 'phone' | 'link' | 'service' | 'consent'

export type CallState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<CallField, string[]>>
  values?: Partial<Record<'name' | 'phone' | 'link' | 'service' | 'consent', string>>
}
