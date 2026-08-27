import { describe, expect, it } from 'vitest'

import * as contact from '@/content/pages/contact'
import * as diagnostic from '@/content/pages/diagnostic'
import { privacyNotice } from '@/content/legal/privacy'
import * as privacyRequest from '@/content/legal/privacy-request'
import { termsOfUse } from '@/content/legal/terms'
import type { LegalDocument } from '@/content/legal/types'
import {
  privacyRequestInputSchema,
  requestTypeValues,
} from '@/lib/forms/privacy-request-schema'

/**
 * Guards on the legal documents and the form legal model (docs/16, legal/01).
 *
 * The most valuable case in this file is the placeholder check: shipping a
 * Privacy Notice that reads "[EFFECTIVE DATE]" would be worse than shipping no
 * notice, and it is exactly the kind of defect a reader skims past.
 */

const documents: readonly (readonly [string, LegalDocument])[] = [
  ['Privacy Notice', privacyNotice],
  ['Terms of Use', termsOfUse],
]

function textOf(document: LegalDocument): string {
  return JSON.stringify(document)
}

describe.each(documents)('%s', (_name, document) => {
  it('carries no unresolved legal placeholder', () => {
    // docs/16 §14 — none of these may reach production.
    expect(textOf(document)).not.toMatch(/\[[A-Z][A-Z ]{2,}\]/)
  })

  it('states an effective date and a last-updated date', () => {
    expect(document.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(document.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(Date.parse(document.lastUpdated)).toBeGreaterThanOrEqual(
      Date.parse(document.effectiveDate),
    )
  })

  it('names the confirmed legal entity', () => {
    expect(textOf(document)).toContain('Hendricks Agency LLC')
  })

  it('publishes no mailing address', () => {
    // LEGAL_ENTITY_UPDATE — the omission is a decision, not an oversight, and a
    // street address appearing later would need its own approval.
    expect(textOf(document)).not.toMatch(/\b\d{1,5}\s+[A-Z][a-z]+\s+(Street|Avenue|Road|Suite)\b/)
  })

  it('gives every section a unique anchor', () => {
    const ids = document.sections.map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/)
  })

  it('leaves no section empty', () => {
    for (const section of document.sections) {
      expect(section.blocks.length, section.id).toBeGreaterThan(0)
      expect(section.title.length, section.id).toBeGreaterThan(0)
    }
  })

  it('gives every table a caption and a consistent column count', () => {
    for (const section of document.sections) {
      for (const block of section.blocks) {
        if (block.type !== 'table') continue
        expect(block.caption.length, section.id).toBeGreaterThan(0)
        for (const row of block.rows) {
          expect(row.length, `${section.id} row width`).toBe(block.columns.length)
        }
      }
    }
  })

  it('links only to routes that exist', () => {
    const hrefs = [...textOf(document).matchAll(/\]\((\/[a-z0-9/-]*)\)/g)].map((match) => match[1])

    for (const href of hrefs) {
      expect(['/privacy', '/terms', '/privacy-request'], `unresolved link: ${href}`).toContain(href)
    }
  })
})

describe('Privacy Notice', () => {
  it('describes optional analytics as blocked until consent', () => {
    expect(textOf(privacyNotice)).toContain('blocked until you accept analytics')
  })

  it('names Vercel analytics as optional rather than exempt', () => {
    // legal/01 §8 chose the conservative treatment over the vendor's own claim.
    expect(textOf(privacyNotice)).toContain('treats them as optional at launch')
  })

  it('states that Hendricks does not sell personal information', () => {
    expect(textOf(privacyNotice)).toContain('does not sell personal information')
  })

  it('honors Global Privacy Control', () => {
    expect(textOf(privacyNotice)).toContain('Global Privacy Control')
  })

  it('discloses the LinkedIn Insight Tag after analytics consent and does not claim pixels are unused', () => {
    expect(textOf(privacyNotice)).toContain(
      'With analytics consent, Hendricks may use the LinkedIn Insight Tag to measure visits and LinkedIn-referred traffic.',
    )
    expect(textOf(privacyNotice)).toContain('Advertising storage remains denied.')
    expect(textOf(privacyNotice)).not.toContain('does not use advertising pixels')
  })

  it('names LinkedIn as a measurement vendor after consent', () => {
    expect(textOf(privacyNotice)).toContain('LinkedIn as a measurement vendor')
  })

  it('publishes a retention period for each record type', () => {
    const retention = privacyNotice.sections.find((section) => section.id === 'retention')
    const table = retention?.blocks.find((block) => block.type === 'table')

    expect(table?.type).toBe('table')
    if (table?.type === 'table') expect(table.rows.length).toBeGreaterThanOrEqual(8)
  })
})

