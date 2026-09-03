/**
 * The one query allowlist every URL on this site is filtered through
 * (15 section 4, decision 17, CONTENT_VERIFICATION L7).
 *
 * Three places store or send a URL and none may store one it did not filter.
 * The browser writes the landing page and the referrer into `hx_attr_v1`; the
 * server reads the `Referer` header on a submission; the analytics layer sends
 * `page_path`, `page_location` and `page_referrer`. A paid landing carries
 * `gclid` and `msclkid` on all three, and the two query parameters the site
 * preselects a form field from, `?intent=` and `?model=`, ride the same query.
 *
 * So the rule lives here once, with no environment of its own, and every half
 * calls it. This file must stay free of `server-only`: the client imports it.
 */

export const UTM_PARAMETERS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

/** The longest URL any caller stores. Matches the attribution schema's bound. */
export const MAX_URL_LENGTH = 1000

/** Returns the allowlisted query, with its `?`, or an empty string. */
export function allowlistedSearch(search: string): string {
  const source = new URLSearchParams(search)
  const kept = new URLSearchParams()

  for (const name of UTM_PARAMETERS) {
    const value = source.get(name)
    if (value) kept.append(name, value)
  }

  const query = kept.toString()
  return query.length > 0 ? `?${query}` : ''
}

/**
 * Rebuilds a URL with only the allowlisted query, or returns undefined.
 *
 * A URL that will not parse is dropped rather than passed through, because an
 * unparseable value is precisely the one that has not been redacted.
 */
export function redactUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined

  try {
    const parsed = new URL(url)
    const redacted = `${parsed.origin}${parsed.pathname}${allowlistedSearch(parsed.search)}`
    return redacted.slice(0, MAX_URL_LENGTH)
  } catch {
    return undefined
  }
}
