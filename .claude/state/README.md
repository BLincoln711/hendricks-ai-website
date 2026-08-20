# .claude/state

This directory is the visibility program's memory. Before it existed, every probe was a snapshot and no agent could answer "what changed since last week" without a human opening two files and holding the difference in their head.

Contents:

| Path | What it is | Written by |
|---|---|---|
| `visibility-state.json` | The memory. One object, described below. | `scripts/visibility-run.sh` and `visibility-director`, each in its own block |
| `README.md` | This file. Explains every field and who writes it. | Whoever changes the schema |
| `reports/<run_id>.md` | One machine-written report per measurement cycle. | `scripts/visibility-run.sh` |
| `ai.hendricks.visibility-weekly.plist` | The weekly schedule, written and deliberately not installed. | Autonomy engineer, loaded by Brandon or nobody |

Two paths that look like they belong here and do not. Run logs go to `~/Library/Logs/hendricks-visibility/`, outside the repo, because logs are not source. The measurement ledger is `docs/measurement/visibility-runs.md` and it is the only ledger in the program, owned by `visibility-prober` and `demand-scout`. The reports in `reports/` are not a second ledger. They are the runner's own record of what it did, and they never replace a ledger entry.

---

## 1. Why this file exists at all

Five specialist agents ran the loop twice and produced published work. They still amounted to a toolkit rather than a system, for five reasons, and this file addresses the third: nothing remembered. A director that cannot see last week's position cannot tell a change from a first observation, and an agent that cannot tell those apart will manufacture findings out of noise.

The file is small and human-readable on purpose. A state file nobody understands gets deleted the first time someone is cleaning up, and everything downstream then inherits either nothing or a fiction.

## 2. The rule that matters most

An unmeasured fact is `null`, with a sibling `*_reason` string saying why. Never a zero, never an empty string, never a plausible guess.

This is not tidiness. A failed run and a run with zero citations produce nearly identical files and mean opposite things, and that exact confusion has already cost this program two days of data on 2026-08-15 and a published figure that could not be reproduced on 2026-08-19. `0` is a measurement. `null` is the absence of one. They must never be typed the same way.

## 3. Who writes what

Two writers, disjoint blocks, and no third.

| Block | Writer |
|---|---|
| `query_set`, `run_of_record`, `prior_run`, `comparison`, `position`, `competitor_distribution`, `spend` | `scripts/visibility-run.sh` |
| `director`, `open_items`, `pending_confirmation`, `terminated_findings`, `next_action` | `visibility-director` |
| `schema_version`, `_ownership`, `state_readme` | Whoever changes the schema, which means a human |
| `state_updated_at`, `state_updated_by` | Both writers, on every write |

The other seven agents (`visibility-prober`, `citation-reverse-engineer`, `answer-architect`, `aeo-writer`, `evidence-checker`, `site-integrity-monitor`, `demand-scout`) neither read nor write this file. They are dispatched with the facts they need. That is deliberate: a file eight agents can write is a file nobody can trust.

Both writers must re-read immediately before writing and touch only their own block. The runner writes atomically, to a temp file in the same directory followed by a rename, so a reader never sees a half-written file. The director should do the same. A whole-file overwrite from a stale read silently destroys the other writer's work, and the loss is invisible because the file still parses.

## 4. Field reference

### 4.1 Envelope

| Field | Meaning |
|---|---|
| `schema_version` | Semantic version of this schema. Bump the minor on an added field, the major on a removed or re-meaninged one, and update this README in the same commit. |
| `state_updated_at` | ISO 8601 with offset. When the file was last written by anyone. |
| `state_updated_by` | `seed`, `visibility-run.sh`, or `visibility-director`. |
| `state_readme` | Pointer back here, so a reader who finds the JSON alone can find the explanation. |
| `_ownership` | The table in section 3, restated inside the file so it survives the README being lost. |

### 4.2 `query_set`

The denominator's identity. Every other number in the file is meaningless without it.

| Field | Meaning |
|---|---|
| `query_count`, `cells_per_full_run` | 17 questions, 51 cells across three engines. |
| `fingerprint_sha256_12` | First 12 hex of the SHA-256 of the sorted query list. The cheap way to detect that the set changed. If this moves, every comparison in the file is void until restated. |
| `stages` | The `_stages` map from `clients.json`. `3_vendor_aware` is the triage tiebreak, because it is where commercial intent sits and the only stage where ChatGPT has ever cited anything in this category. |
| `replaced_set` | The retired 15-query set, kept because docs/19's entire baseline rests on it. `query_overlap_with_current` is 0. |

`replaced_set` is the single most misread thing in this file. The current position of 0 of 51 is not a fall from the 1 of 45 in docs/19 section 1.1. The two sets share no query. Subtracting one from the other produces a false finding, which is exactly the class of error this program exists to catch.

