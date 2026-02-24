"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Service } from "@/lib/types"
import { Scale, Shield, Heart, Briefcase, Building, Check } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { useTranslations } from "next-intl"

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Shield,
  Heart,
  Briefcase,
  Building,
}

export function PracticeGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("practice")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/services?limit=100")
      .then((r) => r.json())
      .then((d) => d.data && setServices(d.data))
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-8 rounded-2xl border border-border bg-card animate-pulse">
                  <div className="flex items-start gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-muted/50 shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-7 w-2/3 bg-muted/50 rounded" />
                      <div className="h-4 w-full bg-muted/30 rounded" />
                      <div className="h-4 w-5/6 bg-muted/30 rounded" />
                      <div className="h-4 w-4/6 bg-muted/30 rounded" />
                      <div className="space-y-2 pt-2">
                        <div className="h-3 w-3/4 bg-muted/20 rounded" />
                        <div className="h-3 w-2/3 bg-muted/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!isLoading && services.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl p-8 text-center max-w-2xl mx-auto border border-border bg-card">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("noData")}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon]
              const details = service.details || service.ServiceDetails || []

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Optional Image */}
                  {service.image?.url && (
                    <div className="mb-6 rounded-xl overflow-hidden h-48 w-full">
                      <img
                        src={service.image.url}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex-shrink-0 flex items-center justify-center h-16 w-16">
                      {IconComponent ? (
                        <IconComponent className="h-8 w-8 text-primary" />
                      ) : (
                        <span className="text-3xl" role="img" aria-label="icon">
                          {service.icon || "⚖️"}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>

                      {details.length > 0 && (
                        <ul className="space-y-3">
                          {details.map((detail) => (
                            <li key={detail.id} className="flex items-center gap-3">
                              <div className="p-1 rounded-full bg-primary/10 shrink-0">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm text-foreground/80">{detail.title}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
