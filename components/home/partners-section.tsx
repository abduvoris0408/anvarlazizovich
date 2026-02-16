"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import type { Partner } from "@/lib/types"



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


    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="glass-effect rounded-[2rem] p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("title")}</h2>
                        <p className="text-muted-foreground mt-2">{t("subtitle")}</p>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
                        {partners.map((partner, index) => (
                            <motion.a
                                key={partner.id}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                                title={partner.name}
                            >
                                {partner.logo?.url ? (
                                    <img
                                        src={partner.logo.url}
                                        alt={partner.name}
                                        className="h-12 md:h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <span className="text-lg font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                                        {partner.name}
                                    </span>
                                )}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
