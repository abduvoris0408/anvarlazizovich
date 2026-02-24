"use client"

import { motion } from "framer-motion"
import { SectionBadge } from "@/components/ui/section-badge"
import { GitMerge } from "lucide-react"
import { useTranslations } from "next-intl"

export function MediationProcess() {
  const t = useTranslations("mediation")

  const steps = [0, 1, 2, 3]

  return (
    <section className="py-16 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-center mb-12"
          >
            <SectionBadge title={t("process.badgeTitle")} icon={GitMerge} />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("process.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("process.subtitle")}</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

            <div className="space-y-8">
              {steps.map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.08 }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Step number */}
                  <div className="absolute left-4 top-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm hidden md:flex">
                    {index + 1}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm md:hidden">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{t(`process.steps.${index}.title`)}</h3>
                    </div>
                    <p className="text-muted-foreground md:pl-0">{t(`process.steps.${index}.desc`)}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
