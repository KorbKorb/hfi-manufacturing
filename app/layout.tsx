import type { Metadata } from "next"
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: "HFI Manufacturing - Precision Stainless Steel Fabrication",
  description: "ISO 9001:2015 certified precision stainless steel fabrication for medical device, telecom, and restaurant equipment industries.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
