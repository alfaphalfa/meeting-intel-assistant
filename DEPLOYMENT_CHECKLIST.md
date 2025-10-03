# Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment ✅

### Code Quality
- [ ] All TypeScript errors resolved (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] All components render correctly
- [ ] API routes tested and working
- [ ] No console errors in browser

### Environment Setup
- [ ] `.env.local.example` created with clear instructions
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.local` NOT committed to git
- [ ] Anthropic API key obtained and tested locally

### Configuration Files
- [ ] `package.json` updated with correct metadata
- [ ] `vercel.json` configured properly
- [ ] `.gitignore` includes all sensitive files
- [ ] `README.md` has deployment instructions

### Testing
- [ ] Tested with sample meeting
- [ ] Tested with custom meeting transcript
- [ ] Tested error states (empty input, API errors)
- [ ] Tested on mobile viewport
- [ ] Tested export functionality
- [ ] All features working as expected

## Git Repository ✅

- [ ] Repository created on GitHub
- [ ] All files committed (except .env.local)
- [ ] Main branch is clean
- [ ] README.md is informative
- [ ] Repository is public or accessible to reviewers

```bash
# Initialize git if needed
git init
git add .
git commit -m "Initial commit - Netflix Meeting Intelligence"
git branch -M main
git remote add origin <your-github-url>
git push -u origin main
```

## Vercel Deployment ✅

### Account Setup
- [ ] Vercel account created
- [ ] GitHub connected to Vercel

### Project Import
- [ ] Project imported from GitHub
- [ ] Framework detected as Next.js
- [ ] Build settings look correct

### Environment Variables
- [ ] `ANTHROPIC_API_KEY` added
- [ ] Set for Production environment
- [ ] Set for Preview environment
- [ ] Set for Development environment

### Deploy
- [ ] Deployment initiated
- [ ] Build completed successfully
- [ ] No build errors
- [ ] Deployment URL accessible

## Post-Deployment ✅

### Functionality Check
- [ ] Homepage loads correctly
- [ ] Netflix theme displays properly
- [ ] "Load Sample" button works
- [ ] "Analyze Meeting" processes successfully
- [ ] Results display correctly
- [ ] All 5 sections show data
- [ ] Export functionality works
- [ ] Metrics dashboard shows
- [ ] DocQA component works
- [ ] Footer displays correctly

### Performance Check
- [ ] Page loads in < 3 seconds
- [ ] API responses in 5-15 seconds
- [ ] No console errors in production
- [ ] Mobile responsive layout works
- [ ] Images/icons load properly

### Security Check
- [ ] No API keys exposed in client code
- [ ] Environment variables not visible to users
- [ ] Security headers set (check vercel.json)
- [ ] HTTPS enabled (automatic with Vercel)

### Final Polish
- [ ] Custom domain configured (optional)
- [ ] Meta tags for SEO (optional)
- [ ] Favicon updated (optional)
- [ ] Analytics added (optional)

## Common Issues & Solutions 🔧

### Build Fails
```bash
# Locally test production build
npm run build

# Check for TypeScript errors
npm run lint
```

### API Returns 500 Error
- Check Vercel environment variables
- Verify `ANTHROPIC_API_KEY` is correct
- Check Vercel function logs

### Blank Page After Deploy
- Check browser console for errors
- Verify build completed successfully
- Check Vercel deployment logs

### Slow Performance
- Check Vercel Analytics
- Review API response times
- Verify region is optimal

## Rollback Procedure 🔄

If deployment has critical issues:

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." menu → "Promote to Production"
4. Confirm rollback

Or via CLI:
```bash
vercel rollback
```

## Post-Deployment Updates 🚀

### Continuous Deployment
Vercel automatically deploys when you push to main:
```bash
git add .
git commit -m "Update: feature description"
git push origin main
# Vercel will auto-deploy
```

### Environment Variable Updates
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Edit or add variables
4. Redeploy for changes to take effect

## Success Criteria ✨

Deployment is successful when:
- ✅ Production URL loads without errors
- ✅ Sample meeting analysis works end-to-end
- ✅ Mobile responsive verified
- ✅ API response times acceptable
- ✅ Export functionality works
- ✅ No console errors
- ✅ All demo features functional

---

## Ready to Deploy? 🎬

If all boxes above are checked, your app is ready for production!

**Deployment URL**: [Add your Vercel URL here after deployment]

**Demo Credentials**: None required (public demo)

**Support**: Check DEPLOYMENT.md for detailed troubleshooting

---

Built for the **Product Manager - GenAI Position** at Netflix 🎬
