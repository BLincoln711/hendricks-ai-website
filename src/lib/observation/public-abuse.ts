import 'server-only'

import { z } from 'zod'

import { checkAntiAbuse } from '@/lib/forms/anti-abuse'
import { verifyTurnstileToken } from '@/lib/forms/turnstile'

/**
 * Honeypot, timing floor, and optional Turnstile for public observation
 * creates. Failures are unnamed so the control is not advertised to a bot.
 */

export const observationAbuseSchema = z.object({
  honeypot: z.string().max(0).optional().default(''),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().optional(),
})

export async function guardPublicObserveCreate(input: unknown): Promise<{ ok: true } | { ok: false }> {
  const parsed = observationAbuseSchema.safeParse(input)
  if (!parsed.success) return { ok: false }

  const antiAbuse = checkAntiAbuse({
    honeypot: parsed.data.honeypot,
    startedAt: parsed.data.startedAt,
  })
  if (!antiAbuse.ok) return { ok: false }

  if (!(await verifyTurnstileToken(parsed.data.turnstileToken))) return { ok: false }

  return { ok: true }
}
