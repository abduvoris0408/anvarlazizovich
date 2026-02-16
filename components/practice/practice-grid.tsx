"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Service } from "@/lib/types"
import { Scale, Shield, Heart, Briefcase, Building, Check } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

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
        <motion.div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-8 rounded-2xl border border-border bg-card/50 space-y-4">
                  <div className="flex items-start gap-6">
                    <Skeleton className="h-16 w-16 rounded-2xl flex-shrink-0" />
                    <div className="flex-1 space-y-3 w-full">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                  <div className="space-y-2 pl-22">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  if (services.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground">
            <p>Xizmatlar haqida ma&apos;lumot yo&apos;q</p>
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
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Scale
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-8 rounded-2xl border border-border bg-card/50 dark:bg-card/30 backdrop-blur-sm hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-300"
                >
                  <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{service.description}</p>

                      {service.ServiceDetails && service.ServiceDetails.length > 0 && (
                        <ul className="space-y-3">
                          {service.ServiceDetails.map((detail) => (
                            <li key={detail.id} className="flex items-center gap-3">
                              <div className="p-1 rounded-full bg-primary/10">
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
