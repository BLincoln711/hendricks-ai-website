import { serializeJsonLd } from '@/lib/seo/json-ld'

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Serialized through an escaping helper, never raw interpolation.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
