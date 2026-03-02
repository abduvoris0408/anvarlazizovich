"use client"

export function CourthouseLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none" className={className}>
      {/* Foundation */}
      <rect x="10" y="106" width="100" height="7" rx="2" fill="currentColor" opacity="0.85" />
      <rect x="16" y="98" width="88" height="6" rx="1.5" fill="currentColor" opacity="0.65" />

      {/* Columns — 6 total */}
      {[22, 36, 50, 64, 78, 92].map((x, i) => (
        <g key={i}>
          <rect x={x - 1} y="91" width="8" height="4" rx="1" fill="currentColor" opacity="0.75" />
          <rect x={x} y="55" width="6" height="37" rx="1.5" fill="currentColor" opacity="0.80" />
          <rect x={x - 1} y="51" width="8" height="4" rx="1" fill="currentColor" opacity="0.75" />
        </g>
      ))}

      {/* Entablature */}
      <rect x="14" y="44" width="92" height="8" rx="1.5" fill="currentColor" />
      <rect x="18" y="42" width="84" height="3" rx="1" fill="currentColor" opacity="0.35" />

      {/* Pediment */}
      <path d="M12 47 L60 7 L108 47 Z" stroke="currentColor" strokeWidth="4.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M28 45 L60 19 L92 45" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round" opacity="0.5" />

      {/* Apex ornament */}
      <circle cx="60" cy="7" r="3.5" fill="currentColor" />
      <path d="M54 18 L60 8 L66 18 Z" fill="currentColor" opacity="0.6" />

      {/* Scale of Justice in pediment */}
      <line x1="60" y1="25" x2="60" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
      <line x1="49" y1="30" x2="71" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.45" strokeLinecap="round" />
      <path d="M49 30 Q45 36 49 40" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M71 30 Q75 36 71 40" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" strokeLinecap="round" />

      {/* Center arch door */}
      <path d="M50 98 V75 Q50 62 60 62 Q70 62 70 75 V98" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Side windows */}
      <path d="M22 98 V80 Q22 72 29 72 H36 V98" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" />
      <path d="M84 98 V80 Q84 72 91 72 H98 V98" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.45" />
    </svg>
  )
}
