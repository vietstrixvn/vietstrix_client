//i18n/routing.ts

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about-us': {
      en: '/about-us',
      vi: '/gioi-thieu',
    },
    '/services': {
      en: '/services',
      vi: '/dich-vu',
    },
    '/projects': {
      en: '/projects',
      vi: '/du-an',
    },
    '/projects/[slug]': {
      en: '/projects/[slug]',
      vi: '/du-an/[slug]',
    },
    '/blogs': {
      en: '/blogs',
      vi: '/bai-viet',
    },
    '/blogs/[slug]': {
      en: '/blogs/[slug]',
      vi: '/bai-viet/[slug]',
    },
    '/contact-us': {
      en: '/contact-us',
      vi: '/lien-he',
    },
  },
});
