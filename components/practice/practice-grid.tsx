"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { practiceAreas } from "@/data/practice-areas"
import { Scale, Shield, Heart, Briefcase, Building, Check } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Shield,
  Heart,
  Briefcase,
  Building,
}

export function PracticeGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => {
              const IconComponent = iconMap[area.icon] || Scale
              return (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                >
                  <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{area.description}</p>

                      <ul className="space-y-3">
                        {area.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="p-1 rounded-full bg-primary/10">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-sm text-foreground/80">{detail}</span>
                          </li>
                        ))}
                      </ul>
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
