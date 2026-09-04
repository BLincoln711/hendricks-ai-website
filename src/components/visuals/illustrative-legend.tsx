import { ILLUSTRATIVE_CAPTION } from '@/content/shared/chrome'
import { cn } from '@/lib/utils/cn'

/**
 * The one visible legend for sample-data interface visuals on a page.
 *
 * Plates do not restate the locked line; a page that draws them renders this
 * once, near the first instrument.
 */
export function IllustrativeLegend({ className }: { className?: string }) {
  return <p className={cn('illus plate-cap', className)}>{ILLUSTRATIVE_CAPTION}</p>
}
