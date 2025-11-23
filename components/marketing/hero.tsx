import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrustBadge } from "./trust-badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Precision Stainless Steel Fabrication for Mission-Critical Supply Chains
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl">
            ISO 9001:2015 certified manufacturing partner for medical device, telecom, and restaurant equipment industries.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8"
            >
              <Link href="/quote">Start a Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 font-semibold text-lg px-8"
            >
              <Link href="/capabilities">View Capabilities</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            <TrustBadge variant="iso" />
            <TrustBadge variant="security" />
            <TrustBadge variant="quality" />
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/10 blur-3xl rounded-full" />
    </section>
  )
}
