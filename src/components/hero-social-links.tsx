import { m } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function HeroSocialLinks() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex justify-center lg:justify-start gap-4 pt-4"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
            >
              <a
                href="https://github.com/elmerjacobo97/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { platform: 'github', location: 'hero' })}
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>GitHub</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
            >
              <a
                href="https://www.linkedin.com/in/elmerjacobo97/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { platform: 'linkedin', location: 'hero' })}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
            >
              <a
                href="mailto:contacto@elmerjacobo.dev?subject=Hola!%20Vi%20tu%20portafolio&body=Me%20gustaría%20contactar%20contigo..."
                onClick={() => trackEvent('social_click', { platform: 'email', location: 'hero' })}
              >
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </m.div>
  );
}
