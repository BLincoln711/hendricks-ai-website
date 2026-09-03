import Image from 'next/image'
import Link from 'next/link'

/**
 * The wordmark "Hendricks." with the signal dot as its period (09 5.54).
 *
 * This is the PNG placeholder handoff 5.8 allows: the repo holds no vector
 * source, so the outlined SVG with its addressable `circle[data-part="dot"]`
 * lands in a follow-up commit once the licensed artwork is in `assets/source/`.
 * The accessible name is "Hendricks" without the period, which belongs to the
 * visual mark only (CANON section 2). Never `priority` (16 PF-05).
 *
 * Height reads `--header-wordmark-height` (28 px; 24 below 720, 20 below 360)
 * and width follows the file's own ratio. No `sizes`: the mark has fixed
 * dimensions, so `next/image` emits its 1x and 2x candidates instead of the
 * full device-width srcset a `sizes` value would request.
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
 * The image variant, named "Hendricks" (16 SM-09). `decorative` drops the
 * name where a named link or a dialog title already carries it.
 */
export function Wordmark({ decorative = false }: { decorative?: boolean }) {
  return (
    <Image
      src={WORDMARK_SRC}
      alt={decorative ? '' : 'Hendricks'}
      aria-hidden={decorative || undefined}
      width={REST_WIDTH}
      height={REST_HEIGHT}
      className="h-[var(--header-wordmark-height)] w-auto"
    />
  )
}

/** The link variant for the header, named "Hendricks, home" (16 SM-09). */
export function WordmarkLink() {
  return (
    <Link
      href="/"
      aria-label="Hendricks, home"
      className="inline-flex min-h-target shrink-0 items-center rounded-[var(--focus-ring-radius)]"
    >
      <Wordmark decorative />
    </Link>
  )
}
