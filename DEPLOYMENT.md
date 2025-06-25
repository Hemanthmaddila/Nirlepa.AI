# 🚀 Deploy Your Nirlepa Website to Netlify

Your agricultural AI website is ready to go live! Follow this simple guide to deploy it for free on Netlify.

## Quick Deployment (5 minutes)

### Method 1: Drag & Drop Deployment (Recommended)

1. **Build your site first:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with optimized files.

2. **Go to Netlify Drop:**
   - Sign up for free at [netlify.com](https://www.netlify.com/)
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)

3. **Drag & Drop:**
   - Drag your entire `dist` folder to the drop zone
   - Your site will be live instantly!

4. **Customize your URL:**
   - Click "Domain settings"
   - Change from random name to something like `nirlepa-agricultural-ai.netlify.app`

### Method 2: GitHub + Netlify (For ongoing updates)

1. **Initialize Git and push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Nirlepa agricultural AI website"
   git branch -M main
   git remote add origin https://github.com/yourusername/nirlepa-website.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - In Netlify dashboard, click "New site from Git"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy!

## Custom Domain (Optional)

For a professional domain like `nirlepa.com`:

1. **Purchase a domain** from:
   - Namecheap
   - GoDaddy  
   - Google Domains
   - Cloudflare

2. **Configure in Netlify:**
   - Go to Domain settings
   - Add custom domain
   - Follow DNS setup instructions

## Alternative Hosting Options

| Platform | Best For | Effort | Custom Domain |
|----------|----------|---------|---------------|
| **Netlify** | Easy deployment + features | Minimal | Easy |
| **Vercel** | Similar to Netlify | Minimal | Easy |
| **GitHub Pages** | Free + simple | Medium | Medium |
| **Cloudflare Pages** | Performance | Minimal | Easy |

## Performance Tips

Your site is already optimized with:
- ✅ Three.js 3D animations (loads conditionally)
- ✅ Responsive images
- ✅ Minified CSS/JS
- ✅ Fast loading animations

## Next Steps After Deployment

1. **Test your live site** on different devices
2. **Update contact email** to your real address
3. **Add Google Analytics** (optional)
4. **Submit to search engines**
5. **Share with investors and partners!**

## Troubleshooting

**3D animations not working?**
- Check browser console for Three.js errors
- Animations automatically disable on mobile for performance

**Contact form not working?**
- Form currently shows success message
- Integrate with Netlify Forms, EmailJS, or your backend

**Site not updating?**
- Clear browser cache
- Check if you're viewing the right URL

---

**Your website is now ready to showcase Nirlepa's agricultural AI mission to the world! 🌱** 