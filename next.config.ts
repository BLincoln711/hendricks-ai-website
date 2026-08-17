import type { NextConfig } from 'next'

/**
 * Security headers (docs/08 §8).
 *
 * CSP is deliberately absent at this phase. docs/08 §8 warns against copying a
 * policy without testing it against analytics, Sanity preview, images, and form
 * integrations — none of which are wired yet. It lands in Phase 7 in
 * report-only mode first.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

/**
 * Legacy path map for the two retired hendricks.ai positionings.
 *
 * Every source below was confirmed to have been publicly served, via the
 * Wayback Machine CDX index for `hendricks.ai/*`, and confirmed to return a
 * hard 404 with no `Location` header on the current build. Search and answer
 * engines still hold these URLs and still fetch them, so a 404 discards both
 * the accumulated authority and the engine's only path to the live equivalent.
 *
 * Rules this list follows, each of which prevents a real failure:
 *
 * 1. No source may name a path reserved in `src/config/routes.ts`. Next.js
 *    evaluates redirects before filesystem routes, and a `permanent` redirect
 *    is cached hard, so a rule for `/results`, `/research`, or `/corrections`
 *    would break those pages on the day they ship. None appear here.
 * 2. No bulk redirect of `/insights/*`, `/news/*`, `/industries/*`, or
 *    `/lines/*` to a hub. Google treats mass redirects of content pages to an
 *    unrelated destination as soft 404s, which consolidates nothing. Those
 *    ~100 URLs stay 404 until they have real per-URL destinations, tracked in
 *    `migration/redirect-map.csv`.
 * 3. Each destination is the closest true equivalent in the current IA, not
 *    the nearest hub. A redirect that lands on an unrelated page is a soft 404.
 */
const legacyRedirects: ReadonlyArray<readonly [source: string, destination: string]> = [
  // Category vocabulary. These carried the term the firm invented.
  ['/search-intelligence-engineering', '/what-is-search-intelligence-engineering'],
  ['/ai-search-intelligence', '/what-is-search-intelligence-engineering'],
  ['/glossary', '/what-is-search-intelligence-engineering'],

  // Solutions IA from the retired builds.
  ['/search-intelligence-solutions', '/solutions'],
  ['/solutions/advisory', '/solutions'],
  ['/solutions/foundation', '/solutions'],
  ['/solutions/operations', '/solutions'],
  ['/solutions/engineering', '/solutions/search-presence-engineering'],
  ['/solutions/system', '/how-it-works'],
  ['/solutions/partnership', '/for-agencies'],

  // Measurement pages. All three described attribution and mix modelling work
  // that Search Impact Measurement now covers.
  ['/predictive-attribution', '/solutions/search-impact-measurement'],
  ['/marketing-mix-modeling', '/solutions/search-impact-measurement'],
  ['/google-bing-unified', '/solutions/search-impact-measurement'],

  // Process and entry points.
  ['/approach', '/how-it-works'],
  ['/audit', '/diagnostic'],
  ['/demo', '/contact'],
  ['/faq', '/how-it-works'],

  // Founder. All three resolved to a profile of Brandon Lincoln Hendricks.
  ['/authors/brandon-lincoln-hendricks', '/about'],
  ['/brandon-lincoln-hendricks', '/about'],
  ['/faq-brandon-hendricks', '/about'],

  // Legal. The retired cookie notice is folded into the Privacy Notice.
  ['/cookies', '/privacy'],
] as const

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  /**
   * One canonical host. Both hostnames resolve to this project, so without a
   * redirect the whole site is served twice and every page competes with its own
   * duplicate. Every canonical, the sitemap, and robots already name the apex.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.hendricks.ai' }],
        destination: 'https://hendricks.ai/:path*',
        permanent: true,
      },
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
