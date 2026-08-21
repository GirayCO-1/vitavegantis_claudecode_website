import type { Accent } from "@/lib/products";

/** İngilizce site için çevrilen alanlar; kaynak veri Türkçedir. */
export type RecipeEn = {
  title: string;
  teaser: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
};

export type Recipe = {
  slug: string;
  /** Eski sitedeki URL — SEO devamlılığı için public adres budur. */
  urlSlug: string;
  title: string;
  teaser: string;
  time: string;
  servings: string;
  accent: Accent;
  image: string;
  ingredients: string[];
  steps: string[];
  en: RecipeEn;
};

// Başlıklar vitavegantis.com/blog üzerindeki gerçek tariflerden alınmıştır.
// İçerik (malzeme/adım) taslak niteliğindedir — orijinal site metniyle
// değiştirilmesi önerilir.
export const recipes: Recipe[] = [
  {
    slug: "vegan-iskender",
    urlSlug: "vegan-iskender-tarifi",
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
    en: {
      title: "Vegan İskender",
      teaser:
        "A Turkish classic made with our Chicken Döner Style, served with buttery tomato sauce and plant-based yoghurt.",
      time: "25 min",
      servings: "Serves 2",
      ingredients: [
        "1 pack VitaVegantis Chicken Döner Style",
        "2 slices of pide (Turkish flatbread)",
        "2 tbsp tomato paste",
        "1 cup plant-based yoghurt",
        "2 tbsp plant-based butter",
        "Salt, black pepper",
      ],
      steps: [
        "Slice the flatbread and spread it over a serving plate.",
        "Pan-fry the VitaVegantis Chicken Döner Style over medium heat.",
        "Loosen the tomato paste with water and simmer into a sauce.",
        "Layer the döner over the bread, then add the sauce and yoghurt.",
        "Drizzle with melted plant-based butter and serve hot.",
      ],
    },
  },
  {
    slug: "sucuklu-kuru-fasulye",
    urlSlug: "bitki-bazli-sucuklu-kuru-fasulye-tarifi",
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
    en: {
      title: "Plant-Based White Bean Stew with Vegan Sucuk",
      teaser:
        "A plant-based take on a beloved Turkish family classic, made with our Vegan Sucuk.",
      time: "40 min",
      servings: "Serves 4",
      ingredients: [
        "2 VitaVegantis Vegan Sucuk, sliced",
        "2.5 cups cooked white beans",
        "1 onion",
        "2 tbsp tomato paste",
        "2 tbsp olive oil",
        "Salt, chilli flakes",
      ],
      steps: [
        "Sauté the onion in olive oil.",
        "Add the sliced vegan sucuk and cook for a few more minutes.",
        "Stir in the tomato paste, cook briefly, then add hot water.",
        "Add the cooked beans and simmer over low heat for 15 minutes.",
        "Season with salt and serve hot.",
      ],
    },
  },
  {
    slug: "salcali-sosis",
    urlSlug: "bitki-bazli-salcali-sosis-tarifi",
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
    en: {
      title: "Plant-Based Sausages in Tomato Sauce",
      teaser:
        "A quick recipe made with our Vegan Sausage Style — serve it in bread or as a main dish.",
      time: "20 min",
      servings: "Serves 2",
      ingredients: [
        "1 pack VitaVegantis Vegan Sausage Style",
        "1 tbsp tomato paste",
        "1 clove of garlic",
        "1 tbsp olive oil",
        "Half a cup of water",
        "Salt, black pepper, thyme",
      ],
      steps: [
        "Slice the sausages however you like.",
        "Lightly sauté the garlic in olive oil.",
        "Add the sausages and fry for a few minutes.",
        "Loosen the tomato paste with water, add to the pan and simmer for 5 minutes.",
        "Season with the spices and serve hot.",
      ],
    },
  },
];

export function getRecipeByUrl(urlSlug: string) {
  return recipes.find((r) => r.urlSlug === urlSlug);
}
