export type IngredientRef = {
  keyword: string;
  label: string;
  image: string;
};

// Anahtar kelime, ürünlerin İçindekiler listesindeki metinle
// (küçük harfe çevrilip) eşleştirilir. Aynı görsel tüm ürünlerde
// tekrar kullanılır.
const INGREDIENT_LIBRARY: IngredientRef[] = [
  { keyword: "tofu", label: "Tofu", image: "/ingredients/tofu.webp" },
  { keyword: "nohut", label: "Nohut Unu", image: "/ingredients/nohut.webp" },
  { keyword: "yulaf", label: "Yulaf Unu", image: "/ingredients/yulaf.webp" },
  { keyword: "buğday", label: "Buğday", image: "/ingredients/bugday.webp" },
  { keyword: "ayçiçek", label: "Ayçiçek Yağı", image: "/ingredients/aycicek.webp" },
  { keyword: "baharat", label: "Baharat Karışımı", image: "/ingredients/baharat.webp" },
  { keyword: "sebze", label: "Kurutulmuş Sebzeler", image: "/ingredients/karisik-sebze.webp" },
  { keyword: "soğan", label: "Soğan", image: "/ingredients/sogan.webp" },
  { keyword: "sarımsak", label: "Sarımsak", image: "/ingredients/sarimsak.webp" },
  { keyword: "soya", label: "Soya Sosu", image: "/ingredients/soya.webp" },
  { keyword: "fasulye", label: "Meksika Fasulyesi", image: "/hero/fasulye.webp" },
];

export function matchIngredientImages(ingredients: string[]): IngredientRef[] {
  const matches: IngredientRef[] = [];
  for (const raw of ingredients) {
    const text = raw.toLocaleLowerCase("tr");
    const found = INGREDIENT_LIBRARY.find(
      (ref) => text.includes(ref.keyword) && !matches.some((m) => m.keyword === ref.keyword),
    );
    if (found) matches.push(found);
  }
  return matches;
}
