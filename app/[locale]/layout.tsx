import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import ReplainChat from "@/components/shared/replain-chat"

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
    display: "swap",
})

const playfair = Playfair_Display({
    subsets: ["latin", "cyrillic"],
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
})

type Props = {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "meta" })
    const baseUrl = "https://anvarlazizovich.uz"
    return {
        title: { default: t("homeTitle"), template: `%s | Anvar Yurist` },
        description: t("homeDesc"),
        keywords: ["yurist", "mediator", "lawyer", "юрист", "медиатор", "huquqiy yordam", "Toshkent", "O'zbekiston"],
        authors: [{ name: "Burxonjonov Anvarjon Lazizjon o'g'li" }],
        alternates: {
            canonical: locale === "uz" ? baseUrl : `${baseUrl}/${locale}`,
            languages: { uz: baseUrl, ru: `${baseUrl}/ru`, en: `${baseUrl}/en` },
        },
        openGraph: {
            type: "website",
            locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
            url: baseUrl,
            siteName: "Anvar Yurist",
            title: t("homeTitle"),
            description: t("homeDesc"),
        },
        icons: { icon: "/logo11.png", apple: "/logo11.png" },
    }
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params
    if (!routing.locales.includes(locale as "uz" | "ru" | "en")) notFound()
    const messages = await getMessages()
    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geist.variable} ${playfair.variable} font-sans antialiased`}>
                <NextTopLoader color="#c41e3a" showSpinner={false} height={3} />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
                <ReplainChat />
            </body>
        </html>
    )
}
