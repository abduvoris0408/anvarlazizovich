"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Eye } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import type { BlogPost } from "@/lib/types"
import { GridSkeleton } from "@/components/ui/skeleton"

export function BlogGrid() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const locale = useLocale()
    const t = useTranslations("blog")
    const prefix = locale === "uz" ? "" : `/${locale}`

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/blog-posts?status=published&sort=-publishedAt&limit=100")
            .then((r) => r.json())
            .then((d) => {
                if (d.data) setPosts(d.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])


    if (loading) {
        return <GridSkeleton count={3} variant="blog" />
    }

    if (posts.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="glass-effect rounded-3xl p-8 text-center max-w-2xl mx-auto">
                        <p className="text-muted-foreground">{t("noData")}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >

                            <Link
                                href={`${prefix}/blog/${post.slug || post.id}`}
                                className="group block glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {post.image?.url && (
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={post.image.url}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                                        {post.category && (
                                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                                {post.category.name}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                                        </span>
                                        {post.readTime > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime} {t("minRead")}
                                            </span>
                                        )}
                                        {post.views > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {post.views}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                                    )}
                                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                        {t("readMore")}
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
