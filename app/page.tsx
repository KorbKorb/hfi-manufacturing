import type { Metadata } from "next"
import { Hero } from "@/components/marketing/hero"
import { BuyerSegmenter } from "@/components/marketing/buyer-segmenter"

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
      <BuyerSegmenter />
    </>
  )
}
