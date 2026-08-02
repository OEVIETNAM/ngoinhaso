// Anh xa slug-khong-dau (dung trong front matter "font" cua bai viet, va
// trong ten class .font-* o fonts.css) -> ten family that tren Google Fonts.
// Dung de PostLayout.astro dung dung 1 the <link> Google Fonts cho dung
// font cua bai dang xem (khong nap san ca 20 font).
export const ban_do_font: Record<string, string> = {
  // 10 font pho bien, de doc
  inter: 'Inter',
  roboto: 'Roboto',
  'open-sans': 'Open+Sans',
  'noto-sans': 'Noto+Sans',
  'be-vietnam-pro': 'Be+Vietnam+Pro',
  lato: 'Lato',
  nunito: 'Nunito',
  mulish: 'Mulish',
  'source-sans-3': 'Source+Sans+3',
  montserrat: 'Montserrat',

  // 10 font dep/noi bat
  'playfair-display': 'Playfair+Display',
  lora: 'Lora',
  merriweather: 'Merriweather',
  'cormorant-garamond': 'Cormorant+Garamond',
  'josefin-sans': 'Josefin+Sans',
  quicksand: 'Quicksand',
  comfortaa: 'Comfortaa',
  'baloo-2': 'Baloo+2',
  bitter: 'Bitter',
  'crimson-pro': 'Crimson+Pro',
};

export function lay_duong_dan_google_fonts(slug_font: string): string {
  const ten_family = ban_do_font[slug_font] ?? ban_do_font['inter'];
  // subset vietnamese de dam bao du dau thanh tieng Viet (FR-08b)
  return `https://fonts.googleapis.com/css2?family=${ten_family}:wght@400;600;700&subset=vietnamese&display=swap`;
}
