'use client'

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
} from 'framer-motion'
import {
	ArrowRight,
	Award,
	BadgeCheck,
	CheckCircle2,
	ChevronDown,
	Clock,
	FileText,
	Handshake,
	HeadphonesIcon,
	Lock,
	MessageSquare,
	Phone,
	Scale,
	Shield,
	Star,
	Target,
	TrendingUp,
	Users,
	Zap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/* ─────────────────────────────────────────────
   1. NOISE TEXTURE
───────────────────────────────────────────── */
function NoiseOverlay() {
	return (
		<div
			className='absolute inset-0 pointer-events-none z-[1] opacity-[0.025]'
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
				backgroundSize: '256px 256px',
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

	const draw = useCallback(
		(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
			ctx.clearRect(0, 0, w, h)
			const orbs = [
				{
					x: w * 0.15 + Math.sin(t * 0.3) * 80,
					y: h * 0.25 + Math.cos(t * 0.25) * 50,
					r: 320,
					c: '196, 30, 58',
				},
				{
					x: w * 0.75 + Math.cos(t * 0.28) * 100,
					y: h * 0.55 + Math.sin(t * 0.35) * 60,
					r: 380,
					c: '196, 30, 58',
				},
				{
					x: w * 0.45 + Math.sin(t * 0.4) * 60,
					y: h * 0.1 + Math.cos(t * 0.2) * 40,
					r: 240,
					c: '178, 24, 50',
				},
				{
					x: w * 0.9 + Math.cos(t * 0.22) * 50,
					y: h * 0.8 + Math.sin(t * 0.33) * 40,
					r: 200,
					c: '196, 30, 58',
				},
			]
			orbs.forEach(({ x, y, r, c }) => {
				const g = ctx.createRadialGradient(x, y, 0, x, y, r)
				g.addColorStop(0, `rgba(${c}, 0.10)`)
				g.addColorStop(0.5, `rgba(${c}, 0.04)`)
				g.addColorStop(1, 'rgba(0,0,0,0)')
				ctx.fillStyle = g
				ctx.fillRect(0, 0, w, h)
			})
		},
		[],
	)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		const resize = () => {
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
		}
		resize()
		window.addEventListener('resize', resize)
		let start = 0
		const loop = (ts: number) => {
			if (!start) start = ts
			draw(ctx, canvas.width, canvas.height, (ts - start) / 1000)
			animFrameRef.current = requestAnimationFrame(loop)
		}
		animFrameRef.current = requestAnimationFrame(loop)
		return () => {
			cancelAnimationFrame(animFrameRef.current)
			window.removeEventListener('resize', resize)
		}
	}, [draw])

	return (
		<canvas
			ref={canvasRef}
			className='absolute inset-0 w-full h-full pointer-events-none'
		/>
	)
}

/* ─────────────────────────────────────────────
   3. MAGNETIC BUTTON
───────────────────────────────────────────── */
function MagneticButton({
	children,
	href,
	strength = 0.25,
}: {
	children: React.ReactNode
	href?: string
	strength?: number
}) {
	const ref = useRef<HTMLDivElement>(null)
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const sx = useSpring(x, { stiffness: 300, damping: 25 })
	const sy = useSpring(y, { stiffness: 300, damping: 25 })

	const onMove = useCallback(
		(e: React.MouseEvent) => {
			if (!ref.current) return
			const r = ref.current.getBoundingClientRect()
			x.set((e.clientX - r.left - r.width / 2) * strength)
			y.set((e.clientY - r.top - r.height / 2) * strength)
		},
		[x, y, strength],
	)

	const onLeave = useCallback(() => {
		x.set(0)
		y.set(0)
	}, [x, y])

	const inner = (
		<motion.div
			ref={ref}
			onMouseMove={onMove}
			onMouseLeave={onLeave}
			style={{ x: sx, y: sy }}
		>
			{children}
		</motion.div>
	)
	return href ? <Link href={href}>{inner}</Link> : inner
}

/* ─────────────────────────────────────────────
   4. ANIMATED COUNTER
───────────────────────────────────────────── */
function AnimatedCounter({
	value,
	suffix = '',
}: {
	value: number
	suffix?: string
}) {
	const [count, setCount] = useState(0)
	const [started, setStarted] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting && !started) setStarted(true)
			},
			{ threshold: 0.5 },
		)
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

	return (
		<span ref={ref}>
			{count}
			{suffix}
		</span>
	)
}

