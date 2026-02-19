"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, BriefcaseBusiness, Globe2, Sparkles } from "lucide-react";
import { services } from "../data/nodes";

export default function MarketplacePage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-8 border-b border-white/5 pb-6 sm:mb-10 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
                Marketplace de Servicios
              </p>
              <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
                Servicios profesionales del Negrooverso
              </h1>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] sm:text-[11px] text-zinc-300">
            <Globe2 className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em]">
              Red global de servicios
            </span>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-3 max-w-3xl text-sm text-zinc-400"
        >
          Conecta con personas y equipos que ofrecen servicios profesionales
          alineados con la identidad, memoria y futuro del Negrooverso: desde
          marketing y consultorías, hasta ingeniería, historia, psicología y
          asesorías especializadas.
        </motion.p>
      </header>

      <section className="flex flex-1 flex-col gap-5">
        <div className="flex items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p className="font-mono uppercase tracking-[0.24em]">
            Servicios_Disponibles
          </p>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
              Curados por NERA
            </span>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
          {services.map((svc, index) => (
            <Link key={svc.id} href={`/nodo/${svc.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: 0.05 + index * 0.03,
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors hover:border-[#D4AF37]/55"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_60%)]" />
                </div>

                <div className="relative space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.9)]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-300">
                      {svc.category}
                    </span>
                  </div>

                  <h2 className="text-sm font-semibold text-zinc-50">
                    {svc.title}
                  </h2>

                  <p className="text-xs leading-relaxed text-zinc-400">
                    {svc.description}
                  </p>
                </div>

                <div className="relative mt-4 flex items-center justify-between gap-2 text-[11px] text-zinc-400">
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/80">
                    <BadgeCheck className="h-3 w-3" />
                    VER_DETALLE
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

