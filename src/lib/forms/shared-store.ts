import 'server-only'

import { env } from '@/lib/env'

/**
 * The small shared key store the rate limit and the idempotency bucket both
 * read (15 blocker 3).
 *
 * A serverless deployment runs one instance per concurrent request, so a
 * module-level Map is not a rate limit and not an idempotency bucket: five
 * instances each admit five attempts, and two instances each send the same
 * lead. Both defences need one counter every instance can see, which is what
 * this adapter provides when `RATE_LIMIT_REDIS_URL` and its token are set.
 *
 * The transport is the Upstash REST API over `fetch` rather than a Redis
 * client library. A serverless function cannot hold a TCP connection open
 * between invocations, so a pooled client buys nothing here, and the two
 * commands below are a smaller surface than a dependency.
 *
 * Without a configured store the in-memory fallback keeps the same interface
 * and reports `distributed: false`, so the phase report and
 * `rateLimitIsDistributed` state what is actually running rather than what is
 * configured.
 */

export type IncrementResult = { count: number; ttlMs: number }
export type ClaimResult = { claimed: boolean; existing: string | null }

export type SharedStore = {
  readonly distributed: boolean
  /** Adds one to a fixed window, creating it with `windowSeconds` to live. */
  increment(key: string, windowSeconds: number): Promise<IncrementResult>
  /** Writes `value` only when `key` is free. Returns whatever now holds it. */
  claim(key: string, value: string, ttlSeconds: number): Promise<ClaimResult>
  /** Gives a claim back, so a failed delivery does not block the retry. */
  release(key: string): Promise<void>
}

type PipelineReply = { result?: unknown; error?: string }

async function pipeline(commands: (string | number)[][]): Promise<unknown[]> {
  const url = env.RATE_LIMIT_REDIS_URL
  const token = env.RATE_LIMIT_REDIS_TOKEN

  if (!url || !token) throw new Error('Shared store is not configured.')

  const response = await fetch(`${url.replace(/\/$/, '')}/pipeline`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Shared store responded ${response.status}.`)
  }

  const replies = (await response.json()) as PipelineReply[]
  const failed = replies.find((reply) => reply.error)
  if (failed) throw new Error('Shared store rejected a command.')

  return replies.map((reply) => reply.result)
}

function asNumber(value: unknown): number {
  return typeof value === 'number' ? value : Number(value ?? 0)
}

const redisStore: SharedStore = {
  distributed: true,

  async increment(key, windowSeconds) {
    // `EXPIRE ... NX` sets the window only on the first increment, so a burst
    // cannot keep pushing the reset time forward and hold the window open.
    const [count, , ttlMs] = await pipeline([
      ['INCR', key],
      ['EXPIRE', key, windowSeconds, 'NX'],
      ['PTTL', key],
    ])

    const remaining = asNumber(ttlMs)
    return {
      count: asNumber(count),
      ttlMs: remaining > 0 ? remaining : windowSeconds * 1000,
    }
  },

  async claim(key, value, ttlSeconds) {
    const [written, existing] = await pipeline([
      ['SET', key, value, 'NX', 'EX', ttlSeconds],
      ['GET', key],
    ])

    return {
      claimed: written === 'OK',
      existing: typeof existing === 'string' ? existing : null,
    }
  },

  async release(key) {
    await pipeline([['DEL', key]])
  },
}

type Entry = { value: string; count: number; expiresAt: number }

/** Keeps the fallback map from growing without bound under load. */
const MAX_TRACKED_KEYS = 10_000

function createMemoryStore(): SharedStore {
  const entries = new Map<string, Entry>()

  function read(key: string, now: number): Entry | undefined {
    const entry = entries.get(key)
    if (!entry) return undefined
    if (entry.expiresAt <= now) {
      entries.delete(key)
      return undefined
    }
    return entry
  }

  function sweep(now: number): void {
    for (const [key, entry] of entries) {
      if (entry.expiresAt <= now) entries.delete(key)
    }
  }

  return {
    distributed: false,

    async increment(key, windowSeconds) {
      const now = Date.now()
      if (entries.size > MAX_TRACKED_KEYS) sweep(now)

      const existing = read(key, now)

      if (!existing) {
        entries.set(key, { value: '', count: 1, expiresAt: now + windowSeconds * 1000 })
        return { count: 1, ttlMs: windowSeconds * 1000 }
      }

      existing.count += 1
      return { count: existing.count, ttlMs: existing.expiresAt - now }
    },

    async claim(key, value, ttlSeconds) {
      const now = Date.now()
      const existing = read(key, now)

      if (existing) return { claimed: false, existing: existing.value }

      entries.set(key, { value, count: 0, expiresAt: now + ttlSeconds * 1000 })
      return { claimed: true, existing: value }
    },

    async release(key) {
      entries.delete(key)
    },
  }
}

let memoryStore = createMemoryStore()

export const sharedStoreIsConfigured = Boolean(
  env.RATE_LIMIT_REDIS_URL && env.RATE_LIMIT_REDIS_TOKEN,
)

/**
 * The store, with the fallback applied per call rather than per process.
 *
 * A shared store that is briefly unreachable must not take the forms down with
 * it. Degrading to the in-memory window keeps some defence and keeps the lead,
 * which is the right trade for an anti-abuse control; the failure is logged so
 * an operator can see that the distributed guarantee lapsed.
 */
export async function withSharedStore<T>(
  run: (store: SharedStore) => Promise<T>,
  context: string,
): Promise<T> {
  if (sharedStoreIsConfigured) {
    try {
      return await run(redisStore)
    } catch {
      // The caught value can carry the key, and a key is derived from an IP
      // address, so the message is written here rather than forwarded.
      console.error(`[forms] shared store unavailable for ${context}; using this instance only.`)
    }
  }

  return run(memoryStore)
}

/** Test seam. Clears the fallback so one test cannot see another's window. */
export function resetMemoryStoreForTests(): void {
  memoryStore = createMemoryStore()
}
