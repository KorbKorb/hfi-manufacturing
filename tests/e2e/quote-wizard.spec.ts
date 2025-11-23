import { test, expect } from '@playwright/test'
import path from 'path'

/**
 * E2E Tests for Quote Wizard
 * Tests the complete quote request flow including validations, navigation, and file uploads
 */

test.describe('Quote Wizard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the quote wizard
    await page.goto('/quote')

    // Wait for the page to load
    await expect(page.locator('h1')).toContainText('Request a Quote')
  })

  test.describe('Happy Path - Complete Quote Flow', () => {
    test('should complete entire quote wizard successfully', async ({ page }) => {
      // Step 1: Timeline Selection
      await expect(page.locator('h2')).toContainText('When do you need this?')

      // Select "Immediate need" option
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await expect(page.getByRole('radio', { name: /immediate need/i })).toBeChecked()

      // Click Next button
      await page.getByRole('button', { name: /next/i }).click()

      // Step 2: Material Selection
      await expect(page.locator('h2')).toContainText('What material do you need?')

      // Select "Stainless Steel" option
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await expect(page.getByRole('radio', { name: /stainless steel/i })).toBeChecked()

      // Click Next button
      await page.getByRole('button', { name: /next/i }).click()

      // Step 3: Contact Information & File Upload
      await expect(page.locator('h3')).toContainText('Upload Files')

      // Fill in contact form
      await page.getByLabel(/company name/i).fill('Test Company Inc.')
      await page.getByLabel(/your name/i).fill('John Doe')
      await page.getByLabel(/email address/i).fill('john@testcompany.com')
      await page.getByLabel(/phone number/i).fill('+1 (555) 123-4567')
      await page.getByLabel(/additional notes/i).fill('This is a test quote request for integration testing.')

      // Submit the form
      await page.getByRole('button', { name: /submit quote request/i }).click()

      // Wait for success screen
      await expect(page.locator('h3')).toContainText('Quote Request Submitted!')
      await expect(page.getByText(/thank you for your request/i)).toBeVisible()
      await expect(page.getByText(/john@testcompany\.com/i)).toBeVisible()

      // Verify "Submit Another Quote" button is present
      await expect(page.getByRole('button', { name: /submit another quote/i })).toBeVisible()
    })
  })

  test.describe('Validation Errors', () => {
    test('Step 1: should show validation error if no timeline selected', async ({ page }) => {
      // Try to proceed without selecting a timeline
      await page.getByRole('button', { name: /next/i }).click()

      // Should still be on step 1 (validated by heading)
      await expect(page.locator('h2')).toContainText('When do you need this?')

      // Verify error message or that we didn't advance
      // Note: Since Zod validation might prevent submission, check we're still on step 1
      const progressIndicator = page.locator('text=/step 1 of 3/i')
      await expect(progressIndicator).toBeVisible()
    })

    test('Step 2: should show validation error if no material selected', async ({ page }) => {
      // Complete Step 1
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Try to proceed without selecting material
      await page.getByRole('button', { name: /next/i }).click()

      // Should still be on step 2
      await expect(page.locator('h2')).toContainText('What material do you need?')
    })

    test('Step 3: should show validation errors for required contact fields', async ({ page }) => {
      // Complete Step 1
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Complete Step 2
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Try to submit without filling required fields
      await page.getByRole('button', { name: /submit quote request/i }).click()

      // Check for validation error messages
      // These should appear inline with the form fields
      await expect(page.getByText(/company name.*required/i).or(page.locator('[id*="companyName-error"]'))).toBeVisible()
    })

    test('Step 3: should validate email format', async ({ page }) => {
      // Complete Step 1 & 2
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Fill form with invalid email
      await page.getByLabel(/company name/i).fill('Test Company')
      await page.getByLabel(/your name/i).fill('John Doe')
      await page.getByLabel(/email address/i).fill('invalid-email')
      await page.getByLabel(/phone number/i).fill('555-1234')

      // Try to submit
      await page.getByRole('button', { name: /submit quote request/i }).click()

      // Should show email validation error
      await expect(page.getByText(/invalid.*email/i).or(page.locator('[id*="email-error"]'))).toBeVisible()
    })
  })

  test.describe('Navigation', () => {
    test('should navigate back from Step 2 to Step 1', async ({ page }) => {
      // Complete Step 1
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Verify we're on Step 2
      await expect(page.locator('h2')).toContainText('What material do you need?')

      // Click Back button
      await page.getByRole('button', { name: /back/i }).click()

      // Verify we're back on Step 1
      await expect(page.locator('h2')).toContainText('When do you need this?')

      // Verify previous selection is still there
      await expect(page.getByRole('radio', { name: /immediate need/i })).toBeChecked()
    })

    test('should navigate back from Step 3 to Step 2', async ({ page }) => {
      // Complete Steps 1 & 2
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Verify we're on Step 3
      await expect(page.locator('h3')).toContainText('Contact Information')

      // Click Back button
      await page.getByRole('button', { name: /back/i }).click()

      // Verify we're back on Step 2
      await expect(page.locator('h2')).toContainText('What material do you need?')

      // Verify previous selection is still there
      await expect(page.getByRole('radio', { name: /stainless steel/i })).toBeChecked()
    })

    test('should maintain all data when navigating back and forth', async ({ page }) => {
      // Fill Step 1
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Fill Step 2
      await page.getByRole('radio', { name: /aluminum/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Fill Step 3 partially
      await page.getByLabel(/company name/i).fill('Persistent Company')
      await page.getByLabel(/email address/i).fill('test@persistent.com')

      // Go back to Step 2
      await page.getByRole('button', { name: /back/i }).click()
      await expect(page.getByRole('radio', { name: /aluminum/i })).toBeChecked()

      // Go back to Step 1
      await page.getByRole('button', { name: /back/i }).click()
      await expect(page.getByRole('radio', { name: /immediate need/i })).toBeChecked()

      // Go forward to Step 2
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.getByRole('radio', { name: /aluminum/i })).toBeChecked()

      // Go forward to Step 3
      await page.getByRole('button', { name: /next/i }).click()

      // Verify previously entered data is still there
      await expect(page.getByLabel(/company name/i)).toHaveValue('Persistent Company')
      await expect(page.getByLabel(/email address/i)).toHaveValue('test@persistent.com')
    })
  })

  test.describe('State Persistence', () => {
    test('should persist form data after page refresh', async ({ page }) => {
      // Fill Step 1
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Fill Step 2
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Fill Step 3 partially
      await page.getByLabel(/company name/i).fill('Persistence Test Inc.')
      await page.getByLabel(/your name/i).fill('Jane Smith')
      await page.getByLabel(/email address/i).fill('jane@persistence.com')

      // Reload the page
      await page.reload()

      // Wait for page to load
      await expect(page.locator('h1')).toContainText('Request a Quote')

      // Verify we're back on Step 3 (where we left off)
      // Due to Zustand persistence, the wizard should restore to the current step
      await expect(page.locator('h3')).toContainText('Contact Information')

      // Verify the form data persisted
      await expect(page.getByLabel(/company name/i)).toHaveValue('Persistence Test Inc.')
      await expect(page.getByLabel(/your name/i)).toHaveValue('Jane Smith')
      await expect(page.getByLabel(/email address/i)).toHaveValue('jane@persistence.com')
    })

    test('should clear state and start fresh after "Submit Another Quote"', async ({ page }) => {
      // Complete entire flow
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByLabel(/company name/i).fill('Clear Test Co.')
      await page.getByLabel(/your name/i).fill('Bob Johnson')
      await page.getByLabel(/email address/i).fill('bob@cleartest.com')
      await page.getByLabel(/phone number/i).fill('+1 555-9999')
      await page.getByRole('button', { name: /submit quote request/i }).click()

      // Verify success screen
      await expect(page.locator('h3')).toContainText('Quote Request Submitted!')

      // Click "Submit Another Quote"
      await page.getByRole('button', { name: /submit another quote/i }).click()

      // Should be back at Step 1 with a clean slate
      await expect(page.locator('h2')).toContainText('When do you need this?')

      // Verify no options are selected
      const immediateRadio = page.getByRole('radio', { name: /immediate need/i })
      const forecastRadio = page.getByRole('radio', { name: /forecast/i })
      await expect(immediateRadio).not.toBeChecked()
      await expect(forecastRadio).not.toBeChecked()
    })
  })

  test.describe('File Upload UI', () => {
    test('should display file dropzone with security badge', async ({ page }) => {
      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Verify file upload section is visible
      await expect(page.locator('h3')).toContainText('Upload Files')

      // Verify security badge is present
      await expect(page.getByText(/256-bit encrypted/i)).toBeVisible()

      // Verify dropzone instructions
      await expect(page.getByText(/click to upload.*or drag and drop/i)).toBeVisible()
      await expect(page.getByText(/max 5 files/i)).toBeVisible()
    })

    test('should show selected file in the list', async ({ page, context }) => {
      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Create a test file in memory
      const fileContent = 'This is a test PDF file content'
      const buffer = Buffer.from(fileContent)

      // Find the file input
      const fileInput = page.locator('input[type="file"]')

      // Upload file
      await fileInput.setInputFiles({
        name: 'test-drawing.pdf',
        mimeType: 'application/pdf',
        buffer,
      })

      // Verify file appears in the list
      await expect(page.getByText('test-drawing.pdf')).toBeVisible()
      await expect(page.getByText(/selected files.*1\/5/i)).toBeVisible()
    })

    test('should allow removing selected files', async ({ page }) => {
      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Upload a test file
      const fileInput = page.locator('input[type="file"]')
      await fileInput.setInputFiles({
        name: 'removable-file.dwg',
        mimeType: 'application/acad',
        buffer: Buffer.from('DWG file content'),
      })

      // Verify file is listed
      await expect(page.getByText('removable-file.dwg')).toBeVisible()

      // Find and click the remove button (X button)
      const removeButton = page.locator('[data-testid="remove-file-0"]').or(
        page.getByRole('button').filter({ has: page.locator('svg') }).first()
      )
      await removeButton.click()

      // Verify file is removed
      await expect(page.getByText('removable-file.dwg')).not.toBeVisible()
    })

    test('should handle multiple file selection', async ({ page }) => {
      // Navigate to Step 3
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()

      // Upload multiple files
      const fileInput = page.locator('input[type="file"]')
      await fileInput.setInputFiles([
        {
          name: 'file1.pdf',
          mimeType: 'application/pdf',
          buffer: Buffer.from('PDF 1'),
        },
        {
          name: 'file2.dwg',
          mimeType: 'application/acad',
          buffer: Buffer.from('DWG 1'),
        },
        {
          name: 'file3.step',
          mimeType: 'application/step',
          buffer: Buffer.from('STEP 1'),
        },
      ])

      // Verify all files appear
      await expect(page.getByText('file1.pdf')).toBeVisible()
      await expect(page.getByText('file2.dwg')).toBeVisible()
      await expect(page.getByText('file3.step')).toBeVisible()
      await expect(page.getByText(/selected files.*3\/5/i)).toBeVisible()
    })
  })

  test.describe('Success Screen', () => {
    test('should display all success screen elements', async ({ page }) => {
      // Complete entire wizard
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await page.getByLabel(/company name/i).fill('Success Screen Test')
      await page.getByLabel(/your name/i).fill('Test User')
      await page.getByLabel(/email address/i).fill('success@test.com')
      await page.getByLabel(/phone number/i).fill('555-0123')
      await page.getByRole('button', { name: /submit quote request/i }).click()

      // Verify success icon/checkmark
      const checkIcon = page.locator('svg').filter({ hasText: '' }).or(
        page.locator('[data-testid="success-icon"]')
      )
      await expect(checkIcon).toBeVisible()

      // Verify success heading
      await expect(page.locator('h3')).toContainText('Quote Request Submitted!')

      // Verify thank you message
      await expect(page.getByText(/thank you for your request/i)).toBeVisible()

      // Verify response time information
      await expect(page.getByText(/within 24 hours/i)).toBeVisible()

      // Verify email confirmation message with user's email
      await expect(page.getByText(/confirmation email.*success@test\.com/i)).toBeVisible()

      // Verify "Submit Another Quote" button
      await expect(page.getByRole('button', { name: /submit another quote/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /submit another quote/i })).toBeEnabled()
    })
  })

  test.describe('Progress Indicator', () => {
    test('should show correct step numbers throughout the wizard', async ({ page }) => {
      // Step 1
      await expect(page.getByText(/step 1 of 3/i)).toBeVisible()

      // Move to Step 2
      await page.getByRole('radio', { name: /immediate need/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.getByText(/step 2 of 3/i)).toBeVisible()

      // Move to Step 3
      await page.getByRole('radio', { name: /stainless steel/i }).check()
      await page.getByRole('button', { name: /next/i }).click()
      await expect(page.getByText(/step 3 of 3/i)).toBeVisible()
    })
  })
})
