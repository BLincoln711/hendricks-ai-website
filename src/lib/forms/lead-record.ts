import { privacyNotice } from '@/content/legal/privacy'
import type { LeadAttribution } from '@/lib/forms/attribution'
import { audienceTypeOf, type LeadInput } from '@/lib/forms/lead-schema'

/**
 * The stored shape of a lead, and the metadata only the server may set
 * (docs/15 section 2).
 *
 * Privacy and copy versions are server-controlled on purpose. A client that can
 * name the notice version it agreed to can name the wrong one, and the version
 * is the whole evidentiary value of the record.
 */

/**
 * Bumped when the visible wording of any of the three forms changes: the
 * notice at collection, the marketing opt-in sentence, the labels or the
 * confirmations. It is what a stored submission points at to say which words
 * were on screen when it was made.
 */
export const FORM_COPY_VERSION = '2026-09-03'

export type LeadSubmissionRecord = {
  requestId: string
  formName: LeadInput['formName']
  audienceType: string
  submittedAt: string
  privacyNoticeVersion: string
  formCopyVersion: string
  fields: Record<string, string>
  marketingOptIn: boolean
  attribution: LeadAttribution
}

/** Field order in the notification email. Identity first, then the question. */
const FIELD_ORDER = [
  'audienceType',
  'firstName',
  'lastName',
  'workEmail',
  'organization',
  'website',
  'role',
  'primaryMarket',
  'relevantAccounts',
  'preferredModel',
  'primaryQuestion',
  'currentStack',
  'monthlySearchInvestment',
  'desiredTiming',
  'additionalContext',
] as const

/**
 * Copies the answered fields in a stable order.
 *
 * The anti-abuse controls, the discriminator and the opt-in are excluded: the
 * first two are not answers, and the opt-in is carried as its own flag because
 * it drives a separate record with a separate lawful basis (legal/01 section
 * 14).
 */
function readFields(input: LeadInput): Record<string, string> {
  const source = input as unknown as Record<string, unknown>
  const fields: Record<string, string> = {}

  for (const name of FIELD_ORDER) {
    const value = source[name]
    if (typeof value === 'string' && value.length > 0) fields[name] = value
  }

  return fields
}

export function buildSubmissionRecord(
  input: LeadInput,
  { requestId, now = new Date() }: { requestId: string; now?: Date },
  attribution: LeadAttribution,
): LeadSubmissionRecord {
  return {
    requestId,
    formName: input.formName,
    audienceType: audienceTypeOf(input),
    submittedAt: now.toISOString(),
    privacyNoticeVersion: privacyNotice.lastUpdated,
    formCopyVersion: FORM_COPY_VERSION,
    fields: readFields(input),
    marketingOptIn: input.marketingOptIn,
    attribution,
  }
}

/**
 * The marketing-consent record (legal/01 section 13, docs/16 section 7).
 *
 * Separate from the inquiry record because the two have different lawful bases
 * and different retention. A line inside the notification email is not this
 * record (15 section 4); the record needs its own restricted store, which is
 * blocker 12 and does not exist yet.
 */
export type MarketingConsentRecord = {
  email: string
  consentLanguageVersion: string
  formName: LeadInput['formName']
  sourceUrl: string
  collectedAt: string
}

export function buildMarketingConsentRecord(
  record: LeadSubmissionRecord,
): MarketingConsentRecord | null {
  if (!record.marketingOptIn) return null

  return {
    email: record.fields.workEmail ?? '',
    consentLanguageVersion: record.formCopyVersion,
    formName: record.formName,
    sourceUrl: record.attribution.currentPage ?? '',
    collectedAt: record.submittedAt,
  }
}
