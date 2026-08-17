import type { NextConfig } from 'next'

/**
 * Security headers (docs/08 §8).
 *
 * CSP is deliberately absent at this phase. docs/08 §8 warns against copying a
 * policy without testing it against analytics, Sanity preview, images, and form
 * integrations — none of which are wired yet. It lands in Phase 7 in
 * report-only mode first.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
