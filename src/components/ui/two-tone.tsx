import type { ElementType } from 'react'

import { cn } from '@/lib/utils/cn'

export type TwoToneSentence = {
  /** The claim, at full ink. */
  claim: string
  /** Its continuation, at the quiet ink tier, inside the same sentence. */
  continuation: string
}

/**
 * The two-tone sentence (canvas `canvas.md` section 1, item 7).
 *
 * One sentence in two ink tiers: the claim at full ink, the continuation at 62
 * per cent. It is the page's signature typographic move and appears at least
 * once per page. Both tiers clear AA on the ground (18.40:1 and 7.35:1), so
 * the second half is quiet, not faint.
 *
 * The two halves are one sentence to a reader and to a crawler: they sit in one
 * paragraph separated by a space, so a text extraction reads the whole claim.
 * Under forced colours both tiers collapse to CanvasText and the stylesheet
 * distinguishes them by weight instead.
 */
export function TwoTone({
  sentence,
  as: Component = 'p',
  className,
}: {
  sentence: TwoToneSentence
  as?: ElementType
  className?: string
}) {
  return (
    <Component className={cn('two-tone', className)}>
      {sentence.claim} <span className="cont">{sentence.continuation}</span>
    </Component>
  )
}
