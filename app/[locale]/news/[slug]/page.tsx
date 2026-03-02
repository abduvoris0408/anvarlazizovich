import type { Metadata } from "next"
import { ArticleContent } from "@/components/news/article-content"

const BASE_URL = "https://portfolio-backend-rh0y.onrender.com/api/v1"

async function getNewsBySlug(slug: string) {
  try {
    // First try to fetch all news and find by slug
    const res = await fetch(`${BASE_URL}/news?limit=100`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const data = await res.json()
    const article = data.data?.find((n: { slug?: string; id: string }) => n.slug === slug || n.id === slug)
    return article || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article) {
    return { title: "Maqola topilmadi" }
  }

  return {
    title: `${article.title} | Burxonov`,
    description: article.excerpt,
  }
}

import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"

// ... imports

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen w-full relative bg-background flex flex-col">
        <Header />
        <main className="flex-1 relative z-10 flex items-center justify-center">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Maqola topilmadi</h1>
            <p className="text-muted-foreground">So&apos;ralgan maqola topilmadi yoki o&apos;chirilgan.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
        <ArticleContent article={article} />
      </main>
      <Footer />
    </div>
  )
}
