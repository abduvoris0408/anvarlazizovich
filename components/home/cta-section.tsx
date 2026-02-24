"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { About } from "@/lib/types"
import { Phone, ArrowRight, Scale, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

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
    <section className="py-16 sm:py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-primary/15 bg-card relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/15 mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {t("title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("subtitle")}
              </p>

              {/* Gold divider */}
              <div className="divider-gold w-16 mx-auto mb-8" />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 group"
                >
                  <Scale className="h-5 w-5" />
                  {t("contactBtn")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-border rounded-xl text-foreground hover:border-primary/30 hover:text-primary transition-all"
                >
                  <Phone className="h-5 w-5" />
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
