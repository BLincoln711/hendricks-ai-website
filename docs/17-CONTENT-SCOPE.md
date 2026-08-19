# 17 - Content Scope

## 1. What this document decides

This document names the answers hendricks.ai will own, the single URL that owns each one, the clusters the site will not contest, and the order the work is built in. It is the source of truth for content decisions. Where it conflicts with an earlier assessment, this document wins, and where it is silent, `docs/03` §3 and `docs/06` §11 govern.

Three rules run through everything below.

Rule one. Every answer the site makes has exactly one owning URL. A second page may reference that answer in one line and link to it. A second page may not restate it. The reason is mechanical: a retrieval system asked a question picks one passage, and eight paraphrases of the same model across five pages give it eight weak candidates instead of one strong one. On a corpus of 18,608 words where most pages are under 700, duplication is also the most expensive thing the site does with its space.

Rule two. Every prompt cluster gets one of three verdicts, and the verdict determines placement.

- OWN. The site should be the page a system cites for this cluster. Gets a canonical URL and build priority.
- EXTEND. Hendricks wins a slice, not the cluster. No new route. The answer extends a page that already exists.
- CONCEDE. Hendricks does not contest it. The reason is stated and the condition that reverses it is stated.

A scope that claims everything is not a scope. Section 4 concedes nine clusters, and two of those concessions cost real traffic.

Rule three. No recommendation in this document rests on a fact Hendricks does not have. Where a page needs such a fact, the fact is named and the item is marked blocked. Where a recommendation rests on plausible mechanism rather than measured effect, it says so in the text, and any page built from it must say so too. That labeling discipline is not a formality here. It is the differentiator, and `docs/12` §4 already requires it.

### 1.1 Standing constraints this scope operates inside

These are decided elsewhere and are not reopened here.

| Constraint | Source | Effect on scope |
|---|---|---|
| Hendricks observes exactly three systems: Google AI Overviews, ChatGPT, Perplexity | `CONTENT_VERIFICATION.md` A1 | Gemini, Google AI Mode, and Microsoft Copilot may be named as surfaces that exist. They may never be described as systems Hendricks measures. Forecloses cluster X9 entirely. |
| GEO and AEO are entry vocabulary, not positioning | `CONTENT_VERIFICATION.md` A2 | Pages may carry the terms in titles, direct answers, and headings. No page may describe a Hendricks service as GEO or AEO work. |
| Fees are withheld | `CONTENT_VERIFICATION.md` P1 to P3 | No page publishes an amount. Cost determinants may be published; a number may not. |
| No `FAQPage` JSON-LD | `docs/06` §10 | Every question structure in this document is visible headings only, rendered through `src/components/sections/faq-section.tsx`, which emits no structured data. |
| No guaranteed rankings, citations, recommendations, or revenue | `docs/12` §6 | Applies to every page including the three new ones. |
| BLOK non-compete | Brandon, standing | No real-estate vertical content, examples, or proof assets. Not revisitable through content work. |
| The Search Economy is a separate publication | `docs/12` §8, `docs/10` §2 | It may appear only in Brandon's biography on `/about`. It is not a Hendricks content channel, distribution surface, or research arm. `check:content` enforces this. |
| No em-dash in visitor-facing copy | `docs/12` §3 | `scripts/validate-content.ts` fails the build. Every proposed sentence in section 5 is written to pass it. |

### 1.2 What the evidence says about mechanism

Three findings constrain what this scope may recommend, and all three cut against the tactics the category sells.

- Off-site brand mentions correlate with AI visibility roughly three times as strongly as backlinks. This is correlational and narrower than the sentence sounds: it was measured on Google AI Overviews only, on a sample filtered to established domains, and the source itself describes the correlations as moderate to very weak. Hendricks may pursue mentions as a plausible mechanism and must describe it in exactly those words. Hendricks may not publish a page telling buyers that mentions cause citations.
- Structured data shows no measured citation lift in controlled testing. This is the strongest single fact available to the site and it is a null result on citation lift specifically, not an argument against structured data for entity clarity. Section 3.11 resolves the conflict this creates with an existing sales claim.
- llms.txt is not consumed by major engines. Do not implement it, do not sell it, and do not publish a page recommending it.

Anything else the category treats as a lever is unmeasured here. Section 4 concedes the tactical how-to cluster for that reason.

---

## 2. Corpus state, 2026-08-17

Rendered `<main>` text, scripts and styles stripped, measured from the build at 21:26.

| Route | Words | Class |
|---|---:|---|
| `/privacy` | 2,516 | legal |
| `/terms` | 2,009 | legal |
| `/solutions/search-impact-measurement` | 1,738 | solution |
| `/solutions/selection-intelligence` | 1,567 | solution |
| `/` | 1,503 | commercial |
| `/what-is-generative-engine-optimization` | 1,295 | entry definition |
| `/solutions/search-demand-intelligence` | 1,171 | solution |
| `/what-is-ai-mediated-search` | 1,084 | entry definition |
| `/solutions/search-presence-engineering` | 647 | solution |
| `/diagnostic` | 635 | commercial, entry product |
| `/about` | 563 | commercial |
| `/what-is-search-intelligence-engineering` | 537 | category definition |
| `/methodology` | 537 | method |
| `/ai-selection-problem` | 460 | manifesto |
| `/what-is-selection-intelligence` | 454 | term definition |
| `/for-brands` | 454 | commercial |
| `/solutions` | 404 | hub |
| `/how-it-works` | 401 | process |
| `/for-agencies` | 367 | commercial |
| `/contact` | 218 | transactional |

Registered and unbuilt: `/research`, `/research/[slug]`, `/corrections`, `/results`.

Coverage against the 56-prompt buyer inventory, rescored against this build: 24 yes, 20 partially, 12 no. The prior score against the pre-shipping corpus was 6 / 17 / 33. Thirty-two prompts moved and none regressed.

Read that tally honestly. It means a retrieval system asked one of those 24 questions can find a page containing the query vocabulary and lift a sentence that answers it. It does not mean the page would be preferred over the alternative. For the eleven prompts `/what-is-generative-engine-optimization` moved, the competition is a large established body of vendor content with tools, data, and links behind it, and the Hendricks advantage is that the page is honest and first-party sourced, not that it is comprehensive.

Two structural facts set the agenda for everything below.

First, vocabulary is no longer the binding constraint. Nine of the twelve remaining no verdicts and five of the twenty partials trace to a fact Hendricks does not have, not to a page that does not exist. Writing more pages does not touch them. Section 8 does.

Second, the corpus now duplicates more than it covers. The same four-part model renders eight times across five indexable pages. The observed-systems statement renders five times in five wordings. The four context panels render twice under four different names. The metric definitions render twice with different definitions for the same metric. That is the highest-value unblocked work on the site and it costs nothing but a refactor.

---

## 3. One answer, one URL

### 3.1 The register rule

Every duplicated answer on this site resolves by asking which of four registers it belongs to. This is the rule to apply when a new duplication appears and this document does not name it.

| Register | Question it answers | Owner |
|---|---|---|
| Term | What does this word mean? | The definition page at the site root that carries the term in its H1 |
| Method | How is this number produced? | `/methodology` |
| Deliverable | What does a client receive? | The solution page, or `/diagnostic` for the entry engagement |
| Problem | Why does this matter to a business? | `/ai-selection-problem` or `/what-is-ai-mediated-search` |

A metric name belongs to Term. The run design behind the metric belongs to Method. The report a client gets belongs to Deliverable. The reason a CMO should care belongs to Problem. Three pages may all touch one subject without any of them restating another, provided each stays inside its register.

### 3.2 Canonical ownership table

Every row is a decision. The third column is an instruction to the implementer, not a suggestion.

