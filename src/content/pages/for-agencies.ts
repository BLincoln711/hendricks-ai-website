import type { FaqItem } from '@/components/sections/faq-section'
import type { RelatedLink } from '@/components/sections/related-links'
import type { Cta } from '@/components/ui/cta'
import type { PartnershipModel } from '@/components/visuals/partnership-models'
import { routes } from '@/config/routes'
import { observedSystemsSentence } from '@/content/shared/observed-systems'

/**
 * Approved copy, transcribed from content/pages/10-for-agencies.md.
 *
 * The markdown's "Agency inquiry" field list belongs to the agency inquiry form,
 * which is Phase 5 and blocked on approved consent language
 * (CONTENT_VERIFICATION.md L3).
 *
 * The observed-systems boundary. This page sells "AI visibility and citation
 * analysis" to a reseller, which is the audience least able to check the scope
 * for itself, and until `clientConversation` landed it bounded nothing and only
 * linked the canonical surfaces table on `/what-is-ai-mediated-search` from
 * `related`. The header comment that stood here recorded the fix required: a
 * related card is a pointer, not a scope statement, so the boundary had to be
 * approved into the markdown rather than implied by a link. It now is.
 * `clientConversation` renders `observedSystemsSentence` from
 * `src/content/shared/observed-systems.ts`, and
 * `content/pages/10-for-agencies.md` carries the same sentence as literal text,
 * because a boundary that exists only as an import has not been approved.
 * docs/17 §3.5 names five pages that carry the constant; this is the sixth, and
 * it renders the constant rather than a sixth wording.
 *
 * `clientConversation` closes one of the five questions the hero poses. Four
 * remain open, and docs/17 §11 rule 9 names this page as the standing example of
 * a page that poses a question it does not answer. Question 5, on software
 * versus internal build versus operating model, is gated on
 * `/ai-visibility-tool-or-partner`, which is absent from `src/config/routes.ts`
 * and cannot be linked yet. Do not invent answers to the remaining four to make
 * the block feel complete, and do not reword the block title to imply it answers
 * all five.
 *
 * The four answers reference their owning pages by name rather than by inline
 * anchor, because `FaqItem.answer` is `readonly string[]` and `faq-section.tsx`
 * renders each string as a plain paragraph. Every destination those answers name
 * carries a real anchor from this page through `related` below, which is why
 * that array grew from five cards to nine in the same change.
 */

export const meta = {
  title: 'Search Intelligence Partner for Digital Marketing Agencies | Hendricks',
  description:
    'Add demand intelligence, AI-selection analysis, search presence engineering, measurement, data, and governed-agent capabilities without building the full practice in-house.',
} as const

export const hero = {
  eyebrow: 'For Digital Marketing Agencies',
  title: 'Add Search Intelligence to your agency without building the entire capability in-house.',
  lead: ['Your clients are asking:'],
  clientQuestions: [
    'Why are competitors appearing in AI recommendations?',
    'Which prompts and questions actually matter?',
    'How should AI search, SEO, paid media, content, and PR work together?',
    'How do we measure business impact?',
    'Should we buy software, build internally, or change our operating model?',
  ],
  closing: [
    'Your existing team should not have to invent every answer alone.',
    'Hendricks provides a specialized intelligence and engineering layer while protecting the agency relationship.',
  ],
  primaryCta: {
    label: 'Discuss an Agency Partnership',
    href: routes.contact.path,
    analytics: { location: 'for_agencies_hero', audienceType: 'agency' },
  } satisfies Cta,
} as const

/**
 * The eyebrow label above the direct answer, and nothing else. "The client
 * conversation" is not a defined term and this is not a definition page, so no
 * `DefinedTerm` node is emitted for it. The coupling between `DirectAnswer` and
 * `definedTermSchema` is a property of the four definition pages, not of the
 * component.
 */
export const directAnswer = {
  term: 'The client conversation',
  answer:
    'The honest answer to a client asking why the brand is not in ChatGPT is that absence is not yet a diagnosis. A single answer screen is one observation under one set of conditions, so what the client is owed first is a reading of what ChatGPT says about the brand and its competitors across repeated runs and the customer contexts the business actually sells into. An agency can commit to producing that reading and to improving the conditions the brand controls. No agency can commit to the citation itself.',
} as const

