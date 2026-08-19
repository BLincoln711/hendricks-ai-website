import { hero, meta } from '@/content/pages/corrections'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = meta.title
export { size, contentType } from '@/lib/seo/og-image'

/**
 * The eyebrow carries "Editorial Policy" rather than the DirectAnswer term, so
 * the card reads as a policy page instead of repeating its own one-word title.
 */
export default function OpengraphImage() {
  return renderOgImage({ eyebrow: hero.eyebrow, title: hero.title })
}
