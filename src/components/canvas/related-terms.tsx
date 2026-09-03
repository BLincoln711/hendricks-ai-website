import Link from 'next/link'

import type { RelatedEntry } from '@/components/canvas/related-list'
import { publicationChrome } from '@/content/shared/publication-record'

/**
 * The other definition pages, two across (`cols2`).
 *
 * The entries are the page's own approved related links filtered to the
 * definition routes, so no description is authored here and a term cannot be
 * described differently on two pages. Each entry is labelled with its kind
 * above the name, which is what tells a reader these are vocabulary pages
 * rather than more of the argument.
 */
export function RelatedTerms({ terms }: { terms: readonly RelatedEntry[] }) {
  if (terms.length === 0) return null

  return (
    <div className="cols2">
      {terms.map((term) => (
        <div key={term.href}>
          <p className="text-coordinate text-ink-2">
            {term.kind ?? publicationChrome.relatedTerms.kind}
          </p>
          <h3 className="text-h3 mt-3 text-ink">
            <Link href={term.href}>{term.label}</Link>
          </h3>
          <p className="mt-[10px] text-[14.5px] text-ink-2">{term.description}</p>
        </div>
      ))}
    </div>
  )
}
