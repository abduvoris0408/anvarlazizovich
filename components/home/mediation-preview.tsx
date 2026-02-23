"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { MEDIATION_BENEFITS } from "@/lib/constants"
import { ArrowRight, Clock, DollarSign, Handshake, ShieldCheck, Smile, Users } from "lucide-react"
import type React from "react"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ElementType> = {
  Clock,
  DollarSign,
  Handshake,
  ShieldCheck,
  Smile,
  Users,
}

export function MediationPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const t = useTranslations("mediation")

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {t("title")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/mediation"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all shrink-0 group"
            >
              {t("learnMore")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDIATION_BENEFITS.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon]
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/15 w-fit mb-4 group-hover:bg-primary/15 transition-colors">
                    {IconComponent ? (
                      <IconComponent className="h-6 w-6 text-primary" />
                    ) : (
                      <Handshake className="h-6 w-6 text-primary" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
