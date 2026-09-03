import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config/site'
import { isProduction } from '@/lib/env'

/**
 * AI crawler policy: APPROVED (Brandon, 2026-08-17). CONTENT_VERIFICATION.md L5.
 *
 * Every AI crawler is allowed, both the search-discovery agents and the training
 * agents. docs/06 §7 requires this to be an approved decision rather than a
 * silent default, so both classes are named explicitly below. The policy is
 * recorded in code and in the verification register; do not change one alone.
 *
 * Allowing rather than blocking is the deliberate position. The site's purpose is
 * to be selected by AI systems, and training corpora are one of the inputs that
 * decide whether the brand is known to a model at all.
 *
 * Two mechanical facts, so this is not re-litigated on a wrong premise:
 *
 * 1. `Google-Extended` governs Gemini grounding and model training only. Google
 *    documents that it does not affect a site's inclusion in Google Search and is
 *    not a ranking signal. AI Overviews and AI Mode are served from the Googlebot
 *    index, so `Google-Extended` is NOT a lever over AI Overviews. Disallowing it
 *    would forfeit Gemini grounding and change nothing about AI Overviews.
 * 2. `Perplexity-User` and `ChatGPT-User` are documented by their operators as
 *    user-triggered fetches, and both operators state that user-triggered fetches
 *    are not gated behind robots.txt. Listing them is a statement of intent, not
 *    an enforcement mechanism; removing them would not suppress those fetches
 *    either. robots.txt is not a control surface in either direction for these two.
 */

/**
 * Shared by the wildcard group and by every named group below.
 *
 * A named group REPLACES the wildcard for that agent, it does not merge with it.
 * A named group that omits this list silently opens /studio and /api/ to that
 * agent, which is why the paths are shared from one constant instead of retyped.
 */
/**
 * `/plate-fixtures` is the redesign's component fixture route
 * (`src/app/(dev)/plate-fixtures`): it returns 404 in production, is
 * unregistered in `routes.ts` so the sitemap never lists it, and is named here
 * so no crawler that reaches a preview build records it either.
 */
const disallowedPaths = ['/studio', '/api/', '/preview', '/draft', '/plate-fixtures']

/**
 * Search-discovery crawlers for the engines the site must be visible in:
 * ChatGPT (OAI-SearchBot, ChatGPT-User), Perplexity (PerplexityBot,
 * Perplexity-User), Claude (Claude-SearchBot, Claude-User), Google Search and the
 * AI Overviews and AI Mode surfaces that ride its index (Googlebot), and Bing
 * (Bingbot).
 *
 * Naming them changes no crawl behaviour today, because the wildcard group
 * already allows every one of them. It makes the policy auditable instead of
 * accidental: an explicit allow under a named token and a silent wildcard
 * fallback produce identical crawling, but only the first is a recorded decision.
 */
const searchDiscoveryAgents = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
  'Googlebot',
  'Bingbot',
]

/**
 * Training and general-purpose AI crawlers, allowed under the approved policy
 * recorded at the top of this file.
 *
 * Each token is the one its operator documents, grouped by operator: OpenAI
 * (GPTBot), Anthropic (ClaudeBot, plus the older `anthropic-ai` token kept for
 * crawler builds still sending it), Common Crawl (CCBot, the corpus most open
 * training sets are built from), Google (Google-Extended), Apple (Applebot for
 * Search and Siri, Applebot-Extended for training), Meta (Meta-ExternalAgent,
 * FacebookBot), Amazon (Amazonbot), ByteDance (Bytespider), Cohere (cohere-ai),
 * and You.com (YouBot).
 *
 * Token casing follows each operator's own documentation. Matching is
 * case-insensitive per RFC 9309, so the casing is for auditability, not behaviour.
 */
const trainingAndGeneralAiAgents = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'FacebookBot',
  'Amazonbot',
  'Bytespider',
  'cohere-ai',
  'YouBot',
]

/**
 * Environment-aware robots (docs/06 §7).
 *
 * Nonproduction disallows everything. Production allows public routes and blocks
 * the studio, API, and preview paths for every group, wildcard and named alike.
 *
 * `isProduction` comes from the validated env module rather than a raw
 * `process.env` read, so the one variable that can deindex the whole site is
 * parsed once against the zod schema.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
      ...[...searchDiscoveryAgents, ...trainingAndGeneralAiAgents].map(
        (userAgent) => ({
          userAgent,
          allow: '/',
          disallow: disallowedPaths,
        }),
      ),
    ],
    // No `host` line. It is a Yandex-only extension that Google and Bing ignore.
    // The canonical host is enforced by the www-to-apex redirect in
    // next.config.ts and by the absolute canonical on every page.
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
