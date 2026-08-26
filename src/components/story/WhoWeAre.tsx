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
      "Vita Vegantis Gıda San. ve Tic. Ltd. Şti., 2022 yılında kurulan, yenilikçi gıda teknolojileriyle lezzetli ve besleyici bitki bazlı gıdalar geliştiren bir gıda şirketidir.",
      "Gıda teknolojileri alanındaki uzman ekibimizin geliştirdiği bitki bazlı et alternatiflerini Ankara'daki, ISO 22000 Gıda Güvenliği Yönetim Sistemi sertifikasına sahip üretim tesisimizde üretiyoruz.",
      "Ürün portföyümüzde vegan sosis çeşitleri, vegan sucuk, vegan döner, vegan köfte, besin mayası gibi farklı damak zevklerine hitap eden bitki bazlı ürünler yer almaktadır.",
      "Amacımız; bitkisel kaynaklardan yararlanarak lezzet, besleyicilik ve ürün kalitesini bir araya getiren, günlük yaşamın vazgeçilmezi olabilecek gıdalar geliştirmektir.",
    ],
  },
  en: {
    eyebrow: "Who We Are",
    heading: "A food technology company",
    paragraphs: [
      "Vita Vegantis Gıda San. ve Tic. Ltd. Şti. is a food company founded in 2022, developing delicious and nutritious plant-based foods through innovative food technologies.",
      "The plant-based meat alternatives developed by our expert team in food technology are produced at our facility in Ankara, which holds the ISO 22000 Food Safety Management System certification.",
      "Our portfolio covers plant-based products for a range of tastes: vegan sausage varieties, vegan sucuk, vegan döner, vegan meatballs and nutritional yeast.",
      "Our aim is to develop foods that draw on plant sources to bring flavour, nourishment and product quality together — foods that can become an everyday essential.",
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
