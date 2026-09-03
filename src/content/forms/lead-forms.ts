import { routes } from '@/config/routes'
import { formLegal as agencyLegal } from '@/content/pages/for-agencies'
import { formLegal as contactLegal } from '@/content/pages/contact'
import { formLegal as diagnosticLegal } from '@/content/pages/diagnostic'

/**
 * Visible copy for the three lead forms (15 sections 4 to 6).
 *
 * The legal strings are not restated here. Each form reads its notice at
 * collection, its marketing sentence, its submit label and its confirmation
 * from the `formLegal` object beside that page's approved copy, so
 * legal/01 stays the single source and a revision lands in one place.
 *
 * The option lists are not here either. They carry the visitor's own spend
 * bands and live with the schema in `src/lib/forms/lead-options.ts`, which
 * keeps every dollar figure out of the content tree.
 */

/**
 * legal/01 section 6, displayed directly above every free-text field that
 * could invite confidential material. Bound by `aria-describedby`, so it is
 * read before the field rather than found after it.
 */
export const sensitiveWarning =
  'Do not include passwords, payment-card information, government identification numbers, health information, precise location information, client-confidential materials, or other sensitive personal information.'

/** legal/01 section 6, the second warning, agency forms only. */
export const agencyClientWarning =
  'Do not identify an agency client or upload client data unless you have authority to disclose it and an appropriate Hendricks agreement is already in place.'

/**
 * Marks required fields in words rather than with an asterisk alone (16 FM-01).
 * The glyph is a convention a form teaches; the word is not.
 */
export const requiredMarker = '(required)'

export const sharedLabels = {
  firstName: 'First name',
  lastName: 'Last name',
  workEmail: 'Work email',
  organization: 'Organization',
  website: 'Website',
  role: 'Role',
  desiredTiming: 'Desired timing',
  currentStack: 'Current search, analytics, and CRM systems',
  additionalContext: 'Additional context',
  chooseOne: 'Select one',
} as const

export const errors = {
  summaryTitle: 'Your submission was not sent.',
  invalidLead: 'Check the fields listed below, then submit again.',
  rateLimited: (minutes: number) =>
    `This form cannot be submitted again right now. Try again in about ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`,
} as const

type FormCopy = {
  /** The form's own id, used for the anchor, the events and the schema. */
  legends: { about: string; request: string }
  labels: Record<string, string>
  hints: Record<string, string>
  submit: string
  submitting: string
  notice: string
  marketingOptIn: string
  confirmation: string
  confirmationTitle: string
  successLink: { label: string; href: string }
  deliveryError: string
  antiAbuseError: string
}

export const diagnosticForm = {
  eyebrow: 'Application',
  heading: 'Leave with clarity about what should be built first.',
  /** diagnostic.ts closing body, verbatim. It promises no reply, only a read. */
  intro:
    'Tell Hendricks what your organization needs to understand, improve, or build. We will determine whether a Diagnostic is the appropriate first step, and say directly when a simpler solution is sufficient.',
  legends: {
    about: 'About you and your organization',
    request: 'What the Diagnostic should answer',
  },
  labels: {
    audienceType: 'I am applying as',
    ...sharedLabels,
    primaryMarket: 'Primary product, service, or market',
    primaryQuestion: 'The business or search question the Diagnostic should answer',
    monthlySearchInvestment: 'Approximate monthly search investment',
  },
  hints: {
    monthlySearchInvestment:
      "Your organization's combined spend on SEO, paid search, content, and AI visibility. It helps Hendricks understand how search is currently funded and does not change the reply.",
  },
  submit: diagnosticLegal.submitLabel,
  submitting: 'Submitting application...',
  notice: diagnosticLegal.notice,
  marketingOptIn: diagnosticLegal.marketingOptIn,
  confirmation: diagnosticLegal.confirmation,
  confirmationTitle: 'Your application has been received.',
  successLink: {
    label: 'Read the Hendricks Measurement Methodology',
    href: routes.methodology.path,
  },
  deliveryError: 'The application could not be delivered. Please try again.',
  antiAbuseError: 'Your application could not be submitted. Please try again.',
} as const satisfies FormCopy & Record<string, unknown>

export const agencyForm = {
  legends: {
    about: 'About your agency',
    request: 'The opportunity',
  },
  labels: {
    ...sharedLabels,
    organization: 'Agency name',
    primaryMarket: 'Primary services',
    relevantAccounts: 'Number of relevant accounts',
    primaryQuestion: 'Current client question or capability gap',
    preferredModel: 'Preferred model',
    currentStack: 'Current tools and data environment',
    desiredTiming: 'Timing',
    additionalContext: 'Opportunity context',
  },
  hints: {
    relevantAccounts: 'A count of accounts. Do not name a client.',
  },
  submit: agencyLegal.submitLabel,
  submitting: 'Submitting inquiry...',
  notice: agencyLegal.notice,
  marketingOptIn: agencyLegal.marketingOptIn,
  confirmation: agencyLegal.confirmation,
  confirmationTitle: 'Your partnership inquiry has been received.',
  successLink: { label: 'Read the partner commitments', href: '#partner-commitments' },
  deliveryError: 'The inquiry could not be delivered. Please try again.',
  antiAbuseError: 'Your inquiry could not be submitted. Please try again.',
} as const satisfies FormCopy & Record<string, unknown>

export const contactForm = {
  eyebrow: 'Inquiry',
  heading: 'Tell Hendricks what you need.',
  legends: {
    about: 'About you and your organization',
    request: 'What you need',
  },
  labels: {
    audienceType: 'I am contacting Hendricks as',
    ...sharedLabels,
    primaryMarket: 'Relevant product, service, or market',
    primaryQuestion:
      'What decision can your current search, AI-visibility, or data system not answer?',
    currentStack: 'Current search and measurement environment',
  },
  hints: {},
  submit: contactLegal.submitLabel,
  submitting: 'Sending inquiry...',
  notice: contactLegal.notice,
  marketingOptIn: contactLegal.marketingOptIn,
  confirmation: contactLegal.confirmation,
  confirmationTitle: 'Your inquiry has been received.',
  successLink: { label: 'Read how Hendricks works', href: routes.howItWorks.path },
  deliveryError: 'The inquiry could not be delivered. Please try again.',
  antiAbuseError: 'Your inquiry could not be submitted. Please try again.',
} as const satisfies FormCopy & Record<string, unknown>

/**
 * The two pointers under the /contact routing choices (15 section 6).
 *
 * Both always render, so they work without JavaScript and are read before the
 * visitor types rather than after a wasted submission. Nothing else on the
 * page links upward to the other two forms.
 */
export const contactRoutingPointers = {
  brand: {
    text: 'Applying for a Diagnostic? Use the application on the Diagnostic page.',
    label: 'the application on the Diagnostic page',
    href: `${routes.diagnostic.path}#apply`,
  },
  agency: {
    text: 'Discussing a partnership? Use the agency inquiry.',
    label: 'the agency inquiry',
    href: `${routes.forAgencies.path}#partnership-inquiry`,
  },
} as const
