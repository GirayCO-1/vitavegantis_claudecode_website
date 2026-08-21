export type Accent = "sun" | "coral" | "plum" | "sage";

/** İngilizce site için çevrilen alanlar; kaynak veri Türkçedir. */
export type ProductEn = {
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
};

export type Product = {
  slug: string;
  /** Eski sitedeki URL — SEO devamlılığı için public adres budur. */
  urlSlug: string;
  name: string;
  weight: string;
  accent: Accent;
  tagline: string;
  description: string;
  image: string;
  sceneImage: string;
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  en: ProductEn;
};

export const products: Product[] = [
  {
    slug: "vegan-sosis",
    urlSlug: "vita-vegantis-vegan-sosis-tadinda",
    name: "Vegan Sosis Tadında",
    weight: "200g",
    accent: "coral",
    tagline: "Klasik sofraların yeni hali",
    description:
      "Tofu ve nohut ununun gücünü kurutulmuş sebzelerle birleştirdiğimiz, ailece sevilen klasik sosis lezzeti — bitkisel, katkısız, saf.",
    image: "/products/vegan-sosis.jpg",
    sceneImage: "/products/scenes/vegan-sosis-pizza-scene-v2.png",
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
      { label: "Enerji", value: "218 kcal" },
      { label: "Protein", value: "10.8 g" },
      { label: "Yağ", value: "6.5 g" },
      { label: "Karbonhidrat", value: "29 g" },
    ],
    en: {
      name: "Vegan Sausage Style",
      tagline: "A new take on a classic",
      description:
        "The beloved classic sausage flavour, built from the power of tofu and chickpea flour combined with dried vegetables — plant-based, additive-free, pure.",
      ingredients: [
        "Tofu",
        "Chickpea Flour",
        "Oat Flour",
        "Nutritional Yeast",
        "Wheat Gluten",
        "Dried Vegetables (Carrot, Celery, Onion, Leek, Parsley, Beetroot)",
        "Sunflower Oil",
        "Soy Sauce",
        "Spice Mix",
      ],
    },
  },
  {
    slug: "ispanakli-sosis",
    urlSlug: "vita-vegantis-ispanakli-sosis-tadinda",
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
      { label: "Enerji", value: "217 kcal" },
      { label: "Protein", value: "24.1 g" },
      { label: "Yağ", value: "8.6 g" },
      { label: "Karbonhidrat", value: "10.6 g" },
    ],
    en: {
      name: "Spinach Plant-Based Sausage",
      tagline: "Green at its most delicious",
      description:
        "A sausage that pairs the freshness of dried spinach with a light smoky aroma, adding colour and nutrition to your meals.",
      ingredients: [
        "Tofu",
        "Wheat Gluten",
        "Chickpea Flour",
        "Oat Flour",
        "Nutritional Yeast",
        "Dried Spinach",
        "Smoke Flavouring",
        "Spice Mix",
      ],
    },
  },
  {
    slug: "vegan-sucuk",
    urlSlug: "vita-vegantis-vegan-sucuk",
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
      { label: "Enerji", value: "315 kcal" },
      { label: "Protein", value: "28 g" },
      { label: "Yağ", value: "11 g" },
      { label: "Karbonhidrat", value: "26 g" },
    ],
    en: {
      name: "Vegan Sucuk",
      tagline: "Spiced, bold, plant-based",
      description:
        "We blended the power of kidney beans with our signature spice mix — bringing a bold take on Turkey's beloved spiced sausage to your table.",
      ingredients: [
        "Kidney Beans",
        "Onion",
        "Garlic",
        "Soy Sauce",
        "Sunflower Oil",
        "Wheat Gluten",
        "Signature Spice Mix",
      ],
    },
  },
  {
    slug: "tavuk-doner",
    urlSlug: "vita-vegantis-tavuk-doner-tadinda",
    name: "Tavuk Döner Tadında",
    weight: "150g",
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
      { label: "Enerji", value: "232 kcal" },
      { label: "Protein", value: "29.7 g" },
      { label: "Yağ", value: "8.1 g" },
      { label: "Karbonhidrat", value: "13.7 g" },
    ],
    en: {
      name: "Chicken Döner Style",
      tagline: "Street food, plant-based signature",
      description:
        "Döner lovers don't have to give up plant-based eating — we recreated the familiar flavour with nutritional yeast and our spice mix.",
      ingredients: [
        "Wheat Gluten",
        "Nutritional Yeast",
        "Chickpea Flour",
        "Potato Starch",
        "Sunflower Oil",
        "Coconut Oil",
        "Soy Sauce",
        "Tomato Paste",
        "Spice Mix",
      ],
    },
  },
  {
    slug: "isvec-kofte",
    urlSlug: "vita-vegantis-vegan-isvec-kofte",
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
    en: {
      name: "Plant-Based Swedish Meatballs",
      tagline: "A plant-based take on Nordic cooking",
      description:
        "We brought the power of pea protein together with the classic meatball flavour of Swedish cuisine — high in protein, plant-based and additive-free.",
      ingredients: [
        "Pea Protein",
        "Sunflower Oil",
        "Spice Mix",
        "Coconut Oil",
        "Methylcellulose",
        "Nutritional Yeast",
      ],
    },
  },
  {
    slug: "besin-mayasi",
    urlSlug: "vita-vegantis-besin-mayasi",
    name: "Besin Mayası",
    weight: "100g",
    accent: "sun",
    tagline: "Mutfağınızın süperfood dostu",
    description:
      "B12 vitamini ile zenginleştirilmiş, glutensiz besin mayamız; yemeklerinize peynirimsi bir lezzet ve yüksek protein katar.",
    image: "/products/besin-mayasi.webp",
    sceneImage: "/products/scenes/besin-mayasi-scene.webp",
    ingredients: ["İnaktif Besin Mayası (B12 Vitamini ile Zenginleştirilmiş)"],
    nutrition: [
      { label: "Enerji", value: "—" },
      { label: "Protein", value: "—" },
      { label: "Yağ", value: "—" },
      { label: "Karbonhidrat", value: "—" },
    ],
    en: {
      name: "Nutritional Yeast",
      tagline: "Your kitchen's superfood companion",
      description:
        "Our gluten-free nutritional yeast, fortified with vitamin B12, adds a cheesy flavour and high protein to your dishes.",
      ingredients: ["Inactive Nutritional Yeast (Fortified with Vitamin B12)"],
    },
  },
  {
    slug: "hot-dog",
    urlSlug: "vita-vegantis-hot-dog-vosis",
    name: "Hot Dog Vosis",
    weight: "180g",
    accent: "coral",
    tagline: "Tütsü aromalı, sokak lezzeti",
    description:
      "Tütsü aromasıyla zenginleştirdiğimiz bitki bazlı sosisimiz, klasik hot dog keyfini katkısız ve yüksek proteinli bir sofraya taşıyor.",
    image: "/products/hot-dog.webp",
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
    en: {
      name: "Hot Dog Vosis",
      tagline: "Smoky street-food flavour",
      description:
        "Our smoke-flavoured plant-based sausage brings the classic hot dog experience to an additive-free, high-protein table.",
      ingredients: [
        "Tofu",
        "Chickpea Flour",
        "Oat Flour",
        "Nutritional Yeast",
        "Wheat Gluten",
        "Smoke Flavouring",
        "Sunflower Oil",
        "Spice Mix",
      ],
    },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductByUrl(urlSlug: string) {
  return products.find((p) => p.urlSlug === urlSlug);
}

export const accentHex: Record<Accent, string> = {
  sun: "#F2B705",
  coral: "#FF6B4A",
  plum: "#6B2D5C",
  sage: "#8B9A6F",
};
