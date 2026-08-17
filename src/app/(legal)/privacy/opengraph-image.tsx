import { privacyNotice } from '@/content/legal/privacy'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = privacyNotice.meta.title
export { size, contentType } from '@/lib/seo/og-image'

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: privacyNotice.hero.eyebrow,
    title: privacyNotice.hero.title,
  })
}
