import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Menu, Code } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { MobileMenu } from '@/components/mobile-menu';
import { navigation, brandInfo } from '@/constants/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { trackLinkClick } from '@/lib/analytics';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border md:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">{brandInfo.name}</span>
          </Link>

          {/* Desktop Navigation - Hidden because we use Dock on Desktop now */}
          <nav className="hidden">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isExternal = 'external' in item && item.external;

              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                    onClick={() => trackLinkClick(item.href, item.name)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{t(item.name)}</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-[calc(100%-2rem)]" />
                  </a>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href as Exclude<typeof item.href, 'https://blog.elmerjacobo.dev'>}
                  className="relative flex items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  activeProps={{
                    className: 'text-primary',
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{t(item.name)}</span>
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                          isActive ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'
                        }`}
                      />
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle, Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ModeToggle />

            {/* Mobile menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">{t('header.openMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <VisuallyHidden>
                  <SheetTitle>{t('header.menuTitle')}</SheetTitle>
                  <SheetDescription>{t('header.menuDescription')}</SheetDescription>
                </VisuallyHidden>
                <MobileMenu navigation={navigation} onClose={() => setIsMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
