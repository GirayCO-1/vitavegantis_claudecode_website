import Image from "next/image";
import type { Locale } from "@/lib/i18n";

/**
 * "Biz Kimiz" bölümü — kurumsal tanıtım metni, bina tabelası fotoğrafı
 * üzerinde. Ana sayfanın altında ve Hakkımızda sayfasında kullanılır.
 */
const TEXT = {
  tr: {
    eyebrow: "Biz Kimiz",
    heading: "Gıda teknolojileri firması",
    paragraphs: [
      "VitaVegantis, 2022 yılında kurulmuş bir gıda teknolojileri firmasıdır. Sağlıklı, besleyici ve herkesin bütçesine uygun yenilikçi ürünler geliştirmek için çalışıyoruz.",
      "Üretimimizi ISO 22000 Gıda Güvenliği Sertifikası ile yapıyoruz. Gıda alanında uzman kadromuzun geliştirdiği alternatif et ürünleri ve bitkisel şarküteri çeşitlerimizle — vegan sosis, vegan sucuk, vegan döner, vegan İsveç köfte — alıştığınız lezzetleri doğadan gelen içeriklerle yeniden kuruyoruz.",
    ],
  },
  en: {
    eyebrow: "Who We Are",
    heading: "A food technology company",
    paragraphs: [
      "VitaVegantis is a food technology company founded in 2022. We work to develop innovative products that are healthy, nourishing and affordable for everyone.",
      "We produce under the ISO 22000 Food Safety certification. With the alternative meat products and plant-based deli range developed by our food experts — vegan sausage, vegan sucuk, vegan döner, vegan Swedish meatballs — we rebuild the flavours you know from ingredients that come straight from nature.",
    ],
  },
} as const;

export default function WhoWeAre({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1c12]">
      <Image
        src="/lifestyle/bina-tabela.webp"
        alt="VitaVegantis genel merkez tabelası"
        fill
        sizes="100vw"
        className="object-cover object-top"
      />
      {/* Üstte hafif, altta koyu perde: tabeladaki logo görünür kalırken
          alttaki metin okunur oluyor. Düz bir perde ikisinden birini
          feda ederdi. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(11,28,18,0.22) 0%, rgba(11,28,18,0.28) 34%, rgba(11,28,18,0.80) 52%, rgba(11,28,18,0.94) 72%, rgba(11,28,18,0.96) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[42rem] max-w-3xl flex-col justify-end px-6 pb-20 text-center text-cream sm:min-h-[46rem]">
        <p className="font-accent text-2xl text-sun">{t.eyebrow}</p>
        <h2 className="font-display mt-2 text-3xl font-semibold sm:text-4xl">
          {t.heading}
        </h2>
        <div className="mt-6 space-y-5">
          {t.paragraphs.map((p) => (
            <p key={p} className="text-base leading-relaxed text-cream/85">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
