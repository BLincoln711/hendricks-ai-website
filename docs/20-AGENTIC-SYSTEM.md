# 20 - Agentic System

## 1. What this document decides

`docs/19-VISIBILITY-PROGRAM.md` sets the goal and the plan. This document describes the machine that pursues it: eight agents, one loop, one memory, one schedule, and the boundary none of them cross.

It exists because the five specialists built on 2026-08-18 worked and still were not a system. They ran the loop twice and produced three published studies and two content waves, and every one of those runs started because a person opened a terminal, chose a query, and remembered what last week looked like. Five things were missing, and they are the agenda of this document.

| Missing | Closed by |
|---|---|
| Nothing decided what to run | `visibility-director`, section 4 |
| Nothing ran unattended | `scripts/visibility-run.sh` and the weekly schedule, section 6 |
| Nothing remembered | `.claude/state/visibility-state.json`, section 5 |
| Nothing watched production | `site-integrity-monitor`, section 2.2 |
| Nothing watched the market | `demand-scout`, section 2.2 |

Three rules run through all of it, and they are inherited from `docs/19` section 1 rather than restated as new.

Every number carries its denominator, its run id, and its run-health line in the same sentence. Judge the program on measurement, not on output. Where a recommendation rests on plausible mechanism rather than measured effect, say so in those words.

A fourth rule is specific to this document. Where a governing document and a measurement disagree, this document reports the measurement and names the document as stale. Five such disagreements were found while building and verifying this system and they are in section 11.

---

## 2. The eight agents

Agent definitions live in `.claude/agents/`, version-controlled with the site. Each owns one step and no step has two owners, because a step with two owners is a step where each waits for the other.

### 2.1 The five that measure, analyse and produce

| Agent | Step | Owns | Does not |
|---|---|---|---|
| `visibility-prober` | Measure | Running the probe, the run-health line, the answer-state buckets, the competitor frequency map, the resolution check on owned cited URLs at run time, the run ledger | Decide placement, write copy |
| `citation-reverse-engineer` | Analyse | Fetching the pages that won, property extraction, the discriminant check against uncited controls, the five-way replicability verdict | Run the probe, edit the repo |
| `answer-architect` | Brief | The placement decision, the direct answer written verbatim, the heading structure, the blocking-fact check, the sources permitted | Author pages, register routes |
| `aeo-writer` | Produce | The content object, the markdown twin, the passage-level retrieval contract, running the build gate | Decide what to write, discover a source |
| `evidence-checker` | Gate | Fetching every cited URL itself, verbatim quotation checks, number tracing, the capability-claim sweep, the seven gates, the SHIP verdict | Fix its own findings |

Two of those boundaries carry more weight than the rest.

The prober does not decide placement. `docs/17` section 3 gives every answer exactly one owning URL, and a measurer that also chooses pages is how a corpus ends up with the same model rendered eight times.

The evidence checker has no Write and no Edit tool. A gate that can quietly repair what it finds has stopped being a gate. It reports defects and the owning step fixes them.

### 2.2 The three that decide and watch

| Agent | Role | Owns | Does not |
|---|---|---|---|
| `visibility-director` | Decide | Reading state, classifying every signal, choosing the mode, dispatching the specialists in order, stating cost before spending, writing the decision back to state | Measure, analyse, brief, write, gate, or dispatch anything that publishes |
| `site-integrity-monitor` | Watch production | Routing disposition, the entity graph, indexation, the published capability boundary, research reproducibility, the seven gates, all verified by fetching production | Read the repo and call it production, and it has no Write or Edit |
| `demand-scout` | Watch the market | Run-pair comparison, the manifest gate before any comparison, separating real movement from the churn baseline, tracking the query set itself, the scoreboard | Propose a content page, edit the query set, run the probe, publish |

The monitor's subject is the running site, not the repo. The repo is only the expectation, and the gap between the two is the entire point of a regression watch. Like the evidence checker it has no write tools, for the same reason.

The scout's most common correct output is that nothing moved. It exists because 247 distinct domains competed in the last archived citation set and nothing in the system noticed when that set shifted. It is also the agent most at risk of manufacturing findings, which is why section 3.3 binds it hardest.

### 2.3 One step, one owner

