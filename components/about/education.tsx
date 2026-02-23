"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { Education as EducationType } from "@/lib/types"
import { GraduationCap, Award, MapPin, Calendar } from "lucide-react"
import { useTranslations } from "next-intl"

export function Education() {
  const [education, setEducation] = useState<EducationType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("about")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/education?limit=100")
      .then((r) => r.json())
      .then((d) => d.data && setEducation(d.data))
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && education.length === 0) return null

  const formatDateRange = (start: string, end: string | null, current: boolean) => {
    const s = new Date(start).getFullYear()
    if (current) return `${s} — Hozirgi`
    if (end) return `${s} — ${new Date(end).getFullYear()}`
    return `${s}`
  }

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <div className="h-8 w-32 bg-muted/40 rounded-full mx-auto mb-4 animate-pulse" />
              <div className="h-10 w-64 bg-muted/40 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-card animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-muted/40" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-48 bg-muted/40 rounded" />
                    <div className="h-4 w-64 bg-muted/30 rounded" />
                    <div className="h-4 w-24 bg-muted/20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
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
              <GraduationCap className="h-3.5 w-3.5" />
              {t("educationBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
              {t("educationTitle")}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
            />
          </motion.div>

          {/* Education Items */}
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0"
                >
                  {edu.schoolLogo?.url ? (
                    <img src={edu.schoolLogo.url} alt={edu.school} className="h-5 w-5 object-contain" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  )}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {edu.degree} — {edu.fieldOfStudy}
                  </h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5 text-primary/60" />
                    <span>{edu.school}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-xs font-medium">
                      <Calendar className="h-3 w-3" />
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </span>
                    {edu.current && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Hozirgi
                      </span>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
