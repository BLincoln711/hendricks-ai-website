import { describe, expect, it } from 'vitest'

import {
  attributionInputSchema,
  audienceTypeOf,
  leadInputSchema,
  normalizeWebsite,
  type LeadInput,
} from '@/lib/forms/lead-schema'
import {
  contactAudienceOptions,
  monthlySearchInvestmentOptions,
  preferredModelOptions,
  resolveContactIntent,
  resolvePreferredModel,
} from '@/lib/forms/lead-options'

const base = {
  firstName: 'Brandon',
  lastName: 'Hendricks',
  workEmail: 'name@company.com',
  organization: 'Example Co',
  role: 'Head of Growth',
  primaryQuestion: 'Why are competitors entering the shortlist and we are not?',
  currentStack: '',
  desiredTiming: '',
  additionalContext: '',
  marketingOptIn: false,
  honeypot: '',
  startedAt: 1_756_000_000_000,
}

const diagnostic = {
  ...base,
  formName: 'diagnostic',
  audienceType: 'brand',
  website: 'example.com',
  primaryMarket: 'Enterprise observability software',
  monthlySearchInvestment: '',
}

const agency = {
  ...base,
  formName: 'agency-partnership',
  organization: 'Example Agency',
  website: 'https://agency.example',
  primaryMarket: 'SEO, paid search, content',
  relevantAccounts: '',
  preferredModel: '',
}

const contact = {
  ...base,
  formName: 'contact',
  audienceType: 'media',
  website: undefined,
  primaryMarket: '',
}

describe('Website normalization', () => {
  it('adds https to a bare domain and leaves an explicit scheme alone', () => {
    expect(normalizeWebsite('example.com')).toBe('https://example.com')
    expect(normalizeWebsite('  example.com/path  ')).toBe('https://example.com/path')
    expect(normalizeWebsite('http://example.com')).toBe('http://example.com')
    expect(normalizeWebsite('https://example.com')).toBe('https://example.com')
    expect(normalizeWebsite('')).toBe('')
  })

  it('normalizes before validating, so a typed domain is accepted', () => {
    const parsed = leadInputSchema.safeParse(diagnostic)
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data.website).toBe('https://example.com')
  })
})

