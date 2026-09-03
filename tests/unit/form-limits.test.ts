import { beforeEach, describe, expect, it } from 'vitest'

import { readFirstTouch } from '@/lib/analytics/attribution-storage'
import {
  buildAttribution,
  CAPTURE_CLICK_IDENTIFIERS,
  parseStoredAttribution,
  utmFromUrl,
} from '@/lib/forms/attribution'
import { claimSubmission, idempotencyKey, releaseSubmission } from '@/lib/forms/idempotency'
import { IDEMPOTENCY_WINDOW_SECONDS, LEAD_RATE_LIMIT } from '@/lib/forms/limits'
import {
  checkRateLimit,
  hashIdentifier,
  identifierFromHeaders,
  rateLimitIsDistributed,
} from '@/lib/forms/rate-limit'
import { resetMemoryStoreForTests, sharedStoreIsConfigured } from '@/lib/forms/shared-store'

describe('Rate limit', () => {
  beforeEach(() => resetMemoryStoreForTests())

  it('admits the allowance and refuses the attempt after it', async () => {
    const identifier = '198.51.100.7'

    for (let attempt = 1; attempt <= LEAD_RATE_LIMIT.limit; attempt += 1) {
      const result = await checkRateLimit({ identifier })
      expect(result.allowed, `attempt ${attempt}`).toBe(true)
    }

    const refused = await checkRateLimit({ identifier })
    expect(refused.allowed).toBe(false)
    expect(refused.retryAfterSeconds).toBeGreaterThan(0)
    expect(refused.retryAfterSeconds).toBeLessThanOrEqual(LEAD_RATE_LIMIT.windowSeconds)
  })

  it('keeps one bucket per identifier', async () => {
    for (let attempt = 0; attempt < LEAD_RATE_LIMIT.limit + 1; attempt += 1) {
      await checkRateLimit({ identifier: 'first' })
    }

    expect((await checkRateLimit({ identifier: 'second' })).allowed).toBe(true)
  })

  it('never uses the identifier as the key', () => {
    const identifier = '198.51.100.7'
    expect(hashIdentifier(identifier)).not.toContain(identifier)
    expect(hashIdentifier(identifier)).toMatch(/^[0-9a-f]{64}$/)
    expect(hashIdentifier(identifier)).toBe(hashIdentifier(identifier))
    expect(hashIdentifier('other')).not.toBe(hashIdentifier(identifier))
  })

  it('reads the first forwarded address, and buckets an unknown client', () => {
    expect(identifierFromHeaders(new Headers({ 'x-forwarded-for': '203.0.113.5, 10.0.0.1' }))).toBe(
      '203.0.113.5',
    )
    expect(identifierFromHeaders(new Headers({ 'x-real-ip': '203.0.113.9' }))).toBe('203.0.113.9')
    expect(identifierFromHeaders(new Headers())).toBe('unknown-client')
  })

  it('reports itself as not distributed until both the store and the secret exist', () => {
    // Neither is set in the test environment, and the flag has to say so: a
    // green gate on a per-instance window is the failure it exists to catch.
    expect(sharedStoreIsConfigured).toBe(false)
    expect(rateLimitIsDistributed).toBe(false)
  })
})

describe('Idempotency', () => {
  beforeEach(() => resetMemoryStoreForTests())

  const args = {
    formName: 'diagnostic' as const,
    workEmail: 'Name@Company.com',
    organization: 'Example Co',
    now: 1_756_000_000_000,
  }

  it('is stable inside a bucket and different across buckets', () => {
    expect(idempotencyKey(args)).toBe(idempotencyKey(args))
    expect(idempotencyKey({ ...args, workEmail: 'name@company.com ' })).toBe(idempotencyKey(args))

    const later = { ...args, now: args.now + IDEMPOTENCY_WINDOW_SECONDS * 1000 * 2 }
    expect(idempotencyKey(later)).not.toBe(idempotencyKey(args))
  })

  it('separates forms and organizations', () => {
    expect(idempotencyKey({ ...args, formName: 'contact' })).not.toBe(idempotencyKey(args))
    expect(idempotencyKey({ ...args, organization: 'Other Co' })).not.toBe(idempotencyKey(args))
  })

  it('holds no readable contact detail in the key', () => {
    expect(idempotencyKey(args)).not.toContain('company.com')
    expect(idempotencyKey(args)).not.toContain('Example')
  })

  it('claims once, then reports every repeat inside the window', async () => {
    const key = idempotencyKey(args)
    expect((await claimSubmission(key)).firstSubmission).toBe(true)
    expect((await claimSubmission(key)).firstSubmission).toBe(false)
  })

  it('gives the claim back so a failed delivery can be retried', async () => {
    const key = idempotencyKey(args)
    await claimSubmission(key)
    await releaseSubmission(key)
    expect((await claimSubmission(key)).firstSubmission).toBe(true)
  })
})

