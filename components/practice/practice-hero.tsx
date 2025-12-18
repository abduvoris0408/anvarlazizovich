"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Scale } from "lucide-react"

export function PracticeHero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm">
              <Scale className="h-4 w-4" />
              Amaliyot sohalari
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
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
