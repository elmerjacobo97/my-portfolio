import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import '@/types/i18n'; 

// Configuración de i18next
i18n
  // Detectar idioma del navegador
  .use(LanguageDetector)
  // Pasar la instancia i18n a react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
    },
    fallbackLng: 'es', // Idioma por defecto
    supportedLngs: ['es', 'en'], // Idiomas soportados
    
    detection: {
      // Orden de detección de idioma
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Clave para guardar el idioma en localStorage
      lookupLocalStorage: 'i18nextLng',
      // Cache del idioma seleccionado
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    react: {
      useSuspense: false, // Desactivar suspense para evitar problemas con SSR
    },
  });

// Actualizar el atributo lang del HTML automáticamente cuando cambia el idioma
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Establecer el idioma inicial en el HTML
document.documentElement.lang = i18n.language;

export default i18n;
