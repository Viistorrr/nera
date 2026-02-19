"use client";

export type ViewInteraction = {
  path: string;
  viewName: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  interactions: number;
  referrer?: string;
  location?: string;
  userAgent?: string;
};

export type SessionData = {
  sessionId: string;
  startTime: number;
  views: ViewInteraction[];
  totalDuration: number;
  totalInteractions: number;
};

const STORAGE_KEY = "nera_tracking_data";
const SESSION_KEY = "nera_session_id";
const CURRENT_VIEW_KEY = "nera_current_view";

// Generar ID de sesión único
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// Obtener nombre de vista amigable
function getViewName(path: string): string {
  const viewMap: Record<string, string> = {
    "/": "Dashboard",
    "/interactiva": "Interactiva",
    "/interactiva/sopa-de-letras": "Sopa de Letras",
    "/interactiva/crucigramas": "Crucigramas",
    "/interactiva/laberinto": "Laberinto",
    "/interactiva/memoria": "Parejas",
    "/en-el-tiempo": "En el Tiempo",
    "/marketplace": "Marketplace",
    "/reportes": "Reportes",
  };
  
  return viewMap[path] || path;
}

// Obtener nombre de ciudad desde la ubicación (geolocalización por IP)
async function getLocation(): Promise<string> {
  try {
    // Primero intentar obtener ciudad por IP (más rápido y no requiere permisos)
    try {
      const ipResponse = await fetch("https://ipapi.co/json/", {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        if (ipData.city && ipData.region) {
          return `${ipData.city}, ${ipData.region}`;
        } else if (ipData.city) {
          return ipData.city;
        } else if (ipData.country_name) {
          return ipData.country_name;
        }
      }
    } catch (ipError) {
      // Si falla la API de IP, intentar con otra API
      try {
        const altResponse = await fetch("https://ip-api.com/json/?fields=city,regionName,country", {
          method: "GET",
        });
        
        if (altResponse.ok) {
          const altData = await altResponse.json();
          if (altData.city && altData.regionName) {
            return `${altData.city}, ${altData.regionName}`;
          } else if (altData.city) {
            return altData.city;
          } else if (altData.country) {
            return altData.country;
          }
        }
      } catch (altError) {
        // Continuar con geolocalización del navegador
      }
    }

    // Como fallback, intentar geolocalización del navegador y hacer reverse geocoding
    if (navigator.geolocation) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Reverse geocoding para obtener nombre de ciudad
              const reverseResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=es`
              );
              
              if (reverseResponse.ok) {
                const reverseData = await reverseResponse.json();
                if (reverseData.city && reverseData.principalSubdivision) {
                  resolve(`${reverseData.city}, ${reverseData.principalSubdivision}`);
                } else if (reverseData.city) {
                  resolve(reverseData.city);
                } else if (reverseData.locality) {
                  resolve(reverseData.locality);
                } else {
                  resolve("Ubicación desconocida");
                }
              } else {
                resolve("Ubicación desconocida");
              }
            } catch {
              resolve("Ubicación desconocida");
            }
          },
          () => {
            resolve("Ubicación desconocida");
          },
          { timeout: 3000, enableHighAccuracy: false }
        );
      });
    }
  } catch {
    // Silenciar errores
  }
  return "Ubicación desconocida";
}

// Inicializar tracking de vista
export function startViewTracking(path: string): void {
  if (typeof window === "undefined") return;
  
  const sessionId = getSessionId();
  const viewName = getViewName(path);
  const startTime = Date.now();
  
  // Guardar vista actual
  localStorage.setItem(CURRENT_VIEW_KEY, JSON.stringify({
    path,
    viewName,
    startTime,
    interactions: 0,
  }));
  
  // Registrar cambio de vista en historial
  const data = getTrackingData();
  const existingView = data.views.find(v => v.path === path && !v.endTime);
  
  if (!existingView) {
    getLocation().then(location => {
      const newView: ViewInteraction = {
        path,
        viewName,
        startTime,
        interactions: 0,
        referrer: document.referrer || "Directo",
        location,
        userAgent: navigator.userAgent,
      };
      
      data.views.push(newView);
      saveTrackingData(data);
    });
  }
}

// Finalizar tracking de vista
export function endViewTracking(): void {
  if (typeof window === "undefined") return;
  
  const currentViewStr = localStorage.getItem(CURRENT_VIEW_KEY);
  if (!currentViewStr) return;
  
  const currentView = JSON.parse(currentViewStr);
  const endTime = Date.now();
  const duration = endTime - currentView.startTime;
  
  const data = getTrackingData();
  const viewIndex = data.views.findIndex(
    v => v.path === currentView.path && !v.endTime
  );
  
  if (viewIndex !== -1) {
    data.views[viewIndex].endTime = endTime;
    data.views[viewIndex].duration = duration;
    data.views[viewIndex].interactions = currentView.interactions;
    
    // Actualizar totales
    data.totalDuration += duration;
    data.totalInteractions += currentView.interactions;
    
    saveTrackingData(data);
  }
  
  localStorage.removeItem(CURRENT_VIEW_KEY);
}

// Registrar interacción
export function trackInteraction(): void {
  if (typeof window === "undefined") return;
  
  const currentViewStr = localStorage.getItem(CURRENT_VIEW_KEY);
  if (!currentViewStr) return;
  
  const currentView = JSON.parse(currentViewStr);
  currentView.interactions += 1;
  localStorage.setItem(CURRENT_VIEW_KEY, JSON.stringify(currentView));
}

// Obtener datos de tracking
export function getTrackingData(): SessionData {
  if (typeof window === "undefined") {
    return {
      sessionId: "",
      startTime: Date.now(),
      views: [],
      totalDuration: 0,
      totalInteractions: 0,
    };
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      sessionId: getSessionId(),
      startTime: Date.now(),
      views: [],
      totalDuration: 0,
      totalInteractions: 0,
    };
  }
  
  return JSON.parse(stored);
}

// Guardar datos de tracking
function saveTrackingData(data: SessionData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Limpiar datos de tracking
export function clearTrackingData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CURRENT_VIEW_KEY);
}

// Obtener estadísticas agregadas
export function getAggregatedStats() {
  const data = getTrackingData();
  
  // Agrupar por vista
  const viewStats: Record<string, {
    viewName: string;
    visits: number;
    totalDuration: number;
    totalInteractions: number;
    avgDuration: number;
  }> = {};
  
  data.views.forEach(view => {
    if (!viewStats[view.path]) {
      viewStats[view.path] = {
        viewName: view.viewName,
        visits: 0,
        totalDuration: 0,
        totalInteractions: 0,
        avgDuration: 0,
      };
    }
    
    viewStats[view.path].visits += 1;
    viewStats[view.path].totalDuration += view.duration || 0;
    viewStats[view.path].totalInteractions += view.interactions || 0;
  });
  
  // Calcular promedios
  Object.keys(viewStats).forEach(path => {
    const stat = viewStats[path];
    stat.avgDuration = stat.visits > 0 ? stat.totalDuration / stat.visits : 0;
  });
  
  // Referrers
  const referrers: Record<string, number> = {};
  data.views.forEach(view => {
    const ref = view.referrer || "Directo";
    referrers[ref] = (referrers[ref] || 0) + 1;
  });
  
  // Calcular usuarios únicos (basado en userAgent + location como identificador único)
  const uniqueUsers = new Set<string>();
  const userVisitCounts: Record<string, number> = {};
  
  data.views.forEach(view => {
    // Crear identificador único basado en userAgent y location
    const userIdentifier = `${view.userAgent || "unknown"}_${view.location || "unknown"}`;
    uniqueUsers.add(userIdentifier);
    userVisitCounts[userIdentifier] = (userVisitCounts[userIdentifier] || 0) + 1;
  });
  
  // Detectar usuarios que volvieron (más de una vista)
  const returningUsers = Object.values(userVisitCounts).filter(count => count > 1).length;
  
  const uniqueVisitsCount = uniqueUsers ? uniqueUsers.size : 0;

  return {
    sessionId: data.sessionId,
    totalViews: data.views.length,
    uniqueVisits: uniqueVisitsCount,
    returningUsers,
    totalDuration: data.totalDuration,
    totalInteractions: data.totalInteractions,
    viewStats: Object.values(viewStats),
    referrers,
    views: data.views,
  };
}
