"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { Testimonial } from "@/lib/types"
import { Star, Quote, MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-300 w-full">
      {/* Quote icon */}
      <Quote className="h-5 w-5 text-primary/30 mb-3" />

      {/* Content */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {testimonial.content}
      </p>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        {testimonial.clientImage?.url ? (
          <img
            src={testimonial.clientImage.url}
            alt={testimonial.clientName || ""}
            className="w-10 h-10 rounded-full object-cover border border-primary/20"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {(testimonial.clientName || "")?.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.clientName}</p>
          {testimonial.clientPosition && (
            <p className="text-xs text-muted-foreground">{testimonial.clientPosition}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const t = useTranslations("testimonials")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/testimonials")
      .then((r) => r.json())
      .then((d) => d.data && setTestimonials(d.data))
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-muted/40 rounded-lg mx-auto animate-pulse mb-3" />
            <div className="h-5 w-96 max-w-full bg-muted/20 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card animate-pulse">
                <div className="h-5 w-5 bg-muted/30 rounded mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-muted/20 rounded" />
                  <div className="h-4 w-5/6 bg-muted/20 rounded" />
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-muted/30" />
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-muted/30 rounded" />
                    <div className="h-3 w-16 bg-muted/20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/15 mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
