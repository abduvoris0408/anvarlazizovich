import React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SectionBadgeProps {
    title: string
    className?: string
    icon?: LucideIcon
}

export function SectionBadge({ title, className, icon: Icon }: SectionBadgeProps) {
    return (
        <div className={cn("flex justify-center mb-2", className)}>
            <div className="group relative z-[60] mx-auto rounded-full border border-primary/20 bg-primary/5 px-6 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-100 md:text-sm cursor-default flex items-center gap-2">
                <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4 opacity-70"></div>
                <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent shadow-2xl transition-all duration-500 group-hover:h-px opacity-70"></div>
                {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
                <span className="relative text-foreground bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
                    {title}
                </span>
            </div>
        </div>
    )
}
