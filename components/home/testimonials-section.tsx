"use client"

import { useState, useEffect } from "react"
import { Marquee } from "@/components/magicui/marquee"
import type { Testimonial } from "@/lib/types"
import { Star, User } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial
}) => {
  const image = testimonial.image?.url || testimonial.clientImage?.url
  const name = testimonial.name || testimonial.clientName
  const role = testimonial.role || testimonial.clientPosition || "Mijoz"
  const rating = testimonial.rating || 5

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl glass-liquid p-8 hover:bg-white/10 transition-colors duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-primary/60" />
            )}
          </div>
          <div>
            <div className="font-semibold text-foreground leading-tight">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="text-foreground/90 leading-relaxed text-base italic">
        &ldquo;{testimonial.content}&rdquo;
      </div>
    </div>
  )
}


export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/testimonials?limit=100")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setTestimonials(d.data)
      })
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && testimonials.length === 0) {
    return (
      <section className="mb-24 px-4">
        <div className="glass-effect rounded-3xl p-8 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground">Mijozlar fikri hozircha mavjud emas.</p>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="mb-24 px-4">
        <div className="glass-effect rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <div className="h-8 w-48 bg-muted rounded-md mx-auto mb-10 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 glass-card rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const colSize = Math.ceil(testimonials.length / 3)
  const firstColumn = testimonials.slice(0, colSize)
  const secondColumn = testimonials.slice(colSize, colSize * 2)
  const thirdColumn = testimonials.slice(colSize * 2)

  return (
    <section className="mb-24 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-[640px] text-center mb-16">
          <SectionBadge title="Mijozlar fikri" icon={User} />

          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Mijozlarimiz nima deydi?
          </h2>

          <p className="text-lg text-muted-foreground">
            Bizning xizmatlarimizdan foydalangan va natijadan mamnun bo&apos;lgan mijozlarimizning samimiy fikrlari bilan tanishing.
          </p>
        </div>

        <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div className="h-full overflow-hidden">
              <Marquee pauseOnHover vertical className="[--duration:40s]">
                {firstColumn.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </Marquee>
            </div>

            <div className="h-full overflow-hidden hidden md:block">
              <Marquee reverse pauseOnHover vertical className="[--duration:45s]">
                {secondColumn.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </Marquee>
            </div>

            <div className="h-full overflow-hidden hidden lg:block">
              <Marquee pauseOnHover vertical className="[--duration:50s]">
                {thirdColumn.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </Marquee>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        </div>
      </div>
    </section>
  )
}
