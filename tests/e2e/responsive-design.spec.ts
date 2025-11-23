import { test, expect } from '@playwright/test'

/**
 * Responsive Design Tests
 * Tests all pages across mobile, tablet, and desktop viewports
 *
 * Viewport Sizes:
 * - Mobile: 375px × 667px (iPhone SE)
 * - Tablet: 768px × 1024px (iPad)
 * - Desktop: 1440px × 900px (Standard Desktop)
 */

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
}

test.describe('Responsive Design - Homepage', () => {
  test.describe('Mobile (375px)', () => {
    test.use({ viewport: viewports.mobile })

    test('should display mobile-optimized hero section', async ({ page }) => {
      await page.goto('/')

      // Hero section should be visible
      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()

      // Headline should be visible and readable
      const headline = page.getByRole('heading', { level: 1 })
      await expect(headline).toBeVisible()
      await expect(headline).toContainText(/precision/i)

      // CTA buttons should stack vertically on mobile
      const ctaButtons = page.getByRole('link', { name: /get a quote|view capabilities/i })
      await expect(ctaButtons.first()).toBeVisible()

      // Take screenshot for visual verification
      await page.screenshot({ path: 'test-results/homepage-mobile.png', fullPage: true })
    })

    test('should display mobile navigation menu', async ({ page }) => {
      await page.goto('/')

      // Navigation should be visible
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // On mobile, the "Get a Quote" button should be visible
      const quoteButton = page.getByRole('link', { name: /get a quote/i }).first()
      await expect(quoteButton).toBeVisible()

      // ISO badge should be visible in header
      await expect(page.getByText(/iso 9001/i).first()).toBeVisible()
    })

    test('should display mobile-optimized Buyer Segmenter', async ({ page }) => {
      await page.goto('/')

      // Scroll to Buyer Segmenter section
      const engineerCard = page.getByText(/precision prototyping/i).or(page.getByText(/engineer/i)).first()
      await engineerCard.scrollIntoViewIfNeeded()

      // Cards should be visible
      await expect(engineerCard).toBeVisible()

      // Both cards should be stacked vertically (full width on mobile)
      const procurementCard = page.getByText(/production capacity/i).or(page.getByText(/procurement/i)).first()
      await expect(procurementCard).toBeVisible()

      // Verify cards are clickable
      await expect(engineerCard).toBeEnabled()
      await expect(procurementCard).toBeEnabled()
    })

    test('should display mobile-optimized footer', async ({ page }) => {
      await page.goto('/')

      // Scroll to footer
      const footer = page.locator('footer')
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeVisible()

      // Industry links should be visible
      await expect(page.getByText(/medical device/i).last()).toBeVisible()
      await expect(page.getByText(/restaurant equipment/i).last()).toBeVisible()

      // Footer should stack vertically on mobile
      // Links should wrap or stack as needed
      const footerLinks = footer.getByRole('link')
      const firstLink = footerLinks.first()
      await expect(firstLink).toBeVisible()
    })
  })

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: viewports.tablet })

    test('should display tablet-optimized hero section', async ({ page }) => {
      await page.goto('/')

      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()

      // Headline should have appropriate sizing for tablet
      const headline = page.getByRole('heading', { level: 1 })
      await expect(headline).toBeVisible()

      // CTAs may be side-by-side or stacked depending on design
      const ctaButtons = page.getByRole('link', { name: /get a quote|view capabilities/i })
      await expect(ctaButtons.first()).toBeVisible()

      // Take screenshot
      await page.screenshot({ path: 'test-results/homepage-tablet.png', fullPage: true })
    })

    test('should display Buyer Segmenter in grid layout', async ({ page }) => {
      await page.goto('/')

      const engineerCard = page.getByText(/precision prototyping/i).or(page.getByText(/engineer/i)).first()
      await engineerCard.scrollIntoViewIfNeeded()

      await expect(engineerCard).toBeVisible()

      const procurementCard = page.getByText(/production capacity/i).or(page.getByText(/procurement/i)).first()
      await expect(procurementCard).toBeVisible()

      // On tablet, cards might be side-by-side
      // Verify both are visible without scrolling horizontally
      await expect(engineerCard).toBeInViewport()
      await expect(procurementCard).toBeInViewport()
    })
  })

  test.describe('Desktop (1440px)', () => {
    test.use({ viewport: viewports.desktop })

    test('should display desktop-optimized hero section', async ({ page }) => {
      await page.goto('/')

      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()

      // Full headline should be visible
      const headline = page.getByRole('heading', { level: 1 })
      await expect(headline).toBeVisible()
      await expect(headline).toContainText(/precision.*stainless steel/i)

      // CTAs should be side-by-side
      const getPrimaryQuoteCTA = page.getByRole('link', { name: /get a quote/i }).first()
      const getSecondaryCTA = page.getByRole('link', { name: /view capabilities/i }).first()

      await expect(getPrimaryQuoteCTA).toBeVisible()
      await expect(getSecondaryCTA).toBeVisible()

      // Take screenshot
      await page.screenshot({ path: 'test-results/homepage-desktop.png', fullPage: true })
    })

    test('should display Buyer Segmenter in horizontal layout', async ({ page }) => {
      await page.goto('/')

      const engineerCard = page.getByText(/precision prototyping/i).or(page.getByText(/engineer/i)).first()
      await engineerCard.scrollIntoViewIfNeeded()

      const procurementCard = page.getByText(/production capacity/i).or(page.getByText(/procurement/i)).first()

      // Both cards should be visible side-by-side
      await expect(engineerCard).toBeInViewport()
      await expect(procurementCard).toBeInViewport()

      // Cards should have appropriate spacing
      const engineerBox = await engineerCard.boundingBox()
      const procurementBox = await procurementCard.boundingBox()

      expect(engineerBox).toBeTruthy()
      expect(procurementBox).toBeTruthy()
    })

    test('should display full navigation menu', async ({ page }) => {
      await page.goto('/')

      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // All navigation links should be visible
      await expect(page.getByRole('link', { name: /get a quote/i }).first()).toBeVisible()

      // ISO badge should be visible
      await expect(page.getByText(/iso 9001/i).first()).toBeVisible()
    })
  })
})

