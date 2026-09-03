import Link from 'next/link'

import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, jsonLdGraph, type BreadcrumbEntry } from '@/lib/seo/json-ld'

/**
 * Breadcrumbs (canvas `.crumbs`; 09 5.41): location on every route but the
 * homepage, with the BreadcrumbList schema rendered from the same data so the
 * two cannot drift.
 *
 * Mono coordinates above the eyebrow, separated by a generated slash so the
 * separator is never announced. The last item is a `span` carrying
 * `aria-current="page"` at full ink. Every link is a 44 px box, the site target
 * rule (KF-09).
 */
export function Breadcrumbs({
  items,
  path,
}: {
  items: BreadcrumbEntry[]
  /** Current route path. Gives the emitted list a stable `@id` so the page's
   *  WebPage node can reference it through `breadcrumb`. */
  path?: string
}) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.label}>
                {item.href && !isLast ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(items, path))} />
    </>
  )
}
