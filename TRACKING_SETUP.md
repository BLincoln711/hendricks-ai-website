# Hendricks.AI Analytics & Tracking Setup

## Overview
This document outlines the complete analytics implementation for hendricks.ai, including Google Tag Manager (GTM), Google Analytics 4 (GA4), and custom event tracking.

## 🎯 Why This Matters
As an **attribution company**, having robust tracking is essential for:
- Demonstrating ROI to clients by example
- Understanding customer journey across touchpoints
- Proving multi-touch attribution methodology
- Measuring effectiveness of visibility efforts

---

## 📋 Prerequisites

### 1. Create Google Tag Manager Account
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Create a new account for "Hendricks.AI"
3. Create a container for "hendricks.ai" (Web)
4. Copy your Container ID (format: `GTM-XXXXXXX`)

### 2. Create Google Analytics 4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for "Hendricks.AI"
3. Set up a Web data stream for `hendricks.ai`
4. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 3. Link GA4 to GTM (Recommended)
1. In GTM, create a new Tag
2. Tag Type: "Google Analytics: GA4 Configuration"
3. Measurement ID: Enter your GA4 ID
4. Trigger: "All Pages"
5. Save and publish

---

## 🚀 Installation Steps

### Step 1: Set Environment Variables
1. Create `.env.local` file in the project root (copy from `.env.local.example`)
2. Add your IDs:
   ```bash
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

### Step 2: Verify Installation
The following files have been created/updated:
- ✅ `app/components/GoogleTagManager.tsx` - GTM script loader
- ✅ `app/components/GoogleAnalytics.tsx` - GA4 script loader
- ✅ `app/components/GTMNoScript.tsx` - NoScript fallback
- ✅ `app/layout.tsx` - Updated with tracking components
- ✅ `lib/analytics.ts` - Custom event tracking utilities

### Step 3: Deploy Changes
```bash
# Build and test locally
npm run build
npm run dev

# Deploy to Vercel (add environment variables in Vercel dashboard)
vercel --prod
```

### Step 4: Add Environment Variables to Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_GTM_ID` = `GTM-XXXXXXX`
   - `NEXT_PUBLIC_GA4_ID` = `G-XXXXXXXXXX`
3. Redeploy: `vercel --prod`

---

## 📊 Custom Event Tracking

### Available Tracking Functions
Located in `lib/analytics.ts`:

#### 1. CTA Tracking
```typescript
import { trackCTA } from '@/lib/analytics'

trackCTA('Book Strategy Session', 'Hero Section')
trackCTA('Download AI Playbook', 'Navigation')
```

#### 2. Service Interest Tracking
```typescript
import { trackServiceInterest } from '@/lib/analytics'

trackServiceInterest('Visibility Audit', '$10K')
trackServiceInterest('Attribution Engine', '$15K-25K')
trackServiceInterest('AI Visibility Execution', '$30K+')
```

#### 3. Form Tracking
```typescript
import { trackFormStart, trackFormSubmit, trackFormError } from '@/lib/analytics'

trackFormStart('Strategy Session Form')
trackFormSubmit('Strategy Session Form')
trackFormError('Strategy Session Form', 'Invalid email')
```

#### 4. Download Tracking
```typescript
import { trackDownload } from '@/lib/analytics'

trackDownload('2025 AI Search Playbook', 'PDF')
```

#### 5. Navigation Tracking
```typescript
import { trackNavigation } from '@/lib/analytics'

trackNavigation('Solutions', '/solutions')
```

#### 6. Conversion Tracking
```typescript
import { trackConversion } from '@/lib/analytics'

trackConversion('Demo Booked', 10000)
trackConversion('Lead Generated')
```

---

## 🎨 Implementation Examples

### Example: Track CTA Button Click
```typescript
'use client'

import { trackCTA } from '@/lib/analytics'

export default function CTAButton() {
  const handleClick = () => {
    trackCTA('Book Strategy Session', 'Hero Section')
    // Redirect or open modal
  }

  return (
    <button onClick={handleClick}>
      Book Strategy Session
    </button>
  )
}
```

