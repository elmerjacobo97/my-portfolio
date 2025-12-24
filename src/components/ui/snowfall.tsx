import * as React from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SnowflakeProps {
  delay: number;
  duration: number;
  left: number;
  size: number;
}

const Snowflake = ({ delay, duration, left, size }: SnowflakeProps) => {
  return (
    <m.div
      className="absolute pointer-events-none select-none text-primary/40 dark:text-primary-foreground/60"
      style={{
        left: `${left}%`,
        top: '-5%',
        fontSize: `${size}px`,
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: [0, window.innerHeight + 100],
        opacity: [0, 1, 1, 0],
        x: [0, Math.sin(left) * 50, -Math.sin(left) * 30, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      ❄
    </m.div>
  );
};

export interface SnowfallProps {
  className?: string;
  /** Número de copos de nieve (default: 50) */
  snowflakeCount?: number;
  /** Velocidad base de caída en segundos (default: 10) */
  baseSpeed?: number;
}

export const Snowfall = React.memo(({ className, snowflakeCount = 50, baseSpeed = 10 }: SnowfallProps) => {
  const snowflakes = React.useMemo(() => {
    return Array.from({ length: snowflakeCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: baseSpeed + Math.random() * 10,
      left: Math.random() * 100,
      size: 10 + Math.random() * 15,
    }));
  }, [snowflakeCount, baseSpeed]);

  return (
    <div className={cn('fixed inset-0 pointer-events-none overflow-hidden z-50', className)} aria-hidden="true">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} delay={flake.delay} duration={flake.duration} left={flake.left} size={flake.size} />
      ))}
    </div>
  );
});

Snowfall.displayName = 'Snowfall';
