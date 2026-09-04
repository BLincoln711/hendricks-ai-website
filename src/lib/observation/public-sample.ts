import { sampleIntentsFor, isObservationCategoryId } from '@/lib/observation/parse'
import type { ObservationCreateInput } from '@/lib/observation/schema'

/**
 * Public-mini create lock. Category is the closed four-item list. Contexts
 * are the reviewed templates for that category, never caller-supplied prompts.
 */

export function constrainPublicSample(
  input: ObservationCreateInput,
):
  | { ok: true; input: ObservationCreateInput }
  | {
      ok: false
      code: 'VALIDATION_ERROR'
      message: string
      fieldErrors: { category: string }
    } {
  if (!isObservationCategoryId(input.category)) {
    return {
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Review the highlighted fields and try again.',
      fieldErrors: { category: 'Choose a category.' },
    }
  }

  return {
    ok: true,
    input: {
      ...input,
      category: input.category,
      contexts: [...sampleIntentsFor(input.category)],
    },
  }
}