### Example: Track Form Submission
```typescript
'use client'

import { trackFormStart, trackFormSubmit } from '@/lib/analytics'
import { useState } from 'react'

export default function ContactForm() {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => {
    if (!focused) {
      trackFormStart('Contact Form')
      setFocused(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackFormSubmit('Contact Form')
    // Submit form
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onFocus={handleFocus} type="email" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## 🔍 Recommended GTM Setup

### Tags to Configure in GTM

#### 1. GA4 Configuration Tag
- **Tag Type**: Google Analytics: GA4 Configuration
- **Measurement ID**: Your GA4 ID
- **Trigger**: All Pages

#### 2. Scroll Depth Tracking
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: scroll
- **Trigger**: Scroll Depth (25%, 50%, 75%, 100%)

#### 3. Outbound Link Tracking
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: outbound_click
- **Trigger**: Click - All Links (filter for external URLs)

#### 4. Form Abandonment
- **Tag Type**: Google Analytics: GA4 Event
- **Event Name**: form_abandonment
- **Trigger**: Form started but not submitted within 2 minutes

### Variables to Create in GTM
- Click Text
- Click URL
- Form ID
- Page Path
- Scroll Depth Threshold

---

## 📈 Key Metrics to Track (Attribution Focus)

### Micro-Conversions
- [ ] CTA clicks (Book Strategy Session, Download Playbook)
- [ ] Service tier interactions (hover, click, scroll)
- [ ] Form starts vs. completions
- [ ] Time on page (engagement quality)
- [ ] Scroll depth (content consumption)
- [ ] Navigation patterns

### Macro-Conversions
- [ ] Strategy session bookings
- [ ] Lead magnet downloads
- [ ] Contact form submissions
- [ ] Demo requests

### Attribution Touchpoints
- [ ] First touch (how they found you)
- [ ] Last touch (what converted them)
- [ ] Assisted conversions (middle touches)
- [ ] Cross-channel journeys

---

## 🧪 Testing Your Setup

### 1. Test GTM Installation
1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Visit your site
3. Verify GTM container is firing
4. Check for errors

### 2. Test GA4 Installation
1. Go to GA4 → Reports → Realtime
2. Visit your website
3. Confirm you see your session in real-time
4. Test custom events by triggering CTAs

### 3. Debug Custom Events
```javascript
// Open browser console and check dataLayer
console.log(window.dataLayer)

// Test a custom event
import { trackCTA } from '@/lib/analytics'
trackCTA('Test CTA', 'Console Test')
```

---

## 🔐 Privacy & Compliance

### Cookie Consent (Future Enhancement)
Consider adding:
- Cookie consent banner (GDPR/CCPA compliance)
- Opt-out mechanism for tracking
- Cookie policy page

### Recommended Libraries
- [CookieYes](https://www.cookieyes.com/)
- [OneTrust](https://www.onetrust.com/)
- [Osano](https://www.osano.com/)

---

## 📞 Next Steps

1. **Get Your IDs**
   - [ ] Create GTM account and container
   - [ ] Create GA4 property and data stream
   - [ ] Add IDs to `.env.local`

2. **Configure GTM**
   - [ ] Link GA4 to GTM
   - [ ] Set up scroll depth tracking
   - [ ] Configure outbound link tracking
   - [ ] Create custom event triggers

3. **Implement Event Tracking**
   - [ ] Add tracking to CTA buttons (navigation, hero section)
   - [ ] Add tracking to service tier cards
   - [ ] Add tracking to HubSpot forms
   - [ ] Add tracking to download buttons

4. **Test & Validate**
   - [ ] Test in dev environment
   - [ ] Deploy to production with env vars
   - [ ] Verify GTM and GA4 are firing
   - [ ] Test custom events in GA4 Realtime

5. **Create Dashboards**
   - [ ] GA4: Attribution funnel (awareness → consideration → conversion)
   - [ ] GA4: Service tier interest comparison
   - [ ] GTM: Event tracking summary

---

## 🆘 Troubleshooting

### GTM Not Loading
- Check environment variable is set: `echo $NEXT_PUBLIC_GTM_ID`
- Verify ID format: `GTM-XXXXXXX`
- Check browser console for errors
- Disable ad blockers

### GA4 Not Tracking
- Verify Measurement ID format: `G-XXXXXXXXXX`
- Check GA4 Realtime reports (events may take 24-48 hours for full reports)
- Ensure GA4 is linked in GTM if using GTM method

### Events Not Firing
- Check `window.dataLayer` in browser console
- Verify event names match GA4 configuration
- Test with GA4 DebugView mode

---

## 📚 Resources

- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GTM for Single Page Apps](https://www.simoahava.com/analytics/single-page-applications-guide-google-tag-manager/)

---

**Questions?** Contact Brandon at brandon@hendricks.ai
