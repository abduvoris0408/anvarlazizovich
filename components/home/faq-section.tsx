"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { Plus, Minus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { FAQ } from "@/lib/types"

export function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [openId, setOpenId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const t = useTranslations("faq")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/faqs?sort=order&limit=100")
            .then((r) => r.json())
            .then((d) => {
                if (d.data) setFaqs(d.data)
            })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Skeleton className="h-10 w-48 rounded-lg mx-auto mb-4" />
                        <Skeleton className="h-6 w-64 rounded-lg mx-auto" />
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-16 rounded-2xl" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (faqs.length === 0) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="glass-card rounded-3xl p-8 text-center max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold text-muted-foreground">{t("title")}</h2>
                        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (

                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                className="flex items-center justify-between w-full p-6 text-left hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors"
                            >
                                <span className="font-semibold text-foreground text-lg">{faq.question}</span>
                                {openId === faq.id ? (
                                    <Minus className="h-5 w-5 text-primary flex-shrink-0 ml-4" />
                                ) : (
                                    <Plus className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-muted-foreground text-leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
