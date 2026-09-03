# Hendricks Methodology

## Route

`/methodology`

## SEO

**Title:** Search Intelligence Measurement Methodology | Hendricks

**Description:** Learn how Hendricks defines intent contexts, measures observed consideration, analyzes evidence, grades conclusions, and connects interventions to business outcomes.

**H1:** Measure the decision, not just the prompt.

## Hero

**Eyebrow:** RESEARCH AND MEASUREMENT STANDARDS

# Measure the decision, not just the prompt.

Traditional search often centered on the keyword.

Early AI-search measurement often centers on the prompt.

Hendricks centers on the **commercial intent context**.

`Customer Need + Customer Profile + Use Case + Constraints + Geography + Decision Stage + Commercial Value = Intent Context`

## Context panels

### Neutral baseline

A defined question without substantial supplied customer context.

### Customer cohort

Representative industry, demographic, use-case, budget, geographic, or business constraints.

### Decision journey

Multi-step conversations that become progressively more specific as the customer approaches a decision.

### Platform and time panel

Repeated observations across relevant search environments and time periods.

### Optional first-party human research

With consent, real participants may compare controlled findings with live user experiences.

## Outcome classification

Classify each brand outcome as one or more of:

- Absent
- Referenced
- Cited
- Considered
- Compared
- Recommended
- Preferred
- Inaccurately represented
- Contradicted
- Uncertain

Define classifier rules and human-review thresholds.

## Weighting

High-value customer decisions receive more weight than low-value informational questions.

A transparent weighting model can consider:

- Demand
- Commercial intent
- Expected customer value
- Strategic fit
- Eligibility
- Evidence confidence

No weighting model should be presented as universal.

## Evidence grades

| Grade | Evidence |
|---|---|
| A | Controlled experiment combined with first-party CRM or revenue data |
| B | Strong first-party exposure, behavior, and commercial time-series evidence |
| C | Repeated controlled context-panel observations and consistent source patterns |
| D | Directional API, synthetic, or isolated observation |

## Methodology statement

> Hendricks does not claim to reverse-engineer hidden model logic. We observe the information environment, test representative customer contexts, analyze sources and evidence, engineer the conditions a brand controls, and measure what changes.

## Reproducibility requirements

Store for each run where legally and technically permitted:

- Exact question
- Supplied context
- Platform
- Model or search experience
- Date and time
- Location
- Session type
- Response
- Cited sources
- Classifier output
- Confidence
- Human-review status

## Limitations

- Personal memory cannot be reproduced universally.
- Model and search behavior changes over time.
- APIs may not reproduce consumer interfaces exactly.
- Not every AI impression is observable.
- Citation does not prove influence.
- Correlation does not prove causation.
- Offline selection may not be attributable.

## Related research

- Hendricks Selection Baseline
  This methodology run end to end on Hendricks itself, with its denominators published: 47 of 51 cells measured in the 2026-08-19 run, 20 of them citing at least one source, all read from an archived run a reader can ask for by id.

This page states the standards and shows no run against them. The link above is the worked example: the query set, the cell counts, the error count, the cost, and the stated limits, on one page. It is the only entry in this page's related list recorded here. The rest of that list is an internal-linking decision under `docs/03` section 6 rather than approved copy, and it lives in `src/content/pages/methodology.ts`.

The figures are quoted from `/research/hendricks-selection-baseline` exactly as that page publishes them, and none is recomputed into a new statistic.

## Final CTA

# Establish a baseline before making claims.

**CTA:** Start with a Search Intelligence Diagnostic

## Canvas conversion, 2026-09-03

**Answer label:** The unit of measurement

**Intent context caption:** The intent context formula: seven terms, one unit of measurement.

An intent context is a realistic customer situation: the need, who has it, their constraints, location, decision stage, and what the decision is worth.

**Evidence classes eyebrow:** Proof Without False Precision

**Evidence classes heading:** We separate what is observed, inferred, measured, and proven.

**Metrics eyebrow:** Metrics

**Metrics heading:** Five measures, each defined before it is reported.
