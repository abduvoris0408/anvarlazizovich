import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { NewsHero } from "@/components/news/news-hero"
import { NewsGrid } from "@/components/news/news-grid"

export const metadata: Metadata = {
  title: "News & Articles",
  description: "News, useful articles, and information about changes in legislation in the legal field.",
  openGraph: {
    title: "News & Articles - Burxonov Law",
    description: "Useful information and news in the legal field.",
  },
}

export default function NewsPage() {
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
        <NewsHero />
        <NewsGrid />
      </main>

      <Footer />
    </div>
  )
}
