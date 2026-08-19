import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { PartnershipModel } from '@/components/visuals/partnership-models'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/10-for-agencies.md.
 *
 * The markdown's "Agency inquiry" field list belongs to the agency inquiry form,
 * which is Phase 5 and blocked on approved consent language
 * (CONTENT_VERIFICATION.md L3).
 *
 * This page states no observed-systems boundary of its own and never has, so
 * docs/17 §3.5 left it out of the five pages that carry one. It does sell "AI
 * visibility and citation analysis" to a reseller, which is the audience least
 * able to check the scope for itself, so `related` links the canonical surfaces
 * table on `/what-is-ai-mediated-search`. A related card is a pointer, not a
 * scope statement: if this page is ever to bound its own capability list, the
 * boundary has to be approved into the markdown, not implied by a link.
 */

export const meta = {
  title: 'Search Intelligence Partner for Digital Marketing Agencies | Hendricks',
  description:
    'Add demand intelligence, AI-selection analysis, search presence engineering, measurement, data, and governed-agent capabilities without building the full practice in-house.',
} as const

export const hero = {
  eyebrow: 'For Digital Marketing Agencies',
  title: 'Add Search Intelligence to your agency without building the entire capability in-house.',
  lead: ['Your clients are asking:'],
  clientQuestions: [
    'Why are competitors appearing in AI recommendations?',
    'Which prompts and questions actually matter?',
    'How should AI search, SEO, paid media, content, and PR work together?',
    'How do we measure business impact?',
    'Should we buy software, build internally, or change our operating model?',
  ],
  closing: [
    'Your existing team should not have to invent every answer alone.',
    'Hendricks provides a specialized intelligence and engineering layer while protecting the agency relationship.',
  ],
  primaryCta: {
    label: 'Discuss an Agency Partnership',
    href: routes.contact.path,
    analytics: { location: 'for_agencies_hero', audienceType: 'agency' },
  } satisfies Cta,
} as const

export const models = {
  eyebrow: 'Partnership Models',
  title: 'Four models. Ownership defined before delivery.',
  items: [
    {
      name: 'White-label specialist',
      description:
        'Hendricks delivers under the agency’s brand, communication structure, and account leadership.',
      bestFor: 'Agencies protecting one unified client experience.',
    },
    {
      name: 'Embedded intelligence lead',
      description:
        'Hendricks joins strategy, technical, data, or client meetings as an extension of the agency team.',
      bestFor: 'Enterprise accounts and temporary capability gaps.',
    },
    {
      name: 'Co-branded partner',
      description:
        'Both organizations are visible, with responsibilities and ownership defined in advance.',
      bestFor: 'Complex engagements where specialist authority supports the sale.',
    },
    {
      name: 'System builder',
      description:
        'Hendricks architects and deploys a repeatable Search Intelligence capability that the agency can operate.',
      bestFor: 'Agencies building a durable new service line.',
    },
  ] satisfies readonly PartnershipModel[],
} as const

export const capabilities = {
  eyebrow: 'Capabilities',
  title: 'What an agency can draw on.',
  items: [
    'Search Demand Intelligence',
    'Selection Intelligence',
    'AI visibility and citation analysis',
    'Technical search architecture',
    'Entity and brand-understanding analysis',
    'Decision-content architecture',
    'Search Presence Engineering',
    'Paid and organic Total Search',
    'Search impact measurement',
    'BigQuery and data engineering',
    'Governed monitoring agents',
    'Executive reporting',
    'Client workshops',
    'White-label research',
  ],
} as const

export const commitments = {
  eyebrow: 'Partner Commitments',
  title: 'The protections that come with the partnership.',
  items: [
    'No client solicitation or circumvention',
    'No undisclosed upselling',
    'Branding and communication ownership defined in advance',
    'Agency retains the client relationship',
    'NDA and data-access terms established before delivery',
    'Documented scope, assumptions, outputs, and acceptance criteria',
    'Implementation documentation provided to the agency',
    'Honest disclosure when a simpler solution is sufficient',
    'No fabricated results or guaranteed citation claims',
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four capabilities an agency can bring to a client engagement.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The delivery system behind every partnership model.',
  },
  {
    href: routes.forBrands.path,
    label: 'For Brands',
    description: 'How Hendricks works with direct clients.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'The research standards your clients will be shown.',
  },
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: routes.whatIsAiMediatedSearch.label,
    description: 'See which AI systems Hendricks observes, and which it does not.',
  },
]

export const closing = {
  title: 'Strengthen the capability your clients increasingly expect.',
  primaryCta: {
    label: 'Discuss an Agency Intelligence Partnership',
    href: routes.contact.path,
    analytics: { location: 'for_agencies_closing', audienceType: 'agency' },
  } satisfies Cta,
} as const
