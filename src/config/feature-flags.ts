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

export type Features = typeof features
