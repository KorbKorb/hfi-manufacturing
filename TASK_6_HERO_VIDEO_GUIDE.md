# Task #6: Hero Video Background Implementation Guide

**Status:** Final remaining task (1-2 hours)
**Priority:** LOW (enhancement, not blocker)
**Current State:** Gradient placeholder (professional but static)
**Target State:** Dynamic video background showcasing manufacturing facility

---

## Quick Context

You are completing the **final 2%** of the HFI Manufacturing Sales Engine website.

**Project Status:**
- ✅ 98% Complete (50 of 51 tasks done)
- ✅ All core features tested and validated
- ✅ Build passing, TypeScript clean, 85+ automated tests passing
- ✅ Comprehensive testing report generated (`FEATURE_TEST_INSIGHTS.md`)
- 🟡 Only Task #6 remaining: Hero video background

**Before You Start:**
1. Read `CLAUDE.md` for current project status and context
2. Review `FEATURE_TEST_INSIGHTS.md` for feature validation details
3. Check `handoff.xml` for complete project history

---

## Implementation Target

**File to Modify:** `components/marketing/hero.tsx`

**Current Implementation:**
- Gradient background (`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`)
- Static, professional appearance
- Works well but lacks dynamism

**Target Implementation:**
- Video background showcasing HFI manufacturing facility
- Muted autoplay loop (no user interaction required)
- Mobile-optimized version (lower resolution for bandwidth)
- Fallback to current gradient if video fails to load
- Maintains current text overlay and CTA positioning

---

## Video Requirements

### Format & Browser Compatibility
**Provide both formats for maximum compatibility:**
- **MP4** (H.264 codec) - For Safari, iOS
- **WebM** (VP9 codec) - For Chrome, Firefox (smaller file size)

### Video Content
**What to show:**
- Manufacturing facility b-roll
- Precision equipment in action (CNC machines, welding, fabrication)
- Quality inspection processes
- Clean room operations (if applicable for medical device work)
- Stainless steel materials and finished components

**What to avoid:**
- People's faces (privacy/release concerns)
- Company logos of clients (confidentiality)
- Overly busy or distracting motion

### Technical Specifications

**Desktop Version:**
- Resolution: 1920x1080 (Full HD)
- Frame rate: 30fps
- Duration: 10-30 seconds (loops seamlessly)
- File size target: < 5MB for MP4, < 3MB for WebM
- Encoding: H.264 (MP4), VP9 (WebM)

**Mobile Version:**
- Resolution: 1280x720 (HD)
- Frame rate: 24fps
- Duration: Same as desktop (consistent loop)
- File size target: < 2MB for MP4, < 1.5MB for WebM
- Encoding: Same codecs, lower bitrate

### Video Placement
**Storage location:** `public/videos/`

**File naming convention:**
```
public/videos/hero-desktop.mp4
public/videos/hero-desktop.webm
public/videos/hero-mobile.mp4
public/videos/hero-mobile.webm
```

---

## Implementation Steps

### Step 1: Obtain Video Files

**Option A: Use Stock Video (Fastest)**
- Search for "manufacturing facility b-roll" on stock sites:
  - Pexels (free)
  - Unsplash (free)
  - Adobe Stock (paid)
  - Shutterstock (paid)
- Filter for: stainless steel, precision manufacturing, industrial
- Download in highest quality available

**Option B: Film Custom Video (Best Quality)**
- Visit HFI manufacturing facility
- Capture b-roll with smartphone or professional camera
- Focus on: equipment in motion, precision work, quality control
- Get 30-60 seconds of varied footage

**Option C: Use Placeholder Video (Development)**
- Use any professional-looking manufacturing video temporarily
- Mark for replacement in production

### Step 2: Optimize Video Files

**Using FFmpeg (recommended):**

```bash
# Install FFmpeg if not already installed
# On macOS: brew install ffmpeg
# On Windows: Download from ffmpeg.org

# Convert to MP4 (Desktop - 1920x1080)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1920:1080 -b:v 2M -movflags +faststart public/videos/hero-desktop.mp4

# Convert to WebM (Desktop - 1920x1080)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -vf scale=1920:1080 -b:v 1.5M public/videos/hero-desktop.webm

# Convert to MP4 (Mobile - 1280x720)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1280:720 -b:v 1M -movflags +faststart public/videos/hero-mobile.mp4

# Convert to WebM (Mobile - 1280x720)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -vf scale=1280:720 -b:v 750k public/videos/hero-mobile.webm
```

**Key Flags Explained:**
- `-vf scale=WIDTHxHEIGHT` - Resize video
- `-b:v BITRATE` - Set video bitrate (controls quality and file size)
- `-movflags +faststart` - Optimize for web streaming (MP4 only)
- `-c:v libvpx-vp9` - Use VP9 codec for WebM

### Step 3: Update Hero Component

