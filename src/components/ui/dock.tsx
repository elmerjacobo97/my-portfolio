import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DockProps {
  className?: string;
  children: React.ReactNode;
}

export const Dock = ({ className, children }: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-16 items-end gap-4 rounded-2xl px-4 pb-3',
        // Glass effect using theme colors
        'bg-card/95 backdrop-blur-md',
        // Border
        'border border-border',
        // Shadow
        'shadow-lg shadow-black/10 dark:shadow-black/50',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        // Only pass mouseX to React Components, not HTML elements (strings)
        if (React.isValidElement(child) && typeof child.type !== 'string') {
          return React.cloneElement(child as React.ReactElement<DockIconProps>, { mouseX });
        }
        return child;
      })}
    </motion.div>
  );
};

export interface DockIconProps {
  mouseX?: MotionValue;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const DockIcon = ({ mouseX, className, children, onClick }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Provide a default MotionValue if mouseX is not provided
  const defaultMouseX = useMotionValue(Infinity);
  const activeMouseX = mouseX || defaultMouseX;

  const distance = useTransform(activeMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.05, stiffness: 1000, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ width, willChange: 'width' }}
      className={cn(
        'aspect-square cursor-pointer rounded-full',
        // Background using theme colors
        'bg-muted/80',
        // Border
        'border border-border',
        // Shadow
        'shadow-sm',
        // Hover state
        'hover:bg-accent hover:border-accent-foreground/20',
        'hover:shadow-md',
        'transition-colors duration-100',
        'flex items-center justify-center',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