Eight agents, eight roles, no overlaps. The prober appears twice in the loop, at Measure and at Re-measure, because a re-measure is the same act as a measure and splitting it across two agents would split the ledger.

Nothing in this system is a general assistant. An agent asked to do a step it does not own refuses and names the owner. That refusal is a feature: it is what keeps the ledger interpretable six months from now.

---

## 3. The loop

### 3.1 The chain

Six steps, five specialists, one director above them.

```
                    visibility-director
                 reads state, picks the mode
                            |
        +-------------------+-------------------+
        |                   |                   |
     OBSERVE           INVESTIGATE           ESCALATE
   record and stop          |              ask Brandon
                            v
                  citation-reverse-engineer
                       (Analyse)
                            |
                     REPLICABLE?
                            |
                            v
                       answer-architect
                          (Brief)
                            |
                   brief, or REFUSED/BLOCKED
                            v
                        aeo-writer
                         (Produce)
                            |
                            v
                     evidence-checker
                          (Gate)
                            |
                 SHIP / SHIP-WITH-FIXES / BLOCK
                            |
                            v
                    STOP. A human merges.

  visibility-prober   Measure and Re-measure, at both ends
  demand-scout        reads each new run pair, routes qualified movement
  site-integrity-monitor  standing watch on production, off the loop
```

### 3.2 The handoffs

A handoff is a named artifact, not a conversation. If the artifact does not exist, the next step does not start. `docs/19` section 3.2 defines them in full and they are unchanged. The short form:

| From | To | Artifact |
|---|---|---|
| Measure | Analyse | Per-query loser list, ranked by cross-cell support of the winning domains |
| Analyse | Brief | A verdict of REPLICABLE NOW or REPLICABLE WITH A MEASUREMENT. The other three verdicts do not advance |
| Brief | Produce | A brief carrying the target file, the direct answer verbatim, the heading structure, the must-not-claim list, the mirror pair, and SOURCES PERMITTED |
| Produce | Gate | The changed files plus the writer's own gate results |
| Gate | Human | SHIP, SHIP-WITH-FIXES, or BLOCK. Nothing merges without a person |

Two of the five reverse-engineer verdicts terminate in writing rather than advancing. OFF-SITE routes to `docs/19` section 5 and to Brandon, and never becomes a content brief. NOT REPLICABLE and SHOULD NOT REPLICATE are recorded in state so the same competitor page is not re-analysed next quarter.

### 3.3 The two-speed rule

This is the discipline the data forces, and it is the single most important rule in the system. Two measured facts, from the same-day repeat pair of 2026-08-19, must be treated differently.

Whether an engine cites anyone at all is stable. Across two runs seven hours apart with nothing changed, 51 of 51 cells matched on that state and none flipped in either direction.

Which sources it cites is not stable. Across the 20 cells carrying citations in either run, the mean overlap of cited domain sets was 0.6822, only 2 of 20 returned an identical set, and none returned a completely different one. About a third of a cited domain set turns over on its own.

So:

Class A, one run is enough. A cell moving between cited-nothing and populated. An owned cited URL returning anything other than 200. A run-health line that is not green, or a manifest showing carried-forward cells. A change in the cell count, which means the query set changed and every comparison and every target is void until restated.

Class B, two runs minimum. Which domains were cited for a query. A competitor appearing, disappearing, or moving in the frequency map. The head of the distribution and the distinct-domain count. Overlap between engines.

A Class B observation is recorded as a pending-confirmation candidate with the run id it was first seen in and the exact condition that would confirm it. It is not a finding, it does not justify an analysis, and it never justifies a brief. A domain appearing in one run and not the next is the null result, not a competitor moving.

One case sits across the line and the system will meet it. hendricks.ai appearing in a cited set is Class B by the taxonomy and the program's unit of account by every other measure. Act on it once, immediately, on the Class A half only: confirm the owned cited URL resolves 200 and points at a live, relevant page. Report it as a single-run observation with its run id and denominator. Do not call it a position until it holds on the same query in two consecutive runs.

One qualification the seeded data forced, and it is a genuine correction to the rule as first written. The Class A list names movement into or out of `failed`. On the seeded pair a literal reading fires six times, and it should fire zero. All six were Google AI Overviews cells moving between `failed` and `no_answer_surface`, and not one of them was ever a cell where anything was cited. Judge AI Overviews probe reliability on the failure count across the run, not cell by cell.

