"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

// Cuadrícula simple con las palabras escondidas en diferentes filas/columnas.
// Palabras: CIMARRON, KILOMBO, NEGROOVERSO, INDEPENDENCIA, PANAFRICANISMO
const SAMPLE_GRID = [
  "CIMARRONXABCD", // CIMARRON horizontal
  "XPXXXXKILOMBOX", // KILOMBO horizontal
  "NEXGROOVERSOX", // NEGROOVERSO repartida
  "IXXXXINDEPEXXX", // parte de INDEPENDENCIA
  "NXXXXNDENCIAXX", // resto de INDEPENDENCIA
  "PANAFRICANISMO", // PANAFRICANISMO completo
  "MXAXNXAXXXOXXX",
  "OXIXPXAXXXXNXO",
];

export default function SopaDeLetrasPage() {
  const [selected, setSelected] = useState<boolean[][]>(() =>
    SAMPLE_GRID.map((row) => row.split("").map(() => false))
  );

  const toggleCell = (rowIndex: number, colIndex: number) => {
    setSelected((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex ? !cell : cell
        )
      )
    );
  };

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
        <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-6">
          <p className="mb-4 text-center text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Encuentra: CIMARRON, KILOMBO, NEGROOVERSO, INDEPENDENCIA, PANAFRICANISMO
          </p>
          <div className="mx-auto max-w-full overflow-x-auto">
            <div className="inline-flex flex-col items-center justify-center gap-1 font-mono text-lg font-medium text-zinc-300 sm:text-xl">
              {SAMPLE_GRID.map((row, i) => (
                <div key={i} className="flex justify-center gap-1">
                  {row.split("").map((cell, j) => {
                    const isSelected = selected[i]?.[j];
                    return (
                      <button
                        key={j}
                        type="button"
                        onClick={() => toggleCell(i, j)}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-base sm:h-10 sm:w-10 sm:text-lg md:h-11 md:w-11 md:text-xl transition ${
                          isSelected
                            ? "border-[#D4AF37]/70 bg-[#D4AF37]/20 text-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.4)]"
                            : "border-white/10 bg-white/5 text-zinc-200 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                        }`}
                      >
                        {cell}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] text-zinc-500">
            Toca las letras para marcarlas y trazar las palabras. Próximamente
            podrás validar las soluciones y desbloquear pistas extra.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
