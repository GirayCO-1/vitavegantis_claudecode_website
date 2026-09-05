import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import StoryHero from "@/components/story/StoryHero";
import LifestyleStrip from "@/components/story/LifestyleStrip";
import Testimonials from "@/components/story/Testimonials";
import BlobNav from "@/components/story/BlobNav";
import WhoWeAre from "@/components/story/WhoWeAre";

export default function Home() {
  return (
    <>
      {/* Giriş videosu → scroll ile ilerleyen video → "Manifestomuz" anlatısı */}
      <StoryHero />

      {/* Sokakta / evde / restoranda yaşam sahneleri */}
      <LifestyleStrip />

      {/* Sizden gelenler — Instagram gönderileri */}
      <Testimonials />

      {/* Vizyon & Misyon · Tarifler · Neden bitki bazlı */}
      <BlobNav />

      {/* Hikayeden ürünlere geçiş */}
      <section className="bg-cream px-6 py-20 text-center">
        <p className="font-accent text-2xl text-plum">Hikayemiz burada başlıyor</p>
        <h2 className="font-display mx-auto mt-2 max-w-2xl text-3xl font-semibold text-forest sm:text-4xl">
          Şimdi sofranıza ne getirdiğimize bakalım
        </h2>
        <a
          href="#urunler-vitrini"
          className="mt-8 inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
        >
          Ürünlerimizi Keşfet ↓
        </a>
      </section>

      {/* Ürün vitrini */}
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

      {/* Kurumsal tanıtım */}
      <WhoWeAre />

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
