"use client";

import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Target, 
  Sparkles,
  Lightbulb,
  Globe,
  Heart,
  Shield,
  TrendingUp,
  Building2,
  Cpu,
  Zap
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Identidad",
    description: "Afirmación y construcción de identidades afrodescendientes desde la memoria histórica, la cultura y la tradición oral."
  },
  {
    icon: BookOpen,
    title: "Conocimiento",
    description: "Preservación y transmisión de saberes ancestrales, conocimientos tradicionales y memoria colectiva del Negrooverso."
  },
  {
    icon: Shield,
    title: "Representación",
    description: "Visibilización auténtica y diversa de las comunidades negras en todos los espacios: educación, cultura, tecnología y sociedad."
  },
  {
    icon: Sparkles,
    title: "Tradición",
    description: "Reconocimiento y valoración de las tradiciones orales, prácticas culturales y sabiduría ancestral como tecnologías de resistencia."
  }
];

const impactAreas = [
  {
    icon: GraduationCap,
    title: "Instituciones Educativas",
    description: "NERA transforma la educación formal al proporcionar contenidos curriculares afrocentrados, herramientas pedagógicas interactivas y recursos que permiten a docentes y estudiantes construir conocimiento desde la identidad negra. Las instituciones pueden integrar NERA como plataforma complementaria que enriquece los procesos de enseñanza-aprendizaje con perspectiva decolonial.",
    benefits: [
      "Contenidos curriculares afrocentrados",
      "Herramientas pedagógicas interactivas",
      "Recursos para docentes y estudiantes",
      "Perspectiva decolonial en la educación"
    ]
  },
  {
    icon: Building2,
    title: "Entidades y Organizaciones",
    description: "Organizaciones comunitarias, ONGs, instituciones culturales y entidades públicas encuentran en NERA una herramienta para fortalecer sus programas de identidad, memoria histórica y educación comunitaria. La plataforma facilita la documentación, preservación y difusión de conocimientos locales y procesos organizativos.",
    benefits: [
      "Fortalecimiento de programas comunitarios",
      "Documentación de memoria histórica",
      "Herramientas para educación comunitaria",
      "Preservación de conocimientos locales"
    ]
  },
  {
    icon: Users,
    title: "Población Negra",
    description: "Para las comunidades afrodescendientes, NERA es un espacio de construcción colectiva de identidad, un repositorio de memoria y un motor de empoderamiento. La plataforma permite que las personas negras se reconozcan en historias, conocimientos y representaciones que tradicionalmente han sido negadas o invisibilizadas.",
    benefits: [
      "Construcción colectiva de identidad",
      "Repositorio de memoria accesible",
      "Empoderamiento comunitario",
      "Visibilización de historias negras"
    ]
  }
];

