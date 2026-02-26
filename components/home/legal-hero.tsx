"use client"

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  ArrowRight, Shield, Users, Award, Target,
  CheckCircle2, Phone, MessageSquare, ChevronDown, Star, Zap
} from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

/* ─────────────────────────────────────────────
   1. NOISE TEXTURE
───────────────────────────────────────────── */
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   2. ANIMATED GOLD ORBS (Canvas)
───────────────────────────────────────────── */
function AnimatedOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
    ctx.clearRect(0, 0, w, h)
    const orbs = [
      { x: w * 0.15 + Math.sin(t * 0.3) * 80, y: h * 0.25 + Math.cos(t * 0.25) * 50, r: 320, c: "195, 155, 55" },
      { x: w * 0.75 + Math.cos(t * 0.28) * 100, y: h * 0.55 + Math.sin(t * 0.35) * 60, r: 380, c: "201, 168, 76" },
      { x: w * 0.45 + Math.sin(t * 0.4) * 60, y: h * 0.1 + Math.cos(t * 0.2) * 40, r: 240, c: "180, 130, 40" },
      { x: w * 0.9 + Math.cos(t * 0.22) * 50, y: h * 0.8 + Math.sin(t * 0.33) * 40, r: 200, c: "210, 170, 80" },
    ]
    orbs.forEach(({ x, y, r, c }) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(${c}, 0.10)`)
      g.addColorStop(0.5, `rgba(${c}, 0.04)`)
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener("resize", resize)
    let start = 0
    const loop = (ts: number) => {
      if (!start) start = ts
      draw(ctx, canvas.width, canvas.height, (ts - start) / 1000)
      animFrameRef.current = requestAnimationFrame(loop)
    }
    animFrameRef.current = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(animFrameRef.current); window.removeEventListener("resize", resize) }
  }, [draw])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ─────────────────────────────────────────────
   3. MAGNETIC BUTTON
───────────────────────────────────────────── */
function MagneticButton({ children, href, strength = 0.25 }: {
  children: React.ReactNode
  href?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 25 })
  const sy = useSpring(y, { stiffness: 300, damping: 25 })

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }, [x, y, strength])

  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  const inner = (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  )
  return href ? <Link href={href}>{inner}</Link> : inner
}

/* ─────────────────────────────────────────────
   4. ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let frame: number
    const t0 = Date.now()
    const dur = 1800
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

/* ─────────────────────────────────────────────
   5. TICKER TAPE
───────────────────────────────────────────── */
const TICKER = [
  "⚖️ Professional Yuridik Xizmat", "🔒 Maxfiylik Kafolati",
  "✅ 500+ Muvaffaqiyatli Ish", "🏆 15 Yillik Tajriba",
  "📋 Tez Natija", "💼 Barcha Huquqiy Yo'nalishlar", "🤝 Bepul Dastlabki Maslahat",
]

function TickerTape() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="absolute bottom-0 inset-x-0 z-20 overflow-hidden border-t backdrop-blur-md py-2.5"
      style={{ borderColor: "oklch(0.65 0.12 85 / 0.15)", background: "oklch(0.14 0.025 260 / 0.5)" }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-xs font-medium tracking-widest uppercase shrink-0 text-foreground/40">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   6. LIVE BADGE
───────────────────────────────────────────── */
function LiveBadge() {
  const [pulse, setPulse] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-semibold backdrop-blur-sm"
    >
      <span className={`w-1.5 h-1.5 rounded-full bg-green-400 transition-opacity duration-700 ${pulse ? "opacity-100" : "opacity-30"}`} />
      Hozir online · Bepul maslahat
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   7. WORD REVEAL
───────────────────────────────────────────── */
function WordReveal({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mr-[0.22em] text-white"
          style={{ textShadow: "0 2px 14px oklch(0.65 0.12 85 / 0.15)" }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   8. DATA
───────────────────────────────────────────── */
const heroVariants = [
  {
    eyebrow: "Yuridik Maslahat · Nizo Hal Qilish",
    title: "Huquqiy muammolaringizni ishonchli va professional yondashuvda hal eting",
    desc: "Sudgacha nizolarni hal qilish, yuridik maslahat va qonuniy himoya xizmatlarini bir joyda oling. Har bir ishni chuqur tahlil qilamiz.",
    features: [
      { text: "Sudgacha kelishuv va mediatsiya", icon: CheckCircle2 },
      { text: "Fuqarolik va xo'jalik nizolari", icon: CheckCircle2 },
      { text: "Shartnomalar va hujjatlar", icon: CheckCircle2 },
      { text: "Professional yuridik maslahat", icon: CheckCircle2 },
    ],
    cta1: "Bepul maslahat oling",
    cta2: "Xizmatlarni ko'rish",
  },
  {
    eyebrow: "Tez · Qonuniy · Samarali",
    title: "Huquqiy nizolaringizni tez, qonuniy va samarali hal qilamiz",
    desc: "Vaqt va mablag'ni yo'qotmasdan, muammolaringizni sudgacha bosqichda hal qilishga yordam beramiz.",
    features: [
      { text: "Ortiqcha sud jarayonlarisiz", icon: Zap },
      { text: "Har bir mijozga e'tibor", icon: Star },
      { text: "Maxfiylik va ishonch kafolati", icon: Shield },
      { text: "Amaliyotga asoslangan strategiya", icon: Target },
    ],
    cta1: "Hoziroq murojaat qiling",
    cta2: "Bepul dastlabki maslahat",
  },
  {
    eyebrow: "Sizning Manfaatlaringiz · Bizning Vazifamiz",
    title: "Sizning manfaatlaringiz bizning ustuvor vazifamiz",
    desc: "Professional yuridik xizmatlar va qonuniy himoya sohasida kompleks yechimlar. Nafaqat muammoni hal qilamiz, kelajakdagi xavflarni ham oldini olamiz.",
    features: [
      { text: "10+ yo'nalishda xizmat", icon: Award },
      { text: "Yuzlab muvaffaqiyatli ishlar", icon: CheckCircle2 },
      { text: "To'liq huquqiy qo'llab-quvvatlash", icon: Users },
      { text: "Kelajak uchun himoya", icon: Shield },
    ],
    cta1: "Maslahat olish",
    cta2: "Ishlashni boshlash",
  },
]

const stats = [
  { value: 15, suffix: "+", label: "Yillik tajriba" },
  { value: 500, suffix: "+", label: "Mamnun mijozlar" },
  { value: 1000, suffix: "+", label: "Muvaffaqiyatli ishlar" },
  { value: 98, suffix: "%", label: "Ijobiy natijalar" },
]

const advantages = [
  { icon: Shield, titleKey: "advantage1Title", descKey: "advantage1Desc" },
  { icon: Award, titleKey: "advantage2Title", descKey: "advantage2Desc" },
  { icon: Users, titleKey: "advantage3Title", descKey: "advantage3Desc" },
  { icon: Target, titleKey: "advantage4Title", descKey: "advantage4Desc" },
]

// Gold CSS variable shortcuts (inline style values)
const GOLD = "oklch(0.72 0.14 85)"
const GOLD_DIM = "oklch(0.65 0.12 85)"
const GOLD_SOFT = "oklch(0.85 0.08 90)"

/* ─────────────────────────────────────────────
   9. MAIN COMPONENT
───────────────────────────────────────────── */
export function LegalHero() {
  const [mounted, setMounted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const t = useTranslations("hero")

  // Cursor glow
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)
  const cgX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const cgY = useSpring(mouseY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setCurrentIdx(p => (p + 1) % heroVariants.length), 7000)
    return () => clearInterval(id)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX); mouseY.set(e.clientY)
  }, [mouseX, mouseY])

  if (!mounted) return (
    <section className="relative overflow-hidden min-h-[85vh] bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </section>
  )

  const current = heroVariants[currentIdx]

  return (
    <section className="relative overflow-hidden bg-background" onMouseMove={onMouseMove}>

      {/* ── CURSOR GLOW ── */}
      <motion.div
        className="fixed pointer-events-none z-50 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cgX, top: cgY,
          background: `radial-gradient(circle, oklch(0.65 0.12 85 / 0.08) 0%, transparent 70%)`,
        }}
      />

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {/* Video — brightness 0.55 so video details are visible */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.55) contrast(1.1) saturate(0.85)" }}
        >
          <source src="/fb3d1c70e4969f2df7555cfe4095c753_t4.mp4" type="video/mp4" />
        </video>

        {/* Minimal gradient overlay — does NOT hide the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-transparent to-background/35" />

        {/* Gold ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none blur-[160px]"
          style={{ background: `radial-gradient(ellipse, oklch(0.65 0.12 85 / 0.10) 0%, transparent 70%)` }}
        />

        <AnimatedOrbs />

        {/* Subtle gold grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.65 0.12 85) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.65 0.12 85) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <NoiseOverlay />

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-background to-transparent z-10" />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-14 sm:pt-36 sm:pb-18 relative z-10 min-h-[85vh] flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center">



          {/* H1 — eyebrow line + main title in one semantic heading */}
          <div className="min-h-[140px] sm:min-h-[195px] flex items-center justify-center mb-5">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentIdx}`}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {/* ── Eyebrow line — gold, all-caps, inside the h1 ── */}
                <motion.span
                  key={`eyebrow-${currentIdx}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block font-sans text-sm sm:text-base font-semibold tracking-[0.25em] uppercase mb-3"
                  style={{ color: GOLD }}
                >
                  {current.eyebrow}
                </motion.span>

                {/* ── Main title — solid light gold, word reveal ── */}
                <span className="block drop-shadow-sm pb-1">
                  <WordReveal text={current.title} />
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentIdx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-foreground/55 leading-relaxed mb-7"
            >
              {current.desc}
            </motion.p>
          </AnimatePresence>

          {/* Feature pills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`feats-${currentIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-7"
            >
              {current.features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-md transition-all cursor-default"
                    style={{
                      color: "oklch(0.82 0.06 85)",
                      borderColor: "oklch(0.65 0.12 85 / 0.22)",
                      background: "oklch(0.65 0.12 85 / 0.07)",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "oklch(0.65 0.12 85 / 0.48)"
                      el.style.background = "oklch(0.65 0.12 85 / 0.14)"
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = "oklch(0.65 0.12 85 / 0.22)"
                      el.style.background = "oklch(0.65 0.12 85 / 0.07)"
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: GOLD }} />
                    {feat.text}
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${currentIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {/* Primary — solid gold */}
              <MagneticButton href="/contact">
                <div
                  className="group relative overflow-hidden px-7 py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center gap-2.5 cursor-pointer transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.60 0.13 85), oklch(0.68 0.15 78))`,
                    color: "oklch(0.10 0.02 260)",
                    boxShadow: `0 0 28px oklch(0.65 0.12 85 / 0.35)`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 42px oklch(0.65 0.12 85 / 0.55)"
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px oklch(0.65 0.12 85 / 0.35)"
                  }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                  <Phone className="w-4 h-4" />
                  {current.cta1}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </MagneticButton>

              {/* Secondary — ghost gold */}
              <MagneticButton href="/services">
                <div
                  className="group px-7 py-3.5 rounded-2xl font-medium text-sm sm:text-base flex items-center gap-2.5 cursor-pointer backdrop-blur-md transition-all duration-300 border"
                  style={{
                    color: "oklch(0.80 0.08 85)",
                    borderColor: "oklch(0.65 0.12 85 / 0.28)",
                    background: "oklch(0.65 0.12 85 / 0.06)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = "oklch(0.65 0.12 85 / 0.52)"
                    el.style.background = "oklch(0.65 0.12 85 / 0.12)"
                    el.style.color = "oklch(0.92 0.06 85)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = "oklch(0.65 0.12 85 / 0.28)"
                    el.style.background = "oklch(0.65 0.12 85 / 0.06)"
                    el.style.color = "oklch(0.80 0.08 85)"
                  }}
                >
                  <MessageSquare className="w-4 h-4" style={{ color: GOLD }} />
                  {current.cta2}
                </div>
              </MagneticButton>
            </motion.div>
          </AnimatePresence>

          {/* Carousel dots */}
          <div className="flex justify-center items-center gap-2.5 mt-7">
            {heroVariants.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: currentIdx === idx ? "2rem" : "0.375rem",
                  height: "0.375rem",
                  background: currentIdx === idx ? GOLD : "oklch(0.72 0.14 85 / 0.22)",
                  boxShadow: currentIdx === idx ? `0 0 10px oklch(0.72 0.14 85 / 0.55)` : "none",
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 sm:mt-18 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="group relative flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-2xl backdrop-blur-xl overflow-hidden cursor-default transition-all duration-400 border"
              style={{
                borderColor: "oklch(0.65 0.12 85 / 0.14)",
                background: "oklch(0.65 0.12 85 / 0.05)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "oklch(0.65 0.12 85 / 0.35)"
                el.style.background = "oklch(0.65 0.12 85 / 0.10)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = "oklch(0.65 0.12 85 / 0.14)"
                el.style.background = "oklch(0.65 0.12 85 / 0.05)"
              }}
            >
              <p
                className="text-3xl sm:text-4xl font-bold font-serif mb-1"
                style={{ color: "oklch(0.78 0.14 85)", textShadow: "0 0 18px oklch(0.65 0.12 85 / 0.4)" }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs sm:text-sm font-medium tracking-wide text-foreground/45">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center mt-8 gap-1.5"
          style={{ color: "oklch(0.65 0.12 85 / 0.45)" }}
        >
          <span className="text-[10px] uppercase tracking-widest">Pastga aylantiring</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── TICKER TAPE ── */}
      <TickerTape />

      {/* ── WHY CHOOSE US ── */}
      <div className="relative z-10 bg-background pt-14 pb-12 sm:pt-18 sm:pb-16">
        {/* Gold divider */}
        <div className="divider-gold w-full max-w-xs mx-auto mb-10 opacity-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="text-center mb-9 px-4"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
            style={{
              color: GOLD,
              borderColor: "oklch(0.65 0.12 85 / 0.25)",
              background: "oklch(0.65 0.12 85 / 0.08)",
            }}
          >
            <Star className="w-3 h-3" />
            Nima uchun biz?
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            Siz eng yaxshisini{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${GOLD}, oklch(0.78 0.16 75))` }}
            >
              haqsiz
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Har bir mijozga individual yondashuv va maksimal natija kafolati bilan xizmat ko'rsatamiz.
          </p>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group glass-card rounded-2xl p-5 sm:p-6 cursor-pointer relative overflow-hidden"
              >
                {/* Corner gold accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, oklch(0.65 0.12 85 / 0.12), transparent)" }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border"
                  style={{
                    background: "oklch(0.65 0.12 85 / 0.10)",
                    borderColor: "oklch(0.65 0.12 85 / 0.20)",
                  }}
                >
                  <adv.icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                  {t(adv.titleKey)}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t(adv.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LegalHero