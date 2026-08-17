import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'

/**
 * Environment-aware robots (docs/06 §7).
 *
 * Nonproduction disallows everything. Production allows public routes and blocks
 * the studio, API, and preview paths.
 *
 * A separate AI-training versus search-discovery crawler policy is deliberately
 * NOT encoded here — docs/06 §7 assigns that decision to an approved brand and
 * legal policy, not to code. See CONTENT_VERIFICATION.md item L5.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/api/', '/preview', '/draft'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
