import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * Buttons (09 5.10). Every part reads a `--button-*` token, so the same two
 * variants render on light and inside `.on-plate`, where the primary becomes
 * field ground with an ink label (D13) without a prop.
 *
 * The focus ring is the global `:focus-visible` rule (KF-06). Active adds a
 * 1 px inset ring to the hover ground; the secondary ring reads the hover
 * edge, since the token file names no separate inset for it. Disabled is a
 * real `disabled` attribute, never opacity.
 *
 * `outlineOnNavy` is deprecated: it renders the secondary variant, which is
 * what a plate needs, and is deleted with its last call site (handoff 5.3).
 */
const secondary =
  'border-[var(--button-secondary-edge)] bg-[var(--button-secondary-bg)] text-[var(--button-secondary-fg)] hover:border-[var(--button-secondary-hover-edge)] hover:bg-[var(--button-secondary-hover-bg)] active:bg-[var(--button-secondary-active-bg)] active:shadow-[inset_0_0_0_1px_var(--button-secondary-hover-edge)]'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[var(--button-gap)] rounded-[var(--button-radius)] border border-[length:var(--button-edge-width)] text-center text-[length:var(--button-font-size)] leading-[var(--leading-small)] [font-weight:var(--button-font-weight)] [transition:var(--button-transition)] disabled:pointer-events-none disabled:border-[var(--button-disabled-edge)] disabled:bg-[var(--button-disabled-bg)] disabled:text-[var(--button-disabled-fg)]',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-[var(--button-primary-bg)] text-[var(--button-primary-fg)] hover:bg-[var(--button-primary-hover-bg)] active:bg-[var(--button-primary-active-bg)] active:shadow-[inset_0_0_0_1px_var(--button-primary-active-inset)]',
        secondary,
        /** @deprecated Renders `secondary`; retired with the last call site. */
        outlineOnNavy: secondary,
      },
      size: {
        /** 48 px, the default control height. */
        default: 'min-h-[var(--button-height)] px-[var(--button-pad-x)]',
        /** 44 px compact: the header button and controls beside text. */
        small: 'min-h-[var(--button-height-compact)] px-[var(--button-pad-x-compact)]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'default' },
  },
)

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { buttonVariants }
