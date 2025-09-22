# Image and Iframe Accessibility Audit for hendricks-ai-new

## Summary
This audit identifies images and iframes in the codebase that need proper alt text or title attributes for better accessibility and SEO.

## Images with Good Alt Text ✓

These images already have descriptive alt text:

1. **Brandon Lincoln Hendricks headshot images**
   - `/app/about/page.tsx` - Line 179: `alt="Brandon Lincoln Hendricks - Founder & CEO of Hendricks.AI"`
   - `/app/brandon-lincoln-hendricks/page.tsx` - Line 320: `alt="Brandon Lincoln Hendricks"`
   - `/app/authors/brandon-lincoln-hendricks/page.tsx` - Uses `/brandon-headshot.jpg` with `alt="Brandon Lincoln Hendricks"`
   - `/app/news/[slug]/page.tsx` - Uses `/brandon-headshot.jpg` with `alt={article.author}`

2. **Hendricks.AI logo images**
   All logo instances have `alt="Hendricks.AI"`:
   - `/app/components/navigation.tsx` - Line 29
   - `/app/components/footer.tsx` - Line 12
   - `/app/sales-deck/slides/CoverSlide.tsx` - Line 18
   - `/app/about/page.tsx` (navigation)
   - `/app/brandon-lincoln-hendricks/page.tsx` - Line 235
   - Multiple other pages with consistent alt text

## Iframes Missing Title Attributes ⚠️

All iframes in the codebase are missing the `title` attribute, which is required for accessibility:

1. **`/app/news/[slug]/modern-measurement-meets-predictive-ai.tsx`**
   ```tsx
   <iframe 
     src="/blog-images/google-meridian-mmm-visualization.html" 
     class="w-full h-[630px] rounded-2xl border border-gray-800"
   ```
   **Suggested title**: "Interactive Google Meridian MMM Visualization"

2. **`/app/insights/b2b-marketing-funnel-is-dead/page.tsx`**
   ```tsx
   <iframe 
     src="/blog-images/b2b-funnel-chaos-visualization.html" 
     className="w-full h-[630px] rounded-2xl border border-gray-800"
   ```
   **Suggested title**: "B2B Marketing Funnel Chaos Interactive Visualization"

3. **`/app/insights/ai-marketing-beyond-smart-bidding/page.tsx`**
   ```tsx
   <iframe 
     src="/blog-images/ai-smart-bidding-visualization.html" 
     class="w-full h-[630px] rounded-2xl border border-gray-800"
   ```
   **Suggested title**: "AI Smart Bidding Strategy Interactive Visualization"

4. **`/app/insights/[slug]/page.tsx`** (Two instances)
   - First iframe:
     ```tsx
     <iframe 
       src="/blog-images/predictive-ai-future-marketing.html" 
       class="w-full h-[630px] rounded-2xl border border-gray-800"
     ```
     **Suggested title**: "Predictive AI Future of Marketing Interactive Visualization"
   
   - Second iframe:
     ```tsx
     <iframe 
       src="/blog-images/google-bing-performance-max-visualization.html" 
       class="w-full h-[630px] rounded-2xl border border-gray-800"
     ```
     **Suggested title**: "Google and Bing Performance Max Interactive Visualization"

5. **`/app/insights/page.tsx`**
   ```tsx
   <iframe 
     src={post.image}
     className="w-full h-full border-0"
   ```
   **Suggested implementation**: Add dynamic title based on post title
   ```tsx
   title={`${post.title} Interactive Visualization`}
   ```

## Recommendations

### 1. Add Title Attributes to All Iframes
Every iframe should have a descriptive title attribute that explains the content for screen reader users.

### 2. Image Alt Text Best Practices
- All current images have appropriate alt text ✓
- Continue using descriptive alt text for any new images
- For decorative images, use `alt=""` (empty but present)
- For complex images, consider adding longer descriptions

### 3. Additional Accessibility Improvements
Consider these additional improvements:
- Add `loading="lazy"` to images below the fold
- Ensure all interactive visualizations within iframes are keyboard accessible
- Add ARIA labels where appropriate for complex UI elements

## Next Steps

1. Add title attributes to all 6 iframe instances identified above
2. Test with screen readers to ensure descriptions are helpful
3. Consider adding aria-label or aria-describedby for additional context where needed
4. Run automated accessibility tools (like axe DevTools) after fixes are implemented