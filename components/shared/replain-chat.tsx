"use client"

import { useEffect } from "react"

export default function ReplainChat() {
    useEffect(() => {
        // Re:plain chat widget initialization
        ; (window as any).replainSettings = {
            id: "740bc0db-3b9e-4fd6-8716-028f3a789fd2",
        }

        const script = document.createElement("script")
        script.src = "https://widget.replain.cc/dist/client.js"
        script.async = true
        document.body.appendChild(script)

        // Fix: Re:plain widget creates a black overlay — hide it
        const style = document.createElement("style")
        style.id = "replain-overlay-fix"
        style.innerHTML = `
            #replain-overlay,
            .replain-overlay,
            [class*="replain"][class*="overlay"],
            [id*="replain"][id*="overlay"],
            iframe[src*="replain"] ~ div[style*="background"],
            body > div[style*="position: fixed"][style*="background: rgb(0, 0, 0)"],
            body > div[style*="position: fixed"][style*="background-color: rgb(0, 0, 0)"] {
                display: none !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        `
        document.head.appendChild(style)

        return () => {
            // Cleanup on unmount
            try {
                document.body.removeChild(script)
                delete (window as any).replainSettings
                const styleEl = document.getElementById("replain-overlay-fix")
                if (styleEl) document.head.removeChild(styleEl)
            } catch (e) {
                // ignore
            }
        }
    }, [])

    return null
}
