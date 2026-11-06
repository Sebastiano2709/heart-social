// Showreel configuration (Stage 2 shot list). Each scene is data; swap text or media here, not in the engine.
// Media slots fall back to a code-made abstract visual when src is null. Never write "filmat de noi" over stock footage.

export type ChapterKey = 'local' | 'b2b' | 'solo'

export type MediaSlot = { src: string | null; srcMobile?: string; poster?: string; posterMobile?: string }

const slot = (name: string, mobile = true): MediaSlot => ({
  src: `/video/${name}.mp4`,
  poster: `/video/${name}.webp`,
  ...(mobile ? { srcMobile: `/video/${name}-m.mp4`, posterMobile: `/video/${name}-m.webp` } : {}),
})

export type Chapter = {
  key: ChapterKey
  name: string
  media: { A: MediaSlot; B: MediaSlot; C: MediaSlot }
}

// Stock clips from Pexels (free for commercial use, no attribution required; never imply the people
// shown are Heart Social clients). Trimmed to 5–6 s, graded alike, 1280×720 desktop / 720×900 mobile;
// C clips are 720×810 crops for the desktop split scene only (scene 7 does not run on mobile).
export const chapters: Chapter[] = [
  { key: 'local', name: 'Afaceri locale', media: { A: slot('local-a'), B: slot('local-b'), C: slot('local-c', false) } }, // latte art · frizerie · bucătărie
  { key: 'b2b', name: 'Companii B2B', media: { A: slot('b2b-a'), B: slot('b2b-b'), C: slot('b2b-c', false) } }, // echipă · bandă rulantă · prezentare
  { key: 'solo', name: 'Profesioniști independenți', media: { A: slot('solo-a'), B: slot('solo-b'), C: slot('solo-c', false) } }, // telefon pe trepied · sală · laptop
]

export type SceneKind = 'intro' | 'echo' | 'over' | 'typed' | 'zoom' | 'statement' | 'split' | 'breather' | 'count' | 'end'

export type Scene = { kind: SceneKind; ms: number; mobile: boolean }

export const scenes: Scene[] = [
  { kind: 'intro', ms: 2200, mobile: true },
  { kind: 'echo', ms: 2400, mobile: false },
  { kind: 'over', ms: 2400, mobile: true },
  { kind: 'typed', ms: 2600, mobile: true },
  { kind: 'zoom', ms: 1300, mobile: true },
  { kind: 'statement', ms: 2400, mobile: false },
  { kind: 'split', ms: 2600, mobile: false },
  { kind: 'breather', ms: 2400, mobile: false },
  { kind: 'count', ms: 2600, mobile: true },
  { kind: 'end', ms: 2600, mobile: true },
]

export const copy = {
  echo: 'REELS',
  overLabel: 'CARE OPRESC SCROLL-UL',
  typed: ['DIN', 'INIMĂ'],
  statement: ['DE LA IDEE', 'LA POSTARE'],
  split: { big: ['STRATEGIE', '+ EXECUȚIE'], small: 'un singur partener' },
  count: { figure: '5', label: ['SERVICII', 'SUB UN SINGUR ACOPERIȘ'] }, // swap to a [CIFRĂ REALĂ] when one exists
  summary:
    'Showreel Heart Social: Reels care opresc scroll-ul, conținut făcut din inimă, de la idee la postare, strategie și execuție, 5 servicii sub un singur acoperiș.',
}

/** Optional soundtrack (licensed instrumental). null = the sound button is not shown. */
export const soundtrack: string | null = process.env.NEXT_PUBLIC_PREVIEW_NO_MEDIA === '1' ? null : '/audio/heart-social-showreel.m4a' // Pixabay, DELOSound – Corporate Background Music (first 70 s, ≈ one full loop of the 3 chapters)
