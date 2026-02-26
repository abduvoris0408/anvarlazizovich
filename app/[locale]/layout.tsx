import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import ReplainChat from "@/components/shared/replain-chat"

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
})

const playfair = Playfair_Display({
    subsets: ["latin", "cyrillic"],
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700", "800", "900"],
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

    const baseUrl = "https://burxonov-law.uz"

    return {
        title: {
            default: t("homeTitle"),
            template: `%s | Burxonov`,
        },
        description: t("homeDesc"),
        keywords: [
            "advokat", "yurist", "mediator", "lawyer", "адвокат",
            "huquqiy yordam", "Toshkent", "O'zbekiston",
        ],
        authors: [{ name: "Burxonov Anvar Lazizovich" }],
        alternates: {
            canonical: locale === "uz" ? baseUrl : `${baseUrl}/${locale}`,
            languages: {
                uz: baseUrl,
                ru: `${baseUrl}/ru`,
                en: `${baseUrl}/en`,
            },
        },
        openGraph: {
            type: "website",
            locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
            url: baseUrl,
            siteName: "Burxonov Advokat",
            title: t("homeTitle"),
            description: t("homeDesc"),
        },
        twitter: {
            card: "summary_large_image",
            title: t("homeTitle"),
            description: t("homeDesc"),
        },
        icons: {
            icon: "/logo11.png",
            apple: "/logo11.png",
        },
    }
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params

    // Validate locale
    if (!routing.locales.includes(locale as "uz" | "ru" | "en")) {
        notFound()
    }

    const messages = await getMessages()

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${geistMono.variable} ${playfair.variable} font-sans`}>
                <NextTopLoader color="#C9A84C" showSpinner={false} height={3} />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
                <ReplainChat />
            </body>
        </html>
    )
}
