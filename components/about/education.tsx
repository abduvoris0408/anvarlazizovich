"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { Education as EducationType } from "@/lib/types"
import { GraduationCap, Award } from "lucide-react"

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [education, setEducation] = useState<EducationType[]>([])

  useEffect(() => {
    fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/education?limit=100")
      .then((r) => r.json())
      .then((d) => d.data && setEducation(d.data))
      .catch(() => { })
  }, [])

  if (education.length === 0) return null

  return (
    <section className="py-16 bg-muted/30">
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

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm mb-6">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">Ta&apos;lim</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Ta&apos;lim va sertifikatlar</h2>
          </motion.div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}

                className="flex items-start gap-4 p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent backdrop-blur-sm"
              >
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  {edu.degree.toLowerCase().includes("sertifikat") ? (
                    <Award className="h-6 w-6 text-primary" />
                  ) : (
                    <GraduationCap className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-primary font-medium mt-1">{edu.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
