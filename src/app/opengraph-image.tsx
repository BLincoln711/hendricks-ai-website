import { siteConfig } from '@/config/site'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = `${siteConfig.name} — ${siteConfig.categoryLine}`
export { size, contentType } from '@/lib/seo/og-image'

/** Site default. Route segments override this with their own headline. */
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: 'Search Intelligence Engineering',
    title: siteConfig.categoryLine,
  })
}
