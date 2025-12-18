"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { User, Award, Scale } from "lucide-react"
import { siteConfig } from "@/data/site"

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm">
              <User className="h-4 w-4" />
              Men haqimda
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-primary font-medium mb-8"
          >
            {siteConfig.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">O'zbekiston Advokatura palatasi a'zosi</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Sertifikatlangan Mediator</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
