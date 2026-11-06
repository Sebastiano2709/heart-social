'use client'
// Hero showreel: a code-built sequence (no baked video) so text stays crisp, editable and indexable.
// Engine = timer + keyed scenes; every animation is CSS (transform / opacity / clip-path only).
// Reduced motion → static composition. Pause button pauses the reel and the logo marquee (WCAG 2.2.2).
import './showreel.css'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { chapters, copy, scenes, soundtrack, type Chapter, type ChapterKey, type MediaSlot, type Scene } from '@/content/showreel'
import { HEART_PATH, heartFacets, shards } from '@/lib/lowpoly'
import { IconSpark } from './icons'

const FACETS = heartFacets()
const BG_SHARDS = shards(1600, 900, 18, 11, 0.5)

/* ---------------- media ---------------- */

const fallbackGlyphs: Record<ChapterKey, ReactNode[]> = {
  // line-art stand-ins until stock clips arrive: cup / scissors / flame · building / boxes / easel · phone / dumbbell / laptop
  local: [
    <path key="a" d="M14 22h22v10a11 11 0 01-22 0zM36 25h4a4 4 0 010 8h-4M18 12c0-3 3-3 3-6M26 12c0-3 3-3 3-6" />,
    <path key="b" d="M16 14a5 5 0 110 0.1M16 38a5 5 0 110 0.1M20 17l20 18M20 35l20-18" />,
    <path key="c" d="M24 42c-8 0-12-6-12-12 0-8 8-10 8-20 6 4 6 10 6 12 2-2 3-4 3-6 4 4 7 8 7 14 0 6-4 12-12 12z" />,
  ],
  b2b: [
    <path key="a" d="M10 42V10h18v32M28 20h10v22M14 16h4M22 16h0M14 24h4M14 32h4M32 28h2M32 34h2M6 42h36" />,
    <path key="b" d="M8 26l10-5 10 5v12l-10 5-10-5zM18 21v22M28 18l10-5 6 3v10l-6 3M20 14l10-5 8 4" />,
    <path key="c" d="M8 10h32v20H8zM24 30v8M18 42l6-4 6 4M14 24l6-6 5 4 7-8" />,
  ],
  solo: [
    <path key="a" d="M16 6h16v36H16zM22 38h4M20 18l8 5-8 5z" />,
    <path key="b" d="M6 20v8M10 16v16M14 22h20M38 16v16M42 20v8" />,
    <path key="c" d="M10 12h28v20H10zM4 36h40l-3 4H7z" />,
  ],
}

function FallbackVisual({ chapter, slot }: { chapter: ChapterKey; slot: 'A' | 'B' | 'C' }) {
  const idx = slot === 'A' ? 0 : slot === 'B' ? 1 : 2
  return (
    <div className={`reel-fallback reel-fallback--${slot}`} aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="reel-fallback__shards">
        {BG_SHARDS.map((s, i) => (
          <polygon key={i} points={s.points} fill={s.fill} opacity={s.opacity} />
        ))}
      </svg>
      <svg viewBox="0 0 48 48" className="reel-fallback__glyph" fill="none" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        {fallbackGlyphs[chapter][idx]}
      </svg>
    </div>
  )
}

// Mobile flag + data-saver flag, set by the engine (avoids prop-drilling through every scene).
const env = { mobile: false, lite: false }

const pick = (slot: MediaSlot) => (env.mobile && slot.srcMobile ? { src: slot.srcMobile, poster: slot.posterMobile ?? slot.poster } : { src: slot.src, poster: slot.poster })

