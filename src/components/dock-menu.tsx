import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Home, User, Briefcase, Mail, BookOpen, Github, Linkedin } from 'lucide-react';
import { Dock, DockIcon } from '@/components/ui/dock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

export function DockMenu() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { name: 'header.nav.home', icon: Home, href: '/' },
    { name: 'header.nav.about', icon: User, href: '/about' },
    { name: 'header.nav.projects', icon: Briefcase, href: '/projects' },
    { name: 'header.nav.contact', icon: Mail, href: '/contact' },
    { name: 'header.nav.blog', icon: BookOpen, href: 'https://blog.elmerjacobo.dev/', external: true },
  ];

  const socialItems = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/elmerjacobo97' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/elmerjacobo97/' },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <TooltipProvider>
          <Dock>
            {navItems.map((item) => (
              <DockIcon key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className={`w-full h-full flex items-center justify-center rounded-full transition-colors ${
                          location.pathname === item.href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                        }`}
                      >
                        <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </Link>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* @ts-expect-error - Dynamic translation key from navItems */}
                    <p>{t(item.name)}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}

            <div className="h-full w-px flex items-center">
              <Separator orientation="vertical" className="h-10 bg-border/50" />
            </div>

            {socialItems.map((item) => (
              <DockIcon key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  );
}
