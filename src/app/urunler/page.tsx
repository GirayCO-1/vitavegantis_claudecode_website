import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ürünler — VitaVegantis",
  description: "VitaVegantis'in bitki bazlı, yüksek proteinli ürün ailesi.",
};

export default function ProductsIndexPage() {
  return (
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
    </section>
  );
}
