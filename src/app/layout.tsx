import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'

import { ConsentManager } from '@/components/consent/consent-manager'
import { ConsentProvider } from '@/components/consent/consent-provider'
import { ConsentedTags } from '@/components/consent/consented-tags'
import { OptionalAnalytics } from '@/components/consent/optional-analytics'
import { siteConfig } from '@/config/site'
import { readGaMeasurementId, readLinkedInPartnerId } from '@/lib/analytics/ids'
import { consentModeDefaultScript } from '@/lib/consent/google-consent-mode'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.categoryLine} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#071A2B',
  colorScheme: 'light',
}

const onVercel = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL)
const gaMeasurementId = readGaMeasurementId()
const linkedInPartnerId = readLinkedInPartnerId()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/*
          Consent Mode defaults must be queued before any Google tag is
          evaluated, which is why this is `beforeInteractive` and inline rather
          than a module import (docs/16 §3). It writes only to `dataLayer` and
          sends no request of its own.
        */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {consentModeDefaultScript}
        </Script>
      </head>
      <body className="antialiased">
        <ConsentProvider>
          {children}
          <ConsentManager />
          <OptionalAnalytics onVercel={onVercel} />
          <ConsentedTags
            gaMeasurementId={gaMeasurementId}
            linkedInPartnerId={linkedInPartnerId}
          />
        </ConsentProvider>
      </body>
    </html>
  )
}
