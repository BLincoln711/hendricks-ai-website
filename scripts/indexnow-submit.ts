/**
 * IndexNow submission for hendricks.ai.
 *
 * Why this exists: ChatGPT Search retrieves primarily through Bing's index and
 * Copilot grounds on Bing, so Bing indexation carries weight well beyond Bing's
 * consumer search share. IndexNow is the one mechanism that pushes a URL set at
 * that index rather than waiting to be crawled. Yandex and Seznam consume the
 * same endpoint. Google does not participate.
 *
 * RUN THIS MANUALLY, AFTER A DEPLOY IS LIVE:
 *
 *   npx tsx scripts/indexnow-submit.ts
 *
 * Deliberately NOT wired to `postbuild`. On Vercel that hook runs during the
 * build, before the deployment is promoted, so it would ask Bing to crawl URLs
 * that still resolve to the previous build.
 *
 * This accelerates discovery; it does not replace verifying the domain in Bing
 * Webmaster Tools and submitting the sitemap there.
 */
import { indexableBuiltRoutes } from '../src/config/routes'

const KEY = 'f8a860f698995245d3e7f2c2296357b8'
const HOST = 'hendricks.ai'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

async function main() {
  const urlList = indexableBuiltRoutes().map((route) => new URL(route.path, ORIGIN).toString())

  // A key that does not resolve makes the whole submission fail as unauthorized,
  // and the API reports that with the same 200 it uses for success. Check first.
  const keyUrl = `${ORIGIN}/${KEY}.txt`
  const keyResponse = await fetch(keyUrl)
  const keyBody = (await keyResponse.text()).trim()

  if (!keyResponse.ok || keyBody !== KEY) {
    console.error(`Key file check failed at ${keyUrl}`)
    console.error(`  status ${keyResponse.status}, body ${JSON.stringify(keyBody.slice(0, 64))}`)
    console.error('Deploy the key file before submitting, or the submission is silently rejected.')
    process.exit(1)
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList }),
  })

  console.log(`Submitted ${urlList.length} URLs. IndexNow responded ${response.status}.`)
  for (const url of urlList) console.log(`  ${url}`)

  // 200 and 202 both mean accepted. 422 usually means a URL is off-host.
  if (![200, 202].includes(response.status)) {
    console.error(await response.text())
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
