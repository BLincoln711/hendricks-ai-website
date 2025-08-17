# Adding Brandon's Headshot to Website

## Steps to Add Your Headshot:

1. **Save the image** from our chat as `brandon-headshot.jpg`

2. **Place it in one of these locations:**
   - `/public/brandon-headshot.jpg` (recommended)
   - `/public/images/brandon-headshot.jpg`

3. **Commit to Git:**
   ```bash
   cd /Users/brandonlhendricks/claudecode/hendricks-ai-new
   git add public/brandon-headshot.jpg
   git commit -m "Add Brandon headshot for email signature and website"
   git push origin main
   ```

4. **The image will be accessible at:**
   - `https://hendricks.ai/brandon-headshot.jpg`

## Updated Email Signature HTML:

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif;">
    <tbody>
        <tr>
            <td style="vertical-align: middle; padding-right: 20px;">
                <!-- YOUR HEADSHOT -->
                <img src="https://hendricks.ai/brandon-headshot.jpg" 
                     alt="Brandon Lincoln Hendricks" 
                     style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; display: block;"
                />
            </td>
            
            <td style="vertical-align: middle; padding-left: 20px; border-left: 3px solid #0066FF;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                        <tr>
                            <td style="padding-bottom: 6px;">
                                <div style="font-size: 18px; font-weight: bold; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.2;">
                                    Brandon Lincoln Hendricks
                                </div>
                                <div style="font-size: 14px; color: #0066FF; font-family: Arial, sans-serif; margin-top: 2px;">
                                    Founder & Search Intelligence Engineer
                                </div>
                                <div style="font-size: 13px; color: #666666; font-family: Arial, sans-serif; margin-top: 2px;">
                                    <strong style="color: #333333;">Hendricks.AI</strong> | Predictive AI Marketing Agency
                                </div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding-top: 8px;">
                                <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; color: #666666; font-family: Arial, sans-serif;">
                                    <tr>
                                        <td style="padding-right: 15px;">
                                            <a href="mailto:brandon@hendricks.ai" style="color: #666666; text-decoration: none;">📧 brandon@hendricks.ai</a>
                                        </td>
                                        <td style="padding-right: 15px;">
                                            <a href="https://hendricks.ai" style="color: #0066FF; text-decoration: none;">🌐 hendricks.ai</a>
                                        </td>
                                        <td>
                                            <a href="https://www.linkedin.com/in/brandonlincolnhendricks/" style="color: #0066FF; text-decoration: none;">💼 LinkedIn</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="padding-top: 8px;">
                                <div style="font-size: 13px; font-family: Arial, sans-serif;">
                                    <a href="https://calendar.app.google/DHopiSfnLiH5xwKo9" style="color: #0066FF; text-decoration: none; font-weight: 500;">
                                        📅 Schedule a Strategy Call
                                    </a>
                                </div>
                                <div style="font-size: 12px; color: #333333; font-family: Arial, sans-serif; font-style: italic; line-height: 1.4; margin-top: 8px;">
                                    "While your competitors react to yesterday's data,<br>
                                    you'll be capturing tomorrow's demand."
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
```

## Where Else to Use Your Headshot:

1. **About Page**: Update `/app/about/page.tsx` to use the same image
2. **Team Section**: If you add a team page later
3. **Author Bio**: In blog posts
4. **Sales Deck**: For personal introduction slides