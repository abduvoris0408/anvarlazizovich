"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import type { Achievement } from "@/lib/types"
import { Award, Calendar, Building } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function Certificates() {
    const [certificates, setCertificates] = useState<Achievement[]>([])
    const [loading, setLoading] = useState(true)
    const t = useTranslations("about")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/achievements?limit=100")
            .then((r) => r.json())
            .then((d) => {
                if (d.data) setCertificates(d.data)
            })
            .catch((e) => console.error(e))
            .finally(() => setLoading(false))
    }, [])

    if (!loading && certificates.length === 0) return null

    return (
        <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-14"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                            <Award className="h-3.5 w-3.5" />
                            {t("certificatesBadge")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                            {t("certificatesTitle")}
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
                        />
                        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
                            {t("certificatesSubtitle")}
                        </p>
                    </motion.div>

                    {/* Loading skeleton */}
                    {loading ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {certificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                                    whileHover={{ y: -4 }}
                                    className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Image or Fallback */}
                                    <div className="h-48 overflow-hidden bg-muted relative">
                                        {cert.image?.url ? (
                                            <img
                                                src={cert.image.url}
                                                alt={cert.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-primary/5">
                                                <Award className="h-12 w-12 mb-2 text-primary/30" />
                                            </div>
                                        )}

                                        {/* Type Badge */}
                                        {cert.type && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md border border-border shadow-sm text-foreground uppercase tracking-wider">
                                                    {cert.type}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 font-serif">
                                            {cert.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                            {cert.issuer && (
                                                <div className="flex items-center gap-1.5">
                                                    <Building className="h-3.5 w-3.5 text-primary/60" />
                                                    <span>{cert.issuer}</span>
                                                </div>
                                            )}
                                            {cert.date && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5 text-primary/60" />
                                                    <span>{formatDate(cert.date)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {cert.description && (
                                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                                                {cert.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
