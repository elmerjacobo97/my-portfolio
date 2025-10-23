import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';
import { socialLinks } from '@/constants/navigation';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MobileMenuProps {
  navigation: NavigationItem[];
  onClose: () => void;
}

export function MobileMenu({ navigation, onClose }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col space-y-1 mt-12">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-200 [&.active]:text-primary [&.active]:font-medium p-3 rounded-lg hover:bg-muted/50"
            activeProps={{ className: 'text-primary font-medium bg-muted/50' }}
            onClick={onClose}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-base">{item.name}</span>
          </Link>
        ))}
      </nav>

      <Separator className="my-6" />

      {/* Mobile Social Links */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground px-3">Redes sociales</p>
        <div className="flex flex-wrap gap-3 px-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              title={social.name}
            >
              <social.icon className="w-5 h-5" />
              <span className="text-sm">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
