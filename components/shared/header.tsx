"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigation } from "@/data/site"
import { Scale, Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      {/* Desktop Header - Fixed nav layout, spacing, and theme colors */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full md:flex flex-row items-center justify-between rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-md border border-border shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-4" : "max-w-5xl px-6"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {/* Logo */}
        <Link className="z-50 flex items-center justify-center gap-2 flex-shrink-0" href="/">
          <Scale className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground text-sm">Burxonov</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="relative z-20">{item.name}</span>
              {pathname === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent dark:hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
          )}

          <Link
            href="/contact"
            className="rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm transition-colors"
          >
            Contact
          </Link>
        </div>
      </header>

      {/* Mobile Header - Fixed theme colors and layout */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-md border border-border shadow-lg md:hidden px-4 py-3">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Scale className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground text-sm">Burxonov</span>
        </Link>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/50 border border-border transition-colors hover:bg-accent"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Fixed theme colors */}
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
              className="absolute top-20 left-4 right-4 bg-background border border-border rounded-2xl shadow-2xl p-6"
            >
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left px-4 py-3 text-lg font-medium transition-colors rounded-lg hover:bg-accent ${
                      pathname === item.href ? "text-foreground bg-primary/10" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-border pt-4 mt-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-bold text-center bg-primary text-primary-foreground rounded-lg"
                  >
                    Request Legal Help
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
