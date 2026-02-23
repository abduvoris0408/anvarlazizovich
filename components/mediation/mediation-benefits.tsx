"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Wallet, Lock, Heart, Target, Settings } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { MEDIATION_BENEFITS } from "@/lib/constants"

const iconMap: Record<string, React.ElementType> = {
  Clock,
  Wallet,
  Lock,
  Heart,
  Target,
  Settings,
}

export function MediationBenefits() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16 bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <SectionBadge title="Afzalliklar" icon={Target} />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Mediatsiyaning afzalliklari</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nima uchun mediatsiya sud jarayonlariga nisbatan samaraliroq bo&apos;lishi mumkin?
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEDIATION_BENEFITS.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || Clock
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 w-fit mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
