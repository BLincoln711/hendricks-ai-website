import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge does not know about the project's custom type-scale utilities,
 * so it classified `text-h2` as a text *color* and treated it as conflicting
 * with `text-[var(--color-field)]` — silently dropping the font size and
 * rendering navy headings at body size.
 *
 * Registering the scale in the font-size group keeps size and color independent.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display',
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
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
