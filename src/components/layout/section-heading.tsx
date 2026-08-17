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
      {eyebrow ? (
        <p
          className={cn(
            'text-eyebrow flex items-center gap-2',
            onNavy ? 'text-[var(--color-cyan)]' : 'text-[var(--color-blue)]',
          )}
        >
          <SignalDot size={6} tone={onNavy ? 'cyan' : 'blue'} />
          {eyebrow}
        </p>
      ) : null}

      <Heading
        id={id}
        className={cn(
          level === 2 ? 'text-h2' : 'text-h3',
          measures[maxWidth],
          onNavy && 'text-[var(--color-field)]',
        )}
      >
        {title}
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
