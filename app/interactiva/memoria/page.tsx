"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Grid3X3, RotateCcw, Trophy, Lightbulb, X, Share2, Twitter, Facebook, Linkedin } from "lucide-react";

// Pares de conceptos relacionados con historia, representación y cultura e identidad negra
const CARD_PAIRS = [
  { 
    id: 1, 
    concept: "CIMARRONAJE", 
    match: "Resistencia de esclavizados que escaparon",
    explanation: "El cimarronaje fue una forma de resistencia activa donde personas esclavizadas escapaban de sus captores para construir comunidades libres. Esta práctica histórica representa la lucha por la libertad y la autonomía, siendo fundamental en la construcción de identidades afrodescendientes en América Latina."
  },
  { 
    id: 2, 
    concept: "PALENQUE", 
    match: "Comunidad de cimarrones libres",
    explanation: "Los palenques fueron comunidades autónomas fundadas por cimarrones en territorios de difícil acceso. En Colombia, San Basilio de Palenque es el primer pueblo libre de América, declarado Patrimonio Inmaterial de la Humanidad. Representan la resistencia, la organización comunitaria y la preservación de tradiciones africanas."
  },
  { 
    id: 3, 
    concept: "QUILOMBO", 
    match: "Comunidad de resistencia en Brasil",
    explanation: "Los quilombos fueron comunidades de resistencia formadas por personas esclavizadas que escaparon en Brasil. El más conocido fue el Quilombo dos Palmares, que duró casi un siglo. Hoy, los quilombos contemporáneos son comunidades reconocidas que luchan por sus derechos territoriales y culturales."
  },
  { 
    id: 4, 
    concept: "KILOMBO", 
    match: "Comunidad de resistencia en África",
    explanation: "El kilombo es una organización social y militar de origen africano, especialmente en Angola. Representa la resistencia organizada y la capacidad de las comunidades africanas para defenderse y mantener su autonomía frente a la colonización y la esclavización."
  },
  { 
    id: 5, 
    concept: "DIÁSPORA", 
    match: "Dispersión de pueblos africanos",
    explanation: "La diáspora africana se refiere a la dispersión forzada de millones de africanos a través del Atlántico durante la trata transatlántica de esclavos. Esta experiencia compartida conecta a comunidades afrodescendientes en América, el Caribe y otras partes del mundo, creando identidades diaspóricas ricas y diversas."
  },
  { 
    id: 6, 
    concept: "PANAFRICANISMO", 
    match: "Unidad y solidaridad de pueblos africanos",
    explanation: "El panafricanismo es un movimiento político, cultural e ideológico que promueve la unidad y solidaridad entre todos los pueblos de ascendencia africana. Busca fortalecer los lazos entre África y sus diásporas, luchando contra el racismo y promoviendo la autodeterminación y el desarrollo de las comunidades negras."
  },
  { 
    id: 7, 
    concept: "NEGRITUD", 
    match: "Movimiento de afirmación de la identidad negra",
    explanation: "La Negritud es un movimiento literario y filosófico desarrollado por intelectuales negros como Aimé Césaire y Léopold Sédar Senghor. Afirma el valor de la cultura negra, rechaza la asimilación y celebra la identidad africana y afrodescendiente como fuente de orgullo y resistencia."
  },
  { 
    id: 8, 
    concept: "AFROCENTRISMO", 
    match: "Enfoque centrado en la experiencia africana",
    explanation: "El afrocentrismo es una perspectiva intelectual y cultural que coloca a África y las experiencias africanas en el centro del análisis histórico y cultural. Busca descolonizar el conocimiento y reconocer las contribuciones de los pueblos africanos a la civilización mundial."
  },
  { 
    id: 9, 
    concept: "REPRESENTACIÓN", 
    match: "Visibilidad y presencia en medios y cultura",
    explanation: "La representación se refiere a cómo las personas afrodescendientes son visibilizadas en medios, arte, política y cultura. Una representación auténtica y diversa es crucial para combatir estereotipos, construir identidades positivas y garantizar que las voces negras sean escuchadas y respetadas."
  },
  { 
    id: 10, 
    concept: "IDENTIDAD", 
    match: "Construcción del ser afrodescendiente",
    explanation: "La identidad afrodescendiente es un proceso dinámico de construcción que integra historia, cultura, territorio y experiencias compartidas. No es estática sino que se construye colectivamente, resistiendo a la negación histórica y afirmando la existencia, el valor y el futuro de las comunidades negras."
  },
  { 
    id: 11, 
    concept: "MEMORIA", 
    match: "Preservación de la historia oral y ancestral",
    explanation: "La memoria en las comunidades afrodescendientes es una tecnología de resistencia que preserva historias, tradiciones y conocimientos ancestrales a través de la oralidad, la música, la danza y las prácticas culturales. Es fundamental para mantener viva la conexión con África y construir futuros basados en la sabiduría ancestral."
  },
  { 
    id: 12, 
    concept: "TERRITORIO", 
    match: "Espacios de vida y resistencia afro",
    explanation: "El territorio para las comunidades afrodescendientes no es solo espacio físico, sino lugar de vida, resistencia y construcción de identidad. En Colombia, los territorios colectivos del Pacífico y el Caribe son espacios donde se preservan tradiciones, se ejercen derechos ancestrales y se construyen proyectos de vida autónomos."
  },
];

