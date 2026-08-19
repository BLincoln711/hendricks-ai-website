# 19 - Visibility Program

## 1. What this document decides

This document directs the five agents in `.claude/agents/` at one measured problem. On 2026-08-18 a live probe of 15 buyer queries across ChatGPT, Perplexity, and Google AI Overviews returned 45 cells, and hendricks.ai was cited in 1 of them. Hendricks sells the measurement of exactly that, which means the firm currently fails its own product on its own brand. This document sets the target, the loop that pursues it, the order the queries are contested in, the two tracks that run alongside the content work, the cadence, and the conditions under which the program is stopped rather than continued.

It is subordinate to `docs/17-CONTENT-SCOPE.md`. Where `docs/17` assigns an owning URL, that assignment stands and this document does not reassign it. Where this document reopens a `docs/17` concession it quotes the concession, states what was assumed, states what was measured, and says which half of the concession survives. On anything else, `docs/17` wins.

Three rules run through everything below.

Rule one. Every number produced by this program carries its denominator, its run date, and its run-health line, in the same sentence. "Two percent visibility" is not a finding. "1 of 45 cells, 21 of them populated, on 2026-08-18, run health green" is. The reason is not style. On 2026-08-15 the probe credentials stopped authenticating, the scheduled job kept running, kept writing complete-looking files, and kept exiting 0 while every cell held an auth error. A failed run and a run with no citations produce identical-looking files and mean opposite things. The denominator and the health line are what separate them.

Rule two. The program is judged on measurement, not on output. Pages shipped is not a result. Briefs written is not a result. The only reportable outcomes are the cited-cell count against its denominator, the resolution status of every URL an engine holds for hendricks.ai, and the shape of the competitor distribution. A cycle that ships four pages and moves nothing is a cycle that moved nothing, and section 8 exists so that saying it is possible.

Rule three. Where a recommendation here rests on plausible mechanism rather than measured effect, it says so in those words, and any page built from it says so too. The best available peer-reviewed work says most of what this category sells does not work. C-SEO Bench found the methods ineffective or harmful with gains zero-sum as adoption rises. SAGEO Arena measured body-text optimization reducing citation. The founding GEO paper's own tables contradict each other on its keyword-stuffing control. Structured data shows no measured citation lift in controlled testing. llms.txt is not consumed by major engines. A program that pursues visibility while pretending the mechanism is understood is running the play it criticises.

### 1.1 The baseline this program starts from

Run of 2026-08-18. Fifteen queries, three systems, 45 cells. Dry-run estimate about $1.17, actual spend $0.47. Run health green.

| Measure | Value |
|---|---:|
| Cells run | 45 |
| Cells that failed (all Google AI Overviews, task 40101) | 6 |
| Cells where the engine cited at least one source | 21 |
| Cells where the engine cited nothing at all | 18 |
| Cells citing hendricks.ai | 1 |
| Distinct domains cited across the run | 254 |
| Total domain slots filled | 324 |
| Domains cited exactly once | 221, or 87 percent |

Per system, because the three do not average into anything meaningful.

| System | Cells | Populated | Cited nothing | Failed | Owned citations |
|---|---:|---:|---:|---:|---:|
| Perplexity | 15 | 15 | 0 | 0 | 1 |
| ChatGPT | 15 | 4 | 11 | 0 | 0 |
| Google AI Overviews | 15 | 2 | 7 | 6 | 0 |

Six facts from that run are load-bearing for everything below.

First, the operative denominator is 21, not 45. A cell where the engine cited nothing cannot cite Hendricks. Eighteen cells cited nothing, and folding them into an absence count overstates the competitive problem and hides that most of this map is unclaimed rather than lost.

Second, Perplexity is the observable surface. It populated 15 of 15 cells. ChatGPT populated 4 of 15, and all four are queries shaped as who or how do I find out: "How do I find out if ChatGPT recommends my company", "Who can audit our brand visibility in AI assistants", "Best AI search visibility agencies", "Agencies that measure ChatGPT brand mentions". ChatGPT answered every definitional and diagnostic query from memory with no sources at all. Google AI Overviews returned an overview on only 2 of its 9 successful probes, both definitional.

Third, the one citation points at a tombstone. The hit was Perplexity on "Consultant to connect AI search visibility to pipeline", citing `https://www.hendricks.ai/insights/ai-search-visibility-revenue-impact/`. Verified live on 2026-08-18: it resolves to `https://hendricks.ai/insights/ai-search-visibility-revenue-impact` and returns HTTP 410 Gone. It is caught by the `/insights/` prefix rule in `src/proxy.ts`, which retires the section as a section, with exactly one on-thesis exception redirected in `next.config.ts`. The single asset an engine currently holds for Hendricks is a pointer to a deliberately removed page. That is decision D10 in section 7.2 and it outranks every content item in this document.

Fourth, the category is fragmented past the point where authority is the gate. Two hundred and fifty four distinct domains filled 324 slots, and 87 percent of those domains were cited exactly once. The most-cited domain in the whole run appears in 11 of 45 cells. Nobody owns this.

Fifth, community and professional-network content outranks every vendor and every publisher. reddit.com 11 and linkedin.com 11, ahead of semrush.com at 6, then ahrefs.com, forbes.com, medium.com, and searchengineland.com at 4 each. Nothing published on hendricks.ai produces an entry on either of the top two domains. Section 5 exists for that reason.

