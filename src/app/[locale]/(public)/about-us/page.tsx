import { generatePageMetadata } from '@/constants/appInfos';
import AboutUsSection from './data';

export const metadata = generatePageMetadata({
  title: 'Vietstrix — Creative Digital Studio',
  description: `Discover how Vietstrix crafts user-friendly, high-performing digital experiences — built to last and designed to grow.`,
  path: '/about',
  keywords: [
    'vietstrix',
    'creative digital studio',
    'web design and development',
    'digital product development',
    'user experience design',
    'frontend development',
  ],
});

// ISR: Revalidate mỗi 1 ngày (trang tĩnh)
export const revalidate = 86400;

export default function Page() {
  // Organization structured data for SEO
  // Organization structured data for SEO
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vietstrix',
    url: 'https://www.vietstrix.com',
    logo: 'https://www.vietstrix.com/icons/logo-cricle.svg',
    description: `Vietstrix is a creative digital studio focused on crafting user-friendly, high-performance websites and digital products that are built to last.`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Vietnam',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Vietnamese'],
    },
  };

  // AboutPage structured data
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Vietstrix — Creative Digital Studio',
    description: `Learn how Vietstrix builds user-friendly, scalable digital products — from websites to systems — designed for long-term growth.`,
    url: 'https://www.vietstrix.com/about',
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
