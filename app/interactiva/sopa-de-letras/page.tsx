"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, X, CheckCircle2 } from "lucide-react";

type WordPosition = {
  word: string;
  row: number;
  col: number;
  direction: "horizontal" | "vertical" | "diagonal";
  found: boolean;
};

type WordDefinition = {
  word: string;
  definition: string;
  explanation: string;
};

const WORDS: WordDefinition[] = [
  {
    word: "CIMARRONAJE",
    definition: "Resistencia de esclavizados que escaparon",
    explanation: "El cimarronaje fue una forma de resistencia activa donde personas esclavizadas escapaban de sus captores para construir comunidades libres. Esta práctica histórica representa la lucha por la libertad y la autonomía, siendo fundamental en la construcción de identidades afrodescendientes en América Latina.",
  },
  {
    word: "PALENQUE",
    definition: "Comunidad de cimarrones libres",
    explanation: "Los palenques fueron comunidades autónomas fundadas por cimarrones en territorios de difícil acceso. En Colombia, San Basilio de Palenque es el primer pueblo libre de América, declarado Patrimonio Inmaterial de la Humanidad. Representan la resistencia, la organización comunitaria y la preservación de tradiciones africanas.",
  },
  {
    word: "QUILOMBO",
    definition: "Comunidad de resistencia en Brasil",
    explanation: "Los quilombos fueron comunidades de resistencia formadas por personas esclavizadas que escaparon en Brasil. El más conocido fue el Quilombo dos Palmares, que duró casi un siglo. Hoy, los quilombos contemporáneos son comunidades reconocidas que luchan por sus derechos territoriales y culturales.",
  },
  {
    word: "KILOMBO",
    definition: "Comunidad de resistencia en África",
    explanation: "El kilombo es una organización social y militar de origen africano, especialmente en Angola. Representa la resistencia organizada y la capacidad de las comunidades africanas para defenderse y mantener su autonomía frente a la colonización y la esclavización.",
  },
  {
    word: "DIÁSPORA",
    definition: "Dispersión de pueblos africanos",
    explanation: "La diáspora africana se refiere a la dispersión forzada de millones de africanos a través del Atlántico durante la trata transatlántica de esclavos. Esta experiencia compartida conecta a comunidades afrodescendientes en América, el Caribe y otras partes del mundo, creando identidades diaspóricas ricas y diversas.",
  },
  {
    word: "PANAFRICANISMO",
    definition: "Unidad y solidaridad de pueblos africanos",
    explanation: "El panafricanismo es un movimiento político, cultural e ideológico que promueve la unidad y solidaridad entre todos los pueblos de ascendencia africana. Busca fortalecer los lazos entre África y sus diásporas, luchando contra el racismo y promoviendo la autodeterminación y el desarrollo de las comunidades negras.",
  },
  {
    word: "NEGRITUD",
    definition: "Movimiento de afirmación de la identidad negra",
    explanation: "La Negritud es un movimiento literario y filosófico desarrollado por intelectuales negros como Aimé Césaire y Léopold Sédar Senghor. Afirma el valor de la cultura negra, rechaza la asimilación y celebra la identidad africana y afrodescendiente como fuente de orgullo y resistencia.",
  },
  {
    word: "AFROCENTRISMO",
    definition: "Enfoque centrado en la experiencia africana",
    explanation: "El afrocentrismo es una perspectiva intelectual y cultural que coloca a África y las experiencias africanas en el centro del análisis histórico y cultural. Busca descolonizar el conocimiento y reconocer las contribuciones de los pueblos africanos a la civilización mundial.",
  },
  {
    word: "REPRESENTACIÓN",
    definition: "Visibilidad y presencia en medios y cultura",
    explanation: "La representación se refiere a cómo las personas afrodescendientes son visibilizadas en medios, arte, política y cultura. Una representación auténtica y diversa es crucial para combatir estereotipos, construir identidades positivas y garantizar que las voces negras sean escuchadas y respetadas.",
  },
  {
    word: "IDENTIDAD",
    definition: "Construcción del ser afrodescendiente",
    explanation: "La identidad afrodescendiente es un proceso dinámico de construcción que integra historia, cultura, territorio y experiencias compartidas. No es estática sino que se construye colectivamente, resistiendo a la negación histórica y afirmando la existencia, el valor y el futuro de las comunidades negras.",
  },
  {
    word: "MEMORIA",
    definition: "Preservación de la historia oral y ancestral",
    explanation: "La memoria en las comunidades afrodescendientes es una tecnología de resistencia que preserva historias, tradiciones y conocimientos ancestrales a través de la oralidad, la música, la danza y las prácticas culturales. Es fundamental para mantener viva la conexión con África y construir futuros basados en la sabiduría ancestral.",
  },
  {
    word: "TERRITORIO",
    definition: "Espacios de vida y resistencia afro",
    explanation: "El territorio para las comunidades afrodescendientes no es solo espacio físico, sino lugar de vida, resistencia y construcción de identidad. En Colombia, los territorios colectivos del Pacífico y el Caribe son espacios donde se preservan tradiciones, se ejercen derechos ancestrales y se construyen proyectos de vida autónomos.",
  },
];

