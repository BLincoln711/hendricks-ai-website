import { describe, expect, it } from 'vitest'

import { siteConfig } from '@/config/site'
import { organizationSchema, personAuthor, personSchema } from '@/lib/seo/json-ld'

const COMPANY_LINKEDIN = 'https://www.linkedin.com/company/hendricksai'
const PERSONAL_LINKEDIN = 'https://www.linkedin.com/in/brandonlincolnhendricks'
const SEARCH_ECONOMY = 'https://thesearcheconomy.com'
const MEDIUM =
  'https://medium.com/@brandonlincolnhendricks/what-is-a-search-intelligence-engineer-f6211b8339a6'
const X_PROFILE = 'https://x.com/brandonlincolnh'

function asList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string')
  if (typeof value === 'string') return [value]
  return []
}

describe('Person and Organization sameAs locks', () => {
  const organization = organizationSchema() as { sameAs?: unknown; legalName?: string }
  const person = personSchema({
    jobTitle: siteConfig.founderRole,
    imagePath: '/images/brandon-lincoln-hendricks-portrait.jpg',
    alumniOf: [
      { name: 'Merkle', jobTitle: 'Global Paid Search Director' },
      { name: 'SolarWinds', jobTitle: 'Global Search and Innovation Lead' },
    ],
  }) as { sameAs?: unknown; '@id'?: string }

  const orgSameAs = asList(organization.sameAs)
  const personSameAs = asList(person.sameAs)

  it('puts company LinkedIn on Organization only', () => {
    expect(orgSameAs).toEqual([COMPANY_LINKEDIN])
    expect(personSameAs).not.toContain(COMPANY_LINKEDIN)
  })

  it('puts the Person join list on Person only', () => {
    expect(personSameAs).toEqual([MEDIUM, SEARCH_ECONOMY, PERSONAL_LINKEDIN, X_PROFILE])
    expect(orgSameAs).not.toContain(PERSONAL_LINKEDIN)
    expect(orgSameAs).not.toContain(SEARCH_ECONOMY)
    expect(orgSameAs).not.toContain(X_PROFILE)
    expect(orgSameAs).not.toContain(MEDIUM)
  })

  it('fails if Person and Organization LinkedIn URLs are swapped', () => {
    expect(orgSameAs).toContain(COMPANY_LINKEDIN)
    expect(orgSameAs).not.toContain(PERSONAL_LINKEDIN)
    expect(personSameAs).toContain(PERSONAL_LINKEDIN)
    expect(personSameAs).not.toContain(COMPANY_LINKEDIN)
  })

  it('keeps The Search Economy off Organization and on Person', () => {
    expect(personSameAs).toContain(SEARCH_ECONOMY)
    expect(orgSameAs).not.toContain(SEARCH_ECONOMY)
  })

  it('points the Person node at /about#person', () => {
    expect(person['@id']).toBe('https://hendricks.ai/about#person')
    expect(siteConfig.founderPersonId).toBe('https://hendricks.ai/about#person')
  })

  it('keeps the registered legal name on Organization', () => {
    expect(organization.legalName).toBe('Hendricks Agency LLC')
  })

  it('keeps sameAs off the expanded Person author used on page graphs', () => {
    expect(personAuthor()).not.toHaveProperty('sameAs')
    expect(personAuthor().jobTitle).toBe(siteConfig.founderRole)
  })
})
