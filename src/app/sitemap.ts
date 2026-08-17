import type { MetadataRoute } from 'next'

import { indexableBuiltRoutes } from '@/config/routes'
import { siteConfig } from '@/config/site'

/**
 * Sitemap (docs/06 §6).
 *
 * Derived from `config/routes.ts`, so a route enters the sitemap only once its
 * `built` flag is true. That keeps the sitemap from ever advertising a 404 as
 * later phases land. Studio, draft, preview, and flagged-off routes are excluded
 * because they are not marked indexable.
 *
 * `lastModified` is per-route rather than the deployment time — docs/06 §6
 * prohibits stamping every URL with the current build date.
 */
const lastModified: Record<string, string> = {
  '/': '2026-08-16',
}

const DEFAULT_LAST_MODIFIED = '2026-08-16'

/** Depth-based priority: the homepage outranks top-level routes, which outrank children. */
function priorityFor(path: string): number {
  if (path === '/') return 1
  return path.split('/').filter(Boolean).length > 1 ? 0.7 : 0.8
}

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableBuiltRoutes().map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: lastModified[route.path] ?? DEFAULT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: priorityFor(route.path),
  }))
}
