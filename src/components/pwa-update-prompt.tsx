import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { RefreshCw, X, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'framer-motion';

export function PWAUpdatePrompt() {
  const { t } = useTranslation();
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  const {
    offlineReady: [, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
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

  // Limpiar estado de offline (no necesitamos notificar)
  useEffect(() => {
    if (setOfflineReady) setOfflineReady(false);
  }, [setOfflineReady]);

  // Mostrar prompt para actualizaciones
  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true);
    }
  }, [needRefresh]);

  const close = () => {
    setShowUpdatePrompt(false);
    setNeedRefresh(false);
  };

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  if (!showUpdatePrompt || !needRefresh) return null;

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
      >
        <Card className="gap-0 py-0">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Download className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm">{t('pwa.updateAvailable')}</CardTitle>
              <CardDescription className="text-xs truncate">{t('pwa.updateDescription')}</CardDescription>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button onClick={handleUpdate} size="sm" className="h-8">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                {t('pwa.reload')}
              </Button>
              <Button
                onClick={close}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </AnimatePresence>
  );
}
