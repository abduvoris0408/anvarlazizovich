"use client"

import { motion } from "framer-motion"
import { Link } from "@/i18n/routing"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import type { News } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface ArticleContentProps {
  article: News
}

export function ArticleContent({ article }: ArticleContentProps) {
  const t = useTranslations("articles")

  return (
    <article className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToAll")}
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                <Tag className="h-3 w-3" />
                {article.category?.name}
              </span>
              <span className="flex items-center gap-2" suppressHydrationWarning>
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              {article.readTime && (
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground">{article.excerpt}</p>
          </motion.header>

          {/* Featured Image */}
          {article.image?.url && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-12 rounded-2xl overflow-hidden border border-border/50"
            >
              <img
                src={article.image.url}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </motion.div>
          )}

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-foreground/80 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Author card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-16 p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">BA</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("authorName")}</h3>
                <p className="text-muted-foreground">{t("authorRole")}</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">{t("needAdvice")}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300"
            >
              {t("contactUs")}
            </Link>
          </motion.div>
        </div>
      </div>
    </article>
  )
}
