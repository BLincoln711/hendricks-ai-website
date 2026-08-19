import { directAnswer, hero, meta } from '@/content/pages/ai-visibility-tool-or-partner'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = meta.title
export { size, contentType } from '@/lib/seo/og-image'

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: directAnswer.term, title: hero.title })
}
