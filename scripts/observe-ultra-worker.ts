#!/usr/bin/env tsx
/**
 * Off-box Ultra worker for the public-mini observation queue.
 *
 * Runs outside the Next app. The site never holds DataForSEO keys. This
 * script GETs a job, probes google_aio / chat_gpt / perplexity only when
 * credentials exist, classifies with src/lib/observation/classify.ts, and
 * POSTs grain-only cells to /api/observe/jobs/:job_id/cells.
 *
 * Usage:
 *   OBSERVE_WORKER_SECRET=... pnpm observe:worker -- \
 *     --base-url http://127.0.0.1:3456 \
 *     --job-id <uuid>
 *
 * Modes:
 *   default, no DataForSEO creds   simulate: every probe cell unmeasured / worker_unavailable
 *   --simulate                     force that path even if credentials exist
 *   --fixture                      non-production filled fixture write. Explicit only.
 *   DataForSEO login+password set  live probes for the three engines, never Gemini
 *
 * Non-prod check (HTTP write path):
 *   1. OBSERVE_WORKER_SECRET=... OBSERVE_JOB_STORE=memory pnpm start -- --port 3456
 *   2. Create a job:
 *        curl -sS -X POST "$BASE/api/observe/jobs" -H 'content-type: application/json' \
 *          -d '{"brand_name":"Northwind","brand_host":"northwind.example","category":"b2b-software","contexts":["...","...","..."],"consent":true}'
 *   3. pnpm observe:worker -- --base-url $BASE --job-id $JOB_ID
 *   4. curl -sS "$BASE/api/observe/jobs/$JOB_ID"
 *   Poll until cells leave pending. Gemini stays unmeasured_by_policy.
 *
 * Do not run against production. Do not print secrets.
 */

import { dataforseoCredentialsPresent, probeDataForSeo } from './lib/dataforseo-observe'
import { applyCostCeiling, liveResultKey, planProbeCells, ultraWriteBody } from '../src/lib/observation/ultra-run'
import type { ProbeClassifyResult } from '../src/lib/observation/classify'
import type { ObservationJob, ObservationPayload } from '../src/lib/observation/schema'

type WorkerArgs = {
  baseUrl: string
  jobId: string
  brandHost?: string
  contexts: string[]
  fixture: boolean
  simulate: boolean
}

function usage(): never {
  console.error(`observe-ultra-worker

  --base-url <url>       Next app origin (local or preview)
  --job-id <uuid>        Job created by POST /api/observe/jobs
  --brand-host <host>    Override job.brand_host
  --context <text>       Override job contexts (repeat 3 or 4 times)
  --simulate             Post unmeasured / worker_unavailable (default without credentials)
  --fixture              Non-production filled fixture. Never use in production.

Reads OBSERVE_WORKER_SECRET. Optional DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD
enable live probes. Never prints those values.`)
  process.exit(2)
}

function readArgs(argv: string[]): WorkerArgs {
  const args: WorkerArgs = {
    baseUrl: '',
    jobId: '',
    contexts: [],
    fixture: false,
    simulate: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    const next = argv[i + 1]
    if (token === '--base-url' && next) {
      args.baseUrl = next.replace(/\/$/, '')
      i += 1
    } else if (token === '--job-id' && next) {
      args.jobId = next
      i += 1
    } else if (token === '--brand-host' && next) {
      args.brandHost = next
      i += 1
    } else if (token === '--context' && next) {
      args.contexts.push(next)
      i += 1
    } else if (token === '--fixture') {
      args.fixture = true
    } else if (token === '--simulate') {
      args.simulate = true
    } else if (token === '--') {
      continue
    } else if (token === '-h' || token === '--help') {
      usage()
    } else {
      console.error(`Unknown argument: ${token}`)
      usage()
    }
  }

  if (!args.baseUrl || !args.jobId) usage()
  if (args.fixture && args.simulate) {
    console.error('Use --fixture or --simulate, not both.')
    process.exit(2)
  }
  return args
}

