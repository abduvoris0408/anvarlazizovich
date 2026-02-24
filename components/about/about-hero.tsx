"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { About } from "@/lib/types"
import { useTranslations } from "next-intl"
import { Scale, Award, Users } from "lucide-react"

export function AboutHero() {
  const [about, setAbout] = useState<About | null>(null)
  const t = useTranslations("about")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  const name = about?.fullName || "Burxonov Anvar Lazizovich"
  const title = about?.title || "Advokat & Sertifikatlangan Mediator"

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Scale className="h-4 w-4" />
              {t("heroTitle")}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4 font-serif"
          >
            {name}
          </motion.h1>

          {/* Animated gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
            className="mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mb-6"
          />

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            className="text-xl text-primary font-medium mb-4"
          >
            {title}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* Mini stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { icon: Scale, label: "15+ yillik tajriba" },
              { icon: Award, label: "Sertifikatlangan mediator" },
              { icon: Users, label: "500+ muvaffaqiyatli ish" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <item.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
