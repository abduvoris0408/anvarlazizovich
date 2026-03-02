"use client"

import { useState, useEffect } from "react"
import { Link, usePathname } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import { Moon, Sun, Menu, X, Home, User, Briefcase, Scale, Newspaper, BookOpen, Phone } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { LanguageSwitcher } from "./language-switcher"
import { CourthouseLogo } from "./courthouse-logo"

const navKeys = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: User },
  { key: "practice", href: "/practice", icon: Briefcase },
  { key: "mediation", href: "/mediation", icon: Scale },
  { key: "news", href: "/news", icon: Newspaper },
  { key: "blog", href: "/blog", icon: BookOpen },
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
    icon: item.icon,
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isActive = (href: string) => {
    return pathname === href || (pathname.startsWith(href) && href !== "/")
  }

  // Animation variants — fast & smooth
  const navContainerVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  }

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
    },
  }

  const mobileItemVariants: Variants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    exit: { opacity: 0, x: -4, transition: { duration: 0.1 } },
  }

  return (
    <>
      {/* ─── Desktop Header ─── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navContainerVariants}
        className={`fixed top-4 left-0 right-0 z-[9999] mx-auto hidden w-full md:flex flex-row items-center justify-between rounded-2xl transition-all duration-500 ease-in-out backdrop-blur-2xl bg-background/25 border border-border/40 ${isScrolled
          ? "max-w-5xl px-5 py-2 glass-navbar-scrolled shadow-xl shadow-black/5 dark:shadow-black/20"
          : "max-w-[92%] px-7 py-3"
          }`}
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Logo */}
        <Link className="z-50 flex items-center gap-3 flex-shrink-0 group" href="/">
          <motion.div
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <CourthouseLogo className="h-14 w-14 text-primary drop-shadow-sm" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-foreground text-lg leading-tight tracking-wide uppercase group-hover:text-primary transition-colors duration-300">Anvar</span>
            <span className="text-[10px] font-semibold text-primary/80 leading-none tracking-widest uppercase">Yurist · Mediator</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-0.5">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link-glow relative px-3 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap rounded-lg ${isActive(item.href)
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
              {/* Gold underline indicator for active */}
              {isActive(item.href) && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
                  }}
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
            <motion.button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg hover:bg-accent/80 transition-colors overflow-hidden"
              aria-label={tHeader("toggleTheme")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="h-4.5 w-4.5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="h-4.5 w-4.5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          <Link
            href="/contact"
            className="btn-shimmer rounded-lg font-semibold bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 text-sm transition-all shadow-md shadow-primary/15"
          >
            {tHeader("contactBtn")}
          </Link>
        </div>
      </motion.header>

      {/* ─── Mobile Header ─── */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-3 left-3 right-3 z-[9999] flex flex-row items-center justify-between rounded-2xl backdrop-blur-2xl bg-background/25 border border-border/40 shadow-lg md:hidden px-4 py-2.5 transition-all duration-300 ${isScrolled ? "glass-navbar-scrolled" : ""
          }`}
      >
        <Link className="flex items-center gap-3 group" href="/">
          <CourthouseLogo className="h-12 w-12 text-primary" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-foreground text-base leading-tight tracking-wide uppercase">Anvar</span>
            <span className="text-[9px] font-semibold text-primary/80 leading-none tracking-widest uppercase">Yurist</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />

          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/80 transition-colors"
              aria-label={tHeader("toggleTheme")}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun-m"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4.5 w-4.5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon-m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4.5 w-4.5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/50 border border-border transition-colors hover:bg-accent"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4.5 w-4.5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4.5 w-4.5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-18 left-3 right-3 backdrop-blur-2xl bg-background/95 rounded-2xl shadow-2xl p-5 border border-border/50"
            >
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.href} variants={mobileItemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 text-left px-4 py-3 text-base font-medium transition-all duration-200 rounded-xl ${isActive(item.href)
                          ? "text-primary bg-primary/8 border border-primary/15"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          }`}
                      >
                        <Icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive(item.href) ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{item.name}</span>
                        {isActive(item.href) && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Divider + CTA */}
                <motion.div variants={mobileItemVariants} className="border-t border-border/50 pt-3 mt-3 space-y-2">
                  {/* Quick phone link */}
                  <a
                    href="tel:+998901234567"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:bg-accent/50 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="h-4.5 w-4.5 text-primary flex-shrink-0" />
                    <span>{t("contact")}</span>
                  </a>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-shimmer block px-4 py-3.5 text-base font-bold text-center bg-primary text-primary-foreground rounded-xl shadow-md shadow-primary/15"
                  >
                    {tHeader("requestHelp")}
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