function workerSecret(): string {
  const secret = process.env.OBSERVE_WORKER_SECRET
  if (!secret) {
    console.error('OBSERVE_WORKER_SECRET is required.')
    process.exit(2)
  }
  return secret
}

function redactJob(job: ObservationJob, payload: ObservationPayload) {
  return {
    job_id: job.job_id,
    status: job.status,
    brand_host: job.brand_host,
    category: job.category,
    context_count: job.contexts.length,
    engines_requested: job.engines_requested,
    cost_ceiling_usd: job.cost_ceiling_usd,
    method: payload.method,
    gemini_row: payload.gemini_row,
    cells: payload.cells.map((cell) => ({
      engine: cell.engine,
      state: cell.state,
      error: cell.error,
      cited_url_count: cell.cited_urls?.length ?? 0,
    })),
  }
}

async function readJob(baseUrl: string, jobId: string) {
  const response = await fetch(`${baseUrl}/api/observe/jobs/${jobId}`, { cache: 'no-store' })
  const body = (await response.json()) as {
    ok?: boolean
    job?: ObservationJob
    payload?: ObservationPayload
    message?: string
  }
  if (!response.ok || !body.ok || !body.job || !body.payload) {
    throw new Error(body.message ?? `GET job failed (${response.status})`)
  }
  return { job: body.job, payload: body.payload }
}

async function writeCells(
  baseUrl: string,
  jobId: string,
  secret: string,
  write: ReturnType<typeof ultraWriteBody>,
) {
  const response = await fetch(`${baseUrl}/api/observe/jobs/${jobId}/cells`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${secret}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(write),
    cache: 'no-store',
  })
  const body = (await response.json()) as {
    ok?: boolean
    job?: ObservationJob
    payload?: ObservationPayload
    message?: string
  }
  if (!response.ok || !body.ok || !body.job || !body.payload) {
    throw new Error(body.message ?? `POST cells failed (${response.status})`)
  }
  return { job: body.job, payload: body.payload }
}

async function liveResultsFor(
  contexts: readonly string[],
  brandHost: string | undefined,
  costCeilingUsd: number,
): Promise<Map<string, ProbeClassifyResult>> {
  const results = new Map<string, ProbeClassifyResult>()
  const planned = applyCostCeiling(planProbeCells(contexts), costCeilingUsd)

  for (const item of planned) {
    if (!item.allowed) continue
    const result = await probeDataForSeo({
      engine: item.engine,
      context: item.context,
      brandHost,
    })
    results.set(liveResultKey(item.context, item.engine), result)
  }

  return results
}

async function main() {
  const args = readArgs(process.argv.slice(2))
  const secret = workerSecret()
  const current = await readJob(args.baseUrl, args.jobId)

  const contexts = args.contexts.length >= 3 ? args.contexts : current.job.contexts
  const brandHost = args.brandHost ?? current.job.brand_host
  const costCeilingUsd = current.job.cost_ceiling_usd

  if (contexts.length < 3 || contexts.length > 4) {
    console.error('The worker needs three or four contexts.')
    process.exit(2)
  }

  const live = !args.fixture && !args.simulate && dataforseoCredentialsPresent()
  const mode = args.fixture ? 'fixture' : live ? 'live' : 'simulate'

  if (mode === 'live') {
    console.error('Mode: live. Probing google_aio, chat_gpt, perplexity. Gemini is not probed.')
  } else if (mode === 'fixture') {
    console.error('Mode: fixture. Non-production labeled sample. Not a client result.')
  } else {
    console.error('Mode: simulate. Probe cells will be unmeasured / worker_unavailable.')
  }

  const liveResults =
    mode === 'live' ? await liveResultsFor(contexts, brandHost, costCeilingUsd) : undefined

  const write = ultraWriteBody({
    mode,
    contexts,
    brandHost,
    costCeilingUsd,
    liveResults,
  })

  const written = await writeCells(args.baseUrl, args.jobId, secret, write)
  console.log(JSON.stringify(redactJob(written.job, written.payload), null, 2))
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Worker failed.'
  console.error(message)
  process.exit(1)
})
