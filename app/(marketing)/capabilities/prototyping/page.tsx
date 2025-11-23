import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, Shield, MessageSquare, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Prototyping Services | Rapid Iteration for Engineers - HFI Manufacturing",
  description: "Quick-turn precision prototyping for engineers. 2-3 week lead times, NDA protection, DFM support, and material expertise for stainless steel fabrication projects.",
  keywords: ["prototyping services", "rapid prototyping", "precision fabrication", "DFM support", "engineering services"],
}

export default function PrototypingPage() {
  const capabilities = [
    {
      icon: Zap,
      title: "Quick-Turn Prototyping",
      description: "2-3 week typical turnaround from drawings to finished parts",
    },
    {
      icon: FileText,
      title: "Design for Manufacturing (DFM)",
      description: "Engineering review to optimize designs for cost-effective production",
    },
    {
      icon: Shield,
      title: "NDA & IP Protection",
      description: "Confidentiality agreements standard for all prototype projects",
    },
    {
      icon: MessageSquare,
      title: "Material Selection Guidance",
      description: "Expert consultation on stainless grades, finishes, and alternatives",
    },
  ]

  const features = [
    "Precision tolerances down to +/- 0.001\"",
    "Complex geometries and tight bend radii",
    "Multiple material grades (304, 316L, aluminum, etc.)",
    "Various surface finishes (#4 brush, mirror, bead blast)",
    "First Article Inspection (FAI) reports",
    "Iterative design support and revisions",
  ]

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="text-accent font-semibold mb-3">FOR ENGINEERS</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rapid Prototyping Services
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              Turn your concepts into reality with precision stainless steel prototypes. From first sketch to validated design, we support your entire development cycle.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/quote">Request a Prototype Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Prototyping Capabilities
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

      {/* Technical Features */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Technical Capabilities</h2>
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

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Prototyping Process</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Submit Drawings & Requirements</h3>
                  <p className="text-muted-foreground">
                    Upload CAD files, technical drawings, or sketches through our secure quote portal. Include material preferences and finish requirements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Engineering Review & DFM</h3>
                  <p className="text-muted-foreground">
                    Our engineers review for manufacturability and suggest optimizations to reduce cost or improve performance.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fabrication & Inspection</h3>
                  <p className="text-muted-foreground">
                    Parts are precision-fabricated with in-process inspection and final FAI documentation.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Delivery & Iteration Support</h3>
                  <p className="text-muted-foreground">
                    Receive prototypes with full documentation. We support design iterations and transition to production volumes.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Prototype Your Design?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get a detailed quote within 24 hours. Upload your drawings and specifications through our secure portal.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="/quote">Start Your Prototype Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
