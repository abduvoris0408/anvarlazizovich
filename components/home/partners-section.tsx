"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import type { Partner } from "@/lib/types"
import { Handshake } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { SpinnerCustom } from "@/components/ui/spinner"

export function PartnersSection() {
    const [partners, setPartners] = useState<Partner[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const t = useTranslations("partners")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/partners?sort=order&limit=100")
            .then((r) => r.json())
            .then((d) => {
                if (d.data) setPartners(d.data)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (!isLoading && partners.length === 0) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="glass-effect rounded-3xl p-8 text-center max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold text-muted-foreground">{t("title")}</h2>
                        <p className="mt-2 text-muted-foreground">Ma'lumotlar hozircha mavjud emas.</p>
                    </div>
                </div>
            </section>
        )
    }

    if (isLoading) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center h-48">
                        <SpinnerCustom />
                    </div>
                </div>
            </section>
        )
    }


    // Duplicate partners to create seamless loop
    const sliderPartners = [...partners, ...partners, ...partners, ...partners]

    return (
        <section className="py-16 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center">
                    <SectionBadge title="Hamkorlar" icon={Handshake} />
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ishonchli Hamkorlar</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Bizning muvaffaqiyatimiz hamkorlarimiz bilan mustahkam aloqalarga asoslanadi
                    </p>
                </div>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <motion.div
                    className="flex gap-6 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust speed as needed
                    }}
                >
                    {sliderPartners.map((partner, index) => (
                        <div
                            key={`${partner.id}-${index}`}
                            className="bg-card border border-border rounded-2xl p-6 w-64 h-40 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow shrink-0"
                        >
                            <div className="flex-1 flex items-center justify-center w-full mb-3">
                                {partner.logo?.url ? (
                                    <img
                                        src={partner.logo.url}
                                        alt={partner.name}
                                        className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                                        {partner.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <span className="text-sm font-medium text-muted-foreground line-clamp-1">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
