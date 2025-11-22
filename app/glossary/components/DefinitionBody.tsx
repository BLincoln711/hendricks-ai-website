// /app/glossary/components/DefinitionBody.tsx

type DefinitionBodyProps = {
  name: string
  category: string
  shortDefinition: string
  longDefinition: string
  whyItMatters: string
  examples?: string[]
}

export function DefinitionBody({
  name,
  category,
  shortDefinition,
  longDefinition,
  whyItMatters,
  examples = []
}: DefinitionBodyProps) {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          {category}
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          {name}
        </h1>
        <p className="text-sm md:text-base text-gray-300">
          {shortDefinition}
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-white">
          Extended definition
        </h2>
        <p className="text-sm md:text-[15px] leading-relaxed text-gray-300">
          {longDefinition}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-white">
          Why this matters for AI search visibility
        </h2>
        <p className="text-sm md:text-[15px] leading-relaxed text-gray-300">
          {whyItMatters}
        </p>
      </section>

      {examples.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white">
            Practical examples
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-[15px] text-gray-300">
            {examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
