import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Cpu, Camera, Coffee, Globe } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { TiltCard } from '@/components/ui/tilt-card';

const interestIcons = [
  { icon: Cpu, color: '#3b82f6', bg: 'bg-blue-500/10' },
  { icon: Camera, color: '#ec4899', bg: 'bg-pink-500/10' },
  { icon: Coffee, color: '#f59e0b', bg: 'bg-amber-500/10' },
  { icon: Globe, color: '#10b981', bg: 'bg-emerald-500/10' },
];

export function InterestsSection() {
  const { t } = useTranslation();

  const interestsData = t('about.interests.items', { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;

  const interests = interestsData.map((item, index) => ({
    ...item,
    ...interestIcons[index],
  }));

  return (
    <section className="py-20 md:py-28 bg-muted/20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge={t('about.interests.badge')}
          badgeIcon={Heart}
          title={t('about.interests.title')}
          subtitle={t('about.interests.subtitle')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {interests.map((interest, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <TiltCard tiltAmount={8} scale={1.03}>
                <Card className="h-full border-border/50 shadow-sm bg-card/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="text-center flex flex-col items-center py-6">
                    <m.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${interest.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <interest.icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: interest.color }} />
                    </m.div>
                    <h3 className="font-semibold text-sm sm:text-base mb-1">{interest.name}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{interest.description}</p>
                  </CardContent>
                </Card>
              </TiltCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
