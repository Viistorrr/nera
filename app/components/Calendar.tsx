"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getDaysInMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const daysInMonth = last.getDate();
  const startWeekday = first.getDay();
  const startOffset = startWeekday === 0 ? 6 : startWeekday - 1;
  return { daysInMonth, startOffset };
}

export function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const { year, month } = viewDate;
  const { daysInMonth, startOffset } = getDaysInMonth(year, month);

  const prevMonth = () => {
    setViewDate((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 }
    );
  };

  const nextMonth = () => {
    setViewDate((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 }
    );
  };

  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const leadingBlanks = Array.from({ length: startOffset }, (_, i) => (
    <div key={`blank-${i}`} className="h-full min-h-[2.25rem] rounded-lg bg-white/[0.02]" />
  ));

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
    <button
      key={day}
      type="button"
      className={`h-full min-h-[2.25rem] w-full rounded-lg border text-sm font-medium transition ${
        isToday(day)
          ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          : "border-white/5 bg-white/[0.03] text-zinc-300 hover:border-[#D4AF37]/30 hover:bg-white/5 hover:text-zinc-50"
      }`}
    >
      {day}
    </button>
  ));

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="shrink-0 flex items-center justify-between border-b border-white/5 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Mes anterior"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-base font-semibold text-zinc-100 sm:text-lg">
          {MONTHS[month]} {year}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Mes siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-6">
        <div className="mb-2 grid shrink-0 grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd}
              className="py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500"
            >
              {wd}
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-7 gap-1 sm:gap-2 auto-rows-fr">
          {leadingBlanks}
          {days}
        </div>
      </div>
    </div>
  );
}
