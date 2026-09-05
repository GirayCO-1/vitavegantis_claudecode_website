import fs from "node:fs";
import path from "node:path";

/** İngilizce site için çevrilen alanlar; kaynak veri Türkçedir. */
export type RecipeEn = {
  title: string;
  teaser: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  intro?: string;
  variants?: RecipeVariant[];
  closing?: string;
  metaDescription?: string;
  ingredientGroups?: IngredientGroup[];
  extras?: RecipeExtra[];
};

/** Gruplu malzeme listesi (ör. "Peynir kreması için" / "Kıvam için"). */
export type IngredientGroup = { label: string; items: string[] };

/** Malzeme ve adımlardan SONRA basılan ek bölümler (püf noktaları, kullanım alanları). */
export type RecipeExtra = { heading: string; items: string[] };

/**
 * Aynı sayfada birden fazla tarif anlatan sayfalar için (ör. "3 farklı hot
 * dog"). Varyant varsa sayfa üstteki tek malzeme/hazırlanış bloğu yerine her
 * varyantı kendi görseli, malzemesi ve adımlarıyla basar.
 */
export type RecipeVariant = {
  title: string;
  teaser: string;
  image: string;
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
  image: string;
  ingredients: string[];
  steps: string[];
  /** Başlığın altındaki giriş paragrafı; yalnızca varyantlı tariflerde var. */
  intro?: string;
  variants?: RecipeVariant[];
  /** Kapanış metni; satış noktaları bağlantısı bileşende ekleniyor. */
  closing?: string;
  /** Arama sonucu açıklaması. Boşsa teaser kullanılır. */
  metaDescription?: string;
  /** Recipe şemasındaki keywords alanı. */
  keywords?: string;
  ingredientGroups?: IngredientGroup[];
  extras?: RecipeExtra[];
  /** Şemaya yazılacak ISO süreler; "20 dk + 3 saat" gibi metinler ayrıştırılamıyor. */
  prepTimeIso?: string;
  totalTimeIso?: string;
  /** Şemadaki porsiyon sayısı; serbest metinden çıkarılamadığında. */
  yieldCount?: string;
  en: RecipeEn;
};

/**
 * Tarifler admin panelinden düzenlenir; her tarif src/content/recipes altında
 * bir JSON dosyasıdır ve build sırasında (SSG) okunur. Dosya adı iç slug'dır;
 * yayın adresi urlSlug alanından gelir.
 */
const DIR = path.join(process.cwd(), "src", "content", "recipes");

type VariantFile = {
  title: string;
  titleEn: string;
  teaser: string;
  teaserEn: string;
  image: string;
  ingredients: string[];
  ingredientsEn: string[];
  steps: string[];
  stepsEn: string[];
};

type RecipeFile = {
  order?: number;
  urlSlug: string;
  image: string;
  title: string;
  teaser: string;
  time: string;
  servings: string;
  ingredients: string[];
  steps: string[];
  titleEn: string;
  teaserEn: string;
  timeEn: string;
  servingsEn: string;
  ingredientsEn: string[];
  stepsEn: string[];
  intro?: string;
  introEn?: string;
  variants?: VariantFile[];
  closing?: string;
  closingEn?: string;
  metaDescription?: string;
  metaDescriptionEn?: string;
  keywords?: string;
  ingredientGroups?: { label: string; labelEn: string; items: string[]; itemsEn: string[] }[];
  extras?: { heading: string; headingEn: string; items: string[]; itemsEn: string[] }[];
  prepTimeIso?: string;
  totalTimeIso?: string;
  yieldCount?: string;
};

/** Varyantlı tarifte üstteki tek liste, tüm varyantların birleşimi olur. */
function birlestir(variants: VariantFile[] | undefined, alan: "ingredients" | "ingredientsEn" | "steps" | "stepsEn") {
  return variants?.flatMap((v) => v[alan]) ?? [];
}

function load(): Recipe[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(DIR, file), "utf8"),
      ) as RecipeFile;
      // Varyantlı tarifte üst seviyedeki malzeme/adım listeleri dosyada boş
      // bırakılır; hepsini varyantlardan topluyoruz. Recipe şeması ve arama
      // motoru bu birleşik listeyi okuyor.
      const cok = Boolean(data.variants?.length);
      // Gruplu malzeme listesi varsa duz liste ondan turetilir; Recipe semasi
      // ve arama motoru duz listeyi okuyor.
      const grup = data.ingredientGroups;
      return {
        slug: file.replace(/\.json$/, ""),
        urlSlug: data.urlSlug,
        title: data.title,
        teaser: data.teaser,
        time: data.time,
        servings: data.servings,
        image: data.image,
        ingredients: cok
          ? birlestir(data.variants, "ingredients")
          : (grup?.flatMap((g) => g.items) ?? data.ingredients),
        steps: cok ? birlestir(data.variants, "steps") : data.steps,
        ...(data.intro && { intro: data.intro }),
        ...(data.closing && { closing: data.closing }),
        ...(data.metaDescription && { metaDescription: data.metaDescription }),
        ...(data.keywords && { keywords: data.keywords }),
        ...(data.prepTimeIso && { prepTimeIso: data.prepTimeIso }),
        ...(data.totalTimeIso && { totalTimeIso: data.totalTimeIso }),
        ...(data.yieldCount && { yieldCount: data.yieldCount }),
        ...(grup && {
          ingredientGroups: grup.map((g) => ({ label: g.label, items: g.items })),
        }),
        ...(data.extras && {
          extras: data.extras.map((e) => ({ heading: e.heading, items: e.items })),
        }),
        ...(data.variants && {
          variants: data.variants.map((v) => ({
            title: v.title,
            teaser: v.teaser,
            image: v.image,
            ingredients: v.ingredients,
            steps: v.steps,
          })),
        }),
        order: data.order ?? 99,
        en: {
          title: data.titleEn,
          teaser: data.teaserEn,
          time: data.timeEn,
          servings: data.servingsEn,
          ingredients: cok
            ? birlestir(data.variants, "ingredientsEn")
            : (grup?.flatMap((g) => g.itemsEn) ?? data.ingredientsEn),
          steps: cok ? birlestir(data.variants, "stepsEn") : data.stepsEn,
          ...(data.introEn && { intro: data.introEn }),
          ...(data.closingEn && { closing: data.closingEn }),
          ...(data.metaDescriptionEn && { metaDescription: data.metaDescriptionEn }),
          ...(grup && {
            ingredientGroups: grup.map((g) => ({ label: g.labelEn, items: g.itemsEn })),
          }),
          ...(data.extras && {
            extras: data.extras.map((e) => ({ heading: e.headingEn, items: e.itemsEn })),
          }),
          ...(data.variants && {
            variants: data.variants.map((v) => ({
              title: v.titleEn,
              teaser: v.teaserEn,
              image: v.image,
              ingredients: v.ingredientsEn,
              steps: v.stepsEn,
            })),
          }),
        },
      };
    })
    .sort((a, b) => a.order - b.order)
    // order yalnızca sıralama için okunur; Recipe tipinde yer almaz.
    .map(({ order, ...recipe }) => (void order, recipe));
}

export const recipes: Recipe[] = load();

export function getRecipeByUrl(urlSlug: string) {
  return recipes.find((r) => r.urlSlug === urlSlug);
}
