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
      { label: 'The AI Selection Problem', href: routes.aiSelectionProblem.path },
      { label: 'Methodology', href: routes.methodology.path },
    ]),
  },
} as const

export const legalNavigation = built([
  { label: 'Privacy', href: routes.privacy.path },
  { label: 'Terms', href: routes.terms.path },
  { label: 'Corrections', href: routes.corrections.path },
])