| Answer | Owning URL | What every other page does |
|---|---|---|
| What Search Intelligence Engineering is | `/what-is-search-intelligence-engineering` | Link. No page restates the definition sentence. |
| What Selection Intelligence is | `/what-is-selection-intelligence` | `/solutions/selection-intelligence` drops its competing definition sentence and opens on what a client receives. |
| What AI-mediated search is | `/what-is-ai-mediated-search` | Six pages currently use the term without defining it. Each links on first use. |
| What generative engine optimization is | `/what-is-generative-engine-optimization` | `/what-is-ai-mediated-search` cuts its restatement to a one-line pointer. |
| What answer engine optimization is | `/what-is-generative-engine-optimization` | Same. The AEO definition is published twice today with no canonical. |
| What AI search visibility is | `/what-is-ai-mediated-search`, new section | The phrase appears on eight pages and is defined on none. Define it once, there. |
| What share of voice in AI search is, and why Hendricks does not report it | `/why-ai-answers-change` (new) | Nowhere else. Zero occurrences today. |
| What LLM brand monitoring is | `/why-ai-answers-change` (new) | Nowhere else. Zero occurrences today. |
| What an AI search visibility audit is | `/ai-search-visibility-audit` (new) | `/diagnostic` carries one bridging line and links. |
| The four-part model: visibility, understanding, consideration, recommendation | `/what-is-selection-intelligence` | See 3.3. Five pages currently render it. |
| Which systems Hendricks observes | `/what-is-ai-mediated-search`, the surfaces table | Every other page renders a shared constant, not a paraphrase. See 3.5. |
| That Gemini, AI Mode, and Copilot are not measured | `/what-is-ai-mediated-search`, same table | Same shared constant. |
| The four context panels | `/methodology` | `/solutions/selection-intelligence` names them and links. `/what-is-selection-intelligence` keeps its short test list. See 3.6. |
| Metric definitions | `/what-is-selection-intelligence` | `/solutions/selection-intelligence` imports the same constant. See 3.7. |
| Evidence grades A to D | `/methodology` | `/solutions/search-impact-measurement` states that every conclusion carries a grade, names Grade A in one clause, and links. See 3.8. |
| Selection Intelligence versus AI rank tracking | `/what-is-selection-intelligence` | The `/solutions/selection-intelligence` FAQ answer reduces to one line plus a link. See 3.9. |
| The six-stage Demand-to-Selection system | `/how-it-works` | The homepage methodology section keeps its summary and links. No third rendering. |
| Rank well and still lose the shortlist | `/what-is-ai-mediated-search` | `/ai-selection-problem` cedes the claim and links, because it names no surface and the other page does. |
| Whether structured data helps AI citation | `/what-is-generative-engine-optimization` | `/solutions/search-presence-engineering` adds the reconciling sentence in 3.11 and links. |
| Whether llms.txt does anything | `/what-is-generative-engine-optimization` | Nowhere else. Do not build a page for it. |
| That no firm controls whether an AI system cites a brand | `/solutions/search-presence-engineering` | `/diagnostic` keeps the line in its not-designed-for list, which is a different statement in a different register. |
| What GA4 can and cannot identify | `/solutions/search-impact-measurement` | Nowhere else. Do not write a configuration tutorial. See X5. |
| How many intent contexts a baseline covers | `/solutions/selection-intelligence` | `/diagnostic` keeps the figure in its scope list. Both are correct and in different registers. No change. |
| How a prompt set is built | `/solutions/search-demand-intelligence` | `/solutions/selection-intelligence` keeps its counting answer, which is a different question. |
| What determines the cost of this class of work | `/diagnostic`, the eight scope factors | `/ai-search-visibility-audit` states that cost is set by scope rather than hours and links. It does not reproduce the eight factors. |
| What the work is not designed to deliver | `/diagnostic`, the not-designed-for list | `/ai-search-visibility-audit` writes its own limits list for the generic category and links to the Hendricks one. |
| White-label delivery under an agency brand | `/for-agencies` | Nowhere else. |
| What an agency tells a client who asks why the brand is not in ChatGPT | `/for-agencies` | Nowhere else. The diagnosis of why a brand is absent stays with `/what-is-ai-mediated-search` and `/what-is-selection-intelligence`. `/for-agencies` answers what the principal says and in what order, and links. |
| Why a brand is not showing up in ChatGPT, and whether the answer cited anyone at all | `/what-is-ai-mediated-search` | Nowhere else. `/for-agencies` keeps the client-conversation answer and links here for the diagnosis, which it already does. The measured figures stay on `/research/hendricks-selection-baseline` and are quoted from it, never recomputed, extended, or read as a trend. When `/why-ai-answers-change` ships it owns the variance mechanism and takes an inbound link from this section, which shortens rather than grows. |
| Why an AI system recommends a competitor instead of the brand | `/ai-selection-problem` | Nowhere else. This is displacement, not absence: `/what-is-ai-mediated-search` owns whether the brand was there and separates the four causes in order, and this page owns what it means that a competitor was. It re-enumerates none of those causes and names that page instead. It quotes only the citation-distribution figures from `/research/hendricks-selection-baseline`, because the per-engine and populated-cell figures from the same run are already published on `/what-is-ai-mediated-search`. |
| What an agency should not promise a client about AI citation | `/for-agencies` | The underlying no-control claim stays with `/solutions/search-presence-engineering`. `/for-agencies` references it in one line and links, and turns the Partner Commitments list into the argument behind it. |
| Why the same question produces different answers | `/why-ai-answers-change` (new) | `/what-is-ai-mediated-search` keeps its two-clause statement of variance and links. `/solutions/selection-intelligence` keeps its answer about what Hendricks does in a baseline, which is Deliverable register. |
| Tool versus partner, and build versus buy | `/ai-visibility-tool-or-partner` (new) | `/for-agencies` links to it from the question it currently poses and never answers. |
| What to ask a vendor before signing | `/ai-visibility-tool-or-partner` (owner assigned, no rendering) | Nowhere else. The owning page shipped 2026-08-19 with six headings and does not yet carry this answer. See the build record in 5.3. Blocked on D5. |
| How a brand gets misrepresented, and what fixes it | Diagnosis: `/what-is-ai-mediated-search`. Remedy: `/solutions/search-presence-engineering` layer 02 | The two currently sit on separate pages with no link between them. Add the link both ways. See 4.6. |
| Who owns AI answers in a category, and what it would take to displace them | `/research/who-gets-cited-in-ai-answers` (E1, published 2026-08-19) | Nowhere else. `/ai-selection-problem` keeps the citation-distribution figures it already quotes from `/research/hendricks-selection-baseline` for the same run, and links here for the structure of the set rather than restating it. `/what-is-ai-mediated-search` keeps its per-engine and populated-cell figures from the same run. The domain tables are facts about the answers and are never rendered as a vendor ranking on any page. |

### 3.3 The four-part model

The model is visibility, understanding, relevance, consideration, recommendation. It renders today in five places with five different framings.

| Location | Rendering |
|---|---|
| `/` `distinction.stages` | Seven-row table, visibility through impact |
| `/what-is-selection-intelligence` `questions.items` | Ten questions, first five are the model |
| `/solutions/selection-intelligence` `measures.items` | Eight observations, first four are the model |
| `/how-it-works` stages 3 and 4 | Two stages carrying the same four ideas |
| `/what-is-search-intelligence-engineering` `outcomes` | Four outcomes, one of which restates it |

Resolution. `/what-is-selection-intelligence` owns it. It is Term register, the model is the definition of the term, and the page is currently 454 words and can afford the space.

- `/what-is-selection-intelligence` keeps the ladder and adds one sentence naming it as the model the rest of the site refers to.
- `/` keeps its seven-row table. It is the only rendering that extends past recommendation into selection and impact, which is the homepage's job, and it already links to the owning page. No change.
- `/solutions/selection-intelligence` keeps all eight observations. They are what a client receives, which is Deliverable register, and the four that overlap are a subset rather than a paraphrase. Add a link on the section to the owning page. No copy change.
- `/how-it-works` keeps stages 3 and 4. They are process steps with named outputs, not a definition. No change.
- `/what-is-search-intelligence-engineering` outcome 02 currently reads as a compressed restatement of the model. Rewrite it to describe what the outcome is accountable for and link, rather than re-listing the stages.

The pattern to notice: four of the five renderings survive, because they sit in different registers. Only one was a genuine paraphrase. Resolve duplication by register before deleting anything.

### 3.4 Category definitions

Five definitions, five owners, no exceptions. Search Intelligence Engineering, Selection Intelligence, AI-mediated search, generative engine optimization, and answer engine optimization each belong to the page whose H1 asks what they are.

The live defect is AEO. It is defined on `/what-is-generative-engine-optimization` and restated in the vocabulary section of `/what-is-ai-mediated-search`. Cut the second to a pointer.

Three terms are load-bearing and defined nowhere: AI search visibility, share of voice in AI search, and LLM brand monitoring. The strings appear across the corpus at zero or near zero. Each needs a defined term and a paragraph stating why Hendricks reports a different unit. `/what-is-generative-engine-optimization` already demonstrates the move for a competing term, which is: define it fairly, credit what it gets right, then state the disagreement about the unit of measurement. Placement is in 3.2 and the copy is in section 5.

### 3.5 The observed-systems statement

Five pages state which systems Hendricks observes, in five wordings.

```
/what-is-ai-mediated-search        Hendricks observes three systems: ...
/what-is-generative-engine-...     Hendricks observes three systems: ...
/solutions/selection-intelligence  Hendricks observes three systems in a Selection Intelligence baseline: ...
/solutions/search-impact-...       ... across the three systems Hendricks observes: ...
/solutions/search-demand-...       ... the three systems Hendricks observes: ...
```

The counter-argument is half right and worth stating. A scope boundary is a compliance statement and belongs adjacent to every claim it bounds, so repeating it is not the same error as repeating a definition. Five pages should carry it.

What is wrong is that five pages carry five wordings, none is canonical, and a wording that drifts is a compliance failure rather than a style problem. A1 is a closed list and the phrasing has to be exact.

Resolution. Create `src/content/shared/observed-systems.ts` exporting the canonical sentence and the exclusion sentence as constants. All five pages import them. `/what-is-ai-mediated-search` remains the canonical explanation because it is the only rendering with a table and an explicit "Observed by Hendricks" column, which is the most extractable form of the boundary on the site. The other four render the constant and link to the table.

Add a unit test asserting that no string in `src/content/pages/` contains the phrase "three systems" outside the shared constant. The register already records A1 as binding on pages not yet written, and a test is the only thing that makes that true.

### 3.6 The context panels

Four panels, two renderings, four name collisions.

