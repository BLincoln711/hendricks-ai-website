import { termsOfUse } from '@/content/legal/terms'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = termsOfUse.meta.title
export { size, contentType } from '@/lib/seo/og-image'

export default function OpengraphImage() {
  return renderOgImage({ eyebrow: termsOfUse.hero.eyebrow, title: termsOfUse.hero.title })
}
