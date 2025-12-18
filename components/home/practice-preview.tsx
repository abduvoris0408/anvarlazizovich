"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { practiceAreas } from "@/data/practice-areas"
import { Scale, Shield, Heart, Briefcase, Building, ArrowRight } from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Shield,
  Heart,
  Briefcase,
  Building,
}

export function PracticePreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="relative overflow-hidden py-24">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">Amaliyot sohalari</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent mb-4">
            Huquqiy xizmatlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keng ko'lamli huquqiy masalalarda professional yordam va maslahatlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {practiceAreas.slice(0, 3).map((area, index) => {
            const IconComponent = iconMap[area.icon] || Scale
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative rounded-2xl p-8 backdrop-blur-sm border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{area.title}</h3>
                </div>

                <p className="text-muted-foreground mb-4">{area.description}</p>

                <ul className="space-y-2">
                  {area.details.slice(0, 2).map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-all duration-300 group"
          >
            Barcha xizmatlarni ko'rish
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
