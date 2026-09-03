/**
 * Canonical site constants. Safe for both server and client.
 *
 * Wordmark note: `Hendricks.` with the signal dot is the *visual* wordmark only.
 * Prose, metadata, and accessibility labels use `Hendricks` without the period
 * (docs/01 §4).
 */
export const siteConfig = {
  name: 'Hendricks',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hendricks.ai',
  locale: 'en_US',
  category: 'Search Intelligence Engineering',
  categoryLine: 'Search Intelligence Engineering for the AI Era.',
  operatingLine:
    'Measure demand. Understand AI visibility. Engineer selection. Prove business impact.',
  problemCategory: 'The AI Selection Problem',
  visibilityTerm: 'AI Search Visibility',
  visibilityDefinition:
    'The presence of a brand in the answers AI systems compose and in the sources those answers cite.',
  description:
    'Hendricks maps valuable search demand, measures whether brands enter consideration across Google and AI search, engineers search-presence gaps, and connects the work to business impact.',
  founder: 'Brandon Lincoln Hendricks',
  // CONTENT_VERIFICATION.md F9 — confirm this is the title to publish.
  founderRole: 'Search Intelligence Engineer',
  /*
    Decision D-B, 2026-09-02. One identity across both properties: the `Person`
    node on hendricks.ai carries this `@id`, so a machine reading a research
    byline here and a machine reading the biography at brandonlincolnhendricks.com
    resolve to the same entity rather than to two people with the same name.
  */
  founderPersonId: 'https://brandonlincolnhendricks.com/#person',
} as const

export const primaryCta = {
  label: 'Start with a Diagnostic',
  href: '/diagnostic',
} as const

export type SiteConfig = typeof siteConfig
