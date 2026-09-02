import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/eyebrow'
import { Section } from '@/components/layout/section'

/**
 * Direct-answer block (09 5.50) for the definition and editorial pages.
 *
 * The answer sits immediately below the hero and is a single self-contained
 * sentence, so it can be quoted accurately without the surrounding page. It is
 * rendered as a `<p>` rather than a blockquote: the page is the source of the
 * definition, so attributing it to someone else would be wrong. The rule and
 * the label are ink, not blue, since blue marks a measured value.
 *
 * The same string is emitted as the `description` of the page's `DefinedTerm`
 * node, which is what keeps that markup honest; see `definedTermSchema`.
 */
export function DirectAnswer({ term, answer }: { term: string; answer: string }) {
  return (
    <Section variant="white" size="small" ariaLabelledBy="direct-answer-label">
      <Container width="narrow">
        <div className="flex flex-col gap-5 border-l-2 border-ink pl-6 md:pl-8">
          <Eyebrow id="direct-answer-label">{term}</Eyebrow>
          <p className="text-h3 text-ink">{answer}</p>
        </div>
      </Container>
    </Section>
  )
}
