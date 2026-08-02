import { z } from 'astro/zod';
import du_lieu_tho from '../site.config.json';

const schema_site_config = z.object({
  ten_hien_thi: z.string(),
  mo_ta_ngan: z.string(),
  loi_chao: z.string(),
  loai_trang: z.enum(['portfolio', 'blog', 'store', 'landingpage', 'khac']),
  theme_dang_dung: z.string(),
  lien_he: z.object({
    dien_thoai: z.string().optional(),
    email: z.string().optional(),
    mang_xa_hoi: z
      .array(z.object({ ten: z.string(), duong_dan: z.string() }))
      .optional(),
  }),
  hien_thi_kham_pha: z.boolean().default(false),
  google_analytics_id: z.string().optional(),
});

export type SiteConfig = z.infer<typeof schema_site_config>;

// Validate ngay khi module duoc import — neu site.config.json bi app ghi sai
// dinh dang, build se bao loi RO RANG tai day thay vi loi kho hieu o dau do
// trong luc render trang.
export const site_config: SiteConfig = schema_site_config.parse(du_lieu_tho);
