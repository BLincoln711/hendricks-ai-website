import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { defaultMetadata } from './metadata'
import Script from 'next/script'
import HubSpotTracking from './components/HubSpotTracking'
import AIChat from './components/ai-chat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata

// Schema markup for organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hendricks.AI',
  description: 'Predictive AI Marketing Agency that predicts market demand 2-4 weeks early with 74% accuracy',
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
    'Predictive AI Marketing',
    'Demand Intelligence',
    'Google Performance Max',
    'Bing Performance Max',
    'Marketing Analytics',
    'Demand Forecasting'
  ],
  founder: {
    '@type': 'Person',
    name: 'Brandon Hendricks'
  }
}

// WebSite schema for search
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://hendricks.ai',
  name: 'Hendricks.AI',
  description: 'Predictive AI Marketing Agency',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://hendricks.ai/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification - Alternative HTML method */}
        <meta name="google-site-verification" content="E7JSaK23DaXqx3yMqAiM1WHNx6zrcWrg9zJ5yvfZN4I" />
      </head>
      <body className={inter.className}>
        <HubSpotTracking />
        
        {/* Schema.org structured data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        
        {children}
        <AIChat />
      </body>
    </html>
  )
}