---

## 4. The director and its four modes

`visibility-director` is the entry point. Any request shaped like "what should we work on", "run the loop", "did anything change", or the start of any scheduled cycle goes to it, and it goes there before a human hand-picks a target query, because hand-picking is the failure it exists to remove.

Its value is concentrated in the decisions it refuses to make. A director that always finds work is not deciding, it is rationalising. The program costs about thirty eight cents per full run, so the real cost of a wrong decision is not money. It is the ledger filling with analyses of noise and the corpus filling with pages briefed off a churned domain set.

### 4.1 The mode ladder

Deterministic order, stop at the first that fires. A director that weighs modes holistically will find a reason for whichever mode it wanted.

| # | Condition | Mode |
|---|---|---|
| 1 | State absent, unreadable, stale against the archive, or missing a needed fact | ESCALATE, or report and stop |
| 2 | A hard stop: run health not green, carried-forward cells, cell count changed, query set changed without targets restated, an owned cited URL not returning 200, or a blocking governance decision | ESCALATE |
| 3 | A Class A change exists with no analysis recorded against it | INVESTIGATE |
| 4 | An investigated finding is REPLICABLE, has an owning page in `docs/17` section 3.2, and has no blocking fact | PRODUCE |
| 5 | An open brief has not shipped, or a gated change has not been reported for merge | PRODUCE, resuming from the next step rather than restarting |
| 6 | Otherwise | OBSERVE |

The mode and the rule number that fired are both written into state. If two modes both look defensible, something has not been classified, and the answer is to go back and classify it.

### 4.2 OBSERVE

The most common correct outcome, and reaching it is work rather than a failure to find any.

OBSERVE reports what was looked at, what changed, and why none of it clears the bar, specifically. "Four domains changed in the cited set for question 11, which is inside the measured churn floor of 0.68 mean overlap, recorded as pending confirmation against run 2026-08-19-181155" is an observation. "Nothing significant" is not. Every Class B candidate is recorded with its confirming condition so the next cycle can confirm rather than rediscover. Nothing is dispatched and nothing is spent.

A cycle can legitimately end here several times in a row. Three consecutive OBSERVE cycles with a green health line and a flat position is `docs/19` section 8.1 accumulating, and the director says so while the count is still small enough to act on. State carries the counter for exactly that.

### 4.3 INVESTIGATE

A state change appeared and nothing gets written until it is analysed.

Exactly one target per cycle. Rank by cross-cell support of the domains that won the cell, then by stage with `3_vendor_aware` first. A domain cited in six cells is a stronger signal than one cited once, and 88.8 percent of domains in the seeded run were cited exactly once, so the ranking does most of the triage. Two analyses of two singleton domains is one analysis of noise, performed twice.

### 4.4 PRODUCE

An investigated gap has a clear owner and a clear answer. The chain runs in one order and stops at the gate.

Placement is confirmed against `docs/17` section 3.2 first. If an owner exists, the action is strengthening that page, not creating another. Strengthening beats creating, always. A brief that comes back REFUSED or BLOCKED ends the chain, and it is not re-briefed with a different framing to get a different answer.

The furthest a PRODUCE chain goes is the evidence checker's verdict. Then it stops and reports what is ready for a human to merge.

### 4.5 ESCALATE

Section 9.

---

## 5. The state file contract

`.claude/state/visibility-state.json`, with `.claude/state/README.md` beside it explaining every field. The README is not optional documentation. A state file nobody understands gets deleted the first time someone is cleaning up.

### 5.1 What it holds

Ten things, because those are what a director needs to decide anything: the run of record and the prior run with their manifests; the current owned-citation position with the HTTP status of every owned cited URL; the answer-state buckets per engine; the head of the competitor distribution; open items; pending-confirmation candidates; terminated findings; spend; the query set version; and the last director decision with its next action.

### 5.2 Two writers, disjoint blocks

`scripts/visibility-run.sh` writes the measurement blocks. `visibility-director` writes the decision blocks. Nobody else writes, and the other seven agents neither read nor write it. A file eight agents can write is a file nobody can trust.

