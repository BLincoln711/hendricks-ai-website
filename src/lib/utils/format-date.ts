/**
 * Formats an ISO date (`YYYY-MM-DD`) for display.
 *
 * Parsed and formatted in UTC on purpose. `new Date('2026-08-16')` is UTC
 * midnight, so a server or visitor west of Greenwich would otherwise render the
 * previous day — which on a legal effective date is a factual error.
 */
export function formatLongDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
