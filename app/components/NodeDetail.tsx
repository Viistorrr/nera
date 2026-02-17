"use client";

import { motion } from "framer-motion";
import { BadgeCheck, BrainCircuit, BriefcaseBusiness } from "lucide-react";
import type { KnowledgeNode, ServiceNode, NodeKind } from "../data/nodes";

type NodeDetailProps =
  | ({ kind: "knowledge" } & KnowledgeNode)
  | ({ kind: "service" } & ServiceNode);

export function NodeDetail(props: NodeDetailProps) {
  const isKnowledge = props.kind === "knowledge";

  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-8 border-b border-white/5 pb-6 sm:mb-10 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
            {isKnowledge ? (
              <BrainCircuit className="h-5 w-5" />
            ) : (
              <BriefcaseBusiness className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
              {isKnowledge ? "Nodo de conocimiento" : "Servicio profesional"}
            </p>
            <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
              {props.title}
            </h1>
          </div>
        </motion.div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
        className="grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.3fr)]"
      >
        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_0_60px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_60%)]" />
          </div>

          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.9)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-300">
                {isKnowledge ? props.badge : props.category}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-200">
              {props.description}
            </p>

            {isKnowledge ? (
              <p className="text-xs text-zinc-400">
                Este nodo forma parte de la Knowledge Base del Negrooverso. Se
                puede expandir con ejemplos, enlaces a repositorios, cápsulas de
                contexto y trazas históricas.
              </p>
            ) : (
              <p className="text-xs text-zinc-400">
                Este servicio puede conectarse con flujos de trabajo de NERA:
                desde orquestación de proyectos, hasta acompañamiento creativo y
                técnico en distintas fases.
              </p>
            )}
          </div>
        </article>

        <aside className="space-y-4">
          {isKnowledge ? (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-300 backdrop-blur-xl sm:p-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                Meta
              </p>
              <p className="mt-2 text-sm text-zinc-100">{props.meta}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-300 backdrop-blur-xl sm:p-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                Etiquetas
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {props.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-300 backdrop-blur-xl sm:p-5">
            <p className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
              <BadgeCheck className="h-3 w-3 text-[#D4AF37]" />
              Conexiones
            </p>
            <p className="mt-2">
              Aquí podremos listar relaciones con otros nodos del Negrooverso:
              proyectos, logs, cápsulas de conocimiento o servicios
              complementarios.
            </p>
          </div>
        </aside>
      </motion.section>
    </div>
  );
}

