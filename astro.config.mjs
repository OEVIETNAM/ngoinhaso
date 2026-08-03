import { defineConfig } from 'astro/config';

// Duong dan goc (base) PHAI duoc xac dinh dung, vi repo mau nay co the
// duoc fork thanh 2 kieu site khac nhau tren GitHub Pages:
//  - "User site":    repo ten "{username}.github.io"  -> site o GOC domain, base = "/"
//  - "Project site":  repo ten bat ky (vd "ngoinhaso")  -> site o /ten-repo/, base = "/ten-repo/"
// Vi ten repo chi biet duoc luc fork (khong biet truoc khi viet code mau
// nay), gia tri nay duoc GitHub Actions TU TINH va truyen vao qua bien moi
// truong PUBLIC_BASE_PATH ngay truoc buoc build (xem .github/workflows/deploy.yml).
// Khi chay "npm run dev"/"npm run build" tren may ca nhan (khong qua Actions),
// bien nay khong duoc dat => mac dinh "/" (dung cho dev, xem truoc noi bo).
const duong_dan_goc = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  base: duong_dan_goc,
  trailingSlash: 'ignore',
});
