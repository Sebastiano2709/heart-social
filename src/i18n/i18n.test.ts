import { describe, expect, it } from 'vitest'
import { alternatesFor, localePath, stripLocale } from './config'
import { negotiate } from '@/proxy'
import { getUi } from './ui'
import { homeCopy } from './pages/home'
import { serviceContent } from '@/content/services'

describe('locale helpers', () => {
  it('prefixes and strips paths', () => {
    expect(localePath('ro', '/')).toBe('/ro')
    expect(localePath('en', '/servicii')).toBe('/en/servicii')
    expect(stripLocale('/en/servicii/editare-reels')).toBe('/servicii/editare-reels')
    expect(stripLocale('/ro')).toBe('/')
    expect(stripLocale('/english')).toBe('/english')
  })
  it('builds hreflang alternates with x-default on /', () => {
    expect(alternatesFor('en', '/despre-noi')).toEqual({ canonical: '/en/despre-noi', languages: { ro: '/ro/despre-noi', en: '/en/despre-noi', 'x-default': '/' } })
  })
})

describe('Accept-Language negotiation', () => {
  it.each([
    [null, 'ro'],
    ['', 'ro'],
    ['en-GB,en;q=0.9', 'en'],
    ['de-DE,de;q=0.9,en;q=0.5', 'en'],
    ['ro-RO,ro;q=0.9,en;q=0.8', 'ro'],
    ['en;q=0.4,ro;q=0.8', 'ro'],
    ['fr,de', 'ro'],
    ['en;q=0', 'ro'],
  ])('%s → %s', (header, expected) => {
    expect(negotiate(header)).toBe(expected)
  })
})

// Recursively compare the shape (keys and array lengths) of the reference ro copy with en.
const shape = (v: unknown): unknown =>
  Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).sort().map(([k, x]) => [k, shape(x)])) : typeof v

describe('English copy has the same structure as Romanian', () => {
  it('ui', () => expect(shape(getUi('en'))).toEqual(shape(getUi('ro'))))
  it('home', () => expect(shape(homeCopy.en)).toEqual(shape(homeCopy.ro)))
  it('services', () => expect(shape(serviceContent.en)).toEqual(shape(serviceContent.ro)))
})
