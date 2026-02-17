"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Achievement } from "@/lib/types"
import { Award, Calendar, Building } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"
import { formatDate } from "@/lib/utils"

export function Certificates() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    const [certificates, setCertificates] = useState<Achievement[]>([])
    const [loading, setLoading] = useState(true)

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
        <section className="py-16">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-12"
                    >
                        <SectionBadge title="Yutuqlar" icon={Award} />
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sertifikat va Yutuqlar</h2>
                        <p className="text-muted-foreground">Professional faoliyat davomida erishilgan yutuqlar</p>
                    </motion.div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {certificates.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all"
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
                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/30">
                                                <Award className="h-16 w-16 mb-2 opacity-50" />
                                                <span className="text-sm font-medium">Sertifikat</span>
                                            </div>
                                        )}

                                        {/* Type Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-md border border-border shadow-sm text-foreground uppercase tracking-wider">
                                                {cert.type || "Certificate"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {cert.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                            {cert.issuer && (
                                                <div className="flex items-center gap-1.5">
                                                    <Building className="h-3.5 w-3.5" />
                                                    <span>{cert.issuer}</span>
                                                </div>
                                            )}
                                            {cert.date && (
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    <span>{formatDate(cert.date)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {cert.description && (
                                            <p className="text-muted-foreground text-sm line-clamp-3">
                                                {cert.description}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    )
}
