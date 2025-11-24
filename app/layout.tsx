import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { defaultMetadata } from './metadata'
import Script from 'next/script'
import HubSpotTracking from './components/HubSpotTracking'
import GoogleTagManager from './components/GoogleTagManager'
import GTMNoScript from './components/GTMNoScript'
import GlobalSchemas from '../components/GlobalSchemas'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = defaultMetadata

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

        {/* Google Tag Manager - handles GA4 through GTM */}
        <GoogleTagManager />
      </head>
      <body className={inter.className}>
        {/* GTM NoScript Fallback (must be immediately after opening body tag) */}
        <GTMNoScript />

        {/* Existing Tracking */}
        <HubSpotTracking />
        <GlobalSchemas />

        {children}
      </body>
    </html>
  )
}