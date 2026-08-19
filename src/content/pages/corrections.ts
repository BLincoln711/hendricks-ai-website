import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import { routes } from '@/config/routes'

/**
 * Copy authored for this route, mirrored into content/pages/24-corrections.md.
 *
 * Provenance, stated plainly because the rest of `src/content/pages/` carries a
 * stronger one. CONTENT_VERIFICATION.md R6 recorded `/corrections` as "blocked
 * — no approved copy exists for this route", and docs/17 wave 0 item 0.4 records
 * that the block is roughly 200 words of policy rather than a missing fact. This
 * file is that policy. It was written alongside its markdown twin rather than
 * transcribed from copy that existed first, so like A3 and A4 it is authored
 * copy pending Brandon's editorial review, and the twin corroborates it without
 * approving it. Add a row to CONTENT_VERIFICATION.md when that review happens.
 *
 * Five decisions here are load-bearing.
 *
 * 1. THE LOG IS SEEDED, NOT EMPTY. docs/17 section 6.2 directs that the `/about`
 *    `alumniOf` defect be fixed and made the first entry here, and docs/17 wave
 *    0 item 0.4 repeats it: a corrections page whose first entry is the firm
 *    correcting its own structured data is worth more than an empty one. The
 *    entry below is that fix, and it is verifiable in git: `alumniOf` was
 *    published as `['Merkle', 'Dentsu', 'SolarWinds']` in commit 2cfcb05 on
 *    2026-08-17 and reduced to `['Merkle', 'SolarWinds']` in commit 57371c6 the
 *    same day. `tests/unit/json-ld.test.ts` now pins it.
 *
 * 2. NAMING DENTSU IS THE POINT, NOT A C1 BREACH. CONTENT_VERIFICATION.md C1
 *    blocks a client or employer name used to borrow its credibility, and blocks
 *    every logo. This entry names Dentsu in order to state that Hendricks
 *    published it wrongly and removed it, which is the opposite act. The same
 *    reasoning already licenses the Search Economy mentions in the two legal
 *    documents: naming a thing to disclaim it is not presenting it as an asset.
 *    A log entry that will not say what was wrong is not a log entry. Merkle and
 *    SolarWinds are named because both are already published in the visible role
 *    timeline on /about. `src/app/llms.txt/route.ts` still names none of the
 *    three, and its test must keep passing.
 *
 * 3. THE REPORTING PATH IS /contact AND NOT A NEW MAILBOX. A
 *    `corrections@hendricks.ai` address would be an invented, unmonitored
 *    destination: CONTENT_VERIFICATION.md L6 already holds `privacy@` and
 *    `legal@` as "blocked — mailboxes not confirmed", and publishing a third
 *    unconfirmed address on the page that promises every report gets an answer
 *    would falsify the page in its own first paragraph. The contact form exists,
 *    is monitored, and already carries an "Other" routing choice.
 *
 * 4. WHAT IS LOGGED VERSUS WHAT IS FIXED. The `scope` table draws the line at
 *    whether a change alters a claim. This is what keeps the log usable: a log
 *    padded with typo fixes hides the corrections that matter, and a log that
 *    omits an overstatement because every number in it was accurate is not
 *    honest. Both halves of that rule are in the table and neither may be
 *    dropped.
 *
 * 5. NO EXTERNAL CITATION. docs/18-SOURCE-LEDGER.md approves sources per page
 *    and carries no section for this route. Every claim here is a statement
 *    about what Hendricks does, so `sources` carries no `citations` array.
 *
 * Render order the page is built against:
 *   hero, directAnswer, scope, reporting, recording, log, limitation, related,
 *   sources, closing.
 */

export const meta = {
  title: 'Corrections | Hendricks',
  description:
    'How Hendricks corrects a published error, how to report one, and the dated log of corrections made to this site.',
} as const

export const hero = {
  eyebrow: 'Editorial Policy',
  title: 'Corrections',
  lead: [
    'Hendricks publishes measurement. Measurement that cannot be corrected in public is not measurement.',
    'This page states what gets corrected, how to report an error, and what the firm did the last time it found one in its own work.',
  ],
} as const

/**
 * The extractable unit. One self-contained statement of the policy, quotable
 * without the rest of the page, and it has to carry the reporting path with it
 * or a reader who only sees this block does not know what to do.
 *
 * `term` is a policy label, not a defined term. The page emits no `DefinedTerm`
 * node, matching /ai-visibility-tool-or-partner.
 */
export const directAnswer = {
  term: 'Corrections policy',
  answer:
    'Hendricks corrects any published statement of fact that turns out to be wrong, including figures, dates, names, definitions, and the machine-readable claims a page emits in its structured data. A substantive correction is dated, described, and left visible in the log on this page rather than edited away, and anyone can report an error through the contact form.',
} as const

