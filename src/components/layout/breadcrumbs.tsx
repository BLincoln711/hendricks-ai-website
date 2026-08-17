import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema, jsonLdGraph, type BreadcrumbEntry } from '@/lib/seo/json-ld'
import { cn } from '@/lib/utils/cn'

/**
 * Visible breadcrumbs and their BreadcrumbList schema render from one data
 * source, so the two can never drift (docs/13 §2).
 *
 * Not used on the homepage (docs/03 §7).
 */
export function Breadcrumbs({
  items,
  onNavy = false,
  path,
}: {
  items: BreadcrumbEntry[]
  onNavy?: boolean
  /** Current route path. Gives the emitted list a stable `@id` so the page's
   *  WebPage node can reference it through `breadcrumb`. */
  path?: string
}) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'transition-colors',
                      onNavy
                        ? 'text-[color-mix(in_srgb,var(--color-field)_66%,transparent)] hover:text-[var(--color-cyan)]'
                        : 'text-[var(--color-slate)] hover:text-[var(--color-blue)]',
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={onNavy ? 'text-[var(--color-field)]' : 'text-[var(--color-navy)]'}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <ChevronRight
                    className={cn(
                      'size-3.5',
                      onNavy
                        ? 'text-[color-mix(in_srgb,var(--color-field)_34%,transparent)]'
                        : 'text-[var(--color-border)]',
                    )}
                    aria-hidden="true"
                  />
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
