import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { CtaGroup, PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'

/** Final CTA band used by every commercial page (docs/14 §3). */
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
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            id="closing-cta-title"
            maxWidth="wide"
            onNavy
          />

          {body ? (
            <div className="flex flex-col gap-4 measure">
              {body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lead text-[color-mix(in_srgb,var(--color-field)_74%,transparent)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <CtaGroup className="mt-2">
            <PrimaryCta cta={primaryCta} />
            {secondaryCta ? <PrimaryCta cta={secondaryCta} variant="outlineOnNavy" /> : null}
          </CtaGroup>
        </div>
      </Container>
    </Section>
  )
}
