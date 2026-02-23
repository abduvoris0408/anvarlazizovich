"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Handshake, Clock } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { WHEN_TO_USE_MEDIATION } from "@/lib/constants"

export function WhenToUse() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-square rounded-3xl border border-border bg-card hover:border-primary/20 transition-colors p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Handshake className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">O&apos;zaro kelishuv</h3>
                  <p className="text-muted-foreground">Tomonlar o&apos;zlari qaror qabul qiladi</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SectionBadge title="Qachon qo'llaniladi?" icon={Clock} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                Mediatsiya qachon yordam beradi?
              </motion.h2>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                {WHEN_TO_USE_MEDIATION.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-1 rounded-full bg-primary/10 shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
