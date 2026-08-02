import type { Metadata } from "next";
import RecipeCard from "@/components/recipe/RecipeCard";
import { recipes } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Tarifler — VitaVegantis",
  description: "VitaVegantis ürünleriyle hazırlanan bitki bazlı tarifler.",
};

const rotations = [-1.5, 1.2, -0.8];

export default function TariflerPage() {
  return (
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
  );
}
