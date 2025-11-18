'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

const SITE_URL = 'https://hendricks.ai'
const DEFAULT_DESCRIPTION =
  'The AI Search Visibility & Measurement Firm for B2B Growth. We unify marketing, data, and AI to measure visibility, prove ROI, and amplify performance across Google, Bing, ChatGPT, Gemini, and Perplexity.'

const titleFromPath = (pathname: string) => {
  if (pathname === '/' || pathname === '') return 'Hendricks.AI'
  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .join(' | ')
}

const buildBreadcrumbs = (pathname: string, pageTitle: string) => {
  const segments = pathname.split('/').filter(Boolean)
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ]

  segments.forEach((segment, index) => {
    const readableName = segment
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
    const url = `${SITE_URL}/${segments.slice(0, index + 1).join('/')}`

    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: readableName,
      item: url,
    })
  })

  if (items.length === 1) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pageTitle,
      item: `${SITE_URL}${pathname === '/' ? '' : pathname}`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

const buildWebPageSchema = (
  pathname: string,
  pageTitle: string,
  pageDescription: string
) => {
  const url = `${SITE_URL}${pathname === '/' ? '' : pathname}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: pageTitle,
    description: pageDescription || DEFAULT_DESCRIPTION,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_URL,
      name: 'Hendricks.AI',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hendricks.AI',
      url: SITE_URL,
    },
  }
}

export default function PageSchemas() {
  const pathname = usePathname() || '/'
  const [webPageSchema, setWebPageSchema] = useState<object | null>(null)
  const [breadcrumbSchema, setBreadcrumbSchema] = useState<object | null>(null)

  useEffect(() => {
    const pageTitle = document.title || titleFromPath(pathname)
    const metaDescription =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') || DEFAULT_DESCRIPTION

    setWebPageSchema(buildWebPageSchema(pathname, pageTitle, metaDescription))
    setBreadcrumbSchema(buildBreadcrumbs(pathname, pageTitle))
  }, [pathname])

  if (!webPageSchema || !breadcrumbSchema) return null

  return (
    <>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
