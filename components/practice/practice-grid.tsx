"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Service } from "@/lib/types"
import { Scale, Shield, Heart, Briefcase, Building, Check, Gavel, CreditCard, FileText, BookOpen, Home, Users } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { useTranslations } from "next-intl"

const C = "oklch(0.47 0.27 18)"

function getIcon(title: string, slug?: string, iconStr?: string): React.ElementType {
  const k = ((title || "") + (slug || "") + (iconStr || "")).toLowerCase()
  if (k.includes("qarz") || k.includes("undirish") || k.includes("kredit")) return CreditCard
  if (k.includes("mehnat") || k.includes("xodim") || k.includes("ish ber")) return Briefcase
  if (k.includes("shartnoma") || k.includes("kontrakt")) return FileText
  if (k.includes("oila") || k.includes("ajrim") || k.includes("aliment") || k.includes("meros")) return Heart
  if (k.includes("mulk") || k.includes("ko'chmas") || k.includes("uy")) return Home
  if (k.includes("jinoyat") || k.includes("jinoiy")) return Gavel
  if (k.includes("tadbirkor") || k.includes("biznes")) return Building
  if (k.includes("mediats")) return Scale
  if (k.includes("fuqarolik") || k.includes("iqtisodiy")) return Users
  return BookOpen
}

export function PracticeGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("practice")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/services?limit=100")
      .then(r => r.json())
      .then(d => { if (d.data && Array.isArray(d.data)) setServices(d.data) })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 space-y-3">
            <div className="h-8 w-48 bg-muted/40 rounded-full mx-auto animate-pulse" />
            <div className="h-6 w-72 bg-muted/25 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="p-7 rounded-2xl border border-border bg-card animate-pulse">
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 rounded-xl bg-muted/40 shrink-0" />
                  <div className="flex-1 space-y-3 pt-1">
                    <div className="h-5 w-1/2 bg-muted/40 rounded" />
                    <div className="h-4 w-full bg-muted/25 rounded" />
                    <div className="h-4 w-4/5 bg-muted/25 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="text-center mb-14">
            <SectionBadge title={t("title")} icon={Scale} />
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-foreground mt-5 mb-4">{t("subtitle")}</h2>
            <div className="h-0.5 w-16 mx-auto rounded-full" style={{ background: C }} />
          </motion.div>

          {services.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "oklch(0.47 0.27 18 / 0.10)" }}>
                <Scale className="w-8 h-8" style={{ color: C }} />
              </div>
              <p className="text-muted-foreground">{t("noData")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              {services.map((service, i) => {
                const Icon = getIcon(service.title, service.slug, service.icon)
                const details = service.details || service.ServiceDetails || []
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group relative p-7 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.47 0.27 18 / 0.35)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: "radial-gradient(ellipse at top left, oklch(0.47 0.27 18 / 0.05), transparent 60%)" }} />

                    <div className="flex items-start gap-5 relative z-10">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
                        style={{ background: "oklch(0.47 0.27 18 / 0.08)", borderColor: "oklch(0.47 0.27 18 / 0.20)" }}>
                        <Icon className="w-7 h-7" style={{ color: C }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {service.category && (
                          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-2 px-2.5 py-0.5 rounded-full"
                            style={{ color: C, background: "oklch(0.47 0.27 18 / 0.08)" }}>
                            {service.category.name}
                          </span>
                        )}
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">{service.description}</p>
                        {details.length > 0 && (
                          <ul className="space-y-1.5 mb-3">
                            {details.slice(0, 4).map(d => (
                              <li key={d.id} className="flex items-center gap-2 text-sm text-foreground/80">
                                <div className="p-0.5 rounded-full shrink-0" style={{ background: "oklch(0.47 0.27 18 / 0.12)" }}>
                                  <Check className="h-2.5 w-2.5" style={{ color: C }} />
                                </div>
                                {d.title}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ color: C, background: "oklch(0.47 0.27 18 / 0.07)", border: "1px solid oklch(0.47 0.27 18 / 0.18)" }}>
                          <Check className="w-3 h-3" />
                          Bepul dastlabki maslahat
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
