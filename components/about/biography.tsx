"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { About } from "@/lib/types"
import { User } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"


export function Biography() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const [about, setAbout] = useState<About | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("Fetching About data...")
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => {
        console.log("About response status:", r.status)
        return r.json()
      })
      .then((d) => {
        console.log("About data received:", d)
        if (d.data) {
          setAbout(d.data)
        } else {
          console.error("No data in About response:", d)
        }
      })
      .catch((e) => {
        console.error("Error fetching About data:", e)
      })
      .finally(() => setIsLoading(false))
  }, [])


  const biography = about?.bio || about?.biography || ""
  const imageUrl = about?.avatar?.url || about?.profileImage?.url || "/professional-lawyer-portrait-man-in-suit.jpg"

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-card animate-pulse" />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-10 w-48 bg-muted rounded-md animate-pulse mb-6" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
                </div>
                <div className="space-y-3 pt-4">
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }


  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <img
                  src={imageUrl}
                  alt={about?.fullName || "Burxonov Anvar Lazizovich"}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>


            {/* Biography text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <SectionBadge title="Biografiya" icon={User} className="mb-8 md:mb-10" />
              <h2 className="text-3xl font-bold text-foreground mb-6">Biografiya</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {biography ? (
                  biography.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))
                ) : (

                  <p className="text-muted-foreground leading-relaxed">Ma&apos;lumot mavjud emas (API xatosi yoki bo&apos;sh).</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
