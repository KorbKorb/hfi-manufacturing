# Vercel Deployment Guide - HFI Manufacturing

**Instant free deployment with one command**

---

## Why Vercel?

✅ **Perfect for Next.js:**
- Built by the Next.js team
- Zero configuration needed
- Deploy in 2 minutes
- 100% free for hobby projects

✅ **Free Tier:**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Free subdomain: `yourapp.vercel.app`
- GitHub auto-deployments

---

## One-Command Deployment

**From your project directory, run:**

```bash
npx vercel
```

**That's it!** Vercel will:
1. Ask you to log in (opens browser)
2. Auto-detect your Next.js app
3. Deploy to production
4. Give you a live URL

---

## Step-by-Step First Deployment

### 1. Run Deploy Command

```bash
npx vercel
```

### 2. Login (First Time Only)

You'll see:
```
> Log in to Vercel
? Continue with Email, GitHub, GitLab, or Bitbucket?
```

**Recommendation:** Choose **GitHub** (you're already logged in)
- Browser opens → Click "Authorize Vercel"
- Done! ✅

### 3. Answer Setup Questions

```
? Set up and deploy "~/hfi"? [Y/n]
→ Press Y

? Which scope do you want to deploy to?
→ Press Enter (your account)

? Link to existing project? [y/N]
→ Press N (first time)

? What's your project's name? (hfi-manufacturing)
→ Press Enter (keep default)

? In which directory is your code located? ./
→ Press Enter

? Want to override the settings? [y/N]
→ Press N (auto-detect works perfectly)
```

### 4. Watch Deployment

```
🔍  Inspect: https://vercel.com/yourname/hfi-manufacturing/xxxxx
✅  Production: https://hfi-manufacturing.vercel.app
```

**Done!** Your site is live! 🎉

---

## Your Live URLs

After deployment, you get **3 URLs automatically:**

1. **Production:** `https://hfi-manufacturing.vercel.app`
   - Your main site (share this one!)
   - Auto-updates when you push to GitHub

2. **Deployment Preview:** `https://hfi-manufacturing-xxxxx.vercel.app`
   - Unique URL for this deployment
   - Never changes

3. **Branch Previews:** `https://hfi-manufacturing-git-branchname.vercel.app`
   - Auto-created for each branch
   - Perfect for testing

---

## Future Deployments (Even Easier!)

After first setup, deploying is instant:

### Production Deployment:
```bash
# Option 1: Push to GitHub (auto-deploys)
git add .
git commit -m "Update"
git push origin master
# Vercel auto-deploys in ~2 minutes

# Option 2: Manual deploy
npx vercel --prod
```

### Preview Deployment (test before production):
```bash
npx vercel
# Creates preview URL without affecting production
```

---

## GitHub Integration (Recommended)

Connect your GitHub repo for automatic deployments:

**In Vercel Dashboard:**
1. Go to: https://vercel.com/dashboard
2. Click your project → "Settings"
3. Click "Git" → "Connect Git Repository"
4. Select `KorbKorb/hfi-manufacturing`
5. Done!

**Now:**
- Push to `master` → Auto-deploys to production
- Open a PR → Auto-creates preview deployment
- No manual work needed!

---

## Project Settings

Vercel auto-detects everything, but you can verify:

**Framework:** Next.js
**Build Command:** `npm run build`
**Output Directory:** `out`
**Install Command:** `npm install`

All automatically configured! ✅

---

## Environment Variables (When Needed)

If you need to add environment variables:

**Via CLI:**
```bash
vercel env add VARIABLE_NAME
```

**Via Dashboard:**
1. Project Settings → Environment Variables
2. Add key-value pairs
3. Redeploy to apply

**Current needs:** None (static site ready to go!)

---

## Custom Domain (Optional)

Want `hfimfg.com` instead of `vercel.app`?

**Via Dashboard:**
1. Project Settings → Domains
2. Click "Add"
3. Enter your domain
4. Follow DNS setup instructions
5. Free SSL included!

**Cost:** Just domain registration (~$12/year)

---

## Deployment Checklist

Before deploying:

- [x] ✅ Code pushed to GitHub
- [x] ✅ `output: 'export'` in next.config.js
- [x] ✅ Build tested locally (`npm run build`)
- [x] ✅ All images in public/ directory
- [x] ✅ Design refactor complete (3D logo + glassmorphism)
- [ ] Run `npx vercel`
- [ ] Copy production URL
- [ ] Share with others!

---

## Troubleshooting

### Build Fails?

**Check locally first:**
```bash
npm run build
```

If it works locally, it will work on Vercel.

### Domain Issues?

**Verify:**
- DNS records propagated (24-48 hours)
- SSL certificate generated (automatic)

### Deployment Taking Long?

**Normal times:**
- First deploy: 2-3 minutes
- Subsequent deploys: 30-60 seconds

---

## Free Tier Limits

Your site will stay well within free tier:

| Resource | Free Tier | Your Usage |
|----------|-----------|------------|
| Deployments | Unlimited | ~10/month |
| Bandwidth | 100 GB/month | ~1 GB |
| Build time | Unlimited | ~1 min/deploy |
| Projects | Unlimited | 1 |

**You'll stay free easily!** 💰

---

## Monitoring & Analytics

**Vercel Dashboard shows:**
- Real-time visitor analytics
- Performance metrics (Core Web Vitals)
- Deployment history
- Build logs

**Access:** https://vercel.com/dashboard

---

## Comparison: Vercel vs AWS Amplify

| Feature | Vercel | AWS Amplify |
|---------|--------|-------------|
| Setup | 1 command | 5 clicks |
| Deploy time | 30 seconds | 3 minutes |
| GitHub integration | Built-in | Manual setup |
| Free tier | 100 GB bandwidth | 15 GB bandwidth |
| Next.js optimization | Excellent (built by Next.js team) | Good |
| **Recommendation** | ⭐ Best for Next.js | Good for AWS ecosystem |

**For this project:** Vercel is perfect! 🚀

---

## Quick Reference

**Deploy:**
```bash
npx vercel --prod
```

**Preview:**
```bash
npx vercel
```

**View logs:**
```bash
vercel logs
```

**View deployment URL:**
```bash
vercel ls
```

**Open in browser:**
```bash
vercel open
```

---

## Support

**Vercel Documentation:**
- https://vercel.com/docs

**Next.js on Vercel:**
- https://vercel.com/docs/frameworks/nextjs

**Community:**
- https://github.com/vercel/vercel/discussions

---

## Summary: 2-Minute Deployment

1. **Run:** `npx vercel`
2. **Login:** Choose GitHub (browser opens)
3. **Answer:** Press Enter through questions (defaults are perfect)
4. **Wait:** 2 minutes
5. **Done:** Copy your URL: `hfi-manufacturing.vercel.app`
6. **Share:** Send URL to anyone! 🎉

---

## What Happens Next

**After deployment:**
1. Site is live at `https://hfi-manufacturing.vercel.app`
2. Free HTTPS certificate (secure)
3. Global CDN (fast worldwide)
4. Auto-deployments on GitHub push
5. Preview deployments for PRs

**Your site is ready to share with the world!** 🌍

---

## Post-Deployment Tasks

1. **Test the live site:**
   - Check all pages load
   - Test Quote Wizard
   - Verify 3D logo displays
   - Test mobile responsiveness

2. **Share the URL:**
   - Send to stakeholders
   - Add to portfolio
   - Share on LinkedIn

3. **Monitor:**
   - Check Vercel Analytics
   - Review visitor data
   - Monitor performance

4. **Update:**
   - Make local changes
   - Git push
   - Auto-deploys! ✅

---

**Your HFI Manufacturing site is ready to go live in 2 minutes with Vercel!**

Just run: `npx vercel` and follow the prompts.
