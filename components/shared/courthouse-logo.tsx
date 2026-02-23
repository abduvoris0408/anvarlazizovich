"use client"

export function CourthouseLogo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Pediment / Triangle top */}
            <path
                d="M24 4L6 18H42L24 4Z"
                fill="currentColor"
                opacity="0.9"
            />
            {/* Small circle detail in pediment */}
            <circle cx="24" cy="13" r="2.5" fill="currentColor" opacity="0.3" />

            {/* Architrave / horizontal beam */}
            <rect x="5" y="18" width="38" height="3" rx="0.5" fill="currentColor" />

            {/* Pillars */}
            <rect x="9" y="21" width="3.5" height="18" rx="0.5" fill="currentColor" opacity="0.85" />
            <rect x="17" y="21" width="3.5" height="18" rx="0.5" fill="currentColor" opacity="0.85" />
            <rect x="27.5" y="21" width="3.5" height="18" rx="0.5" fill="currentColor" opacity="0.85" />
            <rect x="35.5" y="21" width="3.5" height="18" rx="0.5" fill="currentColor" opacity="0.85" />

            {/* Base / Steps */}
            <rect x="4" y="39" width="40" height="2.5" rx="0.5" fill="currentColor" />
            <rect x="2" y="41.5" width="44" height="2.5" rx="0.5" fill="currentColor" opacity="0.7" />

            {/* Pillar caps (capitals) */}
            <rect x="8" y="20.5" width="5.5" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
            <rect x="16" y="20.5" width="5.5" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
            <rect x="26.5" y="20.5" width="5.5" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
            <rect x="34.5" y="20.5" width="5.5" height="1.5" rx="0.5" fill="currentColor" opacity="0.6" />
        </svg>
    )
}
