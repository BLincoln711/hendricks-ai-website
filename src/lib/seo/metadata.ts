import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'

type BuildMetadataInput = {
  title: string
  description: string
  /** Route path beginning with a slash. Used for the absolute canonical. */
  path: string
  /** Overrides the default OG image for routes that supply their own. */
  ogImage?: string
  /** Set false for routes that must never be indexed. */
  index?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

/**
 * Single metadata builder for every route (docs/06 §3).
 *
 * Indexability is environment-aware: only production emits index directives.
 * Preview and development deployments render `noindex, nofollow` through
 * rendered metadata rather than relying on robots.txt alone (docs/06 §2).
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  index = true,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString()
  const isProductionEnv = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
  const shouldIndex = index && isProductionEnv

  return {
    // Absolute: the approved copy in content/pages/ supplies complete titles that
    // already carry the "| Hendricks" suffix, so the root layout's title template
    // must not append it a second time.
    title: { absolute: title },
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: { index: shouldIndex, follow: shouldIndex },
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      url: canonical,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}