const GRID_SIZE = 20; // Aumentado para acomodar más palabras

// Generar cuadrícula con palabras colocadas
function generateGrid(): { grid: string[][]; positions: WordPosition[] } {
  const grid: string[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(""));

  const positions: WordPosition[] = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Colocar palabras
  const wordList = WORDS.map((w) => w.word);
  const directions: Array<"horizontal" | "vertical" | "diagonal"> = [
    "horizontal",
    "vertical",
    "diagonal",
  ];

  for (const word of wordList) {
    let placed = false;
    let attempt = 0;
    const maxAttempts = 500;

    // Mezclar direcciones aleatoriamente
    const shuffledDirections = [...directions].sort(() => Math.random() - 0.5);

    while (!placed && attempt < maxAttempts) {
      attempt++;
      const direction = shuffledDirections[attempt % shuffledDirections.length];

      let row = Math.floor(Math.random() * GRID_SIZE);
      let col = Math.floor(Math.random() * GRID_SIZE);

      // Verificar si cabe
      let fits = true;
      if (direction === "horizontal" && col + word.length > GRID_SIZE) {
        fits = false;
      } else if (direction === "vertical" && row + word.length > GRID_SIZE) {
        fits = false;
      } else if (
        direction === "diagonal" &&
        (row + word.length > GRID_SIZE || col + word.length > GRID_SIZE)
      ) {
        fits = false;
      }

      if (!fits) continue;

      // Verificar que no haya conflicto con letras existentes
      for (let i = 0; i < word.length; i++) {
        let r = row;
        let c = col;

        if (direction === "horizontal") {
          c = col + i;
        } else if (direction === "vertical") {
          r = row + i;
        } else if (direction === "diagonal") {
          r = row + i;
          c = col + i;
        }

        if (grid[r]?.[c] && grid[r][c] !== word[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        // Colocar la palabra
        for (let i = 0; i < word.length; i++) {
          let r = row;
          let c = col;

          if (direction === "horizontal") {
            c = col + i;
          } else if (direction === "vertical") {
            r = row + i;
          } else if (direction === "diagonal") {
            r = row + i;
            c = col + i;
          }

          grid[r][c] = word[i];
        }

        positions.push({
          word,
          row,
          col,
          direction,
          found: false,
        });
        placed = true;
      }
    }

    // Si no se pudo colocar después de muchos intentos, intentar forzar en horizontal
    if (!placed) {
      for (let col = 0; col <= GRID_SIZE - word.length; col++) {
        for (let row = 0; row < GRID_SIZE; row++) {
          let fits = true;
          for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] && grid[row][col + i] !== word[i]) {
              fits = false;
              break;
            }
          }
          if (fits) {
            for (let i = 0; i < word.length; i++) {
              grid[row][col + i] = word[i];
            }
            positions.push({
              word,
              row,
              col,
              direction: "horizontal",
              found: false,
            });
            placed = true;
            break;
          }
        }
        if (placed) break;
      }
    }
  }

  // Llenar espacios vacíos con letras aleatorias
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (!grid[i][j]) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, positions };
}

