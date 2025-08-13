import { Metadata } from 'next'

export const siteConfig = {
  name: 'Hendricks.AI',
  description: 'Predictive AI Marketing Agency serving the United States - See demand 2-4 weeks early with 74% accuracy. Master Google Performance Max & Bing Performance Max. 312% average ROI.',
  url: 'https://hendricks.ai',
  ogImage: 'https://hendricks.ai/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/hendricksai',
    linkedin: 'https://linkedin.com/company/hendricks-ai',
  },
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'Hendricks.AI | Predictive AI Marketing Agency | 74% Accuracy, 312% ROI',
    template: '%s | Hendricks.AI'
  },
  description: siteConfig.description,
  keywords: [
    'predictive AI marketing',
    'demand intelligence platform',
    'Google Performance Max agency',
    'Bing Performance Max agency',
    'AI marketing agency USA',
    'predictive demand forecasting',
    'marketing intelligence United States',
    'demand capture',
    'AI-powered marketing',
    'predictive analytics marketing',
    'US marketing agency',
    'nationwide AI marketing'
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
    title: 'Hendricks.AI | Predictive AI Marketing Agency',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Hendricks.AI - Predictive AI Marketing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hendricks.AI | Predictive AI Marketing Agency',
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