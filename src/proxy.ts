import { NextResponse } from 'next/server'

import type { NextRequest, ProxyConfig } from 'next/server'

/**
 * HTTP 410 Gone for the retired routes of the previous site (docs/09 §3).
 *
 * Source of truth is `migration/redirect-map.csv`. Every path in the arrays
 * below has a row there carrying `redirect_type` 410, and the CSV is what a
 * future reader should diff against. The arrays are inlined rather than parsed
 * from it because the CSV is a migration record, not a build input, and the
 * proxy runs on every matched request, so per-request file I/O buys nothing.
 * Regenerate them by hand if the CSV's 410 rows change and keep the counts
 * asserted in tests/unit/gone-routes.test.ts in step.
 *
 * The retired corpus falls into two groups:
 *
 * 1. Authenticated and internal routes: dashboard, portal, questionnaire, login
 *    and preview. Never public, nothing to replace them with.
 * 2. Off-thesis content: the insight archive, the industries section and the
 *    assembly-line pages. All of it argued autonomous AI agent architecture,
 *    which has no counterpart under the Search Intelligence Engineering
 *    positioning. docs/09 §5 forbids redirecting irrelevant pages to the
 *    nearest surviving page, and docs/09 §3 classifies exactly this case as
 *    remove with 410 when truly obsolete and no relevant replacement exists.
 *
 * A 410 rather than the 404 these paths return today because AI crawlers do not
 * retry intelligently. An explicit Gone tells a crawler to drop the URL, where a
 * 404 reads as possibly transient and keeps costing fetch budget on every
 * recrawl. It also has to live here rather than in `next.config.ts`, because
 * `redirects()` can only emit 3xx.
 *
 * Nothing here may collide with a rule in `next.config.ts`. Next evaluates
 * headers, then redirects, then the proxy, so a path that already redirects
 * never reaches this file and listing it here would be dead code that
 * misreports production behaviour. Three legacy paths sit on that line and are
 * deliberately absent:
 *
 * - `/solutions/engineering` already 308s to `/solutions/search-presence-
 *   engineering`, which is its true equivalent rather than a hub.
 * - `/faq-brandon-hendricks` already 308s to `/about`.
 * - `/insights/how-ai-search-engines-cite-mid-market-firms-2026` is the single
 *   on-thesis insight and 308s to `/solutions/selection-intelligence`.
 *
 * tests/unit/gone-routes.test.ts asserts that separation against the real
 * config rather than a copy of it.
 */

/**
 * The authenticated and internal paths: the 26 literal rows among the 29 marked
 * 410 for that reason in `migration/redirect-map.csv`, copied verbatim. The
 * other three are bracketed route patterns, handled by GONE_PATH_PREFIXES.
 *
 * Seventeen of these are already covered by those prefixes. They stay anyway so
 * this array remains a line-for-line mirror of the CSV, and a future reader can
 * diff the two without first reasoning about prefix coverage.
 */
export const GONE_INTERNAL_PATHS: readonly string[] = [
  '/dashboard',
  '/dashboard/admin',
  '/dashboard/ads-manager',
  '/dashboard/ads-manager/anomalies',
  '/dashboard/ads-manager/forecast',
  '/dashboard/ads-manager/optimization-log',
  '/dashboard/ads-manager/overview',
  '/dashboard/ads-manager/recommendations',
  '/dashboard/agent-system',
  '/dashboard/agent-system/chat',
  '/dashboard/agent-system/signals',
  '/dashboard/agent-system/workflows',
  '/dashboard/intelligence',
  '/dashboard/knowledge',
  '/dashboard/proposals',
  '/login',
  '/portal/a2ui-test',
  '/portal/access-denied',
  '/preview',
  '/preview/home-v5',
  '/preview/insights',
  '/preview/lines/customer-experience',
  '/preview/lines/marketing-operations',
  '/preview/lines/operations',
  '/preview/lines/sales-and-service',
  '/questionnaire/not-available',
]

/**
 * The insight archive: 72 of the 73 `/insights/<slug>` rows in the CSV, each one
 * confirmed against a real directory in the retired build rather than guessed.
 *
 * The 73rd, `/insights/how-ai-search-engines-cite-mid-market-firms-2026`, is the
 * single on-thesis piece and is redirected from `next.config.ts` instead. The
 * `/insights` hub itself has no disposition yet and is deliberately not here.
 */
