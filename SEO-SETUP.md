# SEO Setup and Analytics Guide

## 📋 SEO Checklist Completo

### ✅ Optimizaciones Ya Implementadas

- **Meta tags básicos**: title, description, keywords
- **Open Graph tags**: Para Facebook, LinkedIn
- **Twitter Cards**: Para Twitter/X
- **Structured Data**: JSON-LD con datos de persona y sitio web
- **Robots.txt**: Configurado para permitir crawling
- **Sitemap.xml**: Estructura básica de páginas
- **Web App Manifest**: Para capacidades PWA
- **Security headers**: X-Content-Type-Options, X-Frame-Options, etc.
- **Language tags**: Configurado para español
- **Canonical URLs**: Para evitar contenido duplicado

### 🔧 Configuraciones Pendientes

#### 1. Google Analytics 4 (GA4)
```html
<!-- Descomenta y reemplaza G-XXXXXXXXXX con tu ID real -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### 2. Google Search Console
1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Agrega tu propiedad (https://tudominio.com)
3. Verifica la propiedad usando el meta tag HTML:
```html
<meta name="google-site-verification" content="TU_CODIGO_DE_VERIFICACION" />
```

#### 3. Actualizar URLs y Dominios
Reemplaza en todos los archivos:
- `https://tudominio.com` → Tu dominio real
- `@tuusuario` → Tu usuario real de redes sociales
- `Tu Nombre` → Tu nombre real
- `hola@tudominio.com` → Tu email real

#### 4. Favicon y Assets
Ver `favicon-instructions.md` para generar:
- favicon.ico, favicon-16x16.png, favicon-32x32.png
- apple-touch-icon.png, android-chrome-*.png
- og-image.jpg (1200x630), profile-image.jpg
- screenshot-desktop.png, screenshot-mobile.png

## 🔍 Herramientas de Análisis Recomendadas

### Analytics Gratuitas
- **Google Analytics 4**: Análisis completo de tráfico
- **Google Search Console**: Rendimiento en búsquedas
- **Microsoft Clarity**: Mapas de calor y grabaciones de sesión
- **Cloudflare Analytics**: Si usas Cloudflare

### SEO Tools
- **Google PageSpeed Insights**: Velocidad y Core Web Vitals
- **GTmetrix**: Análisis de rendimiento detallado
- **Lighthouse**: Auditoría integral (ya en Chrome DevTools)
- **SEMrush/Ahrefs**: Para investigación de keywords (de pago)

### Social Media Testing
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## 📊 Métricas Importantes a Monitorear

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### SEO Metrics
- **Tiempo de carga de página**: < 3s
- **Índice de velocidad**: < 3s
- **Time to Interactive**: < 5s
- **Tasa de rebote**: < 60%

### Tracking Goals
- **Visitas a la página de proyectos**
- **Clics en enlaces de contacto**
- **Descargas de CV/Portafolio**
- **Tiempo en página**
- **Páginas por sesión**

## 🚀 Configuración de Google Tag Manager (Opcional)

Si prefieres GTM en lugar de GA4 directo:

1. Crea una cuenta en [Google Tag Manager](https://tagmanager.google.com/)
2. Reemplaza el script de GA4 con:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

3. Agrega en el body:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## 📈 Eventos de Tracking Recomendados

### Eventos Personalizados para GA4
```javascript
// Clic en proyecto
gtag('event', 'view_project', {
  'project_name': 'Nombre del Proyecto',
  'category': 'engagement'
});

// Clic en contacto
gtag('event', 'contact_click', {
  'method': 'email', // email, phone, linkedin, etc.
  'category': 'lead'
});

// Descarga de CV
gtag('event', 'download_cv', {
  'file_name': 'cv.pdf',
  'category': 'engagement'
});

// Scroll profundo (90% de la página)
gtag('event', 'scroll', {
  'percent_scrolled': 90,
  'category': 'engagement'
});
```

## 🔧 Optimizaciones Técnicas Adicionales

### 1. Compresión y Caching
```nginx
# En tu servidor web (Nginx example)
gzip on;
gzip_vary on;
gzip_types text/css application/javascript image/svg+xml;

# Cache headers
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 2. Preload Critical Resources
```html
<!-- Ya incluido en index.html -->
<link rel="preload" href="/src/main.tsx" as="script" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

### 3. Security Headers
```
# Headers de seguridad (configurar en servidor)
Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com *.googletagmanager.com
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

## 📝 Contenido SEO

### Keywords Principales
- Desarrollador Full Stack
- Programador React
- Desarrollador Node.js
- Portafolio desarrollador
- [Tu Nombre] desarrollador

### Estructura de Contenido
1. **Homepage**: Introducción clara, CTA prominent
2. **About**: Historia profesional, skills técnicos
3. **Projects**: Casos de estudio detallados, tecnologías usadas
4. **Contact**: Múltiples formas de contacto, disponibilidad

### Optimización de Imágenes
- Usar WebP cuando sea posible
- Lazy loading para imágenes below-the-fold
- Alt text descriptivo en todas las imágenes
- Tamaños responsive

## 🎯 Próximos Pasos

1. **Inmediato** (1-2 días):
   - [ ] Generar favicons y assets
   - [ ] Actualizar URLs y datos personales
   - [ ] Configurar Google Analytics
   - [ ] Registrar en Google Search Console

2. **Corto plazo** (1-2 semanas):
   - [ ] Implementar eventos de tracking
   - [ ] Optimizar imágenes y assets
   - [ ] Escribir contenido SEO-optimizado
   - [ ] Probar en diferentes dispositivos

3. **Mediano plazo** (1 mes):
   - [ ] Análisis de métricas iniciales
   - [ ] Optimizaciones basadas en datos
   - [ ] Link building básico
   - [ ] Contenido adicional (blog posts?)

4. **Largo plazo** (3+ meses):
   - [ ] Análisis competitivo
   - [ ] Optimizaciones avanzadas
   - [ ] Expansión de contenido
   - [ ] A/B testing de elementos clave

## 📞 Recursos y Contactos

### Documentación Oficial
- [Google Search Central](https://developers.google.com/search)
- [Web.dev](https://web.dev/) - Best practices
- [Schema.org](https://schema.org/) - Structured data

### Comunidades
- [r/SEO](https://reddit.com/r/SEO)
- [Search Engine Land](https://searchengineland.com/)
- [Moz Blog](https://moz.com/blog)

---

💡 **Tip**: Implementa cambios gradualmente y monitorea el impacto. El SEO es un proceso continuo, no un setup único.