export default function QuienesSomosPage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      {/* Header */}
      <header className="mb-6 border-b border-white/5 pb-6 sm:mb-8 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
              Quiénes Somos
            </p>
            <h1 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
              NERA · Neural Ecosystem &amp; Repository Assistant
            </h1>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-3 text-sm text-zinc-400"
        >
          Una plataforma educativa que construye identidad, conocimiento y tradición desde el Negrooverso.
        </motion.p>
      </header>

      {/* Qué es NERA y el Negrooverso */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6 md:p-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">
            ¿Qué es NERA y qué es el Negrooverso?
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          <p>
            <strong className="text-[#D4AF37]">NERA</strong> (Neural Ecosystem &amp; Repository Assistant) es una plataforma educativa digital diseñada como herramienta de construcción de identidad, conocimiento y tradición para las comunidades afrodescendientes. Nacida desde el <strong className="text-zinc-100">Negrooverso</strong> —un universo creativo que conecta África, la diáspora y los territorios afro en América Latina—, NERA busca transformar la educación desde una perspectiva afrocentrada y decolonial.
          </p>
          <p>
            El <strong className="text-[#D4AF37]">Negrooverso</strong> es el tejido que integra todo lo que hace NERA: identidad, representación, memoria, territorio, tradición, tecnología y pedagogía. Es un universo en expansión donde se cruzan historias, saberes, prácticas culturales y procesos organizativos de las comunidades negras, y donde la educación se piensa como herramienta de libertad y construcción colectiva.
          </p>
          <p>
            NERA no es solo una aplicación o un repositorio de información. Es un <strong className="text-zinc-100">ecosistema educativo</strong> que habita el Negrooverso e integra conocimiento histórico, memoria colectiva, representación cultural y herramientas interactivas para construir identidades positivas y fortalecer la educación desde la experiencia negra.
          </p>
          <p>
            La plataforma funciona como un <strong className="text-zinc-100">asistente neural</strong> que coordina proyectos, conocimiento y trazas de este Negrooverso educativo, facilitando el acceso a contenidos, juegos, vistas interactivas, reportes y recursos que permiten a usuarios, instituciones y comunidades construir conocimiento desde la identidad afrodescendiente.
          </p>
        </div>
      </motion.section>

      {/* Tecnología, IA y Entorno Seguro */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-8 rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-black/40 via-[#D4AF37]/5 to-black/40 p-5 shadow-[0_0_60px_rgba(212,175,55,0.15)] backdrop-blur-xl sm:p-6 md:p-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">
            Tecnología en la Era Digital: IA y Entorno Libre de Sesgos
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          <p>
            NERA es una herramienta tecnológica diseñada para la <strong className="text-[#D4AF37]">revolución industrial digital</strong> que estamos viviendo. En una era donde la tecnología y la inteligencia artificial transforman todos los aspectos de la vida, NERA utiliza estas herramientas de manera consciente y estratégica para <strong className="text-zinc-100">favorecer el acceso a información</strong> y construir conocimiento desde la identidad negra.
          </p>
          
          <div className="space-y-3 pl-4 border-l-2 border-[#D4AF37]/30">
            <div>
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                <Zap className="h-4 w-4" />
                Integración de Inteligencia Artificial
              </h3>
              <p className="text-sm text-zinc-300">
                NERA integra tecnologías de inteligencia artificial para facilitar la búsqueda, organización y presentación de conocimiento afrocentrado. Sin embargo, a diferencia de muchas plataformas tecnológicas que replican y amplifican sesgos raciales, NERA está diseñada específicamente para <strong className="text-[#D4AF37]">voltear esos sesgos</strong>, construyendo conceptos y narrativas desde la identidad negra que engrandecen y empoderan a las personas afrodescendientes.
              </p>
            </div>

            <div>
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                <Shield className="h-4 w-4" />
                Entorno Seguro y Libre de Sesgos
              </h3>
              <p className="text-sm text-zinc-300">
                NERA se compromete a ser un <strong className="text-[#D4AF37]">entorno seguro</strong>, libre de todo tipo de sesgos que minimicen, estereotipen o invisibilicen a la población negra. La plataforma está construida con una conciencia crítica sobre cómo la tecnología puede perpetuar discriminación y desigualdad, y por eso cada algoritmo, cada recomendación y cada interacción está diseñada para <strong className="text-zinc-100">voltear los sesgos implícitos</strong> que existen en los sistemas tecnológicos tradicionales.
              </p>
            </div>

            <div>
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                <TrendingUp className="h-4 w-4" />
                Construcción desde la Identidad para Engrandecer
              </h3>
              <p className="text-sm text-zinc-300">
                En lugar de simplemente agregar contenido sobre personas negras a sistemas existentes, NERA <strong className="text-[#D4AF37]">construye conceptos desde la identidad negra</strong>. Esto significa que cada funcionalidad, cada juego, cada nodo de conocimiento y cada interacción está pensada para engrandecer a las personas negras, mostrar su agencia, su resistencia, su creatividad y su contribución al mundo. La tecnología se pone al servicio de esta construcción positiva y afirmativa.
              </p>
            </div>

            <div>
              <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                <Globe className="h-4 w-4" />
                Acceso Democrático a la Información
              </h3>
              <p className="text-sm text-zinc-300">
                En la era digital, el acceso a información es poder. NERA utiliza tecnología para <strong className="text-[#D4AF37]">democratizar el acceso</strong> a conocimiento afrocentrado que tradicionalmente ha sido marginado o invisibilizado. La plataforma hace que este conocimiento sea accesible, navegable y habitable para cualquier persona, institución o comunidad que busque construir identidad y conocimiento desde la experiencia negra.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4">
            <p className="text-sm leading-relaxed text-zinc-200">
              <strong className="text-[#D4AF37]">NERA representa una apuesta tecnológica decolonial:</strong> usar las herramientas más avanzadas de la revolución digital (IA, algoritmos, interfaces interactivas) para construir un futuro donde la tecnología no reproduzca desigualdades, sino que las transforme. Un futuro donde las personas negras no solo sean usuarios de tecnología, sino creadoras y protagonistas de sistemas tecnológicos que las engrandezcan y las representen auténticamente.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Misión y Visión */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="text-lg font-semibold text-zinc-100">Misión</h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Educar desde la <strong className="text-[#D4AF37]">identidad</strong>, la <strong className="text-[#D4AF37]">representación</strong> y la <strong className="text-[#D4AF37]">memoria histórica</strong> para construir conocimiento que afirme y valore las experiencias, saberes y tradiciones de las comunidades afrodescendientes. NERA busca ser una herramienta que permita a instituciones, entidades y población negra acceder, construir y preservar conocimiento desde una perspectiva afrocentrada y decolonial.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#D4AF37]" />
            <h2 className="text-lg font-semibold text-zinc-100">Visión</h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Ser un <strong className="text-[#D4AF37]">motor de cambio</strong> en la educación que transforme cómo se enseña y aprende sobre la historia, cultura e identidad negra. NERA aspira a convertirse en la plataforma de referencia para la construcción de conocimiento afrocentrado, impactando instituciones educativas, organizaciones comunitarias y población negra en Colombia, América Latina y la diáspora africana global.
          </p>
        </motion.section>
      </div>

      {/* Valores Fundamentales */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mb-8"
      >
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">
            Valores Fundamentales
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/5">
                  <Icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-zinc-100">
                  {value.title}
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Construcción de Identidad y Conocimiento */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-8 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6 md:p-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">
            Construcción de Identidad, Conocimiento y Tradición
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
          <p>
            NERA opera como una <strong className="text-[#D4AF37]">herramienta de construcción</strong> del Negrooverso educativo, que permite a usuarios, comunidades e instituciones participar activamente en la creación y preservación de conocimiento afrocentrado. La plataforma integra múltiples dimensiones:
          </p>
          
          <div className="space-y-3 pl-4 border-l-2 border-[#D4AF37]/30">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-[#D4AF37]">
                Construcción de Identidad
              </h3>
              <p className="text-sm text-zinc-300">
                A través de juegos interactivos, líneas de tiempo históricas, nodos de conocimiento y recorridos pedagógicos, NERA facilita procesos de reconocimiento y afirmación de identidades afrodescendientes. Cada vista de la app (dashboard, interactivos, marketplace, reportes, efemérides) es una puerta del Negrooverso que ayuda a nombrar, sentir y pensar la experiencia negra.
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold text-[#D4AF37]">
                Preservación de Conocimiento
              </h3>
              <p className="text-sm text-zinc-300">
                NERA funciona como repositorio de memoria histórica, saberes ancestrales y conocimientos tradicionales que han sido transmitidos oralmente durante generaciones. El Negrooverso se alimenta de estas memorias y las organiza en rutas, nodos, juegos y visualizaciones que permiten que ese conocimiento sea habitable, navegable y accesible para futuras generaciones.
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold text-[#D4AF37]">
                Valoración de Tradición
              </h3>
              <p className="text-sm text-zinc-300">
                La tradición oral, las prácticas culturales y la sabiduría ancestral son reconocidas como tecnologías de resistencia y construcción. En el Negrooverso de NERA, estas tradiciones no son solo contenido: son la lógica misma desde la que se diseña la experiencia, los juegos, los recorridos y las formas de aprender.
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold text-[#D4AF37]">
                Representación Auténtica
              </h3>
              <p className="text-sm text-zinc-300">
                La plataforma promueve representaciones auténticas y diversas de las comunidades afrodescendientes, combatiendo estereotipos y construyendo narrativas positivas que reflejen la riqueza, complejidad y diversidad de la experiencia negra en Colombia, América Latina y la diáspora global. Todo el Negrooverso de NERA está pensado para que las personas negras se vean, se escuchen y se reconozcan en la interfaz, en los contenidos y en las dinámicas de aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Impacto */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-8"
      >
        <div className="mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-lg font-semibold text-zinc-100 sm:text-xl">
            Impacto y Transformación
          </h2>
        </div>
        <div className="space-y-6">
          {impactAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + index * 0.1 }}
                className="rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/5">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {area.title}
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-zinc-300">
                  {area.description}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {area.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
                    >
                      <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <p className="text-xs text-zinc-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Motor de Cambio */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 via-black/40 to-black/40 p-6 shadow-[0_0_60px_rgba(212,175,55,0.2)] backdrop-blur-xl sm:p-8"
      >
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#D4AF37]" />
          <h2 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
            NERA como Motor de Cambio en la Educación
          </h2>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-zinc-200 sm:text-base">
          <p>
            NERA no busca simplemente agregar contenido sobre historia negra a los currículos existentes. La plataforma propone una <strong className="text-[#D4AF37]">transformación fundamental</strong> en cómo se concibe y practica la educación, desplazando perspectivas eurocéntricas y coloniales hacia enfoques afrocentrados y decoloniales.
          </p>
          <p>
            Como <strong className="text-[#D4AF37]">motor de cambio</strong>, NERA:
          </p>
          <ul className="space-y-2 pl-4">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>
                <strong className="text-[#D4AF37]">Descoloniza el conocimiento:</strong> Coloca a África y las experiencias africanas en el centro del análisis histórico y cultural, reconociendo las contribuciones de los pueblos africanos a la civilización mundial.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>
                <strong className="text-[#D4AF37]">Transforma la pedagogía:</strong> Proporciona herramientas interactivas, juegos educativos y recursos que permiten aprender desde la experiencia, la memoria y la tradición oral, no solo desde textos escritos.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>
                <strong className="text-[#D4AF37]">Empodera comunidades:</strong> Permite que las comunidades negras sean protagonistas de su propia educación, construyendo conocimiento desde sus propias experiencias, saberes y tradiciones.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>
                <strong className="text-[#D4AF37]">Crea redes de conocimiento:</strong> Conecta instituciones, organizaciones y comunidades en una red colaborativa que comparte y construye conocimiento afrocentrado.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>
                <strong className="text-[#D4AF37]">Impacta el futuro:</strong> Al transformar la educación presente, NERA está construyendo las bases para un futuro donde las identidades negras sean reconocidas, valoradas y celebradas en todos los espacios educativos y sociales.
              </span>
            </li>
          </ul>
        </div>
      </motion.section>

      {/* CTA Final */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
        className="mt-8 rounded-xl border border-white/10 bg-black/40 p-6 text-center backdrop-blur-xl sm:p-8"
      >
        <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
          <strong className="text-[#D4AF37]">NERA</strong> es más que una plataforma: es un movimiento educativo que construye identidad, preserva memoria y transforma la educación desde el Negrooverso. Únete a esta construcción colectiva de conocimiento y cambio.
        </p>
      </motion.div>
    </div>
  );
}
