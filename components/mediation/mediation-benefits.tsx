"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, Wallet, Lock, Heart, Target, Settings } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Clock,
  Wallet,
  Lock,
  Heart,
  Target,
  Settings,
}

const benefits = [
  { title: "Tezlik", description: "Mediatsiya jarayoni odatda bir necha kundan bir necha haftagacha davom etadi, sud jarayonlari esa oylab cho'zilishi mumkin.", icon: "Clock" },
  { title: "Tejamkorlik", description: "Mediatsiya xarajatlari sud xarajatlariga nisbatan ancha kam. Siz vaqt va pul tejaysiz.", icon: "Wallet" },
  { title: "Maxfiylik", description: "Sud jarayonlaridan farqli o'laroq, mediatsiya maxfiy o'tkaziladi. Sizning ishingiz ommaviy bo'lmaydi.", icon: "Lock" },
  { title: "Munosabatlarni saqlash", description: "Mediatsiya tomonlar o'rtasidagi munosabatlarni saqlashga yordam beradi.", icon: "Heart" },
  { title: "Nazorat", description: "Tomonlar jarayon va natija ustidan to'liq nazoratga ega. Qaror ular tomonidan qabul qilinadi.", icon: "Target" },
  { title: "Moslashuvchanlik", description: "Mediatsiya jarayoni tomonlarning ehtiyojlariga moslashtirilishi mumkin.", icon: "Settings" },
]

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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mediatsiyaning afzalliklari</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nima uchun mediatsiya sud jarayonlariga nisbatan samaraliroq bo'lishi mumkin?
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || Clock
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
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