| `/methodology` | `/solutions/selection-intelligence` |
|---|---|
| Neutral baseline | Neutral baseline |
| Customer cohort | Cohort context |
| Decision journey | Journey context |
| Platform and time panel | Time and platform panel |

Two pages naming the same instrument four different ways is worse than either name being wrong. Resolution: `/methodology` owns the panels, because how a number is produced is Method register. `/solutions/selection-intelligence` names the four panels in one line using the canonical names and links. Its FAQ answers about personalization and cohort effects stay, because they answer what happens to a client's result, not how the instrument works.

`/what-is-selection-intelligence` keeps its seven-item test list under "Why context matters". It is a different granularity and it does not use the panel names, so it is not a competing rendering.

One further fix, carried over and still unapplied: `/solutions/selection-intelligence` panel 4 reads "Repeated tests across relevant search and AI experiences, dates, models, and locations." That phrasing predates A1 and names no system. Once the panels move to `/methodology`, the canonical text should name the three observed systems by way of the shared constant.

### 3.7 Metric definitions

Two pages define the same metrics differently.

| Metric | `/what-is-selection-intelligence` | `/solutions/selection-intelligence` |
|---|---|---|
| Observed Consideration Rate | How frequently the brand is presented as a legitimate candidate across defined, commercially weighted contexts. | The commercially weighted percentage of defined test contexts in which the brand is presented as a legitimate option. |
| Observed Recommendation Rate | How frequently the brand is explicitly favored or shortlisted. | The commercially weighted percentage of defined test contexts in which the brand is explicitly favored or recommended. |
| Selection Stability | How consistently the result survives reasonable context changes. | The consistency of consideration or recommendation across reasonable variations in context, wording, platform, location, and time. |
| Evidence Coverage | Present | Absent |
| Commercial Selection Gap | Present, identical wording | Present, identical wording |

`docs/12` §6 forbids publishing a metric without a definition. Publishing two definitions is the same defect wearing a suit. The solutions-page wordings are the better ones, because they state the unit ("percentage of defined test contexts") rather than a frequency adverb.

Resolution. Move the five metric definitions into `src/content/shared/metrics.ts`, using the solutions-page wording for the three that differ and keeping the existing wording for the other two. Both pages import the shared array. `MetricDefinition` and the `MetricDefinitions` component already exist and are already shared, so this is a data move, not a component change. `/what-is-selection-intelligence` is the canonical location because a defined term belongs on the page that defines the term.

### 3.8 Evidence grades

`/methodology` publishes the four-grade table. `/solutions/search-impact-measurement` restates grades A and B in prose, and grade A differs by one word: "first-party CRM or revenue data" against "first-party CRM or revenue evidence".

Resolution. `/methodology` owns the table. `/solutions/search-impact-measurement` keeps the sentence "Every executive conclusion states its evidence grade", keeps one clause naming what Grade A requires, sources that clause from the shared constant, and links. It does not restate B, C, and D.

### 3.9 The rank-tracking contrast

Three renderings across two pages. `/what-is-selection-intelligence` renders it as an attributed pair of questions. `/solutions/selection-intelligence` FAQ renders the same argument in prose. Today's shipping added the third rather than resolving the second.

Resolution. `/what-is-selection-intelligence` owns it, in the existing `versusRankTracking` block. The FAQ answer on `/solutions/selection-intelligence` reduces to one sentence plus a link, and the sentence should be the one that carries the Deliverable-register difference rather than the definitional one.

### 3.10 The GEO and AEO definitions

Three pages carry GEO and AEO material and the arrangement is mostly correct. `/what-is-generative-engine-optimization` defines both and argues where the framing runs out. `/what-is-search-intelligence-engineering` carries a single comparison row, "GEO/AEO | AI mentions and citations", which is a positioning contrast rather than a definition. `/what-is-ai-mediated-search` restates both in its vocabulary section, which is the one thing to cut.

Freeze this cluster after that cut. Section 4 explains why.

### 3.11 Structured data: a substance conflict, not a duplication

This is the only entry in section 3 where two pages disagree rather than repeat.

`/what-is-generative-engine-optimization` cites Google Search Central stating there are no additional requirements to appear in AI Overviews or AI Mode, and no special markup, AI text file, or structured data to add for them. `/solutions/search-presence-engineering` sells "Structured data aligned with visible content" as layer 01 work.

Both are defensible. Neither page reconciles them, and a reader who lands on both gets a mixed signal from the firm whose product is honesty about mechanism. A skeptic will find this, and it is exactly the kind of inconsistency that costs more than the traffic the page earns.

Resolution. Add one sentence to `/solutions/search-presence-engineering` layer 01, stating why structured data is worth doing for reasons other than AI citation lift, and linking to the GEO page for the evidence. Proposed copy:

> Structured data is implemented here for entity clarity and eligibility in traditional search features, not because it lifts AI citation. Controlled testing has not shown a citation effect, and Hendricks does not sell it as one.

That is the whole fix. It costs 38 words and it converts a contradiction into a proof point.

### 3.12 Implementation

Create `src/content/shared/` with three modules.

| Module | Exports | Consumed by |
|---|---|---|
| `observed-systems.ts` | Canonical observed-systems sentence, canonical exclusion sentence, the surfaces table rows | 5 pages |
| `metrics.ts` | The five metric definitions as `readonly MetricDefinition[]` | 2 pages |
| `evidence-grades.ts` | The four grade rows, plus the Grade A clause | 2 pages |

The context panels move into `methodology.ts` and are imported from there rather than into a shared module, because only two pages need them and one of them is the owner.

Add these guards to `tests/unit/content.test.ts`:

1. No content string outside `observed-systems.ts` contains the phrase "three systems".
2. No content string outside `observed-systems.ts` contains "Gemini" adjacent to "Copilot" in a scope statement.
3. Each of the five metric names appears in exactly one content module.
4. The four context panel names appear in exactly one content module.

The guards matter more than the refactor. The duplication did not arrive by accident. It arrived because five pages each needed to state a boundary and nothing stopped them writing it fresh.

---

## 4. Cluster verdicts

Nineteen clusters. Five OWN, five EXTEND, nine CONCEDE.

| # | Cluster | Verdict | Placement |
|---|---|---|---|
| C1 | The selection gap | OWN | `/ai-selection-problem`, deepened |
| C2 | Proving it to finance | EXTEND | `/solutions/search-impact-measurement` |
| C3 | Measurement credibility and why numbers disagree | OWN | `/why-ai-answers-change`, new |
| C4 | Audit and diagnostic scoping | OWN | `/ai-search-visibility-audit`, new |
| C5 | Deciding what to measure | EXTEND | `/solutions/search-demand-intelligence` |
| C6 | Brand misrepresentation | EXTEND | `/solutions/search-presence-engineering` |
| C7 | Category entry vocabulary | OWN, frozen | Two pages already shipped |
| C8 | The skeptic cluster | OWN by rule, not by route | Distributed, see 4.8 |
| C9 | Agency principal | EXTEND | `/for-agencies` |
| C10 | Tool versus partner | OWN | `/ai-visibility-tool-or-partner`, new |
| X1 | Tool comparison listicles | CONCEDE | |
| X2 | Best-agency roundups | CONCEDE | |
| X3 | Published pricing | CONCEDE | |
| X4 | Tactical GEO how-to | CONCEDE | |
| X5 | GA4 configuration tutorials | CONCEDE | |
| X6 | Platform news and algorithm commentary | CONCEDE | |
| X7 | SMB, local, and ecommerce | CONCEDE | |
| X8 | Real estate | CONCEDE, contractual | |
| X9 | Gemini and Copilot how-to | CONCEDE, by A1 | |

### 4.1 C1, the selection gap. OWN.

Reason. The site holds the sharpest articulation of the pairing that names the problem: rank and traffic reporting stays flat while consideration falls, because the two measure different things. That is better than the CMO-facing coverage in circulation, most of which conflates a mention with a recommendation.

Honest qualification. This framing is no longer uncontested. A Big Four consultancy published a consumer-selection report in May 2026 arguing brands now compete to be selected rather than seen, a major search trade publication published the qualification-versus-selection two-threshold model in May 2026, and an agency published small-sample original consideration research with a stated method in July 2026. All three carry more authority than hendricks.ai. Vocabulary is not a moat here and this scope should stop treating it as one. The advantage has to come from method and from one dated observation.

Reversal condition. None. This is the front door to the Diagnostic and every other cluster routes through it.

### 4.2 C2, proving it to finance. EXTEND.

Reason for not building a route. The substance already exists on `/solutions/search-impact-measurement`, which is the second-longest page on the site at 1,738 words and answers the correlation-versus-causation question better than the vendor guides do. What is missing is the buyer's vocabulary, which is a lexical gap, and a number the buyer can cite, which is a proof gap. Neither is solved by a new page. A new route today would be a thin restatement of a strong page, which is the failure mode this document exists to prevent.

What extends. A question-shaped section using the buyer's nouns. Today the corpus contains zero occurrences of ROI and zero of CFO, so a page that answers the question perfectly cannot be retrieved for it.

Condition under which it earns a route. When the first research asset publishes a figure Hendricks owns (section 8, E1 or E2), that figure lives at `/research/<slug>` and the ROI section links to it. If two or more such figures exist, a dedicated page becomes worth building and not before.

