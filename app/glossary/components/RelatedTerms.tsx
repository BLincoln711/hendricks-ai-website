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
    <aside className="mt-10 border-t border-slate-800 pt-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">
        Related terms
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/glossary/${term.slug}`}
              className="text-gray-300 hover:text-cyan-300 hover:underline transition-colors"
            >
              {term.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
