# Quick Start: GTM & GA4 Setup (5 Minutes)

## ⚡ Fast Track Implementation

### Step 1: Get Your IDs (3 min)

**GTM Setup:**
1. Go to [tagmanager.google.com](https://tagmanager.google.com/)
2. Click "Create Account" → Name: "Hendricks.AI"
3. Container Name: "hendricks.ai" → Platform: Web
4. Copy your **Container ID** (format: `GTM-XXXXXXX`)

**GA4 Setup:**
1. Go to [analytics.google.com](https://analytics.google.com/)
2. Admin → Create Property → Name: "Hendricks.AI"
3. Create Data Stream → Web → URL: `https://hendricks.ai`
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add to Project (1 min)

Create `.env.local` in project root:
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

### Step 3: Deploy (1 min)

**Local Testing:**
```bash
npm run dev
```
Open browser console and type: `window.dataLayer`
You should see an array with GTM data.

**Production Deploy:**
1. Go to Vercel Dashboard → hendricks-ai → Settings → Environment Variables
2. Add both variables above
3. Redeploy: `vercel --prod`

---

## ✅ Verify It's Working

### Test GTM
1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit hendricks.ai
3. Click Tag Assistant icon → Should show GTM container firing

### Test GA4
1. Go to GA4 → Reports → Realtime
2. Visit hendricks.ai in another tab
3. Should see your session appear in real-time

---

## 🎯 Quick Wins: Add Tracking to Existing CTAs

### Example: Track "Book Strategy Session" Button

Find your CTA button component and add:

```typescript
'use client'
import { trackCTA } from '@/lib/analytics'

// Add to your button onClick
onClick={() => {
  trackCTA('Book Strategy Session', 'Hero Section')
  // ... rest of your click handler
}}
```

### Example: Track Service Interest

```typescript
'use client'
import { trackServiceInterest } from '@/lib/analytics'

// When user clicks service card
onClick={() => {
  trackServiceInterest('Visibility Audit', '$10K')
}}
```

---

## 📊 See Your Data

**Within 5 minutes:**
- GA4 → Realtime → Events (see clicks happening live)

**Within 24 hours:**
- GA4 → Reports → Engagement → Events (see event summaries)
- GA4 → Reports → Acquisition → Traffic Acquisition

**Within 7 days:**
- GA4 → Explore → Create custom funnels
- Build attribution reports showing multi-touch journeys

---

## 🚨 Troubleshooting (30 seconds)

**"I don't see GTM loading"**
```bash
# Check your env var is set
echo $NEXT_PUBLIC_GTM_ID

# Should output: GTM-XXXXXXX
# If empty, you forgot to create .env.local
```

**"GA4 shows no data"**
- Wait 5 minutes (not instant)
- Check Realtime (not main reports)
- Disable ad blockers
- Check format: `G-XXXXXXXXXX` (not `UA-XXXXXXX`)

---

## 📝 Next Steps

See full documentation: [TRACKING_SETUP.md](./TRACKING_SETUP.md)

**Recommended:**
1. Link GA4 to GTM (easier management)
2. Add event tracking to all CTAs
3. Set up conversion goals in GA4
4. Create attribution funnel report

---

**Total Time: ~5 minutes to get tracking live**
**Full setup with events: ~30 minutes**

Questions? brandon@hendricks.ai