### 4.3 `run_of_record` and `prior_run`

Same shape. `run_of_record` is the newest comparison-eligible run, `prior_run` is the one before it on the identical query set.

| Field | Meaning |
|---|---|
| `run_id` | `YYYY-MM-DD-HHMMSS`, assigned by the probe at invocation. The only durable key. Every published figure cites one. |
| `archive`, `manifest` | Absolute paths on the Ultra. The archive is immutable and unpruned. The date-stamped file in `~/claudecode/` is pruned at 14 files and is never the source of a published figure. |
| `engines_carried_forward`, `carried` | From the manifest. Both must be empty and zero. A carried record is a copy of an earlier day's answer, not a measurement of today, and a results file alone cannot reveal that. |
| `cells`, `measured`, `failed` | From the manifest, cross-checked against the archive. |
| `cost_usd` | Billed, from the manifest. Not the dry-run estimate. |
| `probe_exit_code` | 0 normal, 1 under half the cells measured, 2 nothing measured. |
| `comparison_safe` | Derived. True only when carried is 0, nothing was carried forward, exit was 0, and the query set fingerprint matches. Anything else and this run cannot back a comparison. |
| `answer_state` | The four buckets. See below. |

### 4.4 `answer_state`, the four buckets

Four states, never folded together:

- `populated`: the engine answered and cited at least one source.
- `cited_nothing`: the engine answered and cited nobody.
- `no_answer_surface`: the probe succeeded and the engine produced no answer at all. On Google AI Overviews this means Google returned no overview for that query.
- `failed`: the probe did not return a measurement. The cell says nothing about anything.

The fourth bucket exists because of a real distortion. On Google AI Overviews the record carries `ai_overview_present`, and `measured` only means the underlying search call succeeded. On run `2026-08-19-181155` the engine was `measured` on 15 of 17 cells, and an overview actually appeared on 1. A three-bucket model files the other 14 under `cited_nothing`, which reads as "Google answered and chose not to cite Hendricks" when the truth is that Google produced nothing to be cited in. docs/19 section 3.3 already required this denominator to be computed by hand. Now it is computed by the runner.

Three denominators, and any published figure must say which one it used:

| Denominator | Value on the seeded run | Use |
|---|---:|---|
| All cells | 51 | Run size. Never a citation denominator. |
| Answering cells, `populated` + `cited_nothing` | 35 | How often an engine answered at all. |
| Populated cells | 20 | The only denominator against which a citation share means anything. |

`failed_cells` lists the failures explicitly because they are the minority that drives decisions. Everything else is a count. Per-cell detail is recomputed from the archive, which is authoritative and unpruned. Duplicating 51 rows here would create a second source of truth that can drift from the first.

### 4.5 `comparison`

The delta between `prior_run` and `run_of_record`, precomputed so no agent has to hold two files in its head.

`eligible` is the gate. False means the pair cannot be compared and the reason says why. Comparing anyway is forbidden.

The three readings are deliberately separated because they have different evidentiary weight:

- `cited_or_not`: 51 of 51 cells matched across seven hours. This stability is what licenses one run being enough to call a state change.
- `answer_state_flips`: 6, every one a Google AI Overviews probe moving between `failed` and `no_answer_surface`. Not one of them was ever a cell where anything was cited. The `caution` field exists because a literal reading of the director's Class A rule, which names movement into or out of `failed`, fires six times on a pair where nothing happened. It should fire zero. Judge AI Overviews on the failure count, not cell by cell.
- `source_set_churn`: mean Jaccard overlap 0.6822 over the 20 cells cited in either run, 2 identical, 0 disjoint. About a third of a cited domain set turns over with nothing changed. This is the null, and any Class B claim smaller than it is noise.

`what_this_pair_is` is a warning label. The seeded pair is a same-day instrument test seven hours apart, deliberately run to measure stability. It is not a week-over-week reading and must never be cited as evidence that something did or did not change over time.

### 4.6 `position`

The program's unit of account.

`owned_cited_cells` is 0, against `denominator_cells` 51, `denominator_answering_cells` 35, and `denominator_populated_cells` 20. `denominator_note` spells out which to use. The count is host-matched on `cited_urls`, not a substring test over answer text.

`owned_url_http_checks` is empty and its `*_reason` says why: there is nothing to resolve. When a citation appears, every entry carries the URL, the observed status code, the final URL after redirects, and the date checked. An owned citation returning anything other than 200 is the highest-priority event in the program, because it converts an engine's recommendation into a bad experience for the one buyer who followed it.

`historical_citation` records the single citation the retired query set earned, and its resolution. That URL returned 410 Gone when it was cited. It now returns 308 to `/solutions/search-impact-measurement`, which returns 200, verified 2026-08-19. That closes docs/19 section 7.2 decision D10 in the direction that document recommended, and docs/19 has not been updated to say so.

