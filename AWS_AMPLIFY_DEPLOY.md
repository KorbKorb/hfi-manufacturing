# AWS Amplify Deployment Guide - HFI Manufacturing

**Quick deployment to AWS Amplify's free tier for public demo**

---

## Why AWS Amplify?

✅ **Free Tier:**
- 1000 build minutes/month
- 15 GB data transfer/month
- 5 GB storage
- Free SSL certificate
- Free subdomain (yourapp.amplifyapp.com)

✅ **Perfect for Next.js:**
- Auto-detects Next.js configuration
- Automatic builds from GitHub
- Zero configuration needed
- Deploy in ~5 minutes

---

## Step-by-Step Deployment

### Step 1: Sign in to AWS Console

1. Go to: https://console.aws.amazon.com/
2. Sign in or create a free AWS account
3. Search for "Amplify" in the search bar
4. Click "AWS Amplify"

---

### Step 2: Create New App

1. Click **"New app"** → **"Host web app"**
2. Select **GitHub** as the source
3. Click **"Continue"**

**First time?** You'll need to authorize AWS Amplify to access your GitHub:
- Click "Authorize AWS Amplify"
- Sign in to GitHub if prompted
- Click "Authorize aws-amplify-console"

---

### Step 3: Select Repository

1. **Repository:** Select `hfi-manufacturing`
2. **Branch:** Select `master`
3. Click **"Next"**

---

### Step 4: Configure Build Settings

AWS Amplify will auto-detect your Next.js app. The build settings should look like this:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**Important:** Make sure these settings are present:
- Build command: `npm run build`
- Output directory: `out`

Click **"Next"**

---

### Step 5: Review and Deploy

1. Review your settings:
   - App name: `hfi-manufacturing` (or customize)
   - Environment: `main`
   - Branch: `master`

2. Click **"Save and deploy"**

---

### Step 6: Wait for Deployment

The deployment process takes about 3-5 minutes:

**Phases you'll see:**
1. ✅ Provision (30 seconds)
2. ✅ Build (2-3 minutes)
3. ✅ Deploy (1 minute)
4. ✅ Verify (30 seconds)

**Status:** Watch the build logs in real-time

---

### Step 7: Get Your Live URL

Once deployment completes, you'll see:

**Your Live Site:**
```
https://master.xxxxxx.amplifyapp.com
```

**Share this URL** with anyone - your site is now live! 🎉

---

## Quick Access

**After first deployment:**

1. **View your site:**
   - Go to AWS Amplify Console
   - Click on your app name
   - Click the live URL

2. **Future updates:**
   - Just push to GitHub (`git push origin master`)
   - Amplify auto-deploys in ~3 minutes
   - No manual work needed!

---

## Troubleshooting

### Build Fails?

**Check these:**

1. **Verify `next.config.js` has `output: 'export'`** ✅ (Already configured)
2. **Check build logs** in Amplify Console for errors
3. **Verify `package.json` has correct scripts** ✅ (Already configured)

### Common Issues:

**Issue:** "Build failed - command not found"
**Fix:** Check that `npm run build` works locally first

**Issue:** "Module not found"
**Fix:** Commit `package-lock.json` to ensure dependencies match

**Issue:** "404 on routes"
**Fix:** Add rewrites in Amplify Console:
- Go to "Rewrites and redirects"
- Add: `/*` → `/index.html` → `200`

---

## Custom Domain (Optional)

Want your own domain instead of `.amplifyapp.com`?

1. In Amplify Console, click **"Domain management"**
2. Click **"Add domain"**
3. Enter your domain (e.g., `hfimfg.com`)
4. Follow DNS configuration steps
5. Free SSL certificate included!

**Cost:** Just the domain registration (~$12/year)
**Note:** You can skip this for now and use the free `.amplifyapp.com` domain

---

## Free Tier Limits

Your site should stay within free tier with typical demo traffic:

