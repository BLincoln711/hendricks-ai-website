import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { routes } from '@/config/routes'
import { hero, meta } from '@/content/legal/privacy-request'
import { requestTimestamp } from '@/lib/forms/request-time'
import { buildMetadata } from '@/lib/seo/metadata'

import { PrivacyRequestForm } from './privacy-request-form'

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: routes.privacyRequest.path,
  // A transactional form with no informational value in search results, and one
  // that should not compete with the Privacy Notice for the same queries.
  index: false,
})

export default async function PrivacyRequestPage() {
  const startedAt = await requestTimestamp()

  return (
    <>
      <Section variant="field" size="standard" ariaLabelledBy="privacy-request-title">
        <Container width="narrow">
          <div className="flex flex-col gap-6">
            <p className="text-eyebrow text-[var(--color-slate)]">{hero.eyebrow}</p>
            <h1 id="privacy-request-title" className="text-h1 text-[var(--color-navy)]">
              {hero.title}
            </h1>
            <div className="flex flex-col gap-4">
              {hero.lead.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[1.0625rem] leading-relaxed text-[var(--color-graphite)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="white" size="standard">
        <Container width="narrow">
          <PrivacyRequestForm startedAt={startedAt} />
        </Container>
      </Section>
    </>
  )
}
