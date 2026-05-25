import { generatePageMetadata } from '@/constants/appInfos';
import AboutUsSection from './data';

export const metadata = generatePageMetadata({
  title: 'Vietstrix — Creative Digital Studio',
  description: `Discover how Vietstrix crafts user-friendly, high-performing digital experiences — built to last and designed to grow.`,
  path: '/about',
  ogImage: '/imgs/og/about.png',
  keywords: [
    'vietstrix',
    'creative digital studio',
    'web design and development',
    'digital product development',
    'user experience design',
    'frontend development',
  ],
  alternates: {
    languages: {
      en: 'https://www.vietstrix.com/about-us',
      vi: 'https://www.vietstrix.com/vi/gioi-thieu',
    },
  },
});

export const revalidate = 86400;

export default function Page() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vietstrix',
    url: 'https://www.vietstrix.com',
    logo: 'https://www.vietstrix.com/icons/logo-cricle.svg',
    description:
      'Vietstrix is a creative digital studio focused on crafting user-friendly, high-performance websites and digital products that are built to last.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Ho Chi Minh City', // 👈 fix
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Vietnamese'],
    },
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Vietstrix — Creative Digital Studio',
    description:
      'Learn how Vietstrix builds user-friendly, scalable digital products — from websites to systems — designed for long-term growth.',
    url: 'https://www.vietstrix.com/about-us',
    inLanguage: 'en', // 👈 thêm
    mainEntity: {
      '@type': 'Organization',
      name: 'Vietstrix',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <AboutUsSection />
    </>
  );
}