Sixth, the answers are unreliable. One domain cited by ChatGPT as a vendor in this category, viaudit.com, has no DNS record. Verified with `dig` and `curl`. The engine recommended a company that does not resolve. That is a finding about answer reliability, it lands directly on the Hendricks thesis, and it is publishable.

### 1.2 The team this document directs

Five agents, in `/Users/brandonlhendricks/dev/hendricks-ai/.claude/agents/`. Each owns one step and no step has two owners. `visibility-prober` appears twice in the loop, at step 1 and at step 6, because a re-measure is the same act as a measure and splitting it across two agents would split the ledger.

| Agent | Step | Owns | Explicitly does not |
|---|---|---|---|
| `visibility-prober` | Measure | Running the probe, the run-health line, the three-bucket answer state, the competitor frequency map, URL resolution checks, the run ledger | Decide placement, write copy |
| `citation-reverse-engineer` | Analyse | Fetching the pages that won, the property extraction, the discriminant check against uncited controls, the five-way replicability verdict | Run the probe, edit the repo |
| `answer-architect` | Brief | The placement decision, the direct answer written verbatim, the heading structure, the blocking-fact check, the sources permitted | Author pages, register routes |
| `aeo-writer` | Produce | The content object, the markdown twin, the passage-level retrieval contract, running the build gate | Decide what to write, discover a source |
| `evidence-checker` | Gate | Fetching every cited URL itself, verbatim quotation checks, number tracing, the capability-claim sweep, the seven gates, the SHIP verdict | Fix its own findings |

Two of these boundaries matter enough to restate. The prober does not decide placement, because `docs/17` section 3 gives every answer exactly one owning URL and a measurer choosing pages is how a corpus ends up with the same model rendered eight times. The evidence checker has no Write and no Edit tool, because a gate that can quietly repair what it finds stops being a gate.

### 1.3 Constraints this program operates inside

The standing constraints are in `docs/17` section 1.1 and are not reopened here: three observed systems and no fourth, GEO and AEO as entry vocabulary only, fees withheld, no `FAQPage` JSON-LD, no guarantees, the BLOK real-estate exclusion, The Search Economy as a separate publication, and no em-dash in visitor-facing copy. Every agent restates them internally and the evidence checker enforces them.

Three constraints are specific to this program and are stated here for the first time.

No target in this document may be published as an outcome. A target is a steering instrument. Converting one into site copy would be publishing a result without a period, which `docs/12` section 6 forbids, and it would be the exact failure mode the firm sells against.

No agent publishes under a human name and no agent creates an account anywhere. The off-site track in section 5 is executed by Brandon Lincoln Hendricks personally. Agents identify the surfaces, draft under direction, and measure. That boundary is not a courtesy, it is what keeps section 5.3 enforceable.

No cited figure reaches a page without a run ledger entry behind it. `KEEP_FILES_PER_CLIENT` is 14, so the raw JSON for any given run is deleted after fourteen more runs. The ledger at `docs/measurement/visibility-runs.md` is the durable record and the evidence checker traces every published number back to it.

---

## 2. The goal

### 2.1 What is counted

One unit: a cell in which an engine cited a URL whose host is `hendricks.ai`. The field is `cited_urls`, which is host-matched and owned-only. The field `detected` is a substring test over answer text and is not the count; where the two disagree, `cited_urls` wins and the disagreement is reported.

Four things are counted alongside it every run, because the citation count alone is uninterpretable.

The populated-cell denominator. Cells where the engine cited anything at all. On the baseline this was 21 of 45. It varies between runs and the target is reported against both it and the full cell count.

The resolution status of every owned cited URL. A citation to a 410 is worth less than no citation, because it converts an engine's recommendation into a bad experience for the one buyer who followed it. Any owned citation returning anything other than 200 is escalated to the top of the run report.

The head of the competitor distribution. Top ten domains with counts, plus the distinct-domain count. This is the falsification instrument in section 8.2, not a vanity metric.

The dead-domain list. Domains that appear in an answer and do not resolve. This is proof-track raw material, not competitive intelligence.

### 2.2 The targets

Baseline, 2026-08-18: 1 cell of 45, 1 of 21 populated, and the cited URL returns 410.

| Horizon | Date | Citation target | Structural conditions that must also hold |
|---|---|---|---|
| 30 days | 2026-09-17 | 2 cells with an owned citation | Every owned cited URL returns 200. Three green runs of the identical query set in the ledger, which is the minimum for a first Selection Stability reading. `/corrections` shipped. |
| 60 days | 2026-10-17 | 4 cells, across at least 2 distinct queries | At least one citation outside Perplexity. `/research` live with the self-baseline published and dated. One contributed byline live under Brandon Lincoln Hendricks's name. |
| 90 days | 2026-11-16 | 6 cells, across at least 3 distinct queries, on at least 2 of the 3 systems | hendricks.ai cited on the same query in two consecutive runs, which is the first evidence of a position rather than a sample. Query set unchanged since 2026-08-18. |

Read the 90-day number against the distribution it sits in. Six cells of 45 would place hendricks.ai level with semrush.com in the 2026-08-18 citation set and above 87 percent of the domains cited, which appeared exactly once each. That is a demanding target and it is stated as one deliberately.

Read the 60-day condition the same way. "At least one citation outside Perplexity" is the hardest line in the table, because ChatGPT cited sources in only 4 of 15 cells and all four were vendor-selection queries. The only route to a ChatGPT citation on this set is to be present in the vendor-selection answer, which is section 4's priority and section 5's work. The targets are wired to the plan on purpose, so that missing one identifies which part of the plan failed.

