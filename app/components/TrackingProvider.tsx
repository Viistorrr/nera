"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { startViewTracking, endViewTracking, trackInteraction } from "../lib/tracking";

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lastInteractionTime = useRef(0);

  useEffect(() => {
    // Finalizar vista anterior
    endViewTracking();
    
    // Iniciar tracking de nueva vista
    startViewTracking(pathname);

    // Registrar interacciones significativas (con throttling)
    const handleInteraction = (event: Event) => {
      const now = Date.now();
      // Solo registrar si pasaron al menos 500ms desde la última interacción
      if (now - lastInteractionTime.current > 500) {
        const target = event.target as HTMLElement;
        // Solo registrar interacciones en elementos interactivos (botones, links, inputs, etc.)
        if (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.closest("button") ||
          target.closest("a") ||
          target.closest("[role='button']")
        ) {
          trackInteraction();
          lastInteractionTime.current = now;
        }
      }
    };

    // Registrar scroll como interacción (con throttling)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackInteraction();
      }, 1000);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      endViewTracking();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  return <>{children}</>;
}
