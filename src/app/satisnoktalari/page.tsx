import type { Metadata } from "next";
import Image from "next/image";
import { salesPoints } from "@/lib/salesPoints";

export const metadata: Metadata = {
  title: "Satış Noktaları — VitaVegantis",
  description:
    "VitaVegantis ürünlerini bulabileceğiniz online mağazalar ve pazar yerleri.",
};

export default function SatisNoktalariPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-2xl text-plum">Bizi Bulun</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
            Satış Noktaları
          </h1>
          <p className="mt-4 text-forest/70">
            VitaVegantis ürünlerini bu online mağaza ve pazar yerlerinden
            temin edebilirsiniz.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {salesPoints.map((point) => {
            const card = (
              <div className="flex flex-col items-center gap-3 rounded-3xl border border-forest/10 bg-white/60 p-6 text-center transition-all hover:-translate-y-1 hover:border-forest/20 hover:shadow-lg">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={point.logo}
                    alt={point.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-forest">
                  {point.name}
                </span>
              </div>
            );

            if (!point.href) {
              return <div key={point.name}>{card}</div>;
            }

            return (
              <a
                key={point.name}
                href={point.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {card}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
