import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SignalDot } from '@/components/visuals/signal-dot'

/**
 * Direct answer block for definition pages (docs/03 §"Definition pages",
 * docs/06 §7).
 *
 * The answer sits immediately below the hero and is a single self-contained
 * sentence, so it can be quoted accurately without the surrounding page. It is
 * rendered as a `<p>` rather than a blockquote: the page is the source of the
 * definition, so attributing it to someone else would be wrong.
 *
 * The same string is emitted as the `description` of the page's `DefinedTerm`
 * node, which is what keeps that markup honest — see `definedTermSchema`.
 */
export function DirectAnswer({ term, answer }: { term: string; answer: string }) {
  return (
    <Section variant="white" size="small" ariaLabelledBy="direct-answer-label">
      <Container width="narrow">
        <div className="flex flex-col gap-5 border-l-2 border-[var(--color-blue)] pl-6 md:pl-8">
          <p
            id="direct-answer-label"
            className="text-eyebrow flex items-center gap-2 text-[var(--color-blue)]"
          >
            <SignalDot size={6} tone="blue" />
            {term}
          </p>

          <p className="text-h3 text-[var(--color-navy)]">{answer}</p>
        </div>
      </Container>
    </Section>
  )
}