function Media({ slot, chapter, which, rate = 1 }: { slot: MediaSlot; chapter: ChapterKey; which: 'A' | 'B' | 'C'; rate?: number }) {
  if (!slot.src) return <FallbackVisual chapter={chapter} slot={which} />
  const { src, poster } = pick(slot)
  // Data saver / slow connection: still frame only.
  // eslint-disable-next-line @next/next/no-img-element
  if (env.lite) return <img className="reel-video" src={poster} alt="" aria-hidden="true" />
  return (
    <video
      className="reel-video"
      src={src ?? undefined}
      poster={poster}
      muted
      playsInline
      autoPlay
      loop
      preload="auto"
      aria-hidden="true"
      ref={(v) => {
        if (v) v.playbackRate = rate
      }}
    />
  )
}

/** Warms the browser cache with the clips of the current and next chapter so hard cuts never show a blank frame. */
function Preload({ chapterIdx }: { chapterIdx: number }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const go = () => window.setTimeout(() => setReady(true), 1500)
    if (document.readyState === 'complete') {
      const id = go()
      return () => clearTimeout(id)
    }
    window.addEventListener('load', go, { once: true })
    return () => window.removeEventListener('load', go)
  }, [])
  if (env.lite || !ready) return null
  const list = [chapters[chapterIdx], chapters[(chapterIdx + 1) % chapters.length]].flatMap((c) =>
    c ? (['A', 'B', 'C'] as const).map((k) => c.media[k]).filter((s) => s.src && (!env.mobile || s.srcMobile)) : [],
  )
  return (
    <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
      {list.map((s) => {
        const { src } = pick(s)
        return src ? <video key={src} src={src} muted playsInline preload="auto" /> : null
      })}
    </div>
  )
}

/* ---------------- motion clips M1–M5 (code-made) ---------------- */

