import { Container } from '@/components/layout/container'
import { Eyebrow } from '@/components/layout/eyebrow'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { CtaGroup, PrimaryCta } from '@/components/ui/cta'
import type { Cta } from '@/components/ui/cta'

/**
 * Closing CTA band (09 5.43; D3, light): the total line of the ledger. A 5 px
 * double rule above and below, eyebrow, H2 at left, optional body, then the
 * primary and secondary buttons. Sits inside `main` (B12) on the page ground;
 * no navy. Replaces `sections/closing-cta.tsx`, which is deleted with its
 * last consumer in PR 13.
 *
 * Copy comes from the route's typed content object; the labels are the two
 * locked CTAs.
 */
export function ClosingBand({
  eyebrow,
  title,
  body,
  primaryCta,
  secondaryCta,
  id = 'closing-band-title',
}: {
  eyebrow?: string
  title: string
  body?: readonly string[]
  primaryCta: Cta
  secondaryCta?: Cta
  /** The H2's id, which labels the section. */
  id?: string
}) {
  return (
    <Section variant="field" size="major" ariaLabelledBy={id}>
      <Container>
        <div className="border-y-[5px] border-double border-[var(--ledger-rule-total)] py-[var(--space-heading-to-body)]">
          <Grid className="gap-y-8">
            <div className="col-span-full flex flex-col gap-4 md:col-[3/11]">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <h2 id={id} className="text-h2 max-w-[var(--measure-h2)] text-ink">
                {title}
              </h2>
              {body?.map((paragraph) => (
                <p key={paragraph} className="text-lead measure-wide text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
            <CtaGroup className="col-span-full md:col-[3/13]">
              <PrimaryCta cta={primaryCta} />
              {secondaryCta ? <PrimaryCta cta={secondaryCta} variant="secondary" /> : null}
            </CtaGroup>
          </Grid>
        </div>
      </Container>
    </Section>
  )
}
