export function JsonLd() {
  const baseUrl = 'https://www.vietstrix.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vietstrix',
    alternateName: 'Vietstrix Team',
    url: baseUrl,
    logo: `${baseUrl}/icons/logo-cricle.svg`,
    description:
      'Vietstrix is a product-driven freelance team building high-performance and scalable web applications. We partner with startups and businesses to turn ideas into reliable digital products — from design and development to deployment and growth.',
    sameAs: [
      // add real links vào đây nếu có
      'https://www.facebook.com/VietStrix.dev',
      'https://github.com/vietstrixvn',
      'https://www.linkedin.com/company/vietstrix',
      'https://www.instagram.com/vietstrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Vietnamese'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vietstrix',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
