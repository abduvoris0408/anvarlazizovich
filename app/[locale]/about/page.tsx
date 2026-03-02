import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { AboutHero } from "@/components/about/about-hero"
import { Biography } from "@/components/about/biography"
import { Education } from "@/components/about/education"
import { Experience } from "@/components/about/experience"
import { Values } from "@/components/about/values"

export const metadata: Metadata = {
  title: "Men haqimda",
  description: "Burxonjonov Anvarjon Lazizjon o'g'li — yurist va sertifikatlangan mediator. Ta'lim, tajriba va qadriyatlar haqida.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full relative bg-background">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 35% at 50% 0%, oklch(0.47 0.27 18 / 0.07), transparent 60%)" }}
      />
      <Header />
      <main className="relative z-10">
        <AboutHero />
        <Biography />
        <Education />
        <Experience />
        <Values />
      </main>
      <Footer />
    </div>
  )
}
