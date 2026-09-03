import type { RelatedEntry } from '@/components/canvas/related-list'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * One contributor in the operating-layer figure.
 *
 * The type moved here from `visuals/operating-layer.tsx` when the canvas
 * conversion deleted that component; nothing else read it.
 */
export type OperatingLayerParticipant = {
  name: string
  role: string
}

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
    label: 'Start with a Search Intelligence Diagnostic',
    href: routes.diagnostic.path,
    analytics: { location: 'for_brands_hero', audienceType: 'brand' },
  } satisfies Cta,
  /*
    The answer-first block. All three approved lead sentences still render: the
    first two open the hero as one two-tone sentence, and the third is the
    direct answer, which is the sentence a reader or a crawler quotes.
  */
  leadTwoTone: {
    claim: 'Your customer experiences one decision journey.',
    continuation:
      'Your organization may manage that journey through separate SEO, paid media, content, digital PR, analytics, AI visibility, website, sales, and agency workflows.',
  },
  answerHeading: 'The direct answer',
} as const

/** The page's own outline, in the order the stations render. */
export const contents = [
  { id: 'signals', label: 'Signs of fit' },
  { id: 'changes', label: 'What changes' },
  { id: 'engagements', label: 'Ways to work together' },
  { id: 'scope', label: 'What Hendricks does not replace' },
  { id: 'next', label: 'Where to go next' },
] as const

export const signals = {
  eyebrow: 'Signs of Fit',
  title: 'Signs Hendricks may be a fit.',
  cta: {
    label: 'Check whether the Diagnostic is the right first step',
    href: `${routes.diagnostic.path}#fit`,
    analytics: { location: 'for_brands_signals', audienceType: 'brand' },
  } satisfies Cta,
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
  /*
    Each kind of clarity resolves to a named artifact from the Method (CANON
    section 3). The canvas conversion renders that artifact as the row's third
    field rather than leaving the reader to infer which deliverable carries it.
  */
  items: [
    {
      name: 'Demand clarity',
      description: 'Know which customer decisions matter and what they are potentially worth.',
      artifact: 'Demand Map',
    },
    {
      name: 'Selection clarity',
      description:
        'Know where the brand enters consideration, where it disappears, and which competitors win.',
      artifact: 'Selection Map',
    },
    {
      name: 'Action clarity',
      description:
        'Know which technical, content, evidence, authority, acquisition, or conversion changes deserve priority.',
      artifact: 'Intervention Roadmap',
    },
    {
      name: 'Measurement clarity',
      description:
        'Know what changed, what business outcomes followed, and how much confidence the evidence supports.',
      artifact: 'Impact Ledger',
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
  figure: { number: 'Figure 01', caption: 'Figure 01. Three contributors, one operating layer.' },
} as const

export const relatedTitle = 'Where to go next.'

export const related: readonly RelatedEntry[] = [
  {
    href: routes.diagnostic.path,
    label: 'Search Intelligence Diagnostic',
    description: 'The fixed-scope entry engagement for direct clients.',
    kind: routes.diagnostic.path,
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The six stages from customer need to measured impact.',
    kind: routes.howItWorks.path,
  },
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four solutions and what each one produces.',
    kind: routes.solutions.path,
  },
  {
    href: routes.forAgencies.path,
    label: 'For Agencies',
    description:
      'How an agency answers a client asking why the brand is not in ChatGPT, and what it should not promise.',
    kind: routes.forAgencies.path,
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
