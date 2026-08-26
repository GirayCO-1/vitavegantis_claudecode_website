import Link from "next/link";
import type { ProductSeo } from "@/lib/productSeo";
import { href, type Locale } from "@/lib/i18n";

/**
 * Ürün sayfasının SEO içerik bloğu: anlatı bölümleri + SSS.
 *
 * SSS için <details>/<summary> kullanılıyor. Böylece açılır-kapanır davranış
 * JavaScript'siz çalışıyor ve metin her hâlükârda HTML'de yer alıyor —
 * Google içeriği görebiliyor. İlk soru açık geliyor.
 *
 * Başlık düzeni: sayfadaki tek h1 ürün adı; buradaki bölüm başlıkları h2,
 * SSS soruları h3.
 */
export default function ProductSeoBlock({
  seo,
  locale = "tr",
}: {
  seo: ProductSeo;
  locale?: Locale;
}) {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-3xl">
        {seo.sections.map((section) => (
          <div key={section.heading} className="mb-12 last:mb-0">
            <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
              {section.heading}
            </h2>

            {section.paragraphs.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-forest/80">
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul className="mt-5 space-y-3">
                {section.bullets.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-start gap-3 leading-relaxed text-forest/80"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    <span>
                      <strong className="font-semibold text-forest">
                        {b.label}:
                      </strong>{" "}
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {section.closing && (
              <p className="mt-5 leading-relaxed text-forest/80">
                {section.closing}
                {section.link && (
                  <>
                    {" "}
                    {section.link.before}
                    <Link
                      href={href(section.link.section, locale)}
                      className="font-medium text-coral hover:underline"
                    >
                      {section.link.label}
                    </Link>
                    {section.link.after}
                  </>
                )}
              </p>
            )}
          </div>
        ))}

        {seo.faq.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
              {seo.faqHeading}
            </h2>

            <div className="mt-6 divide-y divide-forest/10 border-y border-forest/10">
              {seo.faq.map((item, i) => (
                <details
                  key={item.q}
                  open={i === 0}
                  className="group py-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                    <h3 className="font-display text-base font-semibold text-forest sm:text-lg">
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="shrink-0 text-xl leading-none text-coral transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-forest/80">
                    {item.a}
                    {item.link && (
                      <>
                        {" "}
                        <Link
                          href={href(item.link.section, locale)}
                          className="font-medium text-coral hover:underline"
                        >
                          {item.link.label} →
                        </Link>
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
