# Corrections

## Route

`/corrections`

## Provenance

Authored 2026-08-19 alongside `src/content/pages/corrections.ts`, not transcribed from copy that existed first. CONTENT_VERIFICATION.md R6 recorded this route as blocked because no approved copy existed for it, and docs/17 wave 0 item 0.4 records that the block was roughly 200 words of policy rather than a missing fact. This is that policy, and it is pending Brandon's editorial review in the same sense as rows A3 and A4.

## SEO

**Title:** Corrections | Hendricks

**Description:** How Hendricks corrects a published error, how to report one, and the dated log of corrections made to this site.

**H1:** Corrections

**Eyebrow:** Editorial Policy

## Lead

Hendricks publishes measurement. Measurement that cannot be corrected in public is not measurement.

This page states what gets corrected, how to report an error, and what the firm did the last time it found one in its own work.

## Direct answer

**Eyebrow:** CORRECTIONS POLICY

**Hendricks corrects any published statement of fact that turns out to be wrong, including figures, dates, names, definitions, and the machine-readable claims a page emits in its structured data. A substantive correction is dated, described, and left visible in the log on this page rather than edited away, and anyone can report an error through the contact form.**

## What gets logged, and what gets fixed quietly.

Eyebrow: Scope

The line is whether the change alters a claim. A change that alters a claim is logged. A change that does not is not, because a log padded with typo fixes hides the corrections that matter.

Table caption: How each class of change is handled.

| The change | How it is handled |
| --- | --- |
| A statement of fact that is wrong: a figure, a date, a name, a definition, a source, or a claim in structured data | Corrected on the page and logged here with both dates, what was published, and what changed. |
| A claim that is accurate but reads as more than the evidence behind it supports | Narrowed to the claim the evidence carries, and logged. Overstating is an error even when every number in the sentence is right. |
| A number whose method, sample, or date range was described incompletely | The description is completed and logged. The figure stands only if the completed description still supports it. |
| A typo, a broken link, a formatting fault, or a rewording that alters no claim | Fixed without an entry. |

## How to report an error.

Eyebrow: Reporting An Error

Use the contact form and select Other. Include enough that the claim can be checked without a reply first.

- The address of the page
- The sentence, figure, or table cell in question
- What you believe is correct
- How you know, where that can be shared

Every report gets one of three answers: the claim is corrected, the claim stands and the reason is given, or the claim comes off the page while it is checked.

A report that produces no answer is a failure of this policy rather than a decision under it.

CTA: Open the contact form

## Dated, described, and left visible.

Eyebrow: How A Correction Is Recorded

A corrected page carries the correction rather than a clean version of itself. The entry states what was published, not only what replaced it, so a reader can see the claim that was wrong.

Each entry records the date the claim was published, the date it was corrected, what was wrong, and what changed. Where a figure was revised, both figures appear.

Structured data is in scope. A claim a visitor never reads but a machine can read is still a published claim, and the oldest entry below is one of those.

Where a published Hendricks figure is contradicted by someone running the same design, the contradiction is published here beside the original figure. That case is the reason this page exists.

## Corrections to date.

Eyebrow: Log

Three entries, newest first. The log does not reconstruct changes made before this page existed.

### Figures from a run whose record had been overwritten, on the Hendricks Selection Baseline

Published 2026-08-19. Corrected 2026-08-19. Page: Hendricks Selection Baseline.

What was published: The study published a 2026-08-19 run of 51 cells with all 51 measured, 19 of them citing a source, 248 distinct domains across 305 citation slots, 218 domains cited exactly once, reddit.com in 14 cells, linkedin.com in 10, and Google AI Overviews returning no sourced overview on any of the 17 questions.

