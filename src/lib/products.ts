export type Accent = "sun" | "coral" | "plum" | "sage";

export type Product = {
  slug: string;
  name: string;
  weight: string;
  accent: Accent;
  tagline: string;
  description: string;
  image: string;
  sceneImage: string;
  /** Varsa, içindekiler bölümünde etkileşimli malzeme haritası gösterilir. */
  ingredientsImage?: string;
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  ingredientsComplete: boolean;
};

export const products: Product[] = [
  {
    slug: "vegan-sosis",
    name: "Vegan Sosis Tadında",
    weight: "200g",
    accent: "coral",
    tagline: "Klasik sofraların yeni hali",
    description:
      "Tofu ve nohut ununun gücünü kurutulmuş sebzelerle birleştirdiğimiz, ailece sevilen klasik sosis lezzeti — bitkisel, katkısız, saf.",
    image: "/products/vegan-sosis.jpg",
    sceneImage: "/products/scenes/vegan-sosis-pizza-scene-v2.png",
    ingredientsImage: "/urunler/vegan-sosis-icindekiler.png",
    ingredients: [
      "Tofu",
      "Nohut Unu",
      "Yulaf Unu",
      "Besin Mayası",
      "Buğday Gluteni",
      "Kurutulmuş Sebzeler (Havuç, Kereviz, Soğan, Pırasa, Maydanoz, Pancar)",
      "Ayçiçek Yağı",
      "Soya Sosu",
      "Baharat Karışımı",
    ],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    ingredientsComplete: true,
  },
  {
    slug: "ispanakli-sosis",
    name: "Ispanaklı Bitki Bazlı Sosis",
    weight: "180g",
    accent: "sage",
    tagline: "Yeşilin en lezzetli hali",
    description:
      "Kurutulmuş ıspanağın tazeliğini hafif tütsü aromasıyla buluşturduğumuz, yemeklerinize renk ve besin değeri katan bir sosis.",
    image: "/products/ispanakli-sosis.jpg",
    sceneImage: "/products/scenes/ispanakli-sosis-scene.png",
    ingredients: [
      "Tofu",
      "Buğday Gluteni",
      "Nohut Unu",
      "Yulaf Unu",
      "Besin Mayası",
      "Kurutulmuş Ispanak",
      "Tütsü Aroması",
      "Baharat Karışımı",
    ],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    ingredientsComplete: true,
  },
  {
    slug: "vegan-sucuk",
    name: "Vegan Sucuk",
    weight: "150g",
    accent: "plum",
    tagline: "Baharatlı, iddialı, bitkisel",
    description:
      "Meksika fasulyesinin gücünü özel baharat karışımımızla harmanladık — sofralarınıza cesur bir lezzet getiriyor.",
    image: "/products/vegan-sucuk.webp",
    sceneImage: "/products/scenes/vegan-sucuk-scene-2.png",
    ingredients: [
      "Meksika Fasulyesi",
      "Soğan",
      "Sarımsak",
      "Soya Sosu",
      "Ayçiçek Yağı",
      "Buğday Gluteni",
      "Özel Baharat Karışımı",
    ],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    ingredientsComplete: true,
  },
  {
    slug: "tavuk-doner",
    name: "Tavuk Döner Tadında",
    weight: "—",
    accent: "sun",
    tagline: "Sokak lezzeti, bitkisel imza",
    description:
      "Döner severlerin bitki bazlı beslenmeden vazgeçmesine gerek yok — besin mayası ve baharat karışımımızla tanıdık lezzeti yeniden yarattık.",
    image: "/products/tavuk-doner.webp",
    sceneImage: "/products/scenes/tavuk-doner-scene.png",
    ingredients: [
      "Buğday Gluteni",
      "Besin Mayası",
      "Nohut Unu",
      "Patates Nişastası",
      "Ayçiçek Yağı",
      "Hindistan Cevizi Yağı",
      "Soya Sosu",
      "Domates Salçası",
      "Baharat Karışımı",
    ],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    ingredientsComplete: true,
  },
  {
    slug: "isvec-kofte",
    name: "Bitki Bazlı İsveç Köfte",
    weight: "180g",
    accent: "sun",
    tagline: "Kuzey mutfağının bitkisel yorumu",
    description:
      "Bezelye proteininin gücünü İsveç mutfağının klasik köfte lezzetiyle buluşturduk — yüksek proteinli, bitkisel ve katkısız.",
    image: "/products/isvec-kofte.jpg",
    sceneImage: "/products/scenes/isvec-kofte-scene.png",
    ingredients: [
      "Bezelye Proteini",
      "Ayçiçek Yağı",
      "Baharat Karışımı",
      "Hindistan Cevizi Yağı",
      "Metil Selüloz",
      "Besin Mayası",
    ],
    nutrition: [
      { label: "Enerji", value: "356 kcal" },
      { label: "Protein", value: "21.4 g" },
      { label: "Yağ", value: "26 g" },
      { label: "Karbonhidrat", value: "9 g" },
    ],
    ingredientsComplete: true,
  },
  {
    slug: "besin-mayasi",
    name: "Besin Mayası",
    weight: "100g",
    accent: "sun",
    tagline: "Mutfağınızın süperfood dostu",
    description:
      "B12 vitamini ile zenginleştirilmiş, glutensiz besin mayamız; yemeklerinize peynirimsi bir lezzet ve yüksek protein katar.",
    image: "/products/besin-mayasi.png",
    sceneImage: "/products/scenes/besin-mayasi-scene.png",
    ingredients: ["İnaktif Besin Mayası (B12 Vitamini ile Zenginleştirilmiş)"],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    ingredientsComplete: false,
  },
  {
    slug: "hot-dog",
    name: "Hot Dog Vosis",
    weight: "180g",
    accent: "coral",
    tagline: "Tütsü aromalı, sokak lezzeti",
    description:
      "Tütsü aromasıyla zenginleştirdiğimiz bitki bazlı sosisimiz, klasik hot dog keyfini katkısız ve yüksek proteinli bir sofraya taşıyor.",
    image: "/products/hot-dog.png",
    sceneImage: "/products/scenes/hot-dog-scene.png",
    ingredients: [
      "Tofu",
      "Nohut Unu",
      "Yulaf Unu",
      "Besin Mayası",
      "Buğday Gluteni",
      "Tütsü Aroması",
      "Ayçiçek Yağı",
      "Baharat Karışımı",
    ],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    ingredientsComplete: false,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const accentHex: Record<Accent, string> = {
  sun: "#F2B705",
  coral: "#FF6B4A",
  plum: "#6B2D5C",
  sage: "#8B9A6F",
};
