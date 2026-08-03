// Ghep 1 duong dan noi bo (vd "blog/bai-viet-1", "products") voi BASE_URL
// cua site (xem astro.config.mjs). BAT BUOC dung ham nay cho MOI lien ket
// noi bo (href, src trong <link>, v.v.) thay vi viet thang "/..." trong
// code — neu khong, link se SAI khi site duoc phuc vu duoi 1 thu muc con
// (vi du oevietnam.github.io/ngoinhaso/) thay vi o goc domain rieng.
//
// Vi du:
//   duong_dan('blog/' + slug)   ->  "/ngoinhaso/blog/slug"  (project site)
//                                 hoac "/blog/slug"           (user site)
//   duong_dan('')                ->  "/ngoinhaso/"            (trang chu)
export function duong_dan(duong_dan_tuong_doi: string = ''): string {
  const goc = import.meta.env.BASE_URL; // vd "/" hoac "/ngoinhaso/"
  const phan_sau = duong_dan_tuong_doi.replace(/^\/+/, '');
  return phan_sau ? `${goc}${phan_sau}` : goc;
}
