import { cn } from '@/lib/utils/cn'
import { SignalDot } from '@/components/visuals/signal-dot'

const measures = {
  narrow: 'measure-tight',
  standard: 'measure',
  wide: 'max-w-4xl',
} as const

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  maxWidth = 'standard',
  id,
  onNavy = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  level?: 2 | 3
  maxWidth?: keyof typeof measures
  id?: string
  onNavy?: boolean
  className?: string
}) {
  const Heading = level === 2 ? 'h2' : 'h3'

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/*
        The eyebrow is nested inside the heading rather than sitting beside it
        as a sibling <p>.

        The eyebrow carries the proper noun the section is about ("Evidence
        Grades", "Intent Context", "Seven Engineering Layers") while the title
        is usually a full sentence that never repeats it. Retrieval systems
        chunk a page by its headings and prepend the heading text to each
        segment, so with the term outside the heading, every section was
        labelled with a sentence that omitted its own subject.

        Nesting rather than duplicating with sr-only: hidden text repeating
        visible text two lines above reads as heading stuffing, and nesting
        reaches the identical result. Rendered output is unchanged because the
        flex column and both type styles move onto the spans.
      */}
      <Heading
        id={id}
        className={cn('flex flex-col gap-4', measures[maxWidth])}
      >
        {eyebrow ? (
          <span
            className={cn(
              'text-eyebrow flex items-center gap-2',
              onNavy ? 'text-[var(--color-cyan)]' : 'text-[var(--color-blue)]',
            )}
          >
            <SignalDot size={6} tone={onNavy ? 'cyan' : 'blue'} />
            {eyebrow}
          </span>
        ) : null}
        {/*
          Explicit separator so a text extractor that treats sibling spans as
          inline yields "Intent Context What a unit..." rather than
          "Intent ContextWhat a unit...". A whitespace-only text node does not
          create an anonymous flex item, so layout is unaffected.
        */}
        {eyebrow ? ' ' : null}

        <span
          className={cn(
            level === 2 ? 'text-h2' : 'text-h3',
            onNavy && 'text-[var(--color-field)]',
          )}
        >
          {title}
        </span>
      </Heading>

      {description ? (
        <p
          className={cn(
            'text-lead measure',
            onNavy
              ? 'text-[color-mix(in_srgb,var(--color-field)_78%,transparent)]'
              : 'text-[var(--color-slate)]',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
