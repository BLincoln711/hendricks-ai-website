import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { researchArticles } from '@/content/research'
import { CITATION_PROBE_MEASUREMENT_TECHNIQUE } from '@/content/research/citation-run-constants'
import {
  REQUIRED_MANIFEST_FILES,
  REQUIRED_RESULT_FILES,
  RUN_2026_08_18_FILENAME,
  archiveFileExists,
  expectedArchiveFiles,
} from '@/content/research/citation-runs'
import { citationRunNodes } from '@/lib/seo/citation-run-nodes'
import { articleSchema } from '@/lib/seo/json-ld'

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

    const aug18 = expectedArchiveFiles().find((file) => file.filename === RUN_2026_08_18_FILENAME)
    expect(aug18?.required).toBe(false)
    expect(aug18?.present, 'Aug 18 archive must not be fabricated').toBe(false)
    expect(archiveFileExists(RUN_2026_08_18_FILENAME)).toBe(false)
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

      const { datasets, articleExtras } = citationRunNodes(article!)
      const publishedRuns = runs.filter((run) => archiveFileExists(run.filename))
      const primaryIds = runs.filter((run) => run.role === 'primary').map((run) => run.runId)
      const articleNode = articleSchema({
        path: article!.path,
        headline: article!.title,
        description: article!.summary,
        articleSection: article!.category,
        datePublished: article!.publishedDate,
        dateModified: article!.updatedDate,
        claimClass: article!.claimClass,
        identifier: articleExtras?.identifier,
        isBasedOn: articleExtras?.isBasedOn,
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
      expect(articleNode.isBasedOn).toEqual(
        datasets.map((node) => ({ '@id': (node as { '@id': string })['@id'] })),
      )
      expect(articleExtras?.isBasedOn).toEqual(
        datasets.map((node) => ({ '@id': (node as { '@id': string })['@id'] })),
      )

      const publishedRunIds = new Set(publishedRuns.map((run) => run.runId))
      const unpublishedRunIds = runs
        .filter((run) => !archiveFileExists(run.filename))
        .map((run) => run.runId)

      expect(
        (datasets as Array<{ identifier: string }>).map((dataset) => dataset.identifier).filter(
          (id) => unpublishedRunIds.includes(id),
        ),
      ).toEqual([])

      for (const dataset of datasets as Array<{
        identifier: string
        measurementTechnique: string
        description: string
      }>) {
        if (publishedRunIds.has(dataset.identifier)) {
          expect(dataset.measurementTechnique).toBe(CITATION_PROBE_MEASUREMENT_TECHNIQUE)
          expect(dataset.identifier).toMatch(/^\d{4}-\d{2}-\d{2}(-\d{6})?$/)
          expect(dataset.description.toLowerCase()).toContain('citation-presence')
          for (const banned of BANNED_METRIC_NAMES) {
            expect(dataset.description, `${slug} ${dataset.identifier}`).not.toContain(banned)
          }
        }
      }
    }
  })

  it('omits Dataset contentUrl for the Aug 18 archive until that file exists', () => {
    const article = researchArticles.find((entry) => entry.slug === 'hendricks-selection-baseline')
    expect(article).toBeDefined()

    const { datasets, articleExtras } = citationRunNodes(article!)
    const serialized = JSON.stringify({ datasets, articleExtras })
    const aug18Path = '/history/runs/hendricks-2026-08-18.json'
    const aug19Path = '/history/runs/hendricks-2026-08-19-110930.json'

    if (archiveFileExists(RUN_2026_08_18_FILENAME)) {
      expect(serialized).toContain(aug18Path)
    } else {
      expect(serialized).not.toContain(aug18Path)
      expect(serialized).not.toContain('hendricks-2026-08-18.json')
      expect(serialized.toLowerCase()).not.toContain('downloadurl')
      expect(JSON.stringify(articleExtras?.isBasedOn ?? [])).not.toContain('dataset-2026-08-18')
    }

    if (archiveFileExists('hendricks-2026-08-19-110930.json')) {
      expect(serialized).toContain(aug19Path)
      expect(JSON.stringify(articleExtras?.isBasedOn ?? [])).toContain('dataset-2026-08-19-110930')
    }
  })

  it('builds research-page Dataset nodes through the archive-presence gate', () => {
    const page = readRepoFile('src/app/(editorial)/research/[slug]/page.tsx')
    expect(page).toContain("import { citationRunNodes } from '@/lib/seo/citation-run-nodes'")
    expect(page).not.toContain('citationDatasetSchema')
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
      'src/lib/seo/citation-run-nodes.ts',
    ]

    for (const file of files) {
      const source = readRepoFile(file)
      for (const needle of VENDOR_NEEDLES) {
        expect(source, `${file} contains ${needle}`).not.toContain(needle)
      }
    }
  })
})
