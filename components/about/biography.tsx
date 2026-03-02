"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { About } from "@/lib/types"
import { User } from "lucide-react"
import { useTranslations } from "next-intl"

export function Biography() {
  const [about, setAbout] = useState<About | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("about")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setAbout(d.data)
      })
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  const biography = about?.bio || about?.biography || ""
  const imageUrl = about?.avatar?.url || about?.profileImage?.url || "/professional-lawyer-portrait-man-in-suit.jpg"

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-1">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted/40 animate-pulse" />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-10 w-48 bg-muted rounded-md animate-pulse mb-6" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-1"
            >
              <div className="relative group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    src={imageUrl}
                    alt={about?.fullName || "Burxonov Anvar Lazizovich"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative corner */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-primary/30 rounded-br-2xl" />
              </div>
            </motion.div>

            {/* Biography text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-5">
                <User className="h-3.5 w-3.5" />
                {t("biographyBadge")}
              </span>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                {t("biographyTitle")}
              </h2>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent mb-6 origin-left"
              />

              <div className="prose prose-lg dark:prose-invert max-w-none">
                {biography ? (
                  biography.split("\n\n").map((paragraph: string, index: number) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      className="text-muted-foreground leading-relaxed mb-4"
                    >
                      {paragraph}
                    </motion.p>
                  ))
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {t("noData")}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
