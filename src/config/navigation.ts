import { features } from './feature-flags'
import { isBuilt, routes } from './routes'

export type NavigationItem = {
  label: string
  href: string
  description?: string
  children?: NavigationItem[]
}

/**
 * Primary navigation (docs/03 §2).
 *
 * Deliberately excluded: The Search Economy, Platform, and Pricing. The Search
 * Economy is an external publication and may appear only inside Brandon's
 * biography on /about.
 *
 * Every list is filtered through `isBuilt` so navigation never advertises a
 * route that does not exist yet. Without this, Next.js prefetches the link on
 * hover and the browser records a 404. Entries defined here reappear
 * automatically when their route lands — the editorial routes arrive in Phase 6.
 */
function built(items: NavigationItem[]): NavigationItem[] {
  return items.filter((item) => isBuilt(item.href))
}

export const solutionsNavigation: NavigationItem[] = built([
  {
    label: 'Search Demand Intelligence',
    href: routes.searchDemandIntelligence.path,
    description: 'Know which customer decisions are worth winning.',
  },
  {
    label: 'Selection Intelligence',
    href: routes.selectionIntelligence.path,
    description: 'Know when your brand enters the shortlist.',
  },
  {
    label: 'Search Presence Engineering',
    href: routes.searchPresenceEngineering.path,
    description: 'Build the conditions that make your brand easier to recommend.',
  },
  {
    label: 'Search Impact Measurement',
    href: routes.searchImpactMeasurement.path,
    description: 'Connect visibility with outcomes the business can defend.',
  },
])

export const primaryNavigation: NavigationItem[] = built([
  { label: 'Solutions', href: routes.solutions.path, children: solutionsNavigation },
  { label: 'How It Works', href: routes.howItWorks.path },
  { label: 'For Brands', href: routes.forBrands.path },
  { label: 'For Agencies', href: routes.forAgencies.path },
  { label: 'Research', href: routes.research.path },
  { label: 'About', href: routes.about.path },
])

/** Footer architecture (docs/03 §8). Results appears only when enabled. */
export const footerNavigation = {
  solutions: {
    heading: 'Solutions',
    items: built([
      ...solutionsNavigation.map(({ label, href }) => ({ label, href })),
      { label: 'Search Intelligence Diagnostic', href: routes.diagnostic.path },
    ]),
  },
  audiences: {
    heading: 'Who We Help',
    items: built([
      { label: 'For Brands', href: routes.forBrands.path },
      { label: 'For Agencies', href: routes.forAgencies.path },
    ]),
  },
  company: {
    heading: 'Company',
    items: built([
      { label: 'How It Works', href: routes.howItWorks.path },
      { label: 'About', href: routes.about.path },
      { label: 'Contact', href: routes.contact.path },
      ...(features.showResults ? [{ label: 'Results', href: routes.results.path }] : []),
    ]),
  },
  /**
   * Definition pages live here rather than in primary navigation.
   *
   * Primary navigation is the commercial path and every entry on it is a page a
   * buyer converts from. The definition pages are read before a buyer knows what
   * Hendricks is called, so they belong in the persistent footer, which appears
   * on every route and therefore gives each one a sitewide internal link. The
   * two entry-vocabulary pages are listed on the same terms as the four that
   * preceded them: reachability, not promotion.
   */
  research: {
    heading: 'Research',
    items: built([
      { label: 'Research Hub', href: routes.research.path },
      {
        label: 'What Is Search Intelligence Engineering?',
        href: routes.whatIsSearchIntelligenceEngineering.path,
      },
      {
        label: 'What Is Selection Intelligence?',
        href: routes.whatIsSelectionIntelligence.path,
      },
      {
        label: 'What Is AI-Mediated Search?',
        href: routes.whatIsAiMediatedSearch.path,
      },
      {
        label: 'What Is Generative Engine Optimization?',
        href: routes.whatIsGenerativeEngineOptimization.path,
      },
      { label: 'The AI Selection Problem', href: routes.aiSelectionProblem.path },
      {
        label: 'AI Visibility Tool or Partner',
        href: routes.aiVisibilityToolOrPartner.path,
      },
      { label: 'Methodology', href: routes.methodology.path },
    ]),
  },
} as const

/**
 * Footer legal row (legal/01 §11).
 *
 * Deliberately omits a "Do Not Sell or Share My Personal Information" link:
 * Hendricks neither sells personal information nor shares it for cross-context
 * behavioral advertising at launch, so the link would misdescribe the site. It
 * becomes required before any advertising, retargeting, or audience-matching
 * technology is introduced.
 *
 * The Privacy Choices control is not listed here because it is a button that
 * reopens the consent manager, not a route.
 */
export const legalNavigation = built([
  { label: 'Privacy Notice', href: routes.privacy.path },
  { label: 'Terms of Use', href: routes.terms.path },
  { label: 'Privacy Request', href: routes.privacyRequest.path },
  { label: 'Corrections', href: routes.corrections.path },
])
