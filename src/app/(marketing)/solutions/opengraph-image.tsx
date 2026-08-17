import { solutionsHero, solutionsMeta } from '@/content/pages/solutions'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = solutionsMeta.title
export { size, contentType } from '@/lib/seo/og-image'

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: solutionsHero.eyebrow, title: solutionsHero.title })
}
