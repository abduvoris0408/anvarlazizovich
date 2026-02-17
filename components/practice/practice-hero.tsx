"use client"

import { motion } from "framer-motion"
import { SectionBadge } from "@/components/ui/section-badge"
import { Scale } from "lucide-react"

export function PracticeHero() {
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
            <SectionBadge title="Amaliyot sohalari" icon={Scale} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Huquqiy xizmatlar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Keng ko'lamli huquqiy masalalarda professional yordam va maslahatlar. Sizning huquqlaringizni himoya qilish
            bizning asosiy vazifamiz.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
