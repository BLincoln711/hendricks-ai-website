import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { researchArticles } from '@/content/research'
import { CITATION_PROBE_MEASUREMENT_TECHNIQUE } from '@/content/research/citation-run-constants'
import {
  REQUIRED_MANIFEST_FILES,
  REQUIRED_RESULT_FILES,
  RUN_2026_08_18_FILENAME,
  expectedArchiveFiles,
} from '@/content/research/citation-runs'
import { articleSchema, citationDatasetSchema } from '@/lib/seo/json-ld'

const VENDOR_NEEDLES = ['Data' + 'ForSEO', 'data' + 'forseo', 'Optimization' + ' API']

const BANNED_METRIC_NAMES = [
  'OCR',
  'ORR',
  'Observed Consideration Rate',
  'Observed Recommendation Rate',
  'Selection Stability',
  'Commercial Selection Gap',
]

function readRepoFile(relative: string): string {
  return readFileSync(path.join(process.cwd(), relative), 'utf8')
}

describe('citation-presence archives', () => {
  it('names the required result and manifest files without inventing cell bytes', () => {
    expect(REQUIRED_RESULT_FILES).toEqual([
      'hendricks-2026-08-19-110930.json',
      'hendricks-2026-08-19-181155.json',
      'hendricks-2026-08-20-060002.json',
      'hendricks-2026-08-20-104059.json',
      'hendricks-2026-08-20-105338.json',
      'hendricks-2026-08-20-110653.json',
    ])
    expect(REQUIRED_MANIFEST_FILES).toEqual([
      'manifest-2026-08-19-110930.json',
      'manifest-2026-08-19-181155.json',
      'manifest-2026-08-20-110653.json',
    ])
    expect(RUN_2026_08_18_FILENAME).toBe('hendricks-2026-08-18.json')

    for (const file of expectedArchiveFiles()) {
      expect(file.present, `${file.filename} must not be fabricated in this commit`).toBe(false)
    }
  })

  it('locks measurementTechnique to the citation-presence sentence', () => {
    expect(CITATION_PROBE_MEASUREMENT_TECHNIQUE).toBe(
      'First-party probe: one question per engine per cell; cited URL hosts recorded per cell',
    )
  })

  it('attaches primary run ids and Dataset nodes to the four citation studies', () => {
    const expected = {
      'hendricks-selection-baseline': ['2026-08-19-110930', '2026-08-18'],
      'answer-stability-two-runs': ['2026-08-19-110930', '2026-08-19-181155'],
      'who-gets-cited-in-ai-answers': ['2026-08-19-110930'],
      'no-shared-source-across-engines': ['2026-08-20-110653'],
    } as const

    for (const [slug, runIds] of Object.entries(expected)) {
      const article = researchArticles.find((entry) => entry.slug === slug)
      expect(article, slug).toBeDefined()
      const runs = article!.content.citationRuns ?? []
      expect(runs.map((run) => run.runId)).toEqual([...runIds])

      const datasets = runs.map((run) =>
        citationDatasetSchema({
          path: article!.path,
          runId: run.runId,
          name: run.name,
          description: run.description,
          temporalCoverage: run.temporalCoverage,
          contentUrl: `/history/runs/${run.filename}`,
        }),
      )

      const primaryIds = runs.filter((run) => run.role === 'primary').map((run) => run.runId)
      const articleNode = articleSchema({
        path: article!.path,
        headline: article!.title,
        description: article!.summary,
        articleSection: article!.category,
        datePublished: article!.publishedDate,
        dateModified: article!.updatedDate,
        claimClass: article!.claimClass,
        identifier: primaryIds.length === 1 ? primaryIds[0] : primaryIds,
        isBasedOn: datasets.map((node) => ({ '@id': node['@id'] })),
      })

      expect(articleNode.author).toMatchObject({
        '@type': 'Person',
        name: 'Brandon Lincoln Hendricks',
        jobTitle: 'Search Intelligence Engineer',
        url: 'https://hendricks.ai/about',
      })
      expect(articleNode.identifier).toEqual(
        primaryIds.length === 1 ? primaryIds[0] : [...primaryIds],
      )
      expect(articleNode.isBasedOn).toEqual(datasets.map((node) => ({ '@id': node['@id'] })))

      for (const dataset of datasets) {
        expect(dataset.measurementTechnique).toBe(CITATION_PROBE_MEASUREMENT_TECHNIQUE)
        expect(dataset.identifier).toMatch(/^\d{4}-\d{2}-\d{2}(-\d{6})?$/)
        expect(dataset.description.toLowerCase()).toContain('citation-presence')
        for (const banned of BANNED_METRIC_NAMES) {
          expect(dataset.description, `${slug} ${dataset.identifier}`).not.toContain(banned)
        }
      }
    }
  })

  it('does not put hasPart on no-shared while the six result files are unpublished', () => {
    const article = researchArticles.find((entry) => entry.slug === 'no-shared-source-across-engines')
    expect(article?.content.citationRuns).toHaveLength(1)
    expect(article?.content.citationRuns?.[0]?.runId).toBe('2026-08-20-110653')
  })

  it('serves /history/runs/* with immutable cache headers', () => {
    const config = readRepoFile('next.config.ts')
    expect(config).toContain("source: '/history/runs/:path*'")
    expect(config).toContain('public, max-age=31536000, immutable')
  })

  it('keeps vendor product names out of the new archive schema and copy', () => {
    const files = [
      'src/content/research/citation-run-constants.ts',
      'src/content/research/citation-runs.ts',
      'src/content/research/hendricks-selection-baseline.ts',
      'src/content/research/answer-stability-two-runs.ts',
      'src/content/research/who-gets-cited-in-ai-answers.ts',
      'src/content/research/no-shared-source-across-engines.ts',
      'src/lib/seo/json-ld.ts',
    ]

    for (const file of files) {
      const source = readRepoFile(file)
      for (const needle of VENDOR_NEEDLES) {
        expect(source, `${file} contains ${needle}`).not.toContain(needle)
      }
    }
  })
})
