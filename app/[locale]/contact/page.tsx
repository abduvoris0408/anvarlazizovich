import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact",
  description: "Request legal help. Contact us by phone, email, Telegram, or fill out the form.",
  openGraph: {
    title: "Contact - Burxonov Law",
    description: "Contact us for professional legal assistance.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full relative bg-background flex flex-col">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(231, 138, 83, 0.08), transparent 60%)",
        }}
      />

      <Header />
      <BreadcrumbNav items={[{ label: "Contact", href: "/contact" }]} />

      <main className="relative z-10 flex-grow">
        <ContactHero />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
