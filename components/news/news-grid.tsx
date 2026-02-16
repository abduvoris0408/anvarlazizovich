"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { News } from "@/lib/types"
import { ArrowRight, Calendar, Clock } from "lucide-react"



import { SpinnerCustom } from "@/components/ui/spinner"

export function NewsGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [articles, setArticles] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/news?limit=100")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setArticles(d.data)
      })
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && articles.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-3xl p-8 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground">Yangiliklar hozircha mavjud emas.</p>
          </div>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-96">
            <SpinnerCustom />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >

                <Link href={`/news/${article.slug || article.id}`}>
                  <div className="relative rounded-2xl p-6 glass-card h-full">

                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.category?.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString("uz-UZ")}
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
        </div>
      </motion.div>
    </section>
  )
}
