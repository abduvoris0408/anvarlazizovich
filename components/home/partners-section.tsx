'use client'

import { Marquee } from '@/components/magicui/marquee'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Handshake } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

interface Partner {
	id: string
	name: string
	logo?: { url: string }
	url?: string
	website?: string
	isActive?: boolean
}

const C = 'oklch(0.47 0.27 18)'

export function PartnersSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })
	const [partners, setPartners] = useState<Partner[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const t = useTranslations('partners')

	useEffect(() => {
		fetch('https://portfolio-backend-rh0y.onrender.com/api/v1/partners')
			.then(r => {
				if (!r.ok) throw new Error(`HTTP ${r.status}`)
				return r.json()
			})
			.then(d => {
				console.log('Partners API response:', d)
				if (d.data && Array.isArray(d.data)) {
					const active = d.data.filter(
						(p: Partner) => p.isActive !== false,
					)
					console.log('Active partners:', active)
					setPartners(active)
				} else {
					setError('Unexpected data shape')
				}
			})
			.catch(err => {
				console.error('Partners fetch error:', err)
				setError(err.message)
			})
			.finally(() => setIsLoading(false))
	}, [])

	if (isLoading) {
		return (
			<section className='py-12 border-y border-border/40'>
				<p className='text-center text-muted-foreground text-sm'>
					Partners yuklanmoqda...
				</p>
			</section>
		)
	}

	if (error) {
		return (
			<section className='py-12 border-y border-border/40'>
				<p className='text-center text-red-500 text-sm'>
					Xato: {error}
				</p>
			</section>
		)
	}

	if (partners.length === 0) {
		return (
			<section className='py-12 border-y border-border/40'>
				<p className='text-center text-muted-foreground text-sm'>
					Partners topilmadi (0 ta)
				</p>
			</section>
		)
	}

	const minCount = 10
	const repeatCount = Math.ceil(minCount / partners.length)
	const items = Array.from({ length: repeatCount }, () => partners).flat()

	return (
		<section className='py-12 sm:py-16 border-y border-border/40 relative overflow-hidden'>
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 80% 100% at 50% 0%, oklch(0.47 0.27 18 / 0.03), transparent 70%)',
				}}
			/>

			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.5 }}
				className='container mx-auto px-4 relative z-10'
			>
				<div className='flex flex-col items-center mb-10 gap-2'>
					<span
						className='inline-flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-bold tracking-widest uppercase'
						style={{
							color: C,
							borderColor: 'oklch(0.47 0.27 18 / 0.25)',
							background: 'oklch(0.47 0.27 18 / 0.06)',
						}}
					>
						<Handshake className='h-4 w-4' />
						{t('title')}
					</span>
					<p className='text-sm text-muted-foreground'>
						{t('subtitle')}
					</p>
				</div>

				<div className='relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
					<Marquee pauseOnHover className='[--duration:35s]'>
						{items.map((partner, idx) => (
							<a
								key={`${partner.id}-${idx}`}
								href={partner.url || partner.website || '#'}
								target='_blank'
								rel='noopener noreferrer'
								className='flex items-center justify-center mx-8 group'
								title={partner.name}
							>
								{partner.logo?.url ? (
									<img
										src={partner.logo.url}
										alt={partner.name}
										className='h-12 sm:h-14 w-auto object-contain max-w-[140px] grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300'
									/>
								) : (
									<span className='flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold text-muted-foreground group-hover:text-foreground group-hover:border-primary/30 transition-all duration-300 whitespace-nowrap border-border bg-card'>
										{partner.name}
										<ExternalLink className='w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity' />
									</span>
								)}
							</a>
						))}
					</Marquee>
				</div>

				<div
					className='mt-10 h-px w-32 mx-auto'
					style={{
						background: `linear-gradient(90deg, transparent, ${C}, transparent)`,
					}}
				/>
			</motion.div>
		</section>
	)
}
