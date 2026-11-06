// Preview-only submit handler (NEXT_PUBLIC_PREVIEW=1): used by the static artifact preview, which has no
// server. Runs the same Zod validation in the browser and stores nothing. Never used in production builds.
import { z } from 'zod'
import { CallSchema, type CallState } from './schema'

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '')

export async function previewSubmit(_prev: CallState, formData: FormData): Promise<CallState> {
  const values = {
    name: str(formData.get('name')).trim(),
    phone: str(formData.get('phone')).trim(),
    link: str(formData.get('link')).trim(),
    service: str(formData.get('service')),
    consent: str(formData.get('consent')),
  }
  const parsed = CallSchema.safeParse({
    ...values,
    location: str(formData.get('location')) || 'apel-gratuit',
    website: str(formData.get('website')) || undefined,
  })
  if (!parsed.success) {
    if (parsed.error.issues.some((i) => i.path[0] === 'website')) return { status: 'success' }
    return { status: 'error', message: 'Te rugăm să verifici câmpurile marcate.', fieldErrors: z.flattenError(parsed.error).fieldErrors, values }
  }
  await new Promise((r) => setTimeout(r, 600))
  return { status: 'success' }
}
