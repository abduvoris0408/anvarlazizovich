"use client"

import { motion } from "framer-motion"
import { Scale, Award, Users, Briefcase, Clock, Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import type { About } from "@/lib/types"

/* ── Animated counter ── */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let frame: number
    const t0 = Date.now(), dur = 1600
    const loop = () => {
      const p = Math.min((Date.now() - t0) / dur, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) frame = requestAnimationFrame(loop)
      else setCount(value)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [started, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export function AboutHero() {
  const [about, setAbout] = useState<About | null>(null)
  const [loaded, setLoaded] = useState(false)
  const t = useTranslations("about")

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then(r => r.json())
      .then(d => d.data && setAbout(d.data))
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  const name = about?.fullName || "Burxonjonov Anvarjon Lazizjon o'g'li"
  const title = about?.title || "Yurist"
  const bio = about?.shortBio || "Yurist va Sertifikatlangan Mediator"
  const stats = about?.stats

  const statItems = [
    { icon: Clock,     value: parseInt(stats?.yearsExperience || "3"),   suffix: "+", label: t("heroStats.years") || "Yillik tajriba" },
    { icon: Users,     value: parseInt(stats?.happyClients || "200"),    suffix: "+", label: t("heroStats.clients") || "Mamnun mijozlar" },
    { icon: Briefcase, value: parseInt(stats?.projectsCompleted || "15"),suffix: "+", label: t("heroStats.cases") || "Tugatilgan ishlar" },
    { icon: Award,     value: parseInt(stats?.awardsWon || "5"),         suffix: "",  label: t("heroStats.awards") || "Mukofotlar" },
  ]

  return (
    <section className="relative overflow-hidden flex items-center bg-background border-b border-border pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] blur-[140px] rounded-full"
          style={{ background: "radial-gradient(ellipse, oklch(0.47 0.27 18 / 0.10) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle at center, oklch(0.47 0.27 18) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-md border"
              style={{ color: "oklch(0.47 0.27 18)", borderColor: "oklch(0.47 0.27 18 / 0.28)", background: "oklch(0.47 0.27 18 / 0.07)" }}>
              <Scale className="h-4 w-4" />
              {t("heroTitle")}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "circOut" }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.15]">
            <span className="text-foreground">{name.split(" ")[0]} </span>
            <span style={{
              backgroundImage: "linear-gradient(135deg, oklch(0.47 0.27 18) 0%, oklch(0.60 0.26 20) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-foreground">{title}</span>
            {" · "}
            <span>{bio}</span>
          </motion.p>

          {/* Stats from API */}
          {loaded && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
              {statItems.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                    className="flex flex-col items-center p-5 rounded-2xl border backdrop-blur-sm cursor-default group transition-all duration-300"
                    style={{ borderColor: "oklch(0.47 0.27 18 / 0.16)", background: "oklch(0.47 0.27 18 / 0.04)" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "oklch(0.47 0.27 18 / 0.38)"
                      el.style.background = "oklch(0.47 0.27 18 / 0.09)"
                      el.style.boxShadow = "0 6px 24px oklch(0.47 0.27 18 / 0.14)"
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "oklch(0.47 0.27 18 / 0.16)"
                      el.style.background = "oklch(0.47 0.27 18 / 0.04)"
                      el.style.boxShadow = "none"
                    }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: "oklch(0.47 0.27 18 / 0.10)" }}>
                      <Icon className="w-4 h-4" style={{ color: "oklch(0.47 0.27 18)" }} />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold font-serif mb-1" style={{ color: "oklch(0.47 0.27 18)" }}>
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="text-xs font-medium text-muted-foreground text-center leading-tight">{s.label}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {/* Skill pills */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
            className="flex flex-wrap justify-center gap-2">
            {[
              { icon: Scale, text: "Yurist" },
              { icon: Star, text: "Sertifikatlangan Mediator" },
              { icon: Users, text: "3+ yillik tajriba" },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md"
                  style={{ color: "oklch(0.55 0.20 18)", borderColor: "oklch(0.47 0.27 18 / 0.22)", background: "oklch(0.47 0.27 18 / 0.06)" }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: "oklch(0.47 0.27 18)" }} />
                  {item.text}
                </span>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
