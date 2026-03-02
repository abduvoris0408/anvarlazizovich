import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { PracticeHero } from "@/components/practice/practice-hero"
import { PracticeGrid } from "@/components/practice/practice-grid"
import { PracticeCTA } from "@/components/practice/practice-cta"
import { PracticePreview } from '@/components/home/practice-preview'

export const metadata: Metadata = {
  title: "Amaliyot sohalari",
  description:
    "Fuqarolik huquqi, jinoyat huquqi, oilaviy nizolar, mehnat huquqi va biznes shartnomalar bo'yicha professional huquqiy xizmatlar.",
  openGraph: {
    title: "Amaliyot sohalari - Burxonov Advokat",
    description: "Keng ko'lamli huquqiy xizmatlar: fuqarolik, jinoyat, oilaviy, mehnat va biznes huquqi.",
  },
}

export default function PracticePage() {
  return (
    <div className="min-h-screen w-full relative bg-background">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(231, 138, 83, 0.08), transparent 60%)",
        }}
      />

      <Header />

      <main className="relative z-10">
        <PracticeHero />
        <PracticePreview />
        <PracticeCTA />
      </main>

      <Footer />
    </div>
  )
}
