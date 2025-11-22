// /app/glossary/components/RelatedTerms.tsx

import Link from "next/link"
import { glossaryTerms } from "../terms"

type RelatedTermsProps = {
  currentSlug: string
  category: string
}

export function RelatedTerms({ currentSlug, category }: RelatedTermsProps) {
  const relatedInCategory = glossaryTerms
    .filter((t) => t.category === category && t.slug !== currentSlug)
    .slice(0, 6)

  const fallback = glossaryTerms
    .filter((t) => t.slug !== currentSlug)
    .slice(0, 6)

  const items = relatedInCategory.length ? relatedInCategory : fallback

  if (!items.length) return null

  return (
    <aside className="mt-10 border-t border-neutral-100 pt-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-3">
        Related terms
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/glossary/${term.slug}`}
              className="text-neutral-800 hover:text-neutral-900 hover:underline"
            >
              {term.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