### 2.3 Why these are targets and not forecasts

There is no established relationship between effort and citation in this category, and the strongest available evidence says the relationship is weaker than the field claims. C-SEO Bench found gains zero-sum as adoption rises, which means a tactic that works today works less as more firms adopt it. SAGEO Arena measured one common optimization reducing citation. No controlled test associates any specific on-page change with a citation on these three systems, and no variance measurement exists yet for this query set, which is `docs/17` section 8.2's job and has not been done.

So the numbers above are not predictions. They are the thresholds at which the program is reviewed. Hitting them does not prove the method worked, because nothing here isolates cause. Missing them by a wide margin is evidence the approach is not working, and section 8 says what to do about that.

One mechanical caveat that voids the table. If the query set changes, every target above is void and must be restated against the new denominator. Adding a query costs roughly $0.078 per full three-system run, permanently, and removing one breaks comparability with every prior run. Section 4.4 governs.

### 2.4 Commitments, which are not targets

These are inside Hendricks's control and are therefore obligations rather than aspirations. Missing one is a process failure, not a measurement result.

- Every run recorded in the ledger with its health line, within the cycle it was run.
- Every owned cited URL resolving to a live, relevant page.
- Every published figure traceable to a dated run file.
- Every page the program ships carrying a `DirectAnswer` block, because that is the unit a retrieval system lifts and only the four definition pages render one today.
- Every recommendation resting on plausible mechanism labeled as such on the page, not in a comment and not in a report.

---

## 3. The loop

Six steps with five agents, because the prober owns both ends. The step names are Measure, Analyse, Brief, Produce, Gate, and Re-measure, and those are the names used in section 1.2, in this section, and inside each agent definition. The loop is the deliverable, not any single page it produces.

### 3.1 Steps and owners

| # | Step | Agent | Input | Output |
|---|---|---|---|---|
| 1 | Measure | `visibility-prober` | Query set, prior run | Probe report plus a dated ledger entry |
| 2 | Analyse | `citation-reverse-engineer` | One query plus the domains cited for it | Difference table plus a five-way replicability verdict |
| 3 | Brief | `answer-architect` | A REPLICABLE finding | Answer placement brief, or a REFUSED or BLOCKED verdict |
| 4 | Produce | `aeo-writer` | An approved brief | Content object, markdown twin, gate results |
| 5 | Gate | `evidence-checker` | The change set | SHIP, SHIP-WITH-FIXES, or BLOCK |
| 6 | Re-measure | `visibility-prober` | The same query set, unchanged | Delta against the prior run |

### 3.2 Handoffs

A handoff is a named artifact, not a conversation. If the artifact does not exist, the next step does not start.

Measure to analyse. The prober hands over the per-query loser list: every cell where the engine cited sources and hendricks.ai was not among them, ranked by the cross-cell support of the domains that won it. A domain cited in six cells is a stronger signal than one cited once, and 87 percent of the domains in the baseline were cited once, so the ranking does most of the triage. Cells that cited nothing are handed over separately and are not losses. Failed cells are handed over separately again and are not anything yet.

Analyse to brief. The reverse engineer classifies every difference as REPLICABLE NOW, REPLICABLE WITH A MEASUREMENT, OFF-SITE, NOT REPLICABLE, or SHOULD NOT REPLICATE. Only the first two reach the architect. OFF-SITE items route to section 5 and never become content briefs. REPLICABLE WITH A MEASUREMENT items route to section 6 and name the missing fact. The last two categories terminate, and they terminate in writing, in the ledger, so that the same competitor page is not re-analysed next quarter.

Brief to produce. The architect hands over an answer placement brief carrying the verdict, the target file, the direct answer written verbatim, the heading structure, the must-not-claim list with register IDs, the mirror pair, and the SOURCES PERMITTED field. That field is never implicit. The writer may not introduce a citation the brief did not authorise, and until `docs/18-SOURCE-LEDGER.md` exists, `CONTENT_VERIFICATION.md` A5 governs, which means first-party platform documentation only. A brief with verdict REFUSED or BLOCKED does not go to the writer at all.

Produce to gate. The writer hands over the changed files plus its own gate results. Status BLOCKED does not reach the gate. Status PARTIAL may, with the unwritten items named.

Gate to re-measure. SHIP or SHIP-WITH-FIXES with the fixes applied. BLOCK returns to whichever step owns the defect, and the cycle does not advance. A BLOCK on a citation goes back to analysis. A BLOCK on a claim goes back to the brief. A BLOCK on punctuation or structure goes back to the writer.

### 3.3 What makes a cycle complete

All seven, or the cycle is open.

1. A run with a green health line is recorded in `docs/measurement/visibility-runs.md`, with the honest Google AI Overviews denominator computed by hand rather than taken from the script's `measured` field, which is unconditionally true on that engine.
2. Every populated cell that excluded hendricks.ai has either a reverse-engineering analysis or a recorded reason for skipping it.
3. Every REPLICABLE NOW difference has a placement decision, including the decisions that were REFUSED.
4. Every non-refused brief has either shipped copy or a named blocking fact recorded against a `D` or `E` identifier.
5. Every shipped change carries an evidence-checker verdict of SHIP or SHIP-WITH-FIXES with fixes applied, and all seven gates pass: `pnpm lint`, `pnpm typecheck`, `pnpm check:content`, `pnpm check:links`, `pnpm test`, `pnpm build`, `pnpm test:e2e`.
6. A re-measure is scheduled with a date, and the query set version is recorded next to it.
7. The ledger entry states what changed since the previous cycle and states plainly that the run design does not isolate cause.