Both writers re-read immediately before writing and touch only their own block. The runner writes atomically, temp file then rename. A whole-file overwrite from a stale read destroys the other writer's work invisibly, because the file still parses afterward.

### 5.3 The rule that prevents the worst failure

An unmeasured fact is `null`, with a sibling `*_reason` string. Never a zero, never an empty string, never a plausible guess.

A failed run and a run with zero citations produce nearly identical files and mean opposite things. That confusion cost two days of client data on 2026-08-15, when the API password stopped authenticating and the scheduled job kept writing complete-looking files and exiting 0. `0` is a measurement and `null` is the absence of one, and they must never be typed the same way.

### 5.4 Four buckets, not three

The answer state per cell is `populated`, `cited_nothing`, `no_answer_surface`, and `failed`, and they are never folded together.

The fourth bucket was added because a three-bucket model distorts Google AI Overviews badly. On that engine `measured` only means the underlying search call succeeded, and the record carries a separate `ai_overview_present` field. On run `2026-08-19-181155` the engine was measured on 15 of 17 cells and an overview actually appeared on 1. A three-bucket model files the other 14 under `cited_nothing`, which reads as Google answering and declining to cite Hendricks, when the truth is that Google produced no overview at all. `docs/19` section 3.3 already required this denominator to be computed by hand. It is now computed by the runner.

Three denominators, and any published figure must say which one it used.

| Denominator | Seeded run | Use |
|---|---:|---|
| All cells | 51 | Run size. Never a citation denominator |
| Answering cells | 35 | How often an engine answered at all |
| Populated cells | 20 | The only denominator against which a citation share means anything |

### 5.5 Seeding

Seeded 2026-08-19 from the two archived runs on the Ultra, every figure recomputed from the archives and the manifests rather than copied from any document. The seed was then regenerated through `--rebuild-state` and the machine reproduced every measured value independently, which is the only reason to trust either.

If the file is lost, `scripts/visibility-run.sh --rebuild-state` reconstructs the measurement half from the archives without spending anything. The decision half exists nowhere else, which is the argument for not deleting it.

---

## 6. What runs on a schedule, and what runs on demand

### 6.1 The interval, and the argument for weekly

Recommendation: weekly, Monday, full three engines. Not daily, and not the split cadence `docs/19` section 7.1 proposed.

Daily buys noise. The measured churn floor is a mean overlap of 0.68 with nothing changed, so a daily source-set delta is indistinguishable from churn. A Class B candidate needs two consecutive runs to confirm no matter how often the probe runs, so daily produces a stream of candidates that resolve to the null at $0.38 a day, about $139 a year.

Daily does not detect state changes any sooner either, and that is the part that would justify the cost if anything did. Cited-or-not matched 51 of 51 cells across seven hours. There is no measured evidence that Class A state moves fast enough to need daily detection. The one Class A event that would genuinely justify a fast cadence, an owned citation pointing at a dead URL, cannot occur while the owned citation count is zero. If a citation ever appears, revisit this paragraph rather than inheriting it.

Weekly is the fastest cadence that produces a confirmable finding. A candidate opens in week N and resolves in week N+1, so seven days to a confirmed finding. The program's targets are 30, 60 and 90 days and its content cycle is measured in weeks. Seven days is inside all of them.

Full three engines rather than Perplexity-only, and this reverses `docs/19` section 7.1 on measured grounds. That section priced a weekly Perplexity-only run at $0.09 against a monthly full run at $1.20, and the split follows from that ratio. The $1.20 came from the dry-run estimator, which overstates by roughly 3.5 times. The full run actually bills $0.38.

| Cadence | Cost per year |
|---|---:|
| Weekly full three-engine | $19.76 |
| Weekly Perplexity-only plus monthly full | $9.76 |

Ten dollars a year is the entire saving, and it buys a real problem. Mixing run shapes means alternating denominators, 17 cells one week and 51 the next, which is exactly the denominator confusion that produced two published corrections on this project. It also makes the `docs/19` 60-day condition unscoreable in most weeks, because that condition requires a citation outside Perplexity and a Perplexity-only run cannot see one.

