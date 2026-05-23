import { generatePageMetadata } from '@/constants/appInfos';
import ContactPage from './data';

export const metadata = generatePageMetadata({
  title: 'Vietstrix — Let’s Build Something Together',
  description: `Have an idea or project in mind? Get in touch with Vietstrix to start building user-friendly, high-performing digital products.`,
  path: '/contact',
  keywords: [
    'contact vietstrix',
    'hire web developer',
    'digital product development',
    'web design contact',
    'ui ux services',
    'build website team',
  ],
});

export default function Page() {
  // Organization structured data for SEO
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vietstrix',
    url: 'https://www.vietstrix.com',
    logo: 'https://www.vietstrix.com/icons/logo-cricle.svg',
    description: `Vietstrix is a creative digital studio building user-friendly, high-performance websites and digital products.`,
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

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vietstrix',
    description: `Reach out to Vietstrix to discuss your ideas and start building your next digital product.`,
    url: 'https://www.vietstrix.com/contact',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
