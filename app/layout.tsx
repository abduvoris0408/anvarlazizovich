import type React from "react"
import type { Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
}

export const metadata = {
  metadataBase: new URL("https://burxonov-law.uz"),
  title: "Burxonov Anvar Lazizovich - Lawyer & Certified Mediator",
  description:
    "Professional legal services: civil, criminal, family, labor law and mediation. 15+ years of experience in Tashkent, Uzbekistan.",
  charset: "utf-8",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
