"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { About } from "@/lib/types"
import { Phone, Mail, Send, MapPin, Clock } from "lucide-react"

export function ContactInfo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [about, setAbout] = useState<About | null>(null)

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  const phone = about?.phone || "+998 90 123 45 67"
  const email = about?.email || "info@burxonov.uz"
  const telegram = about?.telegram || "@burxonov_advokat"
  const address = about?.address || "Toshkent shahri"

  const contactItems = [
    {
      icon: Phone,
      label: "Telefon",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Send,
      label: "Telegram",
      value: telegram,
      href: `https://t.me/${telegram.replace("@", "")}`,
    },
    {
      icon: MapPin,
      label: "Manzil",
      value: address,
      href: null,
    },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Contact Info Card */}
      <div className="rounded-2xl border border-border bg-card p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Bog&apos;lanish ma&apos;lumotlari</h2>

        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-start gap-4 p-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Working Hours Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Ish vaqti</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dushanba - Juma</span>
            <span className="text-foreground font-medium">09:00 - 18:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shanba</span>
            <span className="text-foreground font-medium">10:00 - 15:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Yakshanba</span>
            <span className="text-foreground font-medium">Dam olish</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">Shoshilinch holatlarda istalgan vaqtda telefon orqali murojaat qilishingiz mumkin.</p>
      </motion.div>
    </motion.div>
  )
}
