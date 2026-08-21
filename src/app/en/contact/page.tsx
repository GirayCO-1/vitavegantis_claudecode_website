import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with VitaVegantis for questions, suggestions and partnership requests: address, phone, email and contact form.",
  alternates: {
    canonical: canonical("en/contact"),
    languages: {
      "tr-TR": canonical("iletisim"),
      en: canonical("en/contact"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en/contact"),
    title: "Contact — VitaVegantis",
    description:
      "Get in touch with VitaVegantis: address, phone, email and contact form.",
    images: [`${SITE_URL}/lifestyle/kahvalti-sofrasi.webp`],
  },
};

export default function ContactPageEn() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "en" },
          { name: "Contact", path: "en/contact" },
        ])}
      />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          <div>
            <p className="font-accent text-2xl text-plum">Reach us</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
              Contact
            </h1>
            <p className="mt-4 text-forest/70">
              Get in touch with your questions, suggestions or partnership
              requests.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-forest/80">
                  Seyran Bağları Mahallesi Seyran Caddesi No:42/A,
                  Çankaya / Ankara, Türkiye
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-forest/80">
                  <a href="tel:+908503074990" className="hover:text-coral">
                    +90 850 307 49 90
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-forest/80">
                  <a href="mailto:info@vitavegantis.com" className="hover:text-coral">
                    info@vitavegantis.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                  Instagram
                </dt>
                <dd className="mt-1 text-sm text-forest/80">
                  <a
                    href="https://instagram.com/vitavegantis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-coral"
                  >
                    @vitavegantis
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-forest/10 bg-white/60 p-8">
            <ContactForm locale="en" />
          </div>
        </div>
      </section>
    </>
  );
}
