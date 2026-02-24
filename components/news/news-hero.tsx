"use client"

import { motion } from "framer-motion"
import { SectionBadge } from "@/components/ui/section-badge"
import { BookOpen } from "lucide-react"

export function NewsHero() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <SectionBadge title="News & Articles" icon={BookOpen} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Legal Articles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Useful information, news, and articles about important changes in legislation and the legal field.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
