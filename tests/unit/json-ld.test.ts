import { describe, expect, it } from 'vitest'

import {
  breadcrumbSchema,
  definedTermSchema,
  jsonLdGraph,
  organizationSchema,
  serializeJsonLd,
} from '@/lib/seo/json-ld'
import * as wisi from '@/content/pages/what-is-selection-intelligence'

describe('serializeJsonLd', () => {
  it('escapes a closing script tag so it cannot break out of the script block', () => {
    const output = serializeJsonLd({ name: '</script><img onerror=alert(1)>' })

    expect(output).not.toContain('</script>')
    expect(output).not.toContain('<')
    expect(output).toContain('\\u003c')
  })

  it('escapes line and paragraph separators that are valid JSON but invalid JS', () => {
    const output = serializeJsonLd({ note: 'a\u2028b\u2029c' })

    expect(output).toContain('\\u2028')
    expect(output).toContain('\\u2029')
  })

  it('still produces valid JSON after escaping', () => {
    const output = serializeJsonLd({ name: 'Hendricks & Co <test>' })

    expect(() => JSON.parse(output)).not.toThrow()
    expect(JSON.parse(output)).toEqual({ name: 'Hendricks & Co <test>' })
  })
})

describe('organizationSchema', () => {
  it('omits fields that have not been verified', () => {
    // CONTENT_VERIFICATION.md O1–O4 — these may not be emitted until approved.
    const schema = organizationSchema() as Record<string, unknown>

    expect(schema).not.toHaveProperty('foundingDate')
    expect(schema).not.toHaveProperty('address')
    expect(schema).not.toHaveProperty('contactPoint')
    expect(schema).not.toHaveProperty('sameAs')
  })

  it('includes the verified core identity fields', () => {
    const schema = organizationSchema() as Record<string, unknown>

    expect(schema.name).toBe('Hendricks')
    expect(schema['@type']).toBe('Organization')
    expect(schema.url).toContain('hendricks.ai')
  })
})

describe('breadcrumbSchema', () => {
  it('numbers positions from one and resolves absolute item URLs', () => {
    const schema = breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Selection Intelligence' },
    ])

    expect(schema.itemListElement).toHaveLength(3)
    expect(schema.itemListElement[0].position).toBe(1)
    expect(schema.itemListElement[1]).toMatchObject({
      position: 2,
      name: 'Solutions',
      item: 'https://hendricks.ai/solutions',
    })
    // The current page carries no item URL.
    expect(schema.itemListElement[2]).not.toHaveProperty('item')
  })
})

describe('definedTermSchema', () => {
  it('describes the term with the answer visible on the page', () => {
    // docs/06 §8 — the markup may only reproduce visible content. Passing the
    // page's own directAnswer through is what keeps that true.
    const schema = definedTermSchema({
      path: '/what-is-selection-intelligence',
      term: wisi.directAnswer.term,
      directAnswer: wisi.directAnswer.answer,
    })

    expect(schema.name).toBe('Selection Intelligence')
    expect(schema.description).toBe(wisi.directAnswer.answer)
    expect(schema.url).toBe('https://hendricks.ai/what-is-selection-intelligence')
  })

  it('groups every term into one shared vocabulary set', () => {
    const a = definedTermSchema({ path: '/a', term: 'A', directAnswer: 'A is a thing.' })
    const b = definedTermSchema({ path: '/b', term: 'B', directAnswer: 'B is a thing.' })

    expect(a['@id']).not.toBe(b['@id'])
    expect(a.inDefinedTermSet['@id']).toBe(b.inDefinedTermSet['@id'])
  })
})

describe('jsonLdGraph', () => {
  it('wraps nodes in a single context and graph', () => {
    const graph = jsonLdGraph({ '@type': 'WebPage' }, { '@type': 'Organization' })

    expect(graph['@context']).toBe('https://schema.org')
    expect(graph['@graph']).toHaveLength(2)
  })
})
