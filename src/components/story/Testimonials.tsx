import Image from "next/image";
import { testimonials, type Testimonial } from "@/lib/testimonials";
import type { Locale } from "@/lib/i18n";

const TEXT = {
  tr: {
    eyebrow: "Sizden Gelenler",
    heading: "Sofranız, Sahnemiz",
    // body ile cta arasına @vitavegantis bağlantısı giriyor.
    body: "Mutfağınızda VitaVegantis'le yarattığınız her an bizi mutlu ediyor. Fotoğrafınızı",
    cta: " ile paylaşın, burada yerinizi alın",
  },
  en: {
    eyebrow: "From You",
    heading: "Your Table, Our Stage",
    body: "Every moment you create with VitaVegantis in your kitchen makes us happy. Share your photo with",
    cta: " and take your place here",
  },
} as const;

const INSTAGRAM_URL = "https://instagram.com/vitavegantis";

// Kartlar hafifçe eğik duruyor; polaroid hissi için sabit bir dizi.
const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5];

function Card({ item, tilt }: { item: Testimonial; tilt: number }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ transform: `rotate(${tilt}deg)` }}
      className="testimonial-card relative block w-[250px] shrink-0 rounded-2xl bg-white/95 p-3 pb-7 shadow-lg shadow-forest/15 transition-transform duration-300 ease-out hover:z-10 hover:scale-105 hover:rotate-0 hover:shadow-xl hover:shadow-forest/25"
    >
      {/* Üstteki bant şeridi */}
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-[22px] w-[78px] -translate-x-1/2 -rotate-2 border-x border-dashed border-white/60 bg-coral/35"
      />

      {/* Kartta yalnızca fotoğraf var; yorum ve kullanıcı adı gösterilmiyor.
          Alttaki fazladan boşluk polaroid çenesini veriyor. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-sage/10">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="250px"
          className="object-cover"
        />
      </div>
    </a>
  );
}

/** Sonsuz akış için içerik iki kez basılır; animasyon %50'de başa sarar. */
function Row({ items }: { items: Testimonial[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="testimonial-row relative overflow-hidden">
      <div className="testimonial-marquee">
        {doubled.map((item, i) => (
          <Card key={i} item={item} tilt={TILTS[i % TILTS.length]} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto mb-12 max-w-2xl px-6 text-center">
        <p className="font-accent text-2xl text-coral">{t.eyebrow}</p>
        <h2 className="font-display mt-2 text-3xl font-semibold text-forest sm:text-4xl">
          {t.heading}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-forest/70">
          {t.body}{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest underline decoration-coral decoration-2 underline-offset-4 hover:text-coral"
          >
            @vitavegantis
          </a>
          {t.cta}
        </p>
      </div>

      {/* Tek sıra, soldan sağa akıyor. */}
      <Row items={testimonials} />
    </section>
  );
}
