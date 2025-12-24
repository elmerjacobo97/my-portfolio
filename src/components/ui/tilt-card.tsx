import { type ReactNode } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({ children, className, tiltAmount = 10, scale = 1.02, glare = true }: TiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);
  const glareOpacity = useTransform([x, y], ([latestX, latestY]) => {
    const distFromCenter = Math.sqrt(Math.pow((latestX as number) - 0.5, 2) + Math.pow((latestY as number) - 0.5, 2));
    return distFromCenter * 0.3;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <m.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={cn('relative', className)}
    >
      <m.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale }}
        transition={{ scale: { duration: 0.2 } }}
        className="relative w-full h-full"
      >
        {children}
        {glare && (
          <m.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              opacity: glareOpacity,
            }}
            className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          />
        )}
      </m.div>
    </m.div>
  );
}
