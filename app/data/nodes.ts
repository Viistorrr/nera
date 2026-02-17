export type KnowledgeNode = {
  id: string;
  badge: string;
  title: string;
  description: string;
  meta: string;
};

export type ServiceNode = {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
};

export type NodeKind = "knowledge" | "service";

export const knowledgeCards: KnowledgeNode[] = [
  {
    id: "kb-01",
    badge: "Atlas Conceptual",
    title: "Mapa semántico del Negrooverso",
    description:
      "Núcleo de conceptos, entidades y relaciones que estructuran el ecosistema creativo y técnico.",
    meta: "128 nodos · 432 relaciones activas",
  },
  {
    id: "kb-02",
    badge: "Playbooks",
    title: "Protocolos de despliegue y experimentación",
    description:
      "Recetarios operativos para mover código, datos y modelos entre entornos sin perder contexto.",
    meta: "24 flujos · 6 entornos conectados",
  },
  {
    id: "kb-03",
    badge: "Context Streams",
    title: "Historial inteligente de repositorios",
    description:
      "Línea de tiempo curada de commits, decisiones de diseño y eventos clave por proyecto.",
    meta: "∞ trazas · indexación incremental",
  },
  {
    id: "kb-04",
    badge: "Ontologías",
    title: "Lenguajes compartidos entre humanos y modelos",
    description:
      "Definiciones precisas para que NERA hable el mismo idioma que tu ecosistema.",
    meta: "37 dominios · 12 taxonomías activas",
  },
  {
    id: "kb-05",
    badge: "Knowledge Capsules",
    title: "Paquetes portables de conocimiento",
    description:
      "Unidades autocontenidas con contexto, código y samples listos para ser inyectados en modelos.",
    meta: "56 cápsulas · 9 colecciones",
  },
  {
    id: "kb-06",
    badge: "Field Logs",
    title: "Bitácoras de experimentos y sesiones",
    description:
      "Registro estructurado de conversaciones, prompts y resultados que vale la pena recordar.",
    meta: "En vivo · logging asistido",
  },
];

export const services: ServiceNode[] = [
  {
    id: "svc-01",
    category: "Estrategia & Marketing",
    title: "Narrativas de marca afro-diaspórica",
    description:
      "Diseño de campañas, branding y storytelling anclados en memoria, territorio y futuro negro.",
    tags: ["Branding", "Campañas", "Contenido"],
  },
  {
    id: "svc-02",
    category: "Consultorías",
    title: "Consultoría en proyectos del Negrooverso",
    description:
      "Acompañamiento estratégico para aterrizar ideas en roadmaps, playbooks y sistemas vivos.",
    tags: ["Product", "Roadmap", "Playbooks"],
  },
  {
    id: "svc-03",
    category: "Ingeniería & Datos",
    title: "Arquitecturas de IA contextual",
    description:
      "Diseño de pipelines, ontologías y ecosistemas de datos para experiencias inteligentes.",
    tags: ["IA", "Ontologías", "Pipelines"],
  },
  {
    id: "svc-04",
    category: "Historia & Memoria",
    title: "Curaduría histórica cimarrona",
    description:
      "Investigación, línea de tiempo y relatos sobre procesos de resistencia y emancipación.",
    tags: ["Historia", "Memoria", "Cimarronaje"],
  },
  {
    id: "svc-05",
    category: "Psicología & Cuidado",
    title: "Acompañamiento psicosocial afrocentrado",
    description:
      "Sesiones y dispositivos de cuidado emocional con enfoque comunitario y decolonial.",
    tags: ["Psicología", "Cuidado", "Comunidades"],
  },
  {
    id: "svc-06",
    category: "Formación & Talleres",
    title: "Laboratorios pedagógicos del Negrooverso",
    description:
      "Talleres, cursos y experiencias educativas para activar pensamiento crítico y creativo.",
    tags: ["Educación", "Talleres", "Laboratorios"],
  },
  {
    id: "svc-07",
    category: "Asesorías Especializadas",
    title: "Asesoría en proyectos culturales",
    description:
      "Guía para festivales, residencias, curadurías y programas culturales con enfoque afro.",
    tags: ["Cultura", "Residencias", "Festivales"],
  },
  {
    id: "svc-08",
    category: "Territorio & Comunidad",
    title: "Diseño de mapas y cartografías vivas",
    description:
      "Mapeos colaborativos de territorio, actores y procesos para proyectos comunitarios.",
    tags: ["Cartografía", "Territorio", "Comunidad"],
  },
];

export function getNodeById(id: string):
  | ({ kind: "knowledge" } & KnowledgeNode)
  | ({ kind: "service" } & ServiceNode)
  | null {
  const knowledge = knowledgeCards.find((n) => n.id === id);
  if (knowledge) {
    return { kind: "knowledge", ...knowledge };
  }
  const service = services.find((s) => s.id === id);
  if (service) {
    return { kind: "service", ...service };
  }
  return null;
}

