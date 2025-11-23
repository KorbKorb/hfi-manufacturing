/**
 * Sanity.io Client Configuration
 *
 * Placeholder configuration for Sanity.io CMS integration.
 * Currently using mock data from lib/data/*.ts files.
 *
 * To enable Sanity.io:
 * 1. Set up Sanity project at https://sanity.io
 * 2. Add environment variables to .env:
 *    - NEXT_PUBLIC_SANITY_PROJECT_ID
 *    - NEXT_PUBLIC_SANITY_DATASET
 *    - SANITY_API_TOKEN (for mutations)
 * 3. Install @sanity/client: npm install @sanity/client
 * 4. Uncomment the code below
 */

// import { createClient } from '@sanity/client'

// export const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   apiVersion: '2024-01-01',
//   useCdn: true, // Set to false for fresh data
// })

// export const sanityAdminClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   apiVersion: '2024-01-01',
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// })

// Helper functions for common queries
export const sanityQueries = {
  getAllIndustries: `*[_type == "industry"] | order(title asc) {
    _id,
    slug,
    title,
    description,
    "heroImage": heroImage.asset->url,
    challenge,
    solution,
    caseStudy,
    seo
  }`,

  getIndustryBySlug: (slug: string) => `*[_type == "industry" && slug.current == "${slug}"][0] {
    _id,
    slug,
    title,
    description,
    "heroImage": heroImage.asset->url,
    challenge,
    solution,
    caseStudy,
    seo
  }`,

  getAllCapabilities: `*[_type == "capability"] | order(type asc) {
    _id,
    type,
    title,
    description,
    features,
    advantages
  }`,

  getCapabilityByType: (type: string) => `*[_type == "capability" && type == "${type}"][0] {
    _id,
    type,
    title,
    description,
    features,
    advantages
  }`,

  getAllTestimonials: `*[_type == "testimonial"] {
    _id,
    quote,
    author,
    role,
    company,
    "industry": industry->title,
    "image": image.asset->url
  }`,
}

// Mock client for development (until Sanity.io is configured)
export const getMockData = {
  industries: () => {
    // Using mock data from lib/data/industries.ts
    return null // Return null to indicate using local data
  },
  capabilities: () => {
    return null // Return null to indicate using local data
  },
}

export default getMockData
