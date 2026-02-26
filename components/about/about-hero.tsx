"use client"

import { motion } from "framer-motion"
import type { About } from "@/lib/types"
import { useTranslations } from "next-intl"
import { Scale, Award, Users } from "lucide-react"
import { useState, useEffect } from "react"

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
    <section className="relative overflow-hidden min-h-[50vh] flex items-center bg-background border-b border-border pt-32 pb-16">
      {/* ─── Elegant Background ─── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-60 dark:opacity-40" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 w-full mt-10 sm:mt-0">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/30 bg-background/50 dark:bg-black/40 backdrop-blur-md text-foreground text-sm font-medium shadow-[0_0_20px_-5px_var(--primary)] shadow-primary/30 hover:shadow-primary/50 hover:border-primary/50 transition-all cursor-pointer group uppercase tracking-wider">
              <Scale className="h-4 w-4 text-primary" />
              {t("heroTitle")}
            </span>
          </motion.div>

          {/* Title with multi-color gradient (like screenshot) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "circOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-sans leading-[1.2] flex flex-row flex-wrap justify-center items-center gap-x-3 gap-y-2"
          >
            <span className="text-foreground drop-shadow-sm text-center">{name.split(" ")[0]} </span>
            <span
              className="text-transparent bg-clip-text drop-shadow-sm animate-shiny-text inline-block pb-2"
              style={{
                backgroundImage: "linear-gradient(90deg, #6d28d9, #3b82f6, #6d28d9)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                textShadow: "0 0 30px rgba(109, 40, 217, 0.4)"
              }}
            >
              {name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 sm:leading-relaxed px-4"
          >
            <span className="text-foreground font-medium">{title}</span> — {t("heroSubtitle")}
          </motion.p>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {[
              { icon: Scale, label: "15+ yillik tajriba" },
              { icon: Award, label: "Sertifikatlangan mediator" },
              { icon: Users, label: "500+ muvaffaqiyatli ish" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-background/50 dark:bg-white/[0.02] text-muted-foreground w-full sm:w-auto justify-center hover:bg-background/80 dark:hover:bg-white/5 hover:border-primary/30 hover:text-foreground transition-all duration-300"
              >
                <div className="p-1.5 rounded-full bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