| Resource | Free Tier | Typical Usage |
|----------|-----------|---------------|
| Build minutes | 1000/month | ~20 builds = 60 min |
| Data transfer | 15 GB/month | ~1000 visitors |
| Storage | 5 GB | 0.1 GB (your site) |

**Beyond free tier?** Costs are minimal:
- Build minutes: $0.01/minute
- Data transfer: $0.15/GB

---

## Deployment Checklist

Before deploying, verify:

- [x] ✅ Code pushed to GitHub (master branch)
- [x] ✅ `output: 'export'` in `next.config.js`
- [x] ✅ `npm run build` works locally
- [x] ✅ All images in `public/` directory
- [ ] Create AWS account (if needed)
- [ ] Deploy to Amplify (5 minutes)
- [ ] Test live URL
- [ ] Share with others!

---

## Next Steps After Deployment

1. **Test the live site:**
   - Check all pages load correctly
   - Test the Quote Wizard
   - Verify images display properly
   - Test mobile responsiveness

2. **Share the URL:**
   - Copy the `.amplifyapp.com` URL
   - Send to stakeholders/clients
   - Get feedback!

3. **Monitor usage:**
   - Check Amplify Console for traffic stats
   - Review build logs if issues arise

4. **Update the site:**
   - Make changes locally
   - Commit: `git add . && git commit -m "Update"`
   - Push: `git push origin master`
   - Amplify auto-deploys in ~3 minutes

---

## Alternative: AWS S3 + CloudFront (Manual)

If you prefer the original deployment plan (documented in `AWS_DEPLOYMENT_GUIDE.md`):

**Pros:**
- More control
- Slightly cheaper at scale
- Already documented

**Cons:**
- Manual setup (15-20 minutes)
- No automatic deployments
- More complex

**Recommendation:** Start with Amplify (easiest), migrate to S3+CloudFront later if needed.

---

## Cost Comparison

| Service | Setup Time | Monthly Cost | Auto-Deploy |
|---------|-----------|--------------|-------------|
| **Amplify** (recommended) | 5 min | **FREE** (demo traffic) | ✅ Yes |
| S3 + CloudFront | 20 min | ~$0.50 | ❌ Manual |
| EC2 | 30 min | ~$3.50 | ❌ Manual |

**For sharing a demo:** Amplify is the clear winner! 🏆

---

## Security Notes

**Your site is public** at the `.amplifyapp.com` URL:
- ✅ Free SSL certificate (HTTPS enabled)
- ✅ DDoS protection included
- ✅ CDN (fast global delivery)

**Don't expose:**
- ❌ AWS credentials (already secured - not in client code)
- ❌ API keys (use environment variables in Amplify)
- ❌ Private data

**Current status:**
- ✅ No AWS credentials in code
- ✅ Presigned URLs configured
- ✅ Ready for public demo

---

## Quick Reference Commands

**Build locally to test:**
```bash
npm run build
```

**View build output:**
```bash
cd out
python -m http.server 8000
# Visit: http://localhost:8000
```

**Push updates:**
```bash
git add .
git commit -m "Your update message"
git push origin master
# Amplify auto-deploys in ~3 minutes
```

---

## Support

**AWS Amplify Documentation:**
- https://docs.amplify.aws/

**Troubleshooting:**
- Check Amplify Console build logs
- Review error messages
- Test build locally first

**Need help?**
- Check the AWS Amplify Console logs
- Run `npm run build` locally to verify
- Check `next.config.js` configuration

---

## Summary: 5-Minute Deployment

1. Go to: https://console.aws.amazon.com/amplify
2. Click "New app" → "Host web app"
3. Connect GitHub → Select `hfi-manufacturing`
4. Keep default build settings
5. Click "Save and deploy"
6. Wait 3-5 minutes
7. Copy your live URL: `https://master.xxxxx.amplifyapp.com`
8. **Done!** Share your site 🚀

---

**Your site is ready to deploy!** Just follow the steps above and you'll have a live demo URL in 5 minutes.

**Free tier = Perfect for demos, client reviews, and portfolio showcases!**
