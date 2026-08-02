import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim — VitaVegantis",
  description: "VitaVegantis ile iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
        <div>
          <p className="font-accent text-2xl text-plum">Bize Ulaşın</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
            İletişim
          </h1>
          <p className="mt-4 text-forest/70">
            Sorularınız, önerileriniz veya iş birliği talepleriniz için
            bizimle iletişime geçebilirsiniz.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                Adres
              </dt>
              <dd className="mt-1 text-sm text-forest/80">
                Seyran Bağları Mahallesi Seyran Caddesi No:42/A,
                Çankırı / Ankara
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                Telefon
              </dt>
              <dd className="mt-1 text-sm text-forest/80">
                <a href="tel:08503074990" className="hover:text-coral">
                  0850 307 49 90
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wide text-coral uppercase">
                E-posta
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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
