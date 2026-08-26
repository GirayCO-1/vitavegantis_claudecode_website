import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import StoryHero from "@/components/story/StoryHero";
import LifestyleStrip from "@/components/story/LifestyleStrip";
import Testimonials from "@/components/story/Testimonials";
import BlobNav from "@/components/story/BlobNav";
import WhoWeAre from "@/components/story/WhoWeAre";
import { SITE_DESCRIPTION_EN, SITE_URL, canonical } from "@/lib/site";

export const metadata: Metadata = {
  // Kök layout'un "%s — VitaVegantis" şablonu EN varsayılanını da sarmalıyor;
  // ana sayfada başlığı olduğu gibi kullan.
  title: { absolute: "VitaVegantis — Plant-Based High-Protein Vegan Foods" },
  alternates: {
    canonical: canonical("en"),
    languages: { "tr-TR": canonical("/"), en: canonical("en") },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en"),
    title: "VitaVegantis — Plant-Based High-Protein Vegan Foods",
    description: SITE_DESCRIPTION_EN,
    images: [`${SITE_URL}/og-cover.webp`],
  },
};

export default function HomeEn() {
  return (
    <>
      {/* Giriş videosu → scroll ile ilerleyen video → "Who We Are" anlatısı */}
      <StoryHero locale="en" />

      {/* Sokakta / evde / restoranda yaşam sahneleri */}
      <LifestyleStrip locale="en" />

      {/* Sizden gelenler */}
      <Testimonials locale="en" />

      {/* Vision & Mission · Recipes · Why plant-based */}
      <BlobNav locale="en" />

      {/* Hikayeden ürünlere geçiş */}
      <section className="bg-cream px-6 py-20 text-center">
        <p className="font-accent text-2xl text-plum">Our story starts here</p>
        <h2 className="font-display mx-auto mt-2 max-w-2xl text-3xl font-semibold text-forest sm:text-4xl">
          Now let&apos;s see what we bring to your table
        </h2>
        <a
          href="#product-showcase"
          className="mt-8 inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
        >
          Explore Our Products ↓
        </a>
      </section>

      {/* Ürün vitrini */}
      <section id="product-showcase" className="bg-sage/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-accent text-2xl text-plum">Our range</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest sm:text-4xl">
              The new classics of the plant-based table
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} locale="en" />
            ))}
          </div>
        </div>
      </section>

      {/* Kurumsal tanıtım */}
      <WhoWeAre locale="en" />

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-forest px-8 py-16 text-center text-cream">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Find your nearest stockist
          </h2>
          <p className="max-w-xl text-cream/80">
            Discover VitaVegantis products at markets and delis in your city.
          </p>
          <Link
            href="/en/sales-points"
            className="mt-2 rounded-full bg-sun px-8 py-3 text-sm font-semibold text-forest transition-transform hover:scale-105"
          >
            See Where to Buy
          </Link>
        </div>
      </section>
    </>
  );
}
