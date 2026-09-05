import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";

const TEXT = {
  tr: {
    motto: "Bitkisel Proteinin En Lezzetli Hali",
    blurb:
      "Doğanın gücünü tabağınıza taşıyoruz. Bedeninize iyi bakan, gezegene saygı duyan %100 bitki bazlı lezzetler sunuyoruz.",
    explore: "Keşfet",
    contact: "İletişim",
    links: [
      { section: "urunler", label: "Ürünler" },
      { section: "tarifler", label: "Tarifler" },
      { section: "blog", label: "Blog" },
      { section: "iletisim", label: "İletişim" },
      { section: "satisnoktalari", label: "Satış Noktaları" },
    ],
    legal: "Vita Vegantis Gıda Sanayi ve Ticaret Limited Şirketi",
    tagline: "Doğadan sofranıza — tek bir katkı maddesi olmadan.",
  },
  en: {
    motto: "Plant Protein at Its Most Delicious",
    blurb:
      "We bring the power of nature to your plate: 100% plant-based flavours that look after your body and respect the planet.",
    explore: "Explore",
    contact: "Contact",
    links: [
      { section: "urunler", label: "Products" },
      { section: "tarifler", label: "Recipes" },
      { section: "blog", label: "Blog" },
      { section: "iletisim", label: "Contact" },
      { section: "satisnoktalari", label: "Where to Buy" },
    ],
    legal: "Vita Vegantis Gıda Sanayi ve Ticaret Limited Şirketi",
    tagline: "From nature to your table — without a single additive.",
  },
} as const;

export default function Footer({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];

  return (
    <footer className="mt-auto border-t border-forest/10 bg-forest text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href={href("/", locale)} className="inline-block">
              <Image
                src="/brand/logo-cream.webp"
                alt="VitaVegantis"
                width={2000}
                height={333}
                className="h-7 w-auto"
              />
            </Link>
            <p className="font-accent mt-3 text-2xl text-sun">{t.motto}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
              {t.blurb}
            </p>
            <a
              href="https://instagram.com/vitavegantis"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium underline decoration-sun decoration-2 underline-offset-4 hover:text-sun"
            >
              @vitavegantis
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-sun">{t.explore}</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {t.links.map((link) => (
                <li key={link.section}>
                  <Link href={href(link.section, locale)} className="hover:text-sun">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-sun">{t.contact}</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                Seyran Bağları Mahallesi Seyran Caddesi No:42/A,
                Çankaya / Ankara
              </li>
              <li>
                <a href="tel:08503074990" className="hover:text-sun">
                  0850 307 49 90
                </a>
              </li>
              <li>
                <a href="mailto:info@vitavegantis.com" className="hover:text-sun">
                  info@vitavegantis.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {t.legal}</p>
          <p>{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
