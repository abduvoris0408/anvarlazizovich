"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Marquee } from "@/components/magicui/marquee"
import { Handshake } from "lucide-react"
import { useTranslations } from "next-intl"

interface Partner {
    id: string
    name: string
    logo?: { url: string; publicId?: string }
    website?: string
}

export function PartnersSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [partners, setPartners] = useState<Partner[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const t = useTranslations("partners")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/partners")
            .then((r) => r.json())
            .then((d) => d.data && setPartners(d.data))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <section className="py-12 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-12">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-10 w-28 bg-muted/30 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (partners.length === 0) return null

    return (
        <section className="py-10 sm:py-12 border-y border-border/50 bg-muted/20">
            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center justify-center gap-2 mb-6"
                >
                    <Handshake className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {t("trustedBy")}
                    </p>
                </motion.div>

                <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <Marquee pauseOnHover className="[--duration:35s]">
                        {partners.map((partner) => (
                            <div
                                key={partner.id}
                                className="flex items-center justify-center mx-8 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                            >
                                {partner.logo?.url ? (
                                    <img
                                        src={partner.logo.url}
                                        alt={partner.name}
                                        className="h-10 sm:h-12 w-auto object-contain max-w-[140px]"
                                    />
                                ) : (
                                    <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap px-4 py-2 rounded-lg border border-border">
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </Marquee>
                </div>
            </motion.div>
        </section>
    )
}
