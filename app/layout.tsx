import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { BookText, FlaskConical, FolderKanban, LayoutDashboard, ScrollText } from "lucide-react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NERA · Neural Ecosystem & Repository Assistant",
  description: "La inteligencia central del Negrooverso para proyectos, conocimiento y trazas.",
};

const navItems = [
  { id: "01", label: "Dashboard", icon: LayoutDashboard },
  { id: "02", label: "Projects", icon: FolderKanban },
  { id: "03", label: "AI_Lab", icon: FlaskConical },
  { id: "04", label: "Knowledge_Base", icon: BookText },
  { id: "05", label: "Logs", icon: ScrollText },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased bg-[#1a1a1a] text-zinc-100`}
      >
        <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,_#272727_0,_#050505_55%,_#000_100%)] text-zinc-100">
          <aside className="flex w-60 flex-col justify-between border-r border-white/5 bg-black/60 px-4 py-6 backdrop-blur-xl">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-xl" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/80 text-xs font-semibold tracking-[0.25em]">
                    N
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">
                    Core Intelligence
                  </p>
                  <p className="text-lg font-semibold leading-none">NERA</p>
                </div>
              </div>

              <nav className="space-y-1 text-sm">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isPrimary = item.id === "01";

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`group flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${
                        isPrimary
                          ? "border-[#D4AF37]/40 bg-[#D4AF37]/5 text-zinc-50 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                          : "border-white/5 bg-white/0 text-zinc-400 hover:border-[#D4AF37]/40 hover:bg-white/5 hover:text-zinc-50"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 group-hover:text-[#D4AF37]">
                        {item.id}
                      </span>
                      <Icon className="h-4 w-4 text-zinc-500 group-hover:text-[#D4AF37]" />
                      <span className="text-xs font-medium tracking-wide">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4 text-[11px] text-zinc-500">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                Neural Ecosystem &amp; Repository Assistant
              </p>
              <p className="mt-2 font-mono text-xs">
                NERA v1.0.0{" "}
                <span className="text-emerald-400">· Online</span>{" "}
                <span className="text-zinc-400">/ Sobrio</span>
              </p>
            </div>
          </aside>

          <main className="flex min-h-screen flex-1 flex-col">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
