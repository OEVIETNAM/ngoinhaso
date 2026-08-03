# Hướng dẫn tự chỉnh sửa site trên GitHub

Site của bạn được tạo bằng **Astro**, mọi thứ đều là file text (`.astro`,
`.css`, `.json`, `.md`) — bạn có thể sửa trực tiếp trên GitHub (bấm biểu
tượng ✏️ ở góc mỗi file) mà **không cần cài gì trên máy**. Mỗi lần bạn
lưu (Commit changes), GitHub Actions sẽ tự build và cập nhật site sau
khoảng 1–2 phút.

> 💡 Mẹo: trước khi sửa trên repo thật, có thể tạo 1 nhánh (branch) mới
> để thử, xem site build ổn chưa (tab **Actions**) rồi mới gộp vào
> nhánh chính.

---

## 1. Đổi thông tin cơ bản (tên, mô tả, liên hệ...)

Sửa file **`site.config.json`** ở thư mục gốc:

```json
{
  "ten_hien_thi": "Tên bạn muốn hiển thị",
  "mo_ta_ngan": "Một câu mô tả ngắn",
  "loi_chao": "Lời chào xuất hiện ở trang chủ",
  "loai_trang": "blog",
  "lien_he": {
    "email": "ban@email.com",
    "dien_thoai": "0900 000 000",
    "mang_xa_hoi": [
      { "ten": "Facebook", "duong_dan": "https://facebook.com/ban" }
    ]
  }
}
```

`loai_trang` nhận 1 trong 4 giá trị: `"blog"`, `"portfolio"`, `"store"`,
`"landingpage"` — đổi giá trị này sẽ đổi cả bố cục trang chủ.

---

## 2. Thêm / sửa mục trong thanh menu

File: **`src/components/TheMenu.astro`**

Tìm đoạn:

```astro
<nav class="danh-sach-lien-ket">
  <a href={duong_dan()}>Trang chủ</a>
  {la_store && <a href={duong_dan('products')}>Sản phẩm</a>}
  <a href={duong_dan('about')}>Giới thiệu</a>
  <a href={duong_dan('contact')}>Liên hệ</a>
</nav>
```

Muốn thêm 1 mục mới trỏ tới trang bạn tự tạo (ví dụ `du-an`), thêm 1 dòng:

```astro
<a href={duong_dan('du-an')}>Dự án</a>
```

> ⚠️ **Luôn dùng `duong_dan('ten-trang')` chứ đừng viết thẳng
> `href="/ten-trang"`.** Site của bạn có thể được phục vụ ở gốc domain
> (`abc.github.io`) hoặc trong 1 thư mục con (`abc.github.io/ten-site/`)
> tuỳ vào loại repo — viết thẳng `/ten-trang` sẽ **nhảy về trang gốc sai**
> khi site nằm trong thư mục con. `duong_dan()` tự lo việc này, xem
> `src/lib/duong_dan.ts`.

Lưu ý: chuỗi truyền vào `duong_dan(...)` phải khớp với tên file trang
bạn tạo ở bước 3.

---

## 3. Thêm một trang mới (ví dụ trang "Dự án")

1. Vào thư mục `src/pages/`.
2. Tạo file mới, ví dụ `du-an.astro` (tên file = đường dẫn URL, nên
   `du-an.astro` → trang "du-an").
3. Dán nội dung mẫu sau rồi sửa lại chữ:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout tieu_de="Dự án">
  <article style="max-width: 720px; margin: 0 auto; padding: 4rem 0;">
    <h1>Dự án của tôi</h1>
    <p>Nội dung giới thiệu các dự án bạn đã làm...</p>
  </article>
</BaseLayout>
```

Sau khi commit, thêm link tới trang này vào menu như bước 2. Nếu trang
mới có ảnh hoặc link nội bộ khác, cũng dùng `duong_dan(...)` cho mọi
`href`/`src` trỏ tới file trong chính site này (ảnh/link bên ngoài thì
không cần, viết URL đầy đủ bình thường).

---

## 4. Đăng bài viết mới (nếu site là Blog / Portfolio)

Vào `src/content/posts/`, tạo file `.md` mới, ví dụ `bai-moi.md`:

```md
---
title: "Tiêu đề bài viết"
date: 2026-08-15
tags: ["the-1", "the-2"]
cover: "https://duong-dan-anh-bia.jpg"
font: "be-vietnam-pro"
---

