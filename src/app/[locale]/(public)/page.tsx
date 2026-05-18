import { getPosts } from '@/libs/seo/getPosts';
import type { Metadata } from 'next';
import HomePage from './data';

export const metadata: Metadata = {
  title: 'Vietstrix',
  description:
    'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
  keywords: [
    'web development',
    'freelance developer',
    'outsourcing web',
    'frontend development',
    'backend development',
    'fullstack development',
    'reactjs',
    'nextjs',
    'web app development',
    'software outsourcing',
    'fullstack developer',
    'web developer',
    'Next.js',
    'React',
    'NestJS',
    'Node.js',
    'TypeScript',
    'UI/UX',
    'designer',
    'cloud',
    'database',
    'frontend',
    'backend',
    'portfolio',
    'personal website',
    'developer profile',
  ],
  openGraph: {
    title: 'Vietstrix - Build every thing',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    url: 'https://vietstrix.com',
    type: 'website',
    images: [
      {
        url: 'https://vietstrix.com/imgs/OG-Image.png',
        width: 1200,
        height: 630,
        alt: 'Vietstrix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vietstrix - Build every thing',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    images: ['https://vietstrix.com/imgs/OG-Image.png'],
    creator: '@vietstrix',
  },
};

// ISR: Revalidate mỗi 1 giờ
export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { posts } = await getPosts({
    type: 'blogs',
    pageSize: 4,
    lang: locale,
  });
  const { posts: projects } = await getPosts({
    type: 'project',
    pageSize: 4,
    lang: locale,
  });

  // Organization structured data for SEO
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vietstrix',
    alternateName: 'Vietstrix Team',
    url: 'https://vietstrix.com',
    logo: 'https://vietstrix.com/icons/logo-cricle.svg',
    description:
      'Vietstrix is a product-driven freelance team building high-performance and scalable web applications. We partner with startups and businesses to turn ideas into reliable digital products — from design and development to deployment and growth.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Ho Chi Minh City, Vietnam',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['English', 'Vietnamese'],
    },
    sameAs: [
      'https://www.facebook.com/VietStrix.dev',
      'https://github.com/vietstrixvn',
      'https://www.linkedin.com/company/vietstrix',
      'https://www.instagram.com/vietstrix',
    ],
  };

  // WebSite structured data for homepage
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vietstrix',
    url: 'https://vietstrix.com',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vietstrix.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomePage posts={posts} projects={projects} />
    </>
  );
}
