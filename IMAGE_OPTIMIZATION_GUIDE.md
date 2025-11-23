# Image Optimization Guide

## Overview

This guide covers best practices for adding and optimizing images in the HFI Manufacturing website using Next.js Image component.

---

## Current Image Implementation

### ✅ Implemented (Task #5)

#### Industry Hero Images
- **Location:** `/public/images/industries/`
- **Files:**
  - `medical-device.svg` (1920×1080)
  - `restaurant-equipment.svg` (1920×1080)
  - `telecom-enclosures.svg` (1920×1080)

- **Usage:** Industry page hero backgrounds
- **Format:** SVG (placeholder graphics)
- **Component:** `app/(marketing)/industries/[slug]/page.tsx`
- **Optimization:**
  - ✅ `priority` attribute (above the fold)
  - ✅ `fill` property with `object-cover`
  - ✅ Descriptive alt text
  - ✅ `sizes="100vw"` for responsive loading
  - ✅ Opacity overlay for text readability

---

## Next.js Image Component Requirements

### Always Use next/image

```typescript
import Image from 'next/image'

// ✅ Good - Using next/image
<Image
  src="/images/example.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ❌ Bad - Using plain img tag
<img src="/images/example.jpg" alt="..." />
```

---

## Image Formats

### Recommended Formats (Priority Order)

1. **WebP** - Best compression, wide browser support
2. **SVG** - Vector graphics, logos, icons
3. **JPEG** - Photographs, complex images
4. **PNG** - Images requiring transparency (if not WebP)

### Format Guidelines

| Use Case | Format | Notes |
|----------|--------|-------|
| Hero images | WebP or JPEG | Use WebP for better compression |
| Product photos | WebP or JPEG | |
| Logos | SVG | Scalable, small file size |
| Icons | SVG | |
| Screenshots | WebP or PNG | Use PNG if exact colors needed |
| Diagrams | SVG or PNG | Prefer SVG for scalability |

### Converting to WebP

```bash
# Using cwebp (install via: npm install -g cwebp-bin)
cwebp -q 85 input.jpg -o output.webp

# Batch convert all JPGs in directory
for img in *.jpg; do cwebp -q 85 "$img" -o "${img%.jpg}.webp"; done
```

---

## Image Sizing & Dimensions

### Standard Sizes

#### Hero Images (Full-width backgrounds)
- **Desktop:** 1920×1080 (16:9)
- **Tablet:** 1536×864
- **Mobile:** 768×432
- **Format:** WebP (JPEG fallback)
- **Quality:** 80-85%

#### Industry/Feature Cards
- **Size:** 800×600 (4:3) or 800×450 (16:9)
- **Format:** WebP
- **Quality:** 85%

#### Thumbnails
- **Size:** 400×300
- **Format:** WebP
- **Quality:** 85%

#### Logos
- **Format:** SVG (preferred) or PNG
- **Size:** Optimize SVG, or 200×200 for PNG
- **Quality:** 90% (PNG)

---

## Responsive Image Implementation

### Pattern 1: Fixed Dimensions

For images with known aspect ratios:

```typescript
<Image
  src="/images/product.webp"
  alt="Stainless steel component with precision machining"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-lg"
/>
```

### Pattern 2: Fill Container (Hero Images)

For full-width or background images:

```typescript
<div className="relative w-full h-96">
  <Image
    src="/images/hero.webp"
    alt="HFI manufacturing facility with precision equipment"
    fill
    priority // Above the fold
    className="object-cover"
    sizes="100vw"
  />
</div>
```

### Pattern 3: Responsive with Multiple Breakpoints

```typescript
<Image
  src="/images/feature.webp"
  alt="Detailed description of feature"
  width={1200}
  height={800}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         (max-width: 1536px) 33vw,
         25vw"
/>
```

---

## Loading Strategies

### Priority Loading (Above the Fold)

Use `priority` for images visible without scrolling:

```typescript
<Image
  src="/images/hero.webp"
  alt="..."
  fill
  priority  // Disables lazy loading, loads immediately
  sizes="100vw"
/>
```

**When to use:**
- Hero images
- Logo
- First viewport content

### Lazy Loading (Default)

