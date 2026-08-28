import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { researchArticles } from '@/content/research'

/**
 * Static `opengraph-image.png` in this dynamic segment makes Next emit
 * `/research/-/opengraph-image-…` on every article. Serve the ship still
 * through a handler so each slug gets a real image URL. The bytes are the
 * public file, not a redraw.
 */
export const alt = 'Hendricks research study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return researchArticles.map((article) => ({ slug: article.slug }))
}

export default async function OpengraphImage() {
  const file = await readFile(path.join(process.cwd(), 'public/og/signed-still-1200x630.png'))

  return new Response(file, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