Point seven is not a formality. Content changes, off-site placements, and research publication will routinely land in the same window, and when the number moves there will be no way to say which one moved it. Recording that at the time is what prevents a later session from reading the ledger as a causal record.

### 3.4 Cost per cycle

The script's own per-query estimates: ChatGPT $0.070, Perplexity $0.006, Google AI Overviews $0.002. On the 15-query set that is $1.05, $0.09, and $0.03, for a full three-system estimate of about $1.17. Actual billed spend on 2026-08-18 was $0.47, so treat the dry-run figure as a ceiling and report both.

| Item | Cost | Cadence |
|---|---:|---|
| Perplexity-only run, 15 queries | $0.09 | Weekly |
| Full three-system run, 15 queries | $1.17 estimated, $0.47 actual | Monthly |
| Re-run of the 6 failed AI Overviews cells | about $0.01 | As needed |
| Analysis, briefing, writing, verification | $0 in API spend | Per cycle |

That puts the standing measurement program under $25 a year at this cadence. Cost is therefore not a reason to skip a run, and "we did not measure" is never an acceptable state.

Two notes on the split. ChatGPT is 90 percent of the run cost and produced populated answers in 4 of 15 cells, so a weekly full run would be paying nine tenths of the bill for the least observable surface. Perplexity is 8 percent of the cost and 15 of the 21 populated cells, which is why it carries the weekly cadence. The tradeoff is real and should be stated rather than hidden: a Perplexity-only week cannot see movement on the vendor-selection queries where ChatGPT does cite, which is exactly where the commercial value is. The monthly full run is what covers that, and a 60-day target that requires a non-Perplexity citation can only be scored on a full run.

Always dry-run before spending. Always pass `--engines` explicitly, because the default folds carried-forward ChatGPT records from a prior date into today's file, and a carried record is not a measurement of today.

---

## 4. The query portfolio

### 4.1 What the run says about which clusters are contestable

The 15-query set divides into three clusters. They behave completely differently and treating them as one portfolio is the mistake this section exists to prevent.

| Cluster | Queries | Cells | Populated | Cited nothing | Failed | Owned | Distinct domains | Top domain count |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Vendor selection | 5 | 15 | 8 | 3 | 4 | 1 | 113 | 3 |
| Problem aware | 6 | 18 | 7 | 9 | 2 | 0 | 100 | 6 |
| Definitional | 4 | 12 | 6 | 6 | 0 | 0 | 69 | 4 |

Vendor selection is "Best AI search visibility agencies", "Agencies that measure ChatGPT brand mentions", "Who can audit our brand visibility in AI assistants", "Consultant to connect AI search visibility to pipeline", and "AI visibility software vs consulting which do I need". It is the only cluster where ChatGPT cites sources, the only cluster carrying a Hendricks citation, and the most fragmented of the three: 113 distinct domains across 8 populated cells, with no domain appearing more than three times. The cited set includes rankprompt.com, gracker.ai, robotzebra.agency, therankmasters.com, jasonjkhoo.com, hamstergarage.com, llmauthorityindex.com, and reachllm.com. Those are not incumbents. One of them, viaudit.com, does not resolve at all.

Problem aware is the six diagnostic and remedial queries. reddit.com appears 6 times and linkedin.com 4 across the cluster, and 9 of its 18 cells cited nothing. This is community territory. Writing pages at it is largely writing at answers that are either unsourced or sourced from threads.

Definitional is the four "what is" and "how do I get cited" queries. It is the only cluster where a Google AI Overview appeared at all, on "What is generative engine optimization" and "What is AI search visibility". Its cited set skews to publishers, education sites, and tool vendors rather than to community.

### 4.2 Priority order

First, vendor selection. It is the only cluster where three things hold simultaneously: the highest commercial intent in the inventory, the only surface on which ChatGPT cites anything, and a fragmentation level that means citation is not gated by authority. The one Hendricks citation in the entire baseline came from its longest and most specific query. The route that contests it is already approved: `/ai-visibility-tool-or-partner`, verdict OWN in `docs/17` section 4.10, specified in section 5.3, unbuilt. Build it, and build `/ai-search-visibility-audit` ahead of it as section 5.1 sequences.

Second, and immediately, the six failed AI Overviews cells. Four of them are vendor-selection queries. The AI Overviews picture for the commercially valuable half of the set is currently unknown rather than negative, and re-running those cells costs about a cent. No plan should carry an unknown that cheap.

Third, problem aware, but split by where the answer comes from rather than treated as a content cluster. Cells answered from community threads route to section 5. Cells answered from vendor blogs route to content. On the baseline the community half is the larger one, so the honest expectation is that most of this cluster is off-site work.

Fourth, definitional, and it stays frozen. `docs/17` section 4.7 froze it because the head terms are closed to a domain with no authority, and nothing in this measurement contradicts that. One refinement: the definitional cluster is the only place Google AI Overviews fired at all, so the two definition pages should be measured as the AI Overviews surface rather than as ranking plays. That sharpens section 4.7's own framing of those pages as vocabulary bridges. It does not reopen them.

### 4.3 Reopening the X2 concession

