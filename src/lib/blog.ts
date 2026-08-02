export type BlogPost = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

// vitavegantis.com/blog (1. ve 2. sayfa) üzerinden alınan gerçek yazılar,
// kapak görselleri ve özetler.
export const blogPosts: BlogPost[] = [
  {
    title: "Vegan İskender Tarifi",
    excerpt:
      "Vita Vegantis'in bitki bazlı döner ürünüyle hazırlanan, geleneksel lezzetini koruyan nefis bir İskender alternatifi.",
    image: "/blog/vegan-iskender-tarifi.jpg",
    href: "https://vitavegantis.com/vegan-iskender-tarifi/",
  },
  {
    title: "Bitki Bazlı Sucuklu Kuru Fasulye Tarifi",
    excerpt:
      "Protein ve lif açısından zengin malzemelerle hazırlanan, sağlıklı ve doyurucu bir vegan kuru fasulye tarifi.",
    image: "/blog/sucuklu-kuru-fasulye-tarifi.webp",
    href: "https://vitavegantis.com/bitki-bazli-sucuklu-kuru-fasulye-tarifi/",
  },
  {
    title: "Bitki Bazlı Salçalı Sosis Tarifi",
    excerpt:
      "Vita Vegantis bitki bazlı sosisleriyle hazırlanan salçalı sosisin malzemeleri ve yapılış adımları.",
    image: "/blog/salcali-sosis-tarifi.jpg",
    href: "https://vitavegantis.com/bitki-bazli-salcali-sosis-tarifi/",
  },
  {
    title:
      "Vegan Ürün Tüketimi ve Bitki Bazlı Beslenmede Türkiye ve Avrupa Yükselişte",
    excerpt:
      "Türkiye ve Avrupa'da bitki bazlı beslenmenin yükselişi; tüketicilerin çevre, sağlık ve hayvan hakları motivasyonları.",
    image: "/blog/vegan-urun-tuketimi.webp",
    href: "https://vitavegantis.com/vegan-urun-tuketimi-ve-bitki-bazli-beslenmede-turkiye-ve-avrupa-yukseliste/",
  },
  {
    title: "Vegan Beslenmeye Başlamanıza Yardımcı Olacak 7 Sağlıklı İpucu",
    excerpt:
      "Vegan diyete yeni başlayanlar için pratik öneriler: sebze çeşitliliği, tam tahıllar ve kritik vitamin kaynakları.",
    image: "/blog/7-saglikli-ipucu.jpg",
    href: "https://vitavegantis.com/vegan-beslenmeye-baslamaniza-yardimci-olacak-7-saglikli-ipucu/",
  },
  {
    title: "Vejetaryenler Ne Yemez?",
    excerpt:
      "Vejetaryen beslenmenin tanımı ve vegan, lakto-vejetaryen, ova-vejetaryen gibi farklı türlerin özellikleri.",
    image: "/blog/vejetaryenler-ne-yemez.webp",
    href: "https://vitavegantis.com/vejetaryenler-ne-yemez/",
  },
  {
    title: "Vegan Olmanın Sağlığımıza En Önemli 7 Faydası",
    excerpt:
      "Artan fiziksel performanstan cilt sağlığına, vegan beslenmenin bilimsel olarak desteklenen yedi önemli faydası.",
    image: "/blog/vegan-7-faydasi.webp",
    href: "https://vitavegantis.com/vegan-olmanin-sagligimiza-en-onemli-7-faydasi/",
  },
  {
    title: "Vegan, Vejetaryen, Pesketaryen & Fleksitaryen Farkı Nedir?",
    excerpt:
      "Sık karıştırılan dört beslenme tarzının hayvansal ürün tüketim düzeyine göre karşılaştırmalı açıklaması.",
    image: "/blog/vegan-vejetaryen-farki.webp",
    href: "https://vitavegantis.com/vegan-vejetaryen-pesketaryen-fleksitaryen-farki-nedir/",
  },
  {
    title: "2023'de Takip Edilecek Bitki Bazlı Trendler",
    excerpt:
      "Temiz etiket ürünler, bitki bazlı deniz ürünleri ve yeni kategorilerde 2023 yılında beklenen gelişmeler.",
    image: "/blog/2023-trendler.webp",
    href: "https://vitavegantis.com/2023de-takip-edilecek-bitki-bazli-trendler/",
  },
  {
    title: "Veganizm ve Çevre",
    excerpt:
      "Hayvansal tarımın arazi kullanımı, karbon emisyonu ve su tüketimi üzerindeki etkileri; veganizmin sürdürülebilirlikteki rolü.",
    image: "/blog/veganizm-ve-cevre.jpg",
    href: "https://vitavegantis.com/veganizm-ve-cevre/",
  },
  {
    title: "Kedi Ve Köpeklerle Seyahat İpuçları",
    excerpt:
      "Evcil hayvanlarla güvenli seyahat için veteriner ziyaretinden yol hazırlığına dikkat edilmesi gereken noktalar.",
    image: "/blog/kedi-kopek-seyahat.jpg",
    href: "https://vitavegantis.com/kedi-ve-kopeklerle-seyahat-ipuculari/",
  },
  {
    title: "Veganlık Nedir?",
    excerpt:
      "Veganlığın etimolojisi, 1944'te Donald Watson ile ortaya çıkışı ve insan-hayvan-doğa ilişkisini konumlandıran felsefi temeli.",
    image: "/blog/veganlik-nedir.jpg",
    href: "https://vitavegantis.com/veganlik-nedir/",
  },
];
