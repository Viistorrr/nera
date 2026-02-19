"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Grid3X3, Layers, Map, Search } from "lucide-react";

const gameCards = [
  {
    id: "sopa",
    slug: "sopa-de-letras",
    badge: "Palabras",
    title: "Sopa de letras",
    description: "Encuentra las palabras escondidas en la cuadrícula. Tema Negrooverso.",
    meta: "Interactivo · Niveles",
    icon: Search,
  },
  {
    id: "crucigramas",
    slug: "crucigramas",
    badge: "3D",
    title: "Crucigramas",
    description: "Crucigramas con experiencia 3D interactiva. Definiciones y pistas en el espacio.",
    meta: "WebGL · Inmersivo",
    icon: Layers,
  },
  {
    id: "laberinto",
    slug: "laberinto",
    badge: "Recorridos",
    title: "Laberinto de estaciones",
    description: "Avanza por estaciones temáticas: Historia, Despertar, Independencia.",
    meta: "Identidad · Pistas",
    icon: Map,
  },
  {
    id: "memoria",
    slug: "memoria",
    badge: "Memoria",
    title: "Parejas",
    description: "Voltea las tarjetas y forma parejas. Refuerza conceptos del ecosistema.",
    meta: "Interactivo · 12 parejas",
    icon: Grid3X3,
  },
];

export default function InteractivaPage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-8 border-b border-white/5 pb-6 sm:mb-10 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
              Interactiva
            </p>
            <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
              Juegos y experiencias
            </h1>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-3 text-sm text-zinc-400"
        >
          Sopa de letras, crucigramas 3D y más. Aprende el Negrooverso jugando.
        </motion.p>
      </header>

      <section className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {gameCards.map((card, index) => {
          const Icon = card.icon;
          const isAvailable = true;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.05 + index * 0.06,
              }}
            >
              <Link
                href={isAvailable ? `/interactiva/${card.slug}` : "#"}
                className={`block h-full ${!isAvailable ? "pointer-events-none cursor-default" : ""}`}
                aria-disabled={!isAvailable}
              >
                <motion.article
                  whileHover={isAvailable ? { y: -4 } : undefined}
                  className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors hover:border-[#D4AF37]/55 min-w-0 h-full flex flex-col sm:p-5"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_60%)]" />
                  </div>

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.9)]" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-300">
                          {card.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-zinc-50">
                        {card.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/70 text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
                    <p className="font-mono text-[10px] tracking-[0.14em] text-zinc-500">
                      {card.meta}
                    </p>
                    {isAvailable ? (
                      <span className="font-mono text-[10px] tracking-[0.18em] text-[#D4AF37]/80">
                        JUGAR →
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-600">
                        Próximamente
                      </span>
                    )}
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
