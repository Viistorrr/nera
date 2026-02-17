/* eslint-disable jsx-a11y/no-autofocus */
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BrainCircuit, Search, Sparkles } from "lucide-react";

const WorldMap3D = dynamic(
  () => import("./components/WorldMap3D").then((m) => m.WorldMap3D),
  { ssr: false, loading: () => <div className="h-[320px] animate-pulse rounded-2xl border border-white/10 bg-white/5" /> }
);

const knowledgeCards = [
  {
    id: "kb-01",
    badge: "Atlas Conceptual",
    title: "Mapa semántico del Negrooverso",
    description:
      "Núcleo de conceptos, entidades y relaciones que estructuran el ecosistema creativo y técnico.",
    meta: "128 nodos · 432 relaciones activas",
  },
  {
    id: "kb-02",
    badge: "Playbooks",
    title: "Protocolos de despliegue y experimentación",
    description:
      "Recetarios operativos para mover código, datos y modelos entre entornos sin perder contexto.",
    meta: "24 flujos · 6 entornos conectados",
  },
  {
    id: "kb-03",
    badge: "Context Streams",
    title: "Historial inteligente de repositorios",
    description:
      "Línea de tiempo curada de commits, decisiones de diseño y eventos clave por proyecto.",
    meta: "∞ trazas · indexación incremental",
  },
  {
    id: "kb-04",
    badge: "Ontologías",
    title: "Lenguajes compartidos entre humanos y modelos",
    description:
      "Definiciones precisas para que NERA hable el mismo idioma que tu ecosistema.",
    meta: "37 dominios · 12 taxonomías activas",
  },
  {
    id: "kb-05",
    badge: "Knowledge Capsules",
    title: "Paquetes portables de conocimiento",
    description:
      "Unidades autocontenidas con contexto, código y samples listos para ser inyectados en modelos.",
    meta: "56 cápsulas · 9 colecciones",
  },
  {
    id: "kb-06",
    badge: "Field Logs",
    title: "Bitácoras de experimentos y sesiones",
    description:
      "Registro estructurado de conversaciones, prompts y resultados que vale la pena recordar.",
    meta: "En vivo · logging asistido",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
      <header className="flex flex-col items-center gap-6 border-b border-white/5 pb-8 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-xl"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500">
            <Search className="h-4 w-4" />
          </div>

          <input
            autoFocus
            type="text"
            placeholder="preguntale a NERA..."
            className="w-full rounded-full border border-white/10 bg-black/60 px-4 py-3 pl-10 pr-24 text-sm text-zinc-100 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] outline-none ring-0 placeholder:text-zinc-600 transition focus:border-[#D4AF37]/60 focus:bg-black/80"
          />

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          className="max-w-xl space-y-3"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            NERA · Estable
          </p>

          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-[2.1rem]">
            Bienvenid@ a la{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-zinc-50 to-[#D4AF37] bg-clip-text text-transparent">
              enciclopedia del negrooverso 
            </span>
          </h1>

          <p className="text-sm text-zinc-400">
            Neural Ecosystem &amp; Repository Assistant coordinando proyectos, conocimiento y
            trazas de tu universo creativo. Toda una herramienta central construyendo identidad, conocimiento y educación.
          </p>
        </motion.div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="mt-8 flex flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 shadow-[0_0_60px_rgba(0,0,0,0.4)] sm:mt-10 sm:p-6 lg:flex-row"
      >
        <div className="w-full lg:w-1/2">
          <WorldMap3D className="h-[260px] w-full sm:h-[320px] md:h-[360px] lg:h-[380px]" />
        </div>

        <div className="flex w-full items-center lg:w-1/2">
          <div className="space-y-3 text-left text-sm text-zinc-400">
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
              Cartografía del Negrooverso
            </p>
            <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Mapa-mundi contextual
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, urna eu tincidunt consectetur, nisi nisl aliquet nisi,
              euismod aliquam nisl nunc eu nisl. Suspendisse potenti. Proin
              vehicula, justo at feugiat lobortis, urna lorem maximus nunc,
              vitae volutpat lorem urna eu mi.
            </p>
            <p className="text-xs text-zinc-500">
              Este texto se completará con la narrativa geográfica del
              Negrooverso: conexiones entre África, Colombia, la costa
              pacífica, el Caribe y Centroamérica.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="mt-8 flex flex-1 flex-col gap-4 sm:mt-10 sm:gap-6 lg:mt-12">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] sm:tracking-[0.32em] text-zinc-500">
              Knowledge_Base
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Núcleo de contexto de NERA para entender el Negrooverso.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] sm:text-[11px] text-zinc-300 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="font-mono uppercase tracking-[0.18em] sm:tracking-[0.24em]">
              Semántica &amp; Memoria
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {knowledgeCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.05 + index * 0.04,
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-4 sm:p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors hover:border-[#D4AF37]/55 min-w-0"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
                <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_60%)]" />
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="space-y-2 sm:space-y-3 min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.9)]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-zinc-300 truncate">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-50 line-clamp-2">
                    {card.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                    {card.description}
                  </p>
                </div>

                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/70 text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.45)]">
                  <BrainCircuit className="h-4 w-4" />
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
                <p className="font-mono text-[10px] tracking-[0.14em] sm:tracking-[0.18em] text-zinc-500 truncate max-w-[70%]">
                  {card.meta}
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] sm:tracking-[0.24em] text-[#D4AF37]/80 shrink-0">
                  HOVER_TO_FOCUS
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
