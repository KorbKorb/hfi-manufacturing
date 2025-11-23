import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getIndustry, getAllIndustrySlugs } from "@/lib/data/industries"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

interface IndustryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = getIndustry(params.slug)

  if (!industry) {
    return {
      title: 'Industry Not Found',
    }
  }

  return {
    title: industry.seo.metaTitle,
    description: industry.seo.metaDescription,
    openGraph: {
      title: industry.seo.metaTitle,
      description: industry.seo.metaDescription,
      type: 'website',
    },
  }
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustry(params.slug)

  if (!industry) {
    notFound()
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src={industry.heroImage}
            alt={`${industry.title} manufacturing facility and precision equipment`}
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{industry.title}</h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8">
              {industry.description}
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/quote">Get a Quote for Your Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {industry.challenge.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {industry.challenge.content}
            </p>
          </div>
        </div>
      </section>

      {/* The HFI Solution */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              {industry.solution.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {industry.solution.content}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {industry.solution.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      {industry.caseStudy && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-accent/20">
                <CardHeader>
                  <div className="text-sm font-semibold text-accent mb-2">CASE STUDY</div>
                  <CardTitle className="text-2xl">{industry.caseStudy.title}</CardTitle>
                  <CardDescription className="text-base">{industry.caseStudy.client}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{industry.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-muted-foreground">{industry.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Results</h4>
                    <ul className="space-y-2">
                      {industry.caseStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your {industry.title.toLowerCase()} project. Our team will respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/quote">
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="/capabilities">View All Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