describe('Attribution', () => {
  it('reads the five UTM fields off the request URL', () => {
    expect(
      utmFromUrl(
        'https://hendricks.ai/diagnostic?utm_source=linkedin&utm_medium=social&utm_campaign=diag',
      ),
    ).toMatchObject({
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'diag',
    })

    expect(utmFromUrl(undefined)).toEqual({})
    expect(utmFromUrl('not a url')).toEqual({})
  })

  it('drops a malformed stored value rather than failing the submission', () => {
    expect(parseStoredAttribution('{')).toEqual({})
    expect(parseStoredAttribution(null)).toEqual({})
    expect(parseStoredAttribution(JSON.stringify({ utmSource: 'x'.repeat(400) }))).toEqual({})
  })

  it('lets the request name the current page and the stored record name first touch', () => {
    const merged = buildAttribution({
      storedRaw: JSON.stringify({ utmSource: 'newsletter', landingPage: 'https://hendricks.ai/' }),
      referer: 'https://hendricks.ai/diagnostic?utm_source=linkedin',
    })

    expect(merged.currentPage).toBe('https://hendricks.ai/diagnostic?utm_source=linkedin')
    expect(merged.utmSource).toBe('newsletter')
    expect(merged.landingPage).toBe('https://hendricks.ai/')
  })

  it('falls back to the request query when nothing was stored', () => {
    const merged = buildAttribution({
      storedRaw: null,
      referer: 'https://hendricks.ai/contact?utm_source=linkedin',
    })

    expect(merged.utmSource).toBe('linkedin')
    expect(merged.landingPage).toBeUndefined()
  })

  it('captures no click identifier until the Privacy Notice discloses one', () => {
    expect(CAPTURE_CLICK_IDENTIFIERS).toBe(false)

    // The fixture is the string the browser actually submits, built by the
    // client from a paid landing URL, rather than a hand-written blob of the
    // fields the server was already known to drop.
    const storedRaw = JSON.stringify(
      readFirstTouch(
        {
          href:
            'https://hendricks.ai/diagnostic?utm_source=google&gclid=CLICK_ID&msclkid=BING_ID&model=embedded',
        },
        'https://www.google.com/search?q=hendricks&gclid=CLICK_ID',
      ),
    )

    expect(storedRaw).not.toContain('CLICK_ID')
    expect(storedRaw).not.toContain('BING_ID')
    expect(storedRaw).not.toContain('embedded')
    expect(JSON.parse(storedRaw).utmSource).toBe('google')

    const merged = buildAttribution({
      storedRaw,
      referer: 'https://hendricks.ai/diagnostic?gclid=CLICK_ID&msclkid=BING_ID',
    })

    const payload = JSON.stringify(merged)
    expect(payload).not.toContain('CLICK_ID')
    expect(payload).not.toContain('BING_ID')
    expect(merged.landingPage).toBe('https://hendricks.ai/diagnostic?utm_source=google')
  })

  it('re-applies the allowlist to a forged first-touch record', () => {
    // The stored blob is client-supplied, so the server filters it again even
    // though the client already did.
    const merged = buildAttribution({
      storedRaw: JSON.stringify({
        landingPage: 'https://hendricks.ai/diagnostic?gclid=CLICK_ID&intent=brand',
        referrer: 'https://ads.example/click?msclkid=BING_ID',
      }),
      referer: null,
    })

    expect(merged.landingPage).toBe('https://hendricks.ai/diagnostic')
    expect(merged.referrer).toBe('https://ads.example/click')
  })

  it('drops a stored URL that will not parse rather than passing it through', () => {
    const merged = buildAttribution({
      storedRaw: JSON.stringify({ landingPage: 'not a url', referrer: 'also not a url' }),
      referer: null,
    })

    expect(merged.landingPage).toBeUndefined()
    expect(merged.referrer).toBeUndefined()
  })
})
