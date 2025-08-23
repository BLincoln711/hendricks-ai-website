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
    name: 'Brandon Lincoln Hendricks'
  }
}

// WebSite schema for search
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification: Alternative HTML method */}
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