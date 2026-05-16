import { generatePageMetadata } from '@/constants/appInfos';
import ServicePage from './data';

export const metadata = generatePageMetadata({
  title: 'Vietstrix — Digital Services',
  description: `Explore Vietstrix services — from user-friendly websites to scalable digital products, built for performance and long-term growth.`,
  path: '/services',
  keywords: [
    'vietstrix services',
    'web design services',
    'web development services',
    'digital product services',
    'ui ux design services',
    'frontend development services',
  ],
});

// ISR: Revalidate mỗi 1 ngày (trang tĩnh)
export const revalidate = 86400;

export default function Page() {
  // Organization structured data for SEO
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vietstrix',
    url: 'https://vietstrix.com',
    logo: 'https://vietstrix.com/logo.svg',
    description: `Vietstrix is a creative digital studio providing user-friendly, high-performance websites and scalable digital product solutions.`,
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

  // ServicePage structured data
  const servicePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vietstrix Digital Services',
    description: `We design, build, and optimize digital products — from websites to scalable systems — focused on performance, usability, and long-term growth.`,
    provider: {
      '@type': 'Organization',
      name: 'Vietstrix',
      url: 'https://vietstrix.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Global',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
      />
      <ServicePage />
    </>
  );
}
