/**
 * Canonical route paths (docs/03 §3).
 *
 * Centralised so that navigation, content objects, the sitemap, and the link
 * checker all read the same strings. `built` marks whether the route exists in
 * the app today; the sitemap and link checker use it so an unbuilt route can
 * never be advertised to crawlers or linked from a page.
 */
export type RouteDefinition = {
  path: string
  /** Short label used in breadcrumbs and related-content lists. */
  label: string
  indexable: boolean
  built: boolean
}

export const routes = {
  home: { path: '/', label: 'Home', indexable: true, built: true },

  solutions: { path: '/solutions', label: 'Solutions', indexable: true, built: true },
  searchDemandIntelligence: {
    path: '/solutions/search-demand-intelligence',
    label: 'Search Demand Intelligence',
    indexable: true,
    built: true,
  },
  selectionIntelligence: {
    path: '/solutions/selection-intelligence',
    label: 'Selection Intelligence',
    indexable: true,
    built: true,
  },
  searchPresenceEngineering: {
    path: '/solutions/search-presence-engineering',
    label: 'Search Presence Engineering',
    indexable: true,
    built: true,
  },
  searchImpactMeasurement: {
    path: '/solutions/search-impact-measurement',
    label: 'Search Impact Measurement',
    indexable: true,
    built: true,
  },

  diagnostic: {
    path: '/diagnostic',
    label: 'Search Intelligence Diagnostic',
    indexable: true,
    built: true,
  },
  howItWorks: { path: '/how-it-works', label: 'How It Works', indexable: true, built: true },
  forBrands: { path: '/for-brands', label: 'For Brands', indexable: true, built: true },
  forAgencies: { path: '/for-agencies', label: 'For Agencies', indexable: true, built: true },
  about: { path: '/about', label: 'About', indexable: true, built: true },
  contact: { path: '/contact', label: 'Contact', indexable: true, built: true },

  // Definition pages (HEN-0604). Version-controlled rather than in Sanity, which
  // docs/11 permits and which keeps the category vocabulary off the CMS critical path.
  whatIsSearchIntelligenceEngineering: {
    path: '/what-is-search-intelligence-engineering',
    label: 'What Is Search Intelligence Engineering?',
    indexable: true,
    built: true,
  },
  whatIsSelectionIntelligence: {
    path: '/what-is-selection-intelligence',
    label: 'What Is Selection Intelligence?',
    indexable: true,
    built: true,
  },
  aiSelectionProblem: {
    path: '/ai-selection-problem',
    label: 'The AI Selection Problem',
    indexable: true,
    built: true,
  },
  methodology: { path: '/methodology', label: 'Methodology', indexable: true, built: true },

  // Remainder of Phase 6 — blocked on Sanity credentials.
  research: { path: '/research', label: 'Research Hub', indexable: true, built: false },
  corrections: { path: '/corrections', label: 'Corrections', indexable: true, built: false },

  // Feature-flagged off until verified case studies exist.
  results: { path: '/results', label: 'Results', indexable: false, built: false },

  // Awaiting counsel — CONTENT_VERIFICATION.md L1/L2.
  privacy: { path: '/privacy', label: 'Privacy', indexable: true, built: false },
  terms: { path: '/terms', label: 'Terms', indexable: true, built: false },
} as const satisfies Record<string, RouteDefinition>

export type RouteKey = keyof typeof routes

/** Every route that should appear in sitemap.xml. */
export function indexableBuiltRoutes(): RouteDefinition[] {
  return Object.values(routes).filter((route) => route.built && route.indexable)
}

export function isBuilt(path: string): boolean {
  return Object.values(routes).some((route) => route.path === path && route.built)
}

/**
 * Resolves a CTA destination while its canonical route is still unbuilt.
 *
 * Approved copy sometimes points a CTA at an editorial route that does not land
 * until Phase 6. Recording the canonical target here, rather than rewriting the
 * content object, means the link works today and reverts to its intended
 * destination the moment that route is marked `built` — no copy change required.
 */
export function ctaHref(canonical: string, fallback: string): string {
  return isBuilt(canonical) ? canonical : fallback
}
