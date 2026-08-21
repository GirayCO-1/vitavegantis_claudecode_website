export type SalesPoint = {
  name: string;
  logo: string;
  href?: string;
};

// vitavegantis.com/satisnoktalari/ üzerindeki gerçek satış noktası
// ortakları, logoları ve bağlantıları.
export const salesPoints: SalesPoint[] = [
  { name: "Boldy TR", logo: "/satisnoktalari/boldytr.jpeg", href: "https://boldy.com.tr/tr" },
  { name: "Sade Gıda", logo: "/satisnoktalari/sadegida.png", href: "https://sadegida.com.tr/" },
  { name: "Vegan Pazaryeri", logo: "/satisnoktalari/veganpazaryeri.png", href: "https://veganpazaryeri.com/vitavegantis" },
  { name: "Veganistasyon", logo: "/satisnoktalari/veganistasyon.webp", href: "https://veganistasyon.com/search?s=vitavegantis" },
  { name: "Vegan Dükkan", logo: "/satisnoktalari/vegandukkan.png", href: "https://www.vegandukkan.com/search?type=product&q=Vita+vegantis" },
  { name: "Vegan Bakkal", logo: "/satisnoktalari/veganbakkal.png", href: "https://www.veganbakkal.com.tr/Arama?1&kelime=vitavegantis" },
  { name: "Etik Bakkal", logo: "/satisnoktalari/etikbakkal.webp", href: "https://etikbakkal.com/?product_cat=&s=vita+Vegantis&post_type=product" },
  { name: "Gabo Cafe", logo: "/satisnoktalari/gabocafe.png", href: "https://gaboplantbased.com/" },
  { name: "Simply Vegan", logo: "/satisnoktalari/simplyvegan.png", href: "https://simplyvegan.com.tr/search?q=vitavegantis&options%5Bprefix%5D=last" },
  { name: "Just Vegan Store", logo: "/satisnoktalari/justveganstore.jpg", href: "https://www.justveganstore.com/urun/vitavegantis-vegan-sucuk-150-g-1896" },
  { name: "Keyif Gurme", logo: "/satisnoktalari/keyifgurme.webp" },
  { name: "Zaten Vegan", logo: "/satisnoktalari/zatenvegan.jpg", href: "https://www.trendyol.com/magaza/vita-vegantis-m-635431?sst=0" },
  { name: "Moono", logo: "/satisnoktalari/moono.jpg", href: "https://www.trendyol.com/magaza/vita-vegantis-m-635431?sst=0" },
  { name: "Bite Me", logo: "/satisnoktalari/biteme.jpg", href: "https://www.trendyol.com/magaza/vita-vegantis-m-635431?sst=0" },
  { name: "Zeus Vegkek", logo: "/satisnoktalari/zeus.png", href: "https://www.trendyol.com/magaza/vita-vegantis-m-635431?sst=0" },
  { name: "Hepsiburada", logo: "/satisnoktalari/hepsiburada.png", href: "https://www.hepsiburada.com/Vitavegantis" },
  { name: "Trendyol", logo: "/satisnoktalari/trendyol.png", href: "https://www.trendyol.com/magaza/vita-vegantis-m-635431?sst=0" },
];
