import type { Metadata } from "next"
import { Hero } from "@/components/marketing/hero"
import { BuyerSegmenter } from "@/components/marketing/buyer-segmenter"
import { MaterialSuitability } from "@/components/marketing/material-suitability"
import { BendDeductionCalc } from "@/components/tools/bend-deduction-calc"

export const metadata: Metadata = {
  title: "HFI Manufacturing - ISO 9001:2015 Certified Stainless Steel Fabrication",
  description: "Precision stainless steel fabrication for medical device, telecom, and restaurant equipment industries. Quick-turn prototyping to high-volume production with ISO 9001:2015 quality standards.",
  keywords: ["stainless steel fabrication", "precision manufacturing", "medical device components", "telecom enclosures", "ISO 9001:2015", "prototyping", "production manufacturing"],
  openGraph: {
    title: "HFI Manufacturing - Precision Stainless Steel Fabrication",
    description: "ISO 9001:2015 certified manufacturing partner for mission-critical supply chains",
    type: "website",
    url: "https://hfimfg.com",
  },
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Material Selection Tool - Data-Driven Lead Magnet */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3 font-orbitron">
                Choose Your Material
              </h2>
              <p className="text-slate-400">
                Compare key properties to make informed engineering decisions
              </p>
            </div>
            <MaterialSuitability />
          </div>
        </div>
      </section>

      <BuyerSegmenter />

      {/* Engineering Toolbox - SEO + Bookmark Magnet */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3 font-orbitron">
                Engineer&apos;s Toolbox
              </h2>
              <p className="text-slate-400">
                Free precision calculators for sheet metal fabrication
              </p>
            </div>
            <div className="flex justify-center">
              <BendDeductionCalc />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
