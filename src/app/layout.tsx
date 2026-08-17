import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { siteConfig } from '@/config/site'

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

/**
 * Both Vercel scripts are served by the platform at `/_vercel/*`, so mounting
 * them off-platform produces two 404s and two MIME-type console errors on every
 * page. They are only rendered when a Vercel environment is present.
 */
const onVercel = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {children}
        {onVercel ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  )
}
