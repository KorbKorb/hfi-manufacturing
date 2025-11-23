import { z } from 'zod'

// Step 1: Qualification Schema
export const qualificationSchema = z.object({
  timeline: z.enum(['immediate', 'forecast'], {
    message: 'Please select a timeline',
  }),
  projectName: z.string().optional(),
})

export type QualificationFormData = z.infer<typeof qualificationSchema>

// Step 2: Material Selection Schema
export const materialSchema = z.object({
  material: z.enum(
    ['stainless-steel', 'aluminum', 'carbon-steel', 'brass', 'copper', 'other'],
    {
      message: 'Please select a material type',
    }
  ),
  materialGrade: z.string().optional(),
  quantity: z.number().positive('Quantity must be greater than 0').optional(),
})

export type MaterialFormData = z.infer<typeof materialSchema>

// Step 3: File Upload & Contact Schema
export const contactSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  additionalNotes: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

// Complete Quote Form Schema (all steps combined)
export const completeQuoteSchema = qualificationSchema
  .merge(materialSchema)
  .merge(contactSchema)

export type CompleteQuoteData = z.infer<typeof completeQuoteSchema>
