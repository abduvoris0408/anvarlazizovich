"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { About } from "@/lib/types"
import { Briefcase } from "lucide-react"
import { SectionBadge } from "@/components/ui/section-badge"


interface ExperienceItem {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
}


export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [experience, setExperience] = useState<ExperienceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/experiences?sort=order&limit=100")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setExperience(d.data)
        }
      })
      .catch(() => { })
      .finally(() => setIsLoading(false))
  }, [])

  if (!isLoading && experience.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass-effect rounded-3xl p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-muted-foreground">Ish tajribasi</h2>
            <p className="mt-2 text-muted-foreground">Ma'lumotlar hozircha mavjud emas.</p>
          </div>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-10 w-48 bg-muted rounded-md mx-auto mb-12 animate-pulse" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="pl-0 md:pl-20 relative">
                <div className="h-32 glass-card rounded-2xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-12"
          >
            <SectionBadge title="Tajriba" icon={Briefcase} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ish tajribasi</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative pl-0 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />


                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm cursor-pointer"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{exp.position}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {new Date(exp.startDate).getFullYear()} - {exp.current ? "Hozirgacha" : (exp.endDate ? new Date(exp.endDate).getFullYear() : "")}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
