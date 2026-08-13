import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StaticIngredientRing from "@/components/StaticIngredientRing";
import IngredientsMap from "@/components/IngredientsMap";
import { ingredientMaps } from "@/lib/ingredientMaps";
import ProductCard from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — VitaVegantis`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const ingredientMap = ingredientMaps[product.slug];

  return (
    <>
      <section className="bg-gradient-to-b from-cream to-sage/10 px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[32px] shadow-xl shadow-forest/15">
            <Image
              src={product.sceneImage}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-accent text-2xl text-plum">{product.tagline}</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
              {product.name}
            </h1>
            {product.weight !== "—" && (
              <p className="mt-2 text-sm font-medium text-forest/60">
                {product.weight}
              </p>
            )}
            <p className="mt-6 leading-relaxed text-forest/80">
              {product.description}
            </p>
            <Link
              href="/satisnoktalari"
              className="mt-8 inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
            >
              Satın Al
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest">
              İçindekiler
            </h2>
            {!product.ingredientsComplete && (
              <p className="mt-2 text-xs font-medium tracking-wide text-coral uppercase">
                Tam içerik listesi yakında güncellenecek
              </p>
            )}
            <ul className="mt-6 space-y-3">
              {product.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="flex items-start gap-3 text-sm text-forest/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                  {ing}
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-10 text-2xl font-semibold text-forest">
              Besin Değerleri
            </h2>
            <p className="mt-1 text-xs text-forest/50">100g başına (yakında eklenecek)</p>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {product.nutrition.map((n) => (
                <div
                  key={n.label}
                  className="rounded-2xl border border-forest/10 bg-white/60 px-4 py-3 text-center"
                >
                  <dt className="text-xs text-forest/60">{n.label}</dt>
                  <dd className="font-display mt-1 text-lg text-forest">{n.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center">
            {ingredientMap ? (
              <div className="w-full max-w-[460px]">
                <IngredientsMap
                  image={ingredientMap.image}
                  ingredients={ingredientMap.hotspots}
                  alt={`${product.name} içindekileri`}
                />
              </div>
            ) : (
              <StaticIngredientRing
                ingredients={product.ingredients}
                accent={product.accent}
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-sage/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-semibold text-forest">
            Diğer Ürünler
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/urunler" className="text-sm font-medium text-coral hover:underline">
              Tüm ürünleri gör →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
