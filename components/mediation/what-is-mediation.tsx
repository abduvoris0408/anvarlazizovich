"use client"

import { motion } from "framer-motion"
import { Scale, Users, HelpCircle } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { useTranslations } from "next-intl"

export function WhatIsMediation() {
  const t = useTranslations("mediation")

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <SectionBadge title={t("whatIs.badgeTitle")} icon={HelpCircle} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                {t("whatIs.title")}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <p className="text-muted-foreground leading-relaxed">
                  {t("whatIs.desc1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("whatIs.desc2")}
                </p>
              </motion.div>
            </div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl border border-border bg-card hover:border-primary/20 transition-colors p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Scale className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("whatIs.neutralTitle")}</h3>
                  <p className="text-muted-foreground">{t("whatIs.neutralDesc")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
