"use client"

import { motion } from "framer-motion"
import { SectionBadge } from "@/components/ui/section-badge"
import { MessageSquare } from "lucide-react"

export function ContactHero() {
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
            <SectionBadge title="Request Legal Help" icon={MessageSquare} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Need legal advice or assistance? Describe your issue and we will help you. First consultation is free.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
