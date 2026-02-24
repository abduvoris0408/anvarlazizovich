"use client"

import { motion } from "framer-motion"
import { Check, Handshake, Clock } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { useTranslations } from "next-intl"

export function WhenToUse() {
  const t = useTranslations("mediation")

  const items = [0, 1, 2, 3, 4, 5]

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
            {/* Left - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-square rounded-3xl border border-border bg-card hover:border-primary/20 transition-colors p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Handshake className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("whenToUse.illustrationTitle")}</h3>
                  <p className="text-muted-foreground">{t("whenToUse.illustrationDesc")}</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <SectionBadge title={t("whenToUse.badgeTitle")} icon={Clock} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                {t("whenToUse.title")}
              </motion.h2>

              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="space-y-4"
              >
                {items.map((index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-1 rounded-full bg-primary/10 shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{t(`whenToUse.items.${index}`)}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
