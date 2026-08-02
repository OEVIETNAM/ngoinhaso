import { defineCollection, z } from 'astro:content';

const bo_suu_tap_bai_viet = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    font: z.string().default('inter'), // slug-khong-dau cua 1 trong 20 font (FR-08b)
  }),
});

const bo_suu_tap_san_pham = defineCollection({
  type: 'content',
  schema: z.object({
    ten_san_pham: z.string(),
    gia: z.number(),
    don_vi_tien: z.string().default('VND'),
    anh: z.string(),
    mo_ta: z.string().optional(),
  }),
});

export const collections = {
  posts: bo_suu_tap_bai_viet,
  products: bo_suu_tap_san_pham,
};
