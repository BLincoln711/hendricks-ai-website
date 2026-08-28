import { describe, expect, it } from 'vitest'

import * as about from '@/content/pages/about'
import * as forAgencies from '@/content/pages/for-agencies'
import * as spe from '@/content/pages/search-presence-engineering'
import * as answerStability from '@/content/research/answer-stability-two-runs'
import * as hendricksSelectionBaseline from '@/content/research/hendricks-selection-baseline'
import { researchArticles, researchCategories } from '@/content/research'
import * as noSharedSource from '@/content/research/no-shared-source-across-engines'
import * as whoGetsCited from '@/content/research/who-gets-cited-in-ai-answers'

const INSTRUMENT_BODY =
  'The instrument is a first-party probe that records the URLs each engine cited, one question at a time, per engine. It is the same instrument Hendricks points at a client engagement.'

const INSTRUMENT_SAMPLE = 'Instrument: a first-party probe.'

const VENDOR_TOKENS = ['DataForSEO', 'AI Optimization API', '40101'] as const

const studies = [
  { name: 'hendricks-selection-baseline', content: hendricksSelectionBaseline },
  { name: 'answer-stability-two-runs', content: answerStability },
  { name: 'who-gets-cited-in-ai-answers', content: whoGetsCited },
  { name: 'no-shared-source-across-engines', content: noSharedSource },
] as const

function corpusOf(value: unknown): string {
  return JSON.stringify(value)
}

describe('QA delete-only cuts: vendor tokens', () => {
  it.each(studies)('$name carries the QA-passed instrument remnants and no vendor tokens', ({ content }) => {
    expect(content.methodology.lead).toBe(INSTRUMENT_BODY)
    expect(content.sample.items).toContain(INSTRUMENT_SAMPLE)

    const corpus = corpusOf(content)
    for (const token of VENDOR_TOKENS) {
      expect(corpus, `live research copy still contains ${token}`).not.toContain(token)
    }
  })

  it('keeps upstream server error language and Google AI Overviews error counts on the self-baseline', () => {
    const corpus = corpusOf(hendricksSelectionBaseline)
    expect(corpus).toContain('upstream server error')
    expect(corpus).toContain('Run 1 errored on 6 of its 45 cells, all of them Google AI Overviews.')
    expect(corpus).toContain('Run 2 errored on 4 of its 51 cells')
    expect(corpus).toContain('Run 2 errored on 4 of 51, all of them Google AI Overviews again.')
  })

  it('leaves ahrefs.com as a measured domain on the self-baseline', () => {
    expect(corpusOf(hendricksSelectionBaseline)).toContain('ahrefs.com')
  })
})

describe('QA delete-only cuts: About, SPE, agencies, research hub', () => {
  it('removes the Ahrefs CAB block and the Total Search operating-models label from /about', () => {
    const corpus = corpusOf(about)
    expect(corpus).not.toContain('Ahrefs Customer Advisory Board')
    expect(corpus).not.toContain('Total Search operating models')
    expect(about.experience.roles.map((role) => role.title)).toEqual([
      'Global Paid Search Director',
      'Global Search and Innovation Lead',
      'Founder',
    ])
  })

  it('removes Total Search from the three named live routes', () => {
    expect(corpusOf(spe)).not.toContain('Total Search')
    expect(corpusOf(forAgencies)).not.toContain('Total Search')
    expect([...researchCategories]).not.toContain('Total Search')
    expect(researchArticles.map((article) => article.category as string)).not.toContain(
      'Total Search',
    )
  })
})