describe('Lead schema by form', () => {
  it('accepts a complete submission on each of the three forms', () => {
    for (const input of [diagnostic, agency, contact]) {
      const parsed = leadInputSchema.safeParse(input)
      expect(parsed.success, String(input.formName)).toBe(true)
    }
  })

  it('requires the audience choice on the Diagnostic and on /contact', () => {
    for (const input of [diagnostic, contact]) {
      const parsed = leadInputSchema.safeParse({ ...input, audienceType: '' })
      expect(parsed.success).toBe(false)
    }
  })

  it('asks the agency form for no audience, because the page is the answer', () => {
    const parsed = leadInputSchema.safeParse(agency)
    expect(parsed.success).toBe(true)
    expect(parsed.success && audienceTypeOf(parsed.data)).toBe('agency')
  })

  it('accepts the four /contact routing choices and nothing else', () => {
    for (const option of contactAudienceOptions) {
      const parsed = leadInputSchema.safeParse({ ...contact, audienceType: option.value })
      expect(parsed.success, option.value).toBe(true)
    }

    expect(leadInputSchema.safeParse({ ...contact, audienceType: 'diagnostic' }).success).toBe(
      false,
    )
  })

  it('makes website, role and market optional on /contact and required elsewhere', () => {
    expect(
      leadInputSchema.safeParse({ ...contact, website: undefined, role: '', primaryMarket: '' })
        .success,
    ).toBe(true)

    expect(leadInputSchema.safeParse({ ...diagnostic, role: '' }).success).toBe(false)
    expect(leadInputSchema.safeParse({ ...agency, website: '' }).success).toBe(false)
  })

  it('names the field and the fix in every required message', () => {
    const parsed = leadInputSchema.safeParse({ ...diagnostic, firstName: '', workEmail: 'nope' })
    expect(parsed.success).toBe(false)

    const messages = parsed.success
      ? []
      : parsed.error.issues.map((issue) => `${String(issue.path[0])}: ${issue.message}`)

    expect(messages).toContain('firstName: Enter your first name.')
    expect(messages.join(' ')).toContain('valid work email address')
  })

  it('requires a sentence rather than a word in the primary question', () => {
    expect(leadInputSchema.safeParse({ ...diagnostic, primaryQuestion: 'help' }).success).toBe(
      false,
    )
  })

  it('defaults the marketing opt-in to false and never requires it', () => {
    const parsed = leadInputSchema.safeParse({ ...contact, marketingOptIn: undefined })
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data.marketingOptIn).toBe(false)
  })

  it('rejects a filled honeypot and a missing start time', () => {
    expect(leadInputSchema.safeParse({ ...contact, honeypot: 'bot' }).success).toBe(false)
    expect(leadInputSchema.safeParse({ ...contact, startedAt: 0 }).success).toBe(false)
  })

  it('accepts every published option value and rejects an invented one', () => {
    for (const option of monthlySearchInvestmentOptions) {
      expect(
        leadInputSchema.safeParse({ ...diagnostic, monthlySearchInvestment: option.value }).success,
        option.value,
      ).toBe(true)
    }

    for (const option of preferredModelOptions) {
      expect(
        leadInputSchema.safeParse({ ...agency, preferredModel: option.value }).success,
        option.value,
      ).toBe(true)
    }

    expect(
      leadInputSchema.safeParse({ ...diagnostic, monthlySearchInvestment: 'free' }).success,
    ).toBe(false)
  })

  it('bounds the attribution object the browser contributes', () => {
    // The lead union carries no attribution field: the action never reads one
    // off the form, it builds it server-side. The schema is the bound on the
    // stored blob, and `parseStoredAttribution` is its only caller.
    expect(
      attributionInputSchema.safeParse({
        utmSource: 'linkedin',
        landingPage: 'https://hendricks.ai/',
      }).success,
    ).toBe(true)

    expect(attributionInputSchema.safeParse({ utmSource: 'x'.repeat(400) }).success).toBe(false)
  })

  it('discriminates on the form name and refuses an unknown one', () => {
    const parsed = leadInputSchema.safeParse({ ...contact, formName: 'newsletter' })
    expect(parsed.success).toBe(false)
  })

  it('carries no Hendricks fee in any message or option value', () => {
    const contract = JSON.stringify({
      values: [
        ...monthlySearchInvestmentOptions.map((option) => option.value),
        ...preferredModelOptions.map((option) => option.value),
      ],
      messages: leadInputSchema.safeParse({ formName: 'diagnostic' }).success
        ? []
        : leadInputSchema
            .safeParse({ formName: 'diagnostic' })
            .error?.issues.map((issue) => issue.message),
    })

    expect(contract).not.toMatch(/\$\s?\d/)
    expect(contract.toLowerCase()).not.toContain('starts at')
  })
})

describe('Query preselects', () => {
  it('reads intent, treating diagnostic as the approved alias for brand', () => {
    expect(resolveContactIntent('brand')).toBe('brand')
    expect(resolveContactIntent('diagnostic')).toBe('brand')
    expect(resolveContactIntent('media')).toBe('media')
  })

  it('selects nothing for an unknown or absent value', () => {
    expect(resolveContactIntent('partner')).toBeUndefined()
    expect(resolveContactIntent(undefined)).toBeUndefined()
    expect(resolvePreferredModel('platinum')).toBeUndefined()
    expect(resolvePreferredModel(undefined)).toBeUndefined()
  })

  it('reads every published model value', () => {
    for (const option of preferredModelOptions) {
      expect(resolvePreferredModel(option.value)).toBe(option.value)
    }
  })
})

describe('Audience recorded with a submission', () => {
  it('reads the chosen value on the two forms that ask', () => {
    const parsed = leadInputSchema.parse(diagnostic) satisfies LeadInput
    expect(audienceTypeOf(parsed)).toBe('brand')
    expect(audienceTypeOf(leadInputSchema.parse(contact))).toBe('media')
  })
})
