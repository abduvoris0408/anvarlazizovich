"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { ArrowRight, Award, Phone } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import type { About } from "@/lib/types"
import { useTranslations } from "next-intl"

export function MediationCTA() {
  const [about, setAbout] = useState<About | null>(null)
  const t = useTranslations("mediation")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  const phone = about?.phone || "+998 90 123 45 67"

  return (
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

            <div className="relative p-8 sm:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <SectionBadge title={t("badge")} icon={Award} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              >
                {t("ctaTitle")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
              >
                {t("ctaSubtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  {t("ctaBtn")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 px-6 py-4 text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">{phone}</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
