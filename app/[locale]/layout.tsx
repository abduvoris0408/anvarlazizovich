import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/shared/structured-data"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

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
    const isDefaultLocale = locale === "uz"

    return {
        title: {
            default: t("homeTitle"),
            template: `%s | Burxonov Anvar Lazizovich`,
        },
        description: t("homeDesc"),
        keywords: [
            "advokat",
            "yurist",
            "mediator",
            "lawyer",
            "адвокат",
            "huquqiy yordam",
            "Toshkent",
            "O'zbekiston",
            "legal services",
            "медиатор",
            "юридические услуги",
            "семейное право",
            "уголовное право",
            "гражданское право",
            "labor law",
            "trademarks",
        ],
        authors: [{ name: "Burxonov Anvar Lazizovich" }],
        creator: "Burxonov Anvar Lazizovich",
        publisher: "Burxonov Anvar Lazizovich",
        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
        alternates: {
            canonical: isDefaultLocale ? baseUrl : `${baseUrl}/${locale}`,
            languages: {
                uz: baseUrl,
                "uz-UZ": baseUrl,
                ru: `${baseUrl}/ru`,
                "ru-RU": `${baseUrl}/ru`,
                en: `${baseUrl}/en`,
                "en-US": `${baseUrl}/en`,
            },
        },
        openGraph: {
            type: "website",
            locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
            url: isDefaultLocale ? baseUrl : `${baseUrl}/${locale}`,
            siteName: "Burxonov Advokat",
            title: t("homeTitle"),
            description: t("homeDesc"),
            emails: ["info@burxonov.uz"],
            phoneNumbers: ["+998901234567"],
            countryName: "Uzbekistan",
        },
        twitter: {
            card: "summary_large_image",
            title: t("homeTitle"),
            description: t("homeDesc"),
            creator: "@burxonov_advokat",
        },
        verification: {
            google: "google-site-verification-code",
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
            <head>
                <StructuredData />
            </head>
            <body className={inter.className}>
                <NextTopLoader color="#e78a53" showSpinner={false} height={3} />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
