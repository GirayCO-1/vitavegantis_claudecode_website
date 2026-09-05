import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Neden Bitki Bazlı?",
  description:
    "Bitki bazlı beslenmenin bedeniniz, damak tadınız ve gezegen için ne anlama geldiğini anlatıyoruz.",
  alternates: { canonical: canonical("neden-bitki-bazli") },
  openGraph: {
    type: "website",
    url: canonical("neden-bitki-bazli"),
    title: "Neden Bitki Bazlı? — VitaVegantis",
    description: "Bitki bazlı beslenmenin bedeniniz, damak tadınız ve gezegen için ne anlama geldiğini anlatıyoruz.",
    images: [`${SITE_URL}/lifestyle/fine-dining.webp`],
  }
};

const reasons = [
  {
    kicker: "Bedeniniz için",
    title: "Yüksek protein, bitkisel kaynaktan",
    body: "Bezelye, nohut, buğday proteini ve tofu gibi bitkisel kaynaklar, günlük protein ihtiyacınızı karşılamanın etkili bir yolu. Ürünlerimizi yüksek besin değerini koruyacak şekilde geliştiriyoruz.",
  },
  {
    kicker: "Gezegen için",
    title: "Sofradaki tercihin bir karşılığı var",
    body: "Bitkisel protein üretimi, hayvansal üretime kıyasla genellikle daha az doğal kaynak gerektirir. Her bitkisel öğün, bu yükü hafifletmeye katkıda bulunur.",
  },
  {
    kicker: "Damak tadınız için",
    title: "Vazgeçmek zorunda değilsiniz",
    body: "Sucuk, sosis, döner, köfte… Bitki bazlı beslenmeye geçerken sevdiğiniz tatlardan vazgeçmeniz gerekmiyor. Biz de zaten bunun için varız.",
  },
];

const myths = [
  {
    myth: "Bitki bazlı ürünler yeterli protein vermez.",
    truth:
      "Bezelye ve buğday proteini gibi kaynaklar yüksek protein içerir. Örneğin İsveç Köfte ürünümüz 100 gramda 21,4 g protein sunar.",
  },
  {
    myth: "Lezzetten ödün vermek gerekir.",
    truth:
      "Ürünlerimizi geliştirirken çıkış noktamız lezzet. Bir ürün, bitkisel olduğu için değil; lezzetli olduğu için sofrada kalmalı.",
  },
  {
    myth: "Bitki bazlı ürünler işlenmiş ve katkılıdır.",
    truth:
      "Her ürünün içindekiler listesi ürün sayfamızda açıkça yer alır. Koruyucu madde kullanmıyoruz.",
  },
];

export default function NedenBitkiBazliPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Neden Bitki Bazlı?", path: "neden-bitki-bazli" },
        ])}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-mint to-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent text-2xl text-plum">Merak edenler için</p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-forest sm:text-5xl md:text-6xl">
            Neden bitki bazlı?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-forest/75 sm:text-lg">
            Bitki bazlı beslenmek bir vazgeçiş değil, bir tercih. Bu tercihin
            bedeniniz, damak tadınız ve gezegen için ne anlama geldiğini
            anlatalım.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-forest/10 bg-white/60 p-8"
            >
              <p className="font-accent text-xl text-coral">{reason.kicker}</p>
              <h2 className="font-display mt-2 text-xl font-semibold text-forest">
                {reason.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-forest/75">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sage/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-semibold text-forest">
            Sık duyduğumuz üç şey
          </h2>
          <div className="mt-12 space-y-8">
            {myths.map((item) => (
              <div
                key={item.myth}
                className="rounded-3xl border border-forest/10 bg-white/60 p-8"
              >
                <p className="text-sm font-semibold tracking-wide text-coral uppercase">
                  &quot;{item.myth}&quot;
                </p>
                <p className="mt-3 leading-relaxed text-forest/80">
                  {item.truth}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-lg shadow-forest/10">
            <Image
              src="/lifestyle/hotdog-cart.webp"
              alt="Sokakta bitki bazlı hot dog"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-accent text-2xl text-plum">Başlamak kolay</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Bir öğünle deneyin
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              Her şeyi bir anda değiştirmeniz gerekmiyor. Haftada bir öğünü
              bitkisel yapmak bile fark yaratır. Sevdiğiniz bir tarifle
              başlayın, gerisi kendiliğinden gelsin.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/tarifler"
                className="rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
              >
                Tarifleri Gör
              </Link>
              <Link
                href="/urunler"
                className="rounded-full border border-forest/25 px-8 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest/50"
              >
                Ürünler
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