Monday at 09:15, on the MacBook, which is where the repo and the state file live. Monday so anything escalated has five working days to be acted on. 09:15 rather than overnight for two reasons: the shared 06:00 job on the Ultra runs all thirteen clients and must be clear first, and a laptop is more likely to be awake mid-morning than at 03:00, so a failure is seen the same day rather than discovered a week later. If the machine is asleep, launchd runs the job at the next wake, which is the right behaviour here, because a late measurement is worth more than a skipped one.

### 6.2 The runner

`scripts/visibility-run.sh` executes one cycle end to end and is safe to schedule.

1. Dry-run, and abort if the estimate exceeds the ceiling. Default $2.00, checked against the estimate rather than the bill. A ceiling near the real cost would abort every healthy run. $2.00 clears a normal run and still trips on the failures worth tripping on, such as the query set doubling or `--client` being dropped so all thirteen clients run, which estimates near $14.
2. Run the probe, always passing `--engines` explicitly. The default folds carried-forward records from a prior date into today's file, and a carried record is not a measurement of today.
3. Gate the manifest. Abort loudly if anything was carried forward, if the cell count moved, or if the query set fingerprint changed. State is not written when the gate refuses.
4. Compare against the newest previous run that is itself comparison-eligible. Eligibility is checked from each candidate's manifest, not assumed from its date.
5. Update state atomically, measurement block only.
6. Write `.claude/state/reports/<run_id>.md`.

Exit codes, all non-zero on failure so a scheduler sees them: 1 precondition, 2 cost ceiling, 3 a cycle already ran today, 4 probe failure, 5 manifest gate, 6 analysis or state write.

Logs go to `~/Library/Logs/hendricks-visibility/`, not `/tmp`. `/tmp` cleared once already and took the evidence for a disputed run with it. Stdout stays stdout and stderr stays stderr, so a scheduler writing the two to separate files still finds failures in the error file.

Idempotence. A second cycle on a day that already has one exits 3 rather than spending, and `--force` overrides with the reason recorded. `--rebuild-state` reruns the whole analysis and state write with no probe and no spend, so recovering from a bad state file costs nothing. `--dry-run` stops before the probe and leaves state untouched.

The runner touches exactly two paths in the repo, both under `.claude/state/`. It never edits site content, never builds, never deploys, never commits, never pushes, and never opens a pull request.

### 6.3 The schedule that is not installed

`.claude/state/ai.hendricks.visibility-weekly.plist` is written and deliberately not loaded. Installing a recurring job that spends money on Brandon's machine is his decision, not an agent's. The file plus the load command is the deliverable.

```
cp .claude/state/ai.hendricks.visibility-weekly.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/ai.hendricks.visibility-weekly.plist
```

`RunAtLoad` is false, so loading it does not spend anything as a side effect.

### 6.4 What runs on a schedule versus on demand

| Cadence | Item | Owner | Cost |
|---|---|---|---:|
| Weekly, Monday 09:15 | Full three-engine measurement cycle, state update, dated report | `scripts/visibility-run.sh` | $0.38 |
| Weekly, after the run lands | Cycle decision, mode, dispatch | `visibility-director` | $0 |
| Weekly, after the run lands | Run-pair comparison and ledger watch entry | `demand-scout` | $0 |
| Weekly | Resolution check on every owned cited URL, when any exist | `visibility-prober` | $0 |
| After any deploy or merge to main, and weekly | Production regression sweep | `site-integrity-monitor` | $0 |
| Monthly | Head-of-distribution check against the seeded shape | `demand-scout` | $0 |
| Monthly | Cycle review against `docs/19` sections 2.2 and 8 | Brandon | time |
| Quarterly | Query set review, concession review, falsification review | Brandon with the team | time |

On demand, never scheduled: `citation-reverse-engineer`, `answer-architect`, `aeo-writer`, and `evidence-checker`. All four are dispatched by the director when a cycle reaches INVESTIGATE or PRODUCE. Scheduling them would guarantee output, and guaranteed output from a system whose most common correct answer is "nothing moved" is how a corpus fills with pages briefed off noise.

`site-integrity-monitor` is the one watcher that runs on events rather than only on a clock, because a routing regression is introduced by a deploy and waiting a week to notice is six days too long.

