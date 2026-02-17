"use client"

import { motion } from "framer-motion"
import { SectionBadge } from "@/components/ui/section-badge"
import { Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export function MediationHero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <SectionBadge title="Sertifikatlangan Mediator" icon={Award} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Mediatsiya xizmatlari
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Nizolarni suddan tashqari tartibda, tez va samarali hal qilish. Professional mediatsiya orqali tomonlar
            o'rtasida kelishuvga erishish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
            >
              Mediatsiya bo'yicha murojaat qilish
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
