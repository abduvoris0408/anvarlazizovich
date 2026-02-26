"use client"

import { Link } from "@/i18n/routing"
import { Phone, Mail, Send, MapPin, ArrowUpRight } from "lucide-react"
import { CourthouseLogo } from "./courthouse-logo"
import { useLocale, useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import type { About } from "@/lib/types"

const navKeys = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "practice", href: "/practice" },
  { key: "mediation", href: "/mediation" },
  { key: "news", href: "/news" },
  { key: "blog", href: "/blog" },
] as const

export function Footer() {
  const locale = useLocale()
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")

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

  const navigation = navKeys.map((item) => ({
    name: tNav(item.key),
    href: item.href,
  }))

  return (
    <footer className="border-t border-border bg-card/50">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <CourthouseLogo className="h-11 w-11 text-primary" />
                <div className="flex flex-col text-left">
                  <span className="font-serif font-bold text-foreground text-lg leading-tight tracking-wide uppercase">Anvar</span>
                  <span className="text-[11px] text-muted-foreground leading-none tracking-wider uppercase">yurist</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("desc")}</p>
            </div>

            {/* Navigation */}
            <div className="text-center sm:text-left items-center sm:items-start flex flex-col">
              <h3 className="font-serif font-semibold text-foreground mb-5 text-base">{t("pages")}</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left items-center sm:items-start flex flex-col">
              <h3 className="font-serif font-semibold text-foreground mb-5 text-base">{t("contactTitle")}</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-primary/8 shrink-0">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-primary/8 shrink-0">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://t.me/${telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-primary/8 shrink-0">
                      <Send className="h-3.5 w-3.5 text-primary" />
                    </div>
                    Telegram
                  </a>
                </li>
              </ul>
            </div>

            {/* Address & Legal */}
            <div className="text-center sm:text-left items-center sm:items-start flex flex-col">
              <h3 className="font-serif font-semibold text-foreground mb-5 text-base">Manzil</h3>
              <div className="flex items-start justify-center sm:justify-start gap-2.5 text-sm text-muted-foreground mb-6">
                <div className="p-1.5 rounded-md bg-primary/8 shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                <span>{address}</span>
              </div>

              <h3 className="font-serif font-semibold text-foreground mb-3 text-base">{t("legal")}</h3>
              <ul className="space-y-2 flex flex-col items-center sm:items-start">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("terms")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Gold divider */}
          <div className="divider-gold mb-6" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Burxonov Anvar Lazizovich.<br className="sm:hidden" /> {t("copyright")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://t.me/${telegram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/8 text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="p-2 rounded-lg bg-primary/8 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-lg bg-primary/8 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
