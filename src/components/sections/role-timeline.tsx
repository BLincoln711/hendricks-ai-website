import { SignalDot } from '@/components/visuals/signal-dot'

export type Role = {
  title: string
  organization: string
  relationship: string
  period: string
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
    <ol className="flex flex-col gap-10 border-l border-[color-mix(in_srgb,var(--color-slate)_28%,transparent)] pl-8">
      {roles.map((role) => (
        <li key={`${role.organization}-${role.title}`} className="relative">
          <SignalDot
            size={8}
            tone="blue"
            className="absolute -left-[2.3125rem] top-2 shrink-0"
          />

          <h3 className="text-lg font-semibold text-[var(--color-navy)]">{role.title}</h3>

          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-[var(--color-graphite)]">
            <span className="font-medium">{role.organization}</span>
            <span aria-hidden="true" className="text-[var(--color-slate)]">
              /
            </span>
            <span className="text-[var(--color-slate)]">{role.period}</span>
            <span aria-hidden="true" className="text-[var(--color-slate)]">
              /
            </span>
            <span className="text-[var(--color-slate)]">{role.relationship}</span>
          </p>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
            {role.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
