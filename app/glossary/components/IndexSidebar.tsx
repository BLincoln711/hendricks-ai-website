// /app/glossary/components/IndexSidebar.tsx

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { glossaryTerms } from "../terms"

const groupByCategory = () => {
  const map: Record<string, typeof glossaryTerms> = {}
  for (const term of glossaryTerms) {
    if (!map[term.category]) map[term.category] = []
    map[term.category].push(term)
  }
  return map
}

export function IndexSidebar() {
  const pathname = usePathname()
  const grouped = groupByCategory()

  return (
    <div className="p-4 space-y-6 text-sm">
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          AI Search Visibility Glossary
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          Explore key terms that define AI era search visibility and attribution.
        </p>
      </div>

      <nav className="space-y-4">
        {Object.keys(grouped)
          .sort()
          .map((category) => (
            <div key={category} className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                {category}
              </p>
              <ul className="space-y-1">
                {grouped[category]
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((term) => {
                    const href = `/glossary/${term.slug}`
                    const isActive = pathname === href
                    return (
                      <li key={term.slug}>
                        <Link
                          href={href}
                          className={[
                            "block rounded-md px-2 py-1 transition-colors",
                            isActive
                              ? "bg-neutral-900 text-white"
                              : "text-neutral-700 hover:bg-neutral-100"
                          ].join(" ")}
                        >
                          {term.name}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
      </nav>
    </div>
  )
}
