import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { SectionHeading } from '@/components/layout/section-heading'
import { SignalList } from '@/components/ui/signal-list'

export type NamedDeliverable = {
  name: string
  description: string
}

/**
 * Deliverables block. Takes either a flat list of artifact names or named
 * deliverables with definitions — docs/12 §6 forbids publishing a metric or
 * artifact name without a definition where one is expected, so pages that have
 * approved descriptions use the `detailed` form.
 */
export function Deliverables({
  eyebrow = 'Deliverables',
  title,
  lead,
  items,
  detailed,
}: {
  eyebrow?: string
  title: string
  lead?: string
  items?: readonly string[]
  detailed?: readonly NamedDeliverable[]
}) {
  return (
    <Section variant="field" size="major" ariaLabelledBy="deliverables-title">
      <Container>
        <div className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={lead}
            id="deliverables-title"
            maxWidth="wide"
          />

          {detailed ? (
            <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {detailed.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 border-t-2 border-path pt-5"
                >
                  <dt className="text-[1.0625rem] font-medium text-ink">
                    {item.name}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-ink-2">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {items ? <SignalList items={items} columns={2} /> : null}
        </div>
      </Container>
    </Section>
  )
}
