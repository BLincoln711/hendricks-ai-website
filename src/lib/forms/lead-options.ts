/**
 * Option values and labels for the three lead forms (15 sections 4 to 6).
 *
 * These live outside `src/content/` deliberately. The investment bands carry a
 * dollar figure, and the content tree is where "no fee" is enforced:
 * `tests/unit/page-content.test.ts` rejects a dollar sign followed by a digit
 * anywhere in the diagnostic content object. The bands name the visitor's own
 * combined search spend and never a Hendricks price (15 section 7 rule 1), so
 * keeping them beside the schema rather than beside the page copy makes that
 * separation structural instead of a convention someone has to remember.
 *
 * Values are the contract and are what a stored submission means. Labels are
 * what a visitor reads. The two are paired here so a wording revision cannot
 * silently change the meaning of a record already delivered.
 */

export type Option<Value extends string> = { value: Value; label: string }

function options<const T extends readonly Option<string>[]>(list: T): T {
  return list
}

/** Field 1 of the Diagnostic application. No preselect and no query parameter. */
export const diagnosticAudienceOptions = options([
  { value: 'brand', label: 'A brand or company' },
  { value: 'agency', label: 'An agency, on behalf of a client' },
] as const)

/**
 * The four approved routing choices on /contact (contact.ts routing.choices).
 * `diagnostic` is accepted as an alias for `brand` on the query string only
 * (03 section 4); it is never a value a visitor can submit.
 */
export const contactAudienceOptions = options([
  { value: 'brand', label: 'Brand or company' },
  { value: 'agency', label: 'Digital marketing agency' },
  { value: 'media', label: 'Media or speaking inquiry' },
  { value: 'other', label: 'Other' },
] as const)

export const desiredTimingOptions = options([
  { value: 'scope-agreed', label: 'As soon as scope is agreed' },
  { value: 'next-quarter', label: 'Within the next quarter' },
  { value: 'later-this-year', label: 'Later this year' },
  { value: 'unsure', label: 'Not sure yet' },
] as const)

/**
 * The visitor's combined monthly spend on SEO, paid search, content and AI
 * visibility (docs/07 section 7 bands, docs/15 values). Open ended below the
 * lowest band and above the highest, plus a refusal that is not an absence.
 */
export const monthlySearchInvestmentOptions = options([
  { value: 'under-10k', label: 'Under $10,000 per month' },
  { value: '10k-25k', label: '$10,000 to $25,000 per month' },
  { value: '25k-50k', label: '$25,000 to $50,000 per month' },
  { value: '50k-100k', label: '$50,000 to $100,000 per month' },
  { value: 'over-100k', label: 'More than $100,000 per month' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
] as const)

/** A count of accounts, never a client name (15 section 7 rule 7). */
export const relevantAccountsOptions = options([
  { value: '1', label: '1' },
  { value: '2-5', label: '2 to 5' },
  { value: '6-15', label: '6 to 15' },
  { value: 'more-than-15', label: 'More than 15' },
] as const)

/** The four R11 partnership model names, verbatim, plus a fifth honest answer. */
export const preferredModelOptions = options([
  { value: 'white-label', label: 'White-label specialist' },
  { value: 'embedded', label: 'Embedded intelligence lead' },
  { value: 'co-branded', label: 'Co-branded partner' },
  { value: 'system-builder', label: 'System builder' },
  { value: 'unsure', label: 'Not sure yet' },
] as const)

function values<T extends readonly Option<string>[]>(list: T): [string, ...string[]] {
  return list.map((option) => option.value) as [string, ...string[]]
}

export const diagnosticAudienceValues = values(diagnosticAudienceOptions)
export const contactAudienceValues = values(contactAudienceOptions)
export const desiredTimingValues = values(desiredTimingOptions)
export const monthlySearchInvestmentValues = values(monthlySearchInvestmentOptions)
export const relevantAccountsValues = values(relevantAccountsOptions)
export const preferredModelValues = values(preferredModelOptions)

export type ContactAudience = (typeof contactAudienceOptions)[number]['value']
export type PreferredModel = (typeof preferredModelOptions)[number]['value']

/**
 * Reads `?intent=` into a routing choice. `diagnostic` is the approved alias
 * for `brand`; anything unrecognised selects nothing, so a malformed link
 * leaves the required radio group in its unanswered state rather than
 * answering it wrongly on the visitor's behalf.
 */
export function resolveContactIntent(raw: string | undefined): ContactAudience | undefined {
  if (!raw) return undefined
  const value = raw === 'diagnostic' ? 'brand' : raw
  return contactAudienceOptions.some((option) => option.value === value)
    ? (value as ContactAudience)
    : undefined
}

/** Reads `?model=` into a preferred model. Unknown values select nothing. */
export function resolvePreferredModel(raw: string | undefined): PreferredModel | undefined {
  if (!raw) return undefined
  return preferredModelOptions.some((option) => option.value === raw)
    ? (raw as PreferredModel)
    : undefined
}
