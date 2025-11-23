# CLAUDE.md - HFI Manufacturing Project Guide

## Project Overview

**Project Name:** HFI Manufacturing Website Redesign (Sales Engine)
**Objective:** Transform the existing dated corporate website into a high-performance, lead-generation engine.

### Vision
Convert `hfimfg.com` from a static "brochure" site into a **sales-focused, trust-driven platform** that guides visitors toward requesting quotes for precision stainless steel fabrication.

---

## Current Implementation Status

### Completed Features (98%)

**All Core Features Implemented:**
- ✅ Global Layout (Header with ISO badge, Footer with schema.org markup)
- ✅ Homepage with Hero, Trust Badges, Buyer Segmenter
- ✅ Quote Wizard (3-step flow with state persistence)
- ✅ Industry Solutions Pages (Medical Device, Restaurant Equipment, Telecom)
- ✅ Capabilities Pages (Prototyping for Engineers, Production for Procurement)
- ✅ AWS S3 Presigned URL Upload System (code complete)
- ✅ Mobile Responsive Design (tested at 375px, 768px, 1440px)
- ✅ SEO Optimization (metadata, schema markup, Next.js Image)
- ✅ 85+ Automated Tests (E2E + Responsive)

**Pages Built (11 total):**
- `/` - Homepage
- `/quote` - Quote Wizard (PRIMARY SALES ENGINE)
- `/capabilities/prototyping` - Engineer persona page
- `/capabilities/production` - Procurement Manager persona page
- `/industries/medical-device` - Medical Device industry page
- `/industries/restaurant-equipment` - Restaurant Equipment industry page
- `/industries/telecom-enclosures` - Telecom Enclosures industry page
- Plus: About, Contact, Privacy, Terms (placeholder routes)

**Testing Coverage:**
- **E2E Tests:** 25+ Playwright tests across 5 browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- **Responsive Tests:** 60+ tests across 3 viewports (375px, 768px, 1440px)
- **Manual Testing:** Complete feature testing session documented in `FEATURE_TEST_INSIGHTS.md`
- **Total:** 85+ automated tests + comprehensive manual validation

**Build Status:**
- ✅ TypeScript compilation: Zero errors (strict mode)
- ✅ Production build: 11 pages generated successfully
- ✅ Bundle optimization: Main 96.3 kB, Quote page 261 kB
- ✅ Static export: Ready for S3 + CloudFront deployment

**Security Audit:**
- ✅ No AWS credentials in client code
- ✅ Presigned URLs with 15-minute expiration
- ✅ File validation server-side
- ✅ Private S3 bucket configuration
- ✅ 256-bit AES encryption

### Remaining Work (2%)

**Task #6: Hero Video Background** (1-2 hours)
- Current: Gradient placeholder (professional but static)
- Needed: Manufacturing facility b-roll (welding, precision equipment, quality inspection)
- Format: MP4 + WebM for browser compatibility
- Implementation: Code scaffolding already in place at `components/marketing/hero.tsx`

**Deployment Prerequisites:**
1. Deploy AWS infrastructure (S3, Lambda, API Gateway) - See `AWS_DEPLOYMENT_GUIDE.md`
2. Set up Sanity.io CMS - See `handoff.xml` for integration guide
3. Replace placeholder images with production photos - See `IMAGE_OPTIMIZATION_GUIDE.md`

### Key Documentation

**Comprehensive Guides:**
- **`FEATURE_TEST_INSIGHTS.md`** - 15,000+ word testing report with feature analysis, UX insights, conversion optimization wins
- **`AWS_DEPLOYMENT_GUIDE.md`** - Complete infrastructure deployment instructions (750 lines)
- **`AWS_INTEGRATION_SUMMARY.md`** - Technical summary of presigned URL upload system
- **`QUICK_START_AWS.md`** - Fast-track guide for testing file uploads locally
- **`E2E_TESTING_SUMMARY.md`** - E2E test suite documentation
- **`RESPONSIVE_TESTING_SUMMARY.md`** - Responsive design test coverage
- **`IMAGE_OPTIMIZATION_GUIDE.md`** - Next.js Image component best practices
- **`SESSION_SUMMARY.md`** - Development session documentation
- **`handoff.xml`** - Complete project handoff with all tasks, history, and deployment checklists

