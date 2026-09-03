import { SignalDot } from '@/components/visuals/signal-dot'

export type Role = {
  title: string
  organization: string
  relationship: string
  period: string
  /**
   * ISO 8601 `YYYY-MM`, optional on both ends. Supplied only where the record is
   * verified in CONTENT_VERIFICATION.md; a role whose start month the repo does
   * not hold omits them rather than inferring one. When both are present they
   * become the `datetime` attributes of the period, which is otherwise a prose
   * string no parser can read.
   */
  startDate?: string
  endDate?: string
  description: string
}

/**
 * Founder career record, oldest first.
 *
 * Rendered as an ordered list because the sequence carries meaning: the
 * enterprise agency role precedes the in-house one, and the firm follows both.
 *
 * Periods are published per CONTENT_VERIFICATION.md F3 and F4, sourced from
 * LinkedIn. docs/12 §7 additionally requires the relationship to be stated,
 * so each entry carries both.
 */
export function RoleTimeline({ roles }: { roles: readonly Role[] }) {
  return (
    <ol className="flex flex-col gap-10 border-l border-rule-2 pl-8">
      {roles.map((role) => {
        /*
         * The `<time>` pair is opt-in and never reformats the approved string:
         * it wraps the two halves of `role.period` verbatim, and any period that
         * does not split cleanly on " to " (the Founder row reads "Present")
         * falls through to the plain text. A caller that supplies no dates
         * renders exactly what it rendered before.
         */
        const [periodStart, periodEnd] = role.period.split(' to ')
        const hasMachineReadableDates = Boolean(
          role.startDate && role.endDate && periodStart && periodEnd,
        )

        return (
          <li key={`${role.organization}-${role.title}`} className="relative">
            <SignalDot
              size={8}
              tone="blue"
              className="absolute -left-[2.3125rem] top-2 shrink-0"
            />

            {/*
              The organization belongs in the heading. On its own the title is a
              generic job label that names no employer, and the three headings
              read as a career only when the heading itself says where the work
              happened. Both strings are approved copy; the meta line below drops
              its duplicate rather than repeating the organization twice.
            */}
            <h3 className="text-lg font-semibold text-ink">
              {role.title}, {role.organization}
            </h3>

            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-ink-3">
              <span className="text-ink-2">
                {hasMachineReadableDates ? (
                  <>
                    <time dateTime={role.startDate}>{periodStart}</time> to{' '}
                    <time dateTime={role.endDate}>{periodEnd}</time>
                  </>
                ) : (
                  role.period
                )}
              </span>
              <span aria-hidden="true" className="text-ink-2">
                /
              </span>
              <span className="text-ink-2">{role.relationship}</span>
            </p>

            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">
              {role.description}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
