/**
 * Typed feature flags (docs/02 §12).
 *
 * `showResults` stays false until at least two verified case studies exist, or
 * one verified case study plus one clearly labeled research experiment. When it
 * is false the Results route is removed from navigation and the footer, and the
 * route returns notFound() in production (docs/03 §10).
 */
export const features = {
  showResults: false,
  showNewsletter: false,
  enableSanityVisualEditing: true,
  enableTurnstile: false,
} as const

/**
 * Master switch for every optional analytics vendor (docs/11, privacy phase).
 *
 * Read from the environment rather than this file because it is an operational
 * gate, not a design decision: docs/11 forbids enabling it until the consent
 * network tests pass against a deployed environment. Consent is still required
 * on top of it — this only decides whether the vendors exist as a possibility.
 */
export const optionalAnalyticsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_OPTIONAL_ANALYTICS === 'true'

export type Features = typeof features
