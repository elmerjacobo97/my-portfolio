import { Heart } from 'lucide-react';
import { brandInfo } from '@/constants/navigation';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">{brandInfo.copyright}</p>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>usando React & TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
