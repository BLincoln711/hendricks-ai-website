import { directAnswer, hero, meta } from '@/content/pages/what-is-generative-engine-optimization'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = meta.title
export { size, contentType } from '@/lib/seo/og-image'

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: directAnswer.term, title: hero.title })
}
