export type IngredientRef = {
  keyword: string;
  label: string;
  image: string;
};

// Anahtar kelime, ürünlerin İçindekiler listesindeki metinle
// (küçük harfe çevrilip) eşleştirilir. Aynı görsel tüm ürünlerde
// tekrar kullanılır.
const INGREDIENT_LIBRARY: IngredientRef[] = [
  { keyword: "tofu", label: "Tofu", image: "/ingredients/tofu.png" },
  { keyword: "nohut", label: "Nohut Unu", image: "/ingredients/nohut.png" },
  { keyword: "yulaf", label: "Yulaf Unu", image: "/ingredients/yulaf.png" },
  { keyword: "buğday", label: "Buğday", image: "/ingredients/bugday.png" },
  { keyword: "ayçiçek", label: "Ayçiçek Yağı", image: "/ingredients/aycicek.png" },
  { keyword: "baharat", label: "Baharat Karışımı", image: "/ingredients/baharat.png" },
  { keyword: "sebze", label: "Kurutulmuş Sebzeler", image: "/ingredients/karisik-sebze.png" },
  { keyword: "soğan", label: "Soğan", image: "/ingredients/sogan.png" },
  { keyword: "sarımsak", label: "Sarımsak", image: "/ingredients/sarimsak.png" },
  { keyword: "soya", label: "Soya Sosu", image: "/ingredients/soya.png" },
  { keyword: "fasulye", label: "Meksika Fasulyesi", image: "/hero/fasulye.png" },
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
