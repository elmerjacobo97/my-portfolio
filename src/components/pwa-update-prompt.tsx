import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { m, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function PWAUpdatePrompt() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error: unknown) {
      console.log('SW registration error', error);
    },
  });

  // Mostrar toast para offline ready
  useEffect(() => {
    if (offlineReady) {
      toast({
        title: t('pwa.readyOffline'),
        description: t('pwa.offlineDescription'),
      });
      setOfflineReady(false);
    }
  }, [offlineReady, setOfflineReady, t, toast]);

  // Mostrar Card para actualizaciones
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

  // Solo mostrar Card cuando hay actualización disponible
  if (!showUpdatePrompt || !needRefresh) return null;

  return (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <Card className="shadow-2xl border-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{t('pwa.updateAvailable')}</CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1" onClick={close}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>{t('pwa.updateDescription')}</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 gap-2">
            <Button onClick={handleUpdate} className="flex-1" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t('pwa.reload')}
            </Button>
            <Button onClick={close} variant="outline" className="flex-1" size="sm">
              {t('pwa.later')}
            </Button>
          </CardFooter>
        </Card>
      </m.div>
    </AnimatePresence>
  );
}
