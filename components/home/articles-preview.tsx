"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import type { News } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

export function ArticlesPreview() {
  const [articles, setArticles] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("articles")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/news?limit=3")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setArticles(d.data)
      })
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="h-10 w-64 bg-muted/40 rounded-lg animate-pulse mb-3" />
              <div className="h-5 w-96 max-w-full bg-muted/20 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-muted/30" />
                  <div className="p-6 space-y-3">
                    <div className="flex gap-2">
                      <div className="h-5 w-20 bg-muted/30 rounded-full" />
                      <div className="h-5 w-24 bg-muted/20 rounded-full" />
                    </div>
                    <div className="h-6 w-3/4 bg-muted/30 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted/20 rounded" />
                      <div className="h-4 w-5/6 bg-muted/20 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!isLoading && articles.length === 0) {
    return null
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {t("title")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all shrink-0 group"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/news/${article.slug || article.id}`}>
                  <div className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    {/* Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-muted/10">
                      {article.image?.url ? (
                        <img
                          src={article.image.url}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/3 to-primary/8">
                          <BookOpen className="w-10 h-10 text-primary/20" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground flex-wrap">
                        {article.category?.name && (
                          <span className="px-2.5 py-1 rounded-full bg-primary/8 text-primary font-medium">
                            {article.category.name}
                          </span>
                        )}
                        <span className="flex items-center gap-1" suppressHydrationWarning>
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.publishedAt || article.createdAt)}
                        </span>
                        {article.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>

                      <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-2.5 transition-all">
                        {t("readMore")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
