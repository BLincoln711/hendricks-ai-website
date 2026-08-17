import { z } from 'zod'

/**
 * Privacy request contract (docs/15 §9).
 *
 * The enum values are the contract; the visible labels live in
 * `src/content/legal/privacy-request.ts`. Keeping them apart means the wording
 * can be revised without silently changing what a stored case record means.
 *
 * `attestation` is a `literal(true)` because docs/16 §9 requires a truthfulness
 * declaration. That is the one required checkbox on the site, and it is not
 * consent — it is a statement about the requester's authority. The inquiry forms
 * still have no required checkbox of any kind (docs/16 §7).
 */

export const relationshipValues = [
  'website-visitor',
  'inquiry-submitter',
  'marketing-subscriber',
  'client-representative',
  'agency-partner-representative',
  'authorized-agent',
  'other',
] as const

export const requestTypeValues = [
  'access',
  'correct',
  'delete',
  'portability',
  'object-or-restrict',
  'withdraw-consent',
  'opt-out',
  'appeal',
  'other',
] as const

export const privacyRequestInputSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Enter your first name.').max(80),
    lastName: z.string().trim().min(1, 'Enter your last name.').max(80),
    email: z.string().trim().max(254).pipe(z.email('Enter a valid email address.')),
    country: z.string().trim().min(2, 'Enter your country.').max(100),
    stateOrProvince: z.string().trim().max(100).optional(),
    relationship: z.enum(relationshipValues, {
      error: 'Select your relationship to Hendricks.',
    }),
    requestType: z.enum(requestTypeValues, { error: 'Select a request type.' }),
    details: z
      .string()
      .trim()
      .min(10, 'Describe your request in at least a sentence.')
      .max(5000),
    isAuthorizedAgent: z.boolean().default(false),
    originalRequestId: z.string().trim().max(100).optional(),
    attestation: z.literal(true, {
      error: 'You must confirm that the information in this request is accurate.',
    }),
    honeypot: z.string().max(0),
    startedAt: z.number().int().positive(),
    turnstileToken: z.string().optional(),
  })
  .refine((value) => value.requestType !== 'appeal' || Boolean(value.originalRequestId), {
    error: 'Identify the original request you are appealing.',
    path: ['originalRequestId'],
  })

export type PrivacyRequestInput = z.infer<typeof privacyRequestInputSchema>
