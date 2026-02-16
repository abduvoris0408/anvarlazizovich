"use client"


import { Link, usePathname } from "@/i18n/routing"
import { Scale, Phone, Mail, Send } from "lucide-react"
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


  const navigation = navKeys.map((item) => ({
    name: tNav(item.key),
    href: item.href,
  }))

  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}


            <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <Link href="/" className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                <Scale className="h-6 w-6 text-primary" />
                <span className="font-bold text-foreground text-lg">Burxonov</span>
              </Link>
              <p className="text-sm text-muted-foreground">{t("desc")}</p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="font-semibold text-foreground mb-4">{t("pages")}</h3>
              <ul className="space-y-3 w-full">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="font-semibold text-foreground mb-4">{t("contactTitle")}</h3>
              <ul className="space-y-3 w-full">
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors justify-center sm:justify-start"
                  >
                    <Phone className="h-4 w-4" />
                    {phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors justify-center sm:justify-start"
                  >
                    <Mail className="h-4 w-4" />
                    {email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://t.me/${telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors justify-center sm:justify-start"
                  >
                    <Send className="h-4 w-4" />
                    {telegram}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="font-semibold text-foreground mb-4">{t("legal")}</h3>
              <ul className="space-y-3 w-full">

                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("terms")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Burxonov Anvar Lazizovich. {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
