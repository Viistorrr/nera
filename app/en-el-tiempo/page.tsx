 "use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, Sparkles, X, Image as ImageIcon } from "lucide-react";
import { Calendar } from "../components/Calendar";

export type Efemeride = {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  description: string;
  images?: string[];
};

// Placeholder: luego se consultarán desde base de datos / server con imágenes.
// Orden cronológico = más reciente primero.
const EFEMERIDES_PLACEHOLDER: Omit<Efemeride, "month" | "year">[] = [
  {
    id: "e1",
    day: 28,
    title: "Acontecimiento afrocentrado 1",
    description:
      "Descripción breve del hito histórico, cultural o político relacionado con el Negrooverso.",
    images: [
      "https://placehold.co/800x500/111111/FFFFFF?text=Negrooverso+1",
      "https://placehold.co/800x500/202020/FFFFFF?text=Negrooverso+1b",
    ],
  },
  {
    id: "e2",
    day: 22,
    title: "Acontecimiento afrocentrado 2",
    description:
      "Otro evento clave para la memoria, la representación y la cultura negra en el territorio.",
    images: ["https://placehold.co/800x500/151515/FFFFFF?text=Negrooverso+2"],
  },
  {
    id: "e3",
    day: 15,
    title: "Acontecimiento afrocentrado 3",
    description:
      "Efeméride vinculada a procesos de resistencia, organización comunitaria o creación cultural.",
    images: ["https://placehold.co/800x500/181818/FFFFFF?text=Negrooverso+3"],
  },
  {
    id: "e4",
    day: 15,
    title: "Acontecimiento afrocentrado 4",
    description:
      "Otro evento del mismo día para ilustrar múltiples registros en una misma fecha.",
    images: ["https://placehold.co/800x500/1b1b1b/FFFFFF?text=Negrooverso+4"],
  },
  {
    id: "e5",
    day: 5,
    title: "Acontecimiento afrocentrado 5",
    description:
      "Hito relacionado con procesos educativos, memoria cimarrona o creación de archivos.",
    images: ["https://placehold.co/800x500/101010/FFFFFF?text=Negrooverso+5"],
  },
  {
    id: "e6",
    day: 1,
    title: "Acontecimiento afrocentrado 6",
    description:
      "Evento que conecta genealogías africanas con procesos contemporáneos del Negrooverso.",
    images: ["https://placehold.co/800x500/0d0d0d/FFFFFF?text=Negrooverso+6"],
  },
];

function getEfemeridesForMonth(month: number, year: number): Efemeride[] {
  return EFEMERIDES_PLACEHOLDER.map((e) => ({
    ...e,
    month,
    year,
  })).sort((a, b) => b.day - a.day);
}

