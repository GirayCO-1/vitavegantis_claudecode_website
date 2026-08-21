import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { itemHref, type Locale } from "@/lib/i18n";

const CTA = { tr: "Ürünü incele →", en: "View product →" } as const;

export default function ProductCard({
  product,
  locale = "tr",
}: {
  product: Product;
  locale?: Locale;
}) {
  const name = locale === "en" ? product.en.name : product.name;
  const tagline = locale === "en" ? product.en.tagline : product.tagline;

  return (
    <Link
      href={itemHref(product.urlSlug, locale)}
      className="group flex flex-col items-center rounded-3xl border border-forest/10 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-forest/20 hover:shadow-xl hover:shadow-forest/10"
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="font-display mt-6 text-xl font-semibold text-forest">
        {name}
      </h3>
      <p className="mt-2 text-sm text-forest/70">{tagline}</p>
      <span className="mt-4 text-sm font-medium text-coral group-hover:underline">
        {CTA[locale]}
      </span>
    </Link>
  );
}