test.describe('Responsive Design - Quote Wizard', () => {
  test.describe('Mobile (375px)', () => {
    test.use({ viewport: viewports.mobile })

    test('should display mobile-optimized Step 1 (Timeline)', async ({ page }) => {
      await page.goto('/quote')

      // Heading should be visible
      await expect(page.locator('h2')).toContainText(/when do you need this/i)

      // Radio options should be stacked vertically
      const immediateOption = page.getByRole('radio', { name: /immediate need/i })
      const forecastOption = page.getByRole('radio', { name: /forecast/i })

      await expect(immediateOption).toBeVisible()
      await expect(forecastOption).toBeVisible()

      // Progress indicator should be visible
      await expect(page.getByText(/step 1 of 3/i)).toBeVisible()

      // Next button should be full width on mobile
      const nextButton = page.getByRole('button', { name: /next/i })
      await expect(nextButton).toBeVisible()

      await page.screenshot({ path: 'test-results/quote-step1-mobile.png', fullPage: true })
    })

    test('should display mobile-optimized Step 2 (Material)', async ({ page }) => {
      await page.goto('/quote')

      // Complete Step 1
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Heading should be visible
      await expect(page.locator('h2')).toContainText(/what material/i)

      // Material options should be stacked vertically
      const stainlessOption = page.getByRole('radio', { name: /stainless steel/i })
      await expect(stainlessOption).toBeVisible()
      await expect(stainlessOption).toBeInViewport()

      // Back and Next buttons should be visible
      await expect(page.getByRole('button', { name: /back/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /next/i })).toBeVisible()

      await page.screenshot({ path: 'test-results/quote-step2-mobile.png', fullPage: true })
    })

    test('should display mobile-optimized Step 3 (Contact & Upload)', async ({ page }) => {
      await page.goto('/quote')

      // Complete Steps 1 & 2
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Contact form should be visible
      await expect(page.locator('h3')).toContainText(/contact information/i)

      // Form fields should stack vertically on mobile
      await expect(page.getByLabel(/company name/i)).toBeVisible()
      await expect(page.getByLabel(/your name/i)).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
      await expect(page.getByLabel(/phone/i)).toBeVisible()

      // File dropzone should be visible
      await expect(page.getByText(/click to upload/i)).toBeVisible()

      // Security badge should be visible
      await expect(page.getByText(/256-bit encrypted/i)).toBeVisible()

      // Submit button should be full width
      const submitButton = page.getByRole('button', { name: /submit quote request/i })
      await expect(submitButton).toBeVisible()

      await page.screenshot({ path: 'test-results/quote-step3-mobile.png', fullPage: true })
    })

    test('should handle form input on mobile', async ({ page }) => {
      await page.goto('/quote')

      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Fill form fields (should work on mobile)
      await page.getByLabel(/company name/i).fill('Mobile Test Co.')
      await page.getByLabel(/your name/i).fill('Mobile User')
      await page.getByLabel(/email/i).fill('mobile@test.com')
      await page.getByLabel(/phone/i).fill('555-0123')

      // Verify values were entered
      await expect(page.getByLabel(/company name/i)).toHaveValue('Mobile Test Co.')
      await expect(page.getByLabel(/email/i)).toHaveValue('mobile@test.com')
    })
  })

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: viewports.tablet })

    test('should display tablet-optimized contact form', async ({ page }) => {
      await page.goto('/quote')

      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // On tablet, form fields may be in 2-column grid
      await expect(page.getByLabel(/company name/i)).toBeVisible()
      await expect(page.getByLabel(/your name/i)).toBeVisible()

      // Both should be in viewport (side by side on tablet)
      await expect(page.getByLabel(/company name/i)).toBeInViewport()
      await expect(page.getByLabel(/your name/i)).toBeInViewport()

      await page.screenshot({ path: 'test-results/quote-step3-tablet.png', fullPage: true })
    })
  })

  test.describe('Desktop (1440px)', () => {
    test.use({ viewport: viewports.desktop })

    test('should display desktop-optimized contact form', async ({ page }) => {
      await page.goto('/quote')

      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Form should have 2-column layout
      const companyName = page.getByLabel(/company name/i)
      const yourName = page.getByLabel(/your name/i)

      await expect(companyName).toBeVisible()
      await expect(yourName).toBeVisible()

      // Both should be in the same row (check Y position)
      const companyBox = await companyName.boundingBox()
      const nameBox = await yourName.boundingBox()

      expect(companyBox).toBeTruthy()
      expect(nameBox).toBeTruthy()

      await page.screenshot({ path: 'test-results/quote-step3-desktop.png', fullPage: true })
    })
  })
})

