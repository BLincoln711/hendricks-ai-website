import { afterEach, describe, expect, it, vi } from 'vitest'

import { buildMetadata } from '@/lib/seo/metadata'

const originalEnv = process.env.NEXT_PUBLIC_VERCEL_ENV

afterEach(() => {
  process.env.NEXT_PUBLIC_VERCEL_ENV = originalEnv
  vi.resetModules()
})

describe('buildMetadata', () => {
  it('produces an absolute self-referencing canonical', () => {
    const metadata = buildMetadata({
      title: 'Selection Intelligence',
      description: 'Measure consideration.',
      path: '/solutions/selection-intelligence',
    })

    expect(metadata.alternates?.canonical).toBe(
      'https://hendricks.ai/solutions/selection-intelligence',
    )
  })

  it('marks nonproduction environments noindex even when the route is indexable', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview'

    const metadata = buildMetadata({
      title: 'Home',
      description: 'Home page.',
      path: '/',
      index: true,
    })

    expect(metadata.robots).toMatchObject({ index: false, follow: false })
  })

  it('indexes in production when the route allows it', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production'

    const metadata = buildMetadata({ title: 'Home', description: 'Home page.', path: '/' })

    expect(metadata.robots).toMatchObject({ index: true, follow: true })
  })

  it('never indexes a route that opts out, but still follows its links in production', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production'

    const metadata = buildMetadata({
      title: 'Studio',
      description: 'Content studio.',
      path: '/studio',
      index: false,
    })

    // `follow` is deliberately decoupled from `index`. A production route that
    // opts out of indexing still has outbound links worth crawling, and
    // `/privacy-request` links to `/privacy`.
    expect(metadata.robots).toMatchObject({ index: false, follow: true })
    expect(metadata.robots).toMatchObject({ googleBot: { index: false, follow: true } })
  })

  it('keeps a nonproduction opt-out route fully nofollow', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview'

    const metadata = buildMetadata({
      title: 'Studio',
      description: 'Content studio.',
      path: '/studio',
      index: false,
    })

    // The decoupling above is gated on the environment, so preview and
    // development stay exactly `noindex, nofollow` (docs/06 §2).
    expect(metadata.robots).toMatchObject({ index: false, follow: false })
    expect(metadata.robots).toMatchObject({ googleBot: { index: false, follow: false } })
  })

  it('emits an absolute title so the layout template cannot double-append the brand', () => {
    const metadata = buildMetadata({
      title: 'Search Intelligence Engineering for the AI Era | Hendricks',
      description: 'Home page.',
      path: '/',
    })

    expect(metadata.title).toEqual({
      absolute: 'Search Intelligence Engineering for the AI Era | Hendricks',
    })
  })

  it('carries title and description through to Open Graph and Twitter', () => {
    const metadata = buildMetadata({
      title: 'How It Works',
      description: 'The Demand-to-Selection System.',
      path: '/how-it-works',
    })

    expect(metadata.openGraph).toMatchObject({
      title: 'How It Works',
      description: 'The Demand-to-Selection System.',
      url: 'https://hendricks.ai/how-it-works',
    })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' })
  })
})