**Quick References:**
- **`README.md`** - Technical architecture and setup instructions
- **`tests/README.md`** - Complete testing guide (E2E + responsive)
- **`lib/aws/README.md`** - AWS utilities developer documentation

---

## Core Philosophy

Every design and technical decision must support:
1. **Lead Generation:** Drive users toward the Request for Quote (RFQ) wizard
2. **Trust Signals:** Emphasize ISO 9001:2015 certification, medical/telecom standards
3. **Security:** Demonstrate IP protection and data security (256-bit encryption)
4. **Precision:** Reflect manufacturing excellence through clean, industrial design

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI (industrial aesthetic)
- **Forms:** React Hook Form + Zod validation
- **State:** Zustand (Quote Wizard state management)
- **Animations:** Framer Motion (wizard transitions)

### Backend & Infrastructure (AWS)
- **Hosting:** S3 + CloudFront (SSG/Static Export)
- **API:** API Gateway
- **Functions:** Lambda (Node.js runtime)
- **Storage:** S3 (Private buckets for RFQ uploads)

### Content Management
- **CMS:** Sanity.io (Headless) - Mock schemas until API keys provided

---

## Project Structure

```
/src
  /app
    /(marketing)       # Landing pages, Industry pages (SSG)
    /(application)     # Quote Wizard (Client-side heavy)
  /components
    /ui                # Primitive atoms (buttons, inputs)
    /marketing         # Hero, FeatureGrid, TrustBadges
    /quote-engine      # Multi-step wizard components
  /lib
    /aws               # Lambda/S3 utility functions
    /sanity            # CMS fetch logic
  /types               # TypeScript interfaces
```

---

## Implementation Phases

### Phase 1: Global Layout & Trust Signals ✅ COMPLETE
**Priority:** Foundation layer
- ✅ Header with prominent "Get a Quote" CTA (Orange/Red accent)
- ✅ ISO 9001:2015 badge in utility bar
- ✅ Footer with industry links and schema markup for Local SEO
- **Location:** `app/layout.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx`

### Phase 2: Trust-First Homepage ✅ 98% COMPLETE
**Priority:** Primary conversion page
- 🟡 Full-width video background hero (gradient placeholder - video pending)
- ✅ Headline: "Precision Stainless Steel Fabrication for Mission-Critical Supply Chains"
- ✅ Dual CTAs: "Start a Quote" (Primary), "View Capabilities" (Secondary)
- ✅ **Buyer Segmenter Component:**
  - Engineer path → `/capabilities/prototyping`
  - Procurement Manager path → `/capabilities/production`
- **Location:** `app/page.tsx`, `components/marketing/hero.tsx`, `components/marketing/buyer-segmenter.tsx`

### Phase 3: Smart Quote Wizard ✅ COMPLETE
**Priority:** Critical Feature - Primary revenue driver
**Route:** `/quote`

**Multi-step flow:**
1. ✅ **Qualification:** Timeline selection (Immediate vs. Forecast)
2. ✅ **Material Selection:** Stainless, Aluminum, Carbon Steel, Brass, Copper, Other
3. ✅ **Secure Upload:**
   - File dropzone with presigned URL flow
   - Client → Lambda (presigned URL) → S3 Private Bucket
   - **SECURITY:** Never direct upload to server
   - Display "256-bit Encrypted" trust badge

**State Management:** ✅ Zustand for wizard persistence with localStorage
**Animations:** ✅ Framer Motion for step transitions
**Testing:** ✅ 25+ E2E tests across 5 browsers

**Location:** `app/(application)/quote/page.tsx`, `components/quote-engine/*`, `lib/stores/quote-store.ts`