/* ─────────────────────────────────────────────
   5. TICKER TAPE
───────────────────────────────────────────── */
function TickerTape({
	items,
}: {
	items: { icon: React.ElementType; label: string }[]
}) {
	const doubled = [...items, ...items]
	return (
		<div
			className='absolute bottom-0 inset-x-0 z-20 overflow-hidden border-t py-3'
			style={{
				borderColor: 'oklch(0.47 0.27 18 / 0.12)',
				background: 'oklch(0.10 0.01 260 / 0.7)',
				backdropFilter: 'blur(12px)',
			}}
		>
			<motion.div
				className='flex gap-10 whitespace-nowrap'
				animate={{ x: ['0%', '-50%'] }}
				transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
			>
				{doubled.map((item, i) => {
					const Icon = item.icon
					return (
						<span
							key={i}
							className='inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase shrink-0'
							style={{ color: 'oklch(0.55 0.08 18)' }}
						>
							<Icon
								className='w-3.5 h-3.5 shrink-0'
								style={{ color: 'oklch(0.52 0.22 18)' }}
								strokeWidth={1.8}
							/>
							{item.label}
							<span
								className='ml-6 w-px h-3 inline-block'
								style={{
									background: 'oklch(0.47 0.27 18 / 0.25)',
								}}
							/>
						</span>
					)
				})}
			</motion.div>
		</div>
	)
}

/* ─────────────────────────────────────────────
   6. WORD REVEAL
───────────────────────────────────────────── */
function WordReveal({ text }: { text: string }) {
	return (
		<>
			{text.split(' ').map((word, i) => (
				<motion.span
					key={`${word}-${i}`}
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.45,
						delay: i * 0.055,
						ease: [0.16, 1, 0.3, 1],
					}}
					className='inline-block mr-[0.22em] text-white'
					style={{
						textShadow: '0 2px 14px oklch(0.47 0.27 18 / 0.15)',
					}}
				>
					{word}
				</motion.span>
			))}
		</>
	)
}

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const GOLD = 'oklch(0.62 0.28 18)'

