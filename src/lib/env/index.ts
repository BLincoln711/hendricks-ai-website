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
  /**
   * GA4 web stream ID. Empty means gtag.js is never loaded. Do not invent a
   * measurement ID — set this only in Vercel when a real G- ID exists.
   */
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/, 'GA4 measurement ID must look like G-XXXXXXXX')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  /**
   * LinkedIn Insight Tag partner ID. Empty keeps the pixel off. Do not set
   * this in production until the Privacy Notice is updated to name the tag.
   */
  NEXT_PUBLIC_LINKEDIN_PARTNER_ID: z
    .string()
    .regex(/^\d+$/, 'LinkedIn partner ID must be numeric')
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
  /**
   * Shared secret for the rate-limit and idempotency keys. Without it every
   * instance derives a different key for the same visitor, which is the
   * in-memory limiter wearing a hash. Thirty-two characters minimum, rotated
   * quarterly, which also expires every key in the store.
   */
  RATE_LIMIT_HASH_SECRET: z
    .string()
    .min(32, 'RATE_LIMIT_HASH_SECRET must be at least 32 characters')
    .optional()
    .or(z.literal('').transform(() => undefined)),

  /**
   * Public-mini observation queue. Redis is optional and not on Vercel today.
   * memory (default) and fs work locally. redis uses RATE_LIMIT_REDIS_*.
   * Production Redis needs Brandon-approved env. Do not put DataForSEO or
   * Ultra probe credentials in this app.
   */
  OBSERVE_JOB_STORE: z
    .enum(['memory', 'fs', 'redis'])
    .optional()
    .or(z.literal('').transform(() => undefined)),
  /**
   * Non-production only. `1` or `true` loads the labeled filled fixture.
   * Ignored when NEXT_PUBLIC_VERCEL_ENV is production.
   */
  OBSERVE_FIXTURE: z
    .enum(['0', '1', 'true', 'false'])
    .optional()
    .or(z.literal('').transform(() => undefined)),
  /** Optional bearer secret so Ultra can POST cell updates. Absent refuses writes. */
  OBSERVE_WORKER_SECRET: z.string().optional().or(z.literal('').transform(() => undefined)),
  OBSERVE_COST_CEILING_USD: z.string().optional().or(z.literal('').transform(() => undefined)),
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
  ga4: Boolean(env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  linkedinInsight: Boolean(env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID),
  sanity: Boolean(env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  email: Boolean(env.RESEND_API_KEY && env.LEAD_FROM_EMAIL && env.LEAD_NOTIFICATION_EMAIL),
  crmWebhook: Boolean(env.CRM_WEBHOOK_URL),
  turnstile: Boolean(env.TURNSTILE_SECRET_KEY && env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
} as const
