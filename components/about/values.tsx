"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Shield, Target, Lock } from "lucide-react"

const values = [
  {
    title: "Halollik",
    description: "Har bir ishda halollik va oshkoralik tamoyillariga amal qilish.",
  },
  {
    title: "Professional yondashuv",
    description: "Har bir mijozga individual va professional yondashuv.",
  },
  {
    title: "Natijaga yo'nalganlik",
    description: "Mijozning manfaatlarini himoya qilish va eng yaxshi natijaga erishish.",
  },
  {
    title: "Maxfiylik",
    description: "Mijozlar ma'lumotlarining to'liq maxfiyligini ta'minlash.",
  },
]

const iconMap: Record<string, React.ElementType> = {
  Halollik: Shield,
  "Professional yondashuv": Target,
  "Natijaga yo'nalganlik": Heart,
  Maxfiylik: Lock,
}

export function Values() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Qadriyatlar va tamoyillar</h2>
            <p className="text-lg text-muted-foreground">Ish faoliyatimda amal qiladigan asosiy tamoyillar</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const IconComponent = iconMap[value.title] || Shield
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}

                  className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
