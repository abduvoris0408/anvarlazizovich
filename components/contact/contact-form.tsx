"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, Scale, Shield } from "lucide-react"
import { useTranslations } from "next-intl"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const t = useTranslations("contact")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || undefined,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setIsSubmitted(true)
      } else {
        setError(t("errorGeneral"))
      }
    } catch {
      setError(t("errorNetwork"))
    }

    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">{t("successTitle")}</h3>
          <p className="text-muted-foreground">{t("successDesc")}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-2xl border border-border bg-card p-8">
        {/* Header with icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("formTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("formSubtitle")}</p>
          </div>
        </div>

        {/* Encouragement text */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">{t("privacyTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("privacyDesc")}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName" className="text-foreground font-medium">
              {t("fullName")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder={t("fullName")}
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-foreground font-medium">
              {t("phone")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+998 90 123 45 67"
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-foreground font-medium">
              {t("email")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject" className="text-foreground font-medium">
              {t("subject")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder={t("subjectPlaceholder")}
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-foreground font-medium">
              {t("message")} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder={t("messagePlaceholder")}
              rows={6}
              className="mt-2 bg-background border-border focus:border-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t("submitting")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {t("submit")}
              </span>
            )}
          </Button>
        </form>
      </div>
    </motion.div>
  )
}
