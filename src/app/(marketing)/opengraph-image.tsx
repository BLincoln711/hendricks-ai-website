import { siteConfig } from '@/config/site'
import { renderOgImage } from '@/lib/seo/og-image'

export const alt = `${siteConfig.name}. ${siteConfig.categoryLine}`
export { size, contentType } from '@/lib/seo/og-image'

/**
 * Homepage OG image.
 *
 * Lives in `(marketing)` rather than at the app root because the homepage is
 * `(marketing)/page.tsx`. Next.js resolves image file conventions per route
 * segment, so at the root this file was generated and served but referenced by
 * nothing: the homepage shipped with no `og:image` at all while all 17 other
 * routes had one.
 */
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: 'Search Intelligence Engineering',
    title: siteConfig.categoryLine,
  })
}
