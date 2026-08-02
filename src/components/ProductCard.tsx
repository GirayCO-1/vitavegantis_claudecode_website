import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="group flex flex-col items-center rounded-3xl border border-forest/10 bg-white/60 p-8 text-center transition-all hover:-translate-y-1 hover:border-forest/20 hover:shadow-xl hover:shadow-forest/10"
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="font-display mt-6 text-xl font-semibold text-forest">
        {product.name}
      </h3>
      <p className="mt-2 text-sm text-forest/70">{product.tagline}</p>
      <span className="mt-4 text-sm font-medium text-coral group-hover:underline">
        Ürünü incele →
      </span>
    </Link>
  );
}
