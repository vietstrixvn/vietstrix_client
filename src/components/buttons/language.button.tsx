'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export const LangButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const isVietnamese = locale === 'vi';

  const handleLangChange = (lang: 'vi' | 'en') => {
    if (lang === locale) return;
    router.replace(pathname as any, { locale: lang });
  };

  return (
    <div className="flex items-center gap-4 text-base lg:text-lg">
      <span
        onClick={() => handleLangChange('en')}
        className={`cursor-pointer ${
          !isVietnamese
            ? 'text-white rounded-md p-2 border-b-2 bg-main'
            : 'text-black'
        }`}
      >
        EN
      </span>
      /
      <span
        onClick={() => handleLangChange('vi')}
        className={`cursor-pointer ${
          isVietnamese
            ? 'text-white rounded-md p-2 border-b-2 bg-main'
            : 'text-black'
        }`}
      >
        VN
      </span>
    </div>
  );
};