**Current code structure in `components/marketing/hero.tsx`:**

```tsx
export function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Text overlay content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero content */}
      </div>
    </section>
  );
}
```

**Updated code with video background:**

```tsx
'use client';

import { useState } from 'react';

export function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video Background - Only show if no error */}
      {!videoError && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoError(true)}
          >
            {/* Desktop video sources */}
            <source
              src="/videos/hero-desktop.webm"
              type="video/webm"
              media="(min-width: 768px)"
            />
            <source
              src="/videos/hero-desktop.mp4"
              type="video/mp4"
              media="(min-width: 768px)"
            />
            {/* Mobile video sources */}
            <source
              src="/videos/hero-mobile.webm"
              type="video/webm"
              media="(max-width: 767px)"
            />
            <source
              src="/videos/hero-mobile.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
          </video>

          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
      )}

      {/* Fallback gradient background if video fails */}
      {videoError && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}

      {/* Text overlay content (unchanged) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Existing hero content - don't modify */}
        {/* ... */}
      </div>
    </section>
  );
}
```

**Key Implementation Details:**

1. **`'use client'` directive:** Required because we're using `useState` for error handling

2. **Video attributes:**
   - `autoPlay` - Starts automatically
   - `loop` - Loops indefinitely
   - `muted` - Required for autoplay to work (browser policy)
   - `playsInline` - Prevents fullscreen on iOS
   - `onError` - Triggers fallback if video fails to load

3. **Multiple `<source>` tags:**
   - Browser tries formats in order
   - WebM first (smaller file size)
   - MP4 as fallback (broader compatibility)
   - Media queries for desktop vs mobile versions

4. **Dark overlay (`bg-slate-900/70`):**
   - 70% opacity dark overlay
   - Ensures white text remains readable
   - Adjust opacity if needed (50-80% range)

5. **Fallback handling:**
   - If video fails to load → `setVideoError(true)`
   - Shows original gradient background
   - No broken user experience

### Step 4: Test Implementation

**Desktop Testing:**
```bash
npm run dev
# Navigate to http://localhost:3000
# Verify:
# - Video loads and plays automatically
# - Video loops seamlessly
# - Text overlay remains readable
# - Gradient fallback works if video file is missing
```

**Mobile Testing:**
```bash
# In Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
# 3. Select "iPhone 12 Pro" or similar
# 4. Reload page
# Verify:
# - Mobile video version loads (smaller file)
# - Performance is smooth
# - Text remains readable on smaller screen
```

**Browser Compatibility Testing:**
- ✅ Chrome (WebM support)
- ✅ Firefox (WebM support)
- ✅ Safari (MP4 support)
- ✅ iOS Safari (MP4 with playsInline)
- ✅ Edge (WebM support)

### Step 5: Performance Optimization

**Check file sizes:**
```bash
ls -lh public/videos/
# Target sizes:
# hero-desktop.mp4: < 5MB
# hero-desktop.webm: < 3MB
# hero-mobile.mp4: < 2MB
# hero-mobile.webm: < 1.5MB
```

**If files are too large:**
- Reduce bitrate in FFmpeg command
- Shorten video duration (10-15 seconds is sufficient)
- Increase compression (lower `-b:v` value)

**Lazy loading consideration:**
- Current implementation loads video immediately
- For performance, could add `preload="metadata"` attribute
- Trade-off: slight delay before video plays

### Step 6: Accessibility & SEO

**Add descriptive text for screen readers:**

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
  onError={() => setVideoError(true)}
  aria-label="Background video showing HFI manufacturing facility and precision equipment"
>
  {/* sources */}
</video>
```

**Update page metadata (optional):**
- Video backgrounds don't affect SEO directly
- Ensure hero text content remains SEO-optimized
- No changes needed to `generateMetadata()` in `app/page.tsx`

---

## Alternative Approaches

### Option 1: Image Fallback (Simpler)

If video files are not available or proving difficult:

```tsx
<div
  className="absolute inset-0 z-0 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/hero-manufacturing.jpg')" }}
>
  <div className="absolute inset-0 bg-slate-900/70" />
</div>
```

**Pros:**
- Much simpler implementation
- Smaller file size (~200KB vs 2-5MB)
- No browser compatibility concerns

**Cons:**
- Less dynamic and engaging
- No motion to draw attention

### Option 2: Animated Gradient (CSS-only)

If you want motion without video:

```tsx
<div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient-x">
  <style jsx>{`
    @keyframes gradient-x {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 15s ease infinite;
    }
  `}</style>
</div>
```

**Pros:**
- Zero file size overhead
- Works everywhere
- Subtle motion without distraction

**Cons:**
- Less impressive than video
- Doesn't showcase actual manufacturing

### Option 3: Hero Image Carousel

Cycle through 3-5 high-quality images:

```tsx
'use client';
import { useState, useEffect } from 'react';

