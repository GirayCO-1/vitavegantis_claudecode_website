import Link from "next/link";
import type { Recipe } from "@/lib/recipes";
import RecipePhoto from "./RecipePhoto";
import { SmileyIcon, ClockIcon, LeafIcon, ShieldIcon, BoltIcon } from "./RecipeIcons";

const badges = [
  { label: "Vegan", Icon: LeafIcon },
  { label: "Katkısız", Icon: ShieldIcon },
  { label: "Yüksek Protein", Icon: BoltIcon },
];

export default function RecipeCard({
  recipe,
  rotate = 0,
}: {
  recipe: Recipe;
  rotate?: number;
}) {
  return (
    <Link
      href={`/tarifler/${recipe.slug}`}
      className="group flex flex-col overflow-hidden rounded-[32px] bg-white shadow-lg shadow-forest/10 transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-forest/20"
    >
      <RecipePhoto src={recipe.image} alt={recipe.title} />

      <div className="flex flex-1 flex-col items-center px-6 pt-6 pb-8 text-center">
        <h3
          className="font-playful text-2xl leading-snug font-bold text-forest"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {recipe.title}
        </h3>

        <div className="mt-5 flex items-center justify-center gap-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-forest">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-cream">
              <SmileyIcon className="h-4 w-4" />
            </span>
            {recipe.servings}
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold text-forest">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-cream">
              <ClockIcon className="h-4 w-4" />
            </span>
            {recipe.time}
          </span>
        </div>

        <p className="mt-6 text-xs font-medium tracking-wide text-forest/60 uppercase">
          Bu tarif için
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          {badges.map(({ label, Icon }) => (
            <span
              key={label}
              title={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-forest transition-colors group-hover:bg-sun/60"
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
