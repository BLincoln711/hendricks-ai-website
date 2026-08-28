import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

/**
 * Content-route social cards use Imagery's wordless signed-still, not the
 * generated type-card. The bytes are the ship file; a lookalike is a defect.
 */
const SHIP_SHA256 = '44e690505b450d53c1ab31e416fda3234d78c79b53664fc042a6f466cf19c17e'
const SHIP_BYTES = 896953

const CONTENT_OG_PATHS = [
  'src/app/(editorial)/research/opengraph-image.png',
  'src/app/(editorial)/what-is-search-intelligence-engineering/opengraph-image.png',
  'src/app/(editorial)/what-is-selection-intelligence/opengraph-image.png',
  'src/app/(editorial)/what-is-ai-mediated-search/opengraph-image.png',
  'src/app/(editorial)/what-is-generative-engine-optimization/opengraph-image.png',
  'src/app/(editorial)/ai-selection-problem/opengraph-image.png',
  'src/app/(editorial)/ai-visibility-tool-or-partner/opengraph-image.png',
] as const

function sha256(filePath: string) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

describe('wordless signed-still content og:image', () => {
  it('keeps the public ship file and the seven static route copies on the exact still', () => {
    const source = path.join(process.cwd(), 'public/og/signed-still-1200x630.png')
    expect(readFileSync(source).byteLength).toBe(SHIP_BYTES)
    expect(sha256(source)).toBe(SHIP_SHA256)

    for (const relative of CONTENT_OG_PATHS) {
      const filePath = path.join(process.cwd(), relative)
      expect(readFileSync(filePath).byteLength, relative).toBe(SHIP_BYTES)
      expect(sha256(filePath), relative).toBe(SHIP_SHA256)
    }
  })

  it('serves research article cards from the ship file, not a type-card redraw', () => {
    const handler = readFileSync(
      path.join(process.cwd(), 'src/app/(editorial)/research/[slug]/opengraph-image.tsx'),
      'utf8',
    )
    expect(handler).toContain("public/og/signed-still-1200x630.png")
    expect(handler).not.toContain('renderOgImage')
    expect(handler).toContain('generateStaticParams')
  })
})
