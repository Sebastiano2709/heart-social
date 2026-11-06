import { ImageResponse } from 'next/og'

export const alt = 'Heart Social — Agenție de promovare online, București'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: 'linear-gradient(125deg,#4A1477 0%,#7A2BB8 48%,#D81B7F 100%)', color: '#fff' }}>
        <div style={{ fontSize: 28, letterSpacing: 6, fontWeight: 700, opacity: 0.9 }}>HEART SOCIAL · BUCUREȘTI</div>
        <div style={{ fontSize: 104, lineHeight: 1, marginTop: 24, fontWeight: 800, display: 'flex', flexDirection: 'column' }}>
          <span>Din inimă,</span>
          <span>cu rezultate.</span>
        </div>
        <div style={{ fontSize: 30, marginTop: 36 }}>Rezervă-ți un apel gratuit · 0799 521 159</div>
      </div>
    ),
    size,
  )
}
