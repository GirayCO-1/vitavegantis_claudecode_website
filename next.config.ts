import type { NextConfig } from "next";

/**
 * Geliştirme sırasında kullandığımız ara adresler (iç slug) ile
 * eski sitedeki gerçek adresler arasındaki eşleme.
 * Kanonik adres her zaman sağdaki, kök seviyeli eski URL'dir.
 */
const legacyProductUrls: Record<string, string> = {
  "vegan-sosis": "vita-vegantis-vegan-sosis-tadinda",
  "ispanakli-sosis": "vita-vegantis-ispanakli-sosis-tadinda",
  "vegan-sucuk": "vita-vegantis-vegan-sucuk",
  "tavuk-doner": "vita-vegantis-tavuk-doner-tadinda",
  "isvec-kofte": "vita-vegantis-vegan-isvec-kofte",
  "besin-mayasi": "vita-vegantis-besin-mayasi",
  "hot-dog": "vita-vegantis-hot-dog-vosis",
};

const legacyRecipeUrls: Record<string, string> = {
  "vegan-iskender": "vegan-iskender-tarifi",
  "sucuklu-kuru-fasulye": "bitki-bazli-sucuklu-kuru-fasulye-tarifi",
  "salcali-sosis": "bitki-bazli-salcali-sosis-tarifi",
};

const nextConfig: NextConfig = {
  // Eski site WordPress varsayılanı olan sonda eğik çizgiyi kullanıyordu.
  // Adreslerin birebir aynı kalması için aynı biçimi sürdürüyoruz.
  trailingSlash: true,

  async redirects() {
    return [
      ...Object.entries(legacyProductUrls).map(([slug, urlSlug]) => ({
        source: `/urunler/${slug}`,
        destination: `/${urlSlug}`,
        permanent: true,
      })),
      ...Object.entries(legacyRecipeUrls).map(([slug, urlSlug]) => ({
        source: `/tarifler/${slug}`,
        destination: `/${urlSlug}`,
        permanent: true,
      })),
      // Eski sitede yer alan, artık üretilmeyen ürün.
      {
        source: "/vita-vegantis-vegan-doner",
        destination: "/urunler",
        permanent: true,
      },
      // Geliştirme sırasında kullandığımız ad; sayfa /hakkimizda adresine taşındı.
      { source: "/vizyon-misyon", destination: "/hakkimizda", permanent: true },
      // Eski e-ticaret sayfaları — bu sitede sepet/ödeme yok.
      { source: "/magaza", destination: "/urunler", permanent: true },
      { source: "/market", destination: "/urunler", permanent: true },
      { source: "/sepet", destination: "/urunler", permanent: true },
      { source: "/odeme", destination: "/urunler", permanent: true },
      { source: "/hesabim", destination: "/urunler", permanent: true },
    ];
  },
};

export default nextConfig;
