import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { MediationHero } from "@/components/mediation/mediation-hero"
import { WhatIsMediation } from "@/components/mediation/what-is-mediation"
import { MediationBenefits } from "@/components/mediation/mediation-benefits"
import { WhenToUse } from "@/components/mediation/when-to-use"
import { MediationProcess } from "@/components/mediation/mediation-process"
import { MediationCTA } from "@/components/mediation/mediation-cta"

export const metadata: Metadata = {
  title: "Mediatsiya xizmatlari",
  description:
    "Sertifikatlangan mediator xizmatlari. Nizolarni suddan tashqari tartibda, tez va samarali hal qilish. Professional mediatsiya orqali kelishuvga erishish.",
  openGraph: {
    title: "Mediatsiya xizmatlari - Burxonov Advokat",
    description: "Nizolarni tinch yo'l bilan hal qilish. Sertifikatlangan mediator xizmatlari.",
  },
}

export default function MediationPage() {
  return (
    <div className="min-h-screen w-full relative bg-background">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(231, 138, 83, 0.08), transparent 60%)",
        }}
      />

      <Header />
      <BreadcrumbNav items={[{ label: "Mediation", href: "/mediation" }]} />

      <main className="relative z-10">
        <MediationHero />
        <WhatIsMediation />
        <MediationBenefits />
        <WhenToUse />
        <MediationProcess />
        <MediationCTA />
      </main>

      <Footer />
    </div>
  )
}
