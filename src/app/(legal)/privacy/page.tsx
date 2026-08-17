import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal/legal-document'
import { JsonLd } from '@/components/seo/json-ld'
import { routes } from '@/config/routes'
import { privacyNotice } from '@/content/legal/privacy'
import { jsonLdGraph, webPageSchema } from '@/lib/seo/json-ld'
import { buildMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildMetadata({
  title: privacyNotice.meta.title,
  description: privacyNotice.meta.description,
  path: routes.privacy.path,
})

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          webPageSchema({
            path: routes.privacy.path,
            title: privacyNotice.meta.title,
            description: privacyNotice.meta.description,
          }),
        )}
      />

      <LegalDocument document={privacyNotice} />
    </>
  )
}