### 4.3 C3, measurement credibility. OWN. New route.

Reason. This is the strongest right to win on the site that requires no new data, because the answer is methodological rather than empirical. The site already publishes Selection Stability as a measure across repeated runs, contexts, platforms, locations, and time. No incumbent in the audit or tooling corpus tells a reader how many runs a reading needs before it means anything, and the published third-party variance measurements range from roughly 2 percent to 50 percent because they measure different units on different surfaces and nobody normalises across them. Stating that non-comparability is an unclaimed, honest, mechanism-based observation that requires no original collection.

Constraint. Publishing the third-party figures requires citing third-party research, which the current sources posture (A5) does not permit. See section 9, decision D1. Without that extension, the page argues from mechanism alone, which is weaker but compliant, and the page must say which of the two it is doing.

### 4.4 C4, audit and diagnostic scoping. OWN. New route.

Reason. Highest commercial intent per prompt in the inventory, and the incumbent field is dense but has no rigorous entry. The highest-authority answer in the category is a disclosed sponsored article that publishes 7 of its 15 promised questions and gates the rest. Everything else is a numbered checklist recommending schema, which the controlled evidence does not support.

Hendricks already owns the substance and none of the vocabulary. `/diagnostic` publishes eight scope factors and an eight-item not-designed-for list including "Guaranteed ChatGPT citations" and "Attribution certainty the available data cannot support". That list is the best answer available to "what will an audit not tell me" and almost nobody else will write it, because saying what you will not deliver costs a vendor leads. The page never uses the word audit, which is the buyer's noun.

### 4.5 C5, deciding what to measure. EXTEND.

Reason. The site's position is better than the field's and it is already published: value the customer decision, not the prompt. The Intent Context Library is a better construct than a prompt list. The gap is purely lexical. The strings "prompt set" and "prompt volume" are what buyers type, and the highest-intent string in the whole inventory is a buyer admitting a failed implementation: we track two hundred prompts and none of them matter.

What extends. Add the buyer strings to `/solutions/search-demand-intelligence` and add one question-shaped answer to the failed-implementation case, which the page can answer from material it already publishes.

Note for the implementer. The five FAQ answers that shipped on this page today are well written and move nothing, because none of the five questions resembles anything a buyer in this inventory asks. If a further FAQ block is written anywhere, pick the questions from the prompt inventory rather than from the approved markdown.

### 4.6 C6, brand misrepresentation. EXTEND.

Reason for not owning the cluster. The diagnosis half is genuinely Hendricks work: the Brand Understanding measure and Search Presence Engineering layer 02 are the right instruments, and the question of which sources shape how an AI describes a brand is uncontested and suits the voice. The remediation half is commoditised, every vendor publishes the same fix-your-listings checklist, and its evidence base is thin.

What extends. Three things. First, `/what-is-ai-mediated-search` names the failure ("The brand appears, but is described from outdated, thin, or contradictory evidence") and `/solutions/search-presence-engineering` carries the remedy, and the two do not link. Link them both ways. Second, the remedy page names no AI surface at all while selling AI-visibility remediation, which is a retrieval problem as much as a credibility one. Third, add the honest answer to how long a correction takes, which is slower than the buyer wants and not on a schedule Hendricks controls.

Concede the checklist.

### 4.7 C7, category entry vocabulary. OWN, and freeze.

Reason to freeze. The two pages shipped today did their job, which was to unseal the corpus lexically. Rendered counts moved from 1 to 14 for GEO and 1 to 11 for AEO, and `/what-is-generative-engine-optimization` alone moved eleven prompts, more than any other page on the site.

Reason to stop. The head terms are closed to a domain with no authority. The candidate set is a neutral encyclopedia entry plus four or five tool vendors with large content budgets, and it is not a set hendricks.ai displaces. The value of these pages is as vocabulary bridges and internal-link anchors that raise the retrieval ceiling for the rest of the corpus, and they should be measured that way rather than as ranking plays.

One narrow sub-slot is open and worth a paragraph on the existing page rather than a new route: the number that anchors the entire category, an "up to 40 percent visibility improvement", comes from a 2024 academic paper and was measured on the authors' own benchmark harness rather than on any production system. Vendor pages recycle the figure without that qualification. Correcting a widely repeated number, with the citation, invents nothing and is a genuine contribution. It requires decision D1.

### 4.8 C8, the skeptic cluster. OWN by rule, not by route.

Reason. Every constraint that limits Hendricks is content here. No guarantees. Exactly three named systems in a closed list. Fees withheld with the determinants published. No vendor claims repeated. And the mechanism honesty in 1.2 answers three of the cluster's questions correctly while every vendor page answers them wrong in a self-serving direction.

Why no route. The cluster's answers already have distinct owners in different registers, and collecting them onto one page would be the duplication this document forbids. Guarantees belong to `/solutions/search-presence-engineering`. Schema and llms.txt belong to `/what-is-generative-engine-optimization`. Is GEO a scam belongs to the same page. Vendor evaluation belongs to the new tool-or-partner page. The cluster is owned by keeping the rule, not by building a page about keeping it.

Honest warning, and it should change how this is written. Honesty is not scarce at the top of this category. A major tool vendor published the two most rigorous negative results anyone has produced. Another vendor publishes its measurement blindspots inside its own lead asset. A national business publication published essentially this position on 2026-08-17. If Hendricks positions on being the honest one, a reader can falsify the claim in one search. The differentiator that survives contact with the evidence is narrower: original measurement, published with its method and its sample, by a firm that does not sell the tool whose number it reports. Hendricks holds the last condition and none of the first. That is section 8's job, not section 5's.

Two prompts in this cluster are closed by decision and should stay closed: who does GEO consulting, and AI SEO consultants for enterprise. Answering either requires positioning Hendricks as a GEO or SEO consultancy. Both are worse outcomes than a no.

### 4.9 C9, agency principal. EXTEND.

Reason. Brandon's Merkle credential (Global Paid Search Director, Jan 2022 to Dec 2023, verified F4) is worth more to this audience than to any other, and it is externally checkable, which almost nothing else on the site is. But the cluster is saturated with white-label vendors whose entire content operation exists to capture it, and they publish the margin tables and pricing tiers Hendricks cannot.

What extends. Two slices only. First, how to offer this without overpromising to a client, which is a direct extension of C8 and which no reseller will write because it undercuts their own pitch. Second, what a credible delivery capability actually requires. Both go on `/for-agencies`, which is 367 words and received nothing today.

Concede the reseller-economics half entirely. It needs numbers P1 to P3 withhold.

### 4.10 C10, tool versus partner. OWN. New route.

Reason, and why this is not X1. The buyer here is choosing a category of spend, not a product. Hendricks wins "what a tool does not tell you", "monitoring versus measurement", and "we have the dashboard and no plan" without naming a single vendor. The post-purchase-disappointment prompts in this cluster are the cheapest leads in the category, because the buyer has already been budget-approved once.

It is also a practice-what-you-sell repair. `/solutions/search-presence-engineering` sells comparison and alternative pages as layer 03 work and hendricks.ai has neither.

Discipline required. The moment this page ranks products, it becomes X1 and Hendricks loses. Name categories, never vendors. See 5.3 for the two constraints that keep the vendor-evaluation section honest.

### 4.11 The concessions

Each concession states the cost and the condition that reverses it. A concession with no reversal condition is an excuse.

X1. Tool comparison listicles. Conceded. The results are owned by vendors' own comparison pages, review aggregators, and affiliate content, all refreshed continuously. Winning requires a standing test rig, quarterly re-testing across a churning vendor set, and pricing tables Hendricks will not publish. It also frames Hendricks as a tool evaluator, which is the frame C10 argues against. Reverses if Hendricks runs a dated, method-transparent comparison of several tools against one controlled prompt set on the three observed systems and publishes the disagreement rather than a ranking. That is a research asset, it belongs on `/research`, and it must never be titled like a listicle.

X2. Best-agency roundups. Conceded hard. Citation here comes from appearing in other people's lists, directories, and press. A self-authored roundup that includes yourself is a credibility liability on a site whose product is honest measurement, and the observed template in this category is an agency founder ranking his own agency first with no stated criteria. Nothing on-site reverses this. It reverses through the off-site workstream in 8.7, and the mention-versus-backlink evidence says that is the highest-leverage non-content investment available. Name it as a separate workstream so it is not silently assumed away.

X3. Published pricing. Conceded by decision, not by strategy. P1 to P3 withhold all three fees. Keep the adjacent prompt the site already wins, which is what determines the price. Honest cost: buyers who filter by budget bounce, and third-party sources already publish ranges for this category, so the number exists in the world whether or not Hendricks publishes it. Reverses only on a business decision to publish a floor, a range, or a starting scope. Worth revisiting, because "how much" is a buying signal rather than a tire-kicking one. See decision D6.

X4. Tactical GEO how-to and technical file tactics. Conceded. Commoditised, and the evidence base does not support most of what is published. Writing these pages means either repeating vendor claims or publishing a page whose honest conclusion is that the tactic does little, which belongs in C8. Every tactic page Hendricks publishes on plausible mechanism is an argument against its own C8 position. Reverses on original controlled testing by Hendricks with a stated method and a dated result.

