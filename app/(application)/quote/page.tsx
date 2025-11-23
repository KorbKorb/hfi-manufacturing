import type { Metadata } from "next"
import { QuoteWizard } from "@/components/quote-engine/quote-wizard"

export const metadata: Metadata = {
  title: "Request a Quote - HFI Manufacturing",
  description: "Get a custom quote for precision stainless steel fabrication. Secure file upload, ISO 9001:2015 quality standards, and expert manufacturing consultation.",
  robots: "noindex, nofollow", // Don't index quote forms
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Request a Quote
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your project and receive a detailed quote within 24 hours
            </p>
          </div>
          <QuoteWizard />
        </div>
      </div>
    </div>
  )
}