Nội dung bài viết viết bằng Markdown ở đây.
```

`font` là 1 trong 20 font hỗ trợ sẵn (xem danh sách trong
`src/data/danh_sach_font.ts`) — chỉ áp dụng cho phần nội dung bài viết,
không ảnh hưởng menu/footer.

---

## 5. Thêm sản phẩm mới (nếu site là Store)

Vào `src/content/products/`, tạo file `.md` mới:

```md
---
ten_san_pham: "Tên sản phẩm"
gia: 150000
don_vi_tien: "VND"
anh: "https://duong-dan-anh-san-pham.jpg"
mo_ta: "Mô tả ngắn gọn"
---
Mô tả chi tiết sản phẩm (không bắt buộc).
```

---

## 6. Đổi màu sắc / khoảng cách / bo góc của theme

File: **`src/styles/theme.css`** — mọi màu và khoảng cách đều là
**biến CSS** khai báo ở đầu file (`:root { ... }`). Sửa giá trị,
không cần đụng vào các file khác:

```css
:root {
  --mau-nen: #ffffff;       /* màu nền toàn trang */
  --mau-chu: #1c1c1c;       /* màu chữ chính */
  --mau-nhan-manh: #2b2b2b; /* màu nút, liên kết nổi bật */
  --do-bo-goc: 4px;         /* bo góc ảnh/thẻ/nút, 0 = vuông, 20+ = rất tròn */
  --khoang-cach-vua: 1.5rem;
  ...
}
```

Ví dụ: muốn đổi màu nhấn sang xanh lá, chỉ cần sửa:
```css
--mau-nhan-manh: #1f9d55;
```
Tất cả nút, link, viền nổi bật trên toàn site sẽ tự đổi theo.

---

## 7. Đổi bố cục trang chủ (nâng cao)

4 kiểu trang chủ nằm ở `src/components/home/`:
- `BlogHome.astro`
- `PortfolioHome.astro`
- `StoreHome.astro`
- `LandingHome.astro`

Mỗi file có phần `---...---` (logic lấy dữ liệu), phần HTML, và phần
`<style>` riêng ở cuối file. Bạn có thể sửa trực tiếp cấu trúc HTML/CSS
trong từng file mà không ảnh hưởng các trang còn lại.

---

## 8. Kiểm tra sau khi sửa

1. Vào tab **Actions** trên GitHub repo của bạn.
2. Chờ workflow "Xay dung va xuat ban" chạy xong (dấu ✓ xanh).
3. Nếu có dấu ✗ đỏ, bấm vào để xem log lỗi — thường là do sai cú pháp
   (thiếu dấu ngoặc, sai định dạng ngày `date`, JSON không hợp lệ...).
4. Site cập nhật tại địa chỉ GitHub Pages của bạn (Settings → Pages).

---

## 9. Đổi sang theme khác

Repo mẫu có 4 nhánh (branch) theme khác nhau: `theme-toi-gian`,
`theme-tap-chi`, `theme-nang-dong`, `theme-toi-mau`. Muốn đổi theme:

1. Xem trước từng theme bằng cách chuyển nhánh trên GitHub (dropdown
   "main" ở góc trên bên trái danh sách file → chọn nhánh khác).
2. Nếu ưng ý, có thể copy 2 nhóm file sau từ nhánh theme đó sang nhánh
   đang publish (`main`) của bạn:
   - `src/styles/theme.css`
   - `src/components/home/*.astro` (cả 4 file)
3. Commit — site sẽ build lại với giao diện mới, **nội dung bài viết/
   sản phẩm/cấu hình giữ nguyên** vì chúng nằm ở file khác.

---

## 10. Xử lý sự cố thường gặp

**Site bấm vào link nào cũng nhảy về trang gốc / ảnh vỡ, thiếu CSS:**
Repo của bạn đang là "project site" (tên repo không phải
`{ten}.github.io`) nên site được phục vụ trong 1 thư mục con
(`ten-org.github.io/ten-repo/`), không phải ở gốc domain. `deploy.yml`
đã tự tính đường dẫn này khi build — nếu vẫn gặp lỗi, kiểm tra:
- Bạn có tự viết `href="/..."` ở đâu đó thay vì dùng `duong_dan(...)`
  không (xem mục 2).
- Actions build có thành công không (tab Actions).

**Đổi nhánh (theme) xong mà site không tự cập nhật:** workflow đã cấu
hình để chạy trên **mọi nhánh được push**, không riêng `main` — mỗi lần
push, bản build mới nhất (bất kể nhánh nào) sẽ được xuất bản. Nếu vẫn
không thấy chạy, kiểm tra tab Actions xem có workflow run nào xuất hiện
không; nếu không có run nào cả, khả năng cao **Settings → Pages →
Source** chưa để đúng **"GitHub Actions"**.
