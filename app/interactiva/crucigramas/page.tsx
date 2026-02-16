"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Box } from "lucide-react";

export default function CrucigramasPage() {
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
              Experiencia 3D
            </p>
            <h1 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Crucigramas 3D
            </h1>
          </div>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-1 flex-col items-center justify-center"
      >
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5">
            <Box className="h-12 w-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-100">
            Crucigramas con experiencia 3D interactiva
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Aquí irá el crucigrama inmersivo con WebGL/Three.js. Definiciones y pistas en el espacio 3D.
          </p>
          <p className="mt-4 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Próximamente
          </p>
        </div>
      </motion.section>
    </div>
  );
}
