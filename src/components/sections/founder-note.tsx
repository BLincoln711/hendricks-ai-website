import Image from 'next/image'

import { RuleLink } from '@/components/ui/cta'
import type { founder } from '@/content/pages/home'

/**
 * The founder note (canvas `home-v3.html` station 9).
 *
 * The homepage's whole founder module: a portrait, the approved sentence
 * naming Brandon Lincoln Hendricks and his locked title, and the delivery-model
 * line that ties the engagement back to the published method. The employment
 * ledger stays on /about, which this links to.
 *
 * Decision D-D: the portrait renders in colour. No greyscale, no duotone, no
 * desaturation, at any size, on any ground. `.founder img` sets `filter: none`
 * on purpose and it must not be removed. The source is the 660 by 819 crop and
 * the box is 84 px square, so `sizes` asks for the small candidate rather than
 * shipping the full portrait to render it at a tenth of its width.
 *
 * The name is a `b` rather than a heading: it is a label inside a paragraph,
 * and a heading here would insert an outline level under a station whose H2
 * belongs to the Diagnostic.
 */
export function FounderNote({ founder: content, id }: { founder: typeof founder; id?: string }) {
  return (
    <div className="founder" id={id}>
      <Image
        src={content.portrait.src}
        alt={content.portrait.alt}
        width={content.portrait.width}
        height={content.portrait.height}
        sizes="84px"
      />
      <div>
        <p>
          <b>{content.name}</b> {content.body} {content.deliveryModel}
        </p>
        <RuleLink cta={content.cta} />
      </div>
    </div>
  )
}