describe('Terms of Use', () => {
  it('resolves the venue county', () => {
    expect(textOf(termsOfUse)).toContain('Harris County, Texas')
  })

  it('guarantees no search, AI, or business outcome', () => {
    const section = termsOfUse.sections.find((s) => s.id === 'no-guarantee')
    const listed = section?.blocks.flatMap((block) =>
      block.type === 'list' ? block.items : [],
    )

    expect(listed).toContain('Search rankings;')
    expect(listed).toContain('Inclusion in AI-generated answers;')
    expect(listed).toContain('Citations or mentions;')
  })

  it('creates no arbitration agreement', () => {
    expect(textOf(termsOfUse)).toContain('does not create an arbitration agreement')
  })
})

describe('Inquiry form legal model', () => {
  it.each([
    ['contact', contact.formLegal],
    ['diagnostic', diagnostic.formLegal],
  ])('%s shows a notice at collection rather than bundled consent', (_name, formLegal) => {
    // docs/16 §7 — the notice describes; it does not ask for agreement.
    expect(formLegal.notice).toContain('[Privacy Notice](/privacy)')
    expect(formLegal.notice.toLowerCase()).not.toContain('i agree')
    expect(formLegal.notice.toLowerCase()).not.toContain('by submitting, you consent')
  })

  it.each([
    ['contact', contact.formLegal],
    ['diagnostic', diagnostic.formLegal],
  ])('%s keeps marketing optional and separate', (_name, formLegal) => {
    expect(formLegal.marketingOptIn).toContain('optional')
    expect(formLegal.marketingOptIn).toContain('unsubscribe at any time')
    expect(formLegal.marketingOptIn).toContain('not a condition')
  })

  it.each([
    ['contact', contact.formLegal],
    ['diagnostic', diagnostic.formLegal],
  ])('%s warns against sensitive information', (_name, formLegal) => {
    expect(formLegal.notice).toContain('Do not submit confidential')
  })

  it('tells the visitor a submission creates no client relationship', () => {
    expect(contact.formLegal.confirmation).toContain('does not create a client relationship')
    expect(diagnostic.formLegal.confirmation).toContain('does not create a client relationship')
  })

  it('distinguishes a service confirmation from marketing', () => {
    // docs/16 §12 — a response email must say why it was sent.
    expect(diagnostic.formLegal.confirmationEmailFooter).toContain('does not enroll you in marketing')
  })
})

describe('Privacy request form', () => {
  const valid = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    country: 'United States',
    relationship: 'website-visitor' as const,
    requestType: 'access' as const,
    details: 'Please confirm what personal information you hold about me.',
    isAuthorizedAgent: false,
    attestation: true as const,
    honeypot: '',
    startedAt: Date.now(),
  }

  it('accepts a complete request', () => {
    expect(privacyRequestInputSchema.safeParse(valid).success).toBe(true)
  })

  it('supports every request type docs/16 §9 requires', () => {
    // Access, correction, deletion, portability, objection, withdrawal,
    // opt-out, and appeal must all be expressible.
    for (const requestType of requestTypeValues) {
      const result = privacyRequestInputSchema.safeParse({
        ...valid,
        requestType,
        ...(requestType === 'appeal' ? { originalRequestId: 'PRIV-2026-000001' } : {}),
      })
      expect(result.success, requestType).toBe(true)
    }
  })

  it('requires the original reference when appealing', () => {
    const result = privacyRequestInputSchema.safeParse({ ...valid, requestType: 'appeal' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === 'originalRequestId')).toBe(true)
    }
  })

  it('rejects a request without the truthfulness attestation', () => {
    expect(privacyRequestInputSchema.safeParse({ ...valid, attestation: false }).success).toBe(
      false,
    )
  })

  it('rejects a filled honeypot', () => {
    expect(privacyRequestInputSchema.safeParse({ ...valid, honeypot: 'bot' }).success).toBe(false)
  })

  it('keeps no field the launch configuration prohibits', () => {
    // docs/16 §8 — data minimisation. Asserted through the parse result rather
    // than the schema internals: what matters is that a value offered under
    // these names is discarded rather than stored.
    const prohibited = [
      'phone',
      'phoneNumber',
      'upload',
      'attachment',
      'payment',
      'password',
      'accountId',
      'ssn',
    ]

    const result = privacyRequestInputSchema.safeParse({
      ...valid,
      ...Object.fromEntries(prohibited.map((field) => [field, 'supplied'])),
    })

    expect(result.success).toBe(true)
    if (result.success) {
      for (const field of prohibited) {
        expect(Object.keys(result.data), `retained prohibited field: ${field}`).not.toContain(field)
      }
    }
  })

  it('offers every request type in the visible options', () => {
    expect(privacyRequest.requestTypeOptions.map((option) => option.value).sort()).toEqual(
      [...requestTypeValues].sort(),
    )
  })

  it('warns against sensitive information above the free-text field', () => {
    // legal/01 §6 — required above any field that could invite confidential material.
    expect(privacyRequest.form.sensitiveWarning).toContain('government identification numbers')
  })

  it('links the Privacy Notice from its notice at collection', () => {
    expect(privacyRequest.form.notice).toContain('[Privacy Notice](/privacy)')
  })
})