export const GONE_INSIGHT_PATHS: readonly string[] = [
  '/insights/a2a-protocol-business-operations',
  '/insights/agent-collision-detection-preventing-duplicate-work',
  '/insights/agent-orchestration-patterns-execution-models',
  '/insights/agent-state-management-persistent-context-ai-systems',
  '/insights/agent-to-agent-communication-patterns-building-self-coordinating-ai-systems',
  '/insights/ai-agent-governance-architecture',
  '/insights/ai-agents-for-accounting-firms',
  '/insights/ai-agents-for-healthcare-operations',
  '/insights/ai-agents-for-law-firms',
  '/insights/ai-agents-professional-services-operations',
  '/insights/ai-agents-vs-automation-difference',
  '/insights/ai-consulting-vs-ai-architecture',
  '/insights/ai-experimentation-vs-transformation',
  '/insights/architecture-precedes-automation',
  '/insights/autonomous-ai-agent-architecture-for-enterprise',
  '/insights/batch-vs-stream-processing-ai-agent-architectures',
  '/insights/bigquery-ai-agent-memory-system',
  '/insights/build-ai-in-house-or-outsource',
  '/insights/cache-invalidation-strategies-ai-agent-decision-systems-bigquery',
  '/insights/checkpoint-patterns-long-running-ai-agent-tasks',
  '/insights/circuit-breaker-patterns-ai-agent-systems',
  '/insights/claude-code-ai-agent-development',
  '/insights/consensus-mechanisms-multi-agent-decision-making',
  '/insights/data-foundation-for-ai',
  '/insights/data-lineage-tracking-ai-agent-systems-bigquery-audit-trails',
  '/insights/dead-letter-queue-patterns-failed-ai-agent-tasks',
  '/insights/decision-latency-ai-agent-systems-production-viability',
  '/insights/dependency-mapping-ai-agent-systems',
  '/insights/error-recovery-patterns-production-ai-agent-systems',
  '/insights/event-driven-architectures-ai-agents-real-time-operations',
  '/insights/five-architecture-decisions-ai-agent-systems',
  '/insights/five-layers-operating-architecture',
  '/insights/fragmented-tools-unified-architecture',
  '/insights/gemini-enterprise-agent-platform-mid-market',
  '/insights/google-adk-vs-langchain-enterprise-deployment',
  '/insights/google-cloud-agent-systems-adk-gemini',
  '/insights/graceful-degradation-patterns-ai-agent-systems',
  '/insights/hidden-cost-skipping-architecture-ai-agent-sprawl-technical-debt',
  '/insights/how-to-implement-ai-agents-business-operations',
  '/insights/how-to-measure-ai-roi',
  '/insights/idempotency-patterns-ai-agent-operations',
  '/insights/memory-leak-patterns-ai-agent-systems-bigquery',
  '/insights/multi-agent-orchestration-workflows',
  '/insights/operating-architecture-professional-services',
  '/insights/operational-handoff-protocols-ai-agents-transfer-work',
  '/insights/partition-pruning-strategies-ai-agent-query-performance-bigquery',
  '/insights/pattern-recognition-vs-rule-based-logic-ai-agents',
  '/insights/performance-metrics-mid-market',
  '/insights/query-cost-optimization-patterns-ai-agent-bigquery-workloads',
  '/insights/rate-limiting-throttling-patterns-ai-agent-systems',
  '/insights/resource-contention-patterns-multi-agent-systems-bigquery',
  '/insights/retry-logic-exponential-backoff-ai-agent-systems',
  '/insights/rpa-to-ai-agents-migration',
  '/insights/schema-evolution-strategies-ai-agent-systems',
  '/insights/service-level-objectives-ai-agent-systems',
  '/insights/signal-degradation-multi-agent-systems-data-architecture',
  '/insights/signal-pattern-libraries-pre-built-detection-logic-ai-agents',
  '/insights/signs-operations-need-architecture',
  '/insights/stateful-vs-stateless-ai-agent-design-patterns',
  '/insights/task-handoff-failures-ai-agent-systems',
  '/insights/time-based-agent-activation-patterns-scheduling-ai-operations',
  '/insights/transaction-isolation-levels-multi-agent-systems',
  '/insights/versioning-rollback-strategies-production-ai-agent-systems',
  '/insights/what-ai-agent-operating-system-looks-like-production',
  '/insights/what-are-ai-agents-for-business',
  '/insights/what-are-multi-agent-systems',
  '/insights/what-is-ai-agent-orchestration',
  '/insights/what-is-architecture-for-autonomous-ai-agent-systems',
  '/insights/what-is-operating-architecture',
  '/insights/why-ai-agent-projects-fail-production',
  '/insights/why-ai-pilots-fail-mid-market',
  '/insights/why-more-ai-agents-is-not-the-answer',
]

