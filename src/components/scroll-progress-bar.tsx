import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calcular el progreso del scroll (0-100)
      const totalScrollableHeight = documentHeight - windowHeight;
      const progress = totalScrollableHeight > 0
        ? (scrollTop / totalScrollableHeight) * 100
        : 0;

      setScrollProgress(progress);
    };

    // Llamar una vez al inicio para establecer el valor inicial
    handleScroll();

    // Agregar el event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="hidden md:block fixed top-0 left-0 right-0 h-[2px] z-50 bg-border/30"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary/80 transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 8px rgba(107, 42, 232, 0.3)'
        }}
      />
    </div>
  );
}