Both watchers are dispatched by `visibility-director` at step 2.5 of its instructions, before it classifies anything, and their findings enter the classification as input rather than arriving after the mode has been chosen. That ordering is the whole reason they are useful: a watch consumed after the decision is a watch that changes nothing. Both cost nothing to run, so the only admissible reason to skip one is that its precondition was not met, and the director must name which. A cycle that dispatched neither and reported OBSERVE has not observed anything, and is indistinguishable from a cycle that did not look.

---

## 7. Cost

| Item | Cost | Notes |
|---|---:|---|
| Full three-engine run, 17 questions, 51 cells | $0.38 | Billed $0.3769 and $0.3835 on 2026-08-19 |
| Same run, dry-run estimate | $1.33 | The estimator overstates by roughly 3.5 times |
| Perplexity-only, 17 questions | $0.10 | Billed $0.1034 |
| Re-run of failed cells only | cents | Scope with `--max-queries` and `--engines` |
| All eight agents thinking | $0 in API spend | Time, not money |
| Weekly cadence, one year | about $20 | 52 full runs |

Cost is not a reason to skip a measurement. At this cadence the whole program is under twenty five dollars a year and "we did not measure" is never an acceptable state. Neither is "we measured four times because the first three did not say what we wanted." The probe does not run twice in a day without a stated reason written into the report and into state. There is a legitimate version of that: the 2026-08-19 pair was two full runs seven hours apart, run deliberately to measure whether the instrument is stable, and it produced a published study. That is the model.

State the cost before spending it, not after, and report estimate and actual separately.

---

## 8. The autonomy boundary

This system measures, analyses and proposes without asking. It does not publish to production without a human.

No agent merges a pull request, deploys, posts off-site, edits live copy, or creates an account anywhere. The furthest any chain goes is the evidence checker's verdict, and then it stops and reports what a human has to do. `scripts/visibility-run.sh` writes two paths and neither is production.

The reason is specific rather than cautious. This project has already published a false claim twice, both on the same study page, and both times a human-reviewed gate caught it. The corrections log on the site records them: figures taken from a run whose record had been overwritten, and a real citation reported as a citation of a page that never existed. An autonomous publisher would have shipped both. Every argument for shipping without a human has already been beaten by that record.

Two registers are Brandon's alone and no agent edits either. `CONTENT_VERIFICATION.md` is amended only by Brandon. `docs/18-SOURCE-LEDGER.md` is his to maintain, no agent adds a source to it, and no agent cites a source that is not already in it. An agent that measures a fact which unblocks or contradicts a row proposes the exact replacement wording in its report and stops there.

The boundary is also why two agents have no write tools at all. `evidence-checker` and `site-integrity-monitor` are the two whose job is to find problems, and either one could quietly repair what it found if it were able to. A gate that can fix its own findings is not a gate, and a regression watch that can fix a regression is a way to lose the record that there was one.

---

## 9. What escalates to Brandon

Escalate the smallest number of things that actually need him, each written as a question with a recommendation and the consequence of each answer. He is ego-detached and will not thank anyone for a summary that avoids taking a position.

Legitimate escalations: a blocked fact, where a brief cannot proceed because a claim is pending or blocked in `CONTENT_VERIFICATION.md` or a source is not in `docs/18`. A governance decision in `docs/17` section 9 or `docs/19` section 7.2 that is now on the critical path. A suspected production regression in the routing disposition, the entity graph, indexation, or the seven gates. An owned cited URL returning anything other than 200. A result that contradicts a program assumption, meaning one of the six in `docs/19` section 8. The query set changing while targets still reference the old denominator. Anything needing a byline, an account, or an off-site post, because Brandon holds every one of those and no agent may hold one.

Not escalations, and this is the discipline half. Anything a document already answers, checked first. Anything decidable inside the boundary: which query to analyse, whether a Class B candidate is confirmed, whether to run Perplexity-only or full, whether to terminate a finding. And a number that is worse than last time. `docs/19` section 7.3 is explicit that no agent needs permission to report a bad result and no agent may soften one. Report it, do not escalate it.

Two escalations are open now and both were raised while building this system. They are recorded in state as E1 and E2 and summarised in section 11.

---

## 10. What this system does not do

