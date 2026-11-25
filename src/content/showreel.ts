// Showreel configuration (Stage 2 shot list). Each scene is data; swap text or media here, not in the engine.
// Media slots fall back to a code-made abstract visual when src is null. Never write "filmat de noi" over stock footage.

export type ChapterKey = 'local' | 'b2b' | 'solo'

export type MediaSlot = { src: string | null; srcMobile?: string; srcLarge?: string; poster?: string; posterMobile?: string }

// large: a 2560×1440 file exists, encoded from a 4K source (never upscaled). Served only to big, sharp screens.
const slot = (name: string, { mobile = true, large = false }: { mobile?: boolean; large?: boolean } = {}): MediaSlot => ({
  src: `/video/${name}.mp4`,
  poster: `/video/${name}.webp`,
  ...(mobile ? { srcMobile: `/video/${name}-m.mp4`, posterMobile: `/video/${name}-m.webp` } : {}),
  ...(large ? { srcLarge: `/video/${name}-hd.mp4` } : {}),
})

export type Chapter = {
  key: ChapterKey
  media: { A: MediaSlot; B: MediaSlot; C: MediaSlot }
}

// Stock clips from Pexels (free for commercial use, no attribution required; never imply the people
// shown are Heart Social clients). Trimmed to 5–6 s, graded alike: 1920×1080 desktop / 864×1080 mobile /
// 2560×1440 large (4K sources only); C clips are 960×1080 crops for the desktop split scene only.
export const chapters: Chapter[] = [
  { key: 'local', media: { A: slot('local-a', { large: true }), B: slot('local-b', { large: true }), C: slot('local-c', { mobile: false }) } }, // latte art · frizerie · bucătărie
  { key: 'b2b', media: { A: slot('b2b-a'), B: slot('b2b-b', { large: true }), C: slot('b2b-c', { mobile: false }) } }, // echipă · depozit · ședință
  { key: 'solo', media: { A: slot('solo-a'), B: slot('solo-b'), C: slot('solo-c', { mobile: false }) } }, // telefon pe trepied · sală · laptop
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

export type ReelCopy = {
  chapters: Record<ChapterKey, string>
  echo: string
  overLabel: string
  typed: string[]
  statement: string[]
  split: { big: [string, string]; small: string }
  count: { figure: string; label: [string, string] }
  /** First frame (poster still, also shown with reduced motion): three lines, the middle one outlined. */
  still: [string, string, string]
  summary: string
}

export const reelCopy: Record<'ro' | 'en', ReelCopy> = {
  ro: {
    chapters: { local: 'Afaceri locale', b2b: 'Companii B2B', solo: 'Profesioniști independenți' },
    echo: 'REELS',
    overLabel: 'CARE OPRESC SCROLL-UL',
    typed: ['DIN', 'INIMĂ'],
    statement: ['DE LA IDEE', 'LA POSTARE'],
    split: { big: ['STRATEGIE', '+ EXECUȚIE'], small: 'un singur partener' },
    count: { figure: '5', label: ['SERVICII', 'SUB UN SINGUR ACOPERIȘ'] }, // a fact (5 services), not a result claim
    still: ['REELS CARE', 'OPRESC', 'SCROLL-UL'],
    summary: 'Showreel Heart Social: Reels care opresc scroll-ul, conținut făcut din inimă, de la idee la postare, strategie și execuție, 5 servicii sub un singur acoperiș.',
  },
  en: {
    chapters: { local: 'Local businesses', b2b: 'B2B companies', solo: 'Independent professionals' },
    echo: 'REELS',
    overLabel: 'THAT STOP THE SCROLL',
    typed: ['FROM THE', 'HEART'],
    statement: ['FROM IDEA', 'TO POST'],
    split: { big: ['STRATEGY', '+ EXECUTION'], small: 'one single partner' },
    count: { figure: '5', label: ['SERVICES', 'UNDER ONE ROOF'] },
    still: ['REELS THAT', 'STOP', 'THE SCROLL'],
    summary: 'Heart Social showreel: Reels that stop the scroll, content made from the heart, from idea to post, strategy and execution, 5 services under one roof.',
  },
}

/** Optional soundtrack (licensed instrumental). null = the sound button is not shown. */
export const soundtrack: string | null = process.env.NEXT_PUBLIC_PREVIEW_NO_MEDIA === '1' ? null : '/audio/heart-social-showreel.m4a' // Pixabay, DELOSound – Corporate Background Music (first 70 s, ≈ one full loop of the 3 chapters)
