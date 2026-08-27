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
  en: RecipeEn;
};

/**
 * Tarifler admin panelinden düzenlenir; her tarif src/content/recipes altında
 * bir JSON dosyasıdır ve build sırasında (SSG) okunur. Dosya adı iç slug'dır;
 * yayın adresi urlSlug alanından gelir.
 */
const DIR = path.join(process.cwd(), "src", "content", "recipes");

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
};

function load(): Recipe[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const data = JSON.parse(
        fs.readFileSync(path.join(DIR, file), "utf8"),
      ) as RecipeFile;
      return {
        slug: file.replace(/\.json$/, ""),
        urlSlug: data.urlSlug,
        title: data.title,
        teaser: data.teaser,
        time: data.time,
        servings: data.servings,
        image: data.image,
        ingredients: data.ingredients,
        steps: data.steps,
        order: data.order ?? 99,
        en: {
          title: data.titleEn,
          teaser: data.teaserEn,
          time: data.timeEn,
          servings: data.servingsEn,
          ingredients: data.ingredientsEn,
          steps: data.stepsEn,
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
