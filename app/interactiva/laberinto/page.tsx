"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Map, Sparkles } from "lucide-react";

type StationId = "historia" | "despertar" | "independencia";

const STATIONS: {
  id: StationId;
  title: string;
  subtitle: string;
  description: string;
  clues: string[];
}[] = [
  {
    id: "historia",
    title: "Estación 1 · Historia",
    subtitle: "Memoria cimarrona y raíz panafricana",
    description:
      "Aquí conectas los hilos entre África, el Atlántico negro y los territorios de América Latina. Es la estación donde se nombran rutas de esclavización, resistencias y genealogías que llegan hasta Colombia, el Chocó y el Pacífico.",
    clues: [
      "Piensa en rutas que empiezan en África occidental y llegan a puertos de América.",
      "Recuerda nombres de pueblos, ríos y puertos que se repiten en la historia oral.",
      "La memoria no es solo pasado: es una tecnología de futuro.",
    ],
  },
  {
    id: "despertar",
    title: "Estación 2 · Despertar",
    subtitle: "Conciencia, cuidado y comunidad",
    description:
      "En esta estación el foco está en el despertar político, emocional y espiritual. Cómo las comunidades negras en Colombia, el Chocó y otros territorios del Pacífico y el Caribe tejen redes de apoyo, arte y organización inspiradas en el panafricanismo.",
    clues: [
      "Observa cómo la música, la danza y la palabra funcionan como alarma y refugio.",
      "Piensa en procesos organizativos: consejos comunitarios, movimientos estudiantiles, colectivos afrodiaspóricos.",
      "El despertar también es aprender a nombrar el racismo estructural y a imaginar alternativas.",
    ],
  },
  {
    id: "independencia",
    title: "Estación 3 · Independencia",
    subtitle: "Más allá de los próceres",
    description:
      "La independencia no solo son fechas patrias: incluye palenques, quilombos y procesos de liberación que no siempre entran en los manuales oficiales. Esta estación conecta luchas afro en América Latina con proyectos contemporáneos de autonomía.",
    clues: [
      "Recuerda nombres como San Basilio de Palenque, Haití, quilombos de Brasil y resistencias en el Pacífico colombiano.",
      "Piensa en independencia como práctica cotidiana: tierra, idioma, educación, tecnología propia.",
      "El laberinto termina, pero el camino panafricano sigue abriendo estaciones futuras.",
    ],
  },
];

export default function LaberintoPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const station = STATIONS[currentIndex];

  const goNext = () => {
    if (currentIndex < STATIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const isLast = currentIndex === STATIONS.length - 1;

  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/interactiva"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            aria-label="Volver a Interactiva"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
            <Map className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Juego
            </p>
            <h1 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Laberinto de estaciones
            </h1>
          </div>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-1 flex-col gap-6 lg:flex-row"
      >
        <div className="w-full space-y-5 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-6 lg:w-2/3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-400">
            <p className="font-mono uppercase tracking-[0.24em] text-zinc-500">
              Estaciones_del_camino
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/80">
              {currentIndex + 1}/{STATIONS.length}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            {STATIONS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`rounded-full border px-3 py-1 font-mono uppercase tracking-[0.18em] transition ${
                  idx === currentIndex
                    ? "border-[#D4AF37]/70 bg-[#D4AF37]/15 text-[#D4AF37]"
                    : "border-white/15 bg-black/40 text-zinc-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_60%)]" />
            </div>
            <div className="relative space-y-3 text-sm text-zinc-200">
              <h2 className="text-base font-semibold text-zinc-50 sm:text-lg">
                {station.title}
              </h2>
              <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                {station.subtitle}
              </p>
              <p className="leading-relaxed text-zinc-200">
                {station.description}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-zinc-400">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="rounded-full border border-white/15 bg-white/0 px-4 py-1.5 font-mono uppercase tracking-[0.2em] text-zinc-300 transition enabled:hover:border-[#D4AF37]/50 enabled:hover:text-[#D4AF37] disabled:opacity-40"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              className="rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-4 py-1.5 font-mono uppercase tracking-[0.2em] text-[#D4AF37] transition disabled:opacity-50"
            >
              {isLast ? "Última estación" : "Siguiente estación"}
            </button>
          </div>
        </div>

        <aside className="w-full space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-sm text-zinc-300 backdrop-blur-xl sm:p-6 lg:w-1/3">
          <p className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
            <Sparkles className="h-3 w-3 text-[#D4AF37]" />
            Pistas de esta estación
          </p>
          <ul className="mt-2 space-y-2 text-xs sm:text-sm">
            {station.clues.map((clue, idx) => (
              <li key={idx} className="leading-relaxed text-zinc-300">
                {clue}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-zinc-500">
            Este laberinto está pensado como un recorrido pedagógico desde la
            memoria panafricana hasta las luchas negras en Colombia, el Chocó y
            América Latina.
          </p>
        </aside>
      </motion.section>
    </div>
  );
}