`docs/17` section 4.11 concedes best-agency roundups, and concedes them hard. The stated reasoning: "Citation here comes from appearing in other people's lists, directories, and press... Nothing on-site reverses this. It reverses through the off-site workstream in 8.7."

That concession was written on 2026-08-17 from a corpus audit and from a survey of what the field publishes. The probe on 2026-08-18 measured something different: what the engines actually cite. Those are not the same thing, and here they diverge.

What was assumed. That vendor-selection answers are assembled from established roundup publishers, directories, and review aggregators whose position hendricks.ai cannot displace.

What was measured. Across the five vendor-selection queries, 113 distinct domains were cited and the most frequent appeared 3 times. The cited set is dominated by small, new, largely unknown sites. The answer to "Best AI search visibility agencies" was assembled from ten domains, most of which have no meaningful authority profile, and one recommended vendor in the cluster has no DNS record.

The concession therefore splits.

The half that stands, unchanged. Hendricks does not publish a self-authored roundup that includes itself. `docs/17` is right that a self-ranking list on a site whose product is honest measurement is a credibility liability, and no measurement changes that. X2 stays closed as a format. No page on this site ranks vendors, names competitors, or publishes a "best of" list.

The half that changed. The premise that citation in this cluster is gated by authority Hendricks cannot acquire is contradicted by the measurement. It is not gated by authority. It is gated by being present, in a form an engine can lift, in the places these answers are assembled from. That means the vendor-selection cluster moves from unwinnable to first priority, contested through two routes that are already approved: the C10 page in `docs/17` section 4.10, which answers the category question without naming a vendor, and the off-site track in section 5 here, which is where `docs/17` section 4.11 already said the reversal would come from.

The reopening is therefore narrow and it should be read narrowly. X2's format prohibition survives intact. X2's pessimism about the cluster does not.

Two qualifications, both real. This is one run on one day with no variance measurement, and `docs/17` section 8.2 exists precisely because nobody has quantified how much these citation sets churn between identical runs. Four of the fifteen vendor-selection cells failed, so a third of the cluster's Google AI Overviews picture is missing. Re-run those cells and re-check the fragmentation on the second and third runs before anyone treats the 113-domain spread as a stable property of the category rather than a property of one Tuesday.

### 4.4 Rules for changing the query set

The set is owned by `clients.json` on the Ultra under the `hendricks` key. It is not a wish list.

1. A query is admitted only if it is a question a real prospect would type. Not a term Hendricks wants to own, not a phrase lifted from a positioning document. The current set is drawn from the buyer prompt inventory in `docs/17` and weighted toward problem-aware and vendor-selection intent, which is why the single win landed on the most specific vendor-selection query in it.
2. Every addition costs roughly $0.078 per full run, permanently. State the cost when proposing one.
3. Removing a query breaks comparability with every prior run. If the set changes, the next report leads with the new denominator and reports both the old-set and new-set numbers for the overlapping run, and section 2.2's targets are restated.
4. The set does not change during a target window without voiding the target. Between now and 2026-11-16 the presumption is that it does not change at all.
5. Never re-baseline silently. The ledger records the set version on every run.

---

## 5. The off-site track

### 5.1 Why it is a separate track

reddit.com and linkedin.com are the two most-cited domains in the measured set, at 11 of 45 cells each, ahead of every tool vendor and every publisher. Nothing published on hendricks.ai produces a citation on either. That is not a content problem and no amount of content work touches it. It runs in parallel to section 3, on its own cadence, with a different executor.

`docs/17` section 4.11 already named this as the only route that reverses X2 and asked for it to be a separate workstream so it would not be silently assumed away. This section is that workstream.

The mechanism label, stated once and inherited by everything below. Off-site brand mentions correlate with AI visibility roughly three times as strongly as backlinks, and that sentence is narrower than it sounds: measured on Google AI Overviews only, on a sample filtered to established domains, with the source describing the correlations as moderate to very weak. Hendricks may pursue off-site presence as a plausible mechanism and must describe it in exactly those words. The measured fact from the baseline is narrower and firmer: these two domains are where the answers in this category come from. That says the surfaces matter. It does not say that posting on them produces citation, and no page on hendricks.ai may tell a buyer that it does.

### 5.2 What is legitimate

Four things, and all four have the same property: they are true statements made under a real name by a person who stands behind them.

Bylined contributed articles. Written by Brandon Lincoln Hendricks, published under his name, in outlets that credit the author and are crawlable. Pitch on the verified credentials, which are externally checkable and are the only assets on this site a skeptic can confirm independently: Merkle, Global Paid Search Director, Jan 2022 to Dec 2023; SolarWinds, Global Search and Innovation Lead, Apr 2024 to Sep 2025; Ahrefs Customer Advisory Board, current since Mar 2025. Publish those strings exactly as verified, because two of them have already appeared wrong in earlier Hendricks material. This rests on plausible mechanism rather than measured effect: a bylined page carries an author bio, is crawlable, and co-locates person, firm, and topic. No controlled test associates it with citation.

Original research that earns coverage. This is the strongest of the four and the one the firm is uniquely positioned for. Search trade press covers original studies and names the source. Design each asset in section 6 around one quotable unit: a single defined figure, on a stable URL, with a date, a sample, and a method, phrased so it survives being quoted in one sentence. A firm with no case studies cannot pitch results. It can pitch a dataset.

Expert commentary under his own name. On the record, attributed, with the Hendricks affiliation visible. A podcast without a transcript page is worth much less for this purpose, so ask.

