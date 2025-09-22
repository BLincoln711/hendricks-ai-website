import Script from 'next/script'

export default function GlobalSchemas() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hendricks.AI',
    description: 'The AI Search Intelligence Firm for B2B SaaS. We unify Google & Bing into one AI-driven system that predicts demand, proves ROI, and engineers execution.',
    url: 'https://hendricks.ai',
    logo: 'https://hendricks.ai/hendricks_logo.png',
    sameAs: [
      'https://linkedin.com/company/hendricks-ai',
      'https://twitter.com/hendricksai'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    knowsAbout: [
      'Search Intelligence',
      'B2B SaaS Marketing',
      'Google Ads Management',
      'Bing Ads Management',
      'Multi-touch Attribution',
      'Incrementality Testing',
      'Demand Prediction',
      'Pipeline Attribution'
    ],
    founder: {
      '@type': 'Person',
      name: 'Brandon Lincoln Hendricks',
      jobTitle: 'Founder & Search Intelligence Engineer',
      url: 'https://hendricks.ai/about/brandon-lincoln-hendricks',
      sameAs: [
        'https://www.linkedin.com/in/brandonlincolnhendricks/',
        'https://twitter.com/hendricksai'
      ],
      alumniOf: [
        {
          '@type': 'Organization',
          name: 'SolarWinds',
          description: 'Former Global Lead of Total Search'
        },
        {
          '@type': 'Organization',
          name: 'Dentsu/Merkle',
          description: 'Former Global Search Director'
        }
      ]
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Demand Radar Pilot',
        description: 'AI-powered demand forecasting 2-4 weeks in advance',
        price: '10000',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '10000',
          priceCurrency: 'USD',
          unitText: 'MONTH'
        }
      },
      {
        '@type': 'Offer',
        name: 'Search ROI Audit',
        description: 'Multi-touch attribution and incrementality testing',
        priceRange: '15000-25000',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        name: 'Performance Retainer',
        description: 'Unified Google & Bing search execution',
        price: '30000',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '30000',
          priceCurrency: 'USD',
          unitText: 'MONTH',
          minPrice: '30000'
        }
      }
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://hendricks.ai',
    name: 'Hendricks.AI',
    description: 'The AI Search Intelligence Firm for B2B SaaS',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hendricks.ai/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
    </>
  )
}