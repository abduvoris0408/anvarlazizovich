
import { usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const locales = [
    { code: "uz", label: "O'zbek", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "en", label: "English", flag: "🇬🇧" },
]

export function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const dropdownRef = useRef<HTMLDivElement>(null)

    const current = locales.find((l) => l.code === locale) || locales[0]

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const switchLocale = (newLocale: string) => {
        setIsOpen(false)
        router.replace(pathname, { locale: newLocale })
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-full hover:bg-accent transition-colors text-sm font-medium"
                aria-label="Switch language"
            >
                <Globe className="h-4 w-4 text-foreground" />
                <span className="text-foreground text-xs uppercase tracking-wide">{current.code}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden z-[9999]"
                    >
                        {locales.map((l) => (
                            <button
                                key={l.code}
                                onClick={() => switchLocale(l.code)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${locale === l.code
                                    ? "text-primary font-semibold bg-primary/5"
                                    : "text-foreground"
                                    }`}
                            >
                                <span className="text-lg">{l.flag}</span>
                                <span>{l.label}</span>
                                {locale === l.code && (
                                    <span className="ml-auto text-primary">✓</span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