/**
 * The four answers, rendered through `faq-section.tsx` at `headingLevel={2}`.
 *
 * Promotion to h2 is deliberate and permitted by that component's own contract
 * for "a page whose spine is the question set itself". After this change the
 * question set is the spine of the top half of the page, so each question reads
 * as a section in its own right and the buyer's phrasing travels with the chunk
 * a retrieval system lifts. Do not quietly drop it to 3.
 *
 * No `FAQPage` JSON-LD, here or anywhere (docs/06 §10). `faq-section.tsx` emits
 * none, which is the whole reason it exists.
 *
 * Four things these answers deliberately do not restate, each owned elsewhere
 * under docs/17 §3.2:
 *
 * - The four-part model of visibility, understanding, consideration, and
 *   recommendation belongs to `/what-is-selection-intelligence`. No substitute
 *   taxonomy of absence is built here in different words either, which is the
 *   most likely way this block would go wrong.
 * - What happens to a brand absent from the options presented belongs to
 *   `/what-is-ai-mediated-search`.
 * - "No firm controls whether an external AI or search system includes, cites,
 *   or recommends a brand" belongs to `/solutions/search-presence-engineering`.
 *   Answer three references it in one line, in different words.
 * - The crawler documentation belongs to
 *   `/what-is-generative-engine-optimization`. Answer four is a pointer, names
 *   no user agent, and cites no external URL.
 *
 * Answer two states no run count and no context count. Both are blocked on the
 * operating standard being decided rather than chosen for a sentence, so the
 * reduced form ships: a reading is taken across repeated runs and stated
 * customer contexts, and no figure is published.
 *
 * Answer four carries the mechanism label required by docs/17 §1.2 and §11
 * rule 8. Technical access rests on documented precondition, not on measured
 * effect, and the copy says so where the reader is.
 */
export const clientConversation = {
  eyebrow: 'When A Client Asks',
  title: 'The client conversation, answered.',
  items: [
    {
      question: 'Why does ChatGPT recommend a competitor and not our client?',
      answer: [
        'A competitor recommendation has more than one possible cause, and an agency principal settles it by ruling causes out in order rather than by reading the screenshot the client sent. Technical access comes first, because it is a precondition rather than a judgment and the cheapest candidate to eliminate. What the brand did in the answer comes second.',
        'Absent from the options presented and present but not recommended are different problems with different remedies. The What Is AI-Mediated Search page carries the first. The What Is Selection Intelligence page carries the difference between appearing and being considered. Stability comes last, because a cause that appears in one run and not the next is not the cause.',
        'One screenshot cannot separate those causes. It records that something happened once, not whether the brand was unreachable, present and passed over, or unlucky in a single run. Answering the client from the screenshot is a guess, and the client will remember the guess.',
      ],
    },
    {
      question: 'What can we tell the client we will actually find out?',
      answer: [
        `A reading tells the client what the observed systems returned for the commercial questions the business sells into, which competitors were named, and which sources those answers drew on, recorded run by run with the question, the supplied context, the date, and the response kept for re-inspection. ${observedSystemsSentence}`,
        'The surfaces table on the What Is AI-Mediated Search page states which surfaces are observed and which are not, and an agency should hand a client that boundary before the first report rather than after it. What a baseline produces is set out on the Selection Intelligence solution page.',
      ],
    },
    {
      question: 'What should we not promise the client?',
      answer: [
        'Three commitments sit outside an agency’s control and none should be made: the citation itself, a date by which a citation appears, and a number that will still read the same when the measurement is repeated. The Search Presence Engineering page states plainly why the first is nobody’s to give.',
        'What an agency can be held to is the conditions the brand controls, the method used to observe the result, and a record of what changed and when. The Partner Commitments Hendricks publishes for agency partnerships are the contractual form of that, and the line that matters most in a client conversation is the one that permits no fabricated results and no guaranteed citation claims.',
      ],
    },
    {
      question: 'How do we check whether ChatGPT can reach the client’s site at all?',
      answer: [
        'Technical access is the one candidate cause an agency can check the same day, before any measurement is commissioned. The What Is Generative Engine Optimization page carries the first-party platform documentation for it.',
        'Platform documentation states which crawler surfaces a site in a system’s search results and how a site controls its access. It does not establish that allowing access produces a citation. Access is a precondition that can be checked, not a lever with a measured effect. An agency that sells it as a lever is selling plausible mechanism as measured effect.',
      ],
    },
  ] satisfies readonly FaqItem[],
} as const

