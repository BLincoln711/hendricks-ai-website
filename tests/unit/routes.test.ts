import { describe, expect, it } from 'vitest'

import { ctaHref, indexableBuiltRoutes, isBuilt, routes } from '@/config/routes'
import { footerNavigation, legalNavigation, primaryNavigation } from '@/config/navigation'

describe('Route registry', () => {
  it('uses unique paths', () => {
    const paths = Object.values(routes).map((route) => route.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('starts every path with a slash and never ends with one', () => {
    for (const route of Object.values(routes)) {
      expect(route.path.startsWith('/'), route.path).toBe(true)
      expect(route.path === '/' || !route.path.endsWith('/'), route.path).toBe(true)
    }
  })

  it('marks the twelve Phase 4 routes as built', () => {
    const built = Object.values(routes)
      .filter((route) => route.built)
      .map((route) => route.path)
      .sort()

    expect(built).toEqual(
      [
        '/',
        '/about',
        '/contact',
        '/diagnostic',
        '/for-agencies',
        '/for-brands',
        '/how-it-works',
        '/solutions',
        '/solutions/search-demand-intelligence',
        '/solutions/search-impact-measurement',
        '/solutions/search-presence-engineering',
        '/solutions/selection-intelligence',
      ].sort(),
    )
  })

  it('keeps the flagged Results route out of the sitemap', () => {
    expect(routes.results.indexable).toBe(false)
    expect(indexableBuiltRoutes().map((route) => route.path)).not.toContain('/results')
  })

  it('lists only built routes in the sitemap', () => {
    for (const route of indexableBuiltRoutes()) {
      expect(route.built, route.path).toBe(true)
    }
  })
})

describe('isBuilt', () => {
  it('recognises built routes and rejects unbuilt or unknown ones', () => {
    expect(isBuilt('/solutions/selection-intelligence')).toBe(true)
    expect(isBuilt('/research')).toBe(false)
    expect(isBuilt('/not-a-route')).toBe(false)
  })
})

describe('ctaHref', () => {
  it('prefers the canonical destination once that route is built', () => {
    expect(ctaHref('/diagnostic', '/contact')).toBe('/diagnostic')
  })

  it('falls back while the canonical destination is unbuilt', () => {
    expect(ctaHref('/what-is-selection-intelligence', '/solutions/selection-intelligence')).toBe(
      '/solutions/selection-intelligence',
    )
  })
})

describe('Navigation link integrity', () => {
  const internalHrefs = [
    ...primaryNavigation.flatMap((item) => [item.href, ...(item.children?.map((c) => c.href) ?? [])]),
    ...Object.values(footerNavigation).flatMap((column) => column.items.map((item) => item.href)),
    ...legalNavigation.map((item) => item.href),
  ].filter((href) => href.startsWith('/'))

  it('never links to a route that does not exist yet', () => {
    for (const href of internalHrefs) {
      expect(isBuilt(href), `navigation links to unbuilt route: ${href}`).toBe(true)
    }
  })

  it('still exposes the four solutions and the audience pages', () => {
    expect(internalHrefs).toContain('/solutions/search-demand-intelligence')
    expect(internalHrefs).toContain('/solutions/selection-intelligence')
    expect(internalHrefs).toContain('/solutions/search-presence-engineering')
    expect(internalHrefs).toContain('/solutions/search-impact-measurement')
    expect(internalHrefs).toContain('/for-brands')
    expect(internalHrefs).toContain('/for-agencies')
  })
})
