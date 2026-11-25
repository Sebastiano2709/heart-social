'use client'
// Re-mounts on every navigation. The fade runs only on in-app navigations (a click in the menu or on a link),
// never on the first load, so the first paint and LCP are untouched. Reduced motion → no animation (CSS).
import { useEffect, useState } from 'react'

let navigated = false

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => navigated)
  useEffect(() => {
    navigated = true
  }, [])
  return <div className={animate ? 'page-enter' : undefined}>{children}</div>
}
