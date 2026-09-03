import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { privacyNotice } from '@/content/legal/privacy'
import {
  buildNotificationBody,
  buildNotificationSubject,
  deliverLead,
  deliveryChannels,
  generateLeadRequestId,
  recordMarketingConsent,
} from '@/lib/forms/lead-delivery'
import {
  buildMarketingConsentRecord,
  buildSubmissionRecord,
  FORM_COPY_VERSION,
} from '@/lib/forms/lead-record'
import { leadInputSchema } from '@/lib/forms/lead-schema'

const input = leadInputSchema.parse({
  formName: 'diagnostic',
  audienceType: 'brand',
  firstName: 'Brandon',
  lastName: 'Hendricks',
  workEmail: 'name@company.com',
  organization: 'Example Co',
  website: 'example.com',
  role: 'Head of Growth',
  primaryMarket: 'Enterprise observability software',
  primaryQuestion: 'Why do competitors enter the shortlist and we do not?',
  monthlySearchInvestment: '25k-50k',
  desiredTiming: 'next-quarter',
  marketingOptIn: true,
  honeypot: '',
  startedAt: 1_756_000_000_000,
})

const record = buildSubmissionRecord(
  input,
  { requestId: 'LEAD-2026-000001', now: new Date('2026-09-03T10:00:00.000Z') },
  { utmSource: 'linkedin', currentPage: 'https://hendricks.ai/diagnostic' },
)

describe('Submission record', () => {
  it('stamps the privacy and copy versions on the server', () => {
    expect(record.privacyNoticeVersion).toBe(privacyNotice.lastUpdated)
    expect(record.formCopyVersion).toBe(FORM_COPY_VERSION)
    expect(record.submittedAt).toBe('2026-09-03T10:00:00.000Z')
  })

  it('keeps the anti-abuse controls and the discriminator out of the fields', () => {
    expect(Object.keys(record.fields)).not.toContain('honeypot')
    expect(Object.keys(record.fields)).not.toContain('startedAt')
    expect(Object.keys(record.fields)).not.toContain('formName')
    expect(Object.keys(record.fields)).not.toContain('marketingOptIn')
  })

  it('records the answered fields and the normalized website', () => {
    expect(record.fields.website).toBe('https://example.com')
    expect(record.fields.primaryQuestion).toContain('shortlist')
    expect(record.audienceType).toBe('brand')
  })
})

describe('Marketing consent record', () => {
  it('is created only when the box was selected, and separately from the inquiry', () => {
    const consent = buildMarketingConsentRecord(record)
    expect(consent).not.toBeNull()
    expect(consent?.email).toBe('name@company.com')
    expect(consent?.consentLanguageVersion).toBe(FORM_COPY_VERSION)

    expect(buildMarketingConsentRecord({ ...record, marketingOptIn: false })).toBeNull()
  })

  it('refuses to write an opt-in while the restricted store is unconfigured', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {})
    recordMarketingConsent(record)
    expect(info).toHaveBeenCalledOnce()
    expect(info.mock.calls[0]?.[0]).toContain('no marketing record was created')

    info.mockClear()
    recordMarketingConsent({ ...record, marketingOptIn: false })
    expect(info).not.toHaveBeenCalled()
    info.mockRestore()
  })
})

describe('Notification content', () => {
  it('names the form and the organization in the subject', () => {
    expect(buildNotificationSubject(record)).toBe('Diagnostic application: Example Co')
  })

  it('carries every answer, the opt-in, the versions and the attribution', () => {
    const body = buildNotificationBody(record)
    expect(body).toContain('LEAD-2026-000001')
    expect(body).toContain('name@company.com')
    expect(body).toContain('Marketing opt-in: yes')
    expect(body).toContain(privacyNotice.lastUpdated)
    expect(body).toContain('utmSource: linkedin')
  })

  it('reads the investment band back as its label, not as its stored value', () => {
    expect(buildNotificationBody(record)).toContain('Monthly search investment: $25,000')
  })
})

describe('Delivery', () => {
  const error = vi.spyOn(console, 'error')

  beforeEach(() => {
    error.mockImplementation(() => {})
    vi.unstubAllEnvs()
  })

  afterEach(() => {
    error.mockReset()
    vi.unstubAllGlobals()
  })

  it('fails closed and names the missing variables when no key is configured', async () => {
    const result = await deliverLead(record)

    expect(result.email).toBe('skipped')
    expect(result.crmWebhook).toBe('skipped')
    expect(result.delivered).toBe(false)

    const message = String(error.mock.calls[0]?.[0])
    expect(message).toContain('RESEND_API_KEY')
    expect(message).toContain('LEAD_NOTIFICATION_EMAIL')
    expect(message).toContain('was not delivered')
  })

  it('reports the channels that actually took the submission', () => {
    expect(deliveryChannels({ email: 'success', crmWebhook: 'skipped', delivered: true })).toBe(
      'email',
    )
    expect(deliveryChannels({ email: 'success', crmWebhook: 'success', delivered: true })).toBe(
      'email_crm',
    )
    expect(deliveryChannels({ email: 'skipped', crmWebhook: 'skipped', delivered: false })).toBe(
      'none',
    )
  })
})

describe('Request id', () => {
  it('is non-sequential and prefixed with the year', () => {
    const first = generateLeadRequestId(new Date('2026-09-03T00:00:00.000Z'))
    expect(first).toMatch(/^LEAD-2026-\d{6}$/)

    const ids = new Set(Array.from({ length: 40 }, () => generateLeadRequestId()))
    expect(ids.size).toBeGreaterThan(1)
  })
})
