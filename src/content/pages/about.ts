import type { RelatedEntry } from '@/components/canvas/related-list'
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
  /* The approved opening sentence, in the two-tone form. */
  leadTwoTone: {
    claim: 'Brandon Lincoln Hendricks is a Search Intelligence Engineer',
    continuation: 'and the founder of Hendricks.',
  },
  answerHeading: 'What Brandon Lincoln Hendricks has worked on',
  answerLabel: 'The direct answer',
} as const

export const pointOfView = {
  eyebrow: 'Point of View',
  title: 'That experience produced a clear point of view.',
  quote:
    'Search is not merely a traffic channel. It is a live record of customer demand, uncertainty, comparison, intent, and decision-making.',
  body: ['Hendricks is the next expression of that work.'],
  notListLabel: 'What Hendricks is not',
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

/**
 * CONTENT_VERIFICATION.md F3, F4, F5, F9 — updated 2026-08-17 from Brandon's
 * LinkedIn profile entries, which are the public record any reader can check.
 *
 * Titles and dates here follow LinkedIn verbatim. They do NOT match the career
 * record in ~/claudecode/CLAUDE-md-templates/brandon-facts.md, which lists
 * "Global Search Director" (Merkle / Dentsu) and "Global Director of Search"
 * (SolarWinds). LinkedIn shows "Global Paid Search Director" at Merkle and
 * "Global Search and Innovation Lead" at SolarWinds. The public record wins
 * for published copy; the memory file needs correcting separately.
 *
 * Employer is "Merkle" alone, not "Merkle and Dentsu" — LinkedIn records the
 * employment against Merkle. Merkle is a dentsu company, but that is a
 * corporate-parent fact, not a second employer.
 *
 * Both prior roles are labeled as employment per docs/12 §7 relationship
 * context. No client or employer logo appears; C1 stays blocked, and per
 * docs/12 §6 a client reached through a former employer is not claimed here.
 */
export const experience = {
  eyebrow: 'Experience',
  title: 'Where the Hendricks perspective was built.',
  lead: 'Two enterprise search leadership roles, held as an employee, and the firm that followed them.',
  roles: [
    {
      title: 'Global Paid Search Director',
      organization: 'Merkle',
      relationship: 'Employment',
      period: 'Jan 2022 to Dec 2023',
      description:
        'Directed cross functional teams and agency partners, allocating search investment across geographies to support full funnel performance and branding objectives. Refined campaign structure, audience segmentation, and bidding technique, working alongside Google, Microsoft, and Adobe on strategy and performance reporting.',
    },
    {
      title: 'Global Search and Innovation Lead',
      organization: 'SolarWinds',
      relationship: 'Employment',
      period: 'Apr 2024 to Sep 2025',
      description:
        'Drove strategy and execution for paid and organic search across global markets, focused on brand visibility, qualified lead generation, and search performance. Aligned search with business goals across cross functional teams, applying B2B approaches built for the era of AI.',
    },
    {
      title: 'Founder',
      organization: 'Hendricks',
      relationship: 'Current',
      period: 'Present',
      description:
        'These experiences formed the basis of the Search Intelligence Engineering perspective. Search is not just a channel to optimize. It is a data and signal system that must be engineered.',
    },
  ],
  /*
    The employment record renders as a real table inside a named, keyboard
    reachable scroll region. The head labels are information, so they are read
    rather than hidden, and the relationship column returns because the region
    scrolls rather than compressing.
  */
  tableCaption: 'Employment record: organization, role, period and relationship',
  tableNote:
    'Roles held, with organization, role, period and relationship. The table scrolls sideways on a narrow screen.',
  tableColumns: {
    index: 'No.',
    organization: 'Organization',
    role: 'Role',
    period: 'Period',
    relationship: 'Relationship',
  },
  capabilitiesLabel: 'Capability areas',
  researchLabel: 'Research',
  /*
    The one clause this page authors rather than transcribes, required by
    docs/03 section 6. Everything after the colon is the research hub's own lead
    verbatim, imported rather than retyped.
  */
  researchIntro: 'Hendricks publishes its research at the ',
  capabilitiesTitle: 'The capability areas behind Hendricks engagements.',
  items: [
    'Enterprise search leadership',
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

export const closingEyebrow = 'Closing'

export const related: readonly RelatedEntry[] = [
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
