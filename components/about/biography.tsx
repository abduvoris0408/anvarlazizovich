"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { aboutData } from "@/data/about"

export function Biography() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <img
                  src="/professional-lawyer-portrait-man-in-suit.jpg"
                  alt="Burxonov Anvar Lazizovich"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Biography text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Biografiya</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {aboutData.biography.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
