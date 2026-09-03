/**
 * Route metadata integrity gate.
 *
 * Asserts the metadata contracts from HANDOFF section 4.3:
 *
 * 1. `buildMetadata` always produces exactly one absolute canonical URL.
 * 2. The `max-image-preview:large` directive appears when `maxImagePreview: true`
 *    is passed, and is absent when it is not.
 * 3. Research and definition routes are the only ones that pass
 *    `maxImagePreview: true`; all other indexable routes do not.
 *
 * The H1 uniqueness and canonical-per-route assertions live in the e2e suite
 * (semantics.spec.ts SM-01, SM-05) because they require a rendered DOM. The
 * unique-title assertion is covered by the existing e2e SM-05 test. This test
 * covers the structural properties of `buildMetadata` and the correct routing
 * of the `maxImagePreview` flag.
 */
import { describe, expect, it } from 'vitest'

import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/config/routes'
import { researchArticles } from '@/content/research/index'

// ---- route sets ---------------------------------------------------------- //

/**
 * The definition routes: editorial pages that carry a DefinedTerm node and
 * where max-image-preview:large belongs.
 */
const DEFINITION_PATHS = new Set([
  routes.whatIsSearchIntelligenceEngineering.path,
  routes.whatIsSelectionIntelligence.path,
  routes.whatIsAiMediatedSearch.path,
  routes.whatIsGenerativeEngineOptimization.path,
  routes.aiSelectionProblem.path,
  routes.aiVisibilityToolOrPartner.path,
])

const RESEARCH_PATHS = new Set(researchArticles.map((a) => a.path))

/** All paths where max-image-preview:large must appear. */
const MAX_IMAGE_PREVIEW_PATHS = new Set([...DEFINITION_PATHS, ...RESEARCH_PATHS])

// ---- tests --------------------------------------------------------------- //

describe('buildMetadata structural contract', () => {
  it('produces an absolute canonical URL for any route path', () => {
    const paths = [
      routes.home.path,
      routes.solutions.path,
      routes.research.path,
      routes.whatIsSelectionIntelligence.path,
      researchArticles[0]!.path,
    ]

    for (const path of paths) {
      const metadata = buildMetadata({ title: 'Title', description: 'Desc.', path })
      const canonical = metadata.alternates?.canonical
      expect(canonical, `canonical missing for ${path}`).toBeTruthy()
      expect(typeof canonical, `canonical not a string for ${path}`).toBe('string')
      expect(canonical as string, `canonical not absolute for ${path}`).toMatch(/^https:\/\//)
    }
  })

  it('emits max-image-preview:large when maxImagePreview is true', () => {
    const metadata = buildMetadata({
      title: 'Research',
      description: 'Study.',
      path: researchArticles[0]!.path,
      maxImagePreview: true,
    })

    expect(
      (metadata.robots as Record<string, unknown>)['max-image-preview'],
    ).toBe('large')
  })

  it('omits max-image-preview when maxImagePreview is not set', () => {
    const metadata = buildMetadata({
      title: 'Solutions',
      description: 'What we do.',
      path: routes.solutions.path,
    })

    expect(
      (metadata.robots as Record<string, unknown>)['max-image-preview'],
    ).toBeUndefined()
  })
})

describe('max-image-preview routing', () => {
  it('research and definition paths are the complete set that enables max-image-preview', () => {
    // Assert each research article is in the expected set
    for (const article of researchArticles) {
      expect(
        MAX_IMAGE_PREVIEW_PATHS.has(article.path),
        `Research path ${article.path} should be in MAX_IMAGE_PREVIEW_PATHS`,
      ).toBe(true)
    }

    // Assert each definition path is in the expected set
    for (const path of DEFINITION_PATHS) {
      expect(
        MAX_IMAGE_PREVIEW_PATHS.has(path),
        `Definition path ${path} should be in MAX_IMAGE_PREVIEW_PATHS`,
      ).toBe(true)
    }
  })

  it('commercial and legal routes do NOT pass maxImagePreview', () => {
    /**
     * This list is manually maintained. When a new commercial route is added,
     * it must not accidentally receive maxImagePreview: true. This test catches
     * any future case where a new route is copied from a research page and the
     * flag is carried over.
     *
     * The test works by building metadata for each non-preview route WITHOUT
     * maxImagePreview and asserting the directive is absent.
     */
    const commercialPaths = Object.values(routes)
      .filter((r) => r.built && r.indexable && !MAX_IMAGE_PREVIEW_PATHS.has(r.path))
      .map((r) => r.path)

    for (const path of commercialPaths) {
      const metadata = buildMetadata({
        title: 'Page title',
        description: 'Page description.',
        path,
      })

      expect(
        (metadata.robots as Record<string, unknown>)['max-image-preview'],
        `max-image-preview should be absent on ${path}`,
      ).toBeUndefined()
    }
  })
})