What was wrong: Two faults. The figures came from a real three-engine run at 22:54 on 2026-08-18 that carried the 2026-08-19 date, and Hendricks destroyed that run’s result file. The probe named each result file from the client and the date alone, so the scheduled job at 06:16 on 2026-08-19 wrote over it in place. That job queries one engine and carries the alternating engine forward from the day before, so the surviving file held 32 records: 17 Perplexity cells from that morning, 15 ChatGPT cells flagged as carried forward from 2026-08-18, and no Google AI Overviews cells at all. No published figure could be reproduced from any surviving record, which disqualifies it on a page whose value is that a reader can check it. Separately, one figure was wrong on its merits: Google AI Overviews returned one sourced overview of the 17, not none.

What changed: Every 2026-08-19 figure on the study is now read from run 2026-08-19-110930, archived at history/runs/hendricks-2026-08-19-110930.json with its manifest at history/runs/manifest-2026-08-19-110930.json. That run measured 47 of its 51 cells, 20 of them citing a source, across 247 distinct domains and 308 citation slots, and cited hendricks.ai in none of them. Google AI Overviews is reported at 1 of the 13 cells that returned a measurement, the other 4 of its 17 having errored. An answer reported as citing consumer software help pages rested on the destroyed file, cannot be checked against the archive, and came off the page. The 2026-08-18 run is untouched and still reproduces from its own file. The instrument changed as well: every run now writes an immutable archive keyed to a run id, plus a manifest recording which engines were queried, which were carried forward from an earlier run, and which were not run at all. Those are three different states and a bare result file cannot tell them apart after the fact.

### A real citation reported as a citation of a page that never existed, on the Hendricks Selection Baseline

Published 2026-08-19. Corrected 2026-08-19. Page: Hendricks Selection Baseline.

What was published: The study said the single hendricks.ai citation in the 2026-08-18 run pointed at an address that had never existed, and counted both runs as zero citations on that basis.

What was wrong: The page was real. Hendricks published it on 2025-11-25, retired it on 2026-08-17 while replacing the site, and Perplexity cited it on 2026-08-18, the day after it came down. Hendricks reached the wrong conclusion by running the history check against the wrong repository. The firm has two retired sites, the check searched the one with 74 registered insight slugs and a different directory layout, did not find the address there, and stopped. The address was in the other retired site, the one belonging to this codebase. The same published sentence also said the address appeared in no list of retired addresses, and it was in that list in this site’s own source at the time.

What changed: The 2026-08-18 run now reports one real citation of a retired page, and the study leads with the fact that an engine cited an article after the firm had deleted it. The 2026-08-19 run still reports zero. The study’s methodology now carries a step requiring that a claim about a Hendricks page is verified against that page, by named repository, branch, and command.

### A third employer in the founder structured data on the About page

Published 2026-08-17. Corrected 2026-08-17. Page: About.

What was published: The Person structured data on the About page listed three organizations under alumniOf: Merkle, Dentsu, and SolarWinds.

What was wrong: The verified career record names Merkle as the single employer of record, and the visible role timeline on the same page named Merkle and SolarWinds only. The third organization existed in the markup and nowhere a reader could see it, which made it a claim about the founder that the page itself did not support.

What changed: Dentsu was removed from alumniOf the same day. A unit test now asserts that every organization in alumniOf also appears in the visible role timeline, so the markup cannot again state an employer the page does not show.

## Honest limitation

**This log begins on the day the page shipped.**

Hendricks kept no public corrections log before this page. Earlier changes to the site are in version control and are not enumerated here, and nothing on this page claims there were none.

The log records corrections to what Hendricks published. It is not a change log for the site, and it is not an audit performed by anyone outside the firm.

## Related

- Methodology: The measurement standards a published Hendricks figure is held to.
- Research: Published Hendricks measurement, with its method, sample, and stated limits.
- About: The founder record the first entry in the log corrects.

## Sources and updates

This page states the Hendricks corrections policy and the corrections made to this site. It reports no third-party research and cites no external source.

Last reviewed 2026-08-19.

## Closing

Found something wrong on this site? Report it, and it gets an answer.

CTA: Submit a correction
