# 12 — Content Governance and Voice

## 1. Voice

Hendricks sounds:

- Clear
- Direct
- Intelligent
- Commercially grounded
- Evidence-led
- Confident without certainty theater
- Technically credible without unnecessary jargon

## 2. Sentence style

- Prefer short declarative headlines.
- Explain jargon immediately.
- Use active voice.
- Use concrete outputs.
- Separate observation from inference.
- Use tables and frameworks when they improve comprehension.
- Avoid long strings of buzzwords.

## 3. Approved language patterns

### Strong

- Know where your brand is missing from the shortlist.
- Find the selection gaps costing you valuable demand.
- Measure the decision, not just the prompt.
- Visibility tells you where you appeared. Selection Intelligence tells you what that appearance means.
- We improve the conditions a brand can control and measure what changes.
- Observed consideration rate
- Commercial Selection Gap
- Evidence grade

### Avoid

- Dominate AI search
- Hack ChatGPT
- Guaranteed citations
- Own every answer
- Future-proof your brand
- Revolutionary AI-powered solution
- Unlock exponential growth
- Proprietary algorithm, unless one exists and can be described
- The number-one AI selection firm, unless independently substantiated

### Punctuation

- The em-dash (U+2014) is prohibited in visitor-facing copy. Use a comma or a full stop. This is Brandon's standing brand rule, confirmed 2026-08-17: an em-dash reads as machine-written, and a comma or full stop carries the same clause break without the tell.
- This rule is why the "Measure the decision, not just the prompt." pattern above is punctuated with a comma. It shipped with an em-dash, and the "Strong" list is not an exemption from the punctuation rule. All 15 visitor-facing occurrences were re-punctuated across `src/content/` and `content/pages/` on 2026-08-17, so a future audit should not re-raise the earlier wording as approved copy.
- Hyphens and en-dashes are unaffected. A numeric range such as `100–300 intent contexts` or `$15,000–$25,000` reads as typeset rather than generated and stays as it is.
- `scripts/validate-content.ts` enforces this. It scans the rendered content strings under `src/content/` and the approved copy under `content/pages/`, and it strips code comments first, so a comment explaining the rule is not itself a failure.

## 4. Claims framework

Every material claim falls into one category:

### Fact

Supported by a reliable source or verified internal record.

### Observation

Directly measured under stated conditions.

### Inference

A reasoned interpretation of observed evidence. Label it.

### Hypothesis

A proposed explanation to be tested.

### Result

Requires baseline, intervention, timeframe, measurement source, and limitations.

## 5. AI-system language

Say:

> Across the defined context panel, the client was observed in the consideration set in 28% of runs.

Do not say:

> ChatGPT ranks the client 28%.

Say:

> These source and evidence patterns repeatedly appeared with competitor recommendations.

Do not say:

> We know the model assigned these sources a 35% weight.

## 6. Proof rules

Never publish:

- A metric without a definition
- A result without a period
- A percentage without baseline values
- A logo without permission
- A testimonial without verified attribution and permission
- A client name merely because Brandon worked with it through a former employer
- A dashboard mockup presented as real data

## 7. Founder claims

Before launch, verify:

- Exact current title
- Former SolarWinds title and dates
- Former Merkle/Dentsu title and dates
- Ahrefs advisory role
- University relationships
- Approved clients and brands
- Speaking credentials
- Years of experience

When relationship context matters, say whether work occurred through employment, agency, consulting, or direct Hendricks engagement.

## 8. The Search Economy language

Approved:

> Brandon is also the founder of The Search Economy, an independent publication that analyzes and contextualizes Google Trends data to document what captured public attention and what the search behavior may reveal.

Not approved:

- The Search Economy is Hendricks's research arm.
- Hendricks delivers The Search Economy reports to clients.
- The Search Economy is a Hendricks solution.
- The Search Economy platform.

## 9. Research standards

Data-driven content must state:

- Data source
- Date range
- Sample
- Collection method
- Processing or classification method
- Definitions
- Limitations
- Author
- Publication and update dates
- Corrections path

## 10. Editorial review checklist

- Does the page answer its title quickly?
- Is the target audience clear?
- Is the commercial relevance clear?
- Are technical terms defined?
- Are claims supported?
- Are limitations stated?
- Are CTAs contextually appropriate?
- Does the page link to a useful next step?
- Is The Search Economy separated correctly?
- Is any copy more dramatic than the evidence supports?