Genuine participation in communities. Real account, real name, affiliation visible in the profile, answering questions he can actually answer, including the ones where the honest answer does not favour Hendricks. The category's most-cited surface rewards people who are actually there. It punishes people who show up to sell.

### 5.3 What is out of bounds

Three things, permanently.

Fabricated independent voices. Invented bylines, fake analysts, AI-generated reviews, quotes attributed to people who did not say them.

Undisclosed sponsored content posing as editorial. Paid placement presented as an independent pick or an unpaid recommendation.

Sockpuppet community accounts. Accounts created to recommend Hendricks without disclosing the relationship, on Reddit or anywhere else, including accounts operated by an agent.

The reason to refuse these is commercial before it is anything else, and it should be argued on those terms because that is the argument that holds under pressure. All three are checkable. Reddit moderators read account histories and the platform's own users are unusually good at spotting a plant. Publications disclose paid placement when asked, and the highest-authority answer in the audit cluster today is a disclosed sponsored article, which means disclosure is the norm in this category rather than a differentiator. A fabricated byline is one reverse image search and one LinkedIn check from collapsing.

And the asymmetry is total. Hendricks sells the credibility of its own measurement. A firm caught manufacturing the evidence for its own visibility has no product left, no recovery path, and a permanent search result describing the incident. The entire content strategy in `docs/17` rests on being the firm that publishes its own null results and its own failing score. One sockpuppet account destroys the value of every honest thing on the site, retroactively.

There is a quieter version of the same failure and it is worth naming because it will feel reasonable. Do not treat self-published entity anchors as corroboration. A company page, a business profile, or a directory listing Hendricks controls is disambiguation, not third-party evidence, and counting it as the latter is the first step down this road. Do not attempt Wikipedia and do not self-create a Wikidata item; notability fails and a deletion discussion is a worse public artifact than absence. Do not pursue review directories until a client consents, because they are blocked by the same wall as case studies. And do not use The Search Economy as a distribution channel, which `docs/12` section 8 and `check:content` both forbid and which is the most tempting shortcut available because the cadence already exists.

### 5.4 Who runs it

Brandon Lincoln Hendricks holds every byline, every account, and every on-the-record quote. That is not delegable and no agent may hold one.

The agents contribute three things. The reverse engineer already fetches and reads the specific Reddit threads and LinkedIn posts that won a cell, so it can name the exact surfaces rather than recommending "be on Reddit". The architect can shape a contributed article around an answer the site does not own and therefore does not cannibalise. The prober measures whether anything changed, and reports it as movement rather than as effect.

---

## 6. The proof track

### 6.1 The self-baseline is the first research asset and it already exists

`docs/17` section 8.3 specified E3, a Selection Intelligence run on Hendricks itself, and predicted the numbers would be at or near zero. The 2026-08-18 run is the first data point of that asset. It cost 47 cents and the prediction was correct.

Be precise about what exists and what does not. The run measures citation presence across three systems on a defined query set. It does not yet produce Selection Stability, which is defined as a measure across repeated runs and therefore requires at minimum a second and third run of the identical set. That is why section 2.2 makes three green runs a 30-day structural condition rather than a nice-to-have. It is the difference between publishing a snapshot and publishing a measurement, and the site already defines Selection Stability in three places with nothing behind it, which is the softest spot in the corpus for a technical buyer.

The asset that publishes is therefore the three-run series, not the single run. Target publication is inside the 60-day window.

### 6.2 What `/research` needs

`/research` is registered in `src/config/routes.ts` as `indexable: true, built: false`. Shipping it requires the six artifacts in `docs/17` section 5 and nothing has to wait on Sanity, which `docs/17` wave 2.1 already resolved by shipping the hub as version-controlled content the way the four definition pages did.

1. Flip `research` to `built: true` in `src/config/routes.ts`.
2. Content objects at `src/content/pages/`, plus markdown twins. Numbers 24, 25, and 26 are reserved by `docs/17` sections 5.1 to 5.3, so the hub and the first asset take the next free numbers, verified by `ls` rather than assumed.
3. An `opengraph-image.tsx` per route.
4. Two inbound links from built pages, plus the footer research column. `CONTENT_VERIFICATION.md` R5 records that the footer column currently renders the four definition pages and omits the hub, so shipping means restoring that entry.
5. A row in the `docs/17` section 3.2 ownership table for every answer the asset makes.
6. A `DirectAnswer` block on the asset page. It is the unit a retrieval system lifts and the asset exists to be lifted.

The asset page carries all fifteen elements of the source-ready research format in `docs/06` section 12: direct answer, key findings, definitions, data, methodology, sample and date range, assumptions, limitations, sources, author, published date, updated date, data-through date, corrections link, related solution. No `FAQPage` JSON-LD, under any framing.

Element fourteen creates a hard dependency worth naming, because it will otherwise be discovered late. The format requires a corrections link, and `/corrections` is also `built: false`. It cannot be linked from a built page while it is unbuilt, and the link checker fails on links to unbuilt routes. `/corrections` therefore ships before or with `/research`. `docs/17` wave 0 item 0.4 puts it at two hours and blocked on roughly 200 words of policy rather than on any credential, and its first row should be the firm correcting its own structured data.

One decision is required and it is D11 in section 7.2. `docs/17` section 8.8 holds the hub until three assets exist, per its own empty-state rule. The self-baseline is one asset. Recommendation: amend the empty-state rule to permit a hub with one complete, dated, method-stated asset. A hub with one real study is worth more than three studies six months from now, and E1 and E2 are gated on the same instrument that just produced this data, so the other two are weeks behind rather than quarters.

