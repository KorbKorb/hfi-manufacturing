import type { Industry } from '@/types'

export const industries: Record<string, Industry> = {
  'medical-device': {
    slug: 'medical-device',
    title: 'Medical Device Manufacturing',
    description: 'Precision stainless steel components for medical device OEMs with full traceability and compliance documentation.',
    heroImage: '/images/industries/medical-device.svg',
    challenge: {
      title: 'The Challenge',
      content: 'Medical device manufacturers face stringent regulatory requirements, demanding biocompatible materials, full traceability, and zero-defect quality standards. Traditional fabrication shops often lack the certifications and process controls necessary for FDA compliance.',
    },
    solution: {
      title: 'The HFI Solution',
      content: 'Our ISO 9001:2015 certified facility specializes in medical-grade stainless steel fabrication with complete material traceability and documented quality control at every step.',
      features: [
        'ISO 9001:2015 certified quality management system',
        'Biocompatible materials (316L stainless steel)',
        'Full material traceability and certifications',
        'Clean room capabilities for sterile components',
        'First Article Inspection (FAI) reports',
        'Statistical Process Control (SPC) monitoring',
      ],
    },
    caseStudy: {
      title: 'Surgical Instrument Housings',
      client: 'Leading Medical Device OEM',
      challenge: 'Required 316L stainless steel housings with +/- 0.001" tolerances and full FDA documentation.',
      solution: 'Developed streamlined fabrication process with in-process inspection and automated SPC tracking.',
      results: [
        '100% on-time delivery over 18 months',
        'Zero non-conformances in FDA audits',
        '30% cost reduction vs. previous supplier',
      ],
    },
    seo: {
      metaTitle: 'Medical Device Manufacturing | ISO 9001:2015 Certified Fabrication',
      metaDescription: 'Precision stainless steel components for medical devices. FDA-compliant fabrication with full traceability, biocompatible materials, and zero-defect quality.',
    },
  },

  'restaurant-equipment': {
    slug: 'restaurant-equipment',
    title: 'Restaurant Equipment Manufacturing',
    description: 'High-volume stainless steel fabrication for commercial foodservice equipment with NSF compliance and corrosion resistance.',
    heroImage: '/images/industries/restaurant-equipment.svg',
    challenge: {
      title: 'The Challenge',
      content: 'Restaurant equipment manufacturers need high-volume production of stainless steel components that meet NSF standards, resist harsh cleaning chemicals, and maintain appearance under heavy use. Cost pressures demand efficient manufacturing without sacrificing quality.',
    },
    solution: {
      title: 'The HFI Solution',
      content: 'We deliver cost-effective, high-volume stainless steel fabrication optimized for the foodservice industry with NSF-compliant materials and finishes.',
      features: [
        'NSF-certified stainless steel (304/316)',
        'High-volume production capabilities',
        'Specialized welding for food contact surfaces',
        'Consistent #4 brush or mirror finishes',
        'Cost-optimized material utilization',
        'Just-in-time delivery programs',
      ],
    },
    caseStudy: {
      title: 'Commercial Prep Table Components',
      client: 'National Foodservice Equipment Brand',
      challenge: 'Needed to reduce costs on high-volume stainless steel shelving while maintaining NSF compliance and finish quality.',
      solution: 'Implemented lean manufacturing cells with automated finish grinding and optimized material nesting.',
      results: [
        '18% reduction in per-unit cost',
        '99.8% on-time delivery rate',
        'Eliminated finish-related customer complaints',
      ],
    },
    seo: {
      metaTitle: 'Restaurant Equipment Fabrication | NSF-Certified Stainless Steel',
      metaDescription: 'High-volume stainless steel components for commercial foodservice equipment. NSF-compliant fabrication with cost-effective manufacturing and consistent quality.',
    },
  },

  'telecom-enclosures': {
    slug: 'telecom-enclosures',
    title: 'Telecom Enclosures',
    description: 'Rugged stainless steel and aluminum enclosures for telecommunications infrastructure with NEMA ratings and environmental protection.',
    heroImage: '/images/industries/telecom-enclosures.svg',
    challenge: {
      title: 'The Challenge',
      content: 'Telecommunications infrastructure requires weatherproof enclosures that protect sensitive electronics in harsh outdoor environments while meeting NEMA standards. Design changes are frequent, and lead times must be short to support rapid network deployments.',
    },
    solution: {
      title: 'The HFI Solution',
      content: 'We specialize in precision-welded enclosures with NEMA 4/4X ratings, offering both prototype and production capabilities to support evolving telecom infrastructure.',
      features: [
        'NEMA 4/4X rated weatherproof enclosures',
        'Stainless steel and aluminum options',
        'Integrated gasket channels and cable entry points',
        'Powder coating and anodizing capabilities',
        'Rapid prototyping (2-3 week turnaround)',
        'Scalable to high-volume production',
      ],
    },
    caseStudy: {
      title: '5G Small Cell Enclosures',
      client: 'Tier-1 Telecom Equipment Provider',
      challenge: 'Required rapid iteration on enclosure designs for new 5G small cell deployments with tight tolerances for RF shielding.',
      solution: 'Developed modular enclosure platform with quick-change tooling for design variations and in-house powder coating.',
      results: [
        '40% faster time-to-market vs. previous supplier',
        'Successfully scaled from prototypes to 10,000+ units/year',
        '100% pass rate on NEMA 4X testing',
      ],
    },
    seo: {
      metaTitle: 'Telecom Enclosure Manufacturing | NEMA 4/4X Rated Fabrication',
      metaDescription: 'Weatherproof stainless steel and aluminum enclosures for telecommunications. NEMA-rated fabrication with rapid prototyping and high-volume production.',
    },
  },
}

export const getIndustry = (slug: string): Industry | undefined => {
  return industries[slug]
}

export const getAllIndustrySlugs = (): string[] => {
  return Object.keys(industries)
}
