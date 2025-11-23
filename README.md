# HFI Manufacturing - Sales Engine Website

> **Precision Stainless Steel Fabrication for Mission-Critical Supply Chains**

A high-performance, lead-generation engine built with Next.js 14, designed to convert visitors into qualified RFQ (Request for Quote) submissions for HFI Manufacturing.

## 🎯 Project Vision

Transform `hfimfg.com` from a static "brochure" site into a **sales-focused, trust-driven platform** that guides visitors toward the Quote Wizard - the primary revenue driver.

## 📊 Current Status

**Build Status:** ✅ Production Ready
**Completed:** 40/51 Tasks (78%)
**Pages:** 10 live pages
**Quote Wizard:** Fully functional 3-step wizard

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# Type check
npm run type-check

# Preview production build
npm start
```

Visit `http://localhost:3000` to see the site.

## 📁 Project Structure

```
/
├── app/
│   ├── (marketing)/          # Landing & industry pages (SSG)
│   │   ├── capabilities/
│   │   │   ├── prototyping/  # Engineers path
│   │   │   └── production/   # Procurement managers path
│   │   └── industries/
│   │       └── [slug]/       # Dynamic industry pages
│   ├── (application)/        # Client-side heavy pages
│   │   └── quote/            # 🎯 CRITICAL: Quote Wizard
│   ├── layout.tsx            # Root layout with Header/Footer
│   └── page.tsx              # Homepage with Hero + Buyer Segmenter
│
├── components/
│   ├── ui/                   # Shadcn/UI primitives
│   ├── marketing/            # Hero, Footer, Header, Trust Badges
│   └── quote-engine/         # 🎯 Quote Wizard components
│       ├── quote-wizard.tsx  # Main wizard orchestrator
│       ├── progress-indicator.tsx
│       ├── step-qualification.tsx
│       ├── step-material.tsx
│       ├── step-contact.tsx
│       └── file-dropzone.tsx
│
├── lib/
│   ├── stores/               # Zustand state management
│   │   └── quote-store.ts    # Quote form state
│   ├── validations/          # Zod schemas
│   │   └── quote-schema.ts
│   ├── data/                 # Mock data (until Sanity.io)
│   │   └── industries.ts
│   └── utils.ts              # Tailwind merge utility
│
└── types/
    └── index.ts              # TypeScript interfaces
```

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router, Static Export)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Shadcn/UI
- **State:** Zustand (Quote Wizard persistence)
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion (Wizard transitions)
- **Icons:** Lucide React

### Infrastructure (AWS) - *Not Yet Implemented*
- **Hosting:** S3 + CloudFront
- **API:** API Gateway
- **Functions:** Lambda (Node.js for presigned URLs)
- **Storage:** S3 Private buckets (secure RFQ uploads)

### CMS - *Placeholder Data*
- **Sanity.io:** Headless CMS (mock data currently)

## 🎨 Design System

### Color Palette
```css
/* Primary - Manufacturing Dark Grays */
--primary: 222.2 47.4% 11.2%;     /* slate-900 */
--foreground: 222.2 84% 4.9%;

/* Accent - Safety Orange/Red (CTAs) */
--accent: 18 100% 48%;             /* orange-600 */

/* Background - Clean White */
--background: 0 0% 100%;
--muted: 210 40% 96.1%;            /* slate-50 for sections */
```

### Typography
- **Font:** Inter (via Google Fonts)
- **Style:** Sans-serif, high legibility
- **Philosophy:** Industrial, professional, trust-focused

## 📄 Pages Overview

### 1. Homepage (`/`)
- **Hero:** Full-width with trust badges (ISO 9001, Security, Quality)
- **Buyer Segmenter:** Engineers → Prototyping | Procurement → Production
- **CTAs:** "Start a Quote" (Primary), "View Capabilities" (Secondary)
- **SEO:** Optimized metadata with keywords

### 2. Quote Wizard (`/quote`) 🎯 **CRITICAL SALES ENGINE**
**3-Step Multi-Step Form:**

**Step 1 - Qualification:**
- Timeline selection (Immediate vs. Forecast)
- Optional project name

**Step 2 - Material Selection:**
- Material type (Stainless, Aluminum, etc.)
- Optional grade and quantity

**Step 3 - Upload & Contact:**
- Secure file dropzone (CAD, drawings, PDFs)
- Contact information form
- "256-bit Encrypted" trust badge

**Features:**
- Zustand state persistence (survives page refresh)
- Framer Motion step transitions
- Real-time Zod validation
- Progress indicator
- Success confirmation screen

