import Link from "next/link"
import { ISOBadge } from "./iso-badge"

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">HFI Manufacturing</h3>
            <p className="text-sm text-muted-foreground">
              Precision stainless steel fabrication for mission-critical supply chains.
            </p>
            <ISOBadge />
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/industries/medical-device"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Medical Device
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/restaurant-equipment"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Restaurant Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/telecom-enclosures"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Telecom Enclosures
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Capabilities</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/capabilities/prototyping"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Prototyping
                </Link>
              </li>
              <li>
                <Link
                  href="/capabilities/production"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Production
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-1">
              <p itemProp="streetAddress">123 Industrial Pkwy</p>
              <p>
                <span itemProp="addressLocality">Manufacturing City</span>,{" "}
                <span itemProp="addressRegion">ST</span>{" "}
                <span itemProp="postalCode">12345</span>
              </p>
              <p className="mt-2">
                <a
                  href="tel:+1234567890"
                  className="hover:text-foreground transition-colors"
                  itemProp="telephone"
                >
                  (123) 456-7890
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@hfimfg.com"
                  className="hover:text-foreground transition-colors"
                  itemProp="email"
                >
                  info@hfimfg.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HFI Manufacturing. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org Local Business Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ManufacturerOrganization",
            "name": "HFI Manufacturing",
            "description": "Precision stainless steel fabrication for mission-critical supply chains",
            "url": "https://hfimfg.com",
            "telephone": "+1-123-456-7890",
            "email": "info@hfimfg.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Industrial Pkwy",
              "addressLocality": "Manufacturing City",
              "addressRegion": "ST",
              "postalCode": "12345",
              "addressCountry": "US"
            },
            "areaServed": "US",
            "certification": "ISO 9001:2015"
          })
        }}
      />
    </footer>
  )
}
