"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Clock, Wallet, Lock, Heart, ArrowRight, Award } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"

const iconMap: Record<string, React.ElementType> = {
  Clock,
  Wallet,
  Lock,
  Heart,
}

const mediationBenefits = [
  {
    title: "Tezlik",
    description: "Mediatsiya jarayoni odatda bir necha kundan bir necha haftagacha davom etadi.",
    icon: "Clock",
  },
  {
    title: "Tejamkorlik",
    description: "Mediatsiya xarajatlari sud xarajatlariga nisbatan ancha kam.",
    icon: "Wallet",
  },
  {
    title: "Maxfiylik",
    description: "Sud jarayonlaridan farqli o'laroq, mediatsiya maxfiy o'tkaziladi.",
    icon: "Lock",
  },
  {
    title: "Munosabatlarni saqlash",
    description: "Mediatsiya tomonlar o'rtasidagi munosabatlarni saqlashga yordam beradi.",
    icon: "Heart",
  },
]

export function MediationPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="relative overflow-hidden py-12">
      <div className="bg-secondary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-secondary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SectionBadge title="Sertifikatlangan Mediator" className="mb-4" icon={Award} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              >
                Mediatsiya xizmatlari
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Nizolarni suddan tashqari tartibda, tez va samarali hal qilish. Professional mediatsiya xizmatlari
                orqali tomonlar o'rtasida kelishuvga erishish.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/mediation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  Mediatsiya bo'yicha murojaat qilish
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
              {mediationBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Clock
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}

                    className="p-6 rounded-2xl glass-liquid transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
