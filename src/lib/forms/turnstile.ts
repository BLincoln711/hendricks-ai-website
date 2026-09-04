import 'server-only'

import { env, integrationStatus } from '@/lib/env'

/**
 * Optional Cloudflare Turnstile check. When the keys are absent the check
 * passes, matching the other public forms. When they are present a token
 * must verify. The failure is unnamed to the visitor.
 */

export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  if (!integrationStatus.turnstile) return true
  if (!token || !env.TURNSTILE_SECRET_KEY) return false

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  })

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    })
    if (!response.ok) return false
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch {
    return false
  }
}
