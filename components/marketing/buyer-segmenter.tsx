import Link from "next/link"
import { FileText, Clipboard } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function BuyerSegmenter() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re prototyping or scaling production, we have the expertise and capacity to support your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Engineer Path */}
          <Link href="/capabilities/prototyping" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-accent">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 rounded-full bg-accent/10 p-6 w-20 h-20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <FileText className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-2">I am an Engineer</CardTitle>
                <CardDescription className="text-base">
                  Looking for precision prototyping and technical expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Rapid prototyping services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Material selection guidance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    DFM (Design for Manufacturing) support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    NDA & IP protection
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Procurement Path */}
          <Link href="/capabilities/production" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-accent">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 rounded-full bg-accent/10 p-6 w-20 h-20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Clipboard className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-2">I am a Procurement Manager</CardTitle>
                <CardDescription className="text-base">
                  Seeking reliable production capacity and competitive pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    High-volume production runs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Consistent quality & lead times
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    ISO 9001:2015 compliance
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Transparent pricing & communication
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
