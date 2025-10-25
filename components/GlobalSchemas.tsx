import Script from 'next/script'

export default function GlobalSchemas() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hendricks.AI',
    description: 'The AI Search Visibility & Measurement Firm for B2B Growth. We unify marketing, data, and AI to measure visibility, prove ROI, and amplify performance across Google, Bing, ChatGPT, Gemini, and Perplexity.',
    url: 'https://hendricks.ai',
    logo: 'https://hendricks.ai/hendricks_logo.png',
    sameAs: [
      'https://linkedin.com/company/hendricks-ai',
      'https://twitter.com/hendricksai'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    knowsAbout: [
      'AI Search Visibility',
      'Search Visibility Measurement',
      'B2B Growth Marketing',
      'Google Search Marketing',
      'Bing Search Marketing',
      'ChatGPT Visibility',
      'Gemini AI Search',
      'Perplexity Search Coverage',
      'Multi-touch Attribution',
      'Pipeline Attribution',
      'Search ROI Measurement',
      'Unified Search Execution',
      'AI-Powered Visibility',
      'Google Cloud Vertex AI',
      'CFO-Ready Dashboards'
    ],
    founder: {
      '@type': 'Person',
      name: 'Brandon Lincoln Hendricks',
      jobTitle: 'Founder & CEO',
      description: 'Certified Google Cloud Machine Learning Engineer',
      url: 'https://hendricks.ai/about',
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
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional Certification',
          name: 'Google Cloud Machine Learning Engineer'
        }
      ]
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Search Visibility & Measurement Services',
      itemListElement: [
        {
          '@type': 'Service',
          name: 'Visibility Audit',
          description: 'Measure your brand visibility across Google, Bing, ChatGPT, Gemini, and Perplexity. See where you show up, where competitors win, and which keywords drive visibility at scale.',
          provider: {
            '@type': 'Organization',
            name: 'Hendricks.AI'
          }
        },
        {
          '@type': 'Service',
          name: 'Attribution Engine',
          description: 'Connect every marketing dollar to pipeline, ARR, and revenue with CFO-ready measurement. Multi-touch attribution and incrementality testing to prove ROI.',
          provider: {
            '@type': 'Organization',
            name: 'Hendricks.AI'
          }
        },
        {
          '@type': 'Service',
          name: 'AI Visibility Execution',
          description: 'Unify Google and Bing search execution under one AI-powered system. Automated optimization, unified reporting, and amplified performance.',
          provider: {
            '@type': 'Organization',
            name: 'Hendricks.AI'
          }
        }
      ]
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://hendricks.ai',
    name: 'Hendricks.AI',
    description: 'The AI Search Visibility & Measurement Firm for B2B Growth',
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