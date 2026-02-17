"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import type { Skill } from "@/lib/types"
import { Cpu } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"


export function Skills() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const t = useTranslations("skills")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/skills?sort=order&limit=100")
            .then((r) => r.json())
            .then((d) => {
                if (d.data) setSkills(d.data)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (!isLoading && skills.length === 0) {
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
                    <div className="glass-effect rounded-[2rem] p-8 md:p-12 max-w-4xl mx-auto">
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
        <section className="py-16">
            <div className="container mx-auto px-4">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-effect rounded-[2rem] p-8 md:p-12 max-w-4xl mx-auto"
                >
                    <SectionBadge title="Ko'nikmalar" icon={Cpu} className="mb-8" />
                    <h2 className="text-3xl font-bold text-foreground mb-10 text-center">{t("title")}</h2>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold text-foreground flex items-center gap-2">
                                        {skill.icon && <span className="text-xl">{skill.icon}</span>}
                                        {skill.name}
                                    </span>
                                    <span className="text-sm text-primary font-medium">{skill.percentage}%</span>
                                </div>
                                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-primary rounded-full relative"
                                    >
                                        <div className="absolute inset-0 bg-white/20" />
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
