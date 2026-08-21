import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";

const LABEL = {
  tr: "Satış Noktalarımıza Ulaşın",
  en: "Find Where to Buy",
} as const;

/** Ürün sayfalarının sonundaki satış noktaları çağrısı. */
export default function SalesPointsCta({ locale = "tr" }: { locale?: Locale }) {
  return (
    <section className="px-6 pt-4 pb-20 text-center">
      <Link
        href={href("satisnoktalari", locale)}
        className="inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
      >
        {LABEL[locale]}
      </Link>
    </section>
  );
}
