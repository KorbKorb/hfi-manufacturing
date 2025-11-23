// Quote Wizard Types
export type Timeline = 'immediate' | 'forecast'
export type MaterialType = 'stainless-steel' | 'aluminum' | 'carbon-steel' | 'brass' | 'copper' | 'other'

export interface QuoteFormData {
  // Step 1: Qualification
  timeline: Timeline
  projectName?: string

  // Step 2: Material Selection
  material: MaterialType
  materialGrade?: string
  quantity?: number

  // Step 3: File Upload & Contact
  files?: File[]
  companyName: string
  contactName: string
  email: string
  phone: string
  additionalNotes?: string
}

export interface QuoteWizardState {
  currentStep: number
  formData: Partial<QuoteFormData>
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<QuoteFormData>) => void
  resetForm: () => void
}

// Industry Types
export type IndustrySlug = 'medical-device' | 'restaurant-equipment' | 'telecom-enclosures'

export interface Industry {
  slug: IndustrySlug
  title: string
  description: string
  heroImage: string
  challenge: {
    title: string
    content: string
  }
  solution: {
    title: string
    content: string
    features: string[]
  }
  caseStudy?: CaseStudy
  seo: {
    metaTitle: string
    metaDescription: string
  }
}

export interface CaseStudy {
  title: string
  client: string
  challenge: string
  solution: string
  results: string[]
  image?: string
}

// Capabilities Types
export type CapabilityType = 'prototyping' | 'production'

export interface Capability {
  type: CapabilityType
  title: string
  description: string
  features: string[]
  advantages: string[]
}

// AWS Types
export interface PresignedUrlRequest {
  fileName: string
  fileType: string
  fileSize: number
}

export interface PresignedUrlResponse {
  uploadUrl: string
  fileKey: string
  expiresIn: number
}

// CMS Types (Sanity)
export interface CMSImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt: string
}

export interface CMSContent {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
}
