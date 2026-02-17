"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";

// Crucigrama simple 15x15 con las palabras:
// CIMARRON, KILOMBO, NEGROOVERSO, INDEPENDENCIA, PANAFRICANISMO
// '#' indica casilla negra (bloque).
const SOLUTION_GRID = [
  "CIMARRON#######",
  "###############",
  "###KILOMBO#####",
  "###############",
  "NEGROOVERSO####",
  "###############",
  "##INDEPENDENCIA",
  "###############",
  "PANAFRICANISMO",
  "###############",
  "###############",
  "###############",
  "###############",
  "###############",
  "###############",
] as const;

type CellState = string;

export default function CrucigramasPage() {
  const [grid, setGrid] = useState<CellState[][]>(
    SOLUTION_GRID.map((row) =>
      row.split("").map((ch) => (ch === "#" ? "#" : ""))
    )
  );

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const upper = value.toUpperCase().slice(0, 1);
    setGrid((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) =>
          r === rowIndex && c === colIndex ? upper : cell
        )
      )
    );
  };

  const fillSolution = () => {
    setGrid(
      SOLUTION_GRID.map((row) =>
        row.split("").map((ch) => (ch === "#" ? "#" : ch))
      )
    );
  };

  const isCorrectCell = (rowIndex: number, colIndex: number) => {
    const solutionChar = SOLUTION_GRID[rowIndex][colIndex];
    const userChar = grid[rowIndex][colIndex];
    if (solutionChar === "#") return false;
    if (!userChar) return false;
    return solutionChar === userChar;
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
            <Box className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Juego
            </p>
            <h1 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Crucigrama
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
        <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur-xl sm:p-6 lg:w-2/3">
          <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            Palabras: CIMARRON · KILOMBO · NEGROOVERSO · INDEPENDENCIA · PANAFRICANISMO
          </p>
          <div className="mx-auto max-w-full overflow-x-auto">
            <div className="inline-grid grid-cols-[repeat(15,1.8rem)] gap-[0.12rem] sm:grid-cols-[repeat(15,2rem)]">
              {SOLUTION_GRID.map((row, rowIndex) =>
                row.split("").map((ch, colIndex) => {
                  const isBlock = ch === "#";
                  if (isBlock) {
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className="h-7 w-7 rounded-[0.35rem] bg-zinc-900/90 sm:h-8 sm:w-8"
                      />
                    );
                  }

                  const correct = isCorrectCell(rowIndex, colIndex);
                  const value = grid[rowIndex][colIndex] ?? "";

                  return (
                    <input
                      key={`${rowIndex}-${colIndex}`}
                      value={value}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      maxLength={1}
                      className={`h-7 w-7 rounded-[0.35rem] border bg-black/60 text-center text-xs font-semibold uppercase text-zinc-100 outline-none transition focus:border-[#D4AF37]/60 focus:bg-black/80 sm:h-8 sm:w-8 sm:text-sm ${
                        value
                          ? correct
                            ? "border-emerald-500/70"
                            : "border-rose-500/70"
                          : "border-white/15"
                      }`}
                    />
                  );
                })
              )}
            </div>
          </div>
          <p className="mt-3 text-[11px] text-zinc-500">
            Escribe letras en las casillas blancas. Verde = letra correcta, rojo = incorrecta.
          </p>
          <button
            type="button"
            onClick={fillSolution}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
          >
            Mostrar solución
          </button>
        </div>

        <div className="w-full space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-sm text-zinc-300 backdrop-blur-xl sm:p-6 lg:w-1/3">
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
            Pistas
          </p>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <span className="font-mono text-[10px] uppercase text-[#D4AF37]">
                1. Horizontal (fila 1)
              </span>
              <br />
              Persona esclavizada que huye y reclama su libertad:{" "}
              <strong>CIMARRON</strong>.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase text-[#D4AF37]">
                2. Horizontal (fila 3)
              </span>
              <br />
              Espacio comunitario autónomo de resistencia afro:{" "}
              <strong>KILOMBO</strong>.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase text-[#D4AF37]">
                3. Horizontal (fila 5)
              </span>
              <br />
              Universo creativo del proyecto:{" "}
              <strong>NEGROOVERSO</strong>.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase text-[#D4AF37]">
                4. Horizontal (fila 7)
              </span>
              <br />
              Proceso histórico de romper la colonia y la esclavitud:{" "}
              <strong>INDEPENDENCIA</strong>.
            </li>
            <li>
              <span className="font-mono text-[10px] uppercase text-[#D4AF37]">
                5. Horizontal (fila 9)
              </span>
              <br />
              Movimiento político y cultural que une a África y su diáspora:{" "}
              <strong>PANAFRICANISMO</strong>.
            </li>
          </ul>
        </div>
      </motion.section>
    </div>
  );
}
