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

  it('marks exactly the routes that have been built', () => {
    // Twelve commercial routes from Phase 4, the four definition pages from
    // Phase 6, and the three legal routes. Anything else in the registry is
    // still unbuilt, and this list is what stops a route being flagged built
    // before its page exists.
    const built = Object.values(routes)
      .filter((route) => route.built)
      .map((route) => route.path)
      .sort()

    expect(built).toEqual(
      [
        '/',
        '/about',
        '/ai-selection-problem',
        '/contact',
        '/diagnostic',
        '/for-agencies',
        '/for-brands',
        '/how-it-works',
        '/methodology',
        '/privacy',
        '/privacy-request',
        '/solutions',
        '/solutions/search-demand-intelligence',
        '/solutions/search-impact-measurement',
        '/solutions/search-presence-engineering',
        '/solutions/selection-intelligence',
        '/terms',
        '/what-is-search-intelligence-engineering',
        '/what-is-selection-intelligence',
      ].sort(),
    )
  })

  it('keeps the privacy request form out of the sitemap', () => {
    // docs/16 §9 — reachable from the footer and the Privacy Notice, but a
    // transactional form with no reason to compete in search results.
    expect(routes.privacyRequest.indexable).toBe(false)
    expect(indexableBuiltRoutes().map((route) => route.path)).not.toContain('/privacy-request')
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
    // /research is the live case: approved copy points at it and it has no page.
    expect(ctaHref('/research', '/methodology')).toBe('/methodology')
    expect(ctaHref('/not-a-route', '/methodology')).toBe('/methodology')
  })

  it('has no remaining fallback in use now the definition pages are built', () => {
    // Both homepage CTAs that shipped Phase 4 on a fallback should have reverted
    // to their canonical destination without a copy change.
    expect(ctaHref('/what-is-selection-intelligence', '/solutions/selection-intelligence')).toBe(
      '/what-is-selection-intelligence',
    )
    expect(ctaHref('/methodology', '/solutions/search-impact-measurement')).toBe('/methodology')
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
