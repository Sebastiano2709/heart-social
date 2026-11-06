'use client'
// Sticky call bar on mobile. Hides while the lead form is on screen so it never covers the submit button.
import { useEffect, useState } from 'react'
import { TrackedA } from './interactive'
import { IconPhone, IconWhatsApp } from './icons'
import { telHref, whatsappHref } from '@/lib/site'

export function MobileCallBar() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const form = document.getElementById('lead-form')
    if (!form || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((e) => setHidden(e.some((x) => x.isIntersecting)))
    io.observe(form)
    return () => io.disconnect()
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 shadow-[0_-6px_20px_rgba(22,20,26,.12)] transition-transform lg:hidden ${hidden ? 'translate-y-full' : ''}`} inert={hidden}>
      <TrackedA href={telHref} event="click_call" location="mobile-bar" className="flex min-h-14 items-center justify-center gap-2 bg-charcoal text-[0.8125rem] font-extrabold uppercase tracking-[0.1em] text-white no-underline">
        <IconPhone className="size-5" /> Sună
      </TrackedA>
      <TrackedA href={whatsappHref} event="click_whatsapp" location="mobile-bar" external className="flex min-h-14 items-center justify-center gap-2 bg-whatsapp text-[0.8125rem] font-extrabold uppercase tracking-[0.1em] text-white no-underline">
        <IconWhatsApp className="size-5" /> WhatsApp
      </TrackedA>
    </div>
  )
}
