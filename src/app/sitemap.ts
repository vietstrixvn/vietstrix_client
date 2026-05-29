import { MetadataRoute } from 'next';
import { siteBaseUrl } from '@/constants';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages
  const staticPages = [
    {
      path: '',
      viPath: 'vi',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      path: 'about-us',
      viPath: 'vi/gioi-thieu',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: 'services',
      viPath: 'vi/dich-vu',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: 'projects',
      viPath: 'vi/du-an',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: 'blogs',
      viPath: 'vi/bai-viet',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: 'contact-us',
      viPath: 'vi/lien-he',
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    },
  ];

  for (const page of staticPages) {
    const enUrl = page.path ? `${siteBaseUrl}/${page.path}` : siteBaseUrl;
    const viUrl = `${siteBaseUrl}/${page.viPath}`;

    // English static page entry with vi alternate
    sitemapEntries.push({
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: enUrl,
          vi: viUrl,
        },
      },
    });

    // Vietnamese static page entry with en alternate
    sitemapEntries.push({
      url: viUrl,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          en: enUrl,
          vi: viUrl,
        },
      },
    });
  }

  // 2. Dynamic Categories & Posts
  try {
    const [
      enBlogCategories,
      viBlogCategories,
      enBlogsResponse,
      viBlogsResponse,
      enProjectsResponse,
      viProjectsResponse,
    ] = await Promise.all([
      getCategories({ type: 'blogs', lang: 'en', pageSize: 100 }).catch(() => []),
      getCategories({ type: 'blogs', lang: 'vi', pageSize: 100 }).catch(() => []),
      getPosts({ type: 'blogs', lang: 'en', pageSize: 100 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'blogs', lang: 'vi', pageSize: 100 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'project', lang: 'en', pageSize: 100 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'project', lang: 'vi', pageSize: 100 }).catch(() => ({ posts: [] })),
    ]);

    const enBlogs = enBlogsResponse.posts || [];
    const viBlogs = viBlogsResponse.posts || [];
    const enProjects = enProjectsResponse.posts || [];
    const viProjects = viProjectsResponse.posts || [];

    // Add English blog categories
    enBlogCategories.forEach((cat: any) => {
      sitemapEntries.push({
        url: `${siteBaseUrl}/blogs/${cat.slug}`,
        lastModified: new Date(cat.updated_at || cat.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });

    // Add Vietnamese blog categories
    viBlogCategories.forEach((cat: any) => {
      sitemapEntries.push({
        url: `${siteBaseUrl}/vi/bai-viet/${cat.slug}`,
        lastModified: new Date(cat.updated_at || cat.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });

    // Add English Blogs
    enBlogs.forEach((post: any) => {
      const categorySlug = post.category?.slug || 'tin-tuc';
      sitemapEntries.push({
        url: `${siteBaseUrl}/blogs/${categorySlug}/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    // Add Vietnamese Blogs
    viBlogs.forEach((post: any) => {
      const categorySlug = post.category?.slug || 'tin-tuc';
      sitemapEntries.push({
        url: `${siteBaseUrl}/vi/bai-viet/${categorySlug}/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    // Add English Projects
    enProjects.forEach((post: any) => {
      sitemapEntries.push({
        url: `${siteBaseUrl}/projects/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Add Vietnamese Projects
    viProjects.forEach((post: any) => {
      sitemapEntries.push({
        url: `${siteBaseUrl}/vi/du-an/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('Error fetching dynamic sitemap entries:', error);
  }

  return sitemapEntries;
}
