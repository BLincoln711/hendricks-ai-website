import { siteConfig } from '@/config/site'

/**
 * Escapes characters that could break out of a <script> context.
 *
 * `<` is the critical one — an unescaped `</script>` inside a string value would
 * terminate the block early (docs/06 §9). U+2028/U+2029 are escaped because they
 * are valid JSON but invalid in JavaScript string literals.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/**
 * Organization node.
 *
 * Founding date, address, contact point, and sameAs are deliberately omitted
 * until verified — see CONTENT_VERIFICATION.md items O1–O4 and docs/06 §8.
 */
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: new URL('/brand/hendricks-wordmark-light.png', siteConfig.url).toString(),
      width: 2346,
      height: 507,
    },
    description: siteConfig.description,
    founder: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/about#person`,
      name: siteConfig.founder,
    },
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-US',
  }
}

export function webPageSchema({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-US',
  }
}

/**
 * Person node for the founder, emitted on /about only.
 *
 * `@id` matches the reference in `organizationSchema`. Every field here is
 * supported by visible copy on that page, as docs/06 §9 requires. `sameAs` is
 * omitted until the official profile list is approved (CONTENT_VERIFICATION.md
 * O4), and no employer, award, or credential is asserted while F3–F7 are pending.
 */
export function personSchema({
  jobTitle,
  imagePath,
}: {
  jobTitle: string
  imagePath: string
}) {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/about#person`,
    name: siteConfig.founder,
    jobTitle,
    url: new URL('/about', siteConfig.url).toString(),
    image: new URL(imagePath, siteConfig.url).toString(),
    worksFor: { '@id': `${siteConfig.url}/#organization` },
  }
}

export type BreadcrumbEntry = { label: string; href?: string }

export function breadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, siteConfig.url).toString() } : {}),
    })),
  }
}

/** Wraps nodes in a single @graph so each page emits one script tag. */
export function jsonLdGraph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
