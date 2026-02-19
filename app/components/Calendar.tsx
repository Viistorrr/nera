 "use client";
 
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

type CalendarEvent = {
  day: number;
  month: number;
  year: number;
};

type CalendarProps = {
  year: number;
  month: number;
  events?: CalendarEvent[];
  onMonthChange?: (year: number, month: number) => void;
  onSelectDay?: (args: {
    day: number;
    month: number;
    year: number;
    events: CalendarEvent[];
  }) => void;
};

export function Calendar({ year, month, events = [], onMonthChange, onSelectDay }: CalendarProps) {
  const today = new Date();

  const { daysInMonth, startOffset } = getDaysInMonth(year, month);

  const prevMonth = () => {
    if (!onMonthChange) return;
    const prev =
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
    onMonthChange(prev.year, prev.month);
  };

  const nextMonth = () => {
    if (!onMonthChange) return;
    const next =
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };
    onMonthChange(next.year, next.month);
  };

  const isToday = (day: number) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const getEventsForDay = (day: number) =>
    events.filter(
      (e) => e.day === day && e.month === month && e.year === year
    );

  const handleDayClick = (day: number) => {
    if (!onSelectDay) return;
    const dayEvents = getEventsForDay(day);
    onSelectDay({ day, month, year, events: dayEvents });
  };

  const leadingBlanks = Array.from({ length: startOffset }, (_, i) => (
    <div
      key={`blank-${i}`}
      className="h-full min-h-[2.25rem] rounded-lg bg-white/[0.02]"
    />
  ));

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
    (day) => {
      const dayEvents = getEventsForDay(day);
      const hasEvents = dayEvents.length > 0;

      return (
        <button
          key={day}
          type="button"
          onClick={() => handleDayClick(day)}
          className={`group relative flex h-full min-h-[2rem] w-full flex-col items-center justify-center rounded border text-xs font-medium transition sm:min-h-[2.25rem] sm:rounded-lg sm:text-sm ${
            isToday(day)
              ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              : hasEvents
              ? "border-[#D4AF37]/40 bg-[#D4AF37]/5 text-zinc-100 shadow-[0_0_12px_rgba(212,175,55,0.2)]"
              : "border-white/5 bg-white/[0.03] text-zinc-300 hover:border-[#D4AF37]/30 hover:bg-white/5 hover:text-zinc-50"
          }`}
        >
          <span>{day}</span>
          {hasEvents && (
            <span className="mt-0.5 inline-flex h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
          )}
        </button>
      );
    }
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:rounded-2xl">
      <div className="shrink-0 flex items-center justify-between border-b border-white/5 px-3 py-2 sm:px-4 sm:py-3 md:px-6">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Mes anterior"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] sm:h-9 sm:w-9"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <h2 className="text-sm font-semibold text-zinc-100 sm:text-base md:text-lg">
          {MONTHS[month]} {year}
        </h2>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Mes siguiente"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] sm:h-9 sm:w-9"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-2 sm:p-4 md:p-6">
        <div className="mb-1.5 grid shrink-0 grid-cols-7 gap-0.5 text-center sm:mb-2 sm:gap-1">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd}
              className="py-0.5 text-[9px] font-mono uppercase tracking-[0.15em] text-zinc-500 sm:py-1 sm:text-[10px] sm:tracking-[0.2em]"
            >
              {wd}
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-7 gap-0.5 sm:gap-1 md:gap-2 auto-rows-fr">
          {leadingBlanks}
          {days}
        </div>
      </div>
    </div>
  );
}
