"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookText,
  BriefcaseBusiness,
  Calendar,
  FlaskConical,
  Gamepad2,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "01", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "02", label: "Interactiva", icon: Gamepad2, href: "/interactiva" },
  { id: "03", label: "En el tiempo...", icon: Calendar, href: "/en-el-tiempo" },
  {
    id: "04",
    label: "Marketplace de Servicios",
    icon: BriefcaseBusiness,
    href: "/marketplace",
  },
  { id: "05", label: "AI_Lab", icon: FlaskConical },
  { id: "06", label: "Knowledge_Base", icon: BookText },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,_#272727_0,_#050505_55%,_#000_100%)] text-zinc-100">
      {/* Botón hamburguesa: visible solo en pantallas menores a lg, fijo a la izquierda */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Abrir menú"
        className="fixed left-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/90 text-zinc-300 shadow-lg backdrop-blur-xl transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] sm:left-4 sm:top-4 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay cuando el menú está abierto (solo móvil/tablet) */}
      <button
        type="button"
        onClick={closeMenu}
        aria-label="Cerrar menú"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar: en lg siempre visible; en móvil/tablet panel deslizante con transform */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 flex w-72 flex-col justify-between border-r border-white/5 bg-black/95 px-4 py-6 shadow-2xl backdrop-blur-xl
          transition-transform duration-300 ease-out
          lg:relative lg:z-auto lg:w-60 lg:translate-x-0 lg:shadow-none
          ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between lg:mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-xl" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/80 text-xs font-semibold tracking-[0.25em]">
                  N
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold leading-none">NERA</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">
                  La del Negrooverso
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-1 text-sm lg:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const href = "href" in item ? item.href : undefined;
              const isActive = href
                ? pathname === href || (href !== "/" && pathname.startsWith(href + "/"))
                : false;

              const baseClass =
                "group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition " +
                (isActive
                  ? "border-[#D4AF37]/40 bg-[#D4AF37]/5 text-zinc-50 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                  : "border-white/5 bg-white/0 text-zinc-400 hover:border-[#D4AF37]/40 hover:bg-white/5 hover:text-zinc-50");

              if (href) {
                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={closeMenu}
                    className={baseClass}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-[#D4AF37]" />
                    <span className="text-xs font-medium tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={closeMenu}
                  className={baseClass}
                >
                  <Icon className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-[#D4AF37]" />
                  <span className="text-xs font-medium tracking-wide">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/5 pt-4 text-[11px] text-zinc-500">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
              NERA Ecosistema &amp; Repositorio
            </p>
            <p className="mt-2 font-mono text-xs">
              NERA v1.0.0{" "}
              <span className="text-emerald-400">· Online</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Área principal: margen izquierdo en móvil para no quedar bajo el botón hamburguesa; en lg el sidebar ocupa espacio normal */}
      <main className="flex min-h-screen flex-1 flex-col pl-14 pt-2 sm:pl-16 lg:pl-0 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
