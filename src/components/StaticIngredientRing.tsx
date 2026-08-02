import Image from "next/image";
import { accentHex, type Accent } from "@/lib/products";
import { matchIngredientImages } from "@/lib/ingredientLibrary";

export default function StaticIngredientRing({
  ingredients,
  accent,
}: {
  ingredients: string[];
  accent: Accent;
}) {
  const color = accentHex[accent];
  const items = matchIngredientImages(ingredients);
  const radius = 130;
  const center = 170;
  const count = Math.max(items.length, 1);

  return (
    <div className="relative mx-auto" style={{ width: 340, height: 340 }}>
      <div
        className="absolute rounded-full border border-dashed"
        style={{
          inset: center - radius - 34,
          borderColor: `${color}55`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full opacity-90" style={{ backgroundColor: color }} />
      </div>
      {items.map((item, i) => {
        const angle = (i * 360) / count;
        const rad = (angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * radius - 30;
        const y = center + Math.sin(rad) * radius - 30;
        return (
          <div
            key={item.keyword}
            className="absolute overflow-hidden rounded-full bg-white shadow-md"
            style={{ left: x, top: y, width: 60, height: 60 }}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="60px"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
