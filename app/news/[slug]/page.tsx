import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { ArticleContent } from "@/components/news/article-content"
import { articles } from "@/data/news"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return {
      title: "Article not found",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} - Burxonov Law`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  }
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
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
