import { readFileSync } from 'node:fs'
import path from 'node:path'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Wordmark } from '@/components/layout/wordmark'

import {
  buildScope,
  contrastRatio,
  parseHex,
  parseTokenFile,
  resolveToken,
  TOKEN_FILE,
  type Rgb,
} from '../../scripts/lib/tokens'

/**
 * The wordmark is a bitmap, so no token can tell you whether it is legible: the
 * ink is baked into the file. `scripts/build-brand-assets.ts` writes two
 * variants named for the ground they sit on, and picking the wrong one puts
 * near-black ink on the near-black canvas ground at roughly 1:1 without failing
 * a single style gate. This decodes whichever file the component actually asks
 * for and holds it to the 3:1 a meaning-bearing mark needs.
 */
const MIN_RATIO = 3

/** The `/brand/...png` the component requested, out of the next/image loader URL. */
function requestedAsset(src: string): string {
  const url = new URL(src, 'https://hendricks.ai')
  const inner = url.searchParams.get('url')
  return inner ?? url.pathname
}

/** The mean colour of the mark's ink, over its opaque pixels only. */
async function meanInk(file: string): Promise<Rgb> {
  const { default: sharp } = await import('sharp')
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let count = 0
  const total = [0, 0, 0]
  for (let px = 0; px < data.length; px += info.channels) {
    if (data[px + 3] < 200) continue
    count += 1
    for (let channel = 0; channel < 3; channel += 1) total[channel] += data[px + channel]
  }

  expect(count, 'the asset has opaque pixels').toBeGreaterThan(0)
  const [r, g, b] = total.map((sum) => sum / count)
  return { r, g, b }
}

describe('the wordmark reads against the canvas ground', () => {
  const parsed = parseTokenFile(readFileSync(path.join(process.cwd(), TOKEN_FILE), 'utf8'))
  const ground = resolveToken('--bg', buildScope(parsed, 'page'))
  const bg = ground.ok ? parseHex(ground.value) : null

  it('renders the Field White variant, not the near-black one', () => {
    render(<Wordmark />)
    expect(requestedAsset(screen.getByAltText('Hendricks').getAttribute('src') ?? '')).toBe(
      '/brand/hendricks-wordmark-dark.png',
    )
  })

  it('has ink at 3:1 or better against --bg', async () => {
    expect(bg, '--bg resolves to a hex').not.toBeNull()
    render(<Wordmark />)
    const asset = requestedAsset(screen.getByAltText('Hendricks').getAttribute('src') ?? '')
    const ink = await meanInk(path.join(process.cwd(), 'public', asset))
    expect(contrastRatio(ink, bg!)).toBeGreaterThanOrEqual(MIN_RATIO)
  })
})
