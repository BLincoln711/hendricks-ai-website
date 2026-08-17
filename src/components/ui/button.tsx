import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils/cn'

/**
 * Button treatments from docs/04 §10. Height 48–52px on the default size to meet
 * the 44px minimum touch target with room to spare.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] text-center font-medium transition-colors duration-[var(--duration-micro)] ease-[var(--ease-standard)] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-hover)]',
        secondary:
          'border border-[var(--color-border)] bg-white text-[var(--color-navy)] hover:border-[var(--color-slate)] hover:bg-[var(--color-soft)]',
        outlineOnNavy:
          'border border-[color-mix(in_srgb,var(--color-field)_35%,transparent)] bg-transparent text-[var(--color-field)] hover:border-[var(--color-field)] hover:bg-[color-mix(in_srgb,var(--color-field)_10%,transparent)]',
      },
      size: {
        default: 'h-12 px-6 text-[1rem] md:h-[52px] md:px-7',
        small: 'h-11 px-5 text-[0.9375rem]',
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
