import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { CtaGroup, PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'

/**
 * The navy closing band the live pages still render. Replaced by the light
 * `sections/closing-band.tsx` (09 5.43) and deleted with its last consumer in
 * PR 13; until then it keeps its navy `Section`, whose `.on-plate` re-scopes
 * every token the heading and the secondary button read.
 */
export function ClosingCta({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string
  title: string
  body?: readonly string[]
  primaryCta: Cta
  secondaryCta?: Cta
}) {
  return (
    <Section variant="navy" size="major" ariaLabelledBy="closing-cta-title">
      <Container>
        <div className="flex flex-col items-start gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} id="closing-cta-title" maxWidth="wide" />

          {body ? (
            <div className="measure-wide flex flex-col gap-4">
              {body.map((paragraph) => (
                <p key={paragraph} className="text-lead text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <CtaGroup className="mt-2">
            <PrimaryCta cta={primaryCta} />
            {secondaryCta ? <PrimaryCta cta={secondaryCta} variant="secondary" /> : null}
          </CtaGroup>
        </div>
      </Container>
    </Section>
  )
}