/**
 * The industries section: the hub plus its nine vertical pages, all ten rows
 * from the CSV.
 *
 * The hub goes too. It was an index of the nine, so leaving it alive would serve
 * a page of links to nine Gone URLs.
 */
export const GONE_INDUSTRY_PATHS: readonly string[] = [
  '/industries',
  '/industries/accounting-firms',
  '/industries/consulting-firms',
  '/industries/energy-operations',
  '/industries/healthcare',
  '/industries/healthcare-practices',
  '/industries/law-firms',
  '/industries/marketing-agencies',
  '/industries/multi-location-services',
  '/industries/professional-services',
]

/**
 * The four Digital Assembly Line pages. `/lines` itself never had a page on the
 * old site and has no CSV row, so it is left to 404, the same treatment
 * `/portal` and `/questionnaire` get below.
 */
export const GONE_LINE_PATHS: readonly string[] = [
  '/lines/customer-experience',
  '/lines/marketing-operations',
  '/lines/operations',
  '/lines/sales-and-service',
]

/**
 * Standalone legacy URLs that outlived the app routes they belonged to.
 *
 * Only one survives the collision check against `next.config.ts`.
 * `/glossary/multi-engine-visibility-index` is a child of `/glossary`, and the
 * config's `/glossary` rule matches that path exactly, never its children, so
 * this is a 410 and not a redirect that already exists.
 */
export const GONE_STANDALONE_PATHS: readonly string[] = ['/glossary/multi-engine-visibility-index']

/** Every literal 410 path, grouped by why it is gone. */
export const GONE_EXACT_PATHS: readonly string[] = [
  ...GONE_INTERNAL_PATHS,
  ...GONE_INSIGHT_PATHS,
  ...GONE_INDUSTRY_PATHS,
  ...GONE_LINE_PATHS,
  ...GONE_STANDALONE_PATHS,
]

/**
 * Prefix rules standing in for the three bracketed source patterns in the CSV:
 * `/dashboard/[slug]`, `/portal/[clientId]` and `/questionnaire/[clientSlug]`.
 *
 * Those strings are Next route patterns, not request paths, so comparing them
 * literally against `nextUrl.pathname` never fires on real traffic. Matching the
 * parent segment instead is safe because no route in src/config/routes.ts begins
 * with any of these prefixes. tests/unit/gone-routes.test.ts asserts that
 * against the live registry rather than against a copy of it, so adding a public
 * `/portal/...` route later fails the test instead of silently 410-ing.
 *
 * Nothing from the content groups above is expressed as a prefix. A
 * `/solutions/` prefix would swallow the four live solution pages, and an
 * `/insights/` one would swallow the single surviving insight, so every retired
 * content URL is spelled out instead.
 *
 * Each prefix keeps its trailing slash so it can only ever swallow children.
 * `/portal` and `/questionnaire` have no bare row in the CSV and are
 * deliberately left to 404.
 */
/**
 * The one retired-section URL that must survive the prefix rule below.
 *
 * `next.config.ts` 308s this path to /solutions/selection-intelligence because
 * it is the single on-thesis article of the 73. Next evaluates redirects before
 * the proxy, so in practice the redirect already wins and this list is belt and
 * braces. It is here anyway because relying on that ordering is an invisible
 * dependency: if the redirect is ever moved, removed, or reordered, the article
 * would start returning 410 with nothing in the code explaining why.
 */
