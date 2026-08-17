import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/11-about.md.
 *
 * Two deliberate omissions, both required by docs/12 §7 and tracked in
 * CONTENT_VERIFICATION.md:
 *
 * - No named employer, title, date, advisory role, or speaking credential
 *   appears. The markdown itself instructs that these be verified first
 *   (F3–F7). The experience section therefore presents capability areas, which
 *   the approved hero copy already states, rather than an unverified timeline.
 * - No client or employer logo wall (C1, blocked).
 */

export const meta = {
  title: 'Brandon Lincoln Hendricks, Search Intelligence Engineer | Hendricks',
  description:
    'Meet Brandon Lincoln Hendricks, founder of Hendricks and a Search Intelligence Engineer working across demand, search, AI visibility, analytics, and business impact.',
} as const

export const hero = {
  eyebrow: 'About Brandon Lincoln Hendricks',
  title: 'Built From Search. Engineered for What Comes Next.',
  // CONTENT_VERIFICATION.md F1, F9.
  lead: [
    'Brandon Lincoln Hendricks is a Search Intelligence Engineer and the founder of Hendricks.',
    'For more than fifteen years, Brandon has worked across paid search, organic search, analytics, enterprise search strategy, content and landing-page systems, AI-mediated visibility, data infrastructure, and cross-functional operating models.',
  ],
  portrait: {
    src: '/images/brandon-lincoln-hendricks-portrait.jpg',
    alt: 'Brandon Lincoln Hendricks, founder of Hendricks',
    width: 660,
    height: 819,
  },
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'about_hero' },
  } satisfies Cta,
} as const

export const pointOfView = {
  eyebrow: 'Point of View',
  title: 'That experience produced a clear point of view.',
  quote:
    'Search is not merely a traffic channel. It is a live record of customer demand, uncertainty, comparison, intent, and decision-making.',
  body: ['Hendricks is the next expression of that work.'],
  notList: ['Not another channel agency.', 'Not a prompt-tracking dashboard.', 'Not a general automation shop.'],
  closing:
    'Hendricks engineers systems that help organizations understand demand, enter valuable consideration, act on evidence, and measure the business result.',
} as const

export const principles = {
  eyebrow: 'Operating Principles',
  title: 'Five principles that decide how the work is done.',
  items: [
    {
      name: 'Demand before prompts',
      description:
        'Do not begin with what is easy to track. Begin with what customers actually need.',
    },
    {
      name: 'Evidence before claims',
      description:
        'A strong conclusion should show the source, method, assumptions, and limitations.',
    },
    {
      name: 'Systems before disconnected tactics',
      description:
        'Content, SEO, paid media, analytics, PR, and AI visibility should work from one customer-demand model.',
    },
    {
      name: 'Human judgment remains responsible',
      description:
        'AI can monitor, classify, prepare, and route. People remain accountable for strategy and consequential decisions.',
    },
    {
      name: 'Business impact without false precision',
      description:
        'Use the strongest available evidence. Do not invent certainty where the data cannot provide it.',
    },
  ],
} as const

export const experience = {
  eyebrow: 'Experience',
  title: 'The capability areas behind Hendricks engagements.',
  items: [
    'Enterprise search leadership',
    'Total Search operating models',
    'Paid and organic acquisition',
    'Analytics and attribution',
    'Data and AI systems',
    'Advisory and educational roles',
  ],
} as const

/** docs/13 §9 — About page only. Never described as a Hendricks solution. */
export const externalVenture = {
  label: 'Also founded by Brandon',
  name: 'The Search Economy',
  description:
    'Brandon is also the founder of The Search Economy, an independent publication that analyzes and contextualizes Google Trends data to document what captured public attention and what the search behavior may reveal.',
  cta: {
    label: 'Visit The Search Economy',
    href: 'https://thesearcheconomy.com',
    external: true,
    analytics: { location: 'about_external_venture' },
  } satisfies Cta,
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The Demand-to-Selection System Brandon architects against.',
  },
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four solutions and what each one produces.',
  },
  {
    href: routes.diagnostic.path,
    label: 'Search Intelligence Diagnostic',
    description: 'The fixed-scope engagement that starts most direct relationships.',
  },
]

export const closing = {
  title: 'Bring Hendricks the search question your current stack cannot answer.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'about_closing' },
  } satisfies Cta,
} as const
