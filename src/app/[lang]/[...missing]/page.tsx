import { notFound } from 'next/navigation'

// Any URL under /ro or /en that matches no page renders [lang]/not-found.tsx inside the localized layout.
// The [lang] layout sets dynamicParams = false; this segment must stay dynamic so unknown paths reach it.
export const dynamicParams = true

export default function Missing() {
  notFound()
}
