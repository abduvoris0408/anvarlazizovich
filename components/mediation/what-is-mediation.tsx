"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Scale, Users, HelpCircle } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"

const whatIs = {
  title: "Mediatsiya nima?",
  description: `Mediatsiya - bu nizolarni hal qilishning muqobil usuli bo'lib, unda neytral uchinchi tomon (mediator) nizolashayotgan tomonlarga o'zaro maqbul yechim topishda yordam beradi.

Mediatsiya jarayonida mediator qaror qabul qilmaydi, balki tomonlarni muloqotga yo'naltiradi va ularning manfaatlarini aniqlashga yordam beradi.`,
}

export function WhatIsMediation() {
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
            {/* Left - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SectionBadge title="Asosiy tushunchalar" icon={HelpCircle} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                {whatIs.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                {whatIs.description.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Right - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl border bg-card text-card-foreground shadow-sm p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Scale className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Neytral yondashuv</h3>
                  <p className="text-muted-foreground">
                    Mediator tomonlarning hech biriga qo'shilmaydi va neytral pozitsiyada turadi
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