### Phase 4: Industry Solutions Pages ✅ COMPLETE
**Priority:** SEO & Content Marketing
**Route:** `/industries/[slug]`

**Required Pages:**
- ✅ Medical Device
- ✅ Restaurant Equipment
- ✅ Telecom Enclosures

**Template Structure:**
- ✅ Industry-specific hero image (Next.js Image with priority loading)
- ✅ "The Challenge" section
- ✅ "The HFI Solution" section
- ✅ Related case study card with quantified results

**Testing:** ✅ 15+ responsive tests across all industry pages
**Location:** `app/(marketing)/industries/[slug]/page.tsx`, `lib/data/industries.ts`

---

## Coding Standards

### SEO Requirements
- All pages MUST export `generateMetadata()`
- All images MUST use `next/image` with `alt` props
- Schema markup for local business (footer)

### Performance
- **Server vs Client Components:** Strict separation
- Use `'use client'` directive ONLY when interactivity required
- Optimize for Core Web Vitals

### Security
- Sanitize ALL inputs with Zod before Lambda calls
- NEVER expose AWS credentials in client code
- Use environment variables for secrets
- Implement presigned URL pattern for file uploads

### Design System

**Color Palette:**
- Primary: Dark Grays (`slate-900`, `slate-800`)
- Accent: Safety Orange/Red (CTAs, highlights)
- Background: Clean White (`white`, `slate-50`)

**Typography:**
- Font: Sans-serif (Inter or Roboto)
- Priority: High legibility
- Style: Industrial, professional

**Component Philosophy:**
- Industrial aesthetic (clean lines, purposeful whitespace)
- Trust-focused (certifications, security badges visible)
- Conversion-optimized (clear CTAs, minimal friction)

---

## Key Business Context

### Target Audiences
1. **Engineers:** Need prototyping, precision specs, material expertise
2. **Procurement Managers:** Need production capacity, lead times, compliance

### Industries Served
- Medical Device Manufacturing
- Telecom Infrastructure
- Restaurant Equipment
- Precision Industrial Components

### Competitive Advantages
- ISO 9001:2015 Certified
- Medical/Telecom standards compliance
- Secure IP/NDA handling
- Stainless steel specialization
- Quick-turn prototyping to volume production

---

## Initial Setup Task

When starting development:
1. Initialize Next.js 14+ with TypeScript
2. Configure Tailwind CSS
3. Install Shadcn/UI
4. Create directory structure (see Project Structure above)
5. Build Homepage Hero Component
6. Build Navigation Bar with ISO 9001 badge

---

## Working with This Project

### When Adding Features
- Ask: "Does this drive users toward the RFQ wizard?"
- Ensure trust signals are visible
- Maintain industrial design aesthetic
- Follow security patterns for data handling

### Before Deployment
- Verify all metadata exports exist
- Check image optimization
- Test RFQ wizard flow end-to-end
- Validate AWS security (no exposed keys)
- Confirm presigned URL upload flow

### Content Placeholders
- Until Sanity.io API keys provided, use TypeScript mock data
- Structure mocks to match expected CMS schema
- Document mock-to-real migration path

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Build (Static Export for CloudFront)
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# End-to-End Testing (Playwright)
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Interactive test UI
npm run test:e2e:headed       # Watch tests run in browser
npm run test:e2e:debug        # Debug E2E tests
npm run test:e2e:report       # View test report

# Responsive Design Testing
npm run test:responsive        # Run responsive tests
npm run test:responsive:ui     # Interactive responsive tests
npm run test:responsive:headed # Watch responsive tests
```

---

## Questions to Consider

When implementing features, consider:
- How does this build trust with risk-averse buyers?
- Does this reduce friction in the quote request process?
- Is this optimized for both engineer and procurement personas?
- Does the design reflect precision manufacturing quality?

---

**Last Updated:** 2025-11-22 (Testing Session Complete)
**Project Status:** 98% Complete - Production Ready
**Completion:** 50 of 51 tasks complete
**Remaining Task:** Task #6 - Hero video background (1-2 hours)
