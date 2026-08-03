import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
// Önceki hero (tencere/sepet animasyonu) geri alınmak istenirse:
// import ScrollHero from "@/components/hero/ScrollHero"; ve aşağıda <StoryHero /> yerine <ScrollHero /> kullanın.
import StoryHero from "@/components/story/StoryHero";

export default function Home() {
  return (
    <>
      <StoryHero />

      <section id="urunler-vitrini" className="bg-sage/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-accent text-2xl text-plum">Vitrinimiz</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest sm:text-4xl">
              Bitki bazlı sofranın yeni klasikleri
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-forest px-8 py-16 text-center text-cream">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            En yakın satış noktanızı bulun
          </h2>
          <p className="max-w-xl text-cream/80">
            VitaVegantis ürünlerini şehrinizdeki market ve şarküterilerde
            keşfedin.
          </p>
          <Link
            href="/satisnoktalari"
            className="mt-2 rounded-full bg-sun px-8 py-3 text-sm font-semibold text-forest transition-transform hover:scale-105"
          >
            Satış Noktalarını Gör
          </Link>
        </div>
      </section>
    </>
  );
}
