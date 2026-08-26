import Image from "next/image";
import { testimonialsFor, type Testimonial } from "@/lib/testimonials";
import type { Locale } from "@/lib/i18n";

const TEXT = {
  tr: {
    eyebrow: "Sizden Gelenler",
    heading: "Sofranız, Sahnemiz",
    body: "Mutfağınızda pişen her VitaVegantis karesi bizi gülümsetiyor.",
    cta: "'i etiketleyin, burada yerinizi alın.",
  },
  en: {
    eyebrow: "From You",
    heading: "Your Table, Our Stage",
    body: "Every VitaVegantis moment cooked in your kitchen makes us smile.",
    cta: " and take your place here.",
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
      className="testimonial-card relative block w-[250px] shrink-0 rounded-2xl bg-white/95 p-3 pb-4 shadow-lg shadow-forest/15 transition-transform duration-300 ease-out hover:z-10 hover:scale-105 hover:rotate-0 hover:shadow-xl hover:shadow-forest/25"
    >
      {/* Üstteki bant şeridi */}
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-[22px] w-[78px] -translate-x-1/2 -rotate-2 border-x border-dashed border-white/60 bg-coral/35"
      />

      <div
        className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg text-[3.4rem]"
        style={item.image ? undefined : { background: item.bg ?? "#eef1e4" }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="250px"
            className="object-cover"
          />
        ) : (
          <span aria-hidden>{item.emoji}</span>
        )}
      </div>

      <p className="min-h-[2.4em] text-[0.82rem] leading-relaxed text-forest/80">
        {item.caption}
      </p>

      <div className="mt-3 flex items-center gap-2 text-[0.78rem] text-forest">
        <svg viewBox="0 0 24 24" aria-hidden className="h-[15px] w-[15px] fill-coral">
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4m0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-10.4a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0" />
        </svg>
        <span className="font-semibold">{item.handle}</span>
        <span className="ml-auto text-forest/45">♥ {item.likes}</span>
      </div>
    </a>
  );
}

/** Sonsuz akış için içerik iki kez basılır; animasyon %50'de başa sarar. */
function Row({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="testimonial-row relative overflow-hidden">
      <div
        className={
          direction === "left"
            ? "testimonial-marquee testimonial-marquee--left"
            : "testimonial-marquee testimonial-marquee--right"
        }
      >
        {doubled.map((item, i) => (
          <Card key={i} item={item} tilt={TILTS[i % TILTS.length]} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];
  const items = testimonialsFor(locale);
  if (items.length === 0) return null;

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

      <Row items={items} direction="left" />
      <Row items={[...items].reverse()} direction="right" />
    </section>
  );
}