const images = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-slate-900/70" />
      {/* Hero content */}
    </section>
  );
}
```

**Pros:**
- Shows multiple aspects of manufacturing
- Smoother transitions than video
- Moderate file size (3-5 images @ ~200KB each)

**Cons:**
- More complex than single image
- Requires multiple high-quality photos

---

## Quality Checklist

Before marking Task #6 complete, verify:

- [ ] Video files created and optimized (both MP4 and WebM)
- [ ] Desktop and mobile versions both under size targets
- [ ] Files placed in `public/videos/` directory
- [ ] Hero component updated with video background code
- [ ] `'use client'` directive added to component
- [ ] Error handling implemented (fallback to gradient)
- [ ] Dark overlay added for text readability
- [ ] Text content still readable and well-contrasted
- [ ] Video autoplays and loops seamlessly
- [ ] Tested on desktop (Chrome, Firefox, Safari)
- [ ] Tested on mobile (iOS Safari, Chrome)
- [ ] Video doesn't distract from hero message
- [ ] Page load time still acceptable (< 3 seconds on 3G)
- [ ] Build still passes (`npm run build`)
- [ ] No TypeScript errors introduced

---

## Expected Outcome

**Before (Current State):**
- Clean gradient background
- Professional but static
- Instant page load
- Works everywhere

**After (Target State):**
- Dynamic video background
- Showcases HFI manufacturing capabilities
- Slight delay for video load (acceptable)
- Graceful fallback if video fails
- More engaging and authentic

**User Experience Impact:**
- First impression: More dynamic and modern
- Trust signal: "They actually manufacture things" (visual proof)
- Engagement: Motion draws attention to hero CTA
- Mobile: Optimized version maintains performance

---

## Troubleshooting

### Video doesn't autoplay

**Cause:** Browser autoplay policies require muted videos
**Solution:** Ensure `muted` attribute is present

### Video plays but text is unreadable

**Cause:** Insufficient overlay opacity
**Solution:** Increase overlay darkness: `bg-slate-900/80` or `bg-slate-900/90`

### Video file too large, slow page load

**Cause:** High bitrate or resolution
**Solution:** Re-encode with lower bitrate or shorter duration

### Different video on desktop vs mobile

**Cause:** Media queries in `<source>` tags
**Solution:** This is intentional - mobile gets smaller file

### Video doesn't loop seamlessly

**Cause:** Video has black frames at end
**Solution:** Trim video to exact loop point using FFmpeg

### iOS doesn't play video

**Cause:** Missing `playsInline` attribute
**Solution:** Ensure `playsInline` is set on `<video>` tag

---

## Completion Criteria

**Task #6 is complete when:**

1. ✅ Video background implemented in `components/marketing/hero.tsx`
2. ✅ Both desktop and mobile video versions working
3. ✅ Fallback to gradient if video fails
4. ✅ Text overlay remains readable
5. ✅ Build passes without errors
6. ✅ Tested on Chrome, Firefox, Safari (desktop and mobile)
7. ✅ Page load performance acceptable

**Then:**
- Update `handoff.xml` to mark Task #6 complete
- Update project status to **100% Complete**
- Celebrate! 🎉 The HFI Manufacturing Sales Engine is ready for production.

---

## Post-Completion Next Steps

Once Task #6 is complete, the project moves to deployment:

1. **AWS Infrastructure Deployment**
   - Follow `AWS_DEPLOYMENT_GUIDE.md`
   - Set up S3 bucket for static site hosting
   - Configure CloudFront CDN
   - Deploy Lambda functions for file uploads
   - Configure API Gateway

2. **Sanity.io CMS Setup**
   - Create Sanity project
   - Upload schemas from `lib/sanity/schemas.ts`
   - Migrate mock data from `lib/data/industries.ts`
   - Configure API keys in `.env`

3. **Production Image Replacement**
   - Replace SVG placeholders with professional photos
   - Follow guidelines in `IMAGE_OPTIMIZATION_GUIDE.md`
   - Optimize images to WebP format
   - Add blur placeholders for smooth loading

4. **Final Pre-Launch Checklist**
   - Run full test suite: `npm run test:e2e && npm run test:responsive`
   - Verify all links functional
   - Test Quote Wizard end-to-end with real data
   - Confirm AWS file upload working in production
   - Check Core Web Vitals scores
   - Validate SSL certificate
   - Set up analytics (Google Analytics, Hotjar)

---

**Good luck with the final 2%!** 🚀

You're implementing the finishing touch on a world-class B2B sales platform. The video background will add that extra polish that separates a good website from a great one.

If you have questions or need clarification, refer to:
- `CLAUDE.md` - Project overview and current status
- `FEATURE_TEST_INSIGHTS.md` - Detailed feature analysis
- `handoff.xml` - Complete project history and context
