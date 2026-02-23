"use client"

import { useState, useEffect, useRef } from "react"
import { Link, usePathname } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSwitcher } from "./language-switcher"
import { CourthouseLogo } from "./courthouse-logo"

const navKeys = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "practice", href: "/practice" },
  { key: "mediation", href: "/mediation" },
  { key: "news", href: "/news" },
  { key: "blog", href: "/blog" },
] as const

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("nav")
  const tHeader = useTranslations("header")
  const { theme, setTheme } = useTheme()

  const navigation = navKeys.map((item) => ({
    name: t(item.key),
    href: item.href,
  }))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isActive = (href: string) => {
    return pathname === href || (pathname.startsWith(href) && href !== "/")
  }

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full md:flex flex-row items-center justify-between rounded-2xl transition-all duration-500 ease-in-out ${isScrolled
          ? "max-w-5xl px-5 py-2 glass-navbar shadow-xl shadow-black/5 dark:shadow-black/20"
          : "max-w-[92%] px-7 py-3 bg-transparent"
          }`}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Logo */}
        <Link className="z-50 flex items-center gap-2.5 flex-shrink-0 group" href="/">
          <CourthouseLogo className="h-8 w-8 text-primary group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-foreground text-base leading-tight tracking-wide uppercase">Anvar</span>
            <span className="text-[10px] text-muted-foreground leading-none tracking-wider uppercase">yurist</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-0.5">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <span className="relative z-20">{item.name}</span>
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/8 dark:bg-primary/12 rounded-lg border border-primary/15"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <LanguageSwitcher />

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/80 transition-colors"
              aria-label={tHeader("toggleTheme")}
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-foreground" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-foreground" />
              )}
            </button>
          )}

          <Link
            href="/contact"
            className="rounded-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 text-sm transition-all shadow-md shadow-primary/15"
          >
            {tHeader("contactBtn")}
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-3 z-[9999] mx-3 flex w-auto flex-row items-center justify-between rounded-2xl glass-navbar shadow-lg md:hidden px-4 py-2.5">
        <Link className="flex items-center gap-2 group" href="/">
          <CourthouseLogo className="h-7 w-7 text-primary" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-foreground text-sm leading-tight tracking-wide uppercase">Anvar</span>
            <span className="text-[8px] text-muted-foreground leading-none tracking-wider uppercase">yurist</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />

          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/80 transition-colors"
              aria-label={tHeader("toggleTheme")}
            >
              {theme === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-foreground" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-foreground" />
              )}
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/50 border border-border transition-colors hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4.5 w-4.5 text-foreground" />
            ) : (
              <Menu className="h-4.5 w-4.5 text-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-18 left-3 right-3 glass-navbar rounded-2xl shadow-2xl p-5"
            >
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left px-4 py-3 text-base font-medium transition-colors rounded-xl ${isActive(item.href)
                      ? "text-primary bg-primary/8 border border-primary/15"
                      : "text-muted-foreground hover:bg-accent/50"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t border-border/50 pt-3 mt-3">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-bold text-center bg-primary text-primary-foreground rounded-xl shadow-md shadow-primary/15"
                  >
                    {tHeader("requestHelp")}
                  </Link>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
