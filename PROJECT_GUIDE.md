# Hendricks.AI Website - Project Guide

## 🎯 Quick Overview
This is your hendricks.ai website built with Next.js 14, TypeScript, and Tailwind CSS. Deployed on Vercel with automatic deployments from GitHub.

## 📁 Project Structure

```
hendricks-ai-website/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout with metadata
│   ├── metadata.ts              # SEO metadata configuration
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── solutions/               # Solutions page
│   ├── insights/                # Blog/insights section
│   │   ├── page.tsx            # Insights listing page
│   │   ├── what-is-search-intelligence-engineer/
│   │   ├── how-to-measure-chatgpt-visibility/
│   │   ├── what-is-ai-search-visibility-measurement/
│   │   ├── how-to-appear-in-google-ai-overviews/
│   │   └── search-agency-vs-search-intelligence-firm/
│   └── components/              # Page-specific components
├── components/                  # Shared/global components
│   └── GlobalSchemas.tsx       # Structured data schemas
├── public/                      # Static assets
│   ├── hendricks_logo.png      # Your logo
│   ├── og-image.jpg            # Social sharing image (1200x630px)
│   └── ...                     # Other images
└── ...config files
```

## 🚀 Quick Commands

### Development
```bash
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
```

### Deployment
```bash
git add .
git commit -m "Your message"
git push origin main    # Automatically triggers Vercel deployment
vercel --prod           # Manual deployment
```

## ✏️ Common Tasks

### 1. Update Homepage Content
**File:** `/app/page.tsx`
- Edit hero section, value props, testimonials
- Update FAQs, pricing, case studies

### 2. Edit Site Metadata (SEO)
**File:** `/app/metadata.ts`
- Change site title, description
- Update Open Graph settings
- Modify keywords

### 3. Add New Blog Post
1. Create folder: `/app/insights/your-post-slug/`
2. Create `page.tsx` inside
3. Copy structure from existing blog post
4. Add to insights listing in `/app/insights/page.tsx`

### 4. Update Navigation
**File:** `/app/layout.tsx`
- Modify nav links in the navigation component

### 5. Change Colors/Styling
**File:** `/tailwind.config.ts`
- Customize theme colors, fonts, etc.

### 6. Update Social Sharing Image
**File:** `/public/og-image.jpg`
- Must be exactly 1200x630px
- After updating, clear social media cache at:
  - LinkedIn: https://www.linkedin.com/post-inspector/
  - Twitter: https://cards-dev.twitter.com/validator
  - Facebook: https://developers.facebook.com/tools/debug/

## 🔧 Key Configuration Files

- **next.config.js** - Next.js configuration
- **tailwind.config.ts** - Tailwind CSS theme
- **tsconfig.json** - TypeScript settings
- **package.json** - Dependencies and scripts
- **vercel.json** - Vercel deployment settings

## 📊 SEO & Analytics

### Metadata
- Open Graph tags configured in `app/metadata.ts`
- Each page can override with custom metadata
- Structured data (JSON-LD) in `components/GlobalSchemas.tsx`

### Current Schema Markup
- Organization schema
- Website schema
- Breadcrumbs
- Article schema (blog posts)
- FAQ schema (blog posts)

## 🎨 Brand Assets

### Logo
- **File:** `/public/hendricks_logo.png`
- **Format:** "Hendricks." with blue dot
- **Usage:** Navigation, footer

### OG Image
- **File:** `/public/og-image.jpg`
- **Dimensions:** 1200x630px
- **Content:** Logo + "AI Search Visibility & Measurement" + Your name

### Colors
- **Primary Blue:** `#3b82f6`
- **Cyan:** `#60a5fa`
- **Purple:** Various purples for gradients
- **Dark Background:** `#020617`, `#0a0a0a`

## 🔗 Important URLs

- **Live Site:** https://hendricks.ai
- **GitHub Repo:** https://github.com/BLincoln711/hendricks-ai-website
- **Vercel Dashboard:** https://vercel.com/brandon-lincolns-projects/hendricks-ai-website

## 📝 Blog Post Template

When creating new blog posts:
1. Use existing posts as templates
2. Include all metadata (title, description, keywords)
3. Add Article schema markup
4. Add FAQ schema if applicable
5. Include breadcrumb navigation
6. Add to insights listing page
7. Include CTA buttons linking to `/contact`

## ⚡ Performance Tips

- Images should be optimized (use Next.js Image component)
- Keep bundle size small
- Use dynamic imports for heavy components
- Lighthouse score: Aim for 90+ on all metrics

## 🐛 Troubleshooting

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Deployment Issues
- Check Vercel dashboard for error logs
- Ensure all dependencies are in package.json
- Verify environment variables in Vercel

### TypeScript Errors
- Run `npm run build` to see all type errors
- Check `tsconfig.json` for strict settings

## 📞 Contact Form

Form submissions go to HubSpot (configured in `app/components/HubSpotTracking.tsx`)

## 🎯 Current Focus Areas

1. **Blog/Insights Growth** - 5 high-value SEO blog posts created
2. **Social Sharing** - Optimized OG image for LinkedIn, Twitter, Facebook
3. **Search Visibility** - Comprehensive FAQ sections and schema markup
4. **Personal Branding** - Brandon Lincoln Hendricks attribution

## 🔐 Access & Credentials

- **GitHub:** Connected to your account
- **Vercel:** Connected to your account
- **Domain:** hendricks.ai (managed via Vercel)

---

**Last Updated:** October 26, 2025
**Maintained By:** Brandon Lincoln Hendricks
**Built With:** ❤️ and Claude Code
