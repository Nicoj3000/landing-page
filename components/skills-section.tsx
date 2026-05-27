"use client"

import { useTranslation } from "react-i18next"
import { IconCloud } from "@/components/magicui/icon-cloud"
import { DottedMap } from "@/components/ui/dotted-map"
import { motion } from "framer-motion"

const techImages = [
  "https://cdn.simpleicons.org/typescript/3178c6",
  "https://cdn.simpleicons.org/javascript/f7df1e",
  "https://cdn.simpleicons.org/react/61dafb",
  "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "https://cdn.simpleicons.org/nodedotjs/339933",
  "https://cdn.simpleicons.org/express/ffffff",
  "https://cdn.simpleicons.org/nestjs/e0234e",
  "https://cdn.simpleicons.org/python/3776ab",
  "https://cdn.simpleicons.org/django/092e20",
  "https://cdn.simpleicons.org/prisma/2d3748",
  "https://cdn.simpleicons.org/mongodb/47a248",
  "https://cdn.simpleicons.org/postgresql/4169e1",
  "https://cdn.simpleicons.org/mysql/4479a1",
  "https://cdn.simpleicons.org/supabase/3ecf8e",
  "https://cdn.simpleicons.org/docker/2496ed",
  "https://cdn.simpleicons.org/amazonwebservices/ff9900",
  "https://cdn.simpleicons.org/vercel/ffffff",
  "https://cdn.simpleicons.org/netlify/00c7b7",
  "https://cdn.simpleicons.org/tailwindcss/06b6d4",
  "https://cdn.simpleicons.org/sass/cc6699",
  "https://cdn.simpleicons.org/html5/e34f26",
  "https://cdn.simpleicons.org/css/1572b6",
  "https://cdn.simpleicons.org/git/f05032",
  "https://cdn.simpleicons.org/github/ffffff",
  "https://cdn.simpleicons.org/vite/646cff",
  "https://cdn.simpleicons.org/figma/f24e1e",
  "https://cdn.simpleicons.org/linux/fcc624",
]

const colombiaMarkers = [
  { lat: 4.711,  lng: -74.0721, size: 0.55, pulse: true },
  { lat: 4.8087, lng: -75.6906, size: 0.45, pulse: true },
  { lat: 6.2476, lng: -75.5658, size: 0.45, pulse: true },
]

const cardClass =
  "group relative overflow-hidden rounded-2xl border border-white/10 " +
  "bg-[linear-gradient(160deg,rgba(16,24,46,0.92),rgba(9,13,26,0.9))] " +
  "backdrop-blur-sm shadow-[0_14px_32px_-24px_rgba(0,0,0,0.9)] " +
  "transition-all duration-300 hover:-translate-y-1 hover:border-secondary/60 " +
  "hover:shadow-[0_20px_44px_-24px_rgba(63,92,255,0.45)]"

export default function SkillsSection() {
  const { t } = useTranslation()

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto w-full max-w-[1180px] pt-10 md:pt-20"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">

        {/* Tech Stack card */}
        <article className={cardClass}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7d96ff]/80 to-transparent" />

          <div className="flex h-full flex-col p-6 xl:p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Stack
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-secondary/40 to-transparent" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-100 lg:text-3xl">
              {t("titleStack1")}{" "}
              <span className="text-secondary">{t("titleStack2")}</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 [text-wrap:pretty] lg:text-[0.95rem]">
              {t("titleStack3")}
            </p>

            <div className="relative mt-5 flex items-center justify-center aspect-square">
              <IconCloud images={techImages} />
            </div>
          </div>
        </article>

        {/* Location card */}
        <article className={cardClass}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7d96ff]/80 to-transparent" />

          <div className="flex h-full flex-col p-6 xl:p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Location
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-secondary/40 to-transparent" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-100 lg:text-3xl">
              {t("titleGlobe1")}{" "}
              <span className="text-secondary">{t("titleGlobe2")}</span>
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm leading-relaxed text-slate-400 lg:text-[0.95rem]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Disponible para colaborar de forma remota
            </p>

            <div className="relative mt-5 flex items-center justify-center aspect-square">
              <DottedMap
                markers={colombiaMarkers}
                dotColor="rgba(255,255,255,0.55)"
                markerColor="#6d86ff"
                dotRadius={0.4}
                pulse
                className="h-full w-full"
              />
            </div>
          </div>
        </article>

      </div>
    </motion.section>
  )
}
