import ReactGA from 'react-ga4';

/**
 * Inicializa Google Analytics 4
 * Debe llamarse una sola vez al inicio de la aplicación
 */
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Google Analytics: VITE_GA4_MEASUREMENT_ID is not configured');
    return;
  }

  ReactGA.initialize(measurementId, {
    testMode: import.meta.env.MODE === 'development',
  });

  ReactGA.send('pageview');
};

/**
 * Trackea una vista de página
 * @param path - La ruta de la página
 * @param title - El título de la página (opcional)
 */
export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};

/**
 * Trackea un evento personalizado optimizado para GA4
 * @param eventName - Nombre del evento
 * @param eventParams - Parámetros adicionales del evento
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  ReactGA.event(eventName, eventParams);
};

/**
 * Trackea un clic en un enlace externo (evento recomendado GA4)
 * @param linkUrl - URL del enlace
 * @param linkText - Texto del enlace (opcional)
 */
export const trackLinkClick = (linkUrl: string, linkText?: string) => {
  trackEvent('click', {
    link_url: linkUrl,
    link_text: linkText,
    link_domain: new URL(linkUrl).hostname,
  });
};

/**
 * Trackea la descarga de un archivo (evento recomendado GA4)
 * @param fileName - Nombre del archivo descargado
 * @param fileExtension - Extensión del archivo (opcional)
 */
export const trackDownload = (fileName: string, fileExtension?: string) => {
  const extension = fileExtension || fileName.split('.').pop() || '';
  trackEvent('file_download', {
    file_name: fileName,
    file_extension: extension,
    link_url: fileName,
  });
};

/**
 * Trackea el envío de un formulario (evento recomendado GA4)
 * @param formName - Nombre del formulario
 * @param formDestination - Destino del formulario (opcional)
 */
export const trackFormSubmit = (formName: string, formDestination?: string) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_destination: formDestination,
  });
};

/**
 * Trackea el tiempo de engagement en una página
 * @param pageName - Nombre de la página
 * @param timeInSeconds - Tiempo en segundos
 */
export const trackTimeOnPage = (pageName: string, timeInSeconds: number) => {
  trackEvent('user_engagement', {
    engagement_time_msec: Math.round(timeInSeconds * 1000),
    page_title: pageName,
  });
};

/**
 * Trackea visualización de contenido (evento recomendado GA4)
 * @param contentType - Tipo de contenido
 * @param contentId - ID del contenido
 */
export const trackViewContent = (contentType: string, contentId: string) => {
  trackEvent('view_item', {
    content_type: contentType,
    item_id: contentId,
  });
};

/**
 * Trackea selección de contenido (evento recomendado GA4)
 * @param contentType - Tipo de contenido
 * @param contentId - ID del contenido
 */
export const trackSelectContent = (contentType: string, contentId: string) => {
  trackEvent('select_content', {
    content_type: contentType,
    item_id: contentId,
  });
};

/**
 * Trackea profundidad de scroll (evento personalizado GA4)
 * @param percentage - Porcentaje de scroll alcanzado
 * @param pagePath - Ruta de la página
 */
export const trackScrollDepth = (percentage: number, pagePath: string) => {
  trackEvent('scroll', {
    percent_scrolled: percentage,
    page_path: pagePath,
  });
};

/**
 * Trackea búsqueda en el sitio (evento recomendado GA4)
 * @param searchTerm - Término de búsqueda
 */
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm,
  });
};
