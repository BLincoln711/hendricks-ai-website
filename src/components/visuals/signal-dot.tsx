import { cn } from '@/lib/utils/cn'

/**
 * The signal dot (09 5.46): the period in the wordmark, a resolved node, a
 * status indicator. One colour, `--signal-dot`, which `.on-plate` re-scopes;
 * the field ring is drawn only in SVG where the dot crosses a track, so the
 * HTML dot takes none.
 *
 * Decorative: it carries no meaning that is not also stated in adjacent text,
 * so it stays hidden from assistive technology. Never a bullet or an eyebrow
 * prefix. `tone` is a no-op kept for the call sites the page PRs close.
 */
export function SignalDot({
  size = 8,
  className,
}: {
  size?: number
  /** @deprecated No-op. The dot has one colour; other tones were removed (09 5.46). */
  tone?: 'blue' | 'cyan' | 'amber' | 'slate'
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block shrink-0 rounded-full bg-signal-dot', className)}
      style={{ width: size, height: size }}
    />
  )
}
