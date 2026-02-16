
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { LegalHero } from "@/components/home/legal-hero"
import { PartnersSection } from "@/components/home/partners-section"
import { PracticePreview } from "@/components/home/practice-preview"
import { MediationPreview } from "@/components/home/mediation-preview"
import { ArticlesPreview } from "@/components/home/articles-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FAQSection } from "@/components/home/faq-section"
import { CTASection } from "@/components/home/cta-section"

export default function Home() {
  return (
    <div className="min-h-screen w-full relative bg-background">
      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(231, 138, 83, 0.08), transparent 60%)",
        }}
      />

      <Header />
      <BreadcrumbNav />

      <main className="relative z-10">
        <LegalHero />
        <PartnersSection />
        <PracticePreview />
        <MediationPreview />
        <ArticlesPreview />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
