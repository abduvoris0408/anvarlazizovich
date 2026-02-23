"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

interface FAQ {
    id: string
    question: string
    answer: string
    category?: {
        id: string
        name: string
        slug: string
        color: string
    }
}

export function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const t = useTranslations("faq")

    useEffect(() => {
        fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/faqs")
            .then((r) => r.json())
            .then((d) => d.data && setFaqs(d.data))
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <section className="py-16 sm:py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="h-10 w-72 bg-muted/40 rounded-lg mx-auto animate-pulse mb-3" />
                            <div className="h-5 w-80 max-w-full bg-muted/20 rounded mx-auto animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-5 rounded-xl border border-border bg-card animate-pulse">
                                    <div className="h-5 w-3/4 bg-muted/30 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (faqs.length === 0) return null

    return (
        <section className="py-16 sm:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/15 mb-4">
                            <HelpCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                            {t("title")}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t("subtitle")}
                        </p>
                    </motion.div>

                    {/* FAQ Items */}
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <button
                                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${expandedId === faq.id
                                        ? "border-primary/30 bg-card shadow-sm"
                                        : "border-border bg-card hover:border-primary/20"
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
                                        <ChevronDown
                                            className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${expandedId === faq.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </div>
                                    {expandedId === faq.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-3 pt-3 border-t border-border/50"
                                        >
                                            <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
