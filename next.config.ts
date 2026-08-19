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
 *    ~100 URLs have now had their per-URL disposition made: exactly one is
 *    on-thesis and redirects (see `onThesisInsightRedirect` below), and the
 *    rest are served 410 Gone from `src/proxy.ts`. Both are recorded in
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
  /**
   * Perplexity cites this URL as the answer to "consultant to connect AI search
   * visibility to pipeline" (measured 2026-08-18).
   *
   * This was a REAL article: published 2025-11-25 as commit ab7705c on the
   * archive/legacy-site branch, at app/insights/ai-search-visibility-revenue-impact,
   * and retired 2026-08-17 when the legacy site was replaced. An earlier version
   * of this comment claimed the engine invented the URL. That was wrong. The
   * check had been run against ~/claudecode/hendricks, a different retired site
   * with a different directory layout, so the slug was absent from the registry
   * that was searched and present in the one that mattered.
   *
   * The correct reading is more useful than the wrong one: an engine is still
   * citing a page the firm deleted, nine months after it was published, for the
   * highest-intent query in the set. The citation was earned by real content and
   * then thrown away.
   *
   * It reached us as a 410 through the /insights/ prefix rule, which is correct
   * for the ~100 genuinely retired pages and wrong for this one, because an
   * engine is actively sending people here. Point it at the solution that
   * actually answers the query rather than telling the one interested visitor
   * the resource is gone.
   */
  ['/insights/ai-search-visibility-revenue-impact', '/solutions/search-impact-measurement'],
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

/**
 * The single surviving URL from the retired insight archive (docs/09 §5).
 *
 * `/insights/how-ai-search-engines-cite-mid-market-firms-2026` argued how AI
 * engines choose which firms to cite, which is the Selection Intelligence
 * thesis, so it earns a redirect where the other 72 insights earn a 410 in
 * `src/proxy.ts`. docs/09 §5 is explicit that off-thesis pages must not be swept
 * into the nearest live route, so this is the only one.
 *
 * Two details are load-bearing:
 *
 * 1. It is returned ahead of the www host rule, so a www request matches this
 *    rule first rather than being bounced to the apex and matched on the second
 *    request.
 * 2. The destination is absolute on the apex. Ordering alone is not enough: a
 *    relative destination would land a www request back on www and hand it to
 *    the host rule for a second hop, which is the redirect chain docs/09 §10
 *    rules out. Together these resolve the URL in one hop on both hostnames.
 *
 * `permanent: true` emits 308, not 301. Next reserves 301 and 302 for the
 * explicit `statusCode` field, and 308 is the status the redirect map records.
 */
const onThesisInsightRedirect = {
  source: '/insights/how-ai-search-engines-cite-mid-market-firms-2026',
  destination: 'https://hendricks.ai/solutions/selection-intelligence',
  permanent: true,
} as const

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
   * Next matches these top to bottom.
   *
   * A single hop from www needs two things together: the rule ahead of the host
   * catch-all, and an absolute destination on the apex. The on-thesis insight
   * rule has both. The legacy map keeps relative destinations, so a www request
   * for one of those 21 paths still costs two hops whichever side of the host
   * rule it sits on, and moving it buys nothing on its own.
   */
  async redirects() {
    return [
      onThesisInsightRedirect,
      /**
       * One canonical host. Both hostnames resolve to this project, so without a
       * redirect the whole site is served twice and every page competes with its
       * own duplicate. Every canonical, the sitemap, and robots already name the
       * apex.
       */
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
