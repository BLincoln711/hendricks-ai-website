import { fit } from '@/content/pages/diagnostic'
import { routes } from '@/config/routes'

/**
 * Copy for the "Is Hendricks a fit?" tool (15 section 3, CANON R8).
 *
 * Built only from the fourteen approved fit items. The approved text is the
 * context a question is read in, so the tool asserts nothing the /diagnostic
 * page does not already publish, and every result explains itself with the
 * approved wording rather than a paraphrase of it.
 *
 * The two lists still render in full above the tool. That is D-E: the approved
 * text answers a question a reader may have arrived with, and turning it into
 * a set of radio buttons would take the answer away from anyone who is not
 * going to click through fourteen of them.
 */

export type FitAnswer = 'yes' | 'no'
export type FitSide = 'good' | 'not'

export type FitItem = {
  id: FitItemId
  side: FitSide
  /** Verbatim from `diagnostic.fit`. The single source for both renderings. */
  approved: string
  question: string
}

export type FitItemId =
  | 'G1'
  | 'G2'
  | 'G3'
  | 'G4'
  | 'G5'
  | 'G6'
  | 'N1'
  | 'N2'
  | 'N3'
  | 'N4'
  | 'N5'
  | 'N6'
  | 'N7'
  | 'N8'

const goodQuestions = [
  'Does your organization have valuable search-driven customer decisions?',
  'Does your organization invest meaningfully in SEO, paid search, content, or AI visibility?',
  'Do you need to understand why competitors are entering the shortlist?',
  'Do you have enough authority to implement changes?',
  'Can you provide appropriate search, analytics, or CRM access?',
  'Do you want evidence rather than guaranteed placement?',
] as const

const notQuestions = [
  'Are you seeking guaranteed ChatGPT citations?',
  'Are you seeking hundreds of generic articles?',
  'Are you seeking a one-week ranking fix?',
  'Are you seeking a free custom strategy?',
  'Are you seeking a dashboard with no implementation?',
  'Are you seeking attribution certainty the available data cannot support?',
  'Are you seeking a low-cost replacement for an SEO freelancer?',
  'Are you seeking recommendations your organization has no authority to implement?',
] as const

/**
 * Pairs each approved item with its question by position.
 *
 * Pairing by index rather than by repeating the approved sentence is what keeps
 * the two renderings from drifting: adding an item to `diagnostic.fit` without
 * writing its question fails the build here instead of shipping a list of
 * thirteen questions beside a list of fourteen statements.
 */
function build(side: FitSide, approved: readonly string[], questions: readonly string[]): FitItem[] {
  if (approved.length !== questions.length) {
    throw new Error(`Fit tool: ${side} list has ${approved.length} items and ${questions.length} questions.`)
  }

  const prefix = side === 'good' ? 'G' : 'N'

  return approved.map((text, index) => ({
    id: `${prefix}${index + 1}` as FitItemId,
    side,
    approved: text,
    question: questions[index] as string,
  }))
}

export const fitItems: readonly FitItem[] = [
  ...build('good', fit.goodFit.items, goodQuestions),
  ...build('not', fit.notFit.items, notQuestions),
]

export const fitTool = {
  eyebrow: fit.eyebrow,
  heading: 'Is Hendricks a fit?',
  intro: 'Fourteen questions drawn from who the Diagnostic is designed for. Advisory only.',
  listsIntro: fit.title,
  skipLabel: 'Skip the fit check and go to the Diagnostic application',
  /** Without JavaScript the section is the two approved lists and this line. */
  staticInstruction: 'Read both lists, then apply below.',
  goodLegend: fit.goodFit.heading,
  notLegend: fit.notFit.heading,
  answerLabels: { yes: 'Yes', no: 'No' },
  /** Until all fourteen are answered the region reports progress, not a band. */
  progress: (answered: number) =>
    `Answer all fourteen for a reading. ${answered} of 14 answered.`,
  driversHeading: 'What pointed to this reading:',
  continueLabel: 'Continue to the Diagnostic application',
  /** Fixed line under the result region. The tool's whole privacy contract. */
  storageNote:
    'Your answers stay in this browser tab. Nothing is stored or sent, and the application below never depends on this reading.',
  results: {
    strong: {
      heading: 'Reading: the Diagnostic is likely the right first step.',
      body: 'Your answers match what the Diagnostic is designed for: a valuable decision that runs through search, real investment behind it, the authority and the access to act, and a preference for evidence over promises. This is a reading, not an acceptance. Every application is reviewed for fit.',
    },
    possible: {
      heading: 'Reading: the Diagnostic may be the right first step.',
      body: 'Most of your answers match what the Diagnostic is designed for, and at least one does not. That is common. Scope, access, and authority are usually settled in conversation, not on a form. Apply, and use the Additional context field to say which items you answered differently and why.',
    },
    notAFit: {
      heading: 'Reading: the Diagnostic is probably not the right first step.',
      body: 'Your answers point to something the Diagnostic does not do. It cannot guarantee a citation, it does not produce volume content or a one-week fix, and it is not a dashboard or a substitute for a freelancer. When a simpler solution is sufficient, Hendricks says so directly, and this is one of those readings.',
      closing:
        'The application below stays open. If you think this reading is wrong, apply and say why.',
      links: [
        {
          label: 'Decide whether you need a tool or a partner',
          href: routes.aiVisibilityToolOrPartner.path,
        },
        {
          label: 'Read what Selection Intelligence measures',
          href: routes.whatIsSelectionIntelligence.path,
        },
        { label: 'Read The Answer Index', href: '/research/the-answer-index' },
        {
          label: 'Tell Hendricks what you need instead',
          href: `${routes.contact.path}?intent=brand`,
        },
      ],
    },
  },
} as const
