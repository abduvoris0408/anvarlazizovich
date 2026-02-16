"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { About } from "@/lib/types"


export function AboutHero() {
  const [about, setAbout] = useState<About | null>(null)

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/about")
      .then((r) => r.json())
      .then((d) => d.data && setAbout(d.data))
      .catch(() => { })
  }, [])

  const name = about?.fullName || "Burxonov Anvar Lazizovich"
  const title = about?.title || "Lawyer & Certified Mediator"

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-4">
              {name}
            </h1>
            <p className="text-xl text-primary font-medium mb-6">{title}</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional advokat va sertifikatlangan mediator haqida batafsil ma&apos;lumot
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
