"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowRight, Phone, Shield, Users, Award, Target } from "lucide-react"
import { CourthouseLogo } from "@/components/shared/courthouse-logo"
import Link from "next/link"
import type { About } from "@/lib/types"
import { useTranslations } from "next-intl"

const advantages = [
  { icon: Shield, key: "advantage1" },
  { icon: Award, key: "advantage2" },
  { icon: Users, key: "advantage3" },
  { icon: Target, key: "advantage4" },
]

/* ───── Animated mesh gradient canvas ───── */
function AnimatedMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h)

    // Floating orbs
    const orbs = [
      { x: w * 0.2 + Math.sin(t * 0.4) * 60, y: h * 0.3 + Math.cos(t * 0.3) * 40, r: 180, color: "201, 168, 76" },
      { x: w * 0.7 + Math.cos(t * 0.35) * 80, y: h * 0.5 + Math.sin(t * 0.45) * 50, r: 220, color: "201, 168, 76" },
      { x: w * 0.5 + Math.sin(t * 0.5) * 70, y: h * 0.2 + Math.cos(t * 0.25) * 60, r: 160, color: "180, 150, 60" },
      { x: w * 0.85 + Math.cos(t * 0.3) * 50, y: h * 0.7 + Math.sin(t * 0.4) * 30, r: 140, color: "201, 168, 76" },
    ]

    orbs.forEach((orb) => {
      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
      grad.addColorStop(0, `rgba(${orb.color}, 0.06)`)
      grad.addColorStop(0.5, `rgba(${orb.color}, 0.02)`)
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    })

    // Subtle grid lines
    ctx.strokeStyle = "rgba(201, 168, 76, 0.03)"
    ctx.lineWidth = 0.5
    const spacing = 60
    for (let i = 0; i < w; i += spacing) {
      const offset = Math.sin(t * 0.2 + i * 0.01) * 4
      ctx.beginPath()
      ctx.moveTo(i + offset, 0)
      ctx.lineTo(i + offset, h)
      ctx.stroke()
    }
    for (let j = 0; j < h; j += spacing) {
      const offset = Math.cos(t * 0.2 + j * 0.01) * 4
      ctx.beginPath()
      ctx.moveTo(0, j + offset)
      ctx.lineTo(w, j + offset)
      ctx.stroke()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    let start = 0
    const loop = (ts: number) => {
      if (!start) start = ts
      draw(ctx, canvas.width, canvas.height, (ts - start) / 1000)
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}

export function LegalHero() {
  const [mounted, setMounted] = useState(false)
  const [about, setAbout] = useState<About | null>(null)
  const t = useTranslations("hero")

  useEffect(() => {
    setMounted(true)
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  if (!mounted) {
    return (
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col">
        <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="h-6 w-48 bg-muted/40 rounded-full mx-auto animate-pulse" />
            <div className="space-y-3">
              <div className="h-14 w-96 max-w-full bg-muted/40 rounded-lg mx-auto animate-pulse" />
              <div className="h-10 w-64 bg-primary/10 rounded-lg mx-auto animate-pulse" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <div className="h-5 w-full bg-muted/20 rounded animate-pulse" />
              <div className="h-5 w-4/5 bg-muted/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const name = about?.fullName || "Burxonov Anvar Lazizovich"
  const title = about?.title || "Professional Advokat & Sertifikatlangan Mediator"
  const phone = about?.phone || "+998 90 123 45 67"

  return (
    <section className="relative overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 z-0">
        <AnimatedMesh />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20 sm:py-28 lg:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <CourthouseLogo className="h-4 w-4" />
              {t("badge")}
            </div>
          </motion.div>

          {/* Main Heading — Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-4 text-balance leading-[1.1]"
          >
            {name}
          </motion.h1>

          {/* Title — Gold gradient */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gold-gradient mb-6"
          >
            {title}
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="divider-gold w-24 mx-auto mb-6"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            {about?.bio
              ? about.bio.slice(0, 200) + "..."
              : about?.biography
                ? about.biography.slice(0, 200) + "..."
                : t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <div className="group cursor-pointer bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-base flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                <CourthouseLogo className="h-5 w-5" />
                {t("cta")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 px-6 py-3.5 text-muted-foreground hover:text-primary transition-colors border border-border rounded-xl hover:border-primary/30"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">{t("callNow")}</span>
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-20"
        >
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: about?.stats?.yearsExperience || "15", label: t("yearsExp") },
                { value: about?.stats?.happyClients || "500", label: t("clients") },
                { value: about?.stats?.projectsCompleted || "1000", label: t("cases") },
                { value: "98%", label: t("awards") },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl sm:text-4xl font-serif font-bold text-primary">{stat.value}+</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us — Advantage Cards */}
      <div className="relative z-10 border-t border-border/50">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t("whyChooseUs")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("advantage1Desc")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {advantages.map((adv, index) => (
              <motion.div
                key={adv.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/15 w-fit mb-4 group-hover:bg-primary/15 transition-colors">
                  <adv.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{t(`${adv.key}Title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`${adv.key}Desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