function M1Phone() {
  const posts = ['#3A0F63', '#7A2BB8', '#48464D', '#B3166E', '#5E1B94', '#6E6B73', '#A3208F']
  return (
    <div className="m1" aria-hidden="true">
      <div className="m1__phone">
        <div className="m1__feed">
          {posts.map((c, i) => (
            <div key={i} className="m1__post">
              <span className="m1__thumb" style={{ background: `linear-gradient(135deg, ${c}, #16141A)` }} />
              <span className="m1__line" />
              <span className="m1__line m1__line--short" />
            </div>
          ))}
          <div className="m1__post m1__post--hero">
            <span className="m1__thumb" style={{ background: 'var(--grad-heart)' }}>
              <svg viewBox="0 0 24 24" className="m1__play">
                <path d="M8 5l11 7-11 7z" fill="#fff" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function M2Viewfinder() {
  return (
    <div className="m2" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="m2__bg">
        {BG_SHARDS.map((s, i) => (
          <polygon key={i} points={s.points} fill={s.fill} opacity={s.opacity * 0.8} />
        ))}
      </svg>
      <div className="m2__grid" />
      <span className="m2__corner m2__corner--tl" />
      <span className="m2__corner m2__corner--tr" />
      <span className="m2__corner m2__corner--bl" />
      <span className="m2__corner m2__corner--br" />
      <span className="m2__focus" />
      <span className="m2__rec">
        <i /> REC
      </span>
      <span className="m2__tc">00:00:12:08</span>
    </div>
  )
}

function M3Timeline() {
  const tracks = [
    ['#7A2BB8', 18, '#B3166E', 26, '#5E1B94', 22, '#D81B7F', 30],
    ['#48464D', 30, '#6E6B73', 20, '#48464D', 34, '#6E6B73', 16],
    ['#C7A6EE', 12, '#F59AC8', 40, '#C7A6EE', 24, '#F59AC8', 20],
  ] as const
  return (
    <div className="m3" aria-hidden="true">
      <div className="m3__tracks">
        {tracks.map((t, i) => (
          <div key={i} className="m3__track" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
            {[0, 2, 4, 6].map((k) => (
              <span key={k} className="m3__clip" style={{ background: t[k] as string, flexGrow: t[k + 1] as number }} />
            ))}
          </div>
        ))}
      </div>
      <span className="m3__playhead" />
    </div>
  )
}

function M4Site() {
  return (
    <div className="m4" aria-hidden="true">
      <div className="m4__browser">
        <div className="m4__bar">
          <i />
          <i />
          <i />
        </div>
        <div className="m4__page">
          <span className="m4__b m4__b--nav" />
          <span className="m4__b m4__b--h1" />
          <span className="m4__b m4__b--h1b" />
          <span className="m4__b m4__b--btn" />
          <span className="m4__b m4__b--card" />
          <span className="m4__b m4__b--card" />
          <span className="m4__b m4__b--card" />
        </div>
      </div>
    </div>
  )
}

function M5Logo() {
  return (
    <div className="m5" aria-hidden="true">
      <svg viewBox="0 0 100 92" className="m5__heart">
        <defs>
          <clipPath id="m5clip">
            <path d={HEART_PATH} />
          </clipPath>
        </defs>
        <g clipPath="url(#m5clip)">
          {FACETS.map((t, i) => (
            <polygon key={i} points={t.points} fill={t.fill} stroke={t.fill} strokeWidth={0.4} className="m5__facet" style={{ '--i': i, '--dx': `${((i * 37) % 120) - 60}px`, '--dy': `${((i * 53) % 120) - 60}px`, '--rot': `${((i * 29) % 160) - 80}deg` } as CSSProperties} />
          ))}
        </g>
        <g fill="#fff" className="m5__h">
          <rect x="36" y="27" width="8" height="34" />
          <rect x="56" y="27" width="8" height="34" />
          <rect x="36" y="40" width="28" height="7" />
        </g>
      </svg>
      <span className="m5__word">HEART SOCIAL</span>
    </div>
  )
}

/* ---------------- scenes ---------------- */

function Chars({ text, className, step }: { text: string; className?: string; step: number }) {
  return (
    <span className={className}>
      {[...text].map((ch, i) => (
        <span key={i} style={{ '--i': i, '--step': `${step}ms` } as CSSProperties} className="reel-ch">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

function SceneView({ scene, chapter }: { scene: Scene; chapter: Chapter }) {
  const m = chapter.media
  switch (scene.kind) {
    case 'intro':
      return (
        <div className="sc sc-intro">
          <span className="sc-intro__name">{chapter.name}</span>
        </div>
      )
    case 'echo':
      return (
        <div className="sc sc-echo">
          <div className="reel-gridlines" />
          <M1Phone />
          <div className="sc-echo__stack">
            {[3, 2, 1].map((k) => (
              <span key={k} className="sc-echo__o" style={{ '--k': k } as CSSProperties}>
                {copy.echo}
              </span>
            ))}
            <span className="sc-echo__f">{copy.echo}</span>
          </div>
        </div>
      )
    case 'over':
      return (
        <div className="sc sc-over">
          <Media slot={m.A} chapter={chapter.key} which="A" />
          <div className="sc-over__shade" />
          <span className="sc-over__big">{copy.echo}</span>
          <span className="sc-over__label">{copy.overLabel}</span>
        </div>
      )
    case 'typed':
      return (
        <div className="sc sc-typed">
          <IconSpark className="sc-spark" />
          <div className="sc-typed__text sc-typed__outline">
            {copy.typed.map((line, l) => (
              <Chars key={line} text={line} step={45} className={`sc-typed__line sc-typed__line--${l}`} />
            ))}
          </div>
          <div className="sc-typed__text sc-typed__mask">
            {copy.typed.map((line) => (
              <span key={line} className="sc-typed__line">
                {line}
              </span>
            ))}
          </div>
        </div>
      )
    case 'zoom':
      return (
        <div className="sc sc-zoom">
          <div className="sc-zoom__full">
            <Media slot={m.B} chapter={chapter.key} which="B" />
          </div>
          <div className="sc-typed__text sc-typed__mask sc-zoom__mask">
            {copy.typed.map((line) => (
              <span key={line} className="sc-typed__line">
                {line}
              </span>
            ))}
          </div>
        </div>
      )
    case 'statement':
      return (
        <div className="sc sc-statement">
          <M2Viewfinder />
          <IconSpark className="sc-spark sc-spark--burst" />
          <div className="sc-statement__text">
            {copy.statement.map((line, l) => (
              <Chars key={line} text={line} step={55} className={`sc-statement__line sc-statement__line--${l}`} />
            ))}
          </div>
        </div>
      )
    case 'split':
      return (
        <div className="sc sc-split">
          <div className="sc-split__left">
            <span className="sc-split__big">
              {copy.split.big[0]}
              <br />
              {copy.split.big[1]}
            </span>
            <span className="sc-split__small">{copy.split.small}</span>
          </div>
          <div className="sc-split__right">
            <Media slot={m.C} chapter={chapter.key} which="C" />
          </div>
        </div>
      )
    case 'breather':
      return (
        <div className="sc sc-breather">
          <div className="sc-breather__a">
            <M3Timeline />
          </div>
          <div className="sc-breather__b">
            <M4Site />
          </div>
        </div>
      )
    case 'count':
      return (
        <div className="sc sc-count">
          <div className="sc-count__left">
            <IconSpark className="sc-spark sc-spark--small" />
            <Chars text={copy.count.figure} step={140} className="sc-count__fig" />
            <span className="sc-count__label">
              {copy.count.label[0]}
              <br />
              {copy.count.label[1]}
            </span>
          </div>
          <div className="sc-count__right">
            <Media slot={m.A} chapter={chapter.key} which="A" rate={0.6} />
          </div>
        </div>
      )
    case 'end':
      return (
        <div className="sc sc-end">
          <M5Logo />
        </div>
      )
  }
}

/* ---------------- static (no JS / reduced motion / first paint) ---------------- */

function StaticFrame() {
  // First paint = a full-frame still (the LCP element). Later video frames are the same size, so they do not
  // replace it as LCP. Poster of chapter 1, clip A.
  const first = chapters[0]?.media.A
  return (
    <div className="sc sc-static">
      {first?.poster ? (
        <picture>
          {first.posterMobile && <source media="(max-width: 767px)" srcSet={first.posterMobile} />}
          <img className="reel-video" src={first.poster} alt="" fetchPriority="high" decoding="async" />
        </picture>
      ) : (
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="reel-fallback__shards" aria-hidden="true">
          {BG_SHARDS.map((s, i) => (
            <polygon key={i} points={s.points} fill={s.fill} opacity={s.opacity} />
          ))}
        </svg>
      )}
      <div className="sc-static__shade" />
      <IconSpark className="sc-spark" />
      <p className="sc-static__text">
        <span>REELS CARE</span>
        <span className="sc-static__outline">OPRESC</span>
        <span>SCROLL-UL</span>
      </p>
    </div>
  )
}

/* ---------------- engine ---------------- */

export function Showreel() {
  const [mode, setMode] = useState<'static' | 'play'>('static')
  const [paused, setPaused] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [pos, setPos] = useState({ ch: 0, sc: 0 })
  const [muted, setMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const timer = useRef<{ id: number | null; started: number; remaining: number }>({ id: null, started: 0, remaining: 0 })
  const visible = useRef(true)

  const list = useMemo(() => scenes.filter((s) => !mobile || s.mobile), [mobile])

  // Decide mode after hydration (reduced motion stays static).
  useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)')
    const mq = matchMedia('(max-width: 767px)')
    const apply = () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
      env.mobile = mq.matches
      env.lite = process.env.NEXT_PUBLIC_PREVIEW_NO_MEDIA === '1' || !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')
      setMobile(mq.matches)
      setMode(rm.matches ? 'static' : 'play')
    }
    const t = window.setTimeout(apply, 700) // let the static first frame be the LCP, then start
    rm.addEventListener('change', apply)
    mq.addEventListener('change', apply)
    return () => {
      clearTimeout(t)
      rm.removeEventListener('change', apply)
      mq.removeEventListener('change', apply)
    }
  }, [])

  const next = useCallback(() => {
    setPos((p) => {
      const sc = p.sc + 1
      return sc >= list.length ? { ch: (p.ch + 1) % chapters.length, sc: 0 } : { ch: p.ch, sc }
    })
  }, [list.length])

  const clear = () => {
    if (timer.current.id !== null) clearTimeout(timer.current.id)
    timer.current.id = null
  }

  const arm = useCallback(
    (ms: number) => {
      clear()
      timer.current.started = performance.now()
      timer.current.remaining = ms
      timer.current.id = window.setTimeout(next, ms)
    },
    [next],
  )

  const running = mode === 'play' && !paused

  // Schedule the current scene.
  useEffect(() => {
    if (mode !== 'play') return
    const scene = list[pos.sc] ?? list[0]
    if (!scene) return
    if (!paused && visible.current) arm(scene.ms)
    else timer.current.remaining = scene.ms
    return clear
  }, [pos, mode, list, arm, paused])

  // Pause / resume preserves the remaining time of the scene.
  const setPausedAndSync = (p: boolean) => {
    setPaused(p)
    document.documentElement.classList.toggle('motion-paused', p)
    rootRef.current?.querySelectorAll('video').forEach((v) => (p ? v.pause() : void v.play().catch(() => {})))
    if (p) {
      timer.current.remaining = Math.max(0, timer.current.remaining - (performance.now() - timer.current.started))
      clear()
      audioRef.current?.pause()
    } else {
      if (mode === 'play') arm(timer.current.remaining || 1)
      if (!muted) void audioRef.current?.play().catch(() => setMuted(true))
    }
  }

  // Off-screen or hidden tab: stop work.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      visible.current = !!e?.isIntersecting
      if (!running) return
      if (!visible.current) {
        timer.current.remaining = Math.max(0, timer.current.remaining - (performance.now() - timer.current.started))
        clear()
      } else arm(timer.current.remaining || 1)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [running, arm])

  const scene = list[pos.sc] ?? list[0]!
  const chapter = chapters[pos.ch]!

  const toggleSound = () => {
    const a = audioRef.current
    if (!a) return
    if (muted) {
      a.muted = false
      void a.play().then(() => setMuted(false)).catch(() => setMuted(true))
    } else {
      a.pause()
      setMuted(true)
    }
  }

  return (
    <section className="reel-wrap" aria-label="Showreel Heart Social">
      <p className="sr-only">{copy.summary}</p>
      <div ref={rootRef} className={`reel ${paused ? 'reel--paused' : ''}`} aria-hidden="true">
        {mode === 'static' ? <StaticFrame /> : <SceneView key={`${pos.ch}-${pos.sc}-${mobile ? 'm' : 'd'}`} scene={scene} chapter={chapter} />}
        {mode === 'play' && <Preload chapterIdx={pos.ch} />}
      </div>
      <div className="reel-ctrl">
        {soundtrack && mode === 'play' && (
          <>
            <audio ref={audioRef} src={soundtrack} loop preload="none" />
            <button type="button" className="reel-btn" aria-pressed={!muted} onClick={toggleSound}>
              <span className="sr-only">{muted ? 'Pornește sunetul' : 'Oprește sunetul'}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
                {muted ? <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" /> : <path d="M16 8a5 5 0 010 8M18.5 5.5a9 9 0 010 13" stroke="currentColor" strokeWidth="2" fill="none" />}
              </svg>
            </button>
          </>
        )}
        <button type="button" className="reel-btn" aria-pressed={paused} onClick={() => setPausedAndSync(!paused)}>
          <span className="sr-only">{paused ? 'Pornește din nou animațiile' : 'Pune pe pauză animațiile'}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {paused ? <path d="M7 4l13 8-13 8z" fill="currentColor" /> : (
              <>
                <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" fill="currentColor" />
              </>
            )}
          </svg>
        </button>
      </div>
    </section>
  )
}
