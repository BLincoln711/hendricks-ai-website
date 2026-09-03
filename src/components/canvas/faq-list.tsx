import { cn } from '@/lib/utils/cn'

export type FaqItem = {
  question: string
  /**
   * One string per paragraph, because several answers need a second one to
   * concede the counter-position before refuting it. Joining them into a single
   * string would bury the direct answer inside a block a reader has to mine.
   */
  answer: readonly string[]
}

/**
 * The question set (`.faq`): visible questions and answers, separated by
 * hairlines.
 *
 * Four properties are load-bearing, and each one is easy to undo by accident.
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
 *    save vertical space would remove the only thing it exists to publish.
 * 4. It emits no structured data of any kind, so schema for these questions
 *    stays a per-page decision and never a side effect of rendering.
 */
export function FaqList({
  items,
  headingLevel = 3,
  className,
}: {
  items: readonly FaqItem[]
  /**
   * A page whose spine is the question set itself promotes them to h2, where
   * each question reads as a section in its own right.
   */
  headingLevel?: 2 | 3
  className?: string
}) {
  const Question = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <div className={cn('faq', className)}>
      {items.map((item) => (
        <div key={item.question}>
          <Question>{item.question}</Question>
          {item.answer.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  )
}
