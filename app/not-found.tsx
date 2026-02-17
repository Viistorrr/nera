import Link from "next/link";
import { Hammer, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#D4AF37]/25 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#D4AF37]/50 bg-black/80 text-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)]">
            <Hammer className="h-9 w-9 animate-bounce" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-400">
            <Sparkles className="h-3 w-3 text-[#D4AF37]" />
            En construcción
          </p>
          <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
            Esta vista del Negrooverso aún se está ensamblando
          </h1>
          <p className="max-w-xl text-sm text-zinc-400">
            Estamos trabajando para activar esta sección. Muy pronto podrás
            explorar más servicios, nodos de conocimiento y rutas del
            Negrooverso desde aquí.
          </p>
        </div>
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/50 p-4 text-left text-xs text-zinc-300 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/2 animate-[pulse_1.4s_ease-in-out_infinite] bg-gradient-to-r from-[#D4AF37] via-zinc-50 to-[#D4AF37]" />
        </div>
        <p>
          Piensa esta pantalla como un pequeño taller donde NERA compila nuevas
          experiencias. Si llegaste aquí desde una card o enlace, esa pieza del
          sistema está en{" "}
          <span className="font-mono text-[11px] uppercase text-[#D4AF37]">
            modo prototipo
          </span>
          .
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[11px]">
        <Link
          href="/"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono uppercase tracking-[0.2em] text-zinc-200 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        >
          Volver al Dashboard
        </Link>
        <Link
          href="/marketplace"
          className="rounded-full border border-white/15 bg-white/0 px-4 py-1.5 font-mono uppercase tracking-[0.2em] text-zinc-400 transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        >
          Ir al Marketplace de Servicios
        </Link>
      </div>
    </div>
  );
}