X5. GA4 configuration tutorials. Conceded as a tutorial, retained as a limit. The tutorial needs a referrer hostname list and channel-grouping rules that change frequently, sourced from a property Hendricks has measured. None exists, and a hostname list assembled from memory must not be published. The defensible half already shipped as the answer to whether GA4 can identify all AI traffic. Reverses when Hendricks measures a real property over a real date range and publishes the configuration with a data-through date, at which point it stops being a tutorial and becomes original observation under C2.

One verifiable fact is available now and should be used in section 5: Google Analytics 4 added an AI Assistant default channel group in 2026 that covers several assistant products and does not include Perplexity, which still lands in Referral. Combined with the fact that AI Overviews leaves no referral signature at all, this independently justifies the three-system observation scope. The surfaces Hendricks observes are precisely the three that analytics handles worst. That is a coherent explanation of the boundary rather than an arbitrary limit, and it is worth saying out loud. Publishing it requires D1 if it is cited, or it can be stated as an observable property of the product with no citation.

X6. Platform news and algorithm commentary. Conceded. It requires a publication cadence that does not exist: `/research` and `/corrections` are both `built: false`, R5 is blocked on Sanity credentials and R6 on missing copy. Perishable commentary is also the worst possible use of the first three research slots, which set the hub's topical identity permanently. Reverses only after `/research` ships with a real cadence, and even then the slots should go to measurement rather than news.

X7. SMB, local, and ecommerce. Conceded. Wrong buyer. The Diagnostic's own fit criteria require meaningful existing search investment, authority to implement, and analytics or CRM access. These prompts attract researchers and sub-scale budgets and drag the domain's topical profile toward a market the product cannot serve. Reverses only on a productised low-scope offer, which does not exist and probably should not.

X8. Real estate. Conceded contractually. No vertical content, no vertical examples, no vertical proof assets. Note for any future session: weeks of genuine three-engine citation detection data exist for five clients in `~/claudecode/*-citation-results-*.json`. All five are real estate. The non-compete plus C1 to C3 rule it out even anonymised, because "a real estate team we work with" is still a real-estate proof asset. This is the single most tempting shortcut in the house and it is closed.

X9. Gemini and Microsoft Copilot how-to. Conceded by A1, and this concession costs the most. A1 permits naming them as surfaces and forbids describing them as systems Hendricks measures. Any page targeting these prompts is either thin or drifts into implied coverage, which is the exact failure A1 exists to prevent. Be clear about the cost: this forfeits a non-marginal share of the AI-visibility prompt pool, because Gemini is the default assistant surface on Android and inside Google Workspace, and buyers neither know nor care that Hendricks draws its boundary at three systems. The current handling, a surfaces table that names each product and states whether Hendricks observes it, is the correct and honest maximum. Reverses only if Brandon extends A1, which is not a copy change. It is a commitment to run observation on a fourth system. Do not let any future scope quietly assume that extension.

---

## 5. Placement

Route conventions. Definition and manifesto-class pages sit at the root. Only solutions nest. Every new route requires four artifacts and two inbound links before it is considered built:

1. An entry in `src/config/routes.ts` with `built` and `indexable` set.
2. A content object at `src/content/pages/<slug>.ts`.
3. A paired approved-copy file at `content/pages/NN-<slug>.md`.
4. An `opengraph-image.tsx` in the route directory.
5. At least two inbound internal links from built pages, plus the footer research column.
6. A row in the section 3.2 ownership table.

All three new routes sit in the `(editorial)` route group, alongside the existing definition pages, and follow the `/what-is-ai-mediated-search` implementation as their template: `PageHero`, `DirectAnswer`, question-shaped `Section` headings, `SourcesNote`, `RelatedLinks`, `ClosingCta`, and a `WebPage` JSON-LD node with `mainEntityFragment: 'term'` and a `BreadcrumbList`. No `FAQPage`.

A note on extractability that applies to all three. Only the four definition pages render a `DirectAnswer` block today. No commercial page has one, including `/diagnostic`. A direct answer is the unit a retrieval system lifts, so every new page gets one and section 6 adds one to `/solutions`.

### 5.1 New route: `/ai-search-visibility-audit`

Status: create. Content file `content/pages/24-ai-search-visibility-audit.md`. Route key `aiSearchVisibilityAudit`.

Closes: prompts 19 and 28. Contributes to 39 and 40. Strengthens 24 and 27 once proof exists.

H1: What Is an AI Search Visibility Audit?

Direct answer, to be published as written:

> An AI search visibility audit is a one-time assessment of whether a brand appears in AI-generated search answers, whether it is described accurately, and whether it is treated as a candidate worth recommending, together with the observable conditions that separate it from the brands that are. An audit is only as strong as its sampling. AI systems can return a different answer to the same question on the same day, so a reading taken once is not a finding.

Question-shaped H2s, in order:

1. What does an AI search visibility audit measure?
2. What separates an audit from a screenshot?
3. How should an audit be sampled? (Two paragraphs maximum, then link to `/why-ai-answers-change`. This page states the requirement. It does not explain the mechanism.)
4. What will an audit not tell you? (Write a limits list for the generic category. Do not reproduce the `/diagnostic` not-designed-for list; link to it.)
5. What is the difference between an SEO audit and an AI search visibility audit?
6. What determines the cost of an audit? (State that cost in this class of work is set by scope rather than hours, name the categories of scope driver in one sentence, and link to `/diagnostic` for the eight factors. Publish no amount.)
7. How does the Search Intelligence Diagnostic relate to an audit?

On H2 6, note the worked example. The eight scope factors are approved copy owned by `/diagnostic`. This page references and links rather than restating. That is rule one in operation, and if an implementer is tempted to paste the list here, the answer is no.

Inbound links required: `/diagnostic` (a bridging line in the hero or scope section, using the word audit once), `/solutions/selection-intelligence`, `/what-is-ai-mediated-search`, `/solutions` related array, footer research column.

Outbound: `/diagnostic` primary CTA, `/why-ai-answers-change`, `/methodology`, `/solutions/selection-intelligence`.

Blocked: nothing. Every fact this page needs exists in approved copy today.

### 5.2 New route: `/why-ai-answers-change`

Status: create. Content file `content/pages/25-why-ai-answers-change.md`. Route key `whyAiAnswersChange`.

Closes: prompts 17 and 20. Upgrades 38 to yes. Contributes to 32, 34, and 35.

H1: Why AI Answers Change, and What That Means for Measurement

Direct answer, to be published as written:

> AI systems can return a different answer to the same question asked twice, so a single observation is not a measurement. Any number describing a brand's position in AI answers is a sample, and it is interpretable only when the number of runs, the customer contexts tested, the systems observed, and the dates are stated next to it. A score reported without those four things is not wrong so much as unreadable.

Question-shaped H2s, in order:

1. Why does the same question produce different answers?
2. Why do two AI visibility tools report different numbers for the same brand?
3. How many runs does a reading need before it means anything?
4. What is share of voice in AI search, and why does Hendricks not report it?
5. What is LLM brand monitoring, and how is it different from measurement?
6. What should you ask before trusting an AI visibility number?

Constraints specific to this page, and they are the reason it needs care.

On H2 3, Hendricks has not measured a run-count threshold and may not state one as a finding. The honest answer names what determines the number (how much the outcome moves between runs, how many contexts are in scope, and how large a difference the reader needs to detect), states that Hendricks reports Selection Stability alongside every rate so a reader can see how much the outcome moved, and says plainly that the firm does not publish a threshold it has not measured. Label the reasoning as mechanism. This H2 converts to a measured answer when E2 in section 8 publishes.

On H2 2, the strongest available material is the observation that published volatility measurements disagree with each other because they measure different units on different surfaces over different windows, and nobody normalises across them. Publishing that requires citing them, which requires D1. Without D1, the page argues the mechanism without the figures and says so.

On H2 4, the answer follows the pattern `/what-is-generative-engine-optimization` already demonstrates: define share of voice fairly, credit what it captures, then state why Hendricks reports a commercially weighted rate across defined contexts instead of a share of mentions. Do not sneer at the term. Buyers use it.

Inbound links required: `/solutions/selection-intelligence` (from the personalization and prompt-count FAQ answers), `/methodology`, `/what-is-ai-mediated-search`, `/ai-search-visibility-audit`, `/ai-visibility-tool-or-partner`, footer research column.

Blocked: the third-party variance figures, on decision D1. The page ships without them and is stronger with them.

### 5.3 New route: `/ai-visibility-tool-or-partner`

Status: create. Content file `content/pages/26-ai-visibility-tool-or-partner.md`. Route key `aiVisibilityToolOrPartner`.

Closes: prompts 32, 33, and 37. Upgrades 34 to yes. Contributes to 24, 27, and 30.

The URL deliberately names a decision rather than a comparison. A URL that promises a vendor ranking will be read as one.

H1: Do You Need an AI Visibility Tool or a Partner?

Direct answer, to be published as written:

> A tool reports where a brand appeared. It does not decide which customer decisions were worth appearing in, judge whether an appearance amounted to being considered, or say what to change next. Those three jobs are the work, and they are done by people whether they sit inside the company or outside it. The useful question is not which tool to buy. It is which of the three jobs the organization can staff.