type Card = {
  id: number;
  content: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoriaPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showPairModal, setShowPairModal] = useState(false);
  const [currentPair, setCurrentPair] = useState<typeof CARD_PAIRS[0] | null>(null);

  // Inicializar el juego
  const initializeGame = () => {
    const allCards: Card[] = [];
    
    // Crear tarjetas para cada par
    CARD_PAIRS.forEach((pair) => {
      allCards.push(
        { id: allCards.length, content: pair.concept, pairId: pair.id, isFlipped: false, isMatched: false },
        { id: allCards.length + 1, content: pair.match, pairId: pair.id, isFlipped: false, isMatched: false }
      );
    });

    // Mezclar las tarjetas
    const shuffled = allCards.sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
    setShowPairModal(false);
    setCurrentPair(null);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Manejar click en una tarjeta
  const handleCardClick = (cardId: number) => {
    if (isChecking || flippedCards.length >= 2) return;
    
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    // Si se han volteado 2 tarjetas, verificar si hacen pareja
    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves((prev) => prev + 1);

      setTimeout(() => {
        const [firstId, secondId] = newFlippedCards;
        const firstCard = cards.find((c) => c.id === firstId);
        const secondCard = cards.find((c) => c.id === secondId);

        if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
          // Son pareja - mostrar modal
          const pair = CARD_PAIRS.find((p) => p.id === firstCard.pairId);
          if (pair) {
            setCurrentPair(pair);
            setShowPairModal(true);
          }
          
          setMatchedPairs((prev) => {
            const newMatched = [...prev, firstCard.pairId];
            // Verificar si se ganó el juego
            if (newMatched.length === CARD_PAIRS.length) {
              setTimeout(() => {
                setGameWon(true);
                setShowPairModal(false);
              }, 500);
            }
            return newMatched;
          });
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
            )
          );
        } else {
          // No son pareja, voltear de nuevo
          setCards((prev) =>
            prev.map((c) =>
              newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          );
        }

        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };


  return (
    <div className="flex flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 lg:py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/interactiva"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            aria-label="Volver a Interactiva"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
            <Grid3X3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Juego
            </p>
            <h1 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Parejas · Memoria del Negrooverso
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-1.5">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
              Movimientos: <span className="text-[#D4AF37]">{moves}</span>
            </p>
          </div>
          <button
            onClick={initializeGame}
            className="flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            aria-label="Reiniciar juego"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em]">
              Reiniciar
            </span>
          </button>
        </div>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-1 flex-col gap-6 lg:flex-row"
      >
        <div className="w-full space-y-4 lg:w-2/3">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-6">
            <p className="mb-4 text-center text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Forma parejas conectando conceptos con sus definiciones. Historia, representación y cultura negra.
            </p>
            
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              <AnimatePresence>
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                    whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                    onClick={() => handleCardClick(card.id)}
                    disabled={card.isFlipped || card.isMatched || isChecking}
                    className={`relative h-24 sm:h-28 md:h-32 overflow-hidden rounded-xl border transition-all duration-300 ${
                      card.isMatched
                        ? "border-[#D4AF37]/70 bg-[#D4AF37]/20 opacity-60 cursor-default"
                        : card.isFlipped
                        ? "border-[#D4AF37]/70 bg-[#D4AF37]/15 cursor-default"
                        : "border-white/10 bg-white/[0.03] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 cursor-pointer"
                    } ${isChecking && !card.isFlipped ? "pointer-events-none" : ""}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      {card.isFlipped || card.isMatched ? (
                        <motion.p
                          initial={{ opacity: 0, rotateY: -90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[10px] sm:text-[11px] font-semibold text-center text-zinc-100 leading-tight"
                        >
                          {card.content}
                        </motion.p>
                      ) : (
                        <motion.div
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex h-full w-full items-center justify-center"
                        >
                          <div className="h-8 w-8 rounded-full border-2 border-[#D4AF37]/40 bg-[#D4AF37]/5" />
                        </motion.div>
                      )}
                    </div>
                    
                    {card.isMatched && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <p className="font-mono">
                Parejas encontradas: <span className="text-[#D4AF37]">{matchedPairs.length}</span> / {CARD_PAIRS.length}
              </p>
            </div>
          </div>

          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-[#D4AF37]/70 bg-[#D4AF37]/10 p-6 sm:p-8 text-center backdrop-blur-xl"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/20">
                  <Trophy className="h-8 w-8 text-[#D4AF37]" />
                </div>
              </div>
              <h2 className="mb-3 text-xl font-semibold text-zinc-100 sm:text-2xl">
                ¡Felicidades!
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-zinc-200 sm:text-base">
                Has completado el juego y elevado tu nivel de conocimiento en identidad negra, educación, representación, cultura y conocimiento.
              </p>
              <p className="mb-6 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                Continúa por este camino de aprendizaje y comparte tu logro para llegar a más personas. 
                Juntos construimos el Negrooverso desde NERA.
              </p>
              <p className="mb-4 text-xs text-zinc-400">
                Movimientos totales: <span className="text-[#D4AF37] font-semibold">{moves}</span>
              </p>
              
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <p className="w-full text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-2">
                  Comparte tu logro
                </p>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`¡Completé el juego de Parejas del Negrooverso en ${moves} movimientos! 🎯✨ Aprendiendo sobre identidad negra, cultura y representación desde NERA. #Negrooverso #NERA`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-xs text-zinc-300 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&quote=${encodeURIComponent(`¡Completé el juego de Parejas del Negrooverso! Aprendiendo sobre identidad negra, cultura y representación desde NERA.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-xs text-zinc-300 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-xs text-zinc-300 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: 'Completé el juego de Parejas del Negrooverso',
                        text: `¡Completé el juego en ${moves} movimientos! Aprendiendo sobre identidad negra, cultura y representación desde NERA.`,
                        url: window.location.href,
                      });
                    }
                  }}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-2 text-xs text-zinc-300 transition hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Share2 className="h-4 w-4" />
                  Compartir
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <aside className="w-full space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-sm text-zinc-300 backdrop-blur-xl sm:p-6 lg:w-1/3">
          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
            <Lightbulb className="h-3 w-3 text-[#D4AF37]" />
            Pistas · Conceptos y definiciones
          </p>
          <div className="mt-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
            {CARD_PAIRS.map((pair) => {
              const isMatched = matchedPairs.includes(pair.id);
              return (
                <motion.div
                  key={pair.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: pair.id * 0.02 }}
                  className={`rounded-lg border p-3 transition ${
                    isMatched
                      ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 opacity-75"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {isMatched && (
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]">
                        <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 space-y-1.5">
                      <p className={`text-xs font-semibold leading-tight ${
                        isMatched ? "text-[#D4AF37]" : "text-zinc-200"
                      }`}>
                        {pair.concept}
                      </p>
                      <p className={`text-[11px] leading-relaxed ${
                        isMatched ? "text-zinc-400 line-through" : "text-zinc-400"
                      }`}>
                        {pair.match}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-zinc-500">
            Las parejas encontradas se marcarán automáticamente. Busca los conceptos y sus definiciones correspondientes.
          </p>
        </aside>
      </motion.section>

      {/* Modal de pareja encontrada */}
      <AnimatePresence>
        {showPairModal && currentPair && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPairModal(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#D4AF37]/50 bg-black/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <button
                onClick={() => setShowPairModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/20">
                  <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h3 className="mb-2 text-center text-xl font-semibold text-[#D4AF37] sm:text-2xl">
                {currentPair.concept}
              </h3>
              
              <p className="mb-4 text-center text-sm font-medium text-zinc-300">
                {currentPair.match}
              </p>

              <div className="mb-6 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  {currentPair.explanation}
                </p>
              </div>

              <button
                onClick={() => setShowPairModal(false)}
                className="w-full rounded-lg border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-4 py-2.5 text-sm font-medium text-[#D4AF37] transition hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]"
              >
                Continuar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
