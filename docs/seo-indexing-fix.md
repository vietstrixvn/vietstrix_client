# Fix "Discovered - Currently Not Indexed"

## 🔍 Vấn đề

Google Search Console báo **37 trang "Discovered - currently not indexed"**. Trang được phát hiện nhưng không được ưu tiên index.

## ⚠️ KHÔNG PHẢI do traffic thấp

Đây là vấn đề **kỹ thuật SEO**, không liên quan đến số lượt truy cập.

---

## ✅ Các Fix đã thực hiện

### 1. ✅ **Hreflang Alternates cho Sitemap**

**File**: `src/app/sitemap.ts`

- Thêm `alternates.languages` cho tất cả loại trang:
  - Static pages (về chúng tôi, dịch vụ, liên hệ...)
  - Blog categories
  - Blog posts
  - Projects

- Logic matching thông minh giữa EN/VI posts dựa trên `slug`
- Tránh duplicate entries với `Set` tracking

**Output XML**:

```xml
<url>
  <loc>https://www.vietstrix.com/blogs/news/post-slug</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.vietstrix.com/blogs/news/post-slug"/>
  <xhtml:link rel="alternate" hreflang="vi" href="https://www.vietstrix.com/vi/bai-viet/news/post-slug"/>
</url>
```

### 2. ✅ **Breadcrumb Navigation + JSON-LD**

**Files**:

- `src/components/navigation/breadcrumb.tsx` (mới)
- `src/app/[locale]/(public)/blogs/[cate-slug]/[slug]/data.tsx`
- `src/app/[locale]/(public)/blogs/[cate-slug]/[slug]/page.tsx`
- `src/app/[locale]/(public)/projects/[slug]/data.tsx`
- `src/app/[locale]/(public)/projects/[slug]/page.tsx`

**Lợi ích**:

- Cải thiện internal linking structure
- Google hiểu rõ hierarchy của site
- User navigation tốt hơn
- Breadcrumb JSON-LD cho rich results

### 3. ✅ **Canonical URLs**

Đã có sẵn trong `src/utils/metadata.utils.ts`:

- `generatePostMetadata()` luôn set canonical URL
- Tránh duplicate content issues

### 4. ✅ **Structured Data (JSON-LD)**

Đã có:

- Article schema (TechArticle)
- Author schema (Person)
- Publisher schema (Organization)
- **Mới thêm**: Breadcrumb schema

---

## 🎯 Các bước tiếp theo (Cần làm thủ công)

### 1. **Request Indexing từ Google Search Console** ⭐ QUAN TRỌNG NHẤT

```
1. Vào Google Search Console
2. Chọn "URL Inspection"
3. Paste URL chưa được index
4. Click "Request Indexing"

⚠️ Giới hạn: 10-20 URLs/ngày
💡 Ưu tiên: URLs quan trọng nhất (homepage, dịch vụ chính, blog hot...)
```

### 2. **Tăng Internal Links**

**Cần làm thêm**:

- [ ] Thêm "Related Posts" ở sidebar/footer của blog listing pages
- [ ] Thêm "Popular Posts" widget
- [ ] Thêm internal links trong blog content (link đến bài viết khác)
- [ ] Thêm category navigation menu

**Ví dụ**:

```tsx
// Trong blog listing page
<aside>
  <PopularPosts />
  <CategoryMenu />
</aside>
```

### 3. **Cải thiện Page Speed**

Kiểm tra PageSpeed Insights: https://pagespeed.web.dev/

**Cần tối ưu**:

- [ ] Image optimization (AVIF/WebP, lazy loading)
- [ ] Code splitting
- [ ] Reduce JavaScript bundle size
- [ ] Enable caching headers

### 4. **Tăng Crawl Budget**

```
- [ ] Giảm redirect chains
- [ ] Fix 404 errors
- [ ] Improve server response time
- [ ] Submit sitemap.xml thường xuyên
```

### 5. **Build External Backlinks**

```
- [ ] Guest posting trên tech blogs
- [ ] Submit vào directories (Product Hunt, BetaList...)
- [ ] Social media promotion
- [ ] Partnerships với tech communities
```

---

## 📊 Monitoring & Tracking

### Check Indexing Status

```bash
# Google site: search
site:vietstrix.com/blogs

# Check specific URL
site:vietstrix.com/blogs/category/post-slug
```

### Google Search Console Metrics

- **Coverage Report**: Theo dõi "Discovered - not indexed"
- **Sitemaps**: Check sitemap status
- **Core Web Vitals**: Page experience metrics

### Expected Timeline

- **Week 1-2**: Sitemap update + breadcrumb + request indexing → 30-50% URLs indexed
- **Week 3-4**: Internal linking + backlinks → 70-80% URLs indexed
- **Month 2-3**: Continuous optimization → 90%+ URLs indexed

---

## 🚀 Quick Wins (Làm ngay)

### Priority 1: Request Indexing (Ngay hôm nay)

```
1. Homepage
2. Services page
3. Projects page
4. Top 5 blog posts
5. Top 3 categories
```

### Priority 2: Check Errors (Trong tuần)

```
1. Vào GSC → Coverage Report
2. Fix mọi lỗi 404, 500, redirect loop
3. Re-submit sitemap
```

### Priority 3: Create Content Hub (Trong tháng)

```
1. Tạo "Cornerstone Content" - bài viết chất lượng cao
2. Link từ homepage đến cornerstone content
3. Link từ cornerstone content đến related posts
4. Tạo internal linking network
```

---

## 📝 Checklist Đánh giá SEO

- [x] Hreflang alternates trong sitemap
- [x] Breadcrumb navigation
- [x] Breadcrumb JSON-LD structured data
- [x] Canonical URLs
- [x] Article JSON-LD
- [x] Recent posts section
- [ ] Popular posts widget
- [ ] Category navigation
- [ ] Internal links trong content
- [ ] Request indexing GSC
- [ ] Page speed optimization
- [ ] External backlinks

---

## 🔗 Resources

- [Google Search Central - Discovered Not Indexed](https://developers.google.com/search/docs/crawling-indexing/indexing-concepts)
- [Hreflang Best Practices](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Breadcrumb Structured Data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Internal Linking Strategy](https://moz.com/learn/seo/internal-link)

---

## 💡 Lưu ý quan trọng

1. **Kiên nhẫn**: Indexing có thể mất 1-4 tuần
2. **Không spam request**: Google có rate limit
3. **Quality over quantity**: Content chất lượng > số lượng trang
4. **Mobile-first**: Google index mobile version đầu tiên
5. **Monitor liên tục**: Check GSC hàng tuần

---

Last updated: 2026-06-05
