"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Briefcase } from "lucide-react"
import { useTranslations } from "next-intl"

interface ExperienceItem {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
}

export function Experience() {
  const [experience, setExperience] = useState<ExperienceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("about")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/experiences?sort=order&limit=100")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setExperience(d.data)
      })
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && experience.length === 0) return null

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-10 w-48 bg-muted rounded-md mx-auto mb-12 animate-pulse" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="pl-0 md:pl-20 relative">
                <div className="h-32 bg-muted rounded-2xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
              <Briefcase className="h-3.5 w-3.5" />
              {t("experienceBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
              {t("experienceTitle")}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
            />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block origin-top"
            />

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id || index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Timeline dot with pulse */}
                  <div className="absolute left-6 top-8 hidden md:block">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    {exp.current && (
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-4 h-4 rounded-full bg-primary/30"
                      />
                    )}
                  </div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-primary/80 font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium whitespace-nowrap">
                        {new Date(exp.startDate).getFullYear()} – {exp.current ? "Hozirgacha" : (exp.endDate ? new Date(exp.endDate).getFullYear() : "")}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