### 3. Industry Pages (`/industries/[slug]`)
**Three Industry Solutions:**
- `/industries/medical-device`
- `/industries/restaurant-equipment`
- `/industries/telecom-enclosures`

**Template Structure:**
- Hero with industry-specific messaging
- "The Challenge" section
- "The HFI Solution" with feature checklist
- Case study card with results
- CTA section with quote link

### 4. Capabilities Pages
**For Engineers (`/capabilities/prototyping`):**
- Quick-turn prototyping (2-3 weeks)
- DFM support
- NDA protection
- Material selection guidance

**For Procurement Managers (`/capabilities/production`):**
- High-volume scalability (100-100K+ units)
- ISO 9001:2015 quality systems
- Reliable lead times & JIT delivery
- Competitive pricing
- Performance metrics dashboard

## 🔒 Security Patterns

### File Upload Security
1. **Frontend:** User selects files
2. **Request:** Client requests presigned URL from Lambda
3. **Lambda:** Generates S3 presigned URL (time-limited, encrypted)
4. **Upload:** Client uploads directly to S3 private bucket
5. **Display:** "256-bit Encrypted" trust badge

**NEVER:** Direct file upload to server
**ALWAYS:** Presigned URL pattern

### Environment Variables
See `.env.example` for required variables:
- AWS credentials (access key, secret, region, bucket)
- Sanity.io configuration
- SMTP settings for RFQ notifications

## 🎯 Core Philosophy

Every design decision supports:
1. **Lead Generation:** Drive users to Quote Wizard
2. **Trust Signals:** ISO 9001:2015, medical/telecom standards
3. **Security:** IP protection, 256-bit encryption
4. **Precision:** Clean industrial design reflects manufacturing quality

## 🚧 Remaining Work

### High Priority
- [ ] AWS Lambda functions for presigned URL generation
- [ ] Client-side presigned URL upload implementation
- [ ] Sanity.io CMS integration (currently mock data)
- [ ] Image optimization (placeholder paths currently)

### Medium Priority
- [ ] End-to-end testing with Playwright
- [ ] Responsive design testing (mobile/tablet)
- [ ] SEO metadata verification
- [ ] Security audit (AWS credentials check)

### Low Priority
- [ ] Video background for Hero (currently gradient)
- [ ] Blog/Resources section
- [ ] Customer testimonials component

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build verification
npm run build

# Playwright E2E (not yet implemented)
npm run test:e2e
```

## 📦 Dependencies

### Production
- `next` - React framework
- `react`, `react-dom` - UI library
- `zustand` - State management
- `react-hook-form` - Form handling
- `zod`, `@hookform/resolvers` - Validation
- `framer-motion` - Animations
- `lucide-react` - Icons
- `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge` - Styling

### Development
- `typescript` - Type safety
- `@types/*` - Type definitions
- `eslint` - Linting
- `autoprefixer`, `postcss` - CSS processing

## 🌐 Deployment

**Target Infrastructure:** AWS S3 + CloudFront

```bash
# Build static export
npm run build

# Output directory: ./out/
# Deploy ./out/ to S3 bucket
# Invalidate CloudFront cache
```

**Static Export Configuration:**
- `next.config.js` has `output: 'export'`
- All pages are pre-rendered at build time
- No server-side runtime required

## 📝 Content Strategy

### Target Audiences
1. **Engineers:** Precision, prototyping, technical specs
2. **Procurement Managers:** Capacity, lead times, compliance, pricing

### Industries Served
- Medical Device Manufacturing
- Telecommunications Infrastructure
- Restaurant Equipment
- Precision Industrial Components

### Competitive Advantages
- ISO 9001:2015 Certified
- Medical/Telecom standards compliance
- Secure IP/NDA handling
- Stainless steel specialization
- Quick-turn prototyping → Volume production

## 🤝 Contributing

This is a private client project. Development workflow:

1. Create feature branch from `main`
2. Implement changes with type safety
3. Run `npm run type-check` and `npm run build`
4. Create pull request with description
5. Deploy to staging for client review

## 📧 Support

For questions or issues:
- **Technical:** Review CLAUDE.md and sysprompt.md
- **Business Logic:** See project requirements in CLAUDE.md

## 📄 License

Proprietary - HFI Manufacturing

---

**Last Updated:** 2025-11-22
**Status:** Production Ready (Core Features Complete)
**Next Milestone:** AWS integration + Sanity.io CMS
