"use client"

interface VideoBackgroundProps {
    src: string
    overlay?: "dark" | "gold" | "darkgold"
    overlayOpacity?: number
    className?: string
}

export function VideoBackground({
    src,
    overlay = "darkgold",
    overlayOpacity = 0.7,
    className = "",
}: VideoBackgroundProps) {
    const overlayStyle: Record<string, string> = {
        dark: `rgba(0,0,0,${overlayOpacity})`,
        gold: `rgba(30,20,0,${overlayOpacity})`,
        darkgold: `linear-gradient(135deg, rgba(0,0,0,${overlayOpacity}) 0%, rgba(20,14,0,${overlayOpacity * 0.9}) 50%, rgba(0,0,0,${overlayOpacity}) 100%)`,
    }

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.85) saturate(1.1)" }}
            >
                <source src={src} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: overlayStyle[overlay] ?? overlayStyle.darkgold,
                }}
            />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/30 to-transparent" />

            {/* Gold shimmer line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
    )
}
