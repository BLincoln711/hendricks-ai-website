import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge does not know about the project's custom type-scale utilities,
 * so it classified `text-h2` as a text colour and treated it as conflicting with
 * `text-ink`, silently dropping the font size and rendering headings at body
 * size.
 *
 * Registering the scale in the font-size group keeps size and colour
 * independent. The list tracks the type roles the token file declares; `display`
 * left with the canvas, which has no size above H1.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'h1',
            'h2',
            'h3',
            'h4',
            'lead',
            'body',
            'small',
            'caption',
            'coordinate',
            'eyebrow',
            'illus',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
