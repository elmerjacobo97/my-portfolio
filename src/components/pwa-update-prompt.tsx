import { useRegisterSW } from 'virtual:pwa-register/react';

export function PWAUpdatePrompt() {
  useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      if (r) {
        // Verificar actualizaciones cada hora
        setInterval(() => r.update(), 60 * 60 * 1000);
      }
    },
    onRegisterError(error: unknown) {
      console.error('SW registration error', error);
    },
  });

  return null;
}
