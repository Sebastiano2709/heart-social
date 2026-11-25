'use client'
// Locale + the interface strings client components need (header, consent, form, reel, CTA).
// Page copy is rendered by Server Components and never shipped through this context (03 §8.7.4).
import { createContext, useContext, type ReactNode } from 'react'
import type { Locale } from './config'
import type { Ui } from './ui'

export type ClientUi = Pick<Ui, 'newTab' | 'header' | 'consent' | 'reel' | 'form' | 'mobileBar' | 'notFound'> & {
  cta: { primary: string; short: string; sub: string }
  nav: { home: string; services: string; allServices: string; portfolio: string; about: string }
  services: { slug: string; name: string }[]
  phone: string
  whatsapp: string
}

const Ctx = createContext<{ lang: Locale; ui: ClientUi } | null>(null)

export function I18nProvider({ lang, ui, children }: { lang: Locale; ui: ClientUi; children: ReactNode }) {
  return <Ctx.Provider value={{ lang, ui }}>{children}</Ctx.Provider>
}

export function useI18n() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>')
  return v
}