All images lazy load by default (don't add `priority`):

```typescript
<Image
  src="/images/below-fold.webp"
  alt="..."
  width={800}
  height={600}
  // No priority = lazy loads when near viewport
/>
```

**When to use:**
- Images below the fold
- Gallery images
- Industry page case studies
- Footer content

### Loading Placeholder

```typescript
<Image
  src="/images/product.webp"
  alt="..."
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/png;base64,..." // Generated base64
/>
```

---

## Alt Text Guidelines

### SEO-Optimized Alt Text

**Formula:** `[Product/Subject] + [Key Details] + [Context]`

```typescript
// ✅ Good - Descriptive and SEO-friendly
alt="Precision stainless steel surgical instrument housing with ISO 9001 certification markings"

// ✅ Good - Specific to content
alt="HFI manufacturing facility clean room for medical device fabrication"

// ✅ Good - Industry-specific
alt="NEMA 4X rated telecom enclosure with weatherproof cable entry points"

// ❌ Bad - Too generic
alt="Product image"

// ❌ Bad - Keyword stuffing
alt="Stainless steel fabrication manufacturing precision machining ISO certified medical telecom restaurant"

// ❌ Bad - Empty
alt=""
```

### Context-Specific Examples

**Hero Images:**
```typescript
alt="HFI manufacturing facility showing precision CNC equipment and stainless steel fabrication"
```

**Industry Pages:**
```typescript
alt="Medical device manufacturing clean room with precision stainless steel components"
alt="Commercial restaurant equipment stainless steel prep tables and shelving"
alt="NEMA-rated telecommunications enclosures for outdoor 5G infrastructure"
```

**Product/Component Images:**
```typescript
alt="316L stainless steel surgical instrument housing with mirror finish"
alt="NSF-certified commercial kitchen prep table with integrated sink"
alt="Weatherproof aluminum telecom enclosure with powder coat finish"
```

**Case Study Images:**
```typescript
alt="Completed batch of precision machined medical device components for FDA compliance"
```

---

## Directory Structure

```
public/
└── images/
    ├── industries/
    │   ├── medical-device.svg (or .webp)
    │   ├── restaurant-equipment.svg (or .webp)
    │   └── telecom-enclosures.svg (or .webp)
    ├── hero/
    │   └── main-hero.webp (for homepage - Task #6)
    ├── capabilities/
    │   ├── prototyping.webp
    │   └── production.webp
    ├── products/
    │   └── [product-images].webp
    ├── case-studies/
    │   └── [case-study-images].webp
    └── logos/
        ├── hfi-logo.svg
        └── iso-badge.svg
```

---

## Adding New Images

### Step 1: Prepare the Image

1. **Resize to appropriate dimensions**
   ```bash
   # Using ImageMagick
   convert input.jpg -resize 1920x1080 -quality 85 output.jpg
   ```

2. **Convert to WebP**
   ```bash
   cwebp -q 85 output.jpg -o output.webp
   ```

3. **Optimize SVG** (if applicable)
   ```bash
   # Using SVGO
   npx svgo input.svg -o output.svg
   ```

### Step 2: Add to Public Directory

```bash
# Place in appropriate subdirectory
cp output.webp public/images/industries/
```

### Step 3: Update Data/Component

```typescript
// In data file (e.g., lib/data/industries.ts)
heroImage: '/images/industries/new-industry.webp',

// Or in component
<Image
  src="/images/industries/new-industry.webp"
  alt="Descriptive alt text for SEO"
  width={1920}
  height={1080}
  sizes="100vw"
/>
```

### Step 4: Generate Blur Placeholder (Optional)

```bash
# Using sharp
npm install sharp

# Create placeholder generator script
node scripts/generate-blur-placeholder.js
```

---

## Performance Optimization

### Image Quality Settings

| Image Type | Quality | Notes |
|-----------|---------|-------|
| Hero images | 80-85% | Balance quality and size |
| Product photos | 85-90% | Higher quality for detail |
| Thumbnails | 75-80% | Lower quality acceptable |
| Diagrams/screenshots | 85-90% | Maintain clarity |

### File Size Targets

- **Hero images:** < 200KB (WebP)
- **Feature images:** < 100KB
- **Thumbnails:** < 50KB
- **Logos (PNG):** < 20KB
- **Icons (SVG):** < 5KB

### Responsive Sizes Attribute

The `sizes` attribute tells the browser what size the image will be at different viewport widths:

```typescript
sizes="(max-width: 640px) 100vw,   // Mobile: full width
       (max-width: 1024px) 50vw,    // Tablet: half width
       (max-width: 1536px) 33vw,    // Desktop: third width
       25vw"                        // Large: quarter width
```

**Calculate sizes:**
1. Determine image width at each breakpoint
2. Express as viewport width percentage (vw)
3. List from smallest to largest breakpoint

---

## Testing Images

### Visual Testing

```bash
# Run development server
npm run dev

# Check pages with images
# - Homepage (hero)
# - /industries/medical-device
# - /industries/restaurant-equipment
# - /industries/telecom-enclosures
```

### Performance Testing

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Check:
# - Largest Contentful Paint (LCP)
# - Cumulative Layout Shift (CLS)
# - Image optimization scores
```

### Responsive Testing

Run responsive tests to verify images at all viewports:

```bash
npm run test:responsive
```

Tests automatically verify:
- No image distortion
- Proper aspect ratios
- No horizontal overflow

---

## Next.js Image Configuration

Current config in `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // Required for static export
  },
}
```

**Note:** With `output: 'export'`, Next.js image optimization is disabled. Images are served as-is from the `public` directory.

### Optimization for Production

For dynamic hosting (not static export):

```javascript
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}
```

---

## Accessibility Requirements

### WCAG 2.1 Compliance

1. **All images must have alt text**
   - Decorative images: `alt=""`
   - Informative images: Descriptive alt text

2. **Text contrast over images**
   - Overlay or gradient for readability
   - Minimum contrast ratio: 4.5:1

3. **No critical info in images alone**
   - Provide text alternative
   - Use aria-label if needed

### Example Implementation

```typescript
<div className="relative">
  <Image
    src="/images/hero.webp"
    alt="HFI manufacturing facility with precision equipment"
    fill
    priority
    sizes="100vw"
    role="img"
    aria-label="Hero image showing HFI's manufacturing capabilities"
  />
  {/* Overlay for text contrast */}
  <div className="absolute inset-0 bg-slate-900/60" />
  <div className="relative">
    <h1>Visible text with good contrast</h1>
  </div>
