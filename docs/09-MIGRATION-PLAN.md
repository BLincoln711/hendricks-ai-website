# 09 — Existing-Site Migration Plan

## 1. Principle

The website is rebuilt from a blank strategic and visual foundation, but the existing Hendricks.ai domain history must not be discarded blindly.

A redesign is not permission to destroy useful URLs, backlinks, indexed content, or conversion history.

## 2. Prelaunch inventory

Export and preserve:

- Every current crawlable URL
- HTTP status codes
- Page titles and meta descriptions
- Canonicals
- H1s
- Indexed pages
- Search Console clicks, impressions, queries, and pages
- Backlinks and linked pages
- Existing conversion pages
- Existing structured data
- Existing media assets
- Existing redirects
- Current robots.txt and sitemap

Use a crawl, Search Console, analytics, and backlink tool. Archive the crawl outputs.

## 3. URL classification

Assign every existing URL one status:

- Retain as-is
- Rewrite on same URL
- Merge into a new route
- Redirect to closest relevant route
- Archive with a useful notice
- Remove with 410 when truly obsolete and no relevant replacement exists

Do not redirect every old URL to the homepage.

## 4. Redirect map

Use `templates/redirects.csv`.

Required columns:

- Old URL
- New URL
- Redirect type
- Rationale
- Backlink priority
- Search traffic priority
- QA status

Use permanent server-side redirects. Avoid redirect chains and loops.

## 5. Agent-content handling

The current site may contain AI-agent and automation positioning.

For each page:

- Preserve only when it supports Hendricks's search, data, governed-agent, or measurement capability.
- Rewrite into the new category when relevant.
- Merge duplicate generic agent pages.
- Redirect irrelevant pages to the closest meaningful supporting page, not automatically to the homepage.
- If content belongs to a different future business, archive or move it deliberately.

Do not allow old agent pages to remain the dominant branded search result after launch.

## 6. Same-domain launch

Because the domain remains `hendricks.ai`:

- No domain Change of Address is required.
- Maintain the strongest existing URLs when possible.
- Update all internal links to final destinations.
- Update canonicals.
- Publish the new sitemap.
- Preserve redirects long term.

## 7. Staging safety

Before launch:

- Protect preview deployments.
- Render noindex metadata.
- Prevent staging URLs from entering the production sitemap.
- Do not expose test form submissions to production CRM.
- Use test analytics properties or environment labels.

## 8. Launch checklist

- Final production crawl passes.
- Redirect file is deployed.
- No redirect chains.
- Sitemap returns 200.
- Robots references correct sitemap.
- Canonicals use production hostname.
- Analytics and forms use production configuration.
- Search Console property is verified.
- Critical old URLs are tested manually.
- 404 page works.
- No staging canonical remains.

## 9. Postlaunch monitoring

Monitor:

- 404 and 5xx errors
- Redirect misses
- Indexed-page changes
- Search Console coverage
- Search clicks and impressions
- Branded queries
- Core Web Vitals
- Form delivery
- Conversion rates
- Backlinked old URLs

Prioritize fixes for old URLs with backlinks, traffic, or conversions.

## 10. Migration acceptance

The migration is complete when:

- Every meaningful old URL has a documented disposition.
- No high-value URL is unintentionally orphaned.
- Redirects resolve in one hop.
- Production metadata references the correct domain.
- Search Console and analytics receive clean production data.
