import {
  type ObservationCell,
  type ObservationGrain,
} from '@/lib/observation/schema'

/**
 * Citation is not a shortlist.
 *
 * Cell grain on this public sample is only cited | invisible | unmeasured.
 * A cited URL is an observed source, not understanding, evidence, consideration,
 * recommendation, or a shortlisted peer. This helper exists so a later map
 * cannot quietly promote a citation.
 */

export const SHORTLIST_PROMOTIONS = [
  'understanding',
  'evidence',
  'consideration',
  'recommendation',
  'shortlisted',
] as const

export function shortlistFromObservation(
  cells: readonly ObservationCell[],
): readonly never[] {
  void cells
  return []
}

/**
 * Competitors only when they appear as cited hosts in the same answers.
 * No Brand B-D fiction. Omit the list when nothing was cited.
 */
export function competitorsObservedInAnswers(
  cells: readonly ObservationCell[],
  brandHost?: string,
): string[] {
  const hosts = new Set<string>()
  const owned = brandHost?.replace(/^www\./i, '').toLowerCase()

  for (const cell of cells) {
    if (cell.state !== 'cited') continue
    for (const raw of cell.cited_urls ?? []) {
      const host = hostFromCitedUrl(raw)
      if (!host) continue
      if (owned && host === owned) continue
      hosts.add(host)
    }
  }

  return [...hosts].sort()
}

export function hostFromCitedUrl(raw: string): string | undefined {
  try {
    const url = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`)
    const host = url.hostname.replace(/^www\./i, '').toLowerCase()
    return host.length > 0 ? host : undefined
  } catch {
    return undefined
  }
}

export function grainOf(state: ObservationCell['state']): ObservationGrain | undefined {
  if (state === 'cited' || state === 'invisible' || state === 'unmeasured') return state
  return undefined
}
