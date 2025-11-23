import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, CheckCircle, Clock, DollarSign, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Production Manufacturing | High-Volume Stainless Steel Fabrication",
  description: "Scalable production manufacturing with ISO 9001:2015 quality, consistent lead times, and competitive pricing. From 100 to 100,000+ units annually.",
  keywords: ["production manufacturing", "high-volume fabrication", "ISO 9001", "stainless steel production", "supply chain"],
}

export default function ProductionPage() {
  const capabilities = [
    {
      icon: TrendingUp,
      title: "Scalable Capacity",
      description: "From 100 to 100,000+ units per year with consistent quality",
    },
    {
      icon: CheckCircle,
      title: "ISO 9001:2015 Quality",
      description: "Certified QMS with SPC monitoring and documented controls",
    },
    {
      icon: Clock,
      title: "Reliable Lead Times",
      description: "Consistent delivery schedules with JIT inventory options",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Optimized processes and material utilization for cost efficiency",
    },
  ]

  const features = [
    "High-volume fabrication (100 - 100,000+ units/year)",
    "Statistical Process Control (SPC) monitoring",
    "Automated inspection systems",
    "Supply chain integration & JIT delivery",
    "Annual pricing agreements available",
    "Dedicated account management",
  ]

  const qualityMetrics = [
    { metric: "On-Time Delivery", value: "99.2%" },
    { metric: "Quality Accept Rate", value: "99.8%" },
    { metric: "Customer Retention", value: "95%" },
    { metric: "Avg. Response Time", value: "< 24hrs" },
  ]

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-accent font-semibold mb-3">FOR PROCUREMENT MANAGERS</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Production Manufacturing Services
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Reliable, high-volume stainless steel fabrication with ISO 9001:2015 quality systems. Your manufacturing partner for consistent delivery and competitive pricing.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/quote">Request a Production Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Production Capabilities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="mb-4 rounded-full bg-accent/10 p-3 w-fit">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle>{capability.title}</CardTitle>
                      <CardDescription className="text-base">
                        {capability.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Performance Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {qualityMetrics.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                      {item.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.metric}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Production Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Model */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Partnership Model</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Prototype & Validation</h3>
                  <p className="text-muted-foreground">
                    Start with low-volume prototyping to validate design and establish quality benchmarks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Process Optimization</h3>
                  <p className="text-muted-foreground">
                    We develop lean manufacturing cells optimized for your specific part, reducing cost and lead time.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Production Ramp & Qualification</h3>
                  <p className="text-muted-foreground">
                    Gradual volume increase with statistical validation ensures stable production before full-scale launch.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ongoing Continuous Improvement</h3>
                  <p className="text-muted-foreground">
                    Regular business reviews, quality metrics reporting, and cost-reduction initiatives keep your supply chain competitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Production?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Request a production quote and receive detailed capacity analysis and pricing within 24 hours.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="/quote">Request Production Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