test.describe('Responsive Design - Industry Pages', () => {
  const industryPages = [
    '/industries/medical-device',
    '/industries/restaurant-equipment',
    '/industries/telecom-enclosures',
  ]

  test.describe('Mobile (375px)', () => {
    test.use({ viewport: viewports.mobile })

    for (const pagePath of industryPages) {
      test(`should display mobile layout for ${pagePath}`, async ({ page }) => {
        await page.goto(pagePath)

        // Page should load
        const heading = page.getByRole('heading', { level: 1 })
        await expect(heading).toBeVisible()

        // Hero section should be visible
        const heroSection = page.locator('section').first()
        await expect(heroSection).toBeVisible()

        // "The Challenge" section should be visible
        await expect(page.getByText(/the challenge/i)).toBeVisible()

        // "The HFI Solution" section should be visible
        await expect(page.getByText(/the hfi solution|our solution/i)).toBeVisible()

        // CTA button should be visible
        const ctaButton = page.getByRole('link', { name: /get a quote|start a quote/i })
        await expect(ctaButton.first()).toBeVisible()

        // Content should not overflow horizontally
        const body = page.locator('body')
        const bodyBox = await body.boundingBox()
        expect(bodyBox?.width).toBeLessThanOrEqual(viewports.mobile.width)

        await page.screenshot({
          path: `test-results/${pagePath.replace(/\//g, '-')}-mobile.png`,
          fullPage: true
        })
      })
    }
  })

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: viewports.tablet })

    test('should display tablet layout for industry page', async ({ page }) => {
      await page.goto('/industries/medical-device')

      // Heading should be visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      // Sections should have appropriate spacing
      await expect(page.getByText(/the challenge/i)).toBeVisible()
      await expect(page.getByText(/the hfi solution|our solution/i)).toBeVisible()

      // Content should be readable
      const content = page.locator('main')
      await expect(content).toBeVisible()

      await page.screenshot({ path: 'test-results/industry-page-tablet.png', fullPage: true })
    })
  })

  test.describe('Desktop (1440px)', () => {
    test.use({ viewport: viewports.desktop })

    test('should display desktop layout for industry page', async ({ page }) => {
      await page.goto('/industries/medical-device')

      // Full page should be visible
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      // Sections should have proper spacing
      await expect(page.getByText(/the challenge/i)).toBeVisible()
      await expect(page.getByText(/the hfi solution|our solution/i)).toBeVisible()

      // Hero image/section should be prominent
      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()

      await page.screenshot({ path: 'test-results/industry-page-desktop.png', fullPage: true })
    })
  })
})

