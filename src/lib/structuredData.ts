import { SITE_NAME, SITE_URL, canonical } from "@/lib/site";
import type { Product } from "@/lib/products";
import type { Recipe } from "@/lib/recipes";

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: "Vita Vegantis Gıda Sanayi ve Ticaret Limited Şirketi",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/og-cover.webp`,
    slogan: "Deliciously Plant Based",
    sameAs: ["https://www.instagram.com/vitavegantis/"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Seyran Bağları Mahallesi Seyran Caddesi No:42/A",
      addressLocality: "Çankaya",
      addressRegion: "Ankara",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-850-307-49-90",
      email: "info@vitavegantis.com",
      contactType: "customer service",
      availableLanguage: ["Turkish"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "tr-TR",
    publisher: { "@id": ORG_ID },
  };
}

/** Blog yazıları için BlogPosting şeması. */
export function articleSchema(
  article: {
    urlSlug: string;
    title: string;
    description: string;
    image: string;
  },
  locale: "tr" | "en" = "tr",
) {
  const en = locale === "en";
  const url = canonical(en ? `en/${article.urlSlug}` : article.urlSlug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.image}`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: en ? "en" : "tr-TR",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/**
 * Liste sayfaları (ürünler, tarifler) için sıralı bağlantı listesi.
 * Google'a hangi alt sayfaların bu koleksiyona ait olduğunu bildirir.
 */
export function itemListSchema(
  path: string,
  name: string,
  items: { name: string; urlSlug: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical(path)}#list`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: canonical(item.urlSlug),
    })),
  };
}

/** "218 kcal" → "218 kcal" biçimini schema.org'un beklediği hâle getirir. */
function nutritionValue(product: Product, label: string) {
  return product.nutrition.find((n) => n.label === label)?.value;
}

export function productSchema(product: Product, locale: "tr" | "en" = "tr") {
  const en = locale === "en";
  const url = canonical(en ? `en/${product.urlSlug}` : product.urlSlug);
  const energy = nutritionValue(product, "Enerji");
  const hasNutrition = energy && energy !== "—";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: en ? product.en.name : product.name,
    description: en ? product.en.description : product.description,
    image: `${SITE_URL}${product.image}`,
    url,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    category: en ? "Plant-Based Food" : "Bitki Bazlı Gıda",
    ...(product.weight !== "—" && { weight: product.weight }),
    ...(hasNutrition && {
      nutrition: {
        "@type": "NutritionInformation",
        servingSize: "100 g",
        calories: energy,
        proteinContent: nutritionValue(product, "Protein"),
        fatContent: nutritionValue(product, "Yağ"),
        carbohydrateContent: nutritionValue(product, "Karbonhidrat"),
      },
    }),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: en ? "Ingredients" : "İçindekiler",
        value: (en ? product.en.ingredients : product.ingredients).join(", "),
      },
      { "@type": "PropertyValue", name: en ? "Diet" : "Beslenme", value: "Vegan" },
    ],
  };
}

/** "25 dk" → ISO 8601 süresi (PT25M). */
function isoDuration(turkish: string) {
  const minutes = parseInt(turkish, 10);
  return Number.isFinite(minutes) ? `PT${minutes}M` : undefined;
}

/** "4 kişilik" → "4". */
function servingCount(turkish: string) {
  const n = parseInt(turkish, 10);
  return Number.isFinite(n) ? String(n) : undefined;
}

export function recipeSchema(recipe: Recipe, locale: "tr" | "en" = "tr") {
  const en = locale === "en";
  const url = canonical(en ? `en/${recipe.urlSlug}` : recipe.urlSlug);
  const ingredients = en ? recipe.en.ingredients : recipe.ingredients;
  const steps = en ? recipe.en.steps : recipe.steps;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "@id": `${url}#recipe`,
    name: en ? recipe.en.title : recipe.title,
    description: en ? recipe.en.teaser : recipe.teaser,
    image: [`${SITE_URL}${recipe.image}`],
    url,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: en ? "en" : "tr-TR",
    recipeCategory: en ? "Main Course" : "Ana Yemek",
    recipeCuisine: en ? "Turkish" : "Türk",
    suitableForDiet: "https://schema.org/VeganDiet",
    keywords: en
      ? "vegan, plant-based, VitaVegantis"
      : "vegan, bitki bazlı, VitaVegantis",
    totalTime: isoDuration(recipe.time),
    recipeYield: servingCount(recipe.servings),
    recipeIngredient: ingredients,
    recipeInstructions: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}
