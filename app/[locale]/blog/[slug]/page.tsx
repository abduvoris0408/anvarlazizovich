import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { BlogContent } from "@/components/blog/blog-content"
import { notFound } from "next/navigation"
import { CommentsSection } from "@/components/shared/comments-section"

const BASE_URL = "https://portfolio-backend-rh0y.onrender.com/api/v1"

async function getBlogBySlug(slug: string) {
    try {
        const res = await fetch(`${BASE_URL}/blog-posts?status=published&limit=100`, { next: { revalidate: 60 } })
        if (!res.ok) return null
        const data = await res.json()
        const post = data.data?.find((p: { slug?: string; id: string }) => p.slug === slug || p.id === slug)
        return post || null
    } catch {
        return null
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getBlogBySlug(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen w-full relative bg-background">
            <Header />
            <main className="relative z-10 pb-20">
                <BlogContent post={post} />
                <div className="container mx-auto px-4 max-w-4xl">
                    <CommentsSection blogPostId={post.id} />
                </div>
            </main>
            <Footer />
        </div>
    )
}