### 6.3 How the results gate is satisfied

`CONTENT_VERIFICATION.md` holds `showResults` at `false` until two verified case studies exist, or one verified case study plus one clearly labeled research experiment.

The self-baseline satisfies the research-experiment half, cleanly, and it satisfies nothing else. It is a research experiment. It is not a case study, and relabeling it as one to clear both halves of a two-part gate is the shortcut this paragraph exists to close. One artifact cannot satisfy both halves.

So the sequence is: publish the self-baseline at `/research/<slug>` as a clearly labeled research experiment; leave `showResults` at `false`; leave `/results` dark until a client result exists. `docs/17` section 8.6 is right that unlocking the gate and shipping `/results` are different acts, and right that a self-case-study is the weakest form of result, because the firm controls the intervention, the measurement, and the reporting. If Hendricks later takes the case-study half from its own brand, it is labeled as the firm's own brand in the card and in the body rather than slipped among client work, and it carries the grade the firm's own rubric assigns, which on this evidence is C.

The labeling that makes it a research experiment rather than marketing is specific, not decorative. Published method, published query set, published sample and denominators, published date, published limitations, published failure count, and the run-health line. An experiment that reports 1 of 45 with 6 cells failed and says so is a research asset. The same number without those attachments is a claim.

### 6.4 What the self-baseline may not publish

- Named competitors as verdicts about firms. Publish source domains, which are facts about the answer, never rankings or judgments of companies. `docs/17` section 8.1 already sets this discipline and it applies here.
- Anything derived from the five real-estate client citation files on the Ultra, including as an anonymised methodology illustration. `docs/17` section 4.11 X8 closes it and anonymising does not help.
- A percentage without its denominator, or any figure without its run date and health line.
- Any implication that three systems is a complete picture of AI-mediated search. The page repeats the A1 boundary in plain words, because a self-baseline says nothing about the surfaces Hendricks does not observe.
- Any causal statement about why hendricks.ai was or was not cited. Nobody can observe an engine's selection. The page reports what appeared.

On viaudit.com specifically, because it will come up. The publishable form is a fact about the answer: on the date checked, one domain recommended by ChatGPT in this run returned no DNS record, verified with `dig` and `curl`, with the date and the method stated. A domain with no DNS record is not a company, so naming it is a checkable observation rather than a claim about a business, and any reader can reproduce it in one command. That is exactly the kind of finding this program should publish and exactly the kind that must never be softened into a swipe at a competitor.

---

## 7. Cadence and ownership

### 7.1 The calendar

| Cadence | Item | Owner | Cost |
|---|---|---|---|
| Weekly, Monday | Perplexity-only run, ledger entry, delta against prior week | `visibility-prober` | $0.09 |
| Weekly | One reverse-engineering analysis on the highest cross-cell-support loser | `citation-reverse-engineer` | $0 |
| Weekly | Resolution check on every owned cited URL | `visibility-prober` | $0 |
| Monthly, first Monday | Full three-system run, plus a re-run of any failed cells | `visibility-prober` | about $1.20 |
| Monthly | Head-of-distribution check against the 2026-08-18 shape | `visibility-prober` | $0 |
| Monthly | One off-site placement pitched or published | Brandon | time |
| Monthly | Cycle review against section 2.2 and section 8 | Brandon | time |
| Quarterly | Query set review, concession review, falsification review | Brandon with the team | time |
| One-off | D10, the retired URL holding the only citation | Brandon | time |
| One-off | `/corrections`, then `/research`, then the self-baseline publication | `answer-architect` then `aeo-writer` | $0 |
| One-off | `src/content/shared/observed-systems.ts` and the ownership refactor, `docs/17` wave 0 item 0.3 | `aeo-writer` | $0 |
| One-off | `docs/18-SOURCE-LEDGER.md`, which does not exist and which four agents reference | Brandon decides D1 first | time |

Two sequencing notes. `docs/17` wave 0 item 0.3 comes before any new page, because until the shared constants exist a writer told to import one is being told to import a file that is not there, and the alternative is five more hand-written versions of a closed compliance list. And `docs/18` does not exist today, which means every agent's source-ledger step currently degrades to "cite nothing external". That is a governance gap rather than a blocker, and it is downstream of decision D1.

### 7.2 What Brandon decides

`docs/17` section 9 holds D1 through D9 and they are unchanged. Three more are added here, numbered to continue that register rather than to start a second one.

D10. The retired URL that holds the firm's only measured citation. `https://www.hendricks.ai/insights/ai-search-visibility-revenue-impact/` returns 410 Gone, caught by the `/insights/` prefix rule in `src/proxy.ts`. Exactly one insight URL already earns a redirect exception in `next.config.ts` on the grounds that it was the single on-thesis article of the retired set. The question is whether a second exception is warranted for the one URL an engine currently holds.

Recommendation, stated as a recommendation: redirect it, with a 308, to `/solutions/search-impact-measurement`. The query it was cited for is "Consultant to connect AI search visibility to pipeline", and connecting visibility to pipeline is what that page is. A redirect that lands on a relevant page is not the mass redirect `next.config.ts` correctly refuses, and leaving the only citation in the baseline pointing at a tombstone costs more than the exception does. If the answer is no, then the 410 stands and the citation is written off deliberately rather than by omission, which is also a defensible position but should be a decision.

