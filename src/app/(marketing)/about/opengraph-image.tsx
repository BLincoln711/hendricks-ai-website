import { siteConfig } from '@/config/site'
import { hero, meta } from '@/content/pages/about'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = meta.title
export { size, contentType } from '@/lib/seo/og-image'

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: hero.eyebrow,
    title: hero.title,
    footnote: `${siteConfig.founder} — ${siteConfig.founderRole}`,
  })
}
