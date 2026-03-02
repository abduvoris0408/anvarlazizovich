"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Service } from "@/lib/types"
import Link from "next/link"
import { Scale, Shield, Heart, Briefcase, Building, ArrowRight, ArrowUpRight, Gavel, CreditCard, FileText, BookOpen, Home, Users } from "lucide-react"
import { useTranslations } from "next-intl"

const C = "oklch(0.47 0.27 18)"

function getIcon(title: string, slug?: string): React.ElementType {
  const k = ((title || "") + (slug || "")).toLowerCase()
  if (k.includes("qarz") || k.includes("undirish")) return CreditCard
  if (k.includes("mehnat") || k.includes("xodim")) return Briefcase
  if (k.includes("shartnoma") || k.includes("kontrakt")) return FileText
  if (k.includes("oila") || k.includes("ajrim") || k.includes("aliment")) return Heart
  if (k.includes("mulk") || k.includes("uy")) return Home
  if (k.includes("jinoyat")) return Gavel
  if (k.includes("tadbirkor") || k.includes("biznes")) return Building
  if (k.includes("mediats")) return Scale
  if (k.includes("fuqarolik") || k.includes("iqtisodiy")) return Users
  return BookOpen
}

export function PracticePreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("practice")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/services?limit=6")
      .then(r => r.json())
      .then(d => { if (d.data && Array.isArray(d.data)) setServices(d.data) })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="pt-6 pb-16 sm:pb-24">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-0.5 w-8 rounded-full" style={{ background: C }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: C }}>{t("title")}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">{t("subtitle")}</h2>
            </div>
            <Link href="/practice"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all hover:gap-3 shrink-0 group"
              style={{ color: C, borderColor: "oklch(0.47 0.27 18 / 0.28)", background: "oklch(0.47 0.27 18 / 0.06)" }}>
              {t("viewAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card animate-pulse">
                  <div className="h-12 w-12 rounded-xl bg-muted/40 mb-4" />
                  <div className="h-5 w-3/4 bg-muted/40 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-3.5 w-full bg-muted/20 rounded" />
                    <div className="h-3.5 w-5/6 bg-muted/20 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && services.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, i) => {
                const Icon = getIcon(service.title, service.slug)
                return (
                  <motion.div key={service.id}
                    initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="group relative p-6 rounded-2xl border border-border bg-card transition-all duration-300 cursor-default overflow-hidden hover:shadow-lg"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.47 0.27 18 / 0.35)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "" }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at top left, oklch(0.47 0.27 18 / 0.05), transparent 60%)" }} />
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "oklch(0.47 0.27 18 / 0.08)", borderColor: "oklch(0.47 0.27 18 / 0.18)" }}>
                      <Icon className="w-6 h-6" style={{ color: C }} />
                    </div>
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{service.description}</p>
                    {service.category?.name && (
                      <div className="mt-3">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ color: C, background: "oklch(0.47 0.27 18 / 0.08)" }}>
                          {service.category.name}
                        </span>
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                      style={{ color: C }}>
                      {t("learnMore")} <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {!isLoading && services.length === 0 && (
            <p className="text-center text-muted-foreground py-10">{t("noData")}</p>
          )}
        </div>
      </div>
    </section>
  )
}