Stated plainly, because a system described only by its capabilities will be trusted past them.

It does not publish. Nothing reaches production without a person merging it, and that is a design decision rather than a current limitation to be removed later.

It does not post off-site. The off-site track in `docs/19` section 5 is Brandon's personally. Agents identify surfaces, draft under direction, and measure. That boundary is what keeps section 5.3 enforceable, and it matters more than it looks: reddit.com and linkedin.com outrank every vendor and every trade publication in this citation set, so the highest-leverage surface in the entire measurement is the one no agent may touch.

It cannot make the firm cited. It can measure whether the firm is cited, analyse what the cited pages have in common, propose an answer, write it, and check it. Whether any of that produces a citation is not established. The best available peer-reviewed work says most of what this category sells does not work: C-SEO Bench found the methods ineffective or harmful with gains zero-sum as adoption rises, SAGEO Arena measured body-text optimization reducing citation, and no controlled test associates any specific on-page change with a citation on these three systems. This system is instrumented so that a null result is visible rather than explained away.

It measures a surface where only one of three engines can be won by a page at all. Perplexity populated 17 of 17 cells. ChatGPT populated 2 of 17, answering the rest from memory with no sources. Google AI Overviews returned an overview on 1 of 15 successful probes. A content change is judged on Perplexity movement, and the other two are reported as unobservable rather than as negative. Writing "no movement on ChatGPT" invites a reader to conclude a page did not work, when the honest statement is that ChatGPT did not cite anyone for that question in either run.

It cannot attribute cause. Content changes, off-site placements, and research publication routinely land in the same window, and when a number moves there is no way to say which one moved it. Every ledger entry records that at the time, which is what stops a later session from reading the ledger as a causal record.

It does not isolate the instrument from the market. A source set that churns 32 percent on its own means a single run can never distinguish a competitor's change from the engine's own variance, no matter how carefully the run is executed.

---

## 11. Where the documents are now stale

Five disagreements were found between the governing documents and what is actually on disk. Each is recorded in state. None has been edited into the source document, because `docs/17`, `docs/19` and `CONTENT_VERIFICATION.md` are Brandon's to amend.

The query set was replaced entirely between 2026-08-18 and 2026-08-19, from 15 questions to 17, with zero overlap between the two sets. Every figure in `docs/19` section 1.1 and all three targets in section 2.2 describe a set that is no longer probed. By section 2.3's own rule those targets are void until restated. This is escalation E1, and the recommendation is to restate them against 51 cells and restart the 30, 60 and 90 day clock from 2026-08-19.

The current position of 0 of 51 is therefore not a fall from 1 of 45. The two numbers measure different question sets, and subtracting one from the other produces a false finding. The single citation in the old baseline was earned on "Consultant to connect AI search visibility to pipeline", which is not in the current set.

Decision D10 is resolved and `docs/19` section 7.2 still lists it as open. The retired URL that held that citation now returns 308 to `/solutions/search-impact-measurement`, which returns 200, verified 2026-08-19. That is the direction `docs/19` recommended.

hendricks is included in the shared 06:00 job on the Ultra, `ai.hendricks.total-search-citations`, which runs all thirteen clients with no `--engines` flag and therefore with carry-forward on. Those runs never include Google AI Overviews and cannot back a comparison. This is escalation E2, and the recommendation is to exclude hendricks from that job. The runner already refuses any run whose manifest shows carried cells, so the guard holds either way, but the archive fills with runs that look like measurements and are not.

The cost figures in `docs/19` section 7.1 are estimator figures, not billed figures, and they are roughly 3.5 times high. Section 6.1 above reverses the cadence recommendation on that basis.

The run ledger that `docs/19` sections 1.3 and 7.1 name as the durable record, `docs/measurement/visibility-runs.md`, does not exist. There is no `docs/measurement` directory in the repo, verified 2026-08-19, and eight agent definitions instructed an agent to read or write it. The durable record is in fact the immutable per-run archive and manifest under `history/runs/` on the Ultra, which is what the three published studies cite, plus `.claude/state/visibility-state.json` and the reports beside it. The agent definitions now say so and forbid a second ledger. Whether to create the file as a human-readable index over the archive is Brandon's call. This is documentation drift DD2.
