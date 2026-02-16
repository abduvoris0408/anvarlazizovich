"use client"

import type React from "react"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, Scale, Shield } from "lucide-react"

export function ContactForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

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
        setError("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.")
      }
    } catch {
      setError("Tarmoq xatoligi. Iltimos internetni tekshiring.")
    }

    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Murojaatingiz qabul qilindi!</h3>
          <p className="text-muted-foreground">Tez orada siz bilan bog&apos;lanamiz. Odatda 24 soat ichida javob beramiz.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl border border-border bg-card p-8">
        {/* Header with icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Huquqiy yordam so&apos;rash</h2>
            <p className="text-sm text-muted-foreground">Quyidagi formani to&apos;ldiring</p>
          </div>
        </div>

        {/* Encouragement text */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 mb-8">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Ma&apos;lumotlaringiz maxfiy saqlanadi</p>
            <p className="text-sm text-muted-foreground">
              Huquqiy muammolaringizni biz bilan baham ko&apos;ring. Barcha muloqotlar advokat-mijoz maxfiyligi bilan
              himoyalangan.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Label htmlFor="fullName" className="text-foreground font-medium">
              To&apos;liq ism <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Ismingizni kiriting"
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Label htmlFor="phone" className="text-foreground font-medium">
              Telefon raqam <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+998 90 123 45 67"
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Label htmlFor="email" className="text-foreground font-medium">
              Email manzil
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </motion.div>

          {/* Subject */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="subject" className="text-foreground font-medium">
              Mavzu <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="Masalan: Shartnoma ko'rib chiqish"
              className="mt-2 bg-background border-border focus:border-primary h-12"
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Label htmlFor="message" className="text-foreground font-medium">
              Xabaringiz <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Huquqiy masalangiz yoki savolingizni batafsil tavsiflang..."
              rows={6}
              className="mt-2 bg-background border-border focus:border-primary resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
                  Yuborilmoqda...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Yuborish
                </span>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}
