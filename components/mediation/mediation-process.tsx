"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const processSteps = [
  { step: 1, title: "Dastlabki konsultatsiya", description: "Tomonlar bilan alohida suhbat va mediatsiya jarayonini tushuntirish." },
  { step: 2, title: "Birgalikdagi sessiya", description: "Tomonlarni bir joyga to'plash va muammoni muhokama qilish." },
  { step: 3, title: "Muzokaralar", description: "Tomonlarning manfaatlarini aniqlash va yechim variantlarini izlash." },
  { step: 4, title: "Kelishuv", description: "O'zaro maqbul yechimga erishish va kelishuv hujjatini tuzish." },
]
export function MediationProcess() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16 bg-muted/30">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mediatsiya jarayoni</h2>
            <p className="text-lg text-muted-foreground">Mediatsiya qanday bosqichlardan iborat?</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Step number */}
                  <div className="absolute left-4 top-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm hidden md:flex">
                    {step.step}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm md:hidden">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground md:pl-0">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
