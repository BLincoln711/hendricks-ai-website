import { cn } from '@/lib/utils/cn'

const tones = {
  blue: 'bg-[var(--color-blue)]',
  cyan: 'bg-[var(--color-cyan)]',
  amber: 'bg-[var(--color-amber)]',
  slate: 'bg-[var(--color-slate)]',
} as const

/**
 * The signal dot — the period in the wordmark, reused as a data point, a
 * checkpoint, and a resolved recommendation (docs/04 §3).
 *
 * Decorative by default. It carries no meaning that is not also stated in
 * adjacent text, so it stays hidden from assistive technology.
 */
export function SignalDot({
  size = 8,
  tone = 'blue',
  className,
}: {
  size?: number
  tone?: keyof typeof tones
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block shrink-0 rounded-full', tones[tone], className)}
      style={{ width: size, height: size }}
    />
  )
}
