# Báo cáo Đánh giá GEO (Generative Engine Optimization) - Vietstrix.com

Đánh giá mức độ hiển thị và khả năng trích xuất thông tin của website [vietstrix.com](https://vietstrix.com) trên các công cụ tìm kiếm sử dụng Trí tuệ nhân tạo (AI Search) như **Google AI Overviews, ChatGPT Search, Perplexity** và **Claude**.

---

## 📊 Điểm số Sẵn sàng GEO (GEO Readiness Score)

### **81 / 100**

_Mặc dù website có nền tảng kỹ thuật và cấu trúc HTML rất thân thiện với công cụ tìm kiếm, điểm số bị hạn chế do cấu hình chặn hầu hết các bot thu thập dữ liệu của AI trong file `robots.txt` và thiếu file mô tả dữ liệu `llms.txt`._

---

## 🔍 Chi tiết Phân tích GEO (GEO Analysis Breakdown)

### 1. Điểm số theo Nền tảng (Platform Scores)

- **Google AI Overviews:** **88 / 100** — Khả năng hiển thị cao nhờ tối ưu hóa SEO truyền thống tốt và sử dụng Server-Side Rendering (Next.js), cho phép Googlebot quét nội dung dễ dàng.
- **ChatGPT Search:** **30 / 100** — Khả năng xuất hiện trực tiếp rất thấp do bot quét chính của OpenAI (`GPTBot`) đang bị chặn hoàn toàn.
- **Perplexity:** **75 / 100** — Khả năng hiển thị trung bình khá, phụ thuộc vào dữ liệu chỉ mục của Bing/Google và các thảo luận từ Reddit.

### 2. Trạng thái Quyền truy cập của AI Crawler (AI Crawler Access Status)

Dưới đây là cấu hình hiện tại trong file `robots.txt` đối với các bot AI:

| Tên Bot AI          | Tổ chức sở hữu        | Trạng thái     | Hướng khắc phục                                                             |
| ------------------- | --------------------- | -------------- | --------------------------------------------------------------------------- |
| **GPTBot**          | OpenAI (ChatGPT)      | ❌ **Blocked** | Đổi thành `Allow` nếu muốn ChatGPT trích dẫn trực tiếp link web.            |
| **OAI-SearchBot**   | OpenAI (Tìm kiếm)     | ✅ **Allowed** | Giữ nguyên để hiển thị trên tính năng tìm kiếm của OpenAI.                  |
| **ClaudeBot**       | Anthropic (Claude)    | ❌ **Blocked** | Cân nhắc mở nếu muốn Claude lấy nguồn từ web của bạn.                       |
| **Google-Extended** | Google (Gemini)       | ❌ **Blocked** | Ngăn Gemini dùng dữ liệu huấn luyện (Giữ nguyên nếu không muốn huấn luyện). |
| **CCBot**           | Common Crawl          | ❌ **Blocked** | Tốt (Giữ nguyên để chặn các bên cào dữ liệu rác).                           |
| **Bytespider**      | ByteDance (TikTok AI) | ❌ **Blocked** | Tốt (Giữ nguyên).                                                           |

### 3. Trạng thái file `llms.txt`

- **Trạng thái:** ❌ **Chưa có (Missing)**
- **Đề xuất:** Tạo tệp `/llms.txt` tại thư mục public gốc để cung cấp một bản tóm tắt ngắn gọn dưới dạng Markdown cho các mô hình ngôn ngữ lớn (LLM) đọc trực tiếp cấu trúc dự án.

### 4. Đánh giá tính Trích dẫn văn bản (Passage-Level Citability)

- **Điểm cộng:** Các phần giới thiệu dịch vụ có cấu trúc rõ ràng dạng gạch đầu dòng, giúp AI dễ dàng chuyển đổi thành dạng danh sách khi trả lời người dùng.
- **Điểm trừ:** Thiếu các khối câu hỏi FAQ trực tiếp dạng "Vietstrix là gì?", "Quy trình làm MVP của Vietstrix như thế nào?".
- **Độ dài đoạn văn tối ưu:** Các đoạn giới thiệu hiện tại có độ dài trung bình 60-80 từ, trong khi độ dài lý tưởng cho AI trích dẫn nguyên văn là **134-167 từ**.

### 5. Kiểm tra dựng trang phía máy chủ (Server-Side Rendering - SSR)

- **Kết quả:** ✅ **Tương thích hoàn hảo (Next.js SSR)**.
- Các bot AI không hỗ trợ thực thi JavaScript vẫn có thể đọc toàn bộ nội dung HTML thô của trang chủ một cách trơn tru.

---

## 🛠️ Đề xuất 5 cải tiến có tầm ảnh hưởng lớn nhất (Top 5 GEO Changes)

### 1. Cho phép ChatGPT và Claude quét nội dung cho mục đích tìm kiếm

Nếu mục tiêu của bạn là tăng lượng khách hàng tìm kiếm từ các công cụ AI (Search-referred traffic), hãy cập nhật file `robots.txt`:

```diff
-User-Agent: GPTBot
-Disallow: /
+User-Agent: GPTBot
+Allow: /

-User-Agent: ClaudeBot
-Disallow: /
+User-Agent: ClaudeBot
+Allow: /
```

### 2. Triển khai tệp `/llms.txt`

Tạo một file có tên `llms.txt` đặt tại `/public/llms.txt` với nội dung tóm tắt để AI đọc:

```markdown
# Vietstrix

> Vietstrix is a product-driven development agency building high-performance web applications and MVPs.

## Key Services

- **End-to-End Web Development:** Custom next.js/typescript applications.
- **Product Design & UI/UX:** High-fidelity branding and user interfaces.
- **MVP Development:** Build and launch startup products in 2-4 weeks.

## Contact Information

- Website: https://www.vietstrix.com
- LinkedIn: https://www.linkedin.com/company/vietstrix
- GitHub: https://github.com/vietstrixvn
```

### 3. Tối ưu đoạn định nghĩa dịch vụ (Citability Block)

Viết lại đoạn giới thiệu thương hiệu trên trang chủ thành một khối văn bản khoảng 140 từ, giải thích đầy đủ: **Ai, Làm gì, Cho ai, Bằng công nghệ gì**.
_Ví dụ đoạn văn đề xuất:_

> "Vietstrix is a premium product-driven software development agency specializing in building high-performance web applications and Minimum Viable Products (MVPs) for startups and local businesses. We assist companies in transforming concepts into reliable digital products, managing everything from UI/UX design to full-stack engineering and cloud deployment. Our tech stack is built on modern and scalable frameworks including React, Next.js, Node.js, and TypeScript, backed by robust database solutions. By delivering ready-to-market applications in under 4 weeks, Vietstrix helps founders validate their ideas efficiently while mitigating technical debt. We ensure clean code handoff and long-term systems optimization."

### 4. Triển khai cấu trúc FAQ (Hỏi & Đáp)

Thêm một phần FAQ ngắn ở cuối trang để hướng trực tiếp tới các câu hỏi người dùng hay hỏi các chat bot AI:

- _Q: Vietstrix có thể xây dựng MVP trong bao lâu?_
- _A: Tụi mình có thể thiết kế và đưa sản phẩm khả dụng tối giản (MVP) ra thị trường chỉ trong vòng 2 đến 4 tuần._

### 5. Tăng cường thực thể liên kết (Entity Linking SameAs)

Bổ sung liên kết `sameAs` vào Schema `Organization` hiện có trỏ tới trang LinkedIn và GitHub của đội ngũ để Google AI liên kết thực thể doanh nghiệp của bạn với các nền tảng mạng xã hội khác.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free → https://www.skool.com/ai-marketing-hub
⚡ Pro → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
