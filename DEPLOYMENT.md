# Deployment Guide - Meeting Intelligence Assistant

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] Production build succeeds (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint errors
- [x] All components render correctly
- [x] API routes tested and working

### ✅ Environment Setup
- [x] `.env.local` exists with valid `ANTHROPIC_API_KEY`
- [x] `.env.local` is in `.gitignore`
- [x] Environment variables documented in README

### ✅ Performance
- [x] First Load JS: ~93 KB (optimized ✓)
- [x] Images optimized (none currently)
- [x] Bundle size acceptable
- [x] No console errors in production build

### ✅ Security
- [x] API key never committed to git
- [x] API routes validate input
- [x] Error messages don't leak sensitive info
- [x] CORS not overly permissive

### ✅ Documentation
- [x] README.md complete
- [x] TESTING.md created
- [x] API routes documented
- [x] Installation steps clear

## Vercel Deployment Steps

### 1. Prepare Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Meeting Intelligence Assistant"

# Create GitHub repository and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

5. Add Environment Variables:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `your_actual_api_key_here`

6. Click "Deploy"
7. Wait 2-3 minutes for build

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? meeting-intel-assistant
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add ANTHROPIC_API_KEY production

# Deploy to production
vercel --prod
```

### 3. Post-Deployment Verification

Once deployed, test these:

#### ✅ Basic Functionality
- [ ] Homepage loads correctly
- [ ] Netflix theme displays properly
- [ ] "Load Sample" button works
- [ ] Sample meeting loads
- [ ] "Analyze Meeting" processes successfully
- [ ] Results display correctly
- [ ] All 5 categories show data
- [ ] Collapsible sections work

#### ✅ API Routes
- [ ] `/api/analyze` endpoint accessible
- [ ] Returns proper JSON
- [ ] Handles errors gracefully
- [ ] Environment variable configured correctly

#### ✅ Performance
- [ ] Page loads in < 3 seconds
- [ ] API responses in 5-15 seconds
- [ ] No console errors
- [ ] Animations smooth

#### ✅ Mobile
- [ ] Test on actual mobile device
- [ ] Responsive layout works
- [ ] Touch interactions work
- [ ] Viewport scales correctly

### 4. Domain Setup (Optional)

If using custom domain:

1. Go to Vercel dashboard → Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)
5. Enable HTTPS (automatic)

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | `sk-ant-api03-...` |

### Adding Environment Variables in Vercel

**Via Dashboard:**
1. Project Settings → Environment Variables
2. Add each variable
3. Select environment: Production, Preview, Development
4. Save

**Via CLI:**
```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_API_KEY preview
vercel env add ANTHROPIC_API_KEY development
```

## Monitoring & Maintenance

### Vercel Dashboard

Monitor these metrics:
- **Deployments**: Build status, duration
- **Analytics**: Page views, performance
- **Logs**: Runtime logs, errors
- **Usage**: Function invocations, bandwidth

### Key Metrics to Watch

- **Build Time**: Should be < 2 minutes
- **Cold Start Time**: First function invocation < 1 second
- **API Response Time**: 5-15 seconds (Claude API)
- **Error Rate**: Should be < 1%

### Common Issues

#### Build Fails
```bash
# Locally test production build
npm run build

# Check for TypeScript errors
npm run lint
```

#### API Returns 500 Error
- Check environment variables in Vercel dashboard
- Verify `ANTHROPIC_API_KEY` is set correctly
- Check function logs in Vercel dashboard

#### Slow Performance
- Check Vercel Analytics for bottlenecks
- Review API response times
- Consider caching strategies (future enhancement)

## Rollback Procedure

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." menu → "Promote to Production"
4. Confirm rollback

Or via CLI:
```bash
vercel rollback
```

## CI/CD (Optional)

For automatic deployments on push:

1. **GitHub Integration**: Already enabled when connecting repo
2. **Automatic Deployments**:
   - Push to `main` → Production
   - Push to other branches → Preview
3. **Branch Protection**: Configure in GitHub settings

### Preview Deployments

Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team for review
- Automatically cleaned up when PR closes

## Scaling Considerations

Current setup handles:
- **Concurrent Users**: 100+ (Vercel serverless scales automatically)
- **API Calls**: Limited by Anthropic API rate limits
- **Storage**: None required (stateless)

For higher scale:
- Consider Redis caching for repeated analyses
- Implement request queuing
- Add rate limiting per user
- Monitor Anthropic API quotas

## Security Best Practices

### ✅ Implemented
- API key in environment variables
- Input validation on API routes
- Error messages sanitized
- HTTPS by default (Vercel)

### 🔄 Recommended Enhancements
- Add rate limiting to prevent abuse
- Implement user authentication
- Add CORS restrictions if API used externally
- Set up monitoring/alerting

## Support & Troubleshooting

### Vercel Support
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Discord](https://vercel.com/discord)

### Application Logs
```bash
# View real-time logs
vercel logs <deployment-url> --follow

# View logs for specific function
vercel logs <deployment-url> --function api/analyze
```

## Cost Estimation

### Vercel (Free Tier)
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Preview deployments

**Likely Cost**: $0/month (within free tier limits)

### Anthropic API
- Pay per token usage
- Sonnet 4: ~$3 per million input tokens
- Typical meeting analysis: ~1,000-2,000 tokens
- Estimated cost: $0.003-$0.006 per analysis

**Estimated Monthly Cost** (100 analyses/month): ~$0.50-$1.00

**Total Monthly Cost**: ~$0.50-$1.00 (assuming free Vercel tier)

---

## Quick Deploy Commands

```bash
# Full deployment from scratch
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main

# Then on Vercel:
# 1. Import repository
# 2. Add ANTHROPIC_API_KEY
# 3. Deploy

# Verify
curl https://<your-domain>/api/analyze \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"meetingText":"Test meeting"}'
```

## Success Criteria

Deployment is successful when:
- ✅ Production URL loads without errors
- ✅ Sample meeting analysis works end-to-end
- ✅ Mobile responsive layout confirmed
- ✅ API response times acceptable (< 15s)
- ✅ No console errors in production
- ✅ Analytics/monitoring active

---

**Ready to deploy!** 🚀
