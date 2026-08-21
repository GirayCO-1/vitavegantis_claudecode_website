import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structuredData";
import ProductCard from "@/components/ProductCard";
import SalesPointsCta from "@/components/SalesPointsCta";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Vegan sausage, sucuk, döner, Swedish meatballs, hot dog and nutritional yeast: explore VitaVegantis' plant-based, high-protein product family.",
  alternates: {
    canonical: canonical("en/products"),
    languages: {
      "tr-TR": canonical("urunler"),
      en: canonical("en/products"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en/products"),
    title: "Products — VitaVegantis",
    description:
      "Vegan sausage, sucuk, döner, Swedish meatballs, hot dog and nutritional yeast: VitaVegantis' plant-based, high-protein product family.",
    images: [`${SITE_URL}/products/scenes/vegan-sucuk-scene-2.png`],
  },
};

export default function ProductsIndexPageEn() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "en" },
          { name: "Products", path: "en/products" },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          "en/products",
          "VitaVegantis Products",
          products.map((p) => ({
            name: p.en.name,
            urlSlug: `en/${p.urlSlug}`,
          })),
        )}
      />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-accent text-2xl text-plum">Our Product Family</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
              Nature at its most delicious
            </h1>
            <p className="mt-4 text-forest/70">
              Additive-free, plant-based and high in protein — the new
              classics of your table.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} locale="en" />
            ))}
          </div>
        </div>

        <SalesPointsCta locale="en" />
      </section>
    </>
  );
}
