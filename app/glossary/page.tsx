// /app/glossary/page.tsx

import { GlossarySearch } from "./components/GlossarySearch"
import { glossaryTerms } from "./terms"
import Link from "next/link"

export const metadata = {
  title: "AI Search Visibility Glossary | Hendricks.AI",
  description:
    "A definitive glossary of AI search visibility, citation share, entity recognition, and search intelligence engineering terms by Hendricks.AI."
}

export default function GlossaryIndexPage() {
  const categories = Array.from(new Set(glossaryTerms.map((t) => t.category))).sort()

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Hendricks.AI Reference
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">
          AI Search Visibility Glossary
        </h1>
        <p className="text-sm md:text-base text-neutral-600 max-w-2xl">
          This glossary defines the language of AI era search visibility. Each term is crafted for both
          humans and large language models, so engines like Gemini, ChatGPT, Perplexity and Copilot can
          correctly learn, retrieve and cite your brand.
        </p>
        <p className="text-xs text-neutral-500">
          Terms currently defined:{" "}
          <span className="font-semibold text-neutral-900">{glossaryTerms.length}</span>
        </p>
      </header>

      <GlossarySearch />

      <section className="space-y-8">
        {categories.map((category) => {
          const termsInCategory = glossaryTerms
            .filter((t) => t.category === category)
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))

          if (!termsInCategory.length) return null

          return (
            <div key={category} className="space-y-3">
              <h2 className="text-sm font-semibold text-neutral-900">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {termsInCategory.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="border border-neutral-100 rounded-lg p-3 hover:border-neutral-200 hover:bg-neutral-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-neutral-900">{term.name}</p>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {term.shortDefinition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