export const models = {
  eyebrow: 'Partnership Models',
  title: 'Four models. Ownership defined before delivery.',
  items: [
    {
      name: 'White-label specialist',
      description:
        'Hendricks delivers under the agency’s brand, communication structure, and account leadership.',
      bestFor: 'Agencies protecting one unified client experience.',
    },
    {
      name: 'Embedded intelligence lead',
      description:
        'Hendricks joins strategy, technical, data, or client meetings as an extension of the agency team.',
      bestFor: 'Enterprise accounts and temporary capability gaps.',
    },
    {
      name: 'Co-branded partner',
      description:
        'Both organizations are visible, with responsibilities and ownership defined in advance.',
      bestFor: 'Complex engagements where specialist authority supports the sale.',
    },
    {
      name: 'System builder',
      description:
        'Hendricks architects and deploys a repeatable Search Intelligence capability that the agency can operate.',
      bestFor: 'Agencies building a durable new service line.',
    },
  ] satisfies readonly PartnershipModel[],
} as const

export const capabilities = {
  eyebrow: 'Capabilities',
  title: 'What an agency can draw on.',
  items: [
    'Search Demand Intelligence',
    'Selection Intelligence',
    'AI visibility and citation analysis',
    'Technical search architecture',
    'Entity and brand-understanding analysis',
    'Decision-content architecture',
    'Search Presence Engineering',
    'Paid and organic',
    'Search impact measurement',
    'BigQuery and data engineering',
    'Governed monitoring agents',
    'Executive reporting',
    'Client workshops',
    'White-label research',
  ],
} as const

export const commitments = {
  eyebrow: 'Partner Commitments',
  title: 'The protections that come with the partnership.',
  items: [
    'No client solicitation or circumvention',
    'No undisclosed upselling',
    'Branding and communication ownership defined in advance',
    'Agency retains the client relationship',
    'NDA and data-access terms established before delivery',
    'Documented scope, assumptions, outputs, and acceptance criteria',
    'Implementation documentation provided to the agency',
    'Honest disclosure when a simpler solution is sufficient',
    'No fabricated results or guaranteed citation claims',
  ],
} as const

export const related: readonly RelatedLink[] = [
  {
    href: routes.solutions.path,
    label: 'Solutions',
    description: 'The four capabilities an agency can bring to a client engagement.',
  },
  {
    href: routes.howItWorks.path,
    label: 'How It Works',
    description: 'The delivery system behind every partnership model.',
  },
  {
    href: routes.forBrands.path,
    label: 'For Brands',
    description: 'How Hendricks works with direct clients.',
  },
  {
    href: routes.methodology.path,
    label: 'Methodology',
    description: 'The research standards your clients will be shown.',
  },
  {
    href: routes.whatIsAiMediatedSearch.path,
    label: routes.whatIsAiMediatedSearch.label,
    description: 'See which AI systems Hendricks observes, and which it does not.',
  },
  {
    href: routes.whatIsSelectionIntelligence.path,
    label: routes.whatIsSelectionIntelligence.label,
    description: 'Read the difference between appearing in an answer and being considered.',
  },
  {
    href: routes.selectionIntelligence.path,
    label: routes.selectionIntelligence.label,
    description: 'See what a baseline produces before quoting one to a client.',
  },
  {
    href: routes.searchPresenceEngineering.path,
    label: routes.searchPresenceEngineering.label,
    description: 'Read why no firm controls whether an AI system cites a brand.',
  },
  {
    href: routes.whatIsGenerativeEngineOptimization.path,
    label: routes.whatIsGenerativeEngineOptimization.label,
    description: 'Check technical access against each platform’s own crawler documentation.',
  },
]

export const closing = {
  title: 'Strengthen the capability your clients increasingly expect.',
  primaryCta: {
    label: 'Discuss an Agency Intelligence Partnership',
    href: routes.contact.path,
    analytics: { location: 'for_agencies_closing', audienceType: 'agency' },
  } satisfies Cta,
} as const
