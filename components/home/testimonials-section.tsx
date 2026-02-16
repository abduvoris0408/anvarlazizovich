"use client"

import { useState, useEffect } from "react"
import { Marquee } from "@/components/magicui/marquee"
import type { Testimonial } from "@/lib/types"

const TestimonialCard = ({
  image,
  name,
  role,
  content,
}: {
  image: string
  name: string
  role: string
  content: string
}) => {
  return (
    <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/5 dark:bg-gradient-to-b dark:from-white/5 dark:to-white/[0.02] p-10 shadow-lg">
      <div className="absolute -top-5 -left-5 -z-10 h-40 w-40 rounded-full bg-primary/5 dark:bg-primary/10 blur-md"></div>

      <div className="text-foreground/90 leading-relaxed">{content}</div>

      <div className="mt-5 flex items-center gap-2">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          height="40"
          width="40"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div className="leading-5 font-medium tracking-tight text-foreground">{name}</div>
          <div className="leading-5 tracking-tight text-muted-foreground">{role}</div>
        </div>
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
    <section className="mb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-[540px]">
          <div className="flex justify-center">
            <button
              type="button"
              className="group relative z-[60] mx-auto rounded-full border border-white/20 bg-white/5 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
            >
              <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
              <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
              <span className="relative text-foreground">Mijozlar fikri</span>
            </button>
          </div>
          <h2 className="from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 mt-5 bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px] relative z-10">
            Mijozlarimiz fikri
          </h2>

          <p className="mt-5 relative z-10 text-center text-lg text-muted-foreground">
            Professional huquqiy xizmatlardan foydalangan mijozlarimizning sharhlari
          </p>
        </div>

        <div className="my-16 flex max-h-[738px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <div>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
              {firstColumn.map((t) => (
                <TestimonialCard
                  key={t.id}
                  image={t.image?.url || t.clientImage?.url || "/placeholder.svg"}
                  name={t.name || t.clientName}
                  role={t.role || t.clientPosition}
                  content={t.content}
                />
              ))}
            </Marquee>
          </div>

          {secondColumn.length > 0 && (
            <div className="hidden md:block">
              <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
                {secondColumn.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    image={t.image?.url || t.clientImage?.url || "/placeholder.svg"}
                    name={t.name || t.clientName}
                    role={t.role || t.clientPosition}
                    content={t.content}
                  />
                ))}
              </Marquee>
            </div>
          )}

          {thirdColumn.length > 0 && (
            <div className="hidden lg:block">
              <Marquee pauseOnHover vertical className="[--duration:30s]">
                {thirdColumn.map((t) => (
                  <TestimonialCard
                    key={t.id}
                    image={t.image?.url || t.clientImage?.url || "/placeholder.svg"}
                    name={t.name || t.clientName}
                    role={t.role || t.clientPosition}
                    content={t.content}
                  />
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
