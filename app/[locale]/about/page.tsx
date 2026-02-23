import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { AboutHero } from "@/components/about/about-hero"
import { Biography } from "@/components/about/biography"
import { Education } from "@/components/about/education"

import { Experience } from "@/components/about/experience"
import { Skills } from "@/components/about/skills"
import { Values } from "@/components/about/values"
import { Certificates } from "@/components/about/certificates"

export const metadata: Metadata = {
  title: "Men haqimda",
  description:
    "Burxonov Anvar Lazizovich - 15+ yillik tajribaga ega professional advokat va sertifikatlangan mediator. Ta'lim, tajriba va qadriyatlar haqida batafsil ma'lumot.",
  openGraph: {
    title: "Men haqimda - Burxonov Anvar Lazizovich",
    description: "Professional advokat va sertifikatlangan mediator haqida batafsil ma'lumot.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative bg-background">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, hsl(var(--primary) / 0.08), transparent 60%)",
        }}
      />

      <Header />

      <main className="relative z-10">
        <AboutHero />
        <Biography />

        <Education />
        <Certificates />
        <Experience />
        <Skills />
        <Values />
      </main>

      <Footer />
    </div>
  )
}
