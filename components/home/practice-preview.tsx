"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Service } from "@/lib/types"
import Link from "next/link"
import { Scale, Shield, Heart, Briefcase, Building, ArrowRight, ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Shield,
  Heart,
  Briefcase,
  Building,
}

export function PracticePreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("practice")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/services?limit=6")
      .then((r) => r.json())
      .then((d) => d.data && setServices(d.data))
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="py-16 sm:py-20">
      <div ref={ref} className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {t("title")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                {t("subtitle")}
              </p>
            </div>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all shrink-0 group"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-border bg-card animate-pulse">
                  <div className="h-12 w-12 rounded-xl bg-muted/40 mb-4" />
                  <div className="h-6 w-3/4 bg-muted/40 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted/20 rounded" />
                    <div className="h-4 w-5/6 bg-muted/20 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Services Grid */}
          {!isLoading && services.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service, index) => {
                const IconComponent = iconMap[service.icon]
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                    className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/15 w-fit mb-4 group-hover:bg-primary/15 transition-colors">
                      {IconComponent ? (
                        <IconComponent className="h-6 w-6 text-primary" />
                      ) : (
                        <span className="text-2xl" role="img">
                          {service.icon || "⚖️"}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-1">
                      {service.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>

                    {/* Category badge */}
                    {service.category?.name && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <span className="text-xs font-medium text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full">
                          {service.category.name}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && services.length === 0 && (
            <div className="p-12 rounded-2xl border border-border bg-card text-center">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Xizmatlar haqida ma&apos;lumot mavjud emas.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
