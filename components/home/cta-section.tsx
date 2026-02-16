"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Scale, Phone, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import type { About } from "@/lib/types"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [about, setAbout] = useState<About | null>(null)
  const t = useTranslations("cta")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  const phone = about?.phone || "+998 90 123 45 67"

  return (
    <section className="py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}

            className="p-12 rounded-3xl border border-border bg-card/50 dark:bg-card/30 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <Scale className="h-10 w-10 text-primary" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                >
                  {t("contactBtn")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/30 text-foreground hover:bg-primary/5 transition-all duration-300"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  {phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
