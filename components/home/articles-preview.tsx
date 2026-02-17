"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { News } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { BookOpen, ArrowRight, Calendar, Clock } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"

export function ArticlesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 }) // Reduced amount
  const [articles, setArticles] = useState<News[]>([])

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/news?limit=3")
      .then((r) => r.json())
      .then((d) => {
        console.log("News Data:", d) // Debug log
        if (d.data) setArticles(d.data)
      })
      .catch((e) => console.error("News Fetch Error:", e))
  }, [])

  if (articles.length === 0) {
    return (
      <section className="py-12 text-center text-muted-foreground">
        Loading articles...
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden py-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionBadge title="Yangiliklar va maqolalar" icon={BookOpen} />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent mb-4">
            So&apos;nggi maqolalar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Huquqiy soha bo&apos;yicha foydali ma&apos;lumotlar va yangiliklar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/news/${article.slug || article.id}`}>

                <div className="relative rounded-2xl p-6 glass-liquid hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-muted/20">
                    {article.image?.url ? (
                      <img
                        src={article.image.url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                        <BookOpen className="w-12 h-12 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                  </div>

                  <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {article.category?.name}
                    </span>
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

                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                  <span className="inline-flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                    O&apos;qish
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-6"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-all duration-300 group"
          >
            Barcha maqolalarni ko&apos;rish
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
