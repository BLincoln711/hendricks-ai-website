import { Metadata } from 'next'

export const siteConfig = {
  name: 'Hendricks.AI',
  description: 'Prediction. Proof. Performance. Hendricks.AI unifies Google & Bing into one AI-driven Search Intelligence System for B2B SaaS pipeline growth.',
  url: 'https://hendricks.ai',
  ogImage: 'https://hendricks.ai/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/hendricksai',
    linkedin: 'https://linkedin.com/company/hendricks-ai',
  },
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'Hendricks.AI | The AI Search Intelligence Firm for B2B SaaS',
    template: '%s | Hendricks.AI'
  },
  description: siteConfig.description,
  keywords: [
    'AI search intelligence',
    'B2B SaaS search agency',
    'Google Ads Bing Ads unified',
    'search intelligence firm',
    'B2B SaaS attribution',
    'incrementality testing SaaS',
    'Brandon Lincoln Hendricks',
    'Hendricks.AI',
    'unified search management',
    'Google Bing unification',
    'B2B demand prediction',
    'SaaS pipeline attribution',
    'cross-channel measurement',
    'search ROI audit',
    'demand radar pilot',
    'predictive search intelligence',
    'B2B SaaS PPC agency',
    'Google Ads B2B SaaS',
    'Bing Ads B2B SaaS',
    'SaaS marketing attribution',
    'CFO ready dashboards',
    'multi-touch attribution B2B',
    'search incrementality testing',
    'AI driven search optimization',
    'unified search orchestration'
  ],
  authors: [{ name: 'Hendricks.AI' }],
  creator: 'Hendricks.AI',
  publisher: 'Hendricks.AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hendricks.AI | The AI Search Intelligence Firm for B2B SaaS',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Hendricks.AI - Search Intelligence for B2B SaaS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hendricks.AI | The AI Search Intelligence Firm for B2B SaaS',
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@hendricksai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}