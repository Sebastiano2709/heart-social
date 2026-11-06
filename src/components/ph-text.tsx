import { Fragment } from 'react'

/** Renders text, highlighting any [PLACEHOLDER] parts so missing facts stay visible. */
export function PhText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((p, i) => (p.startsWith('[') && p.endsWith(']') ? <span key={i} className="ph">{p}</span> : <Fragment key={i}>{p}</Fragment>))}
    </>
  )
}
