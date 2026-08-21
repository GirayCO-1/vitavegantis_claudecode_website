export type Locale = "tr" | "en";

/**
 * Türkçe adresler SEO devamlılığı için kök seviyede ve değişmez;
 * İngilizce site /en/ altında yayınlanır. Bölüm adları çevrilir,
 * içerik slug'ları (ürün/tarif/blog) iki dilde de aynıdır.
 */
export const sectionMap: Record<string, string> = {
  urunler: "products",
  tarifler: "recipes",
  blog: "blog",
  iletisim: "contact",
  satisnoktalari: "sales-points",
  hakkimizda: "about",
  "neden-bitki-bazli": "why-plant-based",
};

const sectionMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(sectionMap).map(([tr, en]) => [en, tr]),
);

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

/** Verilen yolun diğer dildeki karşılığı (sondaki eğik çizgi korunur). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/^\/+|\/+$/g, "");
  const parts = clean === "" ? [] : clean.split("/");
  const rest = parts[0] === "en" ? parts.slice(1) : parts;

  if (target === "en") {
    if (rest.length === 0) return "/en/";
    const head = sectionMap[rest[0]] ?? rest[0];
    return `/en/${[head, ...rest.slice(1)].join("/")}/`;
  }

  if (rest.length === 0) return "/";
  const head = sectionMapReverse[rest[0]] ?? rest[0];
  return `/${[head, ...rest.slice(1)].join("/")}/`;
}

/** Locale'e göre bölüm yolu üretir: href("urunler", "en") → /en/products/ */
export function href(trSection: string, locale: Locale): string {
  if (locale === "tr") {
    return trSection === "/" ? "/" : `/${trSection}/`;
  }
  if (trSection === "/") return "/en/";
  return `/en/${sectionMap[trSection] ?? trSection}/`;
}

/** İçerik slug'ı için locale'e göre yol: item("veganlik-nedir", "en") → /en/veganlik-nedir/ */
export function itemHref(slug: string, locale: Locale): string {
  return locale === "en" ? `/en/${slug}/` : `/${slug}/`;
}

/** Besin değeri etiketleri. */
export const nutritionLabels: Record<string, string> = {
  Enerji: "Energy",
  Protein: "Protein",
  Yağ: "Fat",
  "Doymuş Yağ": "Saturated Fat",
  Karbonhidrat: "Carbohydrates",
  Şeker: "Sugars",
  Lif: "Fibre",
  Tuz: "Salt",
};

/** İçindekiler haritası etiketleri (nokta adları). */
export const ingredientNames: Record<string, string> = {
  Tofu: "Tofu",
  Nohut: "Chickpeas",
  Yulaf: "Oats",
  Buğday: "Wheat",
  "Buğday Proteini": "Wheat Protein",
  "Buğday Glüteni": "Wheat Gluten",
  Ayçiçek: "Sunflower Oil",
  "Ayçiçek Yağı": "Sunflower Oil",
  Baharatlar: "Spices",
  "Baharat Karışımı": "Spice Mix",
  Sebzeler: "Vegetables",
  "Karışık Sebze": "Mixed Vegetables",
  Ispanak: "Spinach",
  Fasulye: "Beans",
  "Meksika Fasulyesi": "Kidney Beans",
  Soğan: "Onion",
  Sarımsak: "Garlic",
  "Soya Sosu": "Soy Sauce",
  "Besin Mayası": "Nutritional Yeast",
  "Nohut Unu": "Chickpea Flour",
  "Patates Nişastası": "Potato Starch",
  "Hindistan Cevizi Yağı": "Coconut Oil",
  "Domates Salçası": "Tomato Paste",
  Bezelye: "Peas",
  "Bezelye Proteini": "Pea Protein",
  "Yulaf Unu": "Oat Flour",
  "Kurutulmuş Sebzeler": "Dried Vegetables",
  "Kurutulmuş Ispanak": "Dried Spinach",
  "Tütsü Aroması": "Smoke Flavouring",
  "Özel Baharat Karışımı": "Signature Spice Mix",
  "Metil Selüloz": "Methylcellulose",
};

export function translateIngredient(name: string, locale: Locale): string {
  if (locale === "tr") return name;
  return ingredientNames[name] ?? name;
}

export function translateNutritionLabel(label: string, locale: Locale): string {
  if (locale === "tr") return label;
  return nutritionLabels[label] ?? label;
}
