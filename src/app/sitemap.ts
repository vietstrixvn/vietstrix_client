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
      getCategories({ type: 'blogs', lang: 'en', pageSize: 100 }).catch(
        () => []
      ),
      getCategories({ type: 'blogs', lang: 'vi', pageSize: 100 }).catch(
        () => []
      ),
      getPosts({ type: 'blogs', lang: 'en', pageSize: 100 }).catch(() => ({
        posts: [],
      })),
      getPosts({ type: 'blogs', lang: 'vi', pageSize: 100 }).catch(() => ({
        posts: [],
      })),
      getPosts({ type: 'project', lang: 'en', pageSize: 100 }).catch(() => ({
        posts: [],
      })),
      getPosts({ type: 'project', lang: 'vi', pageSize: 100 }).catch(() => ({
        posts: [],
      })),
    ]);

    const enBlogs = enBlogsResponse.posts || [];
    const viBlogs = viBlogsResponse.posts || [];
    const enProjects = enProjectsResponse.posts || [];
    const viProjects = viProjectsResponse.posts || [];

    // Create slug maps for matching EN/VI categories
    const enCategoryMap = new Map(
      enBlogCategories.map((cat: any) => [cat.slug, cat])
    );
    const viCategoryMap = new Map(
      viBlogCategories.map((cat: any) => [cat.slug, cat])
    );

    // Add blog categories with hreflang alternates
    const processedCategories = new Set<string>();

    enBlogCategories.forEach((cat: any) => {
      if (processedCategories.has(cat.slug)) return;

      const enUrl = `${siteBaseUrl}/blogs/${cat.slug}`;
      const viUrl = `${siteBaseUrl}/vi/bai-viet/${cat.slug}`;
      const lastMod = new Date(cat.updated_at || cat.created_at || new Date());

      // English category
      sitemapEntries.push({
        url: enUrl,
        lastModified: lastMod,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: {
          languages: {
            en: enUrl,
            vi: viUrl,
          },
        },
      });

      // Vietnamese category (if exists)
      if (viCategoryMap.has(cat.slug)) {
        sitemapEntries.push({
          url: viUrl,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: {
            languages: {
              en: enUrl,
              vi: viUrl,
            },
          },
        });
      }

      processedCategories.add(cat.slug);
    });

    // Add VI-only categories
    viBlogCategories.forEach((cat: any) => {
      if (processedCategories.has(cat.slug)) return;

      const viUrl = `${siteBaseUrl}/vi/bai-viet/${cat.slug}`;
      sitemapEntries.push({
        url: viUrl,
        lastModified: new Date(cat.updated_at || cat.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.6,
      });

      processedCategories.add(cat.slug);
    });

    // Create slug maps for matching EN/VI blogs
    const viBlogMap = new Map(viBlogs.map((post: any) => [post.slug, post]));

    // Add blogs with hreflang alternates
    const processedBlogs = new Set<string>();

    enBlogs.forEach((post: any) => {
      if (processedBlogs.has(post.slug)) return;

      const enCategorySlug = post.category?.slug || 'tin-tuc';
      const enUrl = `${siteBaseUrl}/blogs/${enCategorySlug}/${post.slug}`;
      const lastMod = new Date(
        post.updated_at || post.created_at || new Date()
      );

      // Check if Vietnamese version exists
      const viPost = viBlogMap.get(post.slug);

      if (viPost) {
        // Has VI version - add hreflang alternates
        const viCategorySlug = viPost.category?.slug || 'tin-tuc';
        const viUrl = `${siteBaseUrl}/vi/bai-viet/${viCategorySlug}/${post.slug}`;

        // English blog with alternates
        sitemapEntries.push({
          url: enUrl,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: {
            languages: {
              en: enUrl,
              vi: viUrl,
            },
          },
        });

        // Vietnamese blog with alternates
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(
            viPost.updated_at || viPost.created_at || new Date()
          ),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: {
            languages: {
              en: enUrl,
              vi: viUrl,
            },
          },
        });
      } else {
        // EN-only blog - no alternates
        sitemapEntries.push({
          url: enUrl,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }

      processedBlogs.add(post.slug);
    });

    // Add VI-only blogs
    viBlogs.forEach((post: any) => {
      if (processedBlogs.has(post.slug)) return;

      const categorySlug = post.category?.slug || 'tin-tuc';
      const viUrl = `${siteBaseUrl}/vi/bai-viet/${categorySlug}/${post.slug}`;
      sitemapEntries.push({
        url: viUrl,
        lastModified: new Date(
          post.updated_at || post.created_at || new Date()
        ),
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      processedBlogs.add(post.slug);
    });

    // Create slug maps for matching EN/VI projects
    const viProjectMap = new Map(
      viProjects.map((post: any) => [post.slug, post])
    );

    // Add projects with hreflang alternates
    const processedProjects = new Set<string>();

    enProjects.forEach((post: any) => {
      if (processedProjects.has(post.slug)) return;

      const enUrl = `${siteBaseUrl}/projects/${post.slug}`;
      const lastMod = new Date(
        post.updated_at || post.created_at || new Date()
      );

      // Check if Vietnamese version exists
      const viPost = viProjectMap.get(post.slug);

      if (viPost) {
        // Has VI version - add hreflang alternates
        const viUrl = `${siteBaseUrl}/vi/du-an/${post.slug}`;

        // English project with alternates
        sitemapEntries.push({
          url: enUrl,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: {
              en: enUrl,
              vi: viUrl,
            },
          },
        });

        // Vietnamese project with alternates
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(
            viPost.updated_at || viPost.created_at || new Date()
          ),
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: {
              en: enUrl,
              vi: viUrl,
            },
          },
        });
      } else {
        // EN-only project - no alternates
        sitemapEntries.push({
          url: enUrl,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      processedProjects.add(post.slug);
    });

    // Add VI-only projects
    viProjects.forEach((post: any) => {
      if (processedProjects.has(post.slug)) return;

      const viUrl = `${siteBaseUrl}/vi/du-an/${post.slug}`;
      sitemapEntries.push({
        url: viUrl,
        lastModified: new Date(
          post.updated_at || post.created_at || new Date()
        ),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      processedProjects.add(post.slug);
    });
  } catch (error) {
    console.error('Error fetching dynamic sitemap entries:', error);
  }

  return sitemapEntries;
}