const STATS_RAW = [
	{ value: 3, suffix: '+' },
	{ value: 50, suffix: '+' },
	{ value: 100, suffix: '+' },
	{ value: 98, suffix: '%' },
]

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function LegalHero() {
	const [mounted, setMounted] = useState(false)
	const [currentIdx, setCurrentIdx] = useState(0)
	const t = useTranslations('hero')

	useEffect(() => {
		setMounted(true)
		const id = setInterval(() => setCurrentIdx(p => (p + 1) % 3), 7000)
		return () => clearInterval(id)
	}, [])

	const heroVariants = useMemo(
		() => [
			{
				eyebrow: t('slide1.eyebrow'),
				title: t('slide1.title'),
				desc: t('slide1.desc'),
				features: [
					{ text: t('slide1.f1'), icon: CheckCircle2 },
					{ text: t('slide1.f2'), icon: CheckCircle2 },
					{ text: t('slide1.f3'), icon: CheckCircle2 },
					{ text: t('slide1.f4'), icon: CheckCircle2 },
				],
				cta1: t('slide1.cta1'),
				cta2: t('slide1.cta2'),
			},
			{
				eyebrow: t('slide2.eyebrow'),
				title: t('slide2.title'),
				desc: t('slide2.desc'),
				features: [
					{ text: t('slide2.f1'), icon: Zap },
					{ text: t('slide2.f2'), icon: Star },
					{ text: t('slide2.f3'), icon: Shield },
					{ text: t('slide2.f4'), icon: Target },
				],
				cta1: t('slide2.cta1'),
				cta2: t('slide2.cta2'),
			},
			{
				eyebrow: t('slide3.eyebrow'),
				title: t('slide3.title'),
				desc: t('slide3.desc'),
				features: [
					{ text: t('slide3.f1'), icon: Award },
					{ text: t('slide3.f2'), icon: CheckCircle2 },
					{ text: t('slide3.f3'), icon: Users },
					{ text: t('slide3.f4'), icon: Shield },
				],
				cta1: t('slide3.cta1'),
				cta2: t('slide3.cta2'),
			},
		],
		[t],
	)

	const stats = useMemo(
		() => [
			{ ...STATS_RAW[0], label: t('stats.experience') },
			{ ...STATS_RAW[1], label: t('stats.clients') },
			{ ...STATS_RAW[2], label: t('stats.cases') },
			{ ...STATS_RAW[3], label: t('stats.success') },
		],
		[t],
	)

	const tickerItems = useMemo(
		() => [
			{ icon: Scale, label: t('ticker.t1') },
			{ icon: Lock, label: t('ticker.t2') },
			{ icon: BadgeCheck, label: t('ticker.t3') },
			{ icon: TrendingUp, label: t('ticker.t4') },
			{ icon: Clock, label: t('ticker.t5') },
			{ icon: FileText, label: t('ticker.t6') },
			{ icon: Handshake, label: t('ticker.t7') },
			{ icon: HeadphonesIcon, label: t('ticker.t8') },
		],
		[t],
	)

	if (!mounted)
		return (
			<section className='relative overflow-hidden min-h-[85vh] bg-background flex items-center justify-center'>
				<div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
			</section>
		)

	const current = heroVariants[currentIdx]

	return (
		<section className='relative overflow-hidden bg-background'>
			{/* ── BACKGROUND ── */}
			<div className='absolute inset-0 z-0'>
				<video
					autoPlay
					muted
					loop
					playsInline
					className='absolute inset-0 w-full h-full object-cover object-center'
					style={{
						filter: 'brightness(0.72) contrast(1.05) saturate(0.7)',
					}}
				>
					<source
						src='/fb3d1c70e4969f2df7555cfe4095c753_t4.mp4'
						type='video/mp4'
					/>
				</video>

				<div className='absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background' />
				<div className='absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20' />

				<div
					className='absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none blur-[180px]'
					style={{
						background:
							'radial-gradient(ellipse, oklch(0.47 0.27 18 / 0.06) 0%, transparent 70%)',
					}}
				/>

				<AnimatedOrbs />

				<div
					className='absolute inset-0 opacity-[0.018]'
					style={{
						backgroundImage: `
							linear-gradient(oklch(0.47 0.27 18) 1px, transparent 1px),
							linear-gradient(90deg, oklch(0.47 0.27 18) 1px, transparent 1px)
						`,
						backgroundSize: '80px 80px',
					}}
				/>

				<NoiseOverlay />
				<div className='absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-background to-transparent z-10' />
			</div>

			{/* ── HERO CONTENT ── */}
			<div className='container mx-auto px-4 sm:px-6 pt-28 pb-14 sm:pt-36 sm:pb-18 relative z-10 min-h-[85vh] flex flex-col justify-center'>
				<div className='max-w-5xl mx-auto text-center'>
					{/* H1 */}
					<div className='min-h-[140px] sm:min-h-[195px] flex items-center justify-center mb-5'>
						<AnimatePresence mode='wait'>
							<motion.h1
								key={`title-${currentIdx}`}
								className='font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold leading-[1.1]'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.15 }}
							>
								<motion.span
									key={`eyebrow-${currentIdx}`}
									initial={{ opacity: 0, y: -8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									className='block font-sans text-sm sm:text-base font-semibold tracking-[0.25em] uppercase mb-3'
									style={{ color: GOLD }}
								>
									{current.eyebrow}
								</motion.span>

								<span className='block drop-shadow-sm pb-1'>
									<WordReveal text={current.title} />
								</span>
							</motion.h1>
						</AnimatePresence>
					</div>

					{/* Description */}
					<AnimatePresence mode='wait'>
						<motion.p
							key={`desc-${currentIdx}`}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.35, delay: 0.1 }}
							className='max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-foreground/55 leading-relaxed mb-7'
						>
							{current.desc}
						</motion.p>
					</AnimatePresence>

					{/* Feature pills */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={`feats-${currentIdx}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.35, delay: 0.15 }}
							className='flex flex-wrap justify-center gap-2 sm:gap-3 mb-7'
						>
							{current.features.map((feat, i) => {
								const Icon = feat.icon
								return (
									<motion.div
										key={i}
										initial={{ opacity: 0, scale: 0.88 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.2 + i * 0.06 }}
										className='flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border backdrop-blur-md transition-all cursor-default'
										style={{
											color: 'oklch(0.82 0.04 18)',
											borderColor:
												'oklch(0.47 0.27 18 / 0.22)',
											background:
												'oklch(0.47 0.27 18 / 0.07)',
										}}
										onMouseEnter={e => {
											const el =
												e.currentTarget as HTMLElement
											el.style.borderColor =
												'oklch(0.47 0.27 18 / 0.48)'
											el.style.background =
												'oklch(0.47 0.27 18 / 0.14)'
										}}
										onMouseLeave={e => {
											const el =
												e.currentTarget as HTMLElement
											el.style.borderColor =
												'oklch(0.47 0.27 18 / 0.22)'
											el.style.background =
												'oklch(0.47 0.27 18 / 0.07)'
										}}
									>
										<Icon
											className='w-3.5 h-3.5 shrink-0'
											style={{ color: GOLD }}
										/>
										{feat.text}
									</motion.div>
								)
							})}
						</motion.div>
					</AnimatePresence>

					{/* CTAs */}
					<AnimatePresence mode='wait'>
						<motion.div
							key={`cta-${currentIdx}`}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.35, delay: 0.25 }}
							className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'
						>
							<MagneticButton href='/contact'>
								<div
									className='group relative overflow-hidden px-7 py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center gap-2.5 cursor-pointer transition-all duration-300'
									style={{
										background:
											'linear-gradient(135deg, oklch(0.42 0.27 18), oklch(0.54 0.26 20))',
										color: 'oklch(0.10 0.02 260)',
										boxShadow:
											'0 0 28px oklch(0.47 0.27 18 / 0.35)',
									}}
									onMouseEnter={e => {
										;(
											e.currentTarget as HTMLElement
										).style.boxShadow =
											'0 0 42px oklch(0.47 0.27 18 / 0.55)'
									}}
									onMouseLeave={e => {
										;(
											e.currentTarget as HTMLElement
										).style.boxShadow =
											'0 0 28px oklch(0.47 0.27 18 / 0.35)'
									}}
								>
									<div className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12' />
									<Phone className='w-4 h-4' />
									{current.cta1}
									<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								</div>
							</MagneticButton>

							<MagneticButton href='/services'>
								<div
									className='group px-7 py-3.5 rounded-2xl font-medium text-sm sm:text-base flex items-center gap-2.5 cursor-pointer backdrop-blur-md transition-all duration-300 border'
									style={{
										color: 'oklch(0.80 0.04 18)',
										borderColor:
											'oklch(0.47 0.27 18 / 0.28)',
										background:
											'oklch(0.47 0.27 18 / 0.06)',
									}}
									onMouseEnter={e => {
										const el =
											e.currentTarget as HTMLElement
										el.style.borderColor =
											'oklch(0.47 0.27 18 / 0.52)'
										el.style.background =
											'oklch(0.47 0.27 18 / 0.12)'
										el.style.color = 'oklch(0.90 0.03 18)'
									}}
									onMouseLeave={e => {
										const el =
											e.currentTarget as HTMLElement
										el.style.borderColor =
											'oklch(0.47 0.27 18 / 0.28)'
										el.style.background =
											'oklch(0.47 0.27 18 / 0.06)'
										el.style.color = 'oklch(0.80 0.04 18)'
									}}
								>
									<MessageSquare
										className='w-4 h-4'
										style={{ color: GOLD }}
									/>
									{current.cta2}
								</div>
							</MagneticButton>
						</motion.div>
					</AnimatePresence>

					{/* Carousel dots */}
					<div className='flex justify-center items-center gap-2.5 mt-7'>
						{[0, 1, 2].map(idx => (
							<button
								key={idx}
								onClick={() => setCurrentIdx(idx)}
								className='rounded-full transition-all duration-300'
								style={{
									width:
										currentIdx === idx
											? '2rem'
											: '0.375rem',
									height: '0.375rem',
									background:
										currentIdx === idx
											? GOLD
											: 'oklch(0.62 0.28 18 / 0.22)',
									boxShadow:
										currentIdx === idx
											? '0 0 10px oklch(0.62 0.28 18 / 0.55)'
											: 'none',
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
					className='mt-12 sm:mt-18 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full'
				>
					{stats.map((stat, i) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.92 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6 + i * 0.08 }}
							className='group relative flex flex-col items-center justify-center text-center p-4 sm:p-5 rounded-2xl backdrop-blur-xl overflow-hidden cursor-default transition-all duration-300 border'
							style={{
								borderColor: 'oklch(0.47 0.27 18 / 0.14)',
								background: 'oklch(0.47 0.27 18 / 0.05)',
							}}
							onMouseEnter={e => {
								const el = e.currentTarget as HTMLElement
								el.style.borderColor =
									'oklch(0.47 0.27 18 / 0.35)'
								el.style.background =
									'oklch(0.47 0.27 18 / 0.10)'
							}}
							onMouseLeave={e => {
								const el = e.currentTarget as HTMLElement
								el.style.borderColor =
									'oklch(0.47 0.27 18 / 0.14)'
								el.style.background =
									'oklch(0.47 0.27 18 / 0.05)'
							}}
						>
							<p
								className='text-3xl sm:text-4xl font-bold font-serif mb-1'
								style={{
									color: 'oklch(0.65 0.26 18)',
									textShadow:
										'0 0 18px oklch(0.47 0.27 18 / 0.4)',
								}}
							>
								<AnimatedCounter
									value={stat.value}
									suffix={stat.suffix}
								/>
							</p>
							<p className='text-xs sm:text-sm font-medium tracking-wide text-foreground/45'>
								{stat.label}
							</p>
						</motion.div>
					))}
				</motion.div>

				{/* Scroll cue */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.4 }}
					className='flex flex-col items-center mt-8 gap-1.5'
					style={{ color: 'oklch(0.47 0.27 18 / 0.45)' }}
				>
					<motion.div
						animate={{ y: [0, 5, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						<ChevronDown className='w-4 h-4' />
					</motion.div>
				</motion.div>
			</div>

			{/* ── TICKER TAPE ── */}
			<TickerTape items={tickerItems} />
		</section>
	)
}

export default LegalHero
