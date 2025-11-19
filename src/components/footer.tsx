import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <span>{t('footer.madeWith').split('❤️')[0]}</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>{t('footer.madeWith').split('❤️')[1]}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
