export function CourthouseLogo({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className={className}
        >
            {/* Base/Foundation */}
            <rect x="15" y="85" width="70" height="5" rx="1" fill="currentColor" />
            <rect x="20" y="78" width="60" height="4" rx="1" fill="currentColor" />

            {/* Columns */}
            <rect x="24" y="42" width="6" height="36" rx="2" fill="currentColor" />
            <rect x="38" y="42" width="6" height="36" rx="1" fill="currentColor" />
            <rect x="56" y="42" width="6" height="36" rx="1" fill="currentColor" />
            <rect x="70" y="42" width="6" height="36" rx="2" fill="currentColor" />

            {/* Arches between columns */}
            <path d="M30 78 V58 Q30 48 37 48 H38 V78" stroke="currentColor" strokeWidth="3" fill="none" />
            <path d="M62 78 V58 Q62 48 69 48 H70 V78" stroke="currentColor" strokeWidth="3" fill="none" />

            {/* Center door arch */}
            <path d="M44 78 V55 Q44 44 50 44 Q56 44 56 55 V78" stroke="currentColor" strokeWidth="3" fill="none" />

            {/* Beam above columns */}
            <rect x="20" y="38" width="60" height="5" rx="1" fill="currentColor" />

            {/* Roof / Pediment */}
            <path d="M18 40 L50 12 L82 40 Z" stroke="currentColor" strokeWidth="4" fill="none" strokeLinejoin="round" />

            {/* Inner triangle decoration */}
            <path d="M35 38 L50 20 L65 38" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />

            {/* Small triangle at top */}
            <path d="M44 32 L50 24 L56 32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" />

            {/* Horizontal bars in pediment */}
            <line x1="28" y1="38" x2="72" y2="38" stroke="currentColor" strokeWidth="2" />
            <line x1="32" y1="35" x2="68" y2="35" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    )
}
