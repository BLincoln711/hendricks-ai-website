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
    /*
      "Hendricks" collides with a gin brand, a NASCAR team, an Indiana county,
      and a hospital system. Nothing in the graph currently tells a resolver
      which subject area this one occupies, so the name alone has to do all the
      disambiguating work and cannot.

      Every term below names a discipline the site visibly describes across
      /solutions, /methodology, and the definition pages. The two expanded
      abbreviations are the standard expansions of "GEO/AEO", which renders
      visibly in the discipline table at
      `content/pages/what-is-search-intelligence-engineering.ts:52`.

      None of these asserts a credential, a client, or a result, so none is
      gated on CONTENT_VERIFICATION.md. `slogan` is the visible homepage h1
      verbatim.
    */
    slogan: siteConfig.categoryLine,
    knowsAbout: [
      'Search Intelligence Engineering',
      'Selection Intelligence',
      'Answer engine optimization',
      'Generative engine optimization',
      'AI search visibility',
      'Search demand analysis',
      'Search impact measurement',
      'Organic search',
      'Paid search',
    ],
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

/**
 * WebPage node, or a supported subtype.
 *
 * `type` exists because docs/06 §8 names `AboutPage` for /about, and because a
 * bare `WebPage` on every route tells a parser nothing about what any page is.
 * Only subtypes schema.org actually defines are accepted.
 *
 * `mainEntity` is what declares a page's subject. Without it the only thing the
 * graph says about a definition page is that it belongs to a website.
 *
 * `datePublished` and `dateModified` are optional and must be passed ONLY for
 * pages carrying a visible date a reader can check. Stamping the rest with a
 * build date asserts a review that nobody performed.
 */
export function webPageSchema({
  path,
  title,
  description,
  type = 'WebPage',
  about,
  mainEntity,
  mainEntityFragment,
  hasBreadcrumb = false,
  datePublished,
  dateModified,
}: {
  path: string
  title: string
  description: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  /** Overrides the default `about: Organization`. Pass null to omit it entirely. */
  about?: { '@id': string } | null
  mainEntity?: { '@id': string }
  /**
   * Shorthand for a subject node defined on this same page, such as `service`
   * or `term`. Saves every caller from rebuilding the absolute URL, which is
   * where `@id` mismatches creep in.
   */
  mainEntityFragment?: string
  /** Set when the page renders <Breadcrumbs>, which emits the matching node. */
  hasBreadcrumb?: boolean
  datePublished?: string
  dateModified?: string
}) {
  const url = new URL(path, siteConfig.url).toString()
  const aboutNode = about === undefined ? { '@id': `${siteConfig.url}/#organization` } : about
  const subject = mainEntity ?? (mainEntityFragment ? { '@id': `${url}#${mainEntityFragment}` } : undefined)

  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    ...(aboutNode ? { about: aboutNode } : {}),
    ...(subject ? { mainEntity: subject } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    inLanguage: 'en-US',
  }
}

/**
 * Service node for a solution page.
 *
 * docs/06 §8 requires this on the solution pages and specifies that it use the
 * visible service description and provider information. Nothing in the graph
 * currently states what Hendricks sells.
 *
 * `offers` and `priceSpecification` are deliberately absent: fees are withheld
 * from the site, so any price node here would be unsupported by visible content.
 */
export function serviceSchema({
  path,
  name,
  description,
  serviceOutput,
}: {
  path: string
  name: string
  description: string
  /** Deliverable names, taken verbatim from the page's rendered list. */
  serviceOutput?: readonly string[]
}) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType: siteConfig.category,
    provider: { '@id': `${siteConfig.url}/#organization` },
    ...(serviceOutput?.length
      ? { serviceOutput: serviceOutput.map((item) => ({ '@type': 'Thing', name: item })) }
      : {}),
  }
}

/**
 * ItemList for an ordered sequence rendered visibly on the page.
 *
 * `ItemList` rather than `HowTo`: Google retired HowTo rich results, and these
 * are steps Hendricks performs, not steps the reader performs.
 */
export function itemListSchema({
  path,
  name,
  items,
}: {
  path: string
  name: string
  items: readonly { name: string; description?: string }[]
}) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    '@type': 'ItemList',
    '@id': `${url}#${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
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
  alumniOf,
}: {
  jobTitle: string
  imagePath: string
  /**
   * Former employers, verified per CONTENT_VERIFICATION.md F3 and F4.
   *
   * Only organizations Brandon was employed by belong here. Brands reached as
   * clients through a former employer are excluded by docs/12 §6, so this list
   * must never grow to include them.
   */
  alumniOf?: readonly string[]
}) {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/about#person`,
    name: siteConfig.founder,
    jobTitle,
    url: new URL('/about', siteConfig.url).toString(),
    image: new URL(imagePath, siteConfig.url).toString(),
    worksFor: { '@id': `${siteConfig.url}/#organization` },
    ...(alumniOf?.length
      ? { alumniOf: alumniOf.map((name) => ({ '@type': 'Organization', name })) }
      : {}),
  }
}

/**
 * DefinedTerm node for a definition page.
 *
 * docs/06 §8 allows this only where it reproduces visible content, and warns
 * against expecting a rich result from it. `description` is therefore the page's
 * visible direct answer verbatim, not a summary written for crawlers.
 *
 * The terms are grouped into one `DefinedTermSet` so the vocabulary reads as a
 * deliberate set rather than four unrelated pages.
 */
export function definedTermSchema({
  path,
  term,
  directAnswer,
}: {
  path: string
  term: string
  directAnswer: string
}) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    '@type': 'DefinedTerm',
    '@id': `${url}#term`,
    name: term,
    description: directAnswer,
    url,
    // Reference only. The set itself is emitted once, by definedTermSetSchema,
    // so the vocabulary resolves to a single node that actually lists members
    // rather than to an inline stub repeated on each page with none.
    inDefinedTermSet: { '@id': `${siteConfig.url}/#vocabulary` },
  }
}

/**
 * The vocabulary node itself, emitted alongside a DefinedTerm.
 *
 * Previously the set was inlined into every `DefinedTerm` with no
 * `hasDefinedTerm`, so it declared a named vocabulary containing nothing. The
 * members below are the definition pages that are actually built and live;
 * `isBuilt` keeps a term from being advertised before its page exists.
 */
export function definedTermSetSchema(terms: readonly { name: string; path: string }[]) {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${siteConfig.url}/#vocabulary`,
    name: 'Search Intelligence Engineering vocabulary',
    url: siteConfig.url,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    hasDefinedTerm: terms.map((term) => ({
      '@type': 'DefinedTerm',
      '@id': `${new URL(term.path, siteConfig.url).toString()}#term`,
      name: term.name,
      url: new URL(term.path, siteConfig.url).toString(),
    })),
  }
}

export type BreadcrumbEntry = { label: string; href?: string }

export function breadcrumbSchema(items: BreadcrumbEntry[], path?: string) {
  // The `@id` lets a page's WebPage node reference this list by `breadcrumb`
  // instead of leaving it floating unattached in the document.
  const id = path ? `${new URL(path, siteConfig.url).toString()}#breadcrumb` : undefined
  return {
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
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