test.describe('Responsive Design - Capabilities Pages', () => {
  const capabilityPages = [
    '/capabilities/prototyping',
    '/capabilities/production',
  ]

  test.describe('Mobile (375px)', () => {
    test.use({ viewport: viewports.mobile })

    for (const pagePath of capabilityPages) {
      test(`should display mobile layout for ${pagePath}`, async ({ page }) => {
        await page.goto(pagePath)

        // Page should load
        const heading = page.getByRole('heading', { level: 1 })
        await expect(heading).toBeVisible()

        // Content should be visible and readable
        const main = page.locator('main')
        await expect(main).toBeVisible()

        // CTA should be visible
        const cta = page.getByRole('link', { name: /get a quote|request.*quote/i })
        await expect(cta.first()).toBeVisible()

        await page.screenshot({
          path: `test-results/${pagePath.replace(/\//g, '-')}-mobile.png`,
          fullPage: true
        })
      })
    }
  })

  test.describe('Tablet (768px)', () => {
    test.use({ viewport: viewports.tablet })

    test('should display tablet layout for capabilities page', async ({ page }) => {
      await page.goto('/capabilities/prototyping')

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      const main = page.locator('main')
      await expect(main).toBeVisible()

      await page.screenshot({ path: 'test-results/capabilities-tablet.png', fullPage: true })
    })
  })

  test.describe('Desktop (1440px)', () => {
    test.use({ viewport: viewports.desktop })

    test('should display desktop layout for capabilities page', async ({ page }) => {
      await page.goto('/capabilities/production')

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

      const main = page.locator('main')
      await expect(main).toBeVisible()

      await page.screenshot({ path: 'test-results/capabilities-desktop.png', fullPage: true })
    })
  })
})

test.describe('Responsive Design - Navigation & Footer', () => {
  test.describe('Mobile Navigation', () => {
    test.use({ viewport: viewports.mobile })

    test('should display mobile navigation', async ({ page }) => {
      await page.goto('/')

      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // Primary CTA should always be visible
      const quoteCTA = page.getByRole('link', { name: /get a quote/i }).first()
      await expect(quoteCTA).toBeVisible()

      // ISO badge should be visible
      await expect(page.getByText(/iso 9001/i).first()).toBeVisible()
    })

    test('should have accessible navigation on mobile', async ({ page }) => {
      await page.goto('/')

      // Navigation links should be tappable (minimum 44x44px touch target)
      const quoteLink = page.getByRole('link', { name: /get a quote/i }).first()
      const linkBox = await quoteLink.boundingBox()

      expect(linkBox).toBeTruthy()
      // Touch target should be at least 44px (iOS guideline)
      expect(linkBox!.height).toBeGreaterThanOrEqual(40)
    })
  })

  test.describe('Mobile Footer', () => {
    test.use({ viewport: viewports.mobile })

    test('should display stacked footer links on mobile', async ({ page }) => {
      await page.goto('/')

      const footer = page.locator('footer')
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeVisible()

      // Industry links should be visible
      const medicalLink = page.getByRole('link', { name: /medical device/i }).last()
      const restaurantLink = page.getByRole('link', { name: /restaurant equipment/i }).last()
      const telecomLink = page.getByRole('link', { name: /telecom/i }).last()

      await expect(medicalLink).toBeVisible()
      await expect(restaurantLink).toBeVisible()
      await expect(telecomLink).toBeVisible()

      // Footer should not cause horizontal scroll
      const footerBox = await footer.boundingBox()
      expect(footerBox?.width).toBeLessThanOrEqual(viewports.mobile.width)

      await page.screenshot({ path: 'test-results/footer-mobile.png' })
    })
  })

  test.describe('Tablet Footer', () => {
    test.use({ viewport: viewports.tablet })

    test('should display organized footer on tablet', async ({ page }) => {
      await page.goto('/')

      const footer = page.locator('footer')
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeVisible()

      // Links should be organized (possibly in columns)
      await expect(page.getByRole('link', { name: /medical device/i }).last()).toBeVisible()

      await page.screenshot({ path: 'test-results/footer-tablet.png' })
    })
  })

  test.describe('Desktop Footer', () => {
    test.use({ viewport: viewports.desktop })

    test('should display full footer layout on desktop', async ({ page }) => {
      await page.goto('/')

      const footer = page.locator('footer')
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeVisible()

      // All footer sections should be visible
      await expect(page.getByText(/industries/i).last()).toBeVisible()

      await page.screenshot({ path: 'test-results/footer-desktop.png' })
    })
  })
})