Question-shaped H2s, in order:

1. What does an AI visibility tool actually produce?
2. What does a tool not tell you?
3. What is the difference between monitoring and measurement?
4. Should we build AI visibility monitoring in-house or buy it?
5. Our dashboard shows mentions rising and nothing else moved. What now?
6. What should you ask a vendor before you sign?
7. Where does Hendricks sit?

Two constraints on H2 6, and the page is not publishable without both.

First, the page must name in its own copy that Hendricks sells into this category, and it must publish at least one criterion Hendricks does not currently meet. Criteria reverse-engineered from what Hendricks happens to do are the self-ranked listicle with better manners. The obvious honest candidate is published original data, which Hendricks does not have today and which section 8 exists to fix.

Second, the page must not tell buyers to demand a published price. Hendricks publishes none, and a reader will notice within one click. The formulation that is both useful and true is: demand a fee fixed to a stated scope before work starts, and a written statement of what the engagement will not deliver. Hendricks does both and can be held to both.

Never name a vendor, a product, or a price on this page.

Inbound links required: `/for-agencies` (from the question it currently poses and does not answer), `/solutions`, `/solutions/selection-intelligence`, `/why-ai-answers-change`, footer research column.

Blocked: partially, on decision D5. If Brandon will not publish a criterion Hendricks fails, H2 6 is cut and the page ships with six headings. It is still worth building without it.

#### Build record, 2026-08-19

Shipped in the reduced form: six headings, H2 6 held. D5 is unanswered, not declined. Section 9 records a recommendation, section 9 also states that none of those items is a writer's call, and nothing in the tree records a decision, so the seventh heading was held rather than softened. A vetting list rewritten until it stops needing D5 is the self-ranked listicle with better manners, which is what the two constraints above exist to prevent. Adding H2 6 later is purely additive: no shipped copy has to change to accommodate it.

Sequencing: option B was taken. `/why-ai-answers-change` is unbuilt, `scripts/check-links.ts` fails on a link to an unbuilt route, and this page was not sequenced behind it. The `/why-ai-answers-change` inbound link named above is therefore owed, not dropped. It lands when that route ships. Criterion 3 of H2 6 was the passage that would have enumerated the sampling demand, and because H2 6 is held there is no unowned enumeration on this page to reconcile later.

Inbound links as shipped: `/solutions/selection-intelligence` and `/what-is-selection-intelligence`, plus the footer research column. That satisfies artifact 5 with two built pages. Two of the four named above are owed rather than delivered. `/solutions` has no `related` export and renders no related block, so an inbound link from it belongs to the 5.4 item for that page. `/for-agencies` was under concurrent edit by another writer when this route shipped, and its own file comment records that hero question 5 was gated on this route not existing in `src/config/routes.ts`. That gate is now lifted, and the link is owed from that page's next change.

Artifacts as shipped: route entry `aiVisibilityToolOrPartner`; `src/content/pages/ai-visibility-tool-or-partner.ts`; `content/pages/26-ai-visibility-tool-or-partner.md`; `src/app/(editorial)/ai-visibility-tool-or-partner/page.tsx`; the route's `opengraph-image.tsx`; the two inbound links and the footer column; the 3.2 row annotation above. The page emits `WebPage` with a breadcrumb and a modified date, and deliberately no `DefinedTerm` and no membership in `definedTermSetSchema`, because it defines nothing. An e2e guard asserts the absence.

Sources: none. `docs/18-SOURCE-LEDGER.md` has no section for this route and `docs/19` §7.2 forbids an agent adding one, which is the correct outcome anyway: every claim on the page is either about what a buyer can check or about Hendricks, and no external document supports either.

### 5.4 Existing routes: what each owned answer needs

| Route | Answer it takes on | Direct-answer or section requirement | Blocked on |
|---|---|---|---|
| `/ai-selection-problem` | C1, plus canonical ownership of the problem framing | One dated observation, replacing an assertion with an instance | E1 or E3 |
| `/solutions/search-impact-measurement` | C2 | Question-shaped section using the strings ROI, CFO, and board | A citable figure for the strongest version, see 4.2 |
| `/solutions/search-demand-intelligence` | C5 | The strings prompt set and prompt volume, plus the failed-implementation answer | Nothing |
| `/solutions/search-presence-engineering` | C6 remedy, and the 3.11 reconciliation | Name at least one AI surface; add the structured-data sentence | Nothing |
| `/for-agencies` | C9 | Answer the question the page already asks; add the overpromising answer | Nothing |
| `/what-is-ai-mediated-search` | Definition of AI search visibility | One defined-term paragraph | Nothing |
| `/what-is-generative-engine-optimization` | The 40 percent provenance correction | One paragraph with the citation | D1 |
| `/diagnostic` | The buyer's noun, and the observed systems | One bridging line; the shared observed-systems constant in scope | Nothing |
| `/solutions` | Which solution do I need | A `DirectAnswer` block and a `related` array | Nothing |

---

## 6. The thin-page problem

Word count is not the defect. A page is too thin when a question its readers arrive with has no answer on it. Each decision below names the missing answer or accepts the page as it is.

### 6.1 Deepen

`/diagnostic`, 635 words. The priority thin page on the site, ahead of the category page. It is the sellable entry product and it is the least specific commercial page in the corpus. Three missing answers. It renders no `DirectAnswer` block, so the sentence that describes the product is not in the unit a retrieval system lifts. Its scope section reads "Relevant Google and AI-mediated search environments" and names no system, while the only AI system named anywhere on the page appears in the not-designed-for list. And it never uses the buyer's noun. Fix: promote the existing scope sentence into a `DirectAnswer` block, render the shared observed-systems constant in the scope list, and add one bridging line linking to `/ai-search-visibility-audit`. No new facts required.

`/solutions`, 404 words. The least-connected commercial page on the site: no direct answer, no `related` array, and it reaches neither new definition page. Missing answer: which solution do I need. A hub that lists four things and does not help a reader choose between them has not done its job. Fix: a `DirectAnswer` block answering the sequencing question the page's own system section already implies (demand determines what is worth measuring, selection measures it, presence changes it, impact connects it), plus a `related` array and a `RelatedLinks` block in the page file. Both parts must land together; the content object's header comment already records this.

`/for-agencies`, 367 words. It asks "Should we buy software, build internally, or change our operating model?" as a client question and never answers it. A page that poses a question it does not answer is worse than silence, because it demonstrates the firm knows the question matters. Two missing answers: how an agency offers this without overpromising, and what a credible delivery capability requires. Fix both, and link the posed question to `/ai-visibility-tool-or-partner`.

`/methodology`, 537 words. Missing answer: the page publishes a posture and calls it a protocol. It lists ten outcome states and instructs that classifier rules and human-review thresholds be defined, without saying what any of them are. Two of the three gaps are unblocked: the decision rule that separates Considered from Referenced, and how Selection Stability is calculated. The third, the run count per context, is blocked on decision D2, because the number published has to be the real operating standard and not a figure invented for the page. Publishing the first two converts a claim into something a reader could replicate, and no competitor publishes either.

`/ai-selection-problem`, 460 words. Missing answer: the page asserts the phenomenon and never observes it. It needs one dated instance, not more prose. A generic agency blog asserting the same thing with one screenshot outranks it on corroborability. Blocked on E1 or E3. Two unblocked changes in the meantime: cede "rank well and still lose" to `/what-is-ai-mediated-search`, which names surfaces where this page does not, and take a link back from it.

`/solutions/search-presence-engineering`, 647 words. Missing answers: the 3.11 structured-data reconciliation, and any named AI surface at all on a page that sells AI-visibility remediation. Both are one sentence each.

`/what-is-search-intelligence-engineering`, 537 words. This is the category-defining page and the temptation is to deepen it because of that. Deepen it narrowly and for a specific reason. The page is six lists and no argument: a discipline comparison, four outcomes, twelve layers, six things it is not, and a ten-step path. Two missing answers, and neither is padding. First, why this needs a name at all, which is the question a skeptic asks and the page never answers, and answering it is the difference between a new category and an SEO retainer with extra steps. Second, who inside a company is accountable for it, which is an org-design question nobody in the field has claimed and which suits an architect voice.

Note the honest counterweight for whoever schedules this: external query demand for the exact term is near zero. Nobody types it. Deepening this page is a credibility investment for readers who arrive from elsewhere, not a retrieval play, and it should be sequenced behind pages that are.

### 6.2 Accept as deliberately short

`/what-is-selection-intelligence`, 454 words. Accept, after it takes ownership of the four-part model (3.3), the metric definitions (3.7), and the rank-tracking contrast (3.9). Its length will rise by absorbing answers other pages should not have had. That is the right way to grow a page. Do not add prose to it.

`/how-it-works`, 401 words. Accept. It is a six-stage table with named outputs and a responsibilities section, and a table page is short by construction. Its stages are the most extractable structure on the site after the surfaces table. One change only: it becomes the canonical owner of the six-stage system, and the homepage methodology section links to it rather than competing with it.

`/for-brands`, 454 words. Accept. Its job is routing and it does it. It also carries the coexistence answer to "SEO agency versus specialist", which is adequate for a partially-covered prompt and does not justify a page.

`/contact`, 218 words. Accept. It is a form. Do not pad a form.

