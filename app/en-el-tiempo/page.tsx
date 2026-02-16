"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { Calendar } from "../components/Calendar";

export type Efemeride = {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  description: string;
};

// Placeholder: luego se consultarán desde base de datos. Orden cronológico = más reciente primero.
const EFEMERIDES_PLACEHOLDER: Omit<Efemeride, "month" | "year">[] = [
  { id: "e1", day: 28, title: "Lorem ipsum dolor sit amet", description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: "e2", day: 22, title: "Ut enim ad minim veniam", description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { id: "e3", day: 15, title: "Duis aute irure dolor", description: "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  { id: "e4", day: 10, title: "Excepteur sint occaecat", description: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { id: "e5", day: 5, title: "Sed ut perspiciatis unde", description: "Omnis iste natus error sit voluptatem accusantium doloremque laudantium." },
  { id: "e6", day: 1, title: "Nemo enim ipsam voluptatem", description: "Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores." },
];

function getEfemeridesForMonth(month: number, year: number): Efemeride[] {
  return EFEMERIDES_PLACEHOLDER.map((e) => ({
    ...e,
    month,
    year,
  }))
    .sort((a, b) => b.day - a.day); // más reciente primero (día mayor arriba)
}

export default function EnElTiempoPage() {
  const now = useMemo(() => new Date(), []);
  const efemerides = useMemo(
    () => getEfemeridesForMonth(now.getMonth(), now.getFullYear()),
    [now]
  );

  return (
    <div className="flex flex-1 flex-col min-h-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-6 shrink-0 border-b border-white/5 pb-6 sm:mb-8 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
              En el tiempo...
            </p>
            <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
              Línea de tiempo y fechas
            </h1>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-3 text-sm text-zinc-400"
        >
          Navega por fechas y visualiza hitos del Negrooverso.
        </motion.p>
      </header>

      <div className="flex flex-1 min-h-0 flex-col gap-6 lg:flex-row lg:gap-8">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="min-w-0 flex-1 flex flex-col"
        >
          <Calendar />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="shrink-0 lg:w-56 xl:w-64"
        >
          <div className="rounded-xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-100">
                Efemérides
              </h2>
            </div>
            <ul className="divide-y divide-white/5 max-h-[320px] overflow-y-auto">
              {efemerides.map((evento) => (
                <li key={evento.id}>
                  <article className="px-3 py-2 text-left transition hover:bg-white/[0.03]">
                    <div className="flex gap-2">
                      <time
                        dateTime={`${evento.year}-${String(evento.month + 1).padStart(2, "0")}-${String(evento.day).padStart(2, "0")}`}
                        className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D4AF37] w-8 shrink-0"
                      >
                        {evento.day}/{evento.month + 1}
                      </time>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[11px] font-medium text-zinc-200 line-clamp-1">
                          {evento.title}
                        </h3>
                        <p className="mt-0.5 text-[10px] leading-snug text-zinc-500 line-clamp-2">
                          {evento.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
