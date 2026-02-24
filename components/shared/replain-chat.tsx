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

        return () => {
            // Cleanup on unmount
            try {
                document.body.removeChild(script)
                delete (window as any).replainSettings
            } catch (e) {
                // ignore
            }
        }
    }, [])

    return null
}