`/about`, 563 words. Accept as content. One defect to fix that is not a length problem: the `Person` JSON-LD at `src/app/(marketing)/about/page.tsx` emits Dentsu as a third alma mater, which contradicts the verified F4 record naming Merkle as the single employer of record. Fix it, and make it the first entry on `/corrections`.

### 6.3 Merge

Nothing merges. Every thin page on this site is thin in its own register and no two of them answer the same question. That is the one thing the current architecture gets right, and the duplication in section 3 happens inside pages rather than between them.

---

## 7. Sequence

Each wave unblocks the next. Items marked blocked name the exact decision or fact.

### Wave 0. This week. No new facts required.

| # | Item | Why first |
|---|---|---|
| 0.1 | Restore the DataForSEO account | Every measured asset in section 8 is gated on it. The probe pipeline returned "Payment Required" on 2026-08-15 and "40100 not authorized" on every run since 2026-08-16. This is a billing lapse, not a code failure, and it is also a live client-delivery failure independent of this scope. |
| 0.2 | Fix the indexed 404 and the stale indexed titles | `/insights/what-is-search-intelligence-engineer` returns 404 and is still indexed. It is absent from the 73 retired insight paths in `src/proxy.ts`; add it so it returns 410 with the others. Search also still holds three retired Hendricks positionings and a retired product catalogue. This is the exact defect `/solutions/search-presence-engineering` layer 02 sells against, visible on the firm's own entity. No new content outruns it. |
| 0.3 | The canonical ownership refactor, section 3, as one PR | Cheapest high-value work on the site. Shared constants, the four dedupes, the structured-data reconciliation, and the four new guard tests. |
| 0.4 | `/corrections`, with the `alumniOf` entry as its first row | Two hours. R6 is blocked on roughly 200 words of policy, not on a credential. A corrections page whose first entry is the firm correcting its own structured data is worth more than an empty one. |
| 0.5 | Unblocked thin-page fixes | `/diagnostic` direct answer and scope naming, `/solutions` direct answer and related array, `/for-agencies` answering its own question, `/solutions/search-presence-engineering` surface naming. |
| 0.6 | Vocabulary repairs | AI search visibility defined on `/what-is-ai-mediated-search`; prompt set and prompt volume on `/solutions/search-demand-intelligence`; ROI, CFO, and board on `/solutions/search-impact-measurement`. |

### Wave 1. Next. Unblocked, in this order.

| # | Item | Depends on |
|---|---|---|
| 1.1 | `/ai-search-visibility-audit` | 0.3, so it links to canonical owners rather than copies |
| 1.2 | `/why-ai-answers-change` | 1.1, which links to it |
| 1.3 | `/ai-visibility-tool-or-partner` | 1.2, which it links to |
| 1.4 | `/methodology` protocol disclosure, the two unblocked halves | 0.3 |
| 1.5 | `/for-agencies` overpromising and capability answers | 1.3 |

Order matters. Each page links forward to the next, so building them in reverse creates three rounds of link edits.

### Wave 2. Blocked on a measurement running first.

| # | Item | Blocked on |
|---|---|---|
| 2.1 | `/research` shipped as version-controlled content rather than waiting on Sanity | A decision, not a credential. Sanity blocks R5; the four definition pages prove version-controlled editorial content ships fine. |
| 2.2 | Publish E1 and E2 at `/research/<slug>` | E1 and E2 in section 8, which are blocked on 0.1 |
| 2.3 | `/ai-selection-problem` dated observation | E1 or E3 |
| 2.4 | The C2 finance section upgraded from mechanism to figure | E1 or E2 published |
| 2.5 | `/why-ai-answers-change` H2 3 upgraded to a measured answer | E2 published |
| 2.6 | `/methodology` run-count disclosure | Decision D2 |
| 2.7 | Third-party research citations across C3, C7, and C8 | Decision D1 |

### Wave 3. Later, and contingent.

| # | Item | Contingent on |
|---|---|---|
| 3.1 | Hendricks self-baseline published as a dated research asset | E3, which needs decision D3 |
| 3.2 | `showResults` reconsidered | See 8.6. Unlocking the gate is not the same as shipping `/results`. |
| 3.3 | The AI crawler fetch study | E4, which needs a durable log sink configured in wave 0 to report on a wave 3 window |
| 3.4 | `/what-is-search-intelligence-engineering` deepening | Nothing, but it is correctly last. Near-zero query demand for the term. |

### What ships this week versus what needs a measurement

Ships this week: all of wave 0, and 1.1 if wave 0 lands early. Every item is a refactor, a defect fix, or an answer written from material already published.

Needs a measurement first: 2.3, 2.4, 2.5, 3.1, 3.3. Do not write these pages and leave a number-shaped hole in them. A page that promises data it does not have is worse than the page not existing.

---

## 8. The proof track

The corroboration gap is the binding constraint on the vendor-selection and skeptic clusters, and content alone does not fix it. Nine of the twelve remaining no verdicts and five of the twenty partials trace to a missing fact. This track runs alongside section 7, not after it.

The instrument already exists. A three-engine probe covering exactly the three systems A1 approves lives at `~/claudecode/total-search-dashboard/checker/daily_citations.py`. It parses cited URLs, writes dated JSON, and has a scheduled runner. This is not a thing to build. It is a thing to point at a new subject, and it is currently dark.

### 8.0 E0. Restore the instrument.

Wave 0, item 0.1. Cost is a deposit, not a build. Everything below is gated on it.

### 8.1 E1. Category source and evidence study.

What it measures. For a defined set of buyer-language intent contexts in the category Hendricks sells into, across the three observed systems, record every cited source URL and classify by source type. Record recurrence across contexts and overlap across engines.

What it publishes. Distribution of source types by system. Count of distinct cited domains. Concentration in the top domains. System-to-system source overlap. Date range, sample, collection method, limitations.

Why first. It is the only asset that is simultaneously first-party proof, an evidence base for the firm's own recommendations that is not a vendor claim, and raw material a third party would quote. That last property is what closes an inbound corroboration gap.

Scope discipline. Publish it as an Observation under `docs/12` §4, grade it on the site's own rubric, and state in the direct answer that the study describes what appeared and not what caused it. It publishes source domains, which are facts about the answer, never verdicts about firms. Disclose that the API surface may not reproduce a consumer session, which `/methodology` is already pre-committed to disclosing.

Unblocks: prompts 44, 49, and the evidence half of 50. Feeds 2.3 and 2.4.

Needs from Brandon: the intent context list, and publication approval.

### 8.2 E2. Pre-registered answer-variance experiment.

What it measures. A fixed set of questions in a neutral disclosed market, run many times within one day and again on later dates, across the three systems. Brand-set churn between identical runs, the stabilisation curve, and divergence under trivial rewording.

Why pre-registration is not optional. The finding may be that answers are fairly stable, which weakens the pitch. Publish the design and analysis plan on `/research` with a date, before the runs, and publish the result either way. A stability finding is also commercially useful, because it means fewer runs are needed.

Scope discipline. Do not run it on Hendricks's own category, which looks rigged. Use a neutral market Hendricks can serve, disclosed up front, and not real estate.

Unblocks: 2.5, and it is the empirical foundation for Selection Stability, which the site defines in three places and has never evidenced. Publishing a metric definition with no data behind it is the softest spot in the corpus for a technical buyer.

Needs from Brandon: the market choice, and a signature on the pre-registration.

### 8.3 E3. Selection Intelligence run on Hendricks itself.

What it publishes. Observed consideration rate, observed recommendation rate, Selection Stability, the source patterns associated with the outcomes, and a data-through date. On current evidence the numbers will be at or near zero.

That is the asset. The firm publishes its own failing score, dated, before it asks anyone to buy a score. Nothing else available under current constraints does that.

Scope discipline. Publish Hendricks's own outcomes and the source patterns. Withhold named competitor results, or report them as anonymised labels: an assertion that a named third party was recommended invites a dispute and reads as marketing. Pre-empt the "this firm does not work" reading with the date and the fact of the relaunch, and treat it as the baseline half of a before-and-after. Repeat A1's exclusion in plain words on the page, because a self-baseline says nothing about the surfaces Hendricks does not observe.

Needs from Brandon: the intent context library for the category, and decision D3.

### 8.4 E4. AI crawler fetch study.

Build the pipe in wave 0, publish in wave 3. Two outputs are genuinely novel. A 410 decay curve, measuring how long each AI crawler takes to stop re-fetching a retired URL, which the migration just created a clean natural experiment for across the 73 retired paths in `src/proxy.ts`. And a spoof rate, verifying each claimed agent against the operators' published IP ranges and reporting the unverified residual separately, which almost no published crawler study does.

Honest constraint. The site is statically prerendered and CDN-cached, and log retention is short and plan-dependent, so a durable sink has to be configured before the window it reports on. Prefer a log drain over extending `src/proxy.ts`, whose matcher covers retired paths only and which runs on the Node runtime; widening it would put a function invocation in front of every cached request for the sake of a research asset.

Two disclaimers the page must carry in its direct answer rather than a footnote: a fetch is not a citation, and the sample is one site.

Needs from Brandon: the drain destination, and the L7 vendor and retention confirmation, because sending request data to a third-party destination touches L7 directly on a site that publishes its own privacy notice.

