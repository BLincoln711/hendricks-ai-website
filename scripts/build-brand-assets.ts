/**
 * Brand asset pipeline.
 *
 * The source wordmark is a flat two-color PNG: ink #03060D and a dot #1DA1F3,
 * with antialiasing carried in the alpha channel (43% of pixels are partially
 * transparent). The dot is separated from the letterforms by an empty 20px
 * column gap at x=2154–2173, so the two can be split spatially rather than by a
 * fragile per-pixel color match — antialiased dot-edge pixels desaturate toward
 * transparent and would otherwise be misread as ink.
 *
 * Each output is produced by painting a target color through the source alpha as
 * a mask. This reproduces the original letterforms exactly and leaves no dark
 * fringe, which a naive RGB find-and-replace would.
 *
 * #1DA1F3 is never emitted. It fails WCAG AA on white at 2.8:1 and is not a
 * design-system token; the dot is recolored to Signal Blue #2458E6 so the
 * wordmark matches the signal-dot motif used across the diagrams.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const SOURCE_LOGO = '/Users/m3-ultra-blh/claudecode/hendricks/public/hendricks-logo.png'
const SOURCE_PORTRAIT = '/Users/m3-ultra-blh/claudecode/hendricks/public/brandon-hendricks-2026.jpg'

const BRAND_DIR = path.join(process.cwd(), 'public/brand')
const IMAGES_DIR = path.join(process.cwd(), 'public/images')
const APP_DIR = path.join(process.cwd(), 'src/app')

/** Midpoint of the empty column gap between the final letter and the dot. */
const DOT_SPLIT_X = 2164

const TOKENS = {
  navy: [7, 26, 43],
  blue: [36, 88, 230],
  field: [247, 249, 252],
  ink: [3, 6, 13],
} as const

type Rgb = readonly [number, number, number] | ReadonlyArray<number>

/**
 * Paint `inkColor` through the source alpha for x < DOT_SPLIT_X and `dotColor`
 * for x >= DOT_SPLIT_X, preserving the original alpha everywhere.
 */
async function recolorWordmark(inkColor: Rgb, dotColor: Rgb) {
  const { data, info } = await sharp(SOURCE_LOGO)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = info
  const out = Buffer.alloc(width * height * 4)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const color = x >= DOT_SPLIT_X ? dotColor : inkColor
      out[i] = color[0]
      out[i + 1] = color[1]
      out[i + 2] = color[2]
      out[i + 3] = data[i + 3]
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9 })
}

function signalDotSvg(fill: string, size = 512) {
  const r = size * 0.3125
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Hendricks signal dot"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${fill}"/></svg>`
}

function iconTileSvg(size: number) {
  const radius = size * 0.22
  const dotR = size * 0.2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#071A2B"/><circle cx="${size / 2}" cy="${size / 2}" r="${dotR}" fill="#2458E6"/></svg>`
}

async function main() {
  await Promise.all([
    mkdir(BRAND_DIR, { recursive: true }),
    mkdir(IMAGES_DIR, { recursive: true }),
  ])

  // Light surfaces: original near-black ink, Signal Blue dot.
  await (await recolorWordmark(TOKENS.ink, TOKENS.blue))
    .toFile(path.join(BRAND_DIR, 'hendricks-wordmark-light.png'))

  // Navy surfaces: Field White ink, Signal Blue dot.
  await (await recolorWordmark(TOKENS.field, TOKENS.blue))
    .toFile(path.join(BRAND_DIR, 'hendricks-wordmark-dark.png'))

  // Standalone signal dot, used as a motif source and the icon base.
  await sharp(Buffer.from(signalDotSvg('#2458E6')))
    .png()
    .toFile(path.join(BRAND_DIR, 'signal-dot.png'))

  // App icons. At 16px a wordmark is illegible; the dot is not.
  await sharp(Buffer.from(iconTileSvg(512))).resize(512, 512).png()
    .toFile(path.join(APP_DIR, 'icon.png'))
  await sharp(Buffer.from(iconTileSvg(180))).resize(180, 180).png()
    .toFile(path.join(APP_DIR, 'apple-icon.png'))

  /*
   * Founder portrait.
   *
   * No higher-resolution original exists. The master is 1024x819 landscape; the
   * subject sits left of centre, so the portrait crop starts at x=35. Graded
   * cool because the original warm studio backdrop reads muddy against Field
   * White #F7F9FC. No upscaling — that would invent facial detail on a real
   * person.
   */
  await sharp(SOURCE_PORTRAIT)
    .extract({ left: 35, top: 0, width: 660, height: 819 })
    .recomb([
      [0.96, 0.0, 0.0],
      [0.0, 1.0, 0.0],
      [0.0, 0.0, 1.05],
    ])
    .linear(1.05, -6)
    .modulate({ saturation: 0.92 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(IMAGES_DIR, 'brandon-lincoln-hendricks-portrait.jpg'))

  const outputs = [
    'public/brand/hendricks-wordmark-light.png',
    'public/brand/hendricks-wordmark-dark.png',
    'public/brand/signal-dot.png',
    'src/app/icon.png',
    'src/app/apple-icon.png',
    'public/images/brandon-lincoln-hendricks-portrait.jpg',
  ]

  for (const file of outputs) {
    const meta = await sharp(path.join(process.cwd(), file)).metadata()
    console.log(`${file} — ${meta.width}x${meta.height} ${meta.format}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