export const GONE_PREFIX_EXCEPTIONS: readonly string[] = [
  '/insights/how-ai-search-engines-cite-mid-market-firms-2026',
  // Never a real page. Perplexity invented it and cites it for a
  // high-intent query, so it earns a redirect rather than a 410.
  '/insights/ai-search-visibility-revenue-impact',
]

export const GONE_PATH_PREFIXES: readonly string[] = [
  '/dashboard/',
  '/portal/',
  '/questionnaire/',
  /**
   * The whole /insights section is retired, so match it by prefix rather than
   * by the 73 enumerated slugs.
   *
   * Enumeration alone left real holes. Search Console still holds indexed
   * /insights URLs that appear in neither the retired repo's filesystem nor
   * migration/redirect-map.csv, because the CSV was built from the filesystem
   * rather than from Search Console. `/insights/what-is-search-intelligence-engineer`
   * is one: indexed, 404ing, and absent from the list. A prefix retires the
   * section as a section, which is what actually happened, and it cannot be
   * outrun by a URL nobody enumerated.
   *
   * Safe because no live route begins with /insights/ and the one surviving
   * article is exempted above. tests/unit/gone-routes.test.ts asserts both
   * against the live registry.
   */
  '/insights/',
]

/** Drops a trailing slash so `/login/` cannot dodge the exact-match list. */
function normalisePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

/** Whether a request path is one of the retired routes. Exported for the tests. */
export function isGone(pathname: string): boolean {
  const path = normalisePath(pathname)

  if (GONE_PREFIX_EXCEPTIONS.includes(path)) return false

  return (
    GONE_EXACT_PATHS.includes(path) || GONE_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
  )
}

/**
 * Plain text, deliberately not a rendered page. Pulling the app shell into the
 * proxy bundle to style a response no human is meant to see would cost every
 * matched request, and a crawler reading the status code gets the whole message
 * from the status code.
 */
const GONE_BODY = '410 Gone. This URL has been retired and has no replacement.'

export function proxy(request: NextRequest) {
  if (!isGone(request.nextUrl.pathname)) {
    // The matcher below is a coarse gate, so a path can reach here without
    // being retired. Hand it back to the normal routing pipeline untouched.
    return NextResponse.next()
  }

  return new NextResponse(GONE_BODY, {
    status: 410,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      /**
       * A 410 is heuristically cacheable, and without an explicit lifetime an
       * intermediary can pin it for far longer than intended. An hour spares the
       * origin repeated crawler hits and still lets a restored route recover
       * without a purge.
       */
      'cache-control': 'public, max-age=3600',
    },
  })
}

/**
 * Keeps the proxy off every request that is not a candidate, so it does not sit
 * in front of the whole site.
 *
 * Next reads this with `extractExportedConstValue`, which means it must be a
 * literal and cannot be derived from the arrays above. The sources are the union
 * of GONE_EXACT_PATHS and GONE_PATH_PREFIXES, widened to whole segments only
 * where every child of that segment is retired. Bare `/dashboard`, `/preview`
 * and `/industries` are listed alongside their `:path*` forms so the gate does
 * not depend on how path-to-regexp treats a zero-length repeat.
 *
 * No `/solutions` entry appears in any form. `/solutions` and its four children
 * are live, indexable routes, `/solutions/:path*` would put every one of them
 * behind the proxy on every request, and the one retired solutions URL is a
 * redirect in `next.config.ts` rather than a 410. tests/unit/gone-routes.test.ts
 * pins that.
 *
 * `/insights/:path*` is safe to widen because the one surviving insight is
 * redirected by `next.config.ts`, which Next evaluates before the proxy, and
 * because `isGone` returns false for it even if it did arrive here. The
 * `/insights` hub is undisposed and reaches the proxy only to be passed through.
 *
 * There is no `runtime` option here. Next 16 rejects route segment config in a
 * proxy file outright; the proxy always runs on the Node.js runtime.
 */
export const config: ProxyConfig = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/glossary/multi-engine-visibility-index',
    '/industries',
    '/industries/:path*',
    '/insights/:path*',
    '/lines/:path*',
    '/login',
    '/portal/:path*',
    '/preview',
    '/preview/:path*',
    '/questionnaire/:path*',
  ],
}
