"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Star } from "lucide-react";

const FEEDBACK_STORAGE_KEY = "nera_feedback_shown";
const FEEDBACK_DELAY = 10000; // 10 segundos (reducido para mejor visibilidad)
const MIN_INTERACTIONS = 2; // Mínimo de interacciones antes de mostrar (reducido)

export function FeedbackModal() {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    // Verificar si ya se mostró el feedback
    const feedbackShown = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (feedbackShown === "true") {
      // Si ya se mostró, mostrar el botón flotante para poder abrirlo manualmente
      setShowButton(true);
      return;
    }

    let interactionCounter = 0;

    // Contar interacciones
    const handleInteraction = () => {
      interactionCounter++;
      setInteractionCount(interactionCounter);
    };

    // Escuchar interacciones
    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);

    // Mostrar botón flotante después de un tiempo corto
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    // Timer principal: mostrar modal después de delay si hay suficientes interacciones
    const mainTimer = setTimeout(() => {
      if (interactionCounter >= MIN_INTERACTIONS) {
        setShowModal(true);
      }
    }, FEEDBACK_DELAY);

    return () => {
      clearTimeout(mainTimer);
      clearTimeout(buttonTimer);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const handleSubmit = () => {
    if (feedback.trim() || rating > 0) {
      // Aquí podrías enviar el feedback a un servidor
      // Por ahora solo lo guardamos en localStorage
      const feedbackData = {
        feedback,
        rating,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      };
      
      const existingFeedback = JSON.parse(
        localStorage.getItem("nera_feedback_data") || "[]"
      );
      existingFeedback.push(feedbackData);
      localStorage.setItem("nera_feedback_data", JSON.stringify(existingFeedback));
      
      setSubmitted(true);
      localStorage.setItem(FEEDBACK_STORAGE_KEY, "true");
      
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem(FEEDBACK_STORAGE_KEY, "true");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Botón flotante para abrir el modal manualmente */}
      <AnimatePresence>
        {showButton && !showModal && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={handleOpenModal}
            className="fixed bottom-4 right-4 z-[100] flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D4AF37]/60 bg-[#D4AF37]/10 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]"
            aria-label="Dar feedback"
          >
            {/* Efecto de brillo titilante - anillo exterior */}
            <motion.div
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40"
            />
            {/* Efecto de brillo titilante - resplandor */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                boxShadow: [
                  "0 0 0px rgba(212, 175, 55, 0)",
                  "0 0 25px rgba(212, 175, 55, 0.5)",
                  "0 0 0px rgba(212, 175, 55, 0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-[#D4AF37]/5"
            />
            <MessageSquare className="relative h-8 w-8 text-[#D4AF37]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal de feedback */}
      <AnimatePresence>
        {showModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="fixed bottom-4 right-4 z-[100] w-[90%] max-w-sm rounded-2xl border border-[#D4AF37]/50 bg-black/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6"
          >
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-[#D4AF37]">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      ¡Tu opinión importa!
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Compartí tu experiencia en <span className="font-bold">NERA</span>
                    </p>
                  </div>
                </div>

                <div className="mb-4 space-y-3">
                  <div>
                    <p className="mb-2 text-[11px] font-medium text-zinc-300">
                      ¿Cómo calificarías tu experiencia?
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="transition hover:scale-110"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              star <= rating
                                ? "fill-[#D4AF37] text-[#D4AF37]"
                                : "text-zinc-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-medium text-zinc-300">
                      Comentarios (opcional)
                    </p>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="¿Qué te gustó? ¿Qué mejorarías?"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-[#D4AF37]/40 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleClose}
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/10"
                  >
                    Ahora no
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!feedback.trim() && rating === 0}
                    className="flex-1 rounded-lg border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-3 py-2 text-xs font-medium text-[#D4AF37] transition hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <div className="py-4 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/20">
                    <Star className="h-6 w-6 fill-[#D4AF37] text-[#D4AF37]" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-zinc-100">
                  ¡Gracias por tu feedback!
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Tu opinión nos ayuda a mejorar NERA.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </>
  );
}
