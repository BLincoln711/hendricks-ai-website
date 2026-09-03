import Image from 'next/image'
import Link from 'next/link'

/**
 * The wordmark "Hendricks." with the signal dot as its period (09 5.54).
 *
 * This is the PNG placeholder handoff 5.8 allows: the repo holds no vector
 * source, so the outlined SVG with its addressable `circle[data-part="dot"]`
 * lands in a follow-up commit once the licensed artwork is in `assets/source/`.
 * The mark carries the period, which is the signal dot and belongs to the
 * visual wordmark only (CANON section 2); the accessible name is on the link
 * that wraps it. Never `priority` (16 PF-05).
 *
 * Height reads `--header-wordmark-height` (28 px, 20 below 375) and width
 * follows the file's own ratio. No `sizes`: the mark has fixed dimensions, so
 * `next/image` emits its 1x and 2x candidates instead of the full device-width
 * srcset a `sizes` value would request.
 *
 * The asset is the Field White variant. `scripts/build-brand-assets.ts` names
 * the two files by the ground they sit on, so `-dark` is the mark FOR a dark
 * ground and carries light ink. The canvas has one near-black ground on every
 * route, so this is the only variant the site renders; the `-light` file is the
 * near-black ink one and would be invisible here. `tests/unit/wordmark.test.tsx`
 * decodes whichever file this component asks for and fails below 3:1 against
 * `--bg`, so an asset swap cannot blank the mark again.
 */
const WORDMARK_SRC = '/brand/hendricks-wordmark-dark.png'

const INTRINSIC_WIDTH = 2346
const INTRINSIC_HEIGHT = 507
const REST_HEIGHT = 28
const REST_WIDTH = Math.round((REST_HEIGHT / INTRINSIC_HEIGHT) * INTRINSIC_WIDTH)

/**
 * The image itself. Both places the mark appears are the link below, whose
 * `aria-label` is the name, so the image is always decorative: a second name
 * inside a named link is read out twice (16 SM-09).
 */
export function Wordmark() {
  return (
    <Image
      src={WORDMARK_SRC}
      alt=""
      aria-hidden
      width={REST_WIDTH}
      height={REST_HEIGHT}
      className="h-[var(--header-wordmark-height)] w-auto"
    />
  )
}

/**
 * The link variant, named "Hendricks, home" (16 SM-09). The masthead and the
 * footer both render it, so it is the only consumer of the image.
 */
export function WordmarkLink() {
  return (
    <Link
      href="/"
      aria-label="Hendricks, home"
      className="inline-flex min-h-target shrink-0 items-center rounded-[var(--focus-ring-radius)]"
    >
      <Wordmark />
    </Link>
  )
}
