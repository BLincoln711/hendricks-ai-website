import { Metadata } from 'next'

export const siteConfig = {
  name: 'Hendricks.AI',
  description: 'The AI Search Visibility & Measurement Firm for B2B Growth. We unify marketing, data, and AI to measure visibility, prove ROI, and amplify performance across Google, Bing, ChatGPT, Gemini, and Perplexity.',
  url: 'https://hendricks.ai',
  ogImage: 'https://hendricks.ai/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/hendricksai',
    linkedin: 'https://linkedin.com/company/hendricks-ai',
  },
}

export const defaultMetadata: Metadata = {
  title: {
    default: 'Hendricks.AI | AI Search Visibility & Measurement Firm for B2B Growth',
    template: '%s | Hendricks.AI'
  },
  description: siteConfig.description,
  keywords: [
    'AI search visibility',
    'search visibility measurement',
    'B2B search attribution',
    'AI search marketing firm',
    'measure search visibility',
    'ChatGPT visibility',
    'Gemini AI search',
    'Perplexity search coverage',
    'Google Bing unified',
    'Brandon Lincoln Hendricks',
    'Hendricks.AI',
    'AI search ecosystem',
    'search visibility audit',
    'attribution engine',
    'pipeline attribution',
    'CFO-ready measurement',
    'search ROI attribution',
    'unified search execution',
    'AI visibility execution',
    'Google Cloud Vertex AI',
    'B2B growth marketing',
    'SaaS marketing attribution',
    'multi-touch attribution',
    'AI-powered visibility',
    'search coverage measurement',
    'AI search optimization'
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
    title: 'Hendricks.AI | AI Search Visibility & Measurement Firm for B2B Growth',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Hendricks.AI - Measure Visibility, Attribute Pipeline, Amplify Performance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hendricks.AI | AI Search Visibility & Measurement Firm for B2B Growth',
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
    google: 'E7JSaK23DaXqx3yMqAiM1WHNx6zrcWrg9zJ5yvfZN4I',
    yandex: '', // Add when you register with Yandex Webmaster
    yahoo: '', // Add when you register with Yahoo Site Explorer
  },
}