export default function SopaDeLetrasPage() {
  const [{ grid, positions }, setGameState] = useState(() => generateGrid());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [currentWord, setCurrentWord] = useState<WordDefinition | null>(null);

  const resetGame = () => {
    const newState = generateGrid();
    setGameState(newState);
    setSelectedCells(new Set());
    setFoundWords(new Set());
  };

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const checkWord = useCallback(
    (cells: Set<string>) => {
      if (cells.size < 3) return null;

      // Verificar cada palabra
      for (const pos of positions) {
        if (foundWords.has(pos.word)) continue;

        const wordCells = new Set<string>();
        for (let i = 0; i < pos.word.length; i++) {
          let r = pos.row;
          let c = pos.col;
          if (pos.direction === "horizontal") {
            c = pos.col + i;
          } else if (pos.direction === "vertical") {
            r = pos.row + i;
          } else if (pos.direction === "diagonal") {
            r = pos.row + i;
            c = pos.col + i;
          }
          wordCells.add(getCellKey(r, c));
        }

        // Verificar si todas las celdas de la palabra están seleccionadas
        // y si el número de celdas coincide
        if (wordCells.size !== cells.size) continue;

        let matches = true;
        for (const cell of wordCells) {
          if (!cells.has(cell)) {
            matches = false;
            break;
          }
        }

        if (matches) {
          return pos.word;
        }
      }

      return null;
    },
    [positions, foundWords]
  );

  // Click simple para seleccionar/deseleccionar letras (como estaba antes),
  // y chequear si se ha completado una palabra al actualizar la selección.
  const handleCellClick = (row: number, col: number) => {
    const key = getCellKey(row, col);
    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      const foundWord = checkWord(next);
      if (foundWord) {
        const wordDef = WORDS.find((w) => w.word === foundWord);
        if (wordDef) {
          setFoundWords((prevFound) => new Set([...prevFound, foundWord]));
          setCurrentWord(wordDef);
          setShowModal(true);

          // Opcional: limpiar la selección de esa palabra (ya se marca como encontrada)
          const pos = positions.find((p) => p.word === foundWord);
          if (pos) {
            for (let i = 0; i < foundWord.length; i++) {
              let r = pos.row;
              let c = pos.col;
              if (pos.direction === "horizontal") {
                c = pos.col + i;
              } else if (pos.direction === "vertical") {
                r = pos.row + i;
              } else if (pos.direction === "diagonal") {
                r = pos.row + i;
                c = pos.col + i;
              }
              next.delete(getCellKey(r, c));
            }
          }
        }
      }

      return new Set(next);
    });
  };

  const allFound = foundWords.size === WORDS.length;

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
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              Juego
            </p>
            <h1 className="text-lg font-semibold text-zinc-100 sm:text-xl">
              Sopa de letras
            </h1>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-1 flex-col items-center gap-6"
        >
          <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl sm:p-6">
            <p className="mb-4 text-center text-[11px] font-mono uppercase tracking-wider text-zinc-500">
              Encuentra las palabras: horizontal, vertical y diagonal
            </p>
            <div className="mx-auto max-w-full overflow-x-auto">
              <div className="inline-flex flex-col items-center justify-center gap-0.5 font-mono text-sm font-medium text-zinc-300 sm:text-base">
                {grid.map((row, i) => (
                  <div key={i} className="flex justify-center gap-0.5">
                    {row.map((cell, j) => {
                      const cellKey = getCellKey(i, j);
                      const isSelected = selectedCells.has(cellKey);
                      const isFound = Array.from(foundWords).some((word) => {
                        const pos = positions.find((p) => p.word === word);
                        if (!pos) return false;
                        for (let k = 0; k < word.length; k++) {
                          let r = pos.row;
                          let c = pos.col;
                          if (pos.direction === "horizontal") c += k;
                          else if (pos.direction === "vertical") r += k;
                          else {
                            r += k;
                            c += k;
                          }
                          if (getCellKey(r, c) === cellKey) return true;
                        }
                        return false;
                      });

                      return (
                        <button
                          key={j}
                          type="button"
                          onClick={() => handleCellClick(i, j)}
                          className={`flex h-7 w-7 items-center justify-center rounded border text-xs font-medium transition-all duration-150 sm:h-8 sm:w-8 sm:text-sm ${
                            isFound
                              ? "border-[#D4AF37]/70 bg-[#D4AF37]/30 text-[#D4AF37] line-through opacity-60"
                              : isSelected
                              ? "border-[#D4AF37] bg-[#D4AF37]/25 text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)] scale-105"
                              : "border-white/10 bg-white/5 text-zinc-200 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] hover:scale-105"
                          }`}
                        >
                          {cell}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500">
              <p>
                Palabras encontradas:{" "}
                <span className="text-[#D4AF37] font-semibold">
                  {foundWords.size} / {WORDS.length}
                </span>
              </p>
              <button
                onClick={resetGame}
                className="rounded border border-white/10 bg-black/40 px-2 py-1 text-xs transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                Reiniciar
              </button>
            </div>
            {allFound && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 rounded-lg border border-[#D4AF37]/70 bg-[#D4AF37]/10 p-3 text-center"
              >
                <p className="text-sm font-semibold text-[#D4AF37]">
                  ¡Felicidades! Has encontrado todas las palabras.
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Lista de palabras a encontrar */}
        <aside className="w-full space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-sm text-zinc-300 backdrop-blur-xl sm:p-6 lg:w-64">
          <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
            <Search className="h-3 w-3 text-[#D4AF37]" />
            Palabras a encontrar
          </p>
          <ul className="mt-3 space-y-2">
            {WORDS.map((wordDef, idx) => {
              const isFound = foundWords.has(wordDef.word);
              return (
                <li
                  key={idx}
                  className={`flex items-center gap-2 rounded-lg border p-2 text-xs transition ${
                    isFound
                      ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 opacity-75"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {isFound && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                  )}
                  <span
                    className={`font-semibold ${
                      isFound ? "text-[#D4AF37] line-through" : "text-zinc-200"
                    }`}
                  >
                    {wordDef.word}
                  </span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      {/* Modal de palabra encontrada */}
      <AnimatePresence>
        {showModal && currentWord && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
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
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/20">
                  <CheckCircle2 className="h-6 w-6 text-[#D4AF37]" />
                </div>
              </div>

              <h3 className="mb-2 text-center text-xl font-semibold text-[#D4AF37] sm:text-2xl">
                {currentWord.word}
              </h3>

              <div className="mb-6 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <p className="mb-2 text-xs font-medium text-zinc-300">
                  {currentWord.definition}
                </p>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {currentWord.explanation}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
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
