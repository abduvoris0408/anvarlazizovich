"use client"

import Link from "next/link"
import { Scale, ArrowRight, Phone } from "lucide-react"
import { siteConfig } from "@/data/site"

export function CTASection() {
  return (
    <section className="mt-12 w-full">
      <div className="mx-auto max-w-4xl rounded-[40px] border border-black/5 dark:border-white/20 p-2 shadow-sm">
        <div className="relative mx-auto h-[400px] max-w-4xl overflow-hidden rounded-[38px] border border-black/5 dark:border-white/20 bg-primary p-2 shadow-sm">
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255, 64, 23, 0.1), transparent 70%)",
            }}
          />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 z-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            <div className="mt-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Huquqiy yordam kerakmi?</h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto px-4">
                Professional maslahat va huquqiy himoya uchun hoziroq murojaat qiling.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                <Link href="/contact">
                  <div className="group border-border bg-secondary/70 flex h-[64px] cursor-pointer items-center gap-2 rounded-full border p-[11px]">
                    <div className="border-border bg-white flex h-[43px] items-center justify-center rounded-full border">
                      <p className="mr-3 ml-2 flex items-center justify-center gap-2 font-medium tracking-tight text-primary">
                        <Scale className="h-5 w-5" />
                        Murojaat qilish
                      </p>
                    </div>
                    <div className="border-border flex size-[26px] items-center justify-center rounded-full border-2 transition-all ease-in-out group-hover:ml-2 text-white">
                      <ArrowRight className="h-4 w-4 transition-all ease-in-out group-hover:rotate-45" />
                    </div>
                  </div>
                </Link>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="font-medium">{siteConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Large text */}
            <h1
              className="absolute inset-x-0 mt-[100px] text-center text-[80px] font-semibold text-transparent sm:mt-[20px] sm:text-[160px] pointer-events-none"
              style={{
                WebkitTextStroke: "1px currentColor",
                color: "transparent",
              }}
              aria-hidden="true"
            >
              Advokat
            </h1>
            <h1
              className="absolute inset-x-0 mt-[100px] text-center text-[80px] font-semibold text-primary sm:mt-[20px] sm:text-[160px] pointer-events-none"
              aria-hidden="true"
            >
              Advokat
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
