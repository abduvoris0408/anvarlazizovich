"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import type { BlogPost } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface BlogContentProps {
    post: BlogPost
}

export function BlogContent({ post }: BlogContentProps) {
    const locale = useLocale()
    const t = useTranslations("blog")
    const prefix = locale === "uz" ? "" : `/${locale}`

    return (
        <article className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <Link
                        href={`${prefix}/blog`}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t("backToAll")}
                    </Link>

                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                            {post.category && (
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {post.category.name}
                                </span>
                            )}
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {formatDate(post.publishedAt || post.createdAt)}
                            </span>
                            {post.readTime > 0 && (
                                <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {post.readTime} {t("minRead")}
                                </span>
                            )}
                            {post.views > 0 && (
                                <span className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    {post.views} {t("views")}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>

                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag) => (
                                    <span key={tag.id} className="px-2 py-1 text-xs rounded-md bg-accent text-muted-foreground">
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.header>

                    {post.image?.url && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-2xl overflow-hidden mb-10"
                        >
                            <img
                                src={post.image.url}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-2">{t("needAdvice")}</h3>
                        <Link
                            href={`${prefix}/contact`}
                            className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                        >
                            {t("contactUs")}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </article>
    )
}
