import Link from "next/link";
import Image from "next/image";
import StaticIngredientRing from "@/components/StaticIngredientRing";
import IngredientsMap from "@/components/IngredientsMap";
import SalesPointsCta from "@/components/SalesPointsCta";
import ProductCard from "@/components/ProductCard";
import ProductSeoBlock from "@/components/detail/ProductSeoBlock";
import { ingredientMaps } from "@/lib/ingredientMaps";
import { productSeoFor } from "@/lib/productSeo";
import { products, type Product } from "@/lib/products";
import {
  href,
  translateIngredient,
  translateNutritionLabel,
  type Locale,
} from "@/lib/i18n";

const TEXT = {
  tr: {
    buy: "Satın Al",
    ingredients: "İçindekiler",
    nutrition: "Besin Değerleri",
    per100: "100g başına",
    mapAlt: (name: string) => `${name} içindekileri`,
    others: "Diğer Ürünler",
    seeAll: "Tüm ürünleri gör →",
  },
  en: {
    buy: "Where to Buy",
    ingredients: "Ingredients",
    nutrition: "Nutrition Facts",
    per100: "per 100g",
    mapAlt: (name: string) => `${name} ingredients`,
    others: "Other Products",
    seeAll: "See all products →",
  },
} as const;

export default function ProductDetail({
  product,
  locale = "tr",
}: {
  product: Product;
  locale?: Locale;
}) {
  const t = TEXT[locale];
  const seo = productSeoFor(product.slug, locale);
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const ingredientMap = ingredientMaps[product.slug];
  // Değeri girilmemiş ürünlerde tabloyu hiç göstermiyoruz
  const hasNutrition = product.nutrition.some((n) => n.value !== "—");

  const name = locale === "en" ? product.en.name : product.name;
  const tagline = locale === "en" ? product.en.tagline : product.tagline;
  const description =
    locale === "en" ? product.en.description : product.description;
  const ingredients =
    locale === "en" ? product.en.ingredients : product.ingredients;

  return (
    <>
      <section className="bg-gradient-to-b from-cream to-sage/10 px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[32px] shadow-xl shadow-forest/15">
            <Image
              src={product.sceneImage}
              alt={seo?.sceneAlt ?? name}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-accent text-2xl text-plum">{tagline}</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
              {name}
            </h1>
            {product.weight !== "—" && (
              <p className="mt-2 text-sm font-medium text-forest/60">
                {product.weight}
              </p>
            )}
            <p className="mt-6 leading-relaxed text-forest/80">{description}</p>
            <Link
              href={href("satisnoktalari", locale)}
              className="mt-8 inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
            >
              {t.buy}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-forest">
              {t.ingredients}
            </h2>
            <ul className="mt-6 space-y-3">
              {ingredients.map((ing) => (
                <li
                  key={ing}
                  className="flex items-start gap-3 text-sm text-forest/80"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                  {ing}
                </li>
              ))}
            </ul>

            {hasNutrition && (
              <>
                <h2 className="font-display mt-10 text-2xl font-semibold text-forest">
                  {t.nutrition}
                </h2>
                <p className="mt-1 text-xs text-forest/50">{t.per100}</p>
                <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {product.nutrition.map((n) => (
                    <div
                      key={n.label}
                      className="rounded-2xl border border-forest/10 bg-white/60 px-4 py-3 text-center"
                    >
                      <dt className="text-xs text-forest/60">
                        {translateNutritionLabel(n.label, locale)}
                      </dt>
                      <dd className="font-display mt-1 text-lg text-forest">
                        {n.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>

          <div className="flex justify-center">
            {ingredientMap ? (
              <div className="w-full max-w-[460px]">
                <IngredientsMap
                  image={ingredientMap.image}
                  ingredients={ingredientMap.hotspots.map((h) => ({
                    ...h,
                    name: translateIngredient(h.name, locale),
                  }))}
                  alt={seo?.mapAlt ?? t.mapAlt(name)}
                />
              </div>
            ) : (
              <StaticIngredientRing
                ingredients={ingredients}
                accent={product.accent}
              />
            )}
          </div>
        </div>
      </section>

      {/* SEO içerik bloğu — içeriği olan ürünlerde görünür. */}
      {seo && <ProductSeoBlock seo={seo} locale={locale} />}

      <section className="bg-sage/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-semibold text-forest">
            {t.others}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={href("urunler", locale)}
              className="text-sm font-medium text-coral hover:underline"
            >
              {t.seeAll}
            </Link>
          </div>
        </div>
      </section>

      <SalesPointsCta locale={locale} />
    </>
  );
}
