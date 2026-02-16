import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { BreadcrumbNav } from "@/components/shared/breadcrumb-nav"
import { BlogGrid } from "@/components/blog/blog-grid"
import { motion } from "framer-motion"

export default function BlogPage() {
    return (
        <div className="min-h-screen w-full relative bg-background">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(231, 138, 83, 0.08), transparent 60%)",
                }}
            />
            <Header />
            <BreadcrumbNav items={[{ label: "Blog", href: "/blog" }]} />
            <main className="relative z-10">
                <section className="pt-24 pb-8">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
                    </div>
                </section>
                <BlogGrid />
            </main>
            <Footer />
        </div>
    )
}
