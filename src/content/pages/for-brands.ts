import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { OperatingLayerParticipant } from '@/components/visuals/operating-layer'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/09-for-brands.md.
 *
 * The engagement types are listed without fees. CONTENT_VERIFICATION.md P2 and P3
 * are still `pending`, so the 90-Day Program and Managed Search Intelligence
 * price ranges must not be published.
 */

export const meta = {
  title: 'Search Intelligence Engineering for Brands and Companies | Hendricks',
  description:
    'Connect search demand, AI visibility, paid and organic acquisition, brand evidence, analytics, CRM, and revenue into one Demand-to-Selection System.',
} as const

export const hero = {
  eyebrow: 'For Brands',
  title: 'Turn fragmented search investment into a system for winning consideration.',
  lead: [
    'Your customer experiences one decision journey.',
    'Your organization may manage that journey through separate SEO, paid media, content, digital PR, analytics, AI visibility, website, sales, and agency workflows.',
    'Hendricks connects those fragments around customer demand and measurable selection.',
  ],
  primaryCta: {
    label: 'Start with a Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'for_brands_hero', audienceType: 'brand' },
  } satisfies Cta,
} as const

export const signals = {
  eyebrow: 'Signs of Fit',
  title: 'Signs Hendricks may be a fit.',
  items: [
    'Search materially influences customer research or shortlisting',
    'One customer, account, appointment, or transaction has meaningful value',
    'SEO, paid search, content, analytics, and AI visibility operate separately',
    'Executives receive channel reports but not one commercial narrative',
    'The organization is tracking citations without knowing which questions matter',
    'Competitors appear in valuable recommendations and the cause is unclear',
    'The company has strong expertise but weak digital evidence',
    'Measurement stops at traffic or leads',
    'The company wants specialized capability without replacing the internal team',
  ],
} as const

export const changes = {
  eyebrow: 'What Changes',
  title: 'Four kinds of clarity.',
  items: [
    {
      name: 'Demand clarity',
      description: 'Know which customer decisions matter and what they are potentially worth.',
    },
    {
      name: 'Selection clarity',
      description:
        'Know where the brand enters consideration, where it disappears, and which competitors win.',
    },
    {
      name: 'Action clarity',
      description:
        'Know which technical, content, evidence, authority, acquisition, or conversion changes deserve priority.',
    },
    {
      name: 'Measurement clarity',
      description:
        'Know what changed, what business outcomes followed, and how much confidence the evidence supports.',
    },
  ],
} as const

export const engagements = {
  eyebrow: 'Ways to Work Together',
  title: 'Four ways brands work with Hendricks.',
  items: [
    {
      name: 'Search Intelligence Diagnostic',
      description:
        'Establish demand, the selection baseline, priority gaps, and the 90-day roadmap.',
      href: routes.diagnostic.path,
      linkLabel: 'Explore the Diagnostic',
    },
    {
      name: '90-Day Demand-to-Selection Program',
      description: 'Implement and test the highest-value improvements.',
      href: routes.searchPresenceEngineering.path,
      linkLabel: 'See Search Presence Engineering',
    },
    {
      name: 'Managed Search Intelligence',
      description:
        'Continuously monitor demand, competitors, selection, interventions, and impact.',
      href: routes.selectionIntelligence.path,
      linkLabel: 'See Selection Intelligence',
    },
    {
      name: 'Specialist system build',
      description:
        'Architect a defined data, measurement, monitoring, or governed-agent capability for an internal team to operate.',
      href: routes.searchImpactMeasurement.path,
      linkLabel: 'See Search Impact Measurement',
    },
  ],
} as const

export const notReplaced = {
  eyebrow: 'Scope',
  title: 'What Hendricks does not replace by default.',
  lead: 'Hendricks does not automatically replace:',
  items: [
    'The internal search leader',
    'The SEO agency',
    'The paid-media agency',
    'The content team',
    'The analytics team',
    'The CRM owner',
    'The communications team',
  ],
  closing:
    'Hendricks can coordinate, augment, or provide specialist implementation according to the diagnostic and operating model.',
  participants: [
    { name: 'Your internal team', role: 'Owns the business, the brand, and the decision.' },
    { name: 'Your agencies', role: 'Continue to own their channels and execution.' },
    { name: 'Hendricks', role: 'Supplies the intelligence and engineering layer.' },
  ] satisfies readonly OperatingLayerParticipant[],
  layerName: 'One Demand-to-Selection operating layer',
  layerDescription:
    'Shared demand model, selection baseline, intervention roadmap, and measurement plan that every contributor works from.',
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.diagnostic.path,
    label: 'Search Intelligence Diagnostic',
    description: 'The fixed-scope entry engagement for direct clients.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The six stages from customer need to measured impact.',
  },
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four solutions and what each one produces.',
  },
  {
    href: routes.forAgencies.path,
    label: 'For Agencies',
    description:
      'How an agency answers a client asking why the brand is not in ChatGPT, and what it should not promise.',
  },
]

export const closing = {
  title:
    'See where valuable demand is becoming customer consideration, and where it is not.',
  primaryCta: {
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'for_brands_closing', audienceType: 'brand' },
  } satisfies Cta,
} as const
