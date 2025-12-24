import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Parse title for gradient tags
  const hasGradient = title.includes('<gradient>');
  const titleParts = hasGradient ? title.split(/<\/?gradient>/) : [title];

  const renderTitle = () => {
    if (!hasGradient) {
      const words = title.split(' ');
      return words.map((word, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: 0.1 + i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </m.span>
      ));
    }

    // With gradient
    let wordIndex = 0;
    return titleParts.map((part, index) => {
      const isGradient = index === 1;
      const words = part.split(' ').filter(Boolean);

      return words.map((word) => {
        const currentIndex = wordIndex++;
        return (
          <m.span
            key={`${index}-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.1 + currentIndex * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(
              'inline-block mr-[0.25em]',
              isGradient && 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary'
            )}
          >
            {word}
          </m.span>
        );
      });
    });
  };

  return (
    <div ref={ref} className={cn('mb-12 md:mb-16', align === 'center' ? 'text-center' : 'text-left', className)}>
      {badge && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={cn('mb-4', align === 'center' && 'flex justify-center')}
        >
          <Badge variant="outline" className="px-4 py-1.5 text-sm font-medium">
            {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 mr-1.5 text-primary" />}
            {badge}
          </Badge>
        </m.div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{renderTitle()}</h2>

      {subtitle && (
        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn('text-lg md:text-xl text-muted-foreground', align === 'center' && 'max-w-2xl mx-auto')}
        >
          {subtitle}
        </m.p>
      )}

      <m.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={cn(
          'h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full mt-6',
          align === 'center' && 'mx-auto'
        )}
      />
    </div>
  );
}
