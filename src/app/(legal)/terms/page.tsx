import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal/legal-document'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { termsOfUse } from '@/content/legal/terms'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: termsOfUse.meta.title,
  description: termsOfUse.meta.description,
  path: routes.terms.path,
})

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.terms.path,
            title: termsOfUse.meta.title,
            description: termsOfUse.meta.description,
          }),
        )}
      />

      <LegalDocument document={termsOfUse} />
    </>
  )
}
