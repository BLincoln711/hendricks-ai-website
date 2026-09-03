import type { RelatedEntry } from '@/components/canvas/related-list'
import { routes } from '@/config/routes'

/**
 * Approved copy, transcribed from content/pages/17-contact.md.
 *
 * The inquiry form itself is Phase 5. Its legal model is settled: docs/16 §7
 * removed the bundled privacy-consent checkbox in favour of a notice at
 * collection, and the approved wording for both now lives in `formLegal` below
 * so the form inherits it rather than inventing it.
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

/**
 * The hinge: the one thing a visitor is promised in return for an inquiry,
 * carried as the page's two-tone sentence. Both halves are the approved second
 * lead sentence, split at the clause where the promise turns into a commitment.
 */
export const promise = {
  heading: 'What Hendricks does with an inquiry',
  sentence: {
    claim:
      'We will review the context, determine whether a Search Intelligence Diagnostic is the appropriate first step,',
    continuation: 'and say directly when a simpler solution would be better.',
  },
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
    'Hendricks will review the information and respond when an appropriate next step is available.',
    'Submitting the form does not create a client relationship. You will not be enrolled in marketing unless you separately select the optional marketing checkbox.',
  ],
} as const

/**
 * Legal model for the Phase 5 inquiry form (legal/01 §2, docs/16 §7).
 *
 * There is no privacy-consent checkbox here, and adding one would be a
 * regression rather than an oversight: Hendricks needs the submitted
 * information to answer the request, so the lawful basis is the request itself,
 * and bundling consent into it would misdescribe what is happening.
 *
 * `notice` renders immediately above the submit button and must be readable
 * without opening a modal. `marketingOptIn` is unchecked by default and the
 * form must submit when it is left that way.
 */
export const formLegal = {
  notice:
    'Hendricks will use the information you provide to route, evaluate, and respond to your inquiry; maintain business records; and protect the website from fraud and abuse. We may share it with service providers that host the website, deliver email, secure the form, and operate our customer-relationship systems. Do not submit confidential, proprietary, financial, health, government-identifier, or other sensitive personal information. See our [Privacy Notice](/privacy).',
  marketingOptIn:
    'Send me occasional Hendricks research and service updates by email. I can unsubscribe at any time. This is optional and is not a condition of receiving a response.',
  submitLabel: 'Send Inquiry',
  confirmation:
    'Thank you. Your inquiry has been received. Hendricks will review the information and respond when an appropriate next step is available. Submitting this form does not create a client relationship.',
} as const

export const relatedTitle = 'Where to go next.'

export const related: readonly RelatedEntry[] = [
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
