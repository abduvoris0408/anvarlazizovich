'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbNavProps {
  items?: Array<{
    label: string
    href?: string
  }>
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('nav')

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname, t)

  return (
    <div className="border-b border-border bg-muted/30 dark:bg-muted/20">
      <div className="container mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-foreground">
                  {t('home')}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {breadcrumbItems.map((item, index) => (
              <div key={`breadcrumb-${index}`} className="flex items-center gap-1.5">
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href} className="hover:text-foreground">
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}

function generateBreadcrumbs(pathname: string, t: any) {
  const segments = pathname.split('/').filter(Boolean)

  // Remove locale from segments if present
  const filteredSegments =
    segments.length > 0 &&
    ['uz', 'ru', 'en'].includes(segments[0])
      ? segments.slice(1)
      : segments

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const href = '/' + filteredSegments.slice(0, index + 1).join('/')
    const label = capitalize(segment)

    // Try to get translated label
    const translationKey = segment
    try {
      const translated = t(translationKey)
      if (translated && translated !== translationKey) {
        return { label: translated, href }
      }
    } catch {
      // Fall through to default
    }

    return { label, href }
  })

  return breadcrumbs
}

function capitalize(str: string) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
