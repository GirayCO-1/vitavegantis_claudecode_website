import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Daha iyi ve daha sağlıklı bir dünyaya katkı: VitaVegantis'in vizyonu, misyonu ve değerleri.",
  alternates: { canonical: canonical("hakkimizda") },
  openGraph: {
    type: "website",
    url: canonical("hakkimizda"),
    title: "Hakkımızda — Vizyonumuz & Misyonumuz | VitaVegantis",
    description: "Daha iyi ve daha sağlıklı bir dünyaya katkı: VitaVegantis'in vizyonu, misyonu ve değerleri.",
    images: [`${SITE_URL}/lifestyle/kahvalti-sofrasi.webp`],
  }
};

const values = [
  {
    title: "Katkısızlık",
    body: "Ürünlerimizin içinde ne varsa etiketinde de o var. Koruyucu madde, gizli katkı ya da açıklayamayacağımız bir bileşen kullanmıyoruz.",
  },
  {
    title: "Lezzetten Ödün Yok",
    body: "Bitki bazlı beslenmenin en büyük engeli lezzet kaybı sanılır. Biz ürünlerimizi, alternatif olduğu için değil lezzetli olduğu için tercih edilsin diye geliştiriyoruz.",
  },
  {
    title: "Erişilebilirlik",
    body: "Sağlıklı ve bitkisel beslenmenin ayrıcalık değil, herkesin ulaşabileceği günlük bir seçenek olması gerektiğine inanıyoruz.",
  },
  {
    title: "Gezegene Saygı",
    body: "Sofradaki her tercih, dünyada bir karşılık buluyor. Bitkisel proteini bu karşılığı hafifletmenin bir yolu olarak görüyoruz.",
  },
];

export default function VizyonMisyonPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "hakkimizda" },
        ])}
      />
      <section className="relative overflow-hidden bg-forest px-6 py-24 text-cream">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent text-2xl text-sun">Vizyonumuz &amp; Misyonumuz</p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
            Daha iyi ve daha sağlıklı bir dünyaya katkı
          </h1>
          <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
            VitaVegantis, bitkisel proteini yalnızca bir ürün kategorisi değil;
            bedenimizi beslemenin ve gezegeni korumanın birbirine bağlı iki yolu
            olarak görerek yola çıktı.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          <div>
            <p className="font-accent text-2xl text-plum">Vizyonumuz</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Bitkisel olanın istisna değil, alışkanlık olduğu sofralar
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              Bitki bazlı bir ürünün sofrada &quot;özel bir tercih&quot; olarak
              değil, herkesin uzandığı sıradan bir lezzet olarak yer aldığı bir
              gelecek hayal ediyoruz. Bunun için ürünlerimizin önce lezzetiyle,
              sonra içeriğiyle konuşulmasını istiyoruz.
            </p>
          </div>

          <div>
            <p className="font-accent text-2xl text-coral">Misyonumuz</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Doğanın sunduğunu, olduğu gibi sofraya taşımak
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              Yüksek besin değerini katkısız içerikle bir araya getiren, tanıdık
              lezzetleri bitkisel yollarla yeniden kuran ürünler geliştiriyoruz.
              Her üretim kararında ölçümüz aynı: bunu soframıza koyar mıydık?
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sage/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-semibold text-forest">
            Değerlerimiz
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-forest/10 bg-white/60 p-8"
              >
                <h3 className="font-display text-xl font-semibold text-forest">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest/75">
                  {value.body}
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
              src="/lifestyle/kahvalti-sofrasi.webp"
              alt="Kalabalık bir Türk kahvaltı sofrası"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-accent text-2xl text-plum">Enjoy Nature</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Her lokma, doğaya duyulan bir saygı
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              VitaVegantis ile her lokma, doğaya duyulan bir saygı ve bedeninize
              verilen bir hediye. Açık fikirli olun, doğayı keşfedin, tadını
              çıkarın.
            </p>
            <Link
              href="/urunler"
              className="mt-8 inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
            >
              Ürünlerimizi Keşfet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
