import { defineConfig } from 'astro/config';

// Repo mau nay se duoc app fork va doi ten thanh "{username}.github.io"
// (user site cua GitHub Pages) => site duoc phuc vu tai goc domain,
// khong can cau hinh "base". Neu sau nay dung cho project page (repo thuong,
// khong phai user site) thi can them "base: '/ten-repo/'".
export default defineConfig({
  output: 'static',
  site: 'https://example.github.io',
  trailingSlash: 'ignore',
});
