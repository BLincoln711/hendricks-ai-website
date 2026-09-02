import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'

export type FaqItem = {
  question: string
  /**
   * One string per paragraph, because several answers need a second one to
   * concede the counter-position before refuting it. Joining them into a single
   * string would bury the direct answer inside a block a reader has to mine.
   */
  answer: readonly string[]
}

/** Heading tags the question may take. Kept as a map so the prop stays a union. */
const questionTags = {
  2: 'h2',
  3: 'h3',
  4: 'h4',
} as const

/**
 * FAQ section (09 5.51): visible questions and answers on the solution pages
 * that carry them and on /for-agencies.
 *
 * Four properties of this component are load-bearing, and each one is easy to
 * undo by accident.
 *
 * 1. Every question is a real heading element, never a styled div. Retrieval
 *    systems chunk a page by its headings and carry the heading text with the
 *    chunk, so the heading has to be the question a person actually typed, with
 *    no number and no eyebrow in front of it.
 * 2. The answers are plain paragraph siblings of that heading. The first
 *    sentence of the first paragraph is the direct answer and sits inside the
 *    extraction window that follows the heading, so a lifted chunk is complete
 *    on its own.
 * 3. There is no details element, no summary element, and no accordion. The
 *    answer text is present and visible in the server-rendered HTML with no
 *    interaction, because a crawler that does not run JavaScript, and a reader
 *    who never clicks, must both get the whole answer. Collapsing this block to
 *    save vertical space would remove the only thing it exists to publish. Do
 *    not "improve" it into a disclosure widget.
 * 4. It emits no structured data of any kind. 17 never emits FAQPage on any
 *    route, so schema for these questions stays a per-page decision and never
 *    a side effect of rendering.
 *
 * The block sits on `--surface`; `variant` is a no-op kept for the
 * /for-agencies call site PR 10 closes.
 */
export function FaqSection({
  title,
  eyebrow,
  items,
  id = 'faq',
  headingLevel = 3,
}: {
  title: string
  /**
   * Left undefined by default rather than carrying a house string, so the label
   * above the title stays approved page copy like the rest of the block.
   */
  eyebrow?: string
  items: readonly FaqItem[]
  /**
   * Anchor for the section. The block title takes `${id}-title` and labels the
   * section, so two blocks on one route cannot collide on an element id.
   */
  id?: string
  /**
   * The block title renders as an h2, so h3 nests each question under it and is
   * correct on a standard solution page. A page whose spine is the question set
   * itself can promote them to h2, where each question reads as a section in its
   * own right, or push them to h4 when the block sits under an existing h3.
   */
  headingLevel?: 2 | 3 | 4
  /** @deprecated No-op. The block sits on `--surface` (09 5.51). */
  variant?: 'white' | 'field' | 'soft'
}) {
  const titleId = `${id}-title`
  const Question = questionTags[headingLevel]

  return (
    <Section variant="field" size="major" id={id} ariaLabelledBy={titleId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading eyebrow={eyebrow} title={title} id={titleId} level={2} />

          {/*
            One column of answers rather than a two-column grid. An answer is
            prose that has to survive being read in full, and the `minmax(0,...)`
            tracks keep long strings inside the column at every width instead of
            forcing the page to scroll sideways.
          */}
          <div className="flex flex-col gap-10">
            {items.map((item) => (
              <div key={item.question} className="flex flex-col gap-3 border-t border-rule pt-6">
                <Question className="text-h3 text-ink">{item.question}</Question>

                {item.answer.map((paragraph) => (
                  <p key={paragraph} className="measure text-ink-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
