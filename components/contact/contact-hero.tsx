"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { SectionBadge } from "@/components/ui/section-badge"
import { MessageSquare } from "lucide-react"

export function ContactHero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const rotatingTexts = [
    "Bog'lanish",
    "Murojaat",
    "Aloqa",
    "Uchrashuv"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-[40vh] flex items-center bg-background border-b border-border pt-32 pb-16">
      {/* ─── Elegant Background ─── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-60 dark:opacity-40" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at center, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 w-full mt-10 sm:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-primary/30 bg-background/50 dark:bg-black/40 backdrop-blur-md text-foreground text-sm font-medium shadow-[0_0_20px_-5px_var(--primary)] shadow-primary/30 hover:shadow-primary/50 hover:border-primary/50 transition-all cursor-pointer group uppercase tracking-wider">
              <MessageSquare className="h-4 w-4 text-primary" />
              Request Legal Help
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "circOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 font-sans leading-[1.2] flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2"
          >
            <span className="text-foreground drop-shadow-sm">Biz bilan </span>
            <div className="h-[50px] sm:h-[60px] md:h-[70px] flex justify-center items-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentTextIndex}
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -80, opacity: 0 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                  className="text-transparent bg-clip-text animate-shiny-text text-center px-1 pb-2"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #6d28d9, #3b82f6, #6d28d9)",
                    backgroundSize: "200% auto",
                    textShadow: "0 0 30px rgba(109, 40, 217, 0.4)"
                  }}
                >
                  {rotatingTexts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto px-4"
          >
            Need legal advice or assistance? Describe your issue and we will help you. <br className="hidden sm:block" />
            <span className="text-foreground font-medium">First consultation is free.</span>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
