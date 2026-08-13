import Link from "next/link";

/** Ürün sayfalarının sonundaki satış noktaları çağrısı. */
export default function SalesPointsCta() {
  return (
    <section className="px-6 pt-4 pb-20 text-center">
      <Link
        href="/satisnoktalari"
        className="inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
      >
        Satış Noktalarımıza Ulaşın
      </Link>
    </section>
  );
}
