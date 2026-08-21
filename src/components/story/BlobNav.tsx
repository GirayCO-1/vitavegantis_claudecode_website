import Link from "next/link";
import Image from "next/image";
import { href, type Locale } from "@/lib/i18n";

// Organik "blob" köşe yarıçapları — referanstaki damla formunu marka
// paletiyle yeniden yorumluyor.
const BLOB_A = "58% 42% 46% 54% / 48% 44% 56% 52%";
const BLOB_B = "46% 54% 58% 42% / 54% 48% 52% 46%";
const BLOB_C = "52% 48% 42% 58% / 44% 56% 44% 56%";

// Blob kenarları içe doğru kıvrıldığı için içerik, şeklin tam ortasında
// ve dar bir sütunda tutuluyor; aksi halde metin eğrinin dışına taşıyor.
const CARD = "group relative flex min-h-[360px] items-center justify-center";
const CONTENT =
  "relative z-10 flex w-[72%] flex-col items-center gap-4 py-10 text-center";

const TEXT = {
  tr: {
    visionBadge: "Vizyonumuz & Misyonumuz",
    visionHeading: "Daha iyi ve daha sağlıklı bir dünyaya katkı",
    visionCta: "Keşfet →",
    recipesHeading: "Bugün ne pişirsem?",
    recipesCta: "Tarifini bul",
    whyHeading: "Neden bitki bazlı?",
    whyBody: "Bedeniniz ve gezegen için ne anlama geldiğini anlatıyoruz.",
    whyCta: "Nedenini öğren",
  },
  en: {
    visionBadge: "Our Vision & Mission",
    visionHeading: "Contributing to a better, healthier world",
    visionCta: "Discover →",
    recipesHeading: "What should I cook today?",
    recipesCta: "Find your recipe",
    whyHeading: "Why plant-based?",
    whyBody: "What it means for your body and the planet.",
    whyCta: "Find out why",
  },
} as const;

export default function BlobNav({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];

  return (
    <section className="bg-mint px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-3">
        {/* 1) Vizyon & Misyon */}
        <Link href={href("hakkimizda", locale)} className={CARD}>
          <span
            aria-hidden
            className="absolute inset-0 bg-forest transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ borderRadius: BLOB_A }}
          />
          <div className={CONTENT}>
            <span className="rounded-full bg-cream px-3 py-1 text-[10px] font-semibold tracking-wide text-forest uppercase">
              {t.visionBadge}
            </span>
            <h3 className="font-display text-2xl leading-tight font-semibold text-cream">
              {t.visionHeading}
            </h3>
            <span className="text-sm font-medium text-sun group-hover:underline">
              {t.visionCta}
            </span>
          </div>
        </Link>

        {/* 2) Tarifler */}
        <Link href={href("tarifler", locale)} className={CARD}>
          <span
            aria-hidden
            className="absolute inset-0 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ borderRadius: BLOB_B }}
          >
            <Image
              src="/recipes/vegan-iskender.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 33vw, 90vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-forest/60" />
          </span>
          <div className={CONTENT}>
            <h3 className="font-display text-2xl leading-tight font-semibold text-cream">
              {t.recipesHeading}
            </h3>
            <span className="rounded-full bg-cream px-5 py-2 text-sm font-semibold text-forest">
              {t.recipesCta}
            </span>
          </div>
        </Link>

        {/* 3) Neden bitki bazlı */}
        <Link href={href("neden-bitki-bazli", locale)} className={CARD}>
          <span
            aria-hidden
            className="absolute inset-0 bg-sage/45 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{ borderRadius: BLOB_C }}
          />
          <div className={CONTENT}>
            <h3 className="font-display text-2xl leading-tight font-semibold text-forest">
              {t.whyHeading}
            </h3>
            <p className="text-sm leading-relaxed text-forest/75">
              {t.whyBody}
            </p>
            <span className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream">
              {t.whyCta}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
