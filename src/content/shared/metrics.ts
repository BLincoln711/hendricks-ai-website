import type { MetricDefinition } from '@/components/visuals/metric-definitions'

/**
 * The five Hendricks metric definitions, stated once (docs/17 §3.7, docs/12 §6).
 *
 * Two pages defined the same measures in different words.
 * `/what-is-selection-intelligence` defined all five.
 * `/solutions/selection-intelligence` defined four, and three of those four
 * disagreed with the definition page: Observed Consideration Rate, Observed
 * Recommendation Rate, and Selection Stability.
 *
 * docs/12 §6 forbids publishing a metric without a definition. Publishing two
 * definitions of one metric is the same defect wearing a suit, so the wording is
 * settled here and both pages import it.
 *
 * Where the two pages disagreed, the solutions-page wording won, because it
 * states the unit, a percentage of defined test contexts, rather than a frequency
 * adverb. A rate described as "how frequently" is not a rate a buyer can audit.
 * Evidence Coverage and Commercial Selection Gap were never in conflict and are
 * carried unchanged.
 *
 * `/what-is-selection-intelligence` remains the canonical location for the
 * reader, because a defined term belongs on the page that defines the term. This
 * module is where the strings live, not a second place to read them.
 *
 * Order is the definition page's order and is load-bearing: the two observed
 * rates, then the stability measure that qualifies them, then the two measures
 * that sit around the result.
 */
export const metricDefinitions = [
  {
    name: 'Observed Consideration Rate',
    definition:
      'The commercially weighted percentage of defined test contexts in which the brand is presented as a legitimate option.',
  },
  {
    name: 'Observed Recommendation Rate',
    definition:
      'The commercially weighted percentage of defined test contexts in which the brand is explicitly favored or recommended.',
  },
  {
    name: 'Selection Stability',
    definition:
      'The consistency of consideration or recommendation across reasonable variations in context, wording, platform, location, and time.',
  },
  {
    name: 'Evidence Coverage',
    definition:
      'How much clear, current, and corroborated evidence exists for claims needed to win priority decisions.',
  },
  {
    name: 'Commercial Selection Gap',
    definition:
      'The value-weighted difference between the client’s observed position and the relevant benchmark.',
  },
] as const satisfies readonly MetricDefinition[]

/**
 * The four measures a Selection Intelligence baseline reports. Evidence Coverage
 * belongs to the definition page and is not part of that subset, which is the
 * only reason `/solutions/selection-intelligence` ever carried a shorter list of
 * its own. Derived rather than retyped, so the two lists cannot drift.
 */
export const baselineMetricDefinitions = metricDefinitions.filter(
  (metric) => metric.name !== 'Evidence Coverage',
) satisfies readonly MetricDefinition[]
