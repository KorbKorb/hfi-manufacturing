import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 backdrop-blur-md">
      {/* Utility Bar - ISO Badge */}
      <div className="border-b border-slate-800/60 bg-slate-800/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-end gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-slate-200">ISO 9001:2015 Certified</span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <a href="tel:+1234567890" className="hidden md:inline hover:text-slate-200 transition-colors">
              (123) 456-7890
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/hfi-logo-3d.png"
              alt="HFI Manufacturing Logo"
              width={200}
              height={56}
              priority
              className="h-10 sm:h-14 w-auto drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/capabilities"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Capabilities
            </Link>
            <Link
              href="/industries"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-orange-600/90 backdrop-blur-sm hover:bg-orange-500 text-white font-semibold border-t border-white/20 shadow-[0_0_15px_rgba(234,88,12,0.5)] hover:shadow-[0_0_25px_rgba(234,88,12,0.7)] transition-all duration-300"
            >
              <Link href="/quote">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