### 4.7 `competitor_distribution`

The falsification instrument from docs/19 section 8.2, not a vanity metric. The plan fails if the head consolidates. Baseline to beat: the top ten hold 14.8 percent of slots and 88.8 percent of domains are cited exactly once.

`tie_note` matters. Everything below rank 6 is tied at 2 cells and ordered alphabetically. Rank movement inside the tail is an artifact of sorting, not a market event.

`engine_disjointness` carries its own caution. Perplexity and ChatGPT shared 1 domain on the earlier run and 4 on the later one with nothing changed in between. The direction is solid, the engines are nearly disjoint and averaging them produces a number about nothing, but the exact count is churn and must not be published without a two-run confirmation.

### 4.8 `director`

Written only by `visibility-director`.

`last_mode` is `null` and `last_mode_reason` says the director has never run. Read `null` as "no cycle has happened", never as OBSERVE. `last_rule_fired` records which numbered rule in the director's mode ladder fired, so a later reader can audit the decision rather than re-litigate it.

`cycles_ending_in_observe_consecutively` is a tripwire. Three consecutive OBSERVE cycles with green health and a flat position is docs/19 section 8.1 accumulating, and the director says so while the count is still small enough to act on.

### 4.9 `open_items`

Four lists and they are not interchangeable.

- `analyses_outstanding`, `briefs_written_not_shipped`, `changes_gated_not_merged`: work already paid for. An unshipped brief outranks any new observation as the next action.
- `escalations_open`: questions only Brandon can answer, each written as a question with a recommendation and the consequence of leaving it unanswered. If it can be decided inside the autonomy boundary it does not belong here.
- `escalations_answered`: kept, not deleted, so a resolved decision is not silently reopened. D10 lives here.
- `documentation_drift`: places where a governing document states something the measurements contradict. Not escalations, because no decision is blocked, but a future reader needs to know the doc is stale. Agents propose the wording; Brandon edits the doc.

### 4.10 `pending_confirmation`

Class B observations waiting on a second run. Each carries the run it was first seen in, the exact condition that would confirm it, and its null hypothesis.

A Class B observation is not a finding. It does not justify an analysis and it never justifies a brief. It becomes a finding only when it holds across two consecutive comparison-eligible runs of the identical query set and is larger than the 0.6822 churn floor. A domain appearing in one run and not the next is the null result, not a competitor moving.

Writing the null hypothesis into the entry is what stops the next session from reading a pending candidate as a pending win.

### 4.11 `terminated_findings`

Findings closed as NOT REPLICABLE or SHOULD NOT REPLICATE. Kept so they are not rediscovered and re-analysed every cycle. Reopening one requires a new fact, named.

### 4.12 `spend`

`program_spend_today` and `program_spend_cycle` are billed amounts from manifests, not estimates.

`cost_reference` carries the measured cost of each run shape and the estimator's bias. The dry-run estimator has run roughly 3.5 times the billed amount, so it is a ceiling guard and never a forecast. This matters: docs/19 section 7.1 sized the monthly full run at $1.20 based on the estimator, and the real figure is $0.38.

`not_counted_here` excludes the shared 06:00 job's hendricks spend, because this program does not own that job. See escalation E2.

### 4.13 `next_action`

One action, with a trigger. "Full three-engine run" is not actionable. "Full three-engine run on Monday 09:15, about $0.38, to establish the first week-over-week pair" is.

`blocked_by` is `null` or the id of the escalation holding it up.

## 5. Seeding and provenance

Seeded 2026-08-19 by hand from the two archived runs on the Ultra, `2026-08-19-110930` and `2026-08-19-181155`. Every figure was recomputed from the archives and the manifests. Nothing was copied from a document, including from docs/19, and two figures in docs/19 turned out not to describe the current query set at all.

Facts established during seeding that were not previously written down anywhere:

1. The query set was replaced entirely between 2026-08-18 and 2026-08-19, 15 questions to 17, with zero overlap. docs/19's baseline and all three of its targets describe a set that is no longer probed.
2. D10 is resolved. The retired URL 308s to a live page.
3. hendricks is included in the shared 06:00 job, which runs with carry-forward on and never probes Google AI Overviews.
4. The dry-run estimator overstates cost by roughly 3.5 times.

## 6. If this file is lost

It can be rebuilt. Run `scripts/visibility-run.sh --rebuild-state`, which reconstructs the measurement blocks from the archives on the Ultra without spending anything on the API.

What cannot be rebuilt is the decision half: `director`, `open_items`, `pending_confirmation`, and `terminated_findings` exist nowhere else. That is the argument for not deleting this file, and the argument for the ledger at `docs/measurement/visibility-runs.md` carrying the same conclusions in prose.
