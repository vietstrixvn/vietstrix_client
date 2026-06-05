import { generatePageMetadata } from '@/constants/appInfos';
import ContactPage from './data';

export const metadata = generatePageMetadata({
  title: 'Vietstrix — Let’s Build Something Together',
  description: `Have an idea or project in mind? Get in touch with Vietstrix to start building user-friendly, high-performing digital products.`,
  path: '/contact-us',
  ogImage: '/imgs/og/contact.png',
  keywords: [
    'contact vietstrix',
    'hire web developer',
    'digital product development',
    'web design contact',
    'ui ux services',
    'build website team',
  ],
  alternates: {
    languages: {
      en: 'https://www.vietstrix.com/contact-us',
      vi: 'https://www.vietstrix.com/vi/lien-he',
    },
  },
});

export default function Page() {
  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vietstrix',
    inLanguage: 'en',
    url: 'https://www.vietstrix.com/contact-us',
    description:
      'Reach out to Vietstrix to discuss your ideas and start building your next digital product.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Vietstrix',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
