import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { InlineText } from '@/components/legal/inline-text'
import { routes } from '@/config/routes'
import { appeal, hero, meta } from '@/content/legal/privacy-request'
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
                  <InlineText text={paragraph} />
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

      {/*
        Appeal copy sits below the form, not inside it. Inside the form it was
        lost on submission: the success state early-returns in place of the whole
        form, which took the page's only publication of the appeal address with
        it at exactly the moment a reader has a decision to appeal.
      */}
      <Section variant="field" size="small" ariaLabelledBy="privacy-appeal-title">
        <Container width="narrow">
          <div className="flex flex-col gap-3">
            <h2
              id="privacy-appeal-title"
              className="text-[1.0625rem] font-medium text-[var(--color-navy)]"
            >
              {appeal.title}
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
              {appeal.body}
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