export default function EnElTiempoPage() {
  const now = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => ({
    month: now.getMonth(),
    year: now.getFullYear(),
  }));

  const efemerides = useMemo(
    () => getEfemeridesForMonth(viewDate.month, viewDate.year),
    [viewDate.month, viewDate.year]
  );

  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);
  const [dayEvents, setDayEvents] = useState<Efemeride[]>([]);
  const [showDayModal, setShowDayModal] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Efemeride | null>(null);
  const [eventImageIndex, setEventImageIndex] = useState(0);

  const handleSelectDay = (args: {
    day: number;
    month: number;
    year: number;
    events: { day: number; month: number; year: number }[];
  }) => {
    const { day, month, year } = args;
    const fullEvents = efemerides.filter(
      (e) => e.day === day && e.month === month && e.year === year
    );
    setSelectedDate({ day, month, year });
    setDayEvents(fullEvents);
    setShowDayModal(true);
  };

  const openEventModal = (evento: Efemeride) => {
    setSelectedEvent(evento);
    setEventImageIndex(0);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  const nextImage = () => {
    if (!selectedEvent || !selectedEvent.images || selectedEvent.images.length === 0) return;
    setEventImageIndex((idx) => (idx + 1) % selectedEvent.images!.length);
  };

  const prevImage = () => {
    if (!selectedEvent || !selectedEvent.images || selectedEvent.images.length === 0) return;
    setEventImageIndex((idx) =>
      (idx - 1 + selectedEvent.images!.length) % selectedEvent.images!.length
    );
  };

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
          <Calendar
            year={viewDate.year}
            month={viewDate.month}
            events={efemerides}
            onMonthChange={(year, month) => setViewDate({ year, month })}
            onSelectDay={handleSelectDay}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="shrink-0 w-full lg:w-56 xl:w-64"
        >
          <div className="rounded-lg border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden sm:rounded-xl">
            <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-100">
                Efemérides
              </h2>
            </div>
            <ul className="divide-y divide-white/5 max-h-[280px] overflow-y-auto sm:max-h-[320px]">
              {efemerides.map((evento) => (
                <li key={evento.id}>
                  <button
                    type="button"
                    onClick={() => openEventModal(evento)}
                    className="w-full px-3 py-2 text-left transition hover:bg-white/[0.03]"
                  >
                    <div className="flex gap-2">
                      <time
                        dateTime={`${evento.year}-${String(evento.month + 1).padStart(
                          2,
                          "0"
                        )}-${String(evento.day).padStart(2, "0")}`}
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
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>

      {/* Modal de día seleccionado (lista de efemérides del día) */}
      <AnimatePresence>
        {showDayModal && selectedDate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDayModal(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/95 p-4 shadow-2xl backdrop-blur-xl sm:rounded-2xl sm:p-5 md:p-6"
            >
              <button
                type="button"
                onClick={() => setShowDayModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <header className="mb-4 space-y-1 pr-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                  Efemérides del día
                </p>
                <h2 className="text-base font-semibold text-zinc-100 sm:text-lg">
                  {selectedDate.day}/{selectedDate.month + 1}/{selectedDate.year}
                </h2>
              </header>

              {dayEvents.length === 0 ? (
                <p className="text-sm text-zinc-400">
                  No hay efemérides registradas para este día en el Negrooverso (todavía).
                </p>
              ) : (
                <ul className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
                  {dayEvents.map((evento) => (
                    <li key={evento.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setShowDayModal(false);
                          openEventModal(evento);
                        }}
                        className="flex w-full flex-col items-start gap-1 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-sm text-zinc-200 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.05]"
                      >
                        <span className="text-[11px] font-semibold text-zinc-100">
                          {evento.title}
                        </span>
                        <span className="line-clamp-2 text-[11px] text-zinc-400">
                          {evento.description}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal de detalle de evento (con carrusel de imágenes) */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEventModal}
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="fixed left-1/2 top-1/2 z-50 flex w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-white/15 bg-black/95 shadow-2xl backdrop-blur-xl sm:rounded-2xl sm:w-[94%]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                    Detalle del evento
                  </p>
                  <h2 className="truncate text-sm font-semibold text-zinc-100 sm:text-base">
                    {selectedEvent.title}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-zinc-500">
                    {selectedEvent.day}/{selectedEvent.month + 1}/{selectedEvent.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeEventModal}
                  className="ml-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                  aria-label="Cerrar detalle"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-4 md:gap-5 md:p-6">
                <div className="w-full sm:w-1/2">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black/60">
                    {selectedEvent.images && selectedEvent.images.length > 0 ? (
                      <>
                        <img
                          src={selectedEvent.images[eventImageIndex]}
                          alt={selectedEvent.title}
                          className="h-full w-full object-cover"
                        />
                        {selectedEvent.images.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-zinc-200 transition hover:bg-black/80"
                              aria-label="Imagen anterior"
                            >
                              {"<"}
                            </button>
                            <button
                              type="button"
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-zinc-200 transition hover:bg-black/80"
                              aria-label="Imagen siguiente"
                            >
                              {">"}
                            </button>
                            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                              {selectedEvent.images.map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setEventImageIndex(idx)}
                                  className={`h-1.5 w-3 rounded-full ${
                                    idx === eventImageIndex
                                      ? "bg-[#D4AF37]"
                                      : "bg-white/30"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-zinc-500">
                        <ImageIcon className="h-6 w-6" />
                        <p className="text-[11px]">Imágenes del evento próximamente</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-[10px] text-zinc-500">
                    Imágenes de referencia servidas desde el servidor del Negrooverso.
                  </p>
                </div>

                <div className="w-full space-y-3 text-sm text-zinc-200 sm:w-1/2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                    Descripción
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {selectedEvent.description}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Aquí se puede expandir con más contexto histórico, vínculos a otros nodos del
                    Negrooverso o referencias a materiales educativos y archivos.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
