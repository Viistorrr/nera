"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

// Placeholder: cuadrícula simple de sopa de letras (luego se genera dinámicamente)
const SAMPLE_GRID = [
  "NERA",
  "NEGR",
  "OVER",
  "SOUN",
];

export default function SopaDeLetrasPage() {
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
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Juego
            </p>
            <h1 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Sopa de letras
            </h1>
          </div>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-1 flex-col items-center gap-6"
      >
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <p className="mb-4 text-center text-xs font-mono uppercase tracking-wider text-zinc-500">
            Encuentra: NERA, NEGRO, VERSO
          </p>
          <div className="grid gap-1 font-mono text-2xl font-medium text-zinc-300">
            {SAMPLE_GRID.map((row, i) => (
              <div key={i} className="flex justify-center gap-1">
                {row.split("").map((cell, j) => (
                  <button
                    key={j}
                    type="button"
                    className="h-12 w-12 rounded-lg border border-white/10 bg-white/5 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                  >
                    {cell}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-zinc-500">
            Haz clic en las letras para seleccionar. (Próximamente: lógica completa.)
          </p>
        </div>
      </motion.section>
    </div>
  );
}