export const scope = {
  eyebrow: 'Scope',
  title: 'What gets logged, and what gets fixed quietly.',
  lead: 'The line is whether the change alters a claim. A change that alters a claim is logged. A change that does not is not, because a log padded with typo fixes hides the corrections that matter.',
  caption: 'How each class of change is handled.',
  columns: [
    { key: 'change', header: 'The change', rowHeader: true, width: '46%' },
    { key: 'handling', header: 'How it is handled' },
  ],
  rows: [
    {
      change:
        'A statement of fact that is wrong: a figure, a date, a name, a definition, a source, or a claim in structured data',
      handling:
        'Corrected on the page and logged here with both dates, what was published, and what changed.',
    },
    {
      change: 'A claim that is accurate but reads as more than the evidence behind it supports',
      handling:
        'Narrowed to the claim the evidence carries, and logged. Overstating is an error even when every number in the sentence is right.',
    },
    {
      change: 'A number whose method, sample, or date range was described incompletely',
      handling:
        'The description is completed and logged. The figure stands only if the completed description still supports it.',
    },
    {
      change: 'A typo, a broken link, a formatting fault, or a rewording that alters no claim',
      handling: 'Fixed without an entry.',
    },
  ],
} as const

export const reporting = {
  eyebrow: 'Reporting An Error',
  title: 'How to report an error.',
  lead: 'Use the contact form and select Other. Include enough that the claim can be checked without a reply first.',
  items: [
    'The address of the page',
    'The sentence, figure, or table cell in question',
    'What you believe is correct',
    'How you know, where that can be shared',
  ],
  closing: [
    'Every report gets one of three answers: the claim is corrected, the claim stands and the reason is given, or the claim comes off the page while it is checked.',
    'A report that produces no answer is a failure of this policy rather than a decision under it.',
  ],
  cta: {
    label: 'Open the contact form',
    href: routes.contact.path,
    analytics: { location: 'corrections_reporting' },
  } satisfies Cta,
} as const

export const recording = {
  eyebrow: 'How A Correction Is Recorded',
  title: 'Dated, described, and left visible.',
  body: [
    'A corrected page carries the correction rather than a clean version of itself. The entry states what was published, not only what replaced it, so a reader can see the claim that was wrong.',
    'Each entry records the date the claim was published, the date it was corrected, what was wrong, and what changed. Where a figure was revised, both figures appear.',
    'Structured data is in scope. A claim a visitor never reads but a machine can read is still a published claim, and the first entry below is one of those.',
    'Where a published Hendricks figure is contradicted by someone running the same design, the contradiction is published here beside the original figure. That case is the reason this page exists.',
  ],
} as const

/**
 * The log. One entry, seeded per decision 1 above.
 *
 * `published` and `corrected` are ISO dates so the page can render machine
 * readable <time> elements. They are the same date here, which is a fact about
 * this correction rather than a placeholder: the wrong markup shipped and was
 * removed on 2026-08-17.
 */
export const log = {
  eyebrow: 'Log',
  title: 'Corrections to date.',
  lead: 'One entry. The log opens with the first correction Hendricks recorded about itself, and it does not reconstruct changes made before this page existed.',
  entries: [
    {
      id: 'about-alumni-of',
      title: 'A third employer in the founder structured data on the About page',
      published: '2026-08-17',
      corrected: '2026-08-17',
      page: { label: 'About', href: routes.about.path },
      claim:
        'The Person structured data on the About page listed three organizations under alumniOf: Merkle, Dentsu, and SolarWinds.',
      fault:
        'The verified career record names Merkle as the single employer of record, and the visible role timeline on the same page named Merkle and SolarWinds only. The third organization existed in the markup and nowhere a reader could see it, which made it a claim about the founder that the page itself did not support.',
      change:
        'Dentsu was removed from alumniOf the same day. A unit test now asserts that every organization in alumniOf also appears in the visible role timeline, so the markup cannot again state an employer the page does not show.',
    },
  ],
} as const

export const limitation = {
  title: 'This log begins on the day the page shipped.',
  body: [
    'Hendricks kept no public corrections log before this page. Earlier changes to the site are in version control and are not enumerated here, and nothing on this page claims there were none.',
    'The log records corrections to what Hendricks published. It is not a change log for the site, and it is not an audit performed by anyone outside the firm.',
  ],
} as const

/**
 * No `citations` array, and `appliedIn` is deliberately empty. See decision 5.
 * SourcesNote renders "This definition is applied in ..." only when that array
 * has a built entry, and the sentence would misdescribe a policy page.
 */
export const sources = {
  reviewed: '2026-08-19',
  basis:
    'This page states the Hendricks corrections policy and the corrections made to this site. It reports no third-party research and cites no external source.',
  appliedIn: [] as readonly { label: string; href: string }[],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'The measurement standards a published Hendricks figure is held to.',
  },
  {
    href: routes.research.path,
    label: 'Research',
    description: 'Published Hendricks measurement, with its method, sample, and stated limits.',
  },
  {
    href: routes.about.path,
    label: 'About',
    description: 'The founder record the first entry in the log corrects.',
  },
]

export const closing = {
  title: 'Found something wrong on this site? Report it, and it gets an answer.',
  primaryCta: {
    label: 'Submit a correction',
    href: routes.contact.path,
    analytics: { location: 'corrections_closing' },
  } satisfies Cta,
} as const
