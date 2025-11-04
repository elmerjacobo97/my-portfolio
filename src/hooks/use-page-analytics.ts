import { useEffect, useRef } from 'react';
import { trackTimeOnPage } from '@/lib/analytics';

interface UsePageAnalyticsOptions {
  /** Nombre de la página para tracking */
  pageName: string;
  /** Tiempo mínimo en segundos para considerar engagement (default: 10) */
  minTimeThreshold?: number;
  /** Trackear profundidad de scroll (default: false - no recomendado para portfolios) */
  trackScroll?: boolean;
}

/**
 * Hook simplificado para trackear tiempo en página
 * Optimizado para portafolios sin generar ruido innecesario
 * Solo trackea tiempo de engagement real del usuario
 */
export function usePageAnalytics(options: UsePageAnalyticsOptions) {
  const { pageName, minTimeThreshold = 10, trackScroll = false } = options;

  const startTimeRef = useRef<number>(Date.now());
  const isActiveRef = useRef<boolean>(true);

  // Trackear tiempo en página
  useEffect(() => {
    startTimeRef.current = Date.now();
    isActiveRef.current = true;

    // Detectar cuando el usuario cambia de pestaña (no cuenta como engagement)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActiveRef.current = false;
      } else {
        // Usuario regresó a la pestaña, reiniciar contador
        startTimeRef.current = Date.now();
        isActiveRef.current = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Calcular tiempo total de engagement activo
      const timeSpent = (Date.now() - startTimeRef.current) / 1000;

      // Solo trackear si el usuario estuvo al menos el tiempo mínimo Y está activo
      if (timeSpent >= minTimeThreshold && isActiveRef.current) {
        trackTimeOnPage(pageName, timeSpent);
      }
    };
  }, [pageName, minTimeThreshold]);

  // Nota: trackScroll está disponible pero desactivado por defecto
  // Para portafolios, el scroll tracking genera mucho ruido sin valor real
  if (trackScroll) {
    // Implementación vacía - mantener parámetro por compatibilidad
    console.warn('Scroll tracking está desactivado para evitar ruido en analytics');
  }
}
