'use client'

import Script from 'next/script'

export default function HubSpotTracking() {
  const hubspotId = '243591804'
  
  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src={`//js-na2.hs-scripts.com/${hubspotId}.js`}
    />
  )
}