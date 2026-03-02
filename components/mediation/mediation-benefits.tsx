"use client"

import { motion } from "framer-motion"
import { Clock, Wallet, Lock, Heart, Target, Settings } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { useTranslations } from "next-intl"

const benefitKeys = ["speed", "cost", "privacy", "relations", "control", "flexibility"] as const

const iconMap: Record<string, React.ElementType> = {
  speed: Clock,
  cost: Wallet,
  privacy: Lock,
  relations: Heart,
  control: Target,
  flexibility: Settings,
}

export function MediationBenefits() {
  const t = useTranslations("mediation")

  return (
    <section className="py-16 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-center mb-12"
          >
            <SectionBadge title={t("benefits.badgeTitle")} icon={Target} />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{t("benefits.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("benefits.subtitle")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitKeys.map((key, index) => {
              const IconComponent = iconMap[key]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t(`benefits.${key}.title`)}</h3>
                  <p className="text-muted-foreground">{t(`benefits.${key}.desc`)}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
