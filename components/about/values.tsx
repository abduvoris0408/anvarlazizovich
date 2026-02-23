"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Heart, Shield, Target, Lock } from "lucide-react"
import { LAWYER_VALUES } from "@/lib/constants"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Target,
  Heart,
  Lock,
}

export function Values() {
  const t = useTranslations("about")

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
              <Heart className="h-3.5 w-3.5" />
              {t("valuesBadge")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("valuesTitle")}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-3 mb-4"
            />
            <p className="text-lg text-muted-foreground">{t("valuesSubtitle")}</p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {LAWYER_VALUES.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Shield
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0"
                    >
                      <IconComponent className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
