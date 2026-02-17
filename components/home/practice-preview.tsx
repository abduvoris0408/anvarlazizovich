"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { Service } from "@/lib/types"
import { Scale, Shield, Heart, Briefcase, Building, ArrowRight } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"

const iconMap: Record<string, React.ElementType> = {
  Scale,
  Shield,
  Heart,
  Briefcase,
  Building,
}

export function PracticePreview() {
  // const ref = useRef(null) // Removed manual ref
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/services?limit=100")
      .then((r) => r.json())
      .then((d) => d.data && setServices(d.data))
      .catch(() => { })
  }, [])

  if (services.length === 0) {
    // Return skeleton or empty state instead of null to ensure section visibility
    return (
      <section className="relative overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <SectionBadge title="Amaliyot sohalari" icon={Scale} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Huquqiy xizmatlar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden py-12">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionBadge title="Amaliyot sohalari" icon={Scale} />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent mb-4">
            Huquqiy xizmatlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keng ko&apos;lamli huquqiy masalalarda professional yordam va maslahatlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.slice(0, 3).map((service, index) => {
            const IconComponent = iconMap[service.icon]

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}

                className="group relative rounded-2xl p-8 glass-liquid border border-border/40 hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-md"></div>

                {/* Image Background Support */}
                {service.image?.url && (
                  <div className="mb-6 rounded-xl overflow-hidden h-48 w-full relative shrink-0">
                    <img
                      src={service.image.url}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Category Badge on Image */}
                    {service.category && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md border border-border/50 text-foreground shadow-sm">
                          {service.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 bg-background/50 backdrop-blur-sm flex items-center justify-center h-12 w-12 shrink-0">
                      {IconComponent ? (
                        <IconComponent className="h-6 w-6 text-primary" />
                      ) : (
                        <span className="text-2xl leading-none" role="img" aria-label="icon">
                          {service.icon || "⚖️"}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground line-clamp-2">{service.title}</h3>
                  </div>

                  {/* Category Badge if no image */}
                  {!service.image?.url && service.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                      {service.category.name}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-grow">{service.description}</p>

                {service.ServiceDetails && service.ServiceDetails.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <ul className="space-y-2">
                      {service.ServiceDetails.slice(0, 2).map((detail) => (
                        <li key={detail.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span className="line-clamp-1">{detail.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-all duration-300 group"
          >
            Barcha xizmatlarni ko&apos;rish
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
