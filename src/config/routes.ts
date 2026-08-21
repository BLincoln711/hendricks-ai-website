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
  //
  // The vocabulary set now covers two registers rather than one. The first two
  // entries define the Hendricks category in Hendricks language. The two that
  // follow define the buyer-facing entry terms, the words a buyer already types
  // before they have heard of Search Intelligence Engineering. A page cannot be
  // retrieved for a term it never contains, so the entry terms need routes of
  // their own. They are bridges into the category, not renames of it: no route
  // here describes a Hendricks service as GEO, AEO, or AI-mediated search work.
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
  whatIsAiMediatedSearch: {
    path: '/what-is-ai-mediated-search',
    label: 'What Is AI-Mediated Search?',
    indexable: true,
    built: true,
  },
  whatIsGenerativeEngineOptimization: {
    path: '/what-is-generative-engine-optimization',
    label: 'What Is Generative Engine Optimization?',
    indexable: true,
    built: true,
  },
  aiSelectionProblem: {
    path: '/ai-selection-problem',
    label: 'The AI Selection Problem',
    indexable: true,
    built: true,
  },

  /**
   * Buyer-decision route, cluster C10 (docs/17 §4.10, specified in §5.3). It
   * sits in `(editorial)` beside the definition pages, but it defines no term
   * and emits no `DefinedTerm` node.
   *
   * The path deliberately names a decision rather than a comparison. A URL that
   * promises a vendor ranking will be read as one, and docs/17 §4.11 X1 concedes
   * tool-comparison listicles outright.
   */
  aiVisibilityToolOrPartner: {
    path: '/ai-visibility-tool-or-partner',
    label: 'AI Visibility Tool or Partner',
    indexable: true,
    built: true,
  },
  methodology: { path: '/methodology', label: 'Methodology', indexable: true, built: true },

  /**
   * Research hub, shipped from `src/content/research/` rather than from Sanity.
   *
   * CONTENT_VERIFICATION.md R5 records this route as blocked on Sanity
   * credentials. docs/17 §7 wave 2.1 reverses that: the block was a sequencing
   * assumption rather than a credential, and the definition pages above had
   * already proved that version-controlled editorial content ships fine. A dated
   * measurement with a stated method is, if anything, the content that least
   * belongs behind an editor with no diff.
   *
   * The hub is deliberately absent from primary navigation.
   * `content/pages/12-research.md` gates that on publishing three category
   * foundation pages, and one study is not three. It is reachable from the
   * persistent footer research column, which renders on every route, and from
   * one body-content link, the related list on `/corrections`. That is
   * reachability, not promotion. It is thinner than the definition pages get,
   * and the open item is recorded below rather than assumed away: no commercial
   * or editorial page yet links to the research in body copy. Placement is the
   * answer-architect's call, and `/ai-selection-problem` is the page docs/17
   * wave 2.3 names as wanting the dated observation this study supplies. The
   * matching note sits on `primaryNavigation` in `src/config/navigation.ts`, and
   * the condition that reverses the navigation gate is three published
   * foundation pages.
   */
  research: { path: '/research', label: 'Research Hub', indexable: true, built: true },

  /**
   * The first research article.
   *
   * Registered by its concrete path even though it is served by the dynamic
   * `research/[slug]` segment, because the registry is what the sitemap,
   * `llms.txt`, and every `isBuilt`-filtered link list read. A dynamic pattern
   * registered here would advertise a literal `[slug]` URL to crawlers; leaving
   * the article unregistered would keep a published page out of the sitemap and
   * make it unlinkable from any related-content list. `scripts/check-links.ts`
   * resolves a concrete path against the dynamic directory that serves it.
   *
   * The slug is mirrored in `src/content/research/index.ts`, which reads `path`
   * from here rather than restating it. Adding an article means adding a route
   * entry and a registry entry, in that order.
   */
  researchHendricksSelectionBaseline: {
    path: '/research/hendricks-selection-baseline',
    label: 'Hendricks Selection Baseline',
    indexable: true,
    built: true,
  },

  /**
   * The answer-stability study.
   *
   * Registered the same way and for the same reasons as the article above: a
   * concrete path, because this registry is what the sitemap, `llms.txt`,
   * `check:links`, and every `isBuilt`-filtered link list read, and a dynamic
   * pattern here would advertise a literal `[slug]` URL to crawlers.
   *
   * Publishing this article and the citation-structure study alongside it brings
   * the section to three published assets. `content/pages/12-research.md` line
   * 88 gates primary navigation on three category FOUNDATION pages, which is a
   * different count from three studies, so `src/config/navigation.ts` is
   * deliberately untouched. Moving that gate is Brandon's decision, not a side
   * effect of shipping research.
   */
  researchAnswerStabilityTwoRuns: {
    path: '/research/answer-stability-two-runs',
    label: 'Answer Stability, Two Runs',
    indexable: true,
    built: true,
  },

  /**
   * The citation-set structure study, E1 in docs/17 §8.1.
   *
   * Registered by concrete path for the same reasons as the two articles above.
   * The slug names the buyer question rather than the measure, because the
   * question is what a reader types and the measure is what the page answers it
   * with.
   *
   * It reads the same run of record as the self-baseline study,
   * 2026-08-19-110930, for a different question. That page asks whether one
   * brand appeared in the citation set. This one describes the structure of the
   * set itself: how many domains filled how many slots, how little any of them
   * recurred, and how little the engines had in common. Two studies on one run
   * is not duplication as long as neither restates the other's answer, and the
   * two link to each other.
   */
  researchWhoGetsCitedInAiAnswers: {
    path: '/research/who-gets-cited-in-ai-answers',
    label: 'Who Gets Cited in AI Answers',
    indexable: true,
    built: true,
  },

  /**
   * The third research article.
   *
   * The two studies before this one read a citation set to ask who was in it.
   * This one makes the engines the subject and asks whether they agree, which is
   * the assumption every blended cross-engine visibility score rests on. It is
   * the first study in the section to publish an `errorsFound` section, because
   * two instrument defects were found while producing its run and both had
   * already generated a wrong reading.
   *
   * A fourth engine was probed in that run and nothing from it is published.
   * CONTENT_VERIFICATION A1 holds the observed set at three systems and
   * `src/content/shared/observed-systems.ts` states in visitor copy that
   * Hendricks does not report on Gemini. Widening that boundary is a scope
   * decision that lands in A1 and in the shared module first, never in an
   * article.
   */
  researchNoSharedSourceAcrossEngines: {
    path: '/research/no-shared-source-across-engines',
    label: 'No Shared Source Across Engines',
    indexable: true,
    built: true,
  },

  /**
   * Corrections policy and log.
   *
   * CONTENT_VERIFICATION.md R6 recorded this as blocked on missing copy rather
   * than on a credential, and docs/17 wave 0 item 0.4 costed the unblock at
   * roughly 200 words. The copy now exists in `src/content/pages/corrections.ts`
   * and the route is built, which turns on the footer legal link and repoints
   * the corrections link on every research article away from its `ctaHref`
   * fallback with no edit to the article.
   */
  corrections: { path: '/corrections', label: 'Corrections', indexable: true, built: true },

  // Feature-flagged off until verified case studies exist.
  results: { path: '/results', label: 'Results', indexable: false, built: false },

  // Legal routes. Approved copy arrived with the privacy and legal addendum;
  // remaining launch conditions are operational, not editorial, and are tracked
  // in CONTENT_VERIFICATION.md L6–L9.
  privacy: { path: '/privacy', label: 'Privacy Notice', indexable: true, built: true },
  terms: { path: '/terms', label: 'Terms of Use', indexable: true, built: true },
  /**
   * Linked from the footer and the Privacy Notice, never from primary
   * navigation (docs/16 §9). Left out of the sitemap because it is a
   * transactional form rather than a page worth ranking.
   */
  privacyRequest: {
    path: '/privacy-request',
    label: 'Privacy Request',
    indexable: false,
    built: true,
  },
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
