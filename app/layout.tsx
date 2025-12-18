import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: {
    default: "Burxonov Anvar Lazizovich - Advokat & Sertifikatlangan Mediator",
    template: "%s | Burxonov Advokat",
  },
  description:
    "Professional huquqiy xizmatlar: fuqarolik, jinoyat, oilaviy, mehnat huquqi va mediatsiya. 15+ yillik tajriba, 500+ muvaffaqiyatli ishlar.",
  keywords: [
    "advokat",
    "yurist",
    "mediator",
    "huquqiy yordam",
    "Toshkent",
    "O'zbekiston",
    "fuqarolik huquqi",
    "jinoyat huquqi",
  ],
  authors: [{ name: "Burxonov Anvar Lazizovich" }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://burxonov-law.uz",
    siteName: "Burxonov Advokat",
    title: "Burxonov Anvar Lazizovich - Advokat & Sertifikatlangan Mediator",
    description: "Professional huquqiy xizmatlar va mediatsiya. 15+ yillik tajriba.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Burxonov Anvar Lazizovich - Advokat",
    description: "Professional huquqiy xizmatlar va mediatsiya",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
