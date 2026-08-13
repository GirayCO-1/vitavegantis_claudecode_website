import type { IngredientHotspot } from "@/components/IngredientsMap";

export type IngredientMap = {
  image: string;
  hotspots: IngredientHotspot[];
};

// Görsel ve üzerindeki malzeme konumları (% cinsinden) birlikte tutuluyor:
// koordinatlar yalnızca o fotoğraf için geçerli. Fotoğraf değişirse
// koordinatların da yeniden ölçülmesi gerekir.
const hotspots: Record<string, IngredientHotspot[]> = {
  "vegan-sosis": [
    { name: "Tofu", x: 49.3, y: 15.3 },
    { name: "Nohut Unu", x: 70.5, y: 21.7 },
    { name: "Yulaf Unu", x: 82.0, y: 38.8 },
    { name: "Besin Mayası", x: 82.0, y: 62.2 },
    { name: "Buğday Gluteni", x: 66.7, y: 78.1 },
    { name: "Kurutulmuş Sebzeler", x: 42.0, y: 82.5 },
    { name: "Ayçiçek Yağı", x: 18.6, y: 64.5 },
    { name: "Soya Sosu", x: 19.8, y: 39.1 },
    { name: "Baharat Karışımı", x: 29.6, y: 22.5 },
  ],

  "ispanakli-sosis": [
    { name: "Tofu", x: 47.3, y: 13.3 },
    { name: "Nohut Unu", x: 73.0, y: 21.8 },
    { name: "Yulaf Unu", x: 82.5, y: 47.5 },
    { name: "Besin Mayası", x: 74.5, y: 73.5 },
    { name: "Buğday Gluteni", x: 47.0, y: 85.0 },
    { name: "Kurutulmuş Ispanak", x: 23.5, y: 73.5 },
    { name: "Tütsü Aroması", x: 14.0, y: 50.0 },
    { name: "Baharat Karışımı", x: 22.0, y: 22.5 },
  ],

  "vegan-sucuk": [
    { name: "Meksika Fasulyesi", x: 48.3, y: 16.5 },
    { name: "Soğan", x: 74.5, y: 27.3 },
    { name: "Sarımsak", x: 84.5, y: 45.5 },
    { name: "Soya Sosu", x: 76.0, y: 73.5 },
    { name: "Ayçiçek Yağı", x: 45.0, y: 81.0 },
    { name: "Buğday Gluteni", x: 14.8, y: 61.5 },
    { name: "Özel Baharat Karışımı", x: 22.5, y: 29.5 },
  ],

  "tavuk-doner": [
    { name: "Buğday Gluteni", x: 32.0, y: 12.5 },
    { name: "Besin Mayası", x: 64.5, y: 14.0 },
    { name: "Nohut Unu", x: 81.5, y: 36.5 },
    { name: "Patates Nişastası", x: 79.5, y: 59.0 },
    { name: "Ayçiçek Yağı", x: 69.5, y: 81.0 },
    { name: "Hindistan Cevizi Yağı", x: 45.0, y: 83.0 },
    { name: "Soya Sosu", x: 24.5, y: 76.0 },
    { name: "Domates Salçası", x: 13.8, y: 58.0 },
    { name: "Baharat Karışımı", x: 12.8, y: 36.5 },
  ],

  "isvec-kofte": [
    { name: "Bezelye Proteini", x: 35.8, y: 17.8 },
    { name: "Ayçiçek Yağı", x: 70.0, y: 20.0 },
    { name: "Baharat Karışımı", x: 80.5, y: 48.5 },
    { name: "Hindistan Cevizi Yağı", x: 65.0, y: 78.0 },
    { name: "Metil Selüloz", x: 30.5, y: 76.0 },
    { name: "Besin Mayası", x: 15.5, y: 48.5 },
  ],

  "hot-dog": [
    { name: "Tofu", x: 47.5, y: 13.8 },
    { name: "Nohut Unu", x: 73.5, y: 21.5 },
    { name: "Yulaf Unu", x: 84.5, y: 47.5 },
    { name: "Besin Mayası", x: 76.0, y: 75.0 },
    { name: "Buğday Gluteni", x: 49.5, y: 84.5 },
    { name: "Tütsü Aroması", x: 20.0, y: 76.0 },
    { name: "Ayçiçek Yağı", x: 10.8, y: 50.5 },
    { name: "Baharat Karışımı", x: 20.8, y: 22.5 },
  ],

  // Tek malzemeli ürün — harita yalnızca malzemeyi adlandırır.
  "besin-mayasi": [{ name: "Besin Mayası", x: 57.5, y: 42.5 }],
};

export const ingredientMaps: Record<string, IngredientMap> = Object.fromEntries(
  Object.entries(hotspots).map(([slug, spots]) => [
    slug,
    { image: `/urunler/${slug}-icindekiler.webp`, hotspots: spots },
  ]),
);
