import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, Code } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileMenu } from '@/components/mobile-menu';
import { navigation, brandInfo } from '@/constants/navigation';
import { ModeToggle } from '@/components/mode-toggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">{brandInfo.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 [&.active]:text-primary [&.active]:font-medium"
                activeProps={{ className: 'text-primary font-medium' }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ModeToggle />

            {/* Mobile menu button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <MobileMenu navigation={navigation} onClose={() => setIsMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
