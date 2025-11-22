// /app/glossary/components/GlossarySearch.tsx

"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { glossaryTerms } from "../terms"

export function GlossarySearch() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return glossaryTerms
    const q = query.toLowerCase()
    return glossaryTerms.filter(
      (term) =>
        term.name.toLowerCase().includes(q) ||
        term.shortDefinition.toLowerCase().includes(q) ||
        term.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="glossary-search" className="text-sm font-medium text-white">
          Search the glossary
        </label>
        <input
          id="glossary-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms like Citation Share, AI Search Visibility, Entity Recognition..."
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        />
      </div>

      <div className="space-y-3">
        {results.length === 0 && (
          <p className="text-sm text-gray-400">
            No terms found. Try a different phrase related to AI search, visibility, or attribution.
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-2">
            {results
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((term) => (
                <li key={term.slug} className="border border-slate-800 rounded-lg p-3 hover:border-slate-700 hover:bg-slate-900/50 transition-colors">
                  <Link href={`/glossary/${term.slug}`} className="block">
                    <p className="text-sm font-semibold text-white">{term.name}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{term.shortDefinition}</p>
                    <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-wide">
                      {term.category}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  )
}
