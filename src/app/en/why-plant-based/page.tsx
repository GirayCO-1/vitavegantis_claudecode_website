import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Why Plant-Based?",
  description:
    "What plant-based eating means for your body, your palate and the planet.",
  alternates: {
    canonical: canonical("en/why-plant-based"),
    languages: {
      "tr-TR": canonical("neden-bitki-bazli"),
      en: canonical("en/why-plant-based"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en/why-plant-based"),
    title: "Why Plant-Based? — VitaVegantis",
    description:
      "What plant-based eating means for your body, your palate and the planet.",
    images: [`${SITE_URL}/lifestyle/fine-dining.webp`],
  },
};

const reasons = [
  {
    kicker: "For your body",
    title: "High protein, from plant sources",
    body: "Plant sources like peas, chickpeas, wheat protein and tofu are an effective way to meet your daily protein needs. We develop our products to preserve high nutritional value.",
  },
  {
    kicker: "For your ingredients list",
    title: "No additives, no secrets",
    body: "We don't want you to see a single ingredient on the label you can't read. We use no preservatives and keep the ingredients list as simple as possible.",
  },
  {
    kicker: "For the planet",
    title: "Your choice at the table counts",
    body: "Producing plant protein generally requires fewer natural resources than animal production. Every plant-based meal helps lighten that load.",
  },
  {
    kicker: "For your palate",
    title: "You don't have to give anything up",
    body: "Sucuk, sausages, döner, meatballs… Switching to plant-based eating doesn't mean giving up the flavours you love. That's exactly why we exist.",
  },
];

const myths = [
  {
    myth: "Plant-based products don't provide enough protein.",
    truth:
      "Sources like pea and wheat protein are high in protein. Our Swedish Meatballs, for example, deliver 21.4 g of protein per 100 grams.",
  },
  {
    myth: "You have to compromise on flavour.",
    truth:
      "Flavour is our starting point when developing products. A product should stay on the table because it's delicious — not because it's plant-based.",
  },
  {
    myth: "Plant-based products are processed and full of additives.",
    truth:
      "The full ingredients list of every product is openly published on its product page. We use no preservatives.",
  },
];

export default function WhyPlantBasedPageEn() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "en" },
          { name: "Why Plant-Based?", path: "en/why-plant-based" },
        ])}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-mint to-cream px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent text-2xl text-plum">For the curious</p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold text-forest sm:text-5xl md:text-6xl">
            Why plant-based?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-forest/75 sm:text-lg">
            Eating plant-based isn&apos;t a sacrifice; it&apos;s a choice.
            Let us explain what that choice means for your body, your palate
            and the planet.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-forest/10 bg-white/60 p-8"
            >
              <p className="font-accent text-xl text-coral">{reason.kicker}</p>
              <h2 className="font-display mt-2 text-xl font-semibold text-forest">
                {reason.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-forest/75">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sage/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-center text-3xl font-semibold text-forest">
            Three things we hear a lot
          </h2>
          <div className="mt-12 space-y-8">
            {myths.map((item) => (
              <div
                key={item.myth}
                className="rounded-3xl border border-forest/10 bg-white/60 p-8"
              >
                <p className="text-sm font-semibold tracking-wide text-coral uppercase">
                  &quot;{item.myth}&quot;
                </p>
                <p className="mt-3 leading-relaxed text-forest/80">
                  {item.truth}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-lg shadow-forest/10">
            <Image
              src="/lifestyle/hotdog-cart.webp"
              alt="A plant-based hot dog on the street"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-accent text-2xl text-plum">Starting is easy</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Try it with one meal
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              You don&apos;t have to change everything at once. Even making
              one meal a week plant-based makes a difference. Start with a
              recipe you love, and let the rest follow.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/en/recipes"
                className="rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
              >
                See the Recipes
              </Link>
              <Link
                href="/en/products"
                className="rounded-full border border-forest/25 px-8 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest/50"
              >
                Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
