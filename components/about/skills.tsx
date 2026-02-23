"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import type { Skill } from "@/lib/types"
import { Cpu } from "lucide-react"

export function Skills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const t = useTranslations("about")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/skills?sort=order&limit=100")
            .then((r) => r.json())
            .then((d) => {
                if (d.data) setSkills(d.data)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (!isLoading && skills.length === 0) return null

    if (isLoading) {
        return (
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto border border-border rounded-2xl p-8 md:p-12">
                        <div className="h-8 w-48 bg-muted rounded-md mx-auto mb-10 animate-pulse" />
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between">
                                        <div className="h-5 w-24 bg-muted rounded animate-pulse" />
                                        <div className="h-5 w-8 bg-muted rounded animate-pulse" />
                                    </div>
                                    <div className="h-2.5 bg-muted rounded-full animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto border border-border rounded-2xl p-8 md:p-12 bg-card"
                >
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                            <Cpu className="h-3.5 w-3.5" />
                            {t("skillsBadge")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif">
                            {t("skillsTitle")}
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mx-auto w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
                        />
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                            >
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold text-foreground flex items-center gap-2">
                                        {skill.icon && <span className="text-lg">{skill.icon}</span>}
                                        {skill.name}
                                    </span>
                                    <span className="text-sm text-primary font-medium">{skill.percentage}%</span>
                                </div>
                                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full relative"
                                    >
                                        <motion.div
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-white/20 rounded-full"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