D11. The `/research` empty-state rule. Ship the hub with one complete asset, or hold it for three. Recommendation: ship with one.

D12. Off-site posture. Which publications Brandon will pitch, whether he will hold a standing byline cadence, and which communities he will participate in under his own name. Section 5 cannot start without this and no agent can decide it.

Also his, and not delegable: the intent context library (D4), publication approval for the self-baseline (D3), the sources posture (D1), every byline, every account, and any decision to stop the program under section 8.

Two registers are Brandon's to edit and no agent's, and this is stated because five agents read both and none of them owns either. `CONTENT_VERIFICATION.md` is amended only by Brandon. An agent that measures a fact which unblocks or contradicts a row proposes the exact replacement wording in its report and stops there. `docs/18-SOURCE-LEDGER.md` is authored and maintained by Brandon after D1. An agent may propose an entry, with the URL, the verbatim passage, the fetch date, and any disclosure obligation attached to it. No agent adds a source to the ledger and no agent cites a source that is not already in it. Until the file exists, `CONTENT_VERIFICATION.md` A5 governs and the permitted set is first-party platform documentation only.

### 7.3 What the team executes without asking

Everything else, up to the gate. Running the probe within the stated budget, analysing losses, briefing placements, writing approved briefs, running the seven gates, maintaining the ledger, and reporting numbers that are worse than the last ones. No agent needs permission to report a bad result, and no agent may soften one.

---

## 8. What would falsify this plan

A program that cannot be stopped on evidence is a belief. These are the observations that would mean stop or change, written now so they cannot be renegotiated later.

8.1 Three consecutive full runs with green health, no change in owned citations, a flat populated-cell count, and a flat head of distribution. This says the on-site work is not moving the measure. Action: stop briefing content for citation, move the entire budget to the off-site and proof tracks, and keep measuring. Concretely, if 2026-11-16 arrives with 1 or 0 cells on an unchanged query set across three green runs, the content track for citation stops. That is the stopping rule and it is not advisory.

8.2 The head of the citation distribution consolidates. If the top domain moves from 11 of 45 toward 20 or more on the same query set, and the distinct-domain count falls materially below 254, then fragmentation is closing and the central premise of section 4 is gone. Action: reprice the effort immediately. The plan assumes a category where nobody owns the answers. If somebody starts to, the window described here has closed and persisting is expensive.

8.3 Perplexity stops citing. Perplexity supplied 15 of the 21 populated cells. If its populated rate drops materially, the observable surface collapses and the program is measuring an empty room. Action: the measurement stays honest and the plan does not survive. Re-scope to whatever surface still cites, or state plainly that the category has become unobservable through this instrument.

8.4 Movement appears and cannot be attributed. If citations rise while content changes, off-site placements, and a research publication all land in the same window, the program has no way to say which caused it. This does not falsify the plan, it falsifies any claim made from it. Rule: it may never be published as a causal result. Either the next cycle isolates one variable, or the finding publishes as an observation with the confound named on the page.

8.5 A published Hendricks figure is contradicted by a third party running the same design. Action: publish a correction at `/corrections` with the date, the original figure, the contradicting result, and what changed. That path exists for this, and using it is the whole argument for having it.

8.6 The honesty position stops being scarce. `docs/17` section 4.8 already warns that major vendors in this category have published the most rigorous negative results in it and that a national business publication published essentially the Hendricks measurement position on 2026-08-17. If the field converges on the same disclosure discipline, positioning on honesty is falsifiable in one search. Action: fall back to the narrower claim that survives, which is original measurement, published with its method and its sample, by a firm that does not sell the tool whose number it reports. Section 6 is what makes that fallback available, which is another reason it is not optional.

8.7 The loop stops running. No ledger entry for three consecutive weeks, or briefs stacking unshipped, or a run reported from a health line nobody read. This is the 2026-08-15 failure one level up: the instrument looks alive and is producing nothing. Action: say so, stop reporting from it, and either restart the cadence or close the program. A dead loop reported as a live one is worse than no program, because everything downstream inherits the fiction.

---

## 9. What this program does not claim

Five things, stated here so no future reader has to discover them.

Nothing in this document establishes cause. No action described here has been shown to produce a citation on any of the three observed systems. The run design does not isolate variables and is not intended to. Every movement this program reports is movement.

The targets in section 2.2 are not forecasts. They are review thresholds, and the relationship between effort and citation in this category is not established. The strongest available evidence suggests it is weaker than the field claims and that gains erode as adoption rises.

The baseline is one day. One run per cell, one geography, one query set version, no variance measurement, and 6 of 45 cells failed. `docs/17` section 8.2 exists to quantify the variance and has not run yet. Until it does, every reading in this program is a sample being treated as a position.

Three systems is a slice. Google AI Overviews, ChatGPT, and Perplexity are what Hendricks observes, and the program says nothing about Gemini, Google AI Mode, Microsoft Copilot, or any other surface. That boundary is a commitment about what the firm measures, not a claim about what matters to buyers, and `docs/17` section 4.11 X9 is honest that it costs a non-marginal share of the prompt pool.

The program cannot make the firm cited. It can make the firm measurable, make its answers liftable, put its founder on the surfaces the answers are actually assembled from, and publish the first original data the corpus has ever contained. Those four things are inside Hendricks's control. Citation is not, and any document that implies otherwise is selling the thing this firm exists to refuse to sell.
