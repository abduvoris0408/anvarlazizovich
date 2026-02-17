"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Scale, ArrowRight, Phone } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import Link from "next/link"
import type { About } from "@/lib/types"

export function LegalHero() {
  const [mounted, setMounted] = useState(false)
  const [about, setAbout] = useState<About | null>(null)


  useEffect(() => {
    setMounted(true)
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  if (!mounted) {
    return null
  }

  const name = about?.fullName || "Burxonov Anvar Lazizovich"
  const title = about?.title || "Lawyer & Certified Mediator"
  const phone = about?.phone || "+998 90 123 45 67"

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10 flex-1 flex flex-col">
        <div className="mx-auto max-w-4xl text-center flex-1 flex flex-col justify-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <SectionBadge title="Professional Legal Services" icon={Scale} />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              <span className="block">{name}</span>
              <span className="block mt-2 text-primary">{title}</span>
            </h1>
          </motion.div>


          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-pretty"
          >
            {about?.bio
              ? about.bio.slice(0, 200) + "..."
              : about?.biography
                ? about.biography.slice(0, 200) + "..."
                : "Your trusted partner for professional protection of your rights and effective dispute resolution through expert legal representation and certified mediation."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link href="/contact">
              <div className="group cursor-pointer border border-border bg-card gap-2 h-[60px] flex items-center p-[10px] rounded-full">
                <div className="border border-border bg-primary h-[40px] rounded-full flex items-center justify-center text-primary-foreground">
                  <p className="font-medium tracking-tight mr-3 ml-3 flex items-center gap-2 justify-center text-base">
                    <Scale className="h-5 w-5" />
                    Request Legal Help
                  </p>
                </div>
                <div className="text-muted-foreground group-hover:ml-4 ease-in-out transition-all size-[24px] flex items-center justify-center rounded-full border-2 border-border">
                  <ArrowRight className="h-4 w-4 group-hover:rotate-45 ease-in-out transition-all" />
                </div>
              </div>
            </Link>

            {/* Secondary CTA */}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">{phone}</span>
            </a>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-auto pb-8"
        >
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
              {about?.stats ? (
                <>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">{about.stats.yearsExperience}+</p>
                    <p className="text-sm text-muted-foreground">Yillik Tajriba</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">{about.stats.happyClients}+</p>
                    <p className="text-sm text-muted-foreground">Mamnun Mijozlar</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">{about.stats.projectsCompleted}+</p>
                    <p className="text-sm text-muted-foreground">Muvaffaqiyatli Ishlar</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Natija</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">15+</p>
                    <p className="text-sm text-muted-foreground">Yillik Tajriba</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Muvaffaqiyatli Ishlar</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">1000+</p>
                    <p className="text-sm text-muted-foreground">Mamnun Mijozlar</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Natija</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
