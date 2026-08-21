import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structuredData";
import ProductCard from "@/components/ProductCard";
import SalesPointsCta from "@/components/SalesPointsCta";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "Vegan sosis, sucuk, döner, İsveç köfte, hot dog ve besin mayası: VitaVegantis'in bitki bazlı, yüksek proteinli ürün ailesini keşfedin.",
  alternates: { canonical: canonical("urunler") },
  openGraph: {
    type: "website",
    url: canonical("urunler"),
    title: "Ürünler — VitaVegantis",
    description: "Vegan sosis, sucuk, döner, İsveç köfte, hot dog ve besin mayası: VitaVegantis'in bitki bazlı, yüksek proteinli ürün ailesini keşfedin.",
    images: [`${SITE_URL}/products/scenes/vegan-sucuk-scene-2.png`],
  }
};

export default function ProductsIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Ürünler", path: "urunler" },
        ])}
      />
      <JsonLd data={itemListSchema("urunler", "VitaVegantis Ürünleri", products)} />
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-2xl text-plum">Ürün Ailemiz</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
            Doğanın en lezzetli hali
          </h1>
          <p className="mt-4 text-forest/70">
            Katkı maddesiz, bitki bazlı ve yüksek proteinli — sofranızın yeni
            klasikleri.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      <SalesPointsCta />
    </section>
    </>
  );
}
