import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structuredData";
import RecipeCard from "@/components/recipe/RecipeCard";
import { recipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Tarifler",
  description: "Vegan İskender'den sucuklu kuru fasulyeye: VitaVegantis ürünleriyle evde kolayca hazırlayabileceğiniz bitki bazlı tarifler ve pişirme önerileri.",
  alternates: { canonical: canonical("tarifler") },
  openGraph: {
    type: "website",
    url: canonical("tarifler"),
    title: "Tarifler — VitaVegantis",
    description: "Vegan İskender'den sucuklu kuru fasulyeye: VitaVegantis ürünleriyle evde kolayca hazırlayabileceğiniz bitki bazlı tarifler ve pişirme önerileri.",
    images: [`${SITE_URL}/recipes/vegan-iskender.webp`],
  }
};

const rotations = [-1.5, 1.2, -0.8];

export default function TariflerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Tarifler", path: "tarifler" },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          "tarifler",
          "VitaVegantis Tarifleri",
          recipes.map((r) => ({ name: r.title, urlSlug: r.urlSlug })),
        )}
      />
    <section className="bg-mint px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-2xl text-plum">Mutfağımızdan</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
            Tarifler
          </h1>
          <p className="mt-4 text-forest/70">
            VitaVegantis ürünleriyle sofranıza taşıyabileceğiniz, doğanın
            lezzetini öne çıkaran tarifler.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, i) => (
            <RecipeCard
              key={recipe.slug}
              recipe={recipe}
              rotate={rotations[i % rotations.length]}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