### 8.5 E5. Classifier agreement rate.

A follower, not a leader. Once E1 to E3 produce labeled data, publish the agreement between the automated classifier and a human reviewer on a labeled sample, with the disagreement classes named. The prediction is that Considered versus Referenced is where it breaks, which is worth publishing precisely because it is the boundary the whole category is sloppy about.

Why it matters. `/methodology` today publishes a promise about rigour with no evidence the instrument is reliable. An agreement figure is the single number that turns "we have a method" into "we measured our method", and nobody in the category publishes one.

If the first rate is poor, fix the rubric internally and publish the post-fix number with the date and a note that the rubric was revised. That sequence is honest. Publishing a bad number and shrugging is not, and hiding it is worse.

### 8.6 The `showResults` gate

`CONTENT_VERIFICATION.md` requires two verified case studies, or one verified case study plus one clearly labeled research experiment. Both halves are reachable with zero client involvement. The research half is satisfied by E1 or E2. The case-study half can be Hendricks as its own subject, because C3's six requirements are all self-obtainable.

The honest counterweight, and it is real. A self-case-study is the weakest form of result, because the firm controls the intervention, the measurement, and the reporting. A skeptical CMO should discount it heavily. If it is done: label it as the firm's own brand in the card and in the body rather than slipping it among client work, and carry the grade the firm's own rubric assigns, which on this evidence is C.

Separately, unlocking the gate is not the same as shipping `/results`. `content/pages/18-results.md` carries an empty-state rule and one card is close to empty. Publish E1 to E3 under `/research` and leave `/results` dark until a client result exists.

### 8.7 Off-site corroboration

A separate workstream, named here so it is not silently assumed away. It is the only route that reverses X2, and it cannot be done with content.

The core move is to be the origin of a number. A firm with no case studies cannot pitch results, but it can pitch a dataset, and search trade press covers original studies and names the source. Design each of E1 to E4 around one quotable unit: a single defined figure, on a stable URL, with a date, a sample, and a method, phrased so it survives being quoted in one sentence.

Pitch on Brandon's verified credentials rather than the firm's age. F3, F4, and F5 are approved and externally checkable, and they clear the bar for contributed columns, podcast bookings, and being quoted as a source. Publish the strings exactly as verified; two of these titles have already appeared wrong in earlier Hendricks material.

Contributed articles and podcast appearances are recommended on plausible mechanism, not measured effect: those pages carry an author bio, are crawlable, and co-locate person, firm, and topic. A podcast without a transcript page is worth much less for this purpose.

Four things not to do. Do not attempt Wikipedia and do not self-create a Wikidata item; notability fails and a deletion is a worse outcome than absence. Do not pursue review directories until a client consents, because they are blocked by the same wall as case studies. Do not treat self-published entity anchors such as a company page or a business profile as corroboration; they are disambiguation, and O4 in the register is the cheap on-site half of the same move. And do not use The Search Economy as a distribution channel; constraint 9 and `check:content` both forbid it, and it is the most tempting shortcut available because the cadence already exists.

One warning about the mechanism itself. The mention-versus-backlink finding is correlational and does not establish that manufacturing mentions produces visibility. `/methodology` publishes "correlation does not prove causation" as a standing limitation. Hendricks may pursue mentions as a plausible mechanism and must describe it in those words. A firm selling measurement discipline breaking its own published standard on its own site is the most expensive inconsistency available to it.

### 8.8 How the two tracks interlock

| Content item | Waits on | Ships without it as |
|---|---|---|
| `/why-ai-answers-change` H2 3 | E2 | Mechanism, labeled |
| `/ai-selection-problem` deepening | E1 or E3 | Not shipped; the page keeps its current copy plus the 3.2 cede |
| C2 finance section | E1 or E2 | Vocabulary repair only, no figure |
| `/ai-visibility-tool-or-partner` H2 6 | D5, and E1 for the criterion Hendricks fails | Six headings instead of seven |
| `/research` hub | Three assets, per its own empty-state rule | Not shipped |
| `/results` | A client result | Dark |

---

## 9. Decisions required

Each item names the decision, who it blocks, and a recommendation where this document has one. None of these is a writer's call.

D1. Sources posture. Does A5 extend beyond first-party platform documentation to named, dated third-party research with a disclosed sample and method?

Blocks: `/why-ai-answers-change` H2 2, the C7 provenance correction, the strongest version of the C8 schema and llms.txt answers, and the citable half of C2. This is the single decision blocking the most value in this document.

Recommendation, stated as a recommendation. Extend it narrowly: published studies with a disclosed sample and method, cited with source and date, never vendor marketing claims. Refusing all external evidence on a site that sells measurement rigor is closer to a quirk than a principle, and the narrow version is consistent with everything else the site says about evidence grading.

Attached condition. If the extension passes and the strongest available citations come from a single vendor's research, the fact that Brandon sits on that vendor's customer advisory board must appear on the same page. Both facts together, or neither. Without the disclosure, Hendricks is running the undisclosed-interest play it is criticising, and the whole differentiator collapses.

D2. Run-count standard. What is the actual number of runs per intent context in a Hendricks baseline, and is it publishable?

Blocks: `/methodology` protocol disclosure, and the measured version of `/why-ai-answers-change` H2 3.

Note. The number published has to be the real operating standard. Do not invent one for the page.

D3. Publish a self-baseline that will read at or near zero?

Blocks: E3, `/ai-selection-problem` deepening, and the case-study half of the `showResults` gate.

D4. The intent context library for the category. Which customer decisions, in which contexts, define the market Hendricks sells into?

Blocks: E1 and E3. This is the real work in the proof track and it is not delegable.

D5. Will Hendricks publish vendor-evaluation criteria it currently fails?

Blocks: `/ai-visibility-tool-or-partner` H2 6.

Recommendation. Yes, and the criterion is published original data. Publishing a standard you do not yet meet, with a date, is the strongest possible version of this page and it converts section 8 from a plan into a commitment.

D6. Fee posture. P1 to P3 stay withheld?

Recommendation: stay. But the cost is real and should be taken with open eyes. Three prompts are permanently unwinnable, budget-filtering buyers bounce, and the category's price ranges are already public through third parties. Revisit when the pipeline is strong enough that filtering is a benefit.

D7. A1 stays at three systems?

Recommendation: stay. Extending it is not a copy change, it is a commitment to run observation on a fourth system, and the current surfaces table is an honest maximum. The cost is a non-marginal share of the AI-visibility prompt pool, most of it Gemini.

D8. Log drain destination and L7 confirmation.

Blocks: E4.

D9. DataForSEO billing.

Blocks: everything in section 8. Also a live client-delivery failure.

---

## 10. What this scope does not claim

A skeptic should be able to read this document and not find a sales pitch. Five things are true and are stated here so no future reader has to discover them.

The coverage tally is a retrievability measure, not a preference measure. Twenty-four yes verdicts mean a system could find and lift an answer. They do not mean the page would be chosen over the alternative, and for the largest cluster the alternatives have tools, data, and links that hendricks.ai does not.

Honesty is not a moat. Major vendors in this category have published the most rigorous negative results in it. A national business publication published essentially the Hendricks measurement position on 2026-08-17. Positioning on being the honest firm is falsifiable in one search. What is defensible is original measurement, published with its method and its sample, by a firm that does not sell the tool whose number it reports.

The category framing is contested by better-resourced sources. The selection-versus-visibility distinction was published in May 2026 by a Big Four consultancy and by a major search trade publication, and an agency published small-sample original consideration research in July 2026 with its method stated. Hendricks does not own this vocabulary and should stop planning as though it does.

Several recommendations in this document rest on plausible mechanism rather than measured effect, and they are labeled where they appear: the run-count reasoning in 5.2, the off-site mention strategy in 8.7, and the contributed-article recommendation in the same section. Any page built from them must carry the same label. The field does not practice this, which is why it is a differentiator rather than a cost.

The corpus contains zero original data. Everything in section 8 exists to change that. Until it does, this site argues well and evidences nothing, and no amount of section 5 fixes that.

---

## 11. Rules for extending this scope

For whoever picks this up next, human or agent.

1. Before writing any answer, find it in the section 3.2 table. If it has an owner, link to the owner. Do not restate it, do not paraphrase it, and do not improve the wording on a second page.
2. If an answer is not in the table and you are adding it, add the row in the same change. A table that falls out of date stops being a rule.
3. Resolve any new duplication by register (3.1) before deleting anything. Most duplications are legitimate once each rendering is in its own register.
4. A new route requires all six artifacts in section 5. A route with fewer is not built.
5. Never name a fourth AI system as one Hendricks observes. A1 is a ceiling. Naming a product as part of the environment is permitted; claiming coverage is not.
6. Never add `FAQPage` JSON-LD. Use `faq-section.tsx`, which emits none.
7. Never publish an amount while P1 to P3 stand.
8. Where a recommendation rests on plausible mechanism rather than measured effect, say so on the page in those words.
9. Never write a page that poses a question and does not answer it. `/for-agencies` is the current example of why.
10. When a page needs a fact Hendricks does not have, name the fact and mark the item blocked. Do not write around it, and do not borrow a vendor's number to fill it.