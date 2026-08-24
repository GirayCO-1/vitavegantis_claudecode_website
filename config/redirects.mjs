/**
 * Kalıcı (301) yönlendirmelerin TEK kaynağı.
 *
 * İki hedef bunu okur:
 *  - next.config.ts  → Vercel'de Next.js yönlendirmeleri
 *  - scripts/make-htaccess.mjs → IHS'de Apache .htaccess kuralları
 *
 * Yeni bir yönlendirme eklerken yalnızca burayı düzenlemek yeterli;
 * iki tarafta da otomatik geçerli olur.
 */

/** Geliştirme sırasında kullanılan iç slug → eski sitedeki gerçek adres. */
export const legacyProductUrls = {
  "vegan-sosis": "vita-vegantis-vegan-sosis-tadinda",
  "ispanakli-sosis": "vita-vegantis-ispanakli-sosis-tadinda",
  "vegan-sucuk": "vita-vegantis-vegan-sucuk",
  "tavuk-doner": "vita-vegantis-tavuk-doner-tadinda",
  "isvec-kofte": "vita-vegantis-vegan-isvec-kofte",
  "besin-mayasi": "vita-vegantis-besin-mayasi",
  "hot-dog": "vita-vegantis-hot-dog-vosis",
};

export const legacyRecipeUrls = {
  "vegan-iskender": "vegan-iskender-tarifi",
  "sucuklu-kuru-fasulye": "bitki-bazli-sucuklu-kuru-fasulye-tarifi",
  "salcali-sosis": "bitki-bazli-salcali-sosis-tarifi",
};

/** { from, to } listesi — ikisi de sonda eğik çizgi olmadan yazılır. */
export const redirectPairs = [
  ...Object.entries(legacyProductUrls).map(([slug, urlSlug]) => ({
    from: `/urunler/${slug}`,
    to: `/${urlSlug}`,
  })),
  ...Object.entries(legacyRecipeUrls).map(([slug, urlSlug]) => ({
    from: `/tarifler/${slug}`,
    to: `/${urlSlug}`,
  })),
  // Eski sitede yer alan, artık üretilmeyen ürün.
  { from: "/vita-vegantis-vegan-doner", to: "/urunler" },
  // Geliştirme sırasında kullandığımız ad; sayfa /hakkimizda adresine taşındı.
  { from: "/vizyon-misyon", to: "/hakkimizda" },
  // Eski e-ticaret sayfaları — bu sitede sepet/ödeme yok.
  { from: "/magaza", to: "/urunler" },
  { from: "/market", to: "/urunler" },
  { from: "/sepet", to: "/urunler" },
  { from: "/odeme", to: "/urunler" },
  { from: "/hesabim", to: "/urunler" },
];
