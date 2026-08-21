import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structuredData";
import RecipeCard from "@/components/recipe/RecipeCard";
import { recipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "From Vegan İskender to white bean stew with vegan sucuk: plant-based recipes and cooking ideas you can easily make at home with VitaVegantis products.",
  alternates: {
    canonical: canonical("en/recipes"),
    languages: {
      "tr-TR": canonical("tarifler"),
      en: canonical("en/recipes"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en/recipes"),
    title: "Recipes — VitaVegantis",
    description:
      "Plant-based recipes and cooking ideas made with VitaVegantis products.",
    images: [`${SITE_URL}/recipes/vegan-iskender.jpg`],
  },
};

const rotations = [-1.5, 1.2, -0.8];

export default function RecipesPageEn() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "en" },
          { name: "Recipes", path: "en/recipes" },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          "en/recipes",
          "VitaVegantis Recipes",
          recipes.map((r) => ({
            name: r.en.title,
            urlSlug: `en/${r.urlSlug}`,
          })),
        )}
      />
      <section className="bg-mint px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-accent text-2xl text-plum">From our kitchen</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
              Recipes
            </h1>
            <p className="mt-4 text-forest/70">
              Recipes that bring nature&apos;s flavour to your table with
              VitaVegantis products.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, i) => (
              <RecipeCard
                key={recipe.slug}
                recipe={recipe}
                rotate={rotations[i % rotations.length]}
                locale="en"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
