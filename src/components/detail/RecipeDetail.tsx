import Link from "next/link";
import RecipePhoto from "@/components/recipe/RecipePhoto";
import {
  SmileyIcon,
  ClockIcon,
  LeafIcon,
  ShieldIcon,
  BoltIcon,
} from "@/components/recipe/RecipeIcons";
import RecipeCard from "@/components/recipe/RecipeCard";
import { recipes, type Recipe } from "@/lib/recipes";
import { href, type Locale } from "@/lib/i18n";

const TEXT = {
  tr: {
    back: "← Tüm tarifler",
    forThis: "Bu tarif için",
    ingredients: "Malzemeler",
    steps: "Hazırlanışı",
    others: "Diğer Tarifler",
    badges: [
      { label: "Vegan", Icon: LeafIcon },
      { label: "Katkısız", Icon: ShieldIcon },
      { label: "Yüksek Protein", Icon: BoltIcon },
    ],
  },
  en: {
    back: "← All recipes",
    forThis: "For this recipe",
    ingredients: "Ingredients",
    steps: "Method",
    others: "Other Recipes",
    badges: [
      { label: "Vegan", Icon: LeafIcon },
      { label: "Additive-Free", Icon: ShieldIcon },
      { label: "High Protein", Icon: BoltIcon },
    ],
  },
} as const;

export default function RecipeDetail({
  recipe,
  locale = "tr",
}: {
  recipe: Recipe;
  locale?: Locale;
}) {
  const t = TEXT[locale];
  const others = recipes.filter((r) => r.slug !== recipe.slug);

  const title = locale === "en" ? recipe.en.title : recipe.title;
  const teaser = locale === "en" ? recipe.en.teaser : recipe.teaser;
  const time = locale === "en" ? recipe.en.time : recipe.time;
  const servings = locale === "en" ? recipe.en.servings : recipe.servings;
  const ingredients =
    locale === "en" ? recipe.en.ingredients : recipe.ingredients;
  const steps = locale === "en" ? recipe.en.steps : recipe.steps;

  return (
    <>
      <section className="bg-mint px-6 pt-12 pb-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href={href("tarifler", locale)}
            className="text-sm font-medium text-forest/70 hover:text-forest"
          >
            {t.back}
          </Link>

          <div className="mt-6 overflow-hidden rounded-[32px] bg-white shadow-lg shadow-forest/10">
            <div className="max-h-80 overflow-hidden">
              <RecipePhoto src={recipe.image} alt={title} priority />
            </div>

            <div className="flex flex-col items-center px-8 pt-8 pb-10 text-center">
              <h1 className="font-playful text-3xl font-bold text-forest sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-forest/70">
                {teaser}
              </p>

              <div className="mt-6 flex items-center justify-center gap-6">
                <span className="flex items-center gap-2 text-sm font-semibold text-forest">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-cream">
                    <SmileyIcon className="h-4 w-4" />
                  </span>
                  {servings}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-forest">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-cream">
                    <ClockIcon className="h-4 w-4" />
                  </span>
                  {time}
                </span>
              </div>

              <p className="mt-6 text-xs font-medium tracking-wide text-forest/60 uppercase">
                {t.forThis}
              </p>
              <div className="mt-3 flex items-center justify-center gap-3">
                {t.badges.map(({ label, Icon }) => (
                  <span
                    key={label}
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-forest"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-forest">
                {t.ingredients}
              </h2>
              <ul className="mt-4 space-y-2">
                {ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-2 text-sm text-forest/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-forest">
                {t.steps}
              </h2>
              <ol className="mt-4 space-y-3">
                {steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-forest/80">
                    <span className="font-display shrink-0 text-plum">{idx + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-semibold text-forest">
            {t.others}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {others.map((r) => (
              <RecipeCard key={r.slug} recipe={r} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
