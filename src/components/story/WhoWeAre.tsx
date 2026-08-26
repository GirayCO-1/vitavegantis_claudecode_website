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
        src="/lifestyle/uretim-tesisi.webp"
        alt="VitaVegantis üretim tesisi"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Perde oranı ölçülerek seçildi: %74'te metin kontrastı 6.26 (WCAG AA
          sınırı 4.5), tesis fotoğrafı ise belirgin kalıyor. Daha açığı
          (%60 → 4.27) okunabilirlikten ödün veriyordu.
          Bölümün yüksekliği metne göre belirleniyor; py üstte ve altta aynı
          olduğu için boşluklar eşit. */}
      <div className="absolute inset-0 bg-[#0b1c12]/74" />

      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center text-cream sm:py-24">
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
