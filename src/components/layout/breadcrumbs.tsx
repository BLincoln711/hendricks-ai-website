import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, jsonLdGraph, type BreadcrumbEntry } from '@/lib/seo/json-ld'

/**
 * Breadcrumbs (09 5.41): location on every route but the homepage, with the
 * BreadcrumbList schema rendered from the same data so the two cannot drift.
 *
 * Every link is a 44 px box (`--link-min-height`) with 8 px clearance from its
 * neighbours at every width; the decision 5 variance does not name
 * breadcrumbs, so 24 px never applies here (16 KF-09). Separators are
 * decorative; the last item carries `aria-current`.
 *
 * `onNavy` is a no-op kept for the /about call site PR 11 closes (handoff
 * 5.3): `--link` and `--ink-2` re-scope under `.on-plate` on their own.
 */
export function Breadcrumbs({
  items,
  path,
}: {
  items: BreadcrumbEntry[]
  /** @deprecated No-op. `.on-plate` re-scopes the link and ink tokens. */
  onNavy?: boolean
  /** Current route path. Gives the emitted list a stable `@id` so the page's
   *  WebPage node can reference it through `breadcrumb`. */
  path?: string
}) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="text-small flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.label} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="link link-standalone">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="inline-flex min-h-[var(--link-min-height)] items-center text-ink"
                  >
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <ChevronRight className="size-3.5 text-rule-strong" aria-hidden="true" focusable="false" />
                ) : null}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(items, path))} />
    </>
  )
}