</div>
```

---

## Common Issues & Solutions

### Issue: Image Not Loading

**Cause:** Incorrect path or missing file

**Solution:**
```typescript
// ✅ Correct - relative to public directory
src="/images/example.webp"

// ❌ Wrong - includes /public
src="/public/images/example.webp"
```

### Issue: Layout Shift (CLS)

**Cause:** Missing width/height or incorrect aspect ratio

**Solution:**
```typescript
// ✅ Provide dimensions
<Image
  src="/images/example.webp"
  width={1200}
  height={800}
  alt="..."
/>

// Or reserve space with aspect ratio
<div className="relative aspect-[3/2]">
  <Image src="..." fill alt="..." />
</div>
```

### Issue: Image Too Large

**Cause:** Not optimized or wrong format

**Solution:**
1. Convert to WebP
2. Reduce quality to 80-85%
3. Resize to appropriate dimensions
4. Use responsive sizes

### Issue: Blurry on Retina Displays

**Cause:** Image dimensions too small

**Solution:**
Provide 2x size image:
```typescript
// For 800×600 display size, use 1600×1200 image
<Image
  src="/images/example@2x.webp"
  width={800}
  height={600}
  alt="..."
/>
```

---

## Future Enhancements

### Priority: High
- [ ] Add actual WebP images for industry pages
- [ ] Create responsive image sets (mobile, tablet, desktop)
- [ ] Generate blur placeholders for all images
- [ ] Add logo and brand assets

### Priority: Medium
- [ ] Implement image CDN (Cloudflare, Cloudinary)
- [ ] Add AVIF format support
- [ ] Create automated image optimization pipeline
- [ ] Add case study images

### Priority: Low
- [ ] Implement lazy loading intersection observer custom hook
- [ ] Add image gallery component
- [ ] Create image zoom/lightbox functionality

---

## Quick Reference

### Standard Image Implementation

```typescript
import Image from 'next/image'

// Hero Image (Above the fold, priority)
<div className="relative w-full h-96">
  <Image
    src="/images/hero.webp"
    alt="Descriptive alt text with keywords"
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />
</div>

// Content Image (Below the fold, lazy load)
<Image
  src="/images/content.webp"
  alt="Specific description of image content"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="rounded-lg"
/>

// Thumbnail (Lazy load, smaller)
<Image
  src="/images/thumb.webp"
  alt="Brief but descriptive alt text"
  width={400}
  height={300}
  sizes="(max-width: 768px) 50vw, 25vw"
/>
```

---

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [WebP Converter](https://developers.google.com/speed/webp)
- [ImageMagick](https://imagemagick.org/)
- [SVGO](https://github.com/svg/svgo)
- [Sharp](https://sharp.pixelplumbing.com/)

---

**Last Updated:** 2025-11-22
**Version:** 1.0.0
**Status:** Complete - Task #5 Implementation
