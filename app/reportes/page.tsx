"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, MousePointerClick, Globe, TrendingUp, X, MapPin, Users, Repeat } from "lucide-react";
import { getAggregatedStats, type ViewInteraction } from "../lib/tracking";

type Stats = ReturnType<typeof getAggregatedStats>;

export default function ReportesPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedView, setSelectedView] = useState<ViewInteraction | null>(null);

  const loadStats = () => {
    const data = getAggregatedStats();
    setStats(data);
  };

  useEffect(() => {
    loadStats();
    // Recargar cada 2 segundos para datos en tiempo real
    const interval = setInterval(loadStats, 2000);
    return () => clearInterval(interval);
  }, []);


  if (!stats) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
        <div className="text-center text-zinc-400">Cargando reportes...</div>
      </div>
    );
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  // Calcular datos para gráficas
  const referrerEntries = Object.entries(stats.referrers).sort(([, a], [, b]) => b - a);
  const maxDuration = Math.max(...stats.viewStats.map(v => v.totalDuration), 1);
  const maxInteractions = Math.max(...stats.viewStats.map(v => v.totalInteractions), 1);
  const totalReferrers = Object.values(stats.referrers).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-6 border-b border-white/5 pb-6 sm:mb-8 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
                Insights & Reportes Administrativos
              </p>
              <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
                Dashboard Ejecutivo · NERA
              </h1>
            </div>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-3 text-sm text-zinc-400"
        >
          Análisis ejecutivo de interacciones, tiempo en cada vista y comportamiento de usuarios en NERA.
        </motion.p>
      </header>

      {/* Resumen general - Tiles principales */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <Users className="h-4 w-4" />
            <p className="text-[10px] font-mono uppercase tracking-[0.18em]">Visitas Únicas</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">{stats.uniqueVisits}</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            de {stats.totalViews} totales
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <Repeat className="h-4 w-4" />
            <p className="text-[10px] font-mono uppercase tracking-[0.18em]">Usuarios Recurrentes</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">{stats.returningUsers}</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {stats.uniqueVisits > 0 ? Math.round((stats.returningUsers / stats.uniqueVisits) * 100) : 0}% del total
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <TrendingUp className="h-4 w-4" />
            <p className="text-[10px] font-mono uppercase tracking-[0.18em]">Vistas Totales</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">{stats.totalViews}</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            {stats.viewStats.length} vistas únicas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="h-4 w-4" />
            <p className="text-[10px] font-mono uppercase tracking-[0.18em]">Tiempo Total</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">
            {formatDuration(stats.totalDuration)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Promedio: {stats.totalViews > 0 ? formatDuration(stats.totalDuration / stats.totalViews) : "0s"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <MousePointerClick className="h-4 w-4" />
            <p className="text-[10px] font-mono uppercase tracking-[0.18em]">Interacciones</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#D4AF37]">{stats.totalInteractions}</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Promedio: {stats.totalViews > 0 ? Math.round(stats.totalInteractions / stats.totalViews) : 0} por vista
          </p>
        </motion.div>
      </div>

      {/* Origen de Tráfico - Tile compacto */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl"
      >
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold text-zinc-100">
          <Globe className="h-3.5 w-3.5 text-[#D4AF37]" />
          Origen de Tráfico
        </h2>
        <div className="space-y-2">
          {referrerEntries.length === 0 ? (
            <p className="text-xs text-zinc-500">No hay datos de referrers aún.</p>
          ) : (
            referrerEntries.slice(0, 5).map(([ref, count], idx) => {
              const percentage = totalReferrers > 0 ? (count / totalReferrers) * 100 : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="truncate text-zinc-200" title={ref}>
                      {ref.length > 30 ? `${ref.substring(0, 30)}...` : ref}
                    </span>
                    <span className="text-zinc-400 font-medium">{count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className="h-full bg-[#D4AF37]"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.section>

      {/* Gráficas administrativas */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Gráfica de tiempo por vista */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <Clock className="h-4 w-4 text-[#D4AF37]" />
            Tiempo por Vista
          </h2>
          <div className="space-y-3">
            {stats.viewStats.length === 0 ? (
              <p className="text-sm text-zinc-500">No hay datos de tiempo aún.</p>
            ) : (
              stats.viewStats.map((view, idx) => {
                const percentage = (view.totalDuration / maxDuration) * 100;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-200">{view.viewName}</span>
                      <span className="text-zinc-400">{formatDuration(view.totalDuration)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37]"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span>{view.visits} visita{view.visits !== 1 ? "s" : ""}</span>
                      <span>Promedio: {formatDuration(view.avgDuration)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.section>

        {/* Gráfica de interacciones por vista */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <MousePointerClick className="h-4 w-4 text-[#D4AF37]" />
            Interacciones por Vista
          </h2>
          <div className="space-y-3">
            {stats.viewStats.length === 0 ? (
              <p className="text-sm text-zinc-500">No hay datos de interacciones aún.</p>
            ) : (
              stats.viewStats.map((view, idx) => {
                const percentage = (view.totalInteractions / maxInteractions) * 100;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-200">{view.viewName}</span>
                      <span className="text-zinc-400">{view.totalInteractions}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37]"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span>{view.visits} visita{view.visits !== 1 ? "s" : ""}</span>
                      <span>Promedio: {Math.round(view.totalInteractions / view.visits)} por visita</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.section>
      </div>

      {/* Historial de Vistas */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6"
      >
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-100">
          <BarChart3 className="h-4 w-4 text-[#D4AF37]" />
          Historial Detallado de Vistas
        </h2>
        <div className="max-h-[400px] space-y-2 overflow-y-auto pr-1">
          {stats.views.length === 0 ? (
            <p className="text-sm text-zinc-500">No hay historial de vistas aún.</p>
          ) : (
            stats.views
              .slice()
              .reverse()
              .map((view, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedView(view)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-3 text-left transition hover:border-[#D4AF37]/40 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-100">{view.viewName}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-400">{view.path}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-zinc-500">
                        {view.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDuration(view.duration)}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <MousePointerClick className="h-3 w-3" />
                          {view.interactions} clicks
                        </span>
                        {view.location && (
                          <span className="flex items-center gap-1 text-[#D4AF37]">
                            <MapPin className="h-3 w-3" />
                            {view.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-600">
                      {new Date(view.startTime).toLocaleTimeString()}
                    </div>
                  </div>
                </button>
              ))
          )}
        </div>
      </motion.section>

      {/* Modal de detalle de vista */}
      {selectedView && (
        <>
          <div
            onClick={() => setSelectedView(null)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-black/95 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-100">Detalle de Vista</h3>
              <button
                onClick={() => setSelectedView(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Vista</p>
                <p className="mt-1 text-zinc-100">{selectedView.viewName}</p>
                <p className="text-xs text-zinc-400">{selectedView.path}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Duración</p>
                  <p className="mt-1 text-zinc-100">
                    {selectedView.duration ? formatDuration(selectedView.duration) : "En curso"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Interacciones</p>
                  <p className="mt-1 text-zinc-100">{selectedView.interactions}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Origen</p>
                <p className="mt-1 text-zinc-100">{selectedView.referrer || "Directo"}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Ciudad / Ubicación
                </p>
                <p className="mt-1 text-zinc-100">{selectedView.location || "Ubicación desconocida"}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Hora de inicio</p>
                <p className="mt-1 text-zinc-100">
                  {new Date(selectedView.startTime).toLocaleString()}
                </p>
              </div>
              {selectedView.endTime && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500">Hora de fin</p>
                  <p className="mt-1 text-zinc-100">
                    {new Date(selectedView.endTime).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