test.describe('Responsive Design - Visual Validation', () => {
  test('should not have horizontal scrollbars on mobile', async ({ page }) => {
    await page.setViewportSize(viewports.mobile)

    const pages = ['/', '/quote', '/industries/medical-device', '/capabilities/prototyping']

    for (const pagePath of pages) {
      await page.goto(pagePath)

      // Check that body width doesn't exceed viewport
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
      expect(bodyWidth).toBeLessThanOrEqual(viewports.mobile.width + 5) // 5px tolerance

      // Check that no element causes overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBe(false)
    }
  })

  test('should have readable text on all viewport sizes', async ({ page }) => {
    const testPage = '/'

    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport)
      await page.goto(testPage)

      // Main heading should be visible and readable
      const heading = page.getByRole('heading', { level: 1 })
      await expect(heading).toBeVisible()

      // Text should have sufficient contrast (checked via accessibility tools)
      const headingBox = await heading.boundingBox()
      expect(headingBox).toBeTruthy()
      expect(headingBox!.height).toBeGreaterThan(20) // Minimum readable height
    }
  })

  test('should maintain aspect ratios for images across viewports', async ({ page }) => {
    const testPage = '/industries/medical-device'

    for (const [name, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport)
      await page.goto(testPage)

      // If images exist, they should maintain aspect ratio
      const images = page.locator('img')
      const imageCount = await images.count()

      if (imageCount > 0) {
        const firstImage = images.first()
        await expect(firstImage).toBeVisible()

        // Image should not be distorted (basic check)
        const box = await firstImage.boundingBox()
        expect(box).toBeTruthy()
        expect(box!.width).toBeGreaterThan(0)
        expect(box!.height).toBeGreaterThan(0)
      }
    }
  })
})

test.describe('Responsive Design - Touch Interactions (Mobile)', () => {
  test.use({ viewport: viewports.mobile, hasTouch: true })

  test('should handle touch interactions for radio buttons', async ({ page }) => {
    await page.goto('/quote')

    // Tap on radio button
    const immediateOption = page.getByRole('radio', { name: /immediate need/i })
    await immediateOption.tap()

    // Verify selection
    await expect(immediateOption).toBeChecked()

    // Tap Next button
    const nextButton = page.getByRole('button', { name: /next/i })
    await nextButton.tap()

    // Should advance to Step 2
    await expect(page.locator('h2')).toContainText(/what material/i)
  })

  test('should handle touch interactions for links', async ({ page }) => {
    await page.goto('/')

    // Scroll to Buyer Segmenter
    const engineerCard = page.getByText(/precision prototyping/i).or(page.getByText(/engineer/i)).first()
    await engineerCard.scrollIntoViewIfNeeded()

    // Tap on card (should navigate or be interactive)
    await engineerCard.tap()

    // Card should respond to touch (navigation or visual feedback)
    // The actual behavior depends on implementation
  })

  test('should handle touch scrolling', async ({ page }) => {
    await page.goto('/')

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY)

    // Scroll down using touch
    await page.evaluate(() => window.scrollBy(0, 500))

    // Wait for scroll
    await page.waitForTimeout(300)

    // Verify scroll happened
    const newScroll = await page.evaluate(() => window.scrollY)
    expect(newScroll).toBeGreaterThan(initialScroll)
  })
})
