import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'

/**
 * /llms.txt
 *
 * Honest note on why this exists, so nobody later mistakes it for a ranking
 * lever. Google has said llms.txt does not influence rankings and is not
 * required for AI Overviews or AI Mode. No major assistant provider has
 * committed to reading it, and request volume from the user agents that
 * actually drive citations is negligible. docs/06 §1 already prohibits treating
 * it, structured data, or crawler directives as an AI ranking shortcut.
 *
 * The reason to serve it is narrower and real: a prospect evaluating a firm
 * that sells AI-search visibility will type `hendricks.ai/llms.txt` into a
 * browser, and a 404 is a worse answer than a well-built file. Expected
 * retrieval effect is zero. Anything claimed beyond that would be the cargo
 * cult Hendricks sells against.
 *
 * Every line is derived from `config/routes.ts` and `config/site.ts` rather
 * than retyped, so this file cannot drift from the approved copy. A
 * hand-reworded summary living in a machine-readable index is exactly the
 * drift docs/12 exists to prevent.
 */

export const dynamic = 'force-static'

type Group = { heading: string; keys: (keyof typeof routes)[] }

const GROUPS: Group[] = [
  {
    heading: 'Category definitions',
    keys: [
      'whatIsSearchIntelligenceEngineering',
      'whatIsSelectionIntelligence',
      'aiSelectionProblem',
      'methodology',
    ],
  },
  {
    heading: 'Solutions',
    keys: [
      'solutions',
      'searchDemandIntelligence',
      'selectionIntelligence',
      'searchPresenceEngineering',
      'searchImpactMeasurement',
    ],
  },
  { heading: 'Engagement', keys: ['diagnostic', 'howItWorks', 'forBrands', 'forAgencies'] },
  { heading: 'Firm', keys: ['about', 'contact'] },
  { heading: 'Legal', keys: ['privacy', 'terms'] },
]

export function GET() {
  const lines: string[] = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    `${siteConfig.categoryLine}`,
    `${siteConfig.operatingLine}`,
    '',
    `Founded and led by ${siteConfig.founder}, ${siteConfig.founderRole}.`,
    '',
  ]

  for (const group of GROUPS) {
    const entries = group.keys
      .map((key) => routes[key])
      .filter((route) => route.built && route.indexable)

    if (entries.length === 0) continue

    lines.push(`## ${group.heading}`, '')
    for (const route of entries) {
      lines.push(`- [${route.label}](${new URL(route.path, siteConfig.url).toString()})`)
    }
    lines.push('')
  }

  lines.push(
    '## Notes',
    '',
    `- Canonical host: ${siteConfig.url}`,
    `- Sitemap: ${siteConfig.url}/sitemap.xml`,
    '- Every figure and credential on this site is held to a verification register.',
    '  Claims that are not yet verified are withheld rather than estimated.',
    '',
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
