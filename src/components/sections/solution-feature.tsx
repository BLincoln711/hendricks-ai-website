import { TextCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'
import { SignalDot } from '@/components/visuals/signal-dot'
import { SolutionMotif, type Motif } from '@/components/visuals/solution-motif'

export type SolutionFeatureData = {
  number: string
  name: string
  title: string
  description: string
  outputs: readonly string[]
  motif: Motif
  cta: Cta
}

/**
 * One solution on the Solutions overview (docs/13 §7).
 *
 * Alternates the motif from side to side so four solutions do not read as four
 * identical rows, while keeping one consistent reading order: number, name,
 * headline, description, outputs, link.
 */
export function SolutionFeature({
  solution,
  reverse = false,
}: {
  solution: SolutionFeatureData
  reverse?: boolean
}) {
  return (
    <article className="grid gap-8 border-t border-[var(--color-border)] py-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16 lg:py-14">
      <div className={reverse ? 'flex flex-col gap-5 lg:order-2' : 'flex flex-col gap-5'}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[0.875rem] text-[var(--color-blue)]">
            {solution.number}
          </span>
          <h3 className="text-eyebrow text-[var(--color-slate)]">{solution.name}</h3>
        </div>

        <p className="text-h3 text-[var(--color-navy)]">{solution.title}</p>

        <p className="measure text-[1.0625rem] leading-relaxed text-[var(--color-slate)]">
          {solution.description}
        </p>

        <div>
          <TextCta cta={solution.cta} />
        </div>
      </div>

      <div
        className={
          reverse
            ? 'flex flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 lg:order-1'
            : 'flex flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6'
        }
      >
        <SolutionMotif motif={solution.motif} />

        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] pt-5">
          <h4 className="text-eyebrow text-[var(--color-slate)]">Primary outputs</h4>
          <ul className="flex flex-col gap-2">
            {solution.outputs.map((output) => (
              <li key={output} className="flex items-start gap-2.5">
                <SignalDot size={6} className="mt-2 shrink-0" />
                <span className="text-[0.9375rem] leading-relaxed text-[var(--color-graphite)]">
                  {output}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
