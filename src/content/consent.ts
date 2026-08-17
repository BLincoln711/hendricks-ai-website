import { routes } from '@/config/routes'

/**
 * Approved consent copy, transcribed from `legal/01-FORM-AND-CONSENT-COPY.md`
 * §9 and §10.
 *
 * Button labels are approved wording and are not interchangeable. §8 forbids
 * "Continue", "Got it", or a dismissal being treated as consent, so no control
 * here closes the banner without recording a decision.
 */

export const banner = {
  title: 'Your privacy choices',
  body: 'We use essential technologies to operate and secure this website. With your permission, we also use analytics technologies to understand how the site is used and improve its performance. Optional analytics are off until you accept them. You can change your choice at any time through Privacy Choices.',
  privacyLink: { label: 'Privacy Notice', href: routes.privacy.path },
  // Mobile order from §9. Reject is first and carries the same weight as accept.
  reject: 'Reject optional',
  manage: 'Manage choices',
  accept: 'Accept analytics',
} as const

export const preferences = {
  title: 'Privacy choices',
  intro:
    'Choose whether Hendricks may use optional analytics technologies. Strictly necessary technologies remain active because they are required to operate, secure, and remember choices for the website.',
  categories: [
    {
      name: 'Strictly necessary',
      status: 'Always active',
      description:
        'These technologies are required to deliver and secure the website, process requested forms, prevent abuse, balance traffic, and remember your privacy choice. They are not used for advertising.',
      examples: [
        'Consent-preference storage',
        'Security and rate-limiting controls',
        'Form-session and anti-abuse controls',
        'Hosting and network-delivery functions',
      ],
    },
    {
      name: 'Analytics',
      status: 'Off by default; visitor controlled',
      description:
        'Analytics help Hendricks understand page use, navigation, form performance, and site speed. When enabled, this category may load Google Analytics 4, Vercel Web Analytics, and Vercel Speed Insights. Analytics data must not include form-field values, email addresses, names, company names, message content, or other directly identifying information.',
      examples: [],
    },
  ],
  reject: 'Reject optional',
  accept: 'Accept analytics',
  footerStatement:
    'You may withdraw consent at any time. Withdrawal does not affect processing that occurred before the change.',
  /**
   * Shown in place of the controls when the browser sends Global Privacy
   * Control. docs/16 §5 permits showing the panel but forbids inviting the
   * visitor to weaken the signal, so no accept control is rendered.
   */
  gpcNotice:
    'Your browser is sending a Global Privacy Control signal. Hendricks treats that signal as a request to reject optional analytics, so optional analytics are off and no analytics technologies are loaded. To change this, turn off Global Privacy Control in your browser settings.',
} as const

/** Footer control that reopens the manager (§11). */
export const privacyChoicesLabel = 'Privacy Choices'

export const statusAnnouncement = {
  granted: 'Optional analytics accepted.',
  denied: 'Optional analytics rejected.',
} as const
