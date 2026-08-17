import 'server-only'

import { z } from 'zod'

/**
 * Server-only environment parsing. Public values are re-exported through
 * `publicEnv` so client components never reach for `process.env` directly.
 *
 * Credentials for Sanity, Resend, and GTM are not yet provisioned. Every one of
 * them is optional here so the build never blocks, and each consuming adapter is
 * responsible for degrading safely when its value is absent. See
 * `IMPLEMENTATION_PLAN.md` §11.
 */

const optionalUrl = z.url().optional().or(z.literal('').transform(() => undefined))

const serverSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('https://hendricks.ai'),
  NEXT_PUBLIC_GTM_ID: z
    .string()
    .regex(/^GTM-[A-Z0-9]+$/, 'GTM container ID must look like GTM-XXXXXXX')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  NEXT_PUBLIC_VERCEL_ENV: z
    .enum(['development', 'preview', 'production'])
    .default('development'),
  /**
   * Optional analytics remain off until the consent network tests pass against a
   * deployed environment (docs/11, privacy phase). Absent means false.
   */
  NEXT_PUBLIC_ENABLE_OPTIONAL_ANALYTICS: z
    .enum(['true', 'false'])
    .default('false')
    .or(z.literal('').transform(() => 'false' as const)),

  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2026-08-01'),
  SANITY_READ_TOKEN: z.string().optional(),
  SANITY_PREVIEW_SECRET: z.string().optional(),
  SANITY_REVALIDATE_SECRET: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  LEAD_FROM_EMAIL: z.string().optional(),
  LEAD_NOTIFICATION_EMAIL: z.email().optional().or(z.literal('').transform(() => undefined)),

  CRM_WEBHOOK_URL: optionalUrl,
  CRM_WEBHOOK_SECRET: z.string().optional(),

  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),

  RATE_LIMIT_REDIS_URL: optionalUrl,
  RATE_LIMIT_REDIS_TOKEN: z.string().optional(),
})

const parsed = serverSchema.safeParse(process.env)

if (!parsed.success) {
  // Never print values — only the failing key names.
  const keys = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')
  throw new Error(`Invalid environment configuration for: ${keys}`)
}

export const env = parsed.data

export const isProduction = env.NEXT_PUBLIC_VERCEL_ENV === 'production'

/** Only production is indexable. Preview and development are noindex. */
export const isIndexable = isProduction

export const integrationStatus = {
  gtm: Boolean(env.NEXT_PUBLIC_GTM_ID),
  sanity: Boolean(env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  email: Boolean(env.RESEND_API_KEY && env.LEAD_NOTIFICATION_EMAIL),
  crmWebhook: Boolean(env.CRM_WEBHOOK_URL),
  turnstile: Boolean(env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
} as const
