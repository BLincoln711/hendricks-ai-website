import type { RelatedLink } from '@/components/sections/related-links'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/17-contact.md.
 *
 * The inquiry form is Phase 5. It is blocked on two items in
 * CONTENT_VERIFICATION.md, neither of which can be resolved in code:
 *
 * - L3, form consent language: no approved consent wording exists.
 * - L1, privacy notice: the consent copy has to link to a published notice.
 *
 * The field list and confirmation copy therefore stay in the approved markdown
 * rather than being rendered with invented consent text.
 */

export const meta = {
  title: 'Discuss a Search Intelligence System | Hendricks',
  description:
    'Tell Hendricks what your brand or agency needs to understand, improve, measure, or build across traditional and AI-mediated search.',
} as const

export const hero = {
  eyebrow: 'Start the Right Conversation',
  title: 'What decision can your current search system not answer?',
  lead: [
    'Tell Hendricks what your brand or agency needs to understand, improve, measure, or build.',
    'We will review the context, determine whether a Search Intelligence Diagnostic is the appropriate first step, and say directly when a simpler solution would be better.',
  ],
} as const

type RoutingChoice = {
  name: string
  description: string
  href?: string
  linkLabel?: string
}

export const routing = {
  eyebrow: 'Routing',
  title: 'Every inquiry is routed by what you need.',
  prompt: 'What decision can your current search, AI-visibility, or data system not answer?',
  choices: [
    {
      name: 'Brand or company',
      description:
        'Search materially affects a valuable purchase, shortlist, appointment, demo, or customer relationship.',
      href: routes.forBrands.path,
      linkLabel: 'How Hendricks works with brands',
    },
    {
      name: 'Digital marketing agency',
      description:
        'You need a specialist intelligence and engineering layer that protects your client relationship.',
      href: routes.forAgencies.path,
      linkLabel: 'Partnership models',
    },
    {
      name: 'Media or speaking inquiry',
      description: 'Commentary, research, or a speaking request.',
    },
    {
      name: 'Other',
      description: 'Anything that does not fit the categories above.',
    },
  ] satisfies readonly RoutingChoice[],
} as const

export const expectations = {
  eyebrow: 'What Happens Next',
  title: 'Your inquiry is reviewed for fit.',
  body: [
    'The next response will identify the most appropriate next step—not place you into a generic automated sales sequence.',
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.diagnostic.path,
    label: 'Search Intelligence Diagnostic',
    description: 'The fixed-scope engagement most direct relationships begin with.',
  },
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four solutions and what each one produces.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The six stages from customer need to measured impact.',
  },
]
