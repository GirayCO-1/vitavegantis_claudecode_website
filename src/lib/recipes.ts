import type { Accent } from "@/lib/products";

export type Recipe = {
  slug: string;
  title: string;
  teaser: string;
  time: string;
  servings: string;
  accent: Accent;
  image: string;
  ingredients: string[];
  steps: string[];
};

// Başlıklar vitavegantis.com/blog üzerindeki gerçek tariflerden alınmıştır.
// İçerik (malzeme/adım) taslak niteliğindedir — orijinal site metniyle
// değiştirilmesi önerilir.
export const recipes: Recipe[] = [
  {
    slug: "vegan-iskender",
    title: "Vegan İskender",
    teaser:
      "Tavuk Döner Tadında ürünümüzle hazırlanan, tereyağlı domates sosu ve yoğurtla servis edilen klasik bir lezzet.",
    time: "25 dk",
    servings: "2 kişilik",
    accent: "coral",
    image: "/recipes/vegan-iskender.jpg",
    ingredients: [
      "1 paket VitaVegantis Tavuk Döner Tadında",
      "2 dilim pide",
      "2 yemek kaşığı domates salçası",
      "1 su bardağı bitkisel yoğurt",
      "2 yemek kaşığı bitkisel tereyağı",
      "Tuz, karabiber",
    ],
    steps: [
      "Pideleri dilimleyip bir servis tabağına yayın.",
      "VitaVegantis Tavuk Döner Tadında ürününü orta ateşte kızartın.",
      "Salçayı su ile açıp kaynatarak sos hazırlayın.",
      "Pidelerin üzerine döneri, ardından sosu ve yoğurdu ekleyin.",
      "Eritilmiş bitkisel tereyağını gezdirip sıcak servis edin.",
    ],
  },
  {
    slug: "sucuklu-kuru-fasulye",
    title: "Bitki Bazlı Sucuklu Kuru Fasulye",
    teaser:
      "Vegan Sucuk ile hazırlanan, ailece sevilen bir Türk mutfağı klasiğinin bitkisel yorumu.",
    time: "40 dk",
    servings: "4 kişilik",
    accent: "plum",
    image: "/recipes/sucuklu-kuru-fasulye.webp",
    ingredients: [
      "2 adet VitaVegantis Vegan Sucuk, dilimlenmiş",
      "2,5 su bardağı haşlanmış kuru fasulye",
      "1 soğan",
      "2 yemek kaşığı domates salçası",
      "2 yemek kaşığı zeytinyağı",
      "Tuz, pul biber",
    ],
    steps: [
      "Soğanı zeytinyağında kavurun.",
      "Dilimlenmiş vegan sucuğu ekleyip birkaç dakika kavurmaya devam edin.",
      "Salçayı ekleyip kısa süre kavurun, ardından sıcak su ilave edin.",
      "Haşlanmış fasulyeyi ekleyip kısık ateşte 15 dakika pişirin.",
      "Tuzunu ayarlayıp sıcak servis edin.",
    ],
  },
  {
    slug: "salcali-sosis",
    title: "Bitki Bazlı Salçalı Sosis",
    teaser:
      "Vegan Sosis Tadında ürünümüzle hazırlanan, ekmek arası veya ana yemek olarak servis edilebilen pratik bir tarif.",
    time: "20 dk",
    servings: "2 kişilik",
    accent: "sun",
    image: "/recipes/salcali-sosis.webp",
    ingredients: [
      "1 paket VitaVegantis Vegan Sosis Tadında",
      "1 yemek kaşığı domates salçası",
      "1 diş sarımsak",
      "1 yemek kaşığı zeytinyağı",
      "Yarım su bardağı su",
      "Tuz, karabiber, kekik",
    ],
    steps: [
      "Sosisleri istediğiniz şekilde dilimleyin.",
      "Zeytinyağında sarımsağı hafifçe kavurun.",
      "Sosisleri ekleyip birkaç dakika kızartın.",
      "Salçayı su ile açıp tavaya ekleyin, kısık ateşte 5 dakika pişirin.",
      "Baharatlarla tatlandırıp sıcak servis edin.",
    ],
  },